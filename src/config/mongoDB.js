const mongoose = require("mongoose");

const uri = process.env.MONGO_DB_URL;

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

module.exports = connectToMongoose;
