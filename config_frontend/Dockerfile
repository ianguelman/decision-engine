FROM node:20-alpine

WORKDIR /app

COPY . ./

RUN yarn

ENTRYPOINT [ "yarn", "start" ]