FROM node:slim
RUN apt-get update -y && apt-get install -y openssl
RUN npm install -g @nestjs/cli

WORKDIR /urs/src/app

COPY package*.json .

RUN npm install

COPY . .

RUN npx prisma generate

RUN npm run build

CMD ["npm", "run", "start"]

