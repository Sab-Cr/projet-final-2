/**
 * Setting up mongodb and its collections
 */

const { MongoClient } = require("mongodb");

const MONGO_URI =
  "mongodb+srv://GroupProject:EcommerceWatch@cluster0.uyidmzs.mongodb.net/watchShop?retryWrites=true&w=majority";

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const client = new MongoClient(MONGO_URI, options);
const db = client.db("watchShop");
const productsCollection = db.collection("products");
const cartCollection = db.collection("cart");

module.exports = { client, db, productsCollection, cartCollection };
