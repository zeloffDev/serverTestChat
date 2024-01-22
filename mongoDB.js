const { MongoClient } = require("mongodb");
const mongoose = require("mongoose");
require("dotenv").config();

const uri = process.env.MONGO_DB_URL;

async function connectToMongoDB() {
  try {
    const client = new MongoClient(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    await client.connect();
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB", error);
  }
}

async function connectToMongoose() {
  try {
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to Mongoose");
  } catch (error) {
    console.error("Error connecting to Mongoose", error);
  }
}

module.exports = connectToMongoDB;
module.exports = connectToMongoose;
