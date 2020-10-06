FROM node:lts


RUN mkdir -p /usr/app
WORKDIR /usr/app


COPY . /usr/app

RUN yarn global add pm2

RUN yarn install --prod

EXPOSE 3000 3333
