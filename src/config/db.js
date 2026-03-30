const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://rosatomacarena_db_user:rvH0Cd8YeAqtYqYg@pb1.dzhyogj.mongodb.net/ecommerce?retryWrites=true&w=majority"
    );

    console.log("Mongo conectado");
  } catch (error) {
    console.error("Error conectando Mongo:", error);
  }
};

module.exports = connectDB;