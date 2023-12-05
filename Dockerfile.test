FROM node:lts-slim AS build

WORKDIR /app

COPY package*.json tsconfig.json ./

RUN npm install

COPY . ./app

CMD ["npm", "test"]
