FROM node:slim

RUN apt-get update -y && apt-get install -y openssl
RUN npm install -g @nestjs/cli

WORKDIR /home/node/app

CMD ["npm", "run", "start:dev"]

