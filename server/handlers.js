var mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const i18n = require("i18next");

("use strict");
const { MongoClient } = require("mongodb");
const MONGO_URI =
  //"mongodb+srv://sabC:Sasha17052018!@cluster0.neuztnq.mongodb.net/db-name?retryWrites=true&w=majority";
  //"mongodb+srv://sabrinacruet:Sasha123@cluster0.9hwe5oy.mongodb.net/db-name?retryWrites=true&w=majority"
  "mongodb+srv://sabrinacruet:Sasha123@cluster0.9hwe5oy.mongodb.net/db-name?retryWrites=true&w=majority";

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const Login = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);
  try {
    await client.connect();
    const { email, password } = req.body;

    const db = client.db("db-name");
    const usersCollection = db.collection("users");

    const user = await usersCollection.findOne({ email });
    if (!user) {
      return res.status(401).json({ message:  /*i18n.t("emailNotFound")*/ "email Not Found"});
    }

    console.log(user);

    bcrypt.compare(password, user.password, (err, result) => {
      if (err) {
        console.error(err);
      } else if (result) {
        console.log("Password is correct");
        return res
          .status(200)
          .json({ message: /*i18n.t("loginSuccessful")*/ "Login Successful", user });
      } else {
        console.log("Password is incorrect");
        console.log(i18n.t("incorrectPassword"))
        return res.status(401).json({ message: /*i18n.t("incorrectPassword")*/ "Incorrect Password" });
      }
    });
  } catch (error) {
    return res.status(500).json({ errors: "users not find error 500" });
  } finally {
    client.close();
  }
};

const Signup = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);
  try {
    await client.connect();

    const db = client.db("db-name");
    const usersCollection = db.collection("users");

    const { email, fullName, password, promoCode } = req.body;

    const existingUser = await usersCollection.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: /*i18n.t("userWithEmailExists")*/ "User With This Email Exists" });
    }

    const saltRounds = 10;

    // Hash the password using await
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const user = {
      email,
      fullName,
      password: hashedPassword,
      promoCode,
    };

    const result = await usersCollection.insertOne(user);

    if (result.acknowledged) {
      const insertedUser = await usersCollection.findOne({
        _id: result.insertedId,
      });
      return res
        .status(201)
        .json({
          message: i18n.t("userCreatedSuccessfully"),
          user: insertedUser,
        });
    } else {
      return res.status(500).json({ message: i18n.t("createUserFailed") });
    }
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ status: 500, message: i18n.t("internalServerError") });
  } finally {
    client.close();
  }
};

const GetUser = async (req, res) => {
  const userId = req.params.id; // Get the user ID from the URL parameter
  console.log(userId);

  const client = new MongoClient(MONGO_URI, options);
  try {
    await client.connect();

    const db = client.db("db-name");
    const usersCollection = db.collection("users");

    const user = await usersCollection.findOne({
      _id: new mongoose.Types.ObjectId(userId),
    });

    if (!user) {
      return res.status(404).json({ error: i18n.t("userNotFound") });
    }

    return res.status(200).json({ user });
  } catch (error) {
    console.error("An error occurred:", error);
    return res.status(500).json({ error: i18n.t("internalServerError") });
  } finally {
    client.close();
  }
};

const UpdateUserName = async (req, res) => {
  console.log("HELLOS");
  const { userId, newName } = req.body; // Get the user ID and new name from the request body
  console.log(newName);
  console.log(userId);

  const client = new MongoClient(MONGO_URI, options);
  try {
    await client.connect();

    const db = client.db("db-name");
    const usersCollection = db.collection("users");

    const result = await usersCollection.updateOne(
      { _id: new mongoose.Types.ObjectId(userId) },
      { $set: { fullName: newName } }
    );
    console.log(result);

    if (result.matchedCount === 1 && result.modifiedCount === 1) {
      return res.status(200).json({ message: "Name updated successfully" });
    } else {
      return res.status(500).json({ message: "Failed to update name" });
    }
  } catch (error) {
    console.error("An error occurred:", error);
    return res.status(500).json({ error: "Internal server error" });
  } finally {
    client.close();
  }
};

const DeleteUser = async (req, res) => {
  const { userId } = req.body; // Get the user ID from the request body

  const client = new MongoClient(MONGO_URI, options);
  try {
    await client.connect();

    const db = client.db("db-name");
    const usersCollection = db.collection("users");

    const result = await usersCollection.deleteOne({
      _id: new mongoose.Types.ObjectId(userId),
    });

    if (result.deletedCount === 1) {
      return res.status(200).json({ message: "Account deleted successfully" });
    } else {
      return res.status(500).json({ message: "Failed to delete account" });
    }
  } catch (error) {
    console.error("An error occurred:", error);
    return res.status(500).json({ error: "Internal server error" });
  } finally {
    client.close();
  }
};

module.exports = {
  Signup,
  Login,
  GetUser,
  UpdateUserName,
  DeleteUser,
};
