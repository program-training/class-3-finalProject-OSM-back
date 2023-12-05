FROM node:lts-slim AS build

WORKDIR /app

COPY package*.json tsconfig.json ./

RUN npm install

COPY ./src ./src

CMD ["npm", "test"]
