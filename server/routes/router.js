/**
 * Routes
 */

// setting up router
const express = require('express');
const router = express.Router();

// importing handlers
const { 
  getProduct, 
  getProducts, 
  createAddItemCart, 
  updateCartQuantityItem, 
  updateQuantityItem,
  deleteItemCart,
  deleteItemsCart, 
  getAllItemsCarts, 
  getcategorie, 
  getbodylocation 
} = require('../handlers/shop');

// endpoints for getting products
router.get("/products", getProducts);
router.get("/products/:_id", getProduct);

// endpoints for the cart
router.patch("/quantityitem/:_id/:qty", updateCartQuantityItem);
router.patch("/updatequantity/:_id/:qty", updateQuantityItem);
router.post("/additemcart", createAddItemCart);
router.delete("/deleteitemcart/:_id", deleteItemCart);
router.delete("/deleteitemscart", deleteItemsCart);
router.get("/getallitemscart", getAllItemsCarts);

//get supportive data
router.get("/categorie", getcategorie);
router.get("/bodylocation", getbodylocation);

module.exports = router;