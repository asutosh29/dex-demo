<p align="center">
  <img src="apps/web/public/logo.svg" alt="Dex Logo" width="80" height="80">
</p>

<h1 align="center">Dex</h1>

<p align="center">
  <strong>Pokedex for the web</strong>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/node-%3E%3D22-brightgreen" alt="Node Version">
  <img src="https://img.shields.io/badge/pnpm-10.28.1-orange" alt="pnpm">
</p>

<p align="center">
  <a href="#features">Features</a> •
  <a href="#tech-stack">Tech Stack</a> •
  <a href="#quick-start">Quick Start</a> •
  <a href="#documentation">Documentation</a> •
  <a href="#contributing">Contributing</a>
</p>

---

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Quick Start](#quick-start)
- [Project Structure](#project-structure)
- [Environment Variables](#environment-variables)
- [Available Scripts](#available-scripts)
- [Database Setup](#database-setup)
- [Extension Development](#extension-development)
- [MCP Server Integration](#mcp-server-integration)
- [Self-Hosting](#self-hosting)
- [Documentation](#documentation)
- [Contributing](#contributing)

---

## Features

- **Smart Collections** - Organize bookmarks into collections with team collaboration
- **Browser Extension** - Quick-save any webpage with Ctrl+Shift+X
- **AI-Powered** - Automatic content summarization and intelligent tagging
- **Full-Text Search** - Lightning-fast search across all your saved content
- **Team Collaboration** - Share collections with role-based access control
- **MCP Integration** - AI assistant integration via Model Context Protocol
- **API Access** - Programmatic access with API keys for automation
- **Dark Mode** - Beautiful interface with theme support
- **Privacy-First** - Self-hostable with full data ownership

---

## Tech Stack

| Layer              | Technology                                |
| ------------------ | ----------------------------------------- |
| **Frontend**       | React 19, Vite 7, TailwindCSS 4, Radix UI |
| **Backend**        | Hono, tRPC, Drizzle ORM, PostgreSQL 16    |
| **Extension**      | WXT Framework, Manifest V3                |
| **Authentication** | Better Auth, Google OAuth                 |
| **AI**             | Groq API (summarization)                  |
| **Monorepo**       | Turborepo, pnpm workspaces                |
| **Deployment**     | Docker, DigitalOcean                      |

---

## Quick Start

### Prerequisites

- Node.js >= 22
- pnpm >= 10.28.1
- Docker (for PostgreSQL)

### Installation

```bash
# Clone the repository
git clone https://github.com/sdslabs/dex.git
cd dex

# Install dependencies
pnpm install

# Set up environment variables
cp apps/server/sample.env apps/server/.env
cp apps/web/sample.env apps/web/.env

# Edit .env files with your credentials (see Environment Variables section below)

# Start PostgreSQL database
pnpm db:up

# Run database migrations
pnpm db:migrate

# Start all applications
pnpm dev
```

> **Note:** For detailed environment variable configuration, see the [Environment Variables](#environment-variables) section below.

Access the application:

- **Web App:** http://localhost:5173
- **API Server:** http://localhost:8787

---

## Project Structure

```
dex/
├── apps/
│   ├── web/              # React frontend application
│   │   ├── src/          # Source code
│   │   ├── public/       # Static assets (logo, etc.)
│   │   └── Dockerfile    # Production container
│   ├── server/           # Backend API server
│   │   ├── src/
│   │   │   ├── trpc/     # tRPC routers
│   │   │   ├── db/       # Database schema & migrations
│   │   │   ├── services/ # Business logic
│   │   │   └── mcp/      # MCP server
│   │   └── Dockerfile    # Production container
│   └── extension/        # Browser extension
│       ├── entrypoints/  # Content scripts & background
│       └── components/   # React components
├── packages/
│   └── ui/               # Shared component library
│       ├── components/   # Radix UI + custom components
│       └── hooks/        # Shared React hooks
├── docker/               # Docker Compose files
│   ├── docker-compose.db.yml   # PostgreSQL only
│   └── docker-compose.app.yml  # Full application stack
└── docs/                 # Documentation
```

---

## Environment Variables

### Server (`apps/server/.env`)

```env
# Database
DB_URL=postgres://postgres:postgres@localhost:5432/postgres

# Application URLs
BACKEND_URL=http://localhost:8787
FRONTEND_URL=http://localhost:5173

# External APIs
YOUTUBE_API_KEY=your_youtube_api_key
GROQ_API_KEY=your_groq_api_key

# Google OAuth (required for authentication)
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret

# Waitlist feature (optional)
WAITLIST_ENABLED=false
```

**Getting API Keys:**

- **YouTube API:** [Google Cloud Console](https://console.cloud.google.com/apis/credentials)
- **Groq API:** [Groq Console](https://console.groq.com/)
- **Google OAuth:** [Google Cloud Console](https://console.cloud.google.com/apis/credentials) - Add redirect URI: `http://localhost:8787/api/auth/callback/google`

### Web (`apps/web/.env`)

```env
VITE_BACKEND_URL=http://localhost:8787/
```

### Extension (`apps/extension/.env.local`)

```env
WXT_BACKEND_URL=http://localhost:8787
WXT_FRONTEND_URL=http://localhost:5173
```

---

## Available Scripts

### Development & Build

| Command            | Description                        |
| ------------------ | ---------------------------------- |
| `pnpm dev`         | Start all apps in development mode |
| `pnpm build`       | Build all apps for production      |
| `pnpm lint`        | Lint all code with ESLint          |
| `pnpm format`      | Format code with Prettier          |
| `pnpm check-types` | Run TypeScript type checking       |

### Database Commands

| Command            | Description                        |
| ------------------ | ---------------------------------- |
| `pnpm db:up`       | Start PostgreSQL container         |
| `pnpm db:down`     | Stop PostgreSQL container          |
| `pnpm db:migrate`  | Run database migrations            |
| `pnpm db:generate` | Generate new migration             |
| `pnpm db:push`     | Push schema to database (dev only) |
| `pnpm db:studio`   | Open Drizzle Studio                |

### UI Package Management

| Command                   | Description                                                  |
| ------------------------- | ------------------------------------------------------------ |
| `pnpm ui-add <component>` | Add shadcn/ui component to shared @repo/ui (web & extension) |

### Repository Utilities

| Command          | Description                     |
| ---------------- | ------------------------------- |
| `pnpm reinstall` | Clean reinstall of dependencies |

---

## Database Setup

Dex uses PostgreSQL 16 for data storage.

### Start Database

```bash
pnpm db:up
```

This starts a PostgreSQL container with:

- User: `postgres`
- Password: `postgres`
- Database: `postgres`
- Port: `5432`

### Run Migrations

```bash
pnpm db:migrate
```

This creates all necessary tables, indexes, and constraints.

### Database Browser

Open Drizzle Studio to explore your database:

```bash
pnpm db:studio
```

Access at `https://local.drizzle.studio`

### Stop Database

```bash
pnpm db:down
```

---

## Extension Development

### Development Mode

```bash
cd apps/extension
pnpm dev
```

### Load in Chrome

1. Open `chrome://extensions/`
2. Enable **Developer mode**
3. Click **Load unpacked**
4. Select `apps/extension/.output/chrome-mv3-dev/`

### Usage

- Click extension icon or press `Ctrl+Shift+X` (Windows/Linux) or `Cmd+Shift+X` (Mac)
- Extension overlay appears in top-right corner
- Select collections and save current page

### Production Build

```bash
cd apps/extension
pnpm build        # Build for Chrome
pnpm zip          # Package as ZIP for Chrome Web Store
```

Output: `apps/extension/.output/chrome-mv3.zip`

### Firefox

```bash
pnpm build:firefox
pnpm zip:firefox
```

---

## MCP Server Integration

Dex includes a Model Context Protocol (MCP) server that allows AI assistants like Claude to interact with your bookmarks directly from conversations.

### What is MCP?

The Model Context Protocol enables Claude Desktop to access your Dex collections, search saved content, and add new bookmarks during your conversations - making your knowledge base available to your AI assistant.

### Setup with Claude Desktop

#### 1. Create an API Key

First, create an API key in the Dex web interface:

1. Navigate to Settings → API Keys
2. Click "Create API Key"
3. Choose **Full Access** mode
4. Copy the generated key

#### 2. Configure Claude Desktop

Edit your Claude Desktop configuration file:

**macOS:** `~/Library/Application Support/Claude/claude_desktop_config.json`

**Windows:** `%APPDATA%\Claude\claude_desktop_config.json`

Add the MCP server configuration:

**For local development:**

```json
{
  "mcpServers": {
    "dex": {
      "command": "npx",
      "args": [
        "-y",
        "mcp-remote",
        "http://localhost:8787/mcp",
        "--header",
        "X-API-Key: YOUR_API_KEY_HERE"
      ]
    }
  }
}
```

**For production (hosted Dex):**

```json
{
  "mcpServers": {
    "dex": {
      "command": "npx",
      "args": [
        "-y",
        "mcp-remote",
        "https://apidex.sdslabs.co/mcp",
        "--header",
        "X-API-Key: YOUR_API_KEY_HERE"
      ]
    }
  }
}
```

Replace `YOUR_API_KEY_HERE` with the API key you generated in step 1.

#### 3. Restart Claude Desktop

Restart Claude Desktop to load the new MCP server configuration.

### Available Commands

Once configured, you can use these natural language commands in Claude:

- "Save this article to my Reading List collection"
- "Search my bookmarks for React tutorials"
- "Show me my collections"
- "Create a new collection called Research Papers"
- "What bookmarks do I have about machine learning?"

### Verify Integration

Ask Claude: "Can you show me my Dex collections?"

Claude should respond with your collections list, confirming the integration is working.

### Troubleshooting

**MCP server not connecting:**

- Verify Dex server is running (`pnpm dev` for local or ensure production instance is up)
- Check API key is valid and has not expired
- Ensure the MCP URL is correct (`http://localhost:8787/mcp` for local, `https://apidex.sdslabs.co/mcp` for production)
- Check Claude Desktop logs for error messages

**API key issues:**

- Generate a new API key in Dex settings
- Ensure you selected "Full Access" mode
- Copy the entire API key and paste it in the configuration

**For more details on MCP integration, see the [API Documentation](docs/API.md#mcp-server-api).**

---

## Self-Hosting

Dex can be easily self-hosted using Docker Compose for complete control over your data.

### Prerequisites

- Docker and Docker Compose installed
- Domain name (optional, but recommended)
- SSL certificate (optional, use Let's Encrypt with Certbot)

### Quick Self-Host Setup

#### 1. Clone the Repository

```bash
git clone https://github.com/sdslabs/dex.git
cd dex
```

#### 2. Configure Environment Variables

Create production environment files:

```bash
# Server environment
cp apps/server/sample.env apps/server/.env
```

Edit `apps/server/.env` with your production values:

```env
DB_URL=postgres://postgres:your_secure_password@db:5432/postgres
BACKEND_URL=https://api.yourdomain.com
FRONTEND_URL=https://yourdomain.com
YOUTUBE_API_KEY=your_youtube_api_key
GROQ_API_KEY=your_groq_api_key
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
WAITLIST_ENABLED=false
```

**Important:**

- Change PostgreSQL password in both `.env` and `docker-compose.app.yml`
- Update `BACKEND_URL` and `FRONTEND_URL` to your domain
- Set up Google OAuth with your production redirect URI: `https://api.yourdomain.com/api/auth/callback/google`

#### 3. Update Docker Compose

Edit `docker/docker-compose.app.yml` to set your backend URL:

```yaml
services:
  web:
    build:
      args:
        VITE_BACKEND_URL: https://api.yourdomain.com/
```

#### 4. Start the Stack

```bash
docker compose -f docker/docker-compose.app.yml up -d
```

This starts:

- **PostgreSQL 16** - Database on port 5432
- **Backend API** - Hono server on port 8787
- **Frontend Web** - Nginx serving React app on port 3000

#### 5. Run Database Migrations

```bash
# Connect to the server container
docker compose -f docker/docker-compose.app.yml exec server sh

# Run migrations
pnpm db:migrate

# Exit container
exit
```

#### 6. Access Your Instance

- Frontend: `http://localhost:3000` (or your domain)
- API: `http://localhost:8787` (or your API domain)

### Production Considerations

#### Reverse Proxy Setup

Use Nginx or Caddy as a reverse proxy for SSL termination:

**Example Nginx configuration:**

```nginx
# Frontend
server {
    listen 443 ssl http2;
    server_name yourdomain.com;

    ssl_certificate /path/to/cert.pem;
    ssl_certificate_key /path/to/key.pem;

    location / {
        proxy_pass http://localhost:3000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}

# Backend API
server {
    listen 443 ssl http2;
    server_name api.yourdomain.com;

    ssl_certificate /path/to/cert.pem;
    ssl_certificate_key /path/to/key.pem;

    location / {
        proxy_pass http://localhost:8787;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

#### Database Backups

Set up regular PostgreSQL backups:

```bash
# Manual backup
docker compose -f docker/docker-compose.app.yml exec db \
  pg_dump -U postgres postgres > backup_$(date +%Y%m%d).sql

# Restore from backup
docker compose -f docker/docker-compose.app.yml exec -T db \
  psql -U postgres postgres < backup_20240101.sql
```

#### Persistent Data

Data is stored in Docker volumes:

- `postgres_data` - Database files
- Ensure regular backups of this volume

#### Resource Requirements

Minimum recommended resources:

- **CPU:** 2 cores
- **RAM:** 4GB
- **Storage:** 20GB (plus space for your bookmarks)

#### Security Checklist

- [ ] Change default PostgreSQL password
- [ ] Use HTTPS with valid SSL certificates
- [ ] Set up firewall rules (only expose ports 80 and 443)
- [ ] Keep Docker images updated
- [ ] Regular database backups
- [ ] Monitor logs for suspicious activity
- [ ] Use strong Google OAuth credentials

### Development with Docker

For local development with Docker:

```bash
# Start database only
docker compose -f docker/docker-compose.db.yml up -d

# Run app locally
pnpm dev
```

### Updating Your Instance

```bash
# Pull latest changes
git pull origin main

# Rebuild and restart containers
docker compose -f docker/docker-compose.app.yml up -d --build

# Run new migrations
docker compose -f docker/docker-compose.app.yml exec server pnpm db:migrate
```

### Troubleshooting

**Containers won't start:**

```bash
# Check logs
docker compose -f docker/docker-compose.app.yml logs

# Check specific service
docker compose -f docker/docker-compose.app.yml logs server
```

**Database connection failed:**

- Verify DB_URL in `apps/server/.env`
- Ensure database container is healthy: `docker ps`
- Check database logs: `docker compose -f docker/docker-compose.app.yml logs db`

**Cannot log in:**

- Verify Google OAuth credentials
- Check redirect URI matches: `{BACKEND_URL}/api/auth/callback/google`
- Ensure FRONTEND_URL and BACKEND_URL are correct

---

## Documentation

Comprehensive documentation is available in the `/docs` folder:

- **[Architecture](docs/ARCHITECTURE.md)** - System design, data flow, and technical decisions
- **[Development Guide](docs/DEVELOPMENT.md)** - Detailed setup and development workflow
- **[API Reference](docs/API.md)** - Complete API documentation with examples
- **[Contributing](docs/CONTRIBUTING.md)** - How to contribute to the project

---

## Contributing

We welcome contributions! Please see our [Contributing Guide](docs/CONTRIBUTING.md) for details.

### Quick Contribution Steps

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature`
3. Make your changes
4. Run quality checks: `pnpm format && pnpm lint && pnpm build`
5. Commit with conventional commits: `git commit -m "feat: add new feature"`
6. Push and create a Pull Request

### Development Workflow

```bash
# Start database
pnpm db:up

# Start development
pnpm dev

# Make changes...

# Format code
pnpm format

# Commit changes
git commit -m "feat(web): add dark mode toggle"
```

---

## Acknowledgments

Built with love by [SDSLabs](https://sdslabs.co/)

Special thanks to all contributors who have helped make Dex better!

---

<p align="center">
  <sub>Made with TypeScript, React, and lots of coffee</sub>
</p>
