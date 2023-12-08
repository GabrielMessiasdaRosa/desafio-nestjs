FROM node:slim

RUN npm install -g @nestjs/cli

WORKDIR /home/node/app

CMD ["tail", "-f", "/dev/null"]

