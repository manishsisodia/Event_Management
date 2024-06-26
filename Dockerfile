# Use official Node.js image as base
FROM node:14

# Set working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json files to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the React app into the container
COPY . .

VOLUME /app/frontend/data
# Expose the port the app runs on
EXPOSE 3000

# Command to run the React app
CMD ["npm", "start"]
