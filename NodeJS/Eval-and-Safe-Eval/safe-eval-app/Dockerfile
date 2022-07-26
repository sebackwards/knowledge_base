FROM node:latest
WORKDIR /usr/src/app

# Install app dependencies
COPY package*.json ./
RUN npm install

# Bundle app source 
COPY . .
EXPOSE 8001
CMD ["node", "safe-eval-server.js"]