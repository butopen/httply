# base image
FROM node:16-alpine

RUN apk update && apk upgrade && \
    apk add --no-cache bash git openssh nano zopfli brotli

RUN npm i -g pnpm

# set working directory
WORKDIR /app

# install and cache app dependencies
COPY package.json /app/package.json
COPY pnpm-lock.yaml /app/pnpm-lock.yaml
COPY .npmrc .
RUN pnpm install
COPY . .

RUN npm run test
