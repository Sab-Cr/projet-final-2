const { MongoClient } = require("mongodb");
const  MONGO_URI  = "mongodb+srv://GroupProject:EcommerceWatch@cluster0.uyidmzs.mongodb.net/watchShop?retryWrites=true&w=majority"

const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  };

const getProducts = async(req,res) =>{
    try {
        const client = new MongoClient(MONGO_URI, options);
        await client.connect();
    
        const db = client.db("watchShop");
        const collection = db.collection("products");
    
        const { start = 0, limit = 25, category } = req.query;
    
        const startIdx = parseInt(start);
        const limitNum = parseInt(limit);
    
        const totalDocuments = await collection.countDocuments();
    
        if (isNaN(startIdx) || isNaN(limitNum) || startIdx < 0 || limitNum <= 0) {
          res
            .status(400)
            .json({ status: 400, message: "Invalid query parameters" });
          client.close();
          return;
        }
    
        const result = await collection
          .find(category&&{category})
          .skip(startIdx === 0 ? startIdx : startIdx + limitNum)
          .limit(limitNum)
          .toArray();
    
        if (result.length > 0) {
          const responseData = {
            status: 200,
            start: startIdx,
            limit: Math.min(limitNum, result.length),
            total: totalDocuments,
            data: result,
          };
          res.status(200).json(responseData);
        } else {
          res.status(404).json({ status: 404, message: "No products found" });
        }
    
        client.close();
      } catch (error) {
        res.status(500).json({ status: 500, message: "Internal Server Error" });
      }
}

const getProduct = async(req,res) =>{
    const { _id } = req.params;
    try {
      const client = new MongoClient(MONGO_URI, options);
      await client.connect();
      const db = client.db("watchShop");
  
      const result = await db.collection("products").findOne({ _id:Number(_id )});
      return result
        ? res.status(200).json({ status: 200, _id, data: result })
        : res.status(404).json({ status: 404, _id, data: "Not Found" });
  
      client.close();

    } catch (error) {
      return res.status(500).json({ errors: "users not find error 500" });
    }
}

const updateProductMinusOne = async (req,res)=>{
    const { _id } = req.params;
    let _idint =parseInt(_id);

    try {
      const client = new MongoClient(MONGO_URI, options);
      await client.connect();
  
      const db = client.db("watchShop");
      const collection = db.collection("products");
  
      const query = { _id: _idint };
      const newValues = { $inc: { numInStock: -1 } };
  
      const result = await collection.updateOne(query, newValues);
  
      if (result.matchedCount && result.modifiedCount) {
       res 
          .status(200)
          .json({ status: 200, _id, message: "Product updated successfully" });
      } else {
        res
        .status(404).json({ status: 404, _id, message: "Product not found" });
      }
  
      client.close();
    } catch (error) {
      return result
      .status(500).json({ status: 500, message: "Internal Server Error" });
    }
}

const createAddItemCart = async (req, res) => {
    const client = new MongoClient(MONGO_URI, options);
    try {
      await client.connect();
  
      const db = client.db("watchShop"); 
      console.log("connected!");
  
      await db.collection("cart").insertOne(req.body);
      return res.status(201).json({ status: 201, data: req.body });
    } catch (error) {
      res.status(500).json({ status: 500, data: req.body, message: err.message });
    } finally {
      client.close(); 
    }
  };

  const updateQuantityItem = async (req,res)=>{
    const { _id, qty } = req.params;
    let _idint =parseInt(_id);
    let _qtyint =parseInt(qty);
    console.log(_id)
    try {
      const client = new MongoClient(MONGO_URI, options);
      await client.connect();
  
      const db = client.db("watchShop");
      const collection = db.collection("cart");
  
      const query = { _id: _idint };
      const newValues = { $set: { quantity: _qtyint } };
  
      const result = await collection.updateOne(query, newValues);
  
      if (result.matchedCount && result.modifiedCount) {
       return res 
          .status(200)
          .json({ status: 200, _id, message: "Product updated successfully" });
      } else {
        res
        .status(404).json({ status: 404, _id, message: "Product not found" });
      }
  
      client.close();
    } catch (error) {
      return result
      .status(500).json({ status: 500, message: "Internal Server Error" });
    }
}

const deleteItemCart = async (req, res) => {
    const { _id } = req.params;
    let _idint =parseInt(_id);
    try {
      const client = new MongoClient(MONGO_URI, options);
      await client.connect();
  
      const db = client.db("watchShop");
      const collection = db.collection("cart");
  
      const query = { _id: _idint};
      const result = await collection.deleteOne(query);
  
      if (result.deletedCount) {
        res.status(204).end();
      } else {
        res.status(404).json({ status: 404, _id, message: "Item not found" });
      }
  
      client.close();
    } catch (error) {
      res.status(500).json({ status: 500, message: "Internal Server Error" });
    }
  };

  const getAllItemsCarts = async(req,res) =>{
    try {
        const client = new MongoClient(MONGO_URI, options);
        await client.connect();
    
        const db = client.db("watchShop");
        const collection = db.collection("cart");
        const result = await collection
        .find({})
        .toArray();
    
        if (result.length > 0) {
          const responseData = {
            status: 200,
            data: result,
          };
          res.status(200).json(responseData);
        } else {
          res.status(404).json({ status: 404, message: "No products found" });
        }
    
        client.close();
      } catch (error) {
        res.status(500).json({ status: 500, message: "Internal Server Error" });
      }
    }

      const getcategorie = async(req,res) =>{
        try {
            const client = new MongoClient(MONGO_URI, options);
            await client.connect();
        
            const db = client.db("watchShop");
            const collection = db.collection("categorie");
            const result = await collection
            .find({})
            .toArray();
        
            if (result.length > 0) {
              const responseData = {
                status: 200,
                data: result,
              };
              res.status(200).json(responseData);
            } else {
              res.status(404).json({ status: 404, message: "No products found" });
            }
        
            client.close();
          } catch (error) {
            res.status(500).json({ status: 500, message: "Internal Server Error" });
          } 
}
  
const getbodylocation = async(req,res) =>{
  try {
      const client = new MongoClient(MONGO_URI, options);
      await client.connect();
  
      const db = client.db("watchShop");
      const collection = db.collection("bodylocation");
      const result = await collection
      .find({})
      .toArray();
  
      if (result.length > 0) {
        const responseData = {
          status: 200,
          data: result,
        };
        res.status(200).json(responseData);
      } else {
        res.status(404).json({ status: 404, message: "No products found" });
      }
  
      client.close();
    } catch (error) {
      res.status(500).json({ status: 500, message: "Internal Server Error" });
    }
  }



module.exports = {
    getProducts,
    getProduct,
    updateProductMinusOne,
    createAddItemCart,
    updateQuantityItem,
    deleteItemCart,
    getAllItemsCarts,
    getcategorie,
    getbodylocation
}