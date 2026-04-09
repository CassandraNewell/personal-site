FROM node:24-alpine AS base
RUN apk update && apk add --no-cache libc6-compat openssl

# --- Prepare: prune the monorepo for this app ---
FROM base AS prepare
RUN npm install -g turbo@^2
WORKDIR /app
COPY . .
RUN turbo prune api --docker

# --- Build ---
FROM base AS builder
WORKDIR /app
RUN corepack enable && corepack prepare pnpm@10.33.0 --activate

# Install dependencies from pruned lockfile
COPY --from=prepare /app/out/json/ .
RUN npm install -g napi-postinstall
RUN pnpm install --frozen-lockfile

# Copy source and build
COPY --from=prepare /app/out/full/ .

# Generate Prisma client (must happen before build so TypeScript types exist)
RUN cd apps/api && npx prisma generate

RUN pnpm turbo build --filter=api

# Bundle the api package with all production dependencies resolved
# (automatically includes workspace packages like @repo/logger)
RUN pnpm --filter api deploy --legacy --prod /app/deploy

# --- Run ---
FROM base AS runner
WORKDIR /app

RUN addgroup --system --gid 1001 appgroup
RUN adduser --system --uid 1001 appuser
USER appuser

COPY --from=builder --chown=appuser:appgroup /app/deploy .
COPY --chown=appuser:appgroup apps/api/docker-entrypoint.sh ./docker-entrypoint.sh

ENV NODE_ENV=production
EXPOSE 5001

CMD ["sh", "docker-entrypoint.sh"]
