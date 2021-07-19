# server/Dockerfile-dev

# Install node image in container
FROM node

# Install nodemon for hot reloading
RUN npm install -g nodemon
RUN npm install -g ts-node

# Create and set the working directory
RUN mkdir -p app/server
WORKDIR /app/server

# Copies the dependency files over
COPY package*.json /app/server/

# Install dependencies
RUN npm install

# Copies the server files over
COPY . /app/server/

# Command to run them
cmd ["npm", "start"]