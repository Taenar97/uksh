FROM node:20

# Set working dir
WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install

# Copy app files
COPY . .

# Expose the port
EXPOSE 3000

# Start the app
CMD ["node", "server.js"]
