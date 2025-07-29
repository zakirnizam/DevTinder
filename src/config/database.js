const mongoose = require("mongoose");

const connectDB = async () => {
  await mongoose.connect(
    "mongodb+srv://mohammadzakirnizam:JXNMrRLume2Gl2Ci@nizamdev.sgpiihz.mongodb.net/devTinder"
  );
};

module.exports = connectDB;