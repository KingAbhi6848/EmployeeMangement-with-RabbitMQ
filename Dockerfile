# Use the official Node.js image from Docker Hub
FROM node:20

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install project dependencies
RUN npm install

# Install nodemon globally (optional)
RUN npm install -g nodemon

# Copy the rest of the application files to the container
COPY . .



# Expose the port your app runs on (usually 3000 for Node.js apps)
EXPOSE 5000

# Start the app using nodemon (or use npm start if using a normal start script)
CMD ["nodemon", "app.js"]
