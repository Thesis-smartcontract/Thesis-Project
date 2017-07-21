FROM node:slim
WORKDIR /app
ADD . /app
RUN npm install -g ethereumjs-testrpc
RUN npm install -g truffle
RUN truffle compile

EXPOSE 8545

CMD "testrpc"


