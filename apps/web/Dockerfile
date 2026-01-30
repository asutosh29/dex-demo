# syntax=docker/dockerfile:1

# ==========================================
# Stage 1: Base - Setup pnpm
# ==========================================
FROM node:22-alpine AS base
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable
WORKDIR /app

# ==========================================
# Stage 2: Pruner - Create pruned monorepo
# ==========================================
FROM base AS pruner

# Install turbo globally using pnpm
RUN pnpm add -g turbo

COPY . .
RUN turbo prune @repo/web --docker

# ==========================================
# Stage 3: Installer - Install dependencies
# ==========================================
FROM base AS installer

# Copy pruned monorepo (full includes json + source)
COPY --from=pruner /app/out/full/ .
COPY --from=pruner /app/out/pnpm-lock.yaml ./pnpm-lock.yaml

# Install all dependencies (including devDependencies for build)
RUN --mount=type=cache,id=pnpm,target=/pnpm/store \
    pnpm install --frozen-lockfile

# ==========================================
# Stage 4: Builder - Build the application
# ==========================================
FROM installer AS builder

# Build arguments for environment variables
ARG VITE_BACKEND_URL
ENV VITE_BACKEND_URL=$VITE_BACKEND_URL

# Build the app using turbo
RUN pnpm turbo run build --filter=@repo/web

# ==========================================
# Stage 5: Runner - Production image
# ==========================================
FROM nginx:alpine AS runner

# Copy nginx config
COPY apps/web/nginx.conf /etc/nginx/conf.d/default.conf

# Copy built assets from builder
COPY --from=builder /app/apps/web/dist /usr/share/nginx/html

# Expose port
EXPOSE 80

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
    CMD wget --no-verbose --tries=1 --spider http://localhost/ || exit 1

# Start nginx
CMD ["nginx", "-g", "daemon off;"]
