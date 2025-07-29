const express = require("express");
const connectDB = require("./config/database");
const User = require("./models/user");
const app = express();

// Creating a POST /signUp API

app.post("/signup", async (req, res) => {
  const user = new User({
    firstName: "Zakir",
    lastName: "Nizam",
    emailId: "Nizam@test.com",
    password: "Nizam@12334",
    k,
  });
  try {
    await user.save();
    res.send("***Data Saved***");
  } catch (e) {
    res.send("***Unable to save data***");
  }
});

// connecting a database
connectDB()
  .then(() => {
    console.log("Database connection established");
    app.listen(3000, () => {
      console.log("Server is running on port 3000");
    });
  })
  .catch(() => {
    console.log("Unable to connect to Database");
  });
