const mongoose = require("mongoose");

const connectDB = async () => {
  await mongoose.connect(
    "mongodb+srv://shahayush2512:Q9qg1oguqhLKWfP7@namastenode.x1nio.mongodb.net/devTinder"
  );
  mongoose.set("debug", true);
};

module.exports = connectDB;
