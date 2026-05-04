# Frontend Dockerfile
FROM node:20-alpine AS base

# Install pnpm
RUN npm install -g pnpm

# Build stage
FROM base AS build

WORKDIR /app

# Copy package files
COPY package.json pnpm-lock.yaml ./

# Install dependencies
RUN pnpm install --frozen-lockfile

# Copy source code
COPY . .

# Build the application
RUN pnpm build

# Runtime stage
FROM base AS runtime

WORKDIR /app

# Copy built application from build stage
COPY --from=build /app/public ./public
COPY --from=build /app/.next ./.next
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/package.json ./package.json

# Expose port
EXPOSE 3000

# Start the application
CMD ["pnpm", "start"]