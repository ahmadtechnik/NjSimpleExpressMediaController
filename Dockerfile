FROM node:18-bullseye

# Install system dependencies required for robotjs and loudness
RUN apt-get update && apt-get install -y \
    libx11-dev \
    libxtst-dev \
    libpng-dev \
    libxinerama-dev \
    libxfixes-dev \
    libudev-dev \
    libpulse-dev \
    x11-xserver-utils \
    x11-utils \
    && rm -rf /var/lib/apt/lists/*

# Create app directory and set permissions
WORKDIR /usr/src/app
RUN chown -R node:node /usr/src/app

# Switch to non-root user
USER node

# Copy package files with correct ownership
COPY --chown=node:node package*.json ./
COPY --chown=node:node tsconfig.json ./

# Install app dependencies
RUN npm install --force

# Copy source code and views with correct ownership
COPY --chown=node:node src/ ./src/
COPY --chown=node:node views/ ./views/

# Create dist directory with correct permissions
RUN mkdir -p dist && chown -R node:node dist

# Build TypeScript code
RUN npm run build

# Switch back to root for tini installation
USER root
RUN apt-get update && apt-get install -y tini && rm -rf /var/lib/apt/lists/*

# Switch back to non-root user
USER node

# Expose port
EXPOSE 3001

# Use tini as init system
ENTRYPOINT ["/usr/bin/tini", "--"]

# Start the application
CMD ["node", "dist/index.js"]
