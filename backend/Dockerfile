# Use the official Node.js 14 image as the base
FROM node:14

# Set the working directory in the container
WORKDIR /app/backend

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the source code to the container
COPY . .

# Expose the port your backend server will run on (change if needed)
EXPOSE 4000

# Start the backend server
CMD [ "npm", "start" ]