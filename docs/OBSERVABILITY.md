# Mastra observability

Dex uses the latest stable Mastra releases checked on November 20, 2026:

| Package                 | Version |
| ----------------------- | ------- |
| `@mastra/core`          | 1.85.0  |
| `@mastra/observability` | 1.24.2  |
| `@mastra/pg`            | 1.37.0  |
| `@mastra/ai-sdk`        | 1.12.0  |
| `mastra` CLI            | 1.40.1  |

The lockfile records the complete compatible dependency set. Use Node.js
22.13 or newer and pnpm 10.28.1.

## Start the app and Studio

From the repository root:

```sh
pnpm install --frozen-lockfile
pnpm db:up
pnpm db:migrate
pnpm --parallel --filter @repo/server --filter @repo/web dev
```

In another terminal:

```sh
pnpm --filter @repo/server mastra:studio
```

- Dex: http://localhost:5173
- API: http://localhost:8787
- Studio: http://localhost:3002

The Studio script connects to port 8787 with the `/mastra` API prefix. Open
Studio's Observability pages to inspect traces, logs, and metrics after running
an agent. Normal chat still requires a configured AI provider key.

## Storage and configuration

`src/mastra/observability.ts` configures the `dex` service with the
`MastraStorageExporter`. It records agent/model/tool spans, correlated logs,
and automatically extracted usage/timing metrics. The built-in sensitive data
filter is enabled by default. Only `userId`, `provider`, and `model` are copied
from request context into span metadata; raw request headers, bodies, and
resolved model objects are not logged.

`PostgresStoreVNext` keeps agent memory in its existing storage and puts the
observability data in the `dex_observability` schema. Its event-sourced storage
supports logs and metrics as well as in-progress and completed traces. Existing
legacy trace tables are preserved; their data is not copied into the new schema.

No external observability account or extra API key is required. Locally, the
observability database defaults to `DB_URL`. To use a separate PostgreSQL instance,
set `OBSERVABILITY_DB_URL` in `apps/server/.env`. The adapter manages its schema
and day partitions automatically. On the shared local database, its advisory
warning about sharing the primary instance is expected.

## Verification

Start PostgreSQL, configure the server `.env`, then run:

```sh
pnpm --filter @repo/server check-types
pnpm --filter @repo/server test:observability
pnpm build
```

The integration test creates isolated schemas, verifies parent/child spans,
credential redaction, request metadata, correlated logs, agent/model spans,
metrics, and complete AI SDK v6 chat streaming through Hono. It drops its test
schemas afterward. Model responses are mocked, so the test does not call a
paid model provider or require a model API key.

To inspect the running API:

```sh
pnpm --filter @repo/server exec mastra api \
  --url http://localhost:8787 --server-api-prefix /mastra \
  trace list '{"page":0,"perPage":10}'
```
