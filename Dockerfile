FROM node:lts


RUN mkdir -p /usr/app
WORKDIR /usr/app


COPY . /usr/app


RUN yarn

EXPOSE 3000 3333
