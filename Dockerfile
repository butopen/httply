# Stage 1
FROM node:17-alpine as build-step

RUN apk update && apk upgrade && \
    apk add --no-cache bash git openssh nano zopfli
 
RUN npm i -g pnpm

RUN mkdir /app
WORKDIR /app
COPY ./packages/httply-backend . 

#pnpm
RUN pnpm i
RUN pnpm build


# escape=`
# Stage 2
FROM node:17-alpine
RUN apk update && apk upgrade && apk add --no-cache bash
RUN mkdir /app
WORKDIR /app

RUN npm i -g pnpm

COPY --from=build-step /app/dist /app
COPY ./packages/httply-backend/package.json . 
COPY ./packages/httply-backend/pnpm-lock.yaml . 
RUN pnpm i --prod

EXPOSE 3001

CMD ["node", "main.js"]

