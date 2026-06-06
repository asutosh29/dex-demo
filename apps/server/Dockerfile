# syntax=docker/dockerfile:1

# ==========================================
# Stage 1: Base - Setup pnpm
# ==========================================
FROM node:22-alpine AS base
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME/bin:$PATH"
RUN corepack enable
RUN npm install -g turbo
WORKDIR /app

# ==========================================
# Stage 2: Pruner - Create pruned monorepo
# ==========================================
FROM base AS pruner

COPY . .
RUN turbo prune @repo/server --docker

# ==========================================
# Stage 3: Installer - Install dependencies
# ==========================================
FROM base AS installer

# Copy pruned monorepo (full includes json + source)
COPY --from=pruner /app/out/full/ .
COPY --from=pruner /app/out/pnpm-lock.yaml ./pnpm-lock.yaml

# Install all dependencies for build
RUN --mount=type=cache,id=pnpm,target=/pnpm/store \
    pnpm install --frozen-lockfile --ignore-scripts

# ==========================================
# Stage 4: Builder - Build the application
# ==========================================
FROM installer AS builder

# Build the app using turbo
RUN turbo run build --filter=@repo/server

# ==========================================
# Stage 5: Runner - Production image
# ==========================================
FROM node:22-alpine AS runner

# Install tini for proper signal handling
RUN apk add --no-cache tini

# Create non-root user
RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 hono

WORKDIR /app

# Copy workspace structure for proper module resolution
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

# Copy entire apps/server directory (includes node_modules symlinks created by pnpm)
COPY --from=builder /app/apps/server ./apps/server

# Switch to non-root user
USER hono

# Expose port
EXPOSE 8787

# Health check using /ping endpoint
HEALTHCHECK --interval=30s --timeout=3s --start-period=10s --retries=3 \
    CMD node -e "require('http').get('http://localhost:8787/ping', (r) => r.statusCode === 200 ? process.exit(0) : process.exit(1))"

# Use tini as entrypoint for proper signal handling
ENTRYPOINT ["/sbin/tini", "--"]

# Start the server
CMD ["node", "apps/server/dist/index.js"]
