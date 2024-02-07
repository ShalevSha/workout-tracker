const mongoose = require("mongoose");

const connectDB = async () => {
  const connection = await mongoose.connect(process.env.MONGO_URI);
  console.log("dsdssdsd");
};

// mongoose.set("strictQuery", true);

module.exports = connectDB;
