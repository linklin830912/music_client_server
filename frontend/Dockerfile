# Use the official Node.js 14 image as the base
FROM node:14

# Set the working directory in the container
WORKDIR /app/frontend

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the source code to the container
COPY . .

# Build the React app
RUN npm run build

# Expose the port your frontend will run on (change if needed)
EXPOSE 3000

# Serve the built app
CMD [ "npm", "start" ]