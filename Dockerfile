# Imagem de produção otimizada para a plataforma Domus Consórcios
FROM node:22-alpine AS builder

WORKDIR /app

RUN corepack enable && corepack prepare pnpm@latest --activate

COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

COPY . .

RUN pnpm typecheck && pnpm test && pnpm build

# Stage de Execução Estática com Nginx
FROM nginx:alpine-slim

COPY --from=builder /app/dist /usr/share/nginx/html

# Configuração de SPA com fallback para index.html (/plataforma/site, etc.)
RUN echo 'server { \
    listen 80; \
    server_name _; \
    root /usr/share/nginx/html; \
    index index.html; \
    location / { \
        try_files $uri $uri/ /index.html; \
    } \
    location ~* \.(?:css|js|jpg|jpeg|gif|png|ico|cur|gz|svg|svgz|mp4|ogg|ogv|webm|htc)$ { \
        expires 1y; \
        access_log off; \
        add_header Cache-Control "public"; \
    } \
}' > /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
