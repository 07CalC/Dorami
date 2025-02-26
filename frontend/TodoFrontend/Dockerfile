FROM node:slim

WORKDIR /app

ADD package*.json /app/

RUN npm install

COPY . .

RUN npm run build

CMD ["npx", "serve", "-s", "dist", "-p", "8123"]
