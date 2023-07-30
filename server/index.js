'use strict';

// imports and setup
const express = require('express');
const morgan = require('morgan');
const router = require('./routes/router');
const { client } = require('./db/dbHandler');

const PORT = 4000;

const server = express();

// middlewares
server.use(function (req, res, next) {
  res.header(
    'Access-Control-Allow-Methods',
    'OPTIONS, HEAD, GET, PUT, POST, DELETE'
  );
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  next();
});
server.use(morgan('tiny'));
server.use(express.static('./server/assets'));
server.use(express.json());
server.use(express.urlencoded({ extended: false }));
server.use('/', express.static(__dirname + '/'));

// routes
server.use('/ecommercewatch', router);

// connect to db and server
const start = async () => {
  try {
    await client.connect();
    console.log("Connected to mongo");
    server.listen(PORT, () => console.info(`Listening on port ${PORT}`));
  } catch (error) {
    console.log(error);
  }
};

start();