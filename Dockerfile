FROM node:lts-slim AS build

RUN apt-get update \
    && apt-get install -y build-essential

WORKDIR /app


COPY package*.json tsconfig.json ./


RUN npm install

RUN npm install -g typescript

COPY . ./app

RUN tsc

ENV PORT=8181

EXPOSE 8181

CMD [ "node", "./dist/server.js" ]
