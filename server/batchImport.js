const items = require("./data/bodylocation.json");
const { MongoClient } = require("mongodb");
const  MONGO_URI  = "mongodb+srv://GroupProject:EcommerceWatch@cluster0.uyidmzs.mongodb.net/watchShop?retryWrites=true&w=majority";

const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  };

const batchImport = async (req, res) => {
    // creates a new client
    const client = new MongoClient(MONGO_URI, options);
    try{
        await client.connect();
        
        // connect to the database (db name is provided as an argument to the function)
        const db = client.db("watchShop");
        console.log("connected!");
      
        const result= await db.collection("bodylocation").insertMany(items);
        console.log(result)
        console.log(result.insertedCount)
        //res.status(201).json({ status: 201, data: req.body });

    } catch(error){
        res.status(500).json({ status: 500, data: req.body, message: err.message });
    } finally{
        client.close();
    }

    
    console.log("disconnected!");
  };

  batchImport()
 // module.exports= {batchImport}