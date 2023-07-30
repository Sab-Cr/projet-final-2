'use strict';

const express = require('express');
const morgan = require('morgan');
const { client } = require('./dbHandler');

const { 
  getProduct, 
  getProducts, 
  createAddItemCart, 
  updateQuantityItem, 
  deleteItemCart, 
  getAllItemsCarts, 
  getcategorie, 
  getbodylocation 
} = require("./shop");

const PORT = 4000;

const server = express();

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

// endpoints for getting products
server.get("/ecommercewatch/products", getProducts);
server.get("/ecommercewatch/products/:_id", getProduct);

// endpoints for the cart
server.patch("/ecommercewatch/quantityitem/:_id/:qty", updateQuantityItem);
server.post("/ecommercewatch/additemcart", createAddItemCart);
server.delete("/ecommercewatch/deleteitemcart/:_id", deleteItemCart);
server.get("/ecommercewatch/getallitemscart", getAllItemsCarts);

//get supportive data
server.get("/ecommercewatch/categorie", getcategorie);
server.get("/ecommercewatch/bodylocation", getbodylocation);

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