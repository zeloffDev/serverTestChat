const { MongoClient } = require("mongodb");
const mongoose = require("mongoose");

const uri =
  "mongodb+srv://zeloff:Test.123@cluster0.waohfhy.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

async function connectToMongoDB() {
  try {
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
