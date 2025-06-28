# Use official Node.js LTS image
FROM node:18-alpine

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
COPY package.json package-lock.json ./
RUN npm ci --omit=dev

# Bundle app source
COPY . .

# Expose the port the app runs on
EXPOSE 7000

# Start the application
CMD ["node", "index.js"]
