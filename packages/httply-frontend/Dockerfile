# Stage 1
FROM node:18-alpine as build-step

RUN apk update && apk upgrade && \
    apk add --no-cache bash git openssh nano zopfli
 
RUN npm i -g pnpm

RUN mkdir /app
WORKDIR /app
COPY . . 

#pnpm
RUN pnpm i
RUN pnpm build



