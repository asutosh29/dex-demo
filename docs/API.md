# API Documentation

DEX provides a type-safe API built with tRPC for client-server communication. This document covers all available endpoints and their usage.

---

## Overview

**Base URL:** `{BACKEND_URL}/api/trpc`

**Protocol:** tRPC (Type-safe Remote Procedure Call)

**Authentication:** Session-based via Better Auth or API Key (X-API-Key header)

**Content Type:** `application/json`

---

## Authentication

### Session-Based Authentication

DEX uses Better Auth for session-based authentication:

**Endpoints:**

- `POST /api/auth/sign-in/google` - Initiate Google OAuth flow
- `POST /api/auth/sign-out` - Sign out and destroy session
- `GET /api/auth/session` - Get current user session

**Flow:**

1. User clicks "Sign in with Google"
2. Redirected to Google OAuth consent screen
3. Google redirects back with authorization code
4. Backend exchanges code for tokens and creates session
5. Session cookie stored in browser
6. Subsequent requests include session cookie automatically

### API Key Authentication

For programmatic access (e.g., MCP server, CLI tools):

**Header Format:**

```
X-API-Key: dex_live_abc123...
```

**Creating API Keys:**

Use the tRPC `apiKeys.create` mutation or the web interface.

**API Key Modes:**

1. **Full Access Mode**
   - Access to all user collections
   - Can create new collections
   - Ideal for personal automation

2. **Collection-Specific Mode**
   - Access limited to specified collections
   - Cannot create new collections
   - Ideal for third-party integrations

---

## tRPC Routers

### Items Router (`items.*`)

Manage bookmarks and notes.

#### `items.create`

Create a new item.

**Type:** `mutation`

**Input:**

```typescript
{
  url: string;          // URL to save
  collectionId?: string; // Optional: add to collection immediately
}
```

**Returns:**

```typescript
{
  id: string;
  url: string;
  title: string;
  tldr: string | null;
  tags: string[];
  favicon: string | null;
  image: string | null;
  creatorId: string;
  createdAt: Date;
  updatedAt: Date;
}
```

**Example:**

```typescript
const item = await trpc.items.create.mutate({
  url: "https://example.com/article",
  collectionId: "col_123",
});
```

---

#### `items.update`

Update an existing item.

**Type:** `mutation`

**Input:**

```typescript
{
  id: string;
  title?: string;
  tldr?: string;
  tags?: string[];
}
```

**Returns:** Updated item object

---

#### `items.search`

Full-text search across all items.

**Type:** `query`

**Input:**

```typescript
{
  query: string; // Search query
}
```

**Returns:** Array of matching items with relevance ranking

**Example:**

```typescript
const results = await trpc.items.search.useQuery({
  query: "javascript tutorial",
});
```

---

#### `items.getRecents`

Get recently created items.

**Type:** `query`

**Input:**

```typescript
{
  limit?: number; // Default: 10
}
```

**Returns:** Array of items, sorted by creation date (newest first)

---

#### `items.checkItemExists`

Check if a URL already exists in user's collections.

**Type:** `query`

**Input:**

```typescript
{
  url: string; // Valid URL
}
```

**Returns:**

```typescript
{
  exists: boolean;
  collections: Array<{
    id: string;
    title: string;
  }>;
}
```

---

### Collections Router (`collections.*`)

Manage collections of items.

#### `collections.getUserCollections`

Get all collections accessible by the current user.

**Type:** `query`

**Input:**

```typescript
{
  sortBy?: 'createdAt' | 'updatedAt' | 'title';
  order?: 'asc' | 'desc';
}
```

**Returns:**

```typescript
Array<{
  id: string;
  title: string;
  createdAt: Date;
  updatedAt: Date;
  role: "owner" | "admin" | "member";
  isShared: boolean;
  memberCount: number;
}>;
```

---

#### `collections.get`

Get a single collection with all its items.

**Type:** `query`

**Input:**

```typescript
{
  id: string; // Collection ID
}
```

**Returns:**

```typescript
{
  id: string;
  title: string;
  createdAt: Date;
  updatedAt: Date;
  items: Array<Item>;
  members: Array<{
    userId: string;
    role: "owner" | "admin" | "member";
  }>;
}
```

---

#### `collections.create`

Create a new collection.

**Type:** `mutation`

**Input:**

```typescript
{
  title: string; // Collection name
}
```

**Returns:** Created collection object

---

#### `collections.update`

Update collection details.

**Type:** `mutation`

**Input:**

```typescript
{
  id: string;
  title: string;
}
```

**Returns:** Updated collection object

**Permissions:** Owner or Admin

---

#### `collections.delete`

Delete a collection and all its contents.

**Type:** `mutation`

**Input:**

```typescript
{
  id: string;
}
```

**Returns:** Success confirmation

**Permissions:** Owner only

---

#### `collections.addItem`

Add an existing item to a collection.

**Type:** `mutation`

**Input:**

```typescript
{
  collectionId: string;
  itemId: string;
}
```

**Returns:** Success confirmation

---

#### `collections.removeItem`

Remove an item from a collection.

**Type:** `mutation`

**Input:**

```typescript
{
  collectionId: string;
  itemId: string;
}
```

**Returns:** Success confirmation

**Note:** This doesn't delete the item, just removes it from the collection.

---

#### `collections.copyItem`

Copy an item from one collection to another.

**Type:** `mutation`

**Input:**

```typescript
{
  itemId: string;
  fromCollectionId: string;
  toCollectionId: string;
}
```

**Returns:** Success confirmation

**Note:** Item exists in both collections after this operation.

---

#### `collections.moveItem`

Move an item from one collection to another.

**Type:** `mutation`

**Input:**

```typescript
{
  itemId: string;
  fromCollectionId: string;
  toCollectionId: string;
}
```

**Returns:** Success confirmation

**Note:** Item is removed from source collection.

---

#### `collections.getCollectionsAndItemsCount`

Get count of collections and total items.

**Type:** `query`

**Input:** None

**Returns:**

```typescript
{
  collectionsCount: number;
  itemsCount: number;
}
```

---

### Collection Access Router (`collectionAccess.*`)

Manage collection sharing and permissions.

#### `collectionAccess.getMembers`

Get all members of a collection.

**Type:** `query`

**Input:**

```typescript
{
  collectionId: string;
}
```

**Returns:**

```typescript
Array<{
  userId: string;
  userName: string;
  userEmail: string;
  userImage: string | null;
  role: "owner" | "admin" | "member";
}>;
```

---

#### `collectionAccess.addMember`

Add a new member to a collection.

**Type:** `mutation`

**Input:**

```typescript
{
  collectionId: string;
  userId: string;
  role: "admin" | "member";
}
```

**Returns:** Success confirmation

**Permissions:** Owner or Admin

**Note:** Cannot add users as owner (use transferOwnership instead).

---

#### `collectionAccess.removeMember`

Remove a member from a collection.

**Type:** `mutation`

**Input:**

```typescript
{
  collectionId: string;
  userId: string;
}
```

**Returns:** Success confirmation

**Permissions:** Owner or Admin

**Note:** Cannot remove the owner.

---

#### `collectionAccess.promoteMemberToAdmin`

Promote a member to admin role.

**Type:** `mutation`

**Input:**

```typescript
{
  collectionId: string;
  userId: string;
}
```

**Returns:** Success confirmation

**Permissions:** Owner only

---

#### `collectionAccess.demoteAdminToMember`

Demote an admin to member role.

**Type:** `mutation`

**Input:**

```typescript
{
  collectionId: string;
  userId: string;
}
```

**Returns:** Success confirmation

**Permissions:** Owner only

---

#### `collectionAccess.transferOwnership`

Transfer collection ownership to another user.

**Type:** `mutation`

**Input:**

```typescript
{
  collectionId: string;
  newOwnerId: string;
}
```

**Returns:** Success confirmation

**Permissions:** Owner only

**Note:** Previous owner becomes an admin after transfer.

---

#### `collectionAccess.leaveCollection`

Leave a collection (remove self).

**Type:** `mutation`

**Input:**

```typescript
{
  collectionId: string;
}
```

**Returns:** Success confirmation

**Note:** Cannot leave if you're the owner. Transfer ownership first.

---

#### `collectionAccess.stepDownFromAdmin`

Step down from admin to member role.

**Type:** `mutation`

**Input:**

```typescript
{
  collectionId: string;
}
```

**Returns:** Success confirmation

---

### API Keys Router (`apiKeys.*`)

Manage API keys for programmatic access.

#### `apiKeys.create`

Create a new API key.

**Type:** `mutation`

**Input:**

```typescript
{
  name: string;                    // Descriptive name
  mode: 'full_access' | 'collection_specific';
  expiresIn?: number;              // Seconds (optional, null = never expires)
  collectionIds?: string[];        // Required if mode is collection_specific
}
```

**Returns:**

```typescript
{
  id: string;
  name: string;
  key: string; // Full key (shown only once!)
  prefix: string; // e.g., "dex_live_"
  mode: string;
  expiresAt: Date | null;
  createdAt: Date;
}
```

**Important:** The full `key` is only returned once. Store it securely!

---

#### `apiKeys.list`

List all API keys for the current user.

**Type:** `query`

**Input:** None

**Returns:**

```typescript
Array<{
  id: string;
  name: string;
  prefix: string;
  start: string; // First few characters of key
  mode: string;
  enabled: boolean;
  expiresAt: Date | null;
  lastRequest: Date | null;
  requestCount: number;
  createdAt: Date;
}>;
```

**Note:** Full keys are never returned after creation.

---

#### `apiKeys.delete`

Delete an API key.

**Type:** `mutation`

**Input:**

```typescript
{
  keyId: string;
}
```

**Returns:** Success confirmation

---

#### `apiKeys.grantCollectionAccess`

Grant an API key access to a specific collection.

**Type:** `mutation`

**Input:**

```typescript
{
  apiKeyId: string;
  collectionId: string;
}
```

**Returns:** Success confirmation

**Note:** Only applicable for collection_specific mode API keys.

---

#### `apiKeys.revokeCollectionAccess`

Revoke an API key's access to a collection.

**Type:** `mutation`

**Input:**

```typescript
{
  apiKeyId: string;
  collectionId: string;
}
```

**Returns:** Success confirmation

---

### Users Router (`users.*`)

Search and find users.

#### `users.search`

Search for users by name or email.

**Type:** `query`

**Input:**

```typescript
{
  query: string; // Search term (min 1 character)
}
```

**Returns:**

```typescript
Array<{
  id: string;
  name: string;
  email: string;
  image: string | null;
}>;
```

**Note:** Limited to 10 results. Only searches active users if waitlist is enabled.

---

### OGP Router (`ogp.*`)

Fetch metadata and embedding information for URLs.

#### `ogp.getOembed`

Get OpenGraph/oEmbed metadata for a URL.

**Type:** `query` (public, no auth required)

**Input:**

```typescript
{
  url: string; // Valid URL
}
```

**Returns:**

```typescript
{
  title?: string;
  description?: string;
  image?: string;
  favicon?: string;
  author?: string;
  siteName?: string;
}
```

---

#### `ogp.canIframe`

Check if a URL can be embedded in an iframe.

**Type:** `query` (public, no auth required)

**Input:**

```typescript
{
  url: string; // Valid URL
}
```

**Returns:** `boolean`

**Note:** Checks X-Frame-Options and Content-Security-Policy headers.

---

## MCP Server API

DEX includes a Model Context Protocol (MCP) server for AI assistant integration.

**Endpoint:** `POST /mcp`

**Authentication:** API Key (X-API-Key header)

**Protocol:** JSON-RPC 2.0

### Available Tools

#### `test_echo`

Echo test for connection verification.

**Input:**

```json
{
  "message": "Hello"
}
```

**Returns:**

```json
{
  "message": "Hello"
}
```

---

#### `view_collections`

List all collections accessible by the API key.

**Input:** None

**Returns:**

```json
{
  "collections": [
    {
      "id": "col_123",
      "title": "Reading List",
      "itemCount": 42
    }
  ]
}
```

---

#### `add_items_to_collection`

Add multiple URLs to a collection.

**Input:**

```json
{
  "collectionId": "col_123",
  "urls": ["https://example.com/1", "https://example.com/2"]
}
```

**Returns:**

```json
{
  "added": 2,
  "failed": 0,
  "items": [...]
}
```

---

#### `search_items`

Full-text search across items.

**Input:**

```json
{
  "query": "javascript",
  "limit": 10
}
```

**Returns:**

```json
{
  "results": [
    {
      "id": "item_123",
      "title": "JavaScript Tutorial",
      "url": "https://example.com/js",
      "tldr": "Learn JavaScript basics..."
    }
  ]
}
```

---

#### `create_collection`

Create a new collection.

**Input:**

```json
{
  "title": "New Reading List"
}
```

**Returns:**

```json
{
  "id": "col_456",
  "title": "New Reading List"
}
```

**Note:** Only available for full_access mode API keys.

---

## Error Handling

### tRPC Error Codes

| Code                    | Description                         |
| ----------------------- | ----------------------------------- |
| `BAD_REQUEST`           | Invalid input or malformed request  |
| `UNAUTHORIZED`          | Not authenticated                   |
| `FORBIDDEN`             | Insufficient permissions            |
| `NOT_FOUND`             | Resource not found                  |
| `CONFLICT`              | Resource already exists or conflict |
| `INTERNAL_SERVER_ERROR` | Server error                        |

### Error Response Format

```typescript
{
  error: {
    code: 'UNAUTHORIZED',
    message: 'You must be logged in to access this resource'
  }
}
```

### Common Errors

**401 Unauthorized:**

- No valid session or API key
- API key expired or revoked

**403 Forbidden:**

- Insufficient permissions for collection
- Trying to perform owner-only action as admin/member

**404 Not Found:**

- Collection, item, or user doesn't exist
- User doesn't have access to resource

**409 Conflict:**

- Item already exists in collection
- Duplicate collection title (if enforced)

---

## Rate Limiting

**API Key Rate Limits:**

- Default: 100 requests per minute
- Configurable per API key
- Uses token bucket algorithm with refill

**Rate Limit Headers:**

```
X-RateLimit-Limit: 100
X-RateLimit-Remaining: 95
X-RateLimit-Reset: 1634567890
```

**Rate Limit Exceeded Response:**

```json
{
  "error": {
    "code": "TOO_MANY_REQUESTS",
    "message": "Rate limit exceeded. Try again in 42 seconds."
  }
}
```

---

## TypeScript Client Usage

### Setup

```typescript
import { createTRPCProxyClient, httpBatchLink } from "@trpc/client";
import type { AppRouter } from "@repo/server";

const trpc = createTRPCProxyClient<AppRouter>({
  links: [
    httpBatchLink({
      url: "http://localhost:8787/api/trpc",
      headers: {
        "X-API-Key": "dex_live_your_key_here", // Or use session cookies
      },
    }),
  ],
});
```

### Making Requests

**Query:**

```typescript
const collections = await trpc.collections.getUserCollections.query({
  sortBy: "updatedAt",
  order: "desc",
});
```

**Mutation:**

```typescript
const newCollection = await trpc.collections.create.mutate({
  title: "My New Collection",
});
```

### React Hooks

```typescript
import { trpc } from '~/lib/trpc';

function CollectionList() {
  const { data, isLoading } = trpc.collections.getUserCollections.useQuery();
  const createMutation = trpc.collections.create.useMutation();

  const handleCreate = async () => {
    await createMutation.mutateAsync({ title: 'New Collection' });
  };

  if (isLoading) return <div>Loading...</div>;

  return <div>{/* Render collections */}</div>;
}
```

---

## Best Practices

1. **Use TypeScript:** Take advantage of end-to-end type safety
2. **Handle Errors:** Always catch and handle tRPC errors gracefully
3. **Batch Requests:** tRPC batches queries automatically for performance
4. **Cache Wisely:** Use TanStack Query for intelligent caching
5. **Secure API Keys:** Never expose API keys in client-side code
6. **Check Permissions:** Verify user has access before showing UI actions
7. **Validate Input:** Use Zod schemas for runtime validation

---

For more details on the architecture and implementation, see [ARCHITECTURE.md](./ARCHITECTURE.md).
