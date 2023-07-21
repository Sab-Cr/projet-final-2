'use strict';

const express = require('express');
const morgan = require('morgan');

const {getProduct,getProducts, updateProductMinusOne, createAddItemCart, updateQuantityItem, deleteItemCart, getAllItemsCarts,} = require("./shop")
const PORT = 4000;

express()
  .use(function(req, res, next) {
    res.header(
      'Access-Control-Allow-Methods',
      'OPTIONS, HEAD, GET, PUT, POST, DELETE'
    );
    res.header(
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content-Type, Accept'
    );
    next();
  })
  .use(morgan('tiny'))
  .use(express.static('./server/assets')) 
  .use(express.json())
  .use(express.urlencoded({ extended: false }))
  .use('/', express.static(__dirname + '/'))

  // REST endpoints?
  .get('/bacon', (req, res) => res.status(200).json('🥓'))

  .get("/ecommercewatch/products/:_id", getProduct)

  // /ecommercewatch/products?start=10&limit=10 - (pour chercher produit pour le FE)
  .get("/ecommercewatch/products", getProducts) 
  

  //.patch("/ecommercewatch/productsplus/:_id", updateProductPlusOne)
  .patch("/ecommercewatch/productsminus/:_id", updateProductMinusOne)
  .patch("ecommercewatch/quantityitem", updateQuantityItem)
  .post("/ecommercewatch/additemcart", createAddItemCart)  
  .delete("/ecommercewatch/itemcart", deleteItemCart)
  .get("/ecommercewatch/getallitemscart", getAllItemsCarts)
  

  .listen(PORT, () => console.info(`Listening on port ${PORT}`));