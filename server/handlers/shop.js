/**
 * Endpoint handlers
 */

// imports
const { db, productsCollection, cartCollection } = require('../db/dbHandler');

// handlers
const getProducts = async (req, res) => {
  try {
    const { start = 0, limit = 25, category } = req.query;

    const startIdx = parseInt(start);
    const limitNum = parseInt(limit);

    if (isNaN(startIdx) || isNaN(limitNum) || startIdx < 0 || limitNum <= 0) {
      res
        .status(400)
        .json({ status: 400, message: "Invalid query parameters" });
      return;
    }

    const totalDocuments = await productsCollection.countDocuments();
    const totalCategory = await productsCollection.countDocuments(category && { category });

    const result = await productsCollection
      .find(category && { category })
      .skip(startIdx === 0 ? startIdx : startIdx * limitNum)
      .limit(limitNum)
      .toArray();

    if (result.length > 0) {
      const responseData = {
        status: 200,
        start: startIdx,
        limit: Math.min(limitNum, result.length),
        total: totalDocuments,
        subTotal: totalCategory,
        data: result,
      };
      res.status(200).json(responseData);
    } else {
      res.status(404).json({ status: 404, message: "No products found" });
    }

  } catch (error) {
    res.status(500).json({ status: 500, message: "Internal Server Error" });
  }
}

const getProduct = async (req, res) => {
  const { _id } = req.params;
  try {
    const result = await productsCollection.findOne({ _id: Number(_id) });

    return result
      ? res.status(200).json({ status: 200, _id, data: result })
      : res.status(404).json({ status: 404, _id, data: "Not Found" });

  } catch (error) {
    return res.status(500).json({ errors: "users not find error 500" });
  }
}

const createAddItemCart = async (req, res) => {
  try {
    await cartCollection.insertOne(req.body);
    return res.status(201).json({ status: 201, data: req.body });
  } catch (error) {
    res.status(500).json({ status: 500, data: req.body, message: err.message });
  }
};

const updateCartQuantityItem = async (req, res) => {
  const { _id, qty } = req.params;
  let _idint = parseInt(_id);
  let _qtyint = parseInt(qty);

  try {
    const query = { _id: _idint };
    const newValues = { $set: { quantity: _qtyint } };

    const result = await cartCollection.updateOne(query, newValues);

    if (result.matchedCount && result.modifiedCount) {
      return res
        .status(200)
        .json({ status: 200, _id, message: "Product updated successfully" });
    } else {
      res
        .status(404).json({ status: 404, _id, message: "Product not found" });
    }

  } catch (error) {
    return result
      .status(500).json({ status: 500, message: "Internal Server Error" });
  }
}

const updateQuantityItem = async (req, res) => {
  const { _id, qty } = req.params;
  let _idint = parseInt(_id);
  let _qtyint = -1 * parseInt(qty);

  try {
    const query = { _id: _idint };
    const increment = { $inc: { numInStock: _qtyint} };
    const result = await productsCollection.updateOne(query, increment);

    if (result.matchedCount && result.modifiedCount) {
      return res
        .status(200)
        .json({ status: 200, _id, message: "Product updated successfully" });
    } else {
      res
        .status(404).json({ status: 404, _id, message: "Product not found" });
    }

  } catch (error) {
    return result
      .status(500).json({ status: 500, message: "Internal Server Error" });
  }
}

const deleteItemCart = async (req, res) => {
  const { _id } = req.params;
  let _idint = parseInt(_id);

  try {
    const query = { _id: _idint };
    const result = await cartCollection.deleteOne(query);

    if (result.deletedCount) {
      res.status(200).json({ status: 200, message: "Item in cart succefully removed" });
    } else {
      res.status(404).json({ status: 404, _id, message: "Item not found" });
    }

  } catch (error) {
    res.status(500).json({ status: 500, message: "Internal Server Error" });
  }
};

const deleteItemsCart = async (req, res) => {
  try {
    const result = await cartCollection.deleteMany({});
    if (result.deletedCount) {
      res.status(200).json({ status: 200, message: "Items in cart succefully removed" });
    } else {
      res.status(404).json({ status: 404, message: "No items to delete" });
    }

  } catch (error) {
    console.log(error)
    res.status(500).json({ status: 500, message: "Internal Server Error" });
  }
};

const getAllItemsCarts = async (req, res) => {
  try {
    const result = await cartCollection.find({}).toArray();

    if (result.length > 0) {
      const responseData = {
        status: 200,
        data: result,
      };
      res.status(200).json(responseData);
    } else {
      res.status(200).json({ status: 200, message: "No products found in cart" });
    }

  } catch (error) {
    res.status(500).json({ status: 500, message: "Internal Server Error" });
  }
}

const getcategorie = async (req, res) => {
  try {

    const collection = db.collection("categorie");
    const result = await collection.find({}).toArray();

    if (result.length > 0) {
      const responseData = {
        status: 200,
        data: result,
      };
      res.status(200).json(responseData);
    } else {
      res.status(404).json({ status: 404, message: "No products found" });
    }

  } catch (error) {
    res.status(500).json({ status: 500, message: "Internal Server Error" });
  }
}

const getbodylocation = async (req, res) => {
  try {

    const collection = db.collection("bodylocation");
    const result = await collection.find({}).toArray();

    if (result.length > 0) {
      const responseData = {
        status: 200,
        data: result,
      };
      res.status(200).json(responseData);
    } else {
      res.status(404).json({ status: 404, message: "No products found" });
    }

  } catch (error) {
    res.status(500).json({ status: 500, message: "Internal Server Error" });
  }
}

module.exports = {
  getProducts,
  getProduct,
  createAddItemCart,
  updateCartQuantityItem,
  updateQuantityItem,
  deleteItemCart,
  deleteItemsCart,
  getAllItemsCarts,
  getcategorie,
  getbodylocation
}