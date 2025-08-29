# Use the official Node.js 14 image from Docker Hub
FROM node:14

# Create app directory inside the container
WORKDIR /usr/src/app

# Install app dependencies (including package.json and package-lock.json)
COPY package*.json ./

# Install dependencies
RUN npm install

# If you're building the app for production, uncomment the following line:
# RUN npm ci --only=production

# Copy the rest of the app source code into the container
COPY . .

# Expose port 3000 to make the app accessible outside the container
EXPOSE 3000

# Command to start the app
CMD [ "npm", "start" ]
