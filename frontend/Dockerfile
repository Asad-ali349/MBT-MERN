# Stage 1: Build the application
FROM node:16.20-alpine as builder

# Set the working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy the application code
COPY . .

# Build the application
ARG APP_ENV
ARG BUILD_DOMAIN
ARG DISABLE_SIGNUP
ENV APP_ENV $APP_ENV
ENV DISABLE_SIGNUP $DISABLE_SIGNUP
ENV BUILD_DOMAIN $BUILD_DOMAIN
RUN npm run build

# Stage 2: Create a minimal production image
FROM nginx:alpine

# Set the working directory
WORKDIR /usr/share/nginx/html

# Copy the build files from the builder stage to the nginx server
COPY --from=builder /usr/src/app/dist .

# Copy custom nginx.conf to the container
COPY nginx.conf /etc/nginx/nginx.conf

# Expose port 8080
EXPOSE 8080

# Start nginx with the custom configuration
CMD ["nginx", "-g", "daemon off;"]
