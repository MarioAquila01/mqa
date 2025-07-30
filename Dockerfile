# Etapa de build
FROM node:18-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Etapa de produção (container final leve com serve)
FROM node:18-alpine
WORKDIR /app
RUN npm install serve
COPY --from=build /app/dist .
EXPOSE 3000
CMD ["npx", "serve", "-s", ".", "-l", "3000", "--single"]
