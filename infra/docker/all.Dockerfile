FROM node:24-alpine AS build

RUN corepack enable
WORKDIR /app

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY apps/api/package.json apps/api/package.json
COPY apps/web/package.json apps/web/package.json
COPY packages/dataset/package.json packages/dataset/package.json
COPY packages/shared/package.json packages/shared/package.json
RUN pnpm install --frozen-lockfile

COPY data.dat ./data.dat
COPY scripts ./scripts
COPY data ./data
COPY apps/api ./apps/api
COPY apps/web ./apps/web
COPY packages/dataset ./packages/dataset
COPY packages/shared ./packages/shared
RUN pnpm build

FROM node:24-alpine AS runtime

RUN apk add --no-cache nginx
WORKDIR /app
ENV NODE_ENV=production

COPY infra/docker/nginx.conf /etc/nginx/http.d/default.conf
COPY infra/docker/start-all.sh /usr/local/bin/start-love-story
COPY --from=build /app/apps/api/dist ./api/dist
COPY --from=build /app/apps/web/dist /usr/share/nginx/html

EXPOSE 80 3000
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD wget -qO- http://127.0.0.1/ >/dev/null && wget -qO- http://127.0.0.1:3000/healthz >/dev/null || exit 1

ENTRYPOINT ["sh", "/usr/local/bin/start-love-story"]
