FROM node:latest
WORKDIR /app
ADD . /app

RUN npm install -g yarn
RUN yarn

EXPOSE 3000

CMD ["node", "server/server.js"]

