# Use official Node.js image
FROM node:18-alpine3.18 AS build

# Set working directory
WORKDIR /app

# Install dependencies
COPY package.json package-lock.json ./
RUN npm ci

# Copy app files and build
COPY . .
RUN npm run build

# Serve the app with a lightweight static server
FROM node:18-alpine3.18 AS production
WORKDIR /app

# Install `serve` to serve the build directory
RUN npm install -g serve

# Copy build output from previous stage
COPY --from=build /app/build ./build

# Expose port and run serve
EXPOSE 3000
CMD ["serve", "-s", "build", "-l", "3000"]
