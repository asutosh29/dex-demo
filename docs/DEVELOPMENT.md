# Development Guide

This guide covers everything you need to set up and develop DEX locally.

---

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** >= 22 (check with `node --version`)
- **pnpm** >= 10.28.1 (check with `pnpm --version`)
- **Docker** and **Docker Compose** (for PostgreSQL)
- **Git**

**Recommended:**

- Use [nvm](https://github.com/nvm-sh/nvm) or [fnm](https://github.com/Schniz/fnm) to manage Node versions
- Install pnpm globally: `npm install -g pnpm`

---

## Initial Setup

### 1. Clone the Repository

```bash
git clone https://github.com/sdslabs/cms.git
cd cms
```

### 2. Install Dependencies

```bash
pnpm install
```

This will install all dependencies for all workspaces (apps and packages).

### 3. Set Up Git Hooks

```bash
pnpm prepare
```

This installs Husky git hooks for:

- Pre-commit: Runs Prettier formatting on staged files
- Ensures code consistency across the team

---

## Environment Configuration

DEX requires environment variables for each application. Sample files are provided to help you get started.

### Server Environment (`apps/server/.env`)

Copy the sample file:

```bash
cp apps/server/sample.env apps/server/.env
```

Edit `apps/server/.env` with your configuration:

```env
# Database connection string
DB_URL=postgres://postgres:postgres@localhost:5432/postgres

# Application URLs
BACKEND_URL=http://localhost:8787
FRONTEND_URL=http://localhost:5173

# External API Keys
YOUTUBE_API_KEY=your_youtube_api_key_here
GROQ_API_KEY=your_groq_api_key_here

# Google OAuth (required for authentication)
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret

# Waitlist feature (optional)
WAITLIST_ENABLED=false
```

**Getting API Keys:**

- **YouTube API Key:** [Google Cloud Console](https://console.cloud.google.com/apis/credentials) - Enable YouTube Data API v3
- **Groq API Key:** [Groq Console](https://console.groq.com/) - For AI-powered summarization
- **Google OAuth:**
  1. Go to [Google Cloud Console](https://console.cloud.google.com/apis/credentials)
  2. Create OAuth 2.0 Client ID
  3. Add authorized redirect URI: `http://localhost:8787/api/auth/callback/google`

**Optional Waitlist Configuration:**

If you want to enable the waitlist feature, set `WAITLIST_ENABLED=true` and provide:

```env
GMAIL_USER=your_gmail@gmail.com
GOOGLE_APP_PASSWORD=your_app_password
GRIST_API_KEY=your_grist_api_key
GRIST_DOC_ID=your_grist_doc_id
GRIST_TABLE_ID=Waitlist
GRIST_AUTH_TOKEN=your_random_token
```

### Web Environment (`apps/web/.env`)

Copy the sample file:

```bash
cp apps/web/sample.env apps/web/.env
```

Edit `apps/web/.env`:

```env
VITE_BACKEND_URL=http://localhost:8787/
```

**Note:** The trailing slash is important!

### Extension Environment (`apps/extension/.env.local`)

For local development, create `apps/extension/.env.local`:

```env
WXT_BACKEND_URL=http://localhost:8787
WXT_FRONTEND_URL=http://localhost:5173
```

For production testing, point to production servers:

```env
WXT_BACKEND_URL=https://apidex.sdslabs.co
WXT_FRONTEND_URL=https://dex.sdslabs.co
```

---

## Database Setup

DEX uses PostgreSQL 16 with Docker Compose for local development.

### Start the Database

```bash
pnpm db:up
```

This starts a PostgreSQL container in the background with:

- User: `postgres`
- Password: `postgres`
- Database: `postgres`
- Port: `5432`

### Run Migrations

Apply database schema migrations:

```bash
pnpm db:migrate
```

This creates all necessary tables, indexes, and constraints.

### Open Drizzle Studio (Optional)

Explore your database with a GUI:

```bash
pnpm db:studio
```

Opens at `https://local.drizzle.studio` - a web-based database browser.

### Stop the Database

When you're done developing:

```bash
pnpm db:down
```

### Database Commands Reference

| Command            | Description                                       |
| ------------------ | ------------------------------------------------- |
| `pnpm db:up`       | Start PostgreSQL container                        |
| `pnpm db:down`     | Stop and remove PostgreSQL container              |
| `pnpm db:migrate`  | Run pending migrations                            |
| `pnpm db:generate` | Generate new migration from schema changes        |
| `pnpm db:push`     | Push schema directly (dev only, skips migrations) |
| `pnpm db:studio`   | Open Drizzle Studio database browser              |

---

## Running the Application

### Start All Applications

Run all apps in development mode simultaneously:

```bash
pnpm dev
```

This starts:

- **Web App:** http://localhost:5173
- **Server:** http://localhost:8787
- **Extension:** Development build with hot reload

### Start Individual Applications

If you want to run apps separately:

**Web App:**

```bash
pnpm --filter @repo/web dev
```

**Server:**

```bash
pnpm --filter @repo/server dev
```

**Extension:**

```bash
cd apps/extension
pnpm dev
```

### Access Points

- **Web Interface:** http://localhost:5173
- **API Server:** http://localhost:8787
- **API Documentation:** http://localhost:8787/api/trpc (tRPC endpoints)
- **Authentication:** http://localhost:8787/api/auth/\*

---

## Extension Development

### Development Mode

```bash
cd apps/extension
pnpm dev
```

This builds the extension in watch mode and outputs to `.output/chrome-mv3-dev/`.

### Load in Chrome

1. Open Chrome and navigate to `chrome://extensions/`
2. Enable **Developer mode** (toggle in top-right)
3. Click **Load unpacked**
4. Select the folder: `apps/extension/.output/chrome-mv3-dev/`

### Using the Extension

- Click the extension icon in toolbar, or
- Press `Ctrl+Shift+X` (Windows/Linux) or `Cmd+Shift+X` (Mac)
- The extension overlay appears in the top-right of any webpage

### Hot Reload

The extension automatically reloads when you make code changes. If it doesn't:

- Press `Alt+R` (reload extension command)
- Or manually click the reload button in `chrome://extensions/`

### Firefox Development

```bash
cd apps/extension
pnpm dev:firefox
```

Load in Firefox:

1. Navigate to `about:debugging#/runtime/this-firefox`
2. Click **Load Temporary Add-on**
3. Select any file in `apps/extension/.output/firefox-mv3-dev/`

### Production Build

**Chrome:**

```bash
cd apps/extension
pnpm build        # Build for Chrome
pnpm zip          # Package as ZIP for Chrome Web Store
```

**Firefox:**

```bash
pnpm build:firefox
pnpm zip:firefox
```

Output location: `apps/extension/.output/[browser]-mv3.zip`

---

## Database Migrations

Dex uses Drizzle ORM for type-safe database migrations. The migration workflow involves two steps: generating migration files from schema changes, then applying them to the database.

### Migration Workflow

#### 1. Modify Schema Files

Edit schema files in `apps/server/src/db/schema/`:

```typescript
// apps/server/src/db/schema/collections.ts
export const collections = pgTable("collections", {
  id: text("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description"), // ← New field added
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});
```

#### 2. Generate Migration File

```bash
pnpm db:generate
```

This command:

- Compares your schema with the database
- Generates SQL migration files in `apps/server/src/db/drizzle/`
- Creates timestamped files like `0005_cool_name.sql`

**Always review the generated SQL** before proceeding to ensure it matches your intent.

#### 3. Apply Migrations

```bash
pnpm db:migrate
```

This command:

- Applies all pending migrations to the database
- Updates the migrations tracking table
- Executes SQL in transaction (rollback on error)

### Complete Example

```bash
# 1. Make schema changes
# Edit apps/server/src/db/schema/collections.ts

# 2. Generate migration
pnpm db:generate
# Output: ✓ Generated migration: 0005_add_collection_description.sql

# 3. Review the SQL file
cat apps/server/src/db/drizzle/0005_add_collection_description.sql

# 4. Apply migration
pnpm db:migrate
# Output: ✓ Migrations applied successfully

# 5. Verify changes
pnpm db:studio
```

### Push Schema (Development Only)

For rapid prototyping, push schema changes directly without creating migrations:

```bash
pnpm db:push
```

**Warning:** This bypasses migration history. Use only in development.

**When to use:**

- Initial schema exploration
- Throwaway prototypes
- Local development experiments

**When NOT to use:**

- Production environments
- Shared development databases
- Any database with data you want to keep

### Migration Best Practices

- **Always review generated SQL** before committing to catch unexpected changes
- **Test migrations** on a copy of production data before deploying
- **Never edit applied migrations** - create a new migration to fix issues
- **Use descriptive schema changes** so generated migration names are meaningful
- **Commit migrations** to version control along with schema changes
- **Run migrations in CI/CD** to catch issues before production

---

## Adding UI Components

DEX uses shadcn/ui components in the shared `@repo/ui` package.

### Add a Component

```bash
pnpm ui-add <component-name>
```

**Examples:**

```bash
pnpm ui-add button
pnpm ui-add dialog
pnpm ui-add dropdown-menu
```

Components are added to `packages/ui/components/` and automatically available to all apps.

---

## Code Quality

### Format Code

```bash
pnpm format
```

Formats all TypeScript, JavaScript, JSON, Markdown, and CSS files with Prettier.

### Lint Code

```bash
pnpm lint
```

Runs ESLint across all workspaces.

### Type Checking

```bash
pnpm check-types
```

Runs TypeScript compiler in check mode (no output, just validation).

### Pre-commit Hooks

Husky automatically runs:

- Prettier on staged files (via lint-staged)
- Prevents commits with formatting issues

---

## Building for Production

### Build All Apps

```bash
pnpm build
```

Builds all applications in the correct dependency order (Turborepo handles this).

### Build Individual Apps

```bash
pnpm --filter @repo/web build
pnpm --filter @repo/server build
pnpm --filter dex build
```

### Build Outputs

- **Web:** `apps/web/dist/` - Static files ready for Nginx
- **Server:** `apps/server/dist/` - Node.js executable
- **Extension:** `apps/extension/.output/chrome-mv3/` - Extension files

---

## Troubleshooting

### Port Already in Use

If ports 5173, 8787, or 5432 are already in use:

**Find and kill the process:**

```bash
# On macOS/Linux
lsof -ti:5173 | xargs kill -9
lsof -ti:8787 | xargs kill -9

# On Windows
netstat -ano | findstr :5173
taskkill /PID <PID> /F
```

**Or change the port in your `.env` files.**

### Database Connection Issues

**Check if PostgreSQL is running:**

```bash
docker ps
```

You should see a container named `postgres` or similar.

**Restart the database:**

```bash
pnpm db:down
pnpm db:up
pnpm db:migrate
```

### Clean Reinstall

If you encounter dependency issues:

```bash
pnpm reinstall
```

This script:

1. Removes all `node_modules/` directories
2. Removes `pnpm-lock.yaml`
3. Clears pnpm store cache
4. Reinstalls everything fresh

### Extension Not Loading

1. Check the browser console for errors
2. Ensure `.env.local` has correct URLs
3. Rebuild: `cd apps/extension && pnpm build`
4. Reload extension in `chrome://extensions/`

### tRPC Type Errors

After changing server procedures:

1. Stop the dev server
2. Run `pnpm build` to regenerate types
3. Restart `pnpm dev`

### Environment Variable Not Found

**Server variables:** Must be in `apps/server/.env`
**Web variables:** Must be in `apps/web/.env` and prefixed with `VITE_`
**Extension variables:** Must be in `apps/extension/.env.local` and prefixed with `WXT_`

Restart the dev server after changing environment variables.

---

## IDE Setup

### VSCode (Recommended)

Install recommended extensions (workspace should prompt you):

- ESLint
- Prettier
- Tailwind CSS IntelliSense
- Prisma (for Drizzle schema syntax highlighting)

**Settings:**

```json
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  }
}
```

### TypeScript Path Aliases

The monorepo uses path aliases for clean imports:

```typescript
// ✅ Instead of this:
import { Button } from "../../../packages/ui/components/button";

// ✅ Use this:
import { Button } from "@repo/ui/components/button";
```

Aliases are configured in each app's `tsconfig.json`.

---

## Development Workflow

### Typical Development Day

```bash
# 1. Start database
pnpm db:up

# 2. Pull latest changes
git pull origin main

# 3. Install new dependencies (if any)
pnpm install

# 4. Run migrations (if any)
pnpm db:migrate

# 5. Start development
pnpm dev

# 6. Make changes, test locally

# 7. Format and commit
pnpm format
git add .
git commit -m "feat: add new feature"

# 8. Push changes
git push origin feature/your-feature-name
```

### Testing Changes

1. **Web App:** http://localhost:5173 - Test UI changes
2. **Extension:** Load in Chrome and test on real websites
3. **API:** Use tRPC panel or tools like Postman
4. **Database:** Check changes in Drizzle Studio

---

## Getting Help

- **GitHub Issues:** Report bugs or request features
- **Discussions:** Ask questions or share ideas
- **Documentation:** Refer to other docs in `/docs/`

Happy coding!
