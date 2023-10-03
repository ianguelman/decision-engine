FROM node:20-alpine

WORKDIR /app

COPY . ./

RUN yarn

RUN yarn test --watchAll=false

ENTRYPOINT ["yarn", "start"]