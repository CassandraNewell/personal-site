FROM node:20-alpine AS base
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
RUN corepack enable && corepack prepare pnpm@8.15.6 --activate

# Install dependencies from pruned lockfile
COPY --from=prepare /app/out/json/ .
RUN npm install -g napi-postinstall
RUN pnpm install --frozen-lockfile

# Copy source and build
COPY --from=prepare /app/out/full/ .
RUN pnpm turbo build --filter=api

# Generate Prisma client
RUN cd apps/api && npx prisma generate

# --- Run ---
FROM base AS runner
WORKDIR /app

RUN addgroup --system --gid 1001 appgroup
RUN adduser --system --uid 1001 appuser
USER appuser

COPY --from=builder --chown=appuser:appgroup /app/apps/api/dist ./apps/api/dist
COPY --from=builder --chown=appuser:appgroup /app/apps/api/package.json ./apps/api/package.json
# Copy workspace dependency builds
COPY --from=builder --chown=appuser:appgroup /app/node_modules ./node_modules
COPY --from=builder --chown=appuser:appgroup /app/packages ./packages

ENV NODE_ENV=production
EXPOSE 5001

CMD ["node", "apps/api/dist/main.js"]
