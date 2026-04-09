FROM node:24-alpine AS base
RUN apk update && apk add --no-cache libc6-compat

# --- Prepare: prune the monorepo for this app ---
FROM base AS prepare
RUN npm install -g turbo@^2
WORKDIR /app
COPY . .
RUN turbo prune client --docker

# --- Build ---
FROM base AS builder
WORKDIR /app
RUN corepack enable && corepack prepare pnpm@10.33.0 --activate

# Install dependencies from pruned lockfile
COPY --from=prepare /app/out/json/ .
RUN npm install -g napi-postinstall
# Use hoisted layout so dependencies survive Docker COPY between stages
# (pnpm's default symlink-based layout breaks when copied)
RUN echo "node-linker=hoisted" >> .npmrc
RUN pnpm install --frozen-lockfile

# Copy source and build
COPY --from=prepare /app/out/full/ .
RUN pnpm turbo build --filter=client

# --- Run ---
FROM nginx:alpine AS runner

COPY --from=builder /app/apps/client/build/client /usr/share/nginx/html

# SPA fallback: serve index.html for all routes
RUN printf 'server {\n\
    listen 80;\n\
    location / {\n\
        root /usr/share/nginx/html;\n\
        try_files $uri $uri/ /index.html;\n\
    }\n\
}\n' > /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
