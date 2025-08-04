const express = require("express");
const connectDB = require("./config/database");
const User = require("./models/user");
const app = express();

//MiddleWare
app.use(express.json());

// Creating a POST /signUp API
app.post("/signup", async (req, res) => {
  const user = new User(req.body);
  try {
    await user.save();
    res.send("***Data Saved***");
  } catch (e) {
    res.send("***Unable to save data***");
  }
});

//Get User By Email id
app.get("/user", async (req, res) => {
  const userEmail = req.body.emailId;
  try {
    const user = await User.findOne({ emailId: userEmail });
    if (!user) {
      res.status(404).send("User Not Found");
    } else {
      res.send(user);
    }
  } catch (error) {
    res.status(400).send("SomeThing went wrong");
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
