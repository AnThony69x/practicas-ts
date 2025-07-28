# --- ETAPA 1: CONSTRUCCIÓN (BUILD) ---
FROM node:18 AS build

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

# --- ETAPA 2: PRODUCCIÓN (FINAL) ---
FROM node:18 AS production

WORKDIR /app

COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/dist ./dist

COPY package*.json ./
# COPY .env ./.env

EXPOSE 3000
ENV NODE_OPTIONS=--experimental-global-webcrypto
CMD ["node", "dist/src/main"]