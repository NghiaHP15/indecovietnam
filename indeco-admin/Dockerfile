# Stage 1: Build app bằng Node (Vite)
FROM node:22-alpine AS builder

WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
ARG MODE=production
RUN npm run build -- --mode $MODE

# Stage 2: Dùng serve để phục vụ file tĩnh
FROM node:22-alpine

WORKDIR /app
RUN npm install -g serve

# Copy kết quả build
COPY --from=builder /app/dist ./dist

EXPOSE 80
CMD ["serve", "-s", "dist", "-l", "80"]
