FROM node:18-alpine AS builder
WORKDIR /app
COPY package.json .
RUN npm install
COPY . .
RUN npm run build

FROM node:18-alpine
WORKDIR /app
COPY --from=builder /app/dist /app/dist
RUN npm install -g http-server
EXPOSE 5173
CMD ["http-server", "dist"]
