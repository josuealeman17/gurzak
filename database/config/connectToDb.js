if (process.env.NODE_ENV != "production") {
  require("dotenv").config();
}

const mongoose = require("mongoose");
const DATABASE_URL = process.env.DB_URL || "mongodb://localhost:3000";

async function connectToDb() {
  try {
    await mongoose.connect(DATABASE_URL, {
      serverSelectionTimeoutMS: 30000, // Ajusta este valor según tus necesidades
      socketTimeoutMS: 45000,
    });
    console.log("connected!");
  } catch (err) {
    console.log(err);
  }
}

module.exports = connectToDb;
