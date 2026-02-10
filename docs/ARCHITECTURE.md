# Architecture

## Overview

DEX is a full-stack TypeScript application designed for bookmark and link management with AI-powered organization. The system follows a modern monorepo architecture with clear separation of concerns between the web interface, API server, and browser extension.

**Design Philosophy:**

- Type-safe end-to-end communication via tRPC
- Monorepo structure for code sharing and consistency
- Modular architecture with clear boundaries
- PostgreSQL for robust data persistence with full-text search
- Docker-first deployment strategy

---

## System Architecture

```
┌─────────────────┐     ┌─────────────────┐
│   Web App       │     │   Extension     │
│  (React/Vite)   │     │    (WXT)        │
│  Port: 5173     │     │  Ctrl+Shift+X   │
└────────┬────────┘     └────────┬────────┘
         │                       │
         │    HTTP/tRPC          │
         └───────────┬───────────┘
                     │
                     ▼
         ┌───────────────────────┐
         │   tRPC API Layer      │
         │   (Type-safe RPC)     │
         └───────────┬───────────┘
                     │
                     ▼
         ┌───────────────────────┐
         │   Hono Server         │
         │   Port: 8787          │
         │                       │
         │   /api/auth/*         │  Better Auth
         │   /api/trpc/*         │  tRPC Router
         │   /mcp                │  MCP Server
         └───────────┬───────────┘
                     │
                     ▼
         ┌───────────────────────┐
         │   PostgreSQL 16       │
         │   (Drizzle ORM)       │
         │   Port: 5432          │
         └───────────────────────┘
```

---

## Package Structure

### apps/web

**Frontend Application**

- **Framework:** React 19 with Vite 7
- **Routing:** React Router v7
- **Styling:** Tailwind CSS 4 with custom design system
- **State Management:** Zustand for global state
- **Data Fetching:** TanStack Query (React Query) with tRPC
- **UI Components:** Radix UI primitives via @repo/ui
- **Authentication:** Better Auth client
- **Key Features:**
  - Collection management interface
  - Full-text search with highlighting
  - Drag-and-drop item organization
  - Collaborative collection sharing
  - Dark mode support

### apps/server

**Backend API Server**

- **HTTP Framework:** Hono (lightweight, edge-compatible)
- **RPC Layer:** tRPC for type-safe API endpoints
- **Database:** PostgreSQL 16 with Drizzle ORM
- **Authentication:** Better Auth with Google OAuth
- **AI Integration:** Groq API for content summarization
- **Key Features:**
  - RESTful auth endpoints (`/api/auth/*`)
  - tRPC procedures (`/api/trpc/*`)
  - MCP server for AI assistant integration (`/mcp`)
  - Full-text search using PostgreSQL tsvector
  - OpenGraph/oEmbed metadata parsing
  - API key management with rate limiting

### apps/extension

**Browser Extension**

- **Framework:** WXT (Web Extension Toolkit)
- **UI:** React 19 with Shadow DOM isolation
- **Build Tool:** Vite via WXT
- **Manifest:** V3 (Chrome, Firefox compatible)
- **Key Features:**
  - Quick save with Ctrl+Shift+X (Cmd+Shift+X on Mac)
  - Content script overlay UI
  - Background service worker for API communication
  - Collection selection and creation
  - Duplicate URL detection

### packages/ui

**Shared Component Library**

- **Components:** Radix UI primitives + custom components
- **Styling:** Tailwind CSS 4 + PostCSS
- **Exports:**
  - Button, Input, Checkbox, Dialog, Dropdown Menu
  - Select, Tooltip, Popover, Avatar, Badge
  - Icons (Lucide React)
  - Toast notifications (Sonner)
  - Theme provider
- **Distribution:** Source code (no build step)

---

## Data Flow

### Authentication Flow

```
1. User clicks "Sign in with Google"
   ↓
2. Frontend redirects to /api/auth/sign-in/google
   ↓
3. Better Auth handles OAuth flow
   ↓
4. Google redirects back with auth code
   ↓
5. Backend exchanges code for tokens
   ↓
6. Session created in database
   ↓
7. User redirected to app with session cookie
```

### tRPC Request/Response Cycle

```
Frontend:
  trpc.collections.getUserCollections.useQuery()
       ↓
  tRPC Client serializes request
       ↓
  HTTP POST to /api/trpc/collections.getUserCollections
       ↓
Backend:
  Hono receives request
       ↓
  tRPC middleware authenticates user
       ↓
  Procedure handler queries database via Drizzle
       ↓
  Response serialized and sent back
       ↓
Frontend:
  TanStack Query caches response
       ↓
  React component re-renders with data
```

### Extension Save Flow

```
1. User presses Ctrl+Shift+X on a webpage
   ↓
2. Background script sends MOUNT_UI to content script
   ↓
3. Content script shows React overlay UI
   ↓
4. User selects collections
   ↓
5. Content script sends ADD_ITEM_TO_COLLECTION to background
   ↓
6. Background script calls tRPC mutation
   ↓
7. Server creates item with OpenGraph metadata
   ↓
8. Item added to selected collections
   ↓
9. Success feedback shown in extension UI
```

---

## Database Schema

### Core Tables

#### users

- `id` (uuid v7, primary key)
- `name`, `email` (unique), `emailVerified`
- `image`, `status` (waitlist/active/suspended)
- `createdAt`, `updatedAt`

#### collections

- `id` (uuid v7, primary key)
- `title`
- `createdAt`, `updatedAt`

#### items

- `id` (uuid v7, primary key)
- `type` (link/note)
- `url`, `title`, `tldr`
- `tags` (text array)
- `favicon`, `image`
- `searchVector` (tsvector for full-text search)
- `creatorId` (foreign key to users)
- `createdAt`, `updatedAt`
- **Indexes:**
  - GIN index on `searchVector` for fast full-text search
  - B-tree index on `creatorId`

#### session

- `id`, `token` (unique), `userId`, `expiresAt`
- `ipAddress`, `userAgent`

#### account

- `id`, `accountId`, `providerId`, `userId`
- `tokens`, `scope`, `password`

#### apikey

- `id`, `name`, `key` (indexed), `prefix`, `start`
- `userId` (foreign key)
- `mode` (full_access/collection_specific)
- Rate limiting: `enabled`, `timeWindow`, `max`, `refillInterval`, `refillAmount`
- `expiresAt`, `lastRequest`, `requestCount`, `remaining`
- `permissions`, `metadata`, `enabled`

### Junction Tables (Many-to-Many)

#### user_collections

- `userId` + `collectionId` (composite primary key)
- `role` (owner/admin/member)
- Manages collection access and permissions

#### collection_items

- `collectionId` + `itemId` (composite primary key)
- Links items to collections
- Unique constraint prevents duplicates

#### api_key_collections

- `apiKeyId` + `collectionId` (composite primary key)
- Grants API key access to specific collections

### Full-Text Search

Items use PostgreSQL's `tsvector` for efficient full-text search:

- Index on `search_vector` column (GIN)
- Searches across: `title`, `tldr`, `tags`, `url`
- Results ranked by relevance

---

## Authentication & Authorization

### Better Auth

**Configuration:**

- Provider: Google OAuth 2.0
- Session storage: PostgreSQL via Drizzle adapter
- Cookie-based sessions with secure httpOnly flags
- CSRF protection enabled

**Endpoints:**

- `/api/auth/sign-in/google` - Initiate OAuth
- `/api/auth/sign-out` - Destroy session
- `/api/auth/session` - Get current session

### Role-Based Access Control (RBAC)

Collections use a three-tier permission system:

| Role       | Permissions                                                      |
| ---------- | ---------------------------------------------------------------- |
| **Owner**  | Full control: edit, delete, manage members, transfer ownership   |
| **Admin**  | Edit collection, manage items, add/remove members (except owner) |
| **Member** | View collection, add items (read-only on collection settings)    |

**Permission Checks:**

- Enforced at tRPC procedure level
- RBAC service validates user role before operations
- Cascade delete: removing owner removes entire collection

### API Key Authentication

Two authentication modes:

1. **Full Access Mode**
   - Access to all user collections
   - Can create new collections
   - Used for MCP server integration

2. **Collection-Specific Mode**
   - Access limited to specified collections
   - Cannot create new collections
   - Ideal for third-party integrations

**Rate Limiting:**

- Default: 100 requests per time window
- Configurable per API key
- Token bucket algorithm with refill

---

## Key Design Decisions

### Why Hono over Express?

- **Performance:** 3-4x faster than Express
- **Edge compatibility:** Works on Cloudflare Workers, Deno, Bun
- **Modern API:** Better TypeScript support
- **Lightweight:** Minimal dependencies

### Why tRPC for API Layer?

- **End-to-end type safety:** Compile-time guarantees
- **No code generation:** Direct TypeScript inference
- **Developer experience:** Autocomplete, inline docs
- **Refactoring confidence:** Breaking changes caught immediately

### Why Drizzle over Prisma?

- **Performance:** No query engine overhead
- **SQL-like syntax:** More control over queries
- **TypeScript-first:** Better type inference
- **Lightweight:** Smaller bundle size
- **Flexibility:** Direct SQL access when needed

### UUID v7 for IDs

- **Sortable:** Lexicographically ordered by creation time
- **Indexable:** Better B-tree index performance than UUID v4
- **Unique:** No collision risk across distributed systems
- **Time-aware:** Can extract creation timestamp

### PostgreSQL Full-Text Search

- **Native support:** No external search engine needed
- **tsvector + GIN index:** Fast search performance
- **Ranking:** Built-in relevance scoring
- **Simple deployment:** One less service to manage

---

## MCP Server Integration

The Model Context Protocol (MCP) server enables AI assistants to interact with DEX:

**Available Tools:**

- `test_echo` - Connection test
- `view_collections` - List accessible collections
- `add_items_to_collection` - Batch add URLs
- `search_items` - Full-text search across items
- `create_collection` - Create new collection (full_access only)

**Authentication:**

- Uses API keys with X-API-Key header
- Respects API key mode (full_access vs collection_specific)
- Rate limiting applies

**Use Cases:**

- AI assistant can save links during conversations
- Organize research materials automatically
- Search saved content for context

---

## Deployment Architecture

### Development

- Database: Docker Compose (PostgreSQL)
- Server: tsx watch mode on port 8787
- Web: Vite dev server on port 5173
- Extension: WXT dev mode with hot reload

### Production

- Database: Managed PostgreSQL
- Server: Docker container on DigitalOcean
- Web: Docker container with Nginx on DigitalOcean
- Extension: Packaged as ZIP for Chrome Web Store

**CI/CD:**

- GitHub Actions for automated builds
- Docker images pushed to DigitalOcean Registry
- Separate workflows for web and server deployments
