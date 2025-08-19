const express = require("express");
const connectDB = require("./config/database");
const User = require("./models/user");
const app = express();
const {validateSignUpData} = require('./utils/validator')
const bcrypt = require('bcrypt')

//MiddleWare
app.use(express.json());

// Creating a POST /signUp API
app.post("/signup", async (req, res) => {
  try {
    validateSignUpData(req)
    const { firstName, lastName, emailId, password } = req.body;
    const passwordHash = await bcrypt.hash(password, 10);
    const user = new User({
      firstName,
      lastName,
      emailId,
      password: passwordHash,
    });

    await user.save();
    res.send("***Data Saved***");
  } catch (e) {
    res.send("***Unable to save data***" + e.message);
  }
});

//Login API
app.post("/login", async (req, res) => {
  try {
    const { emailId, password } = req.body;
    const user = await User.findOne({ emailId: emailId });
    if (!user) {
      throw new Error("Invalid Credentials");
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (isPasswordValid) {
      res.send("Login Successfull");
    } else {
      throw new Error("Invalid Password");
    }
  } catch (error) {
    res.status(400).send("ERROR" + error.message);
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

//FEED API -- get all users from the db
app.get("/feed", async (req, res) => {
  try {
    const users = await User.find({});
    console.log(users);
    res.send(users);
  } catch (error) {
    res.status(400).send("Something went Wrong");
  }
});

//Delete the data

app.delete("/user", async (req, res) => {
  const userId = req.body.userId;
  try {
    await User.findOneAndDelete(userId);
    res.send("Deleted the user successfully");
  } catch (error) {
    res.status(400).send("Something went wrong");
  }
});

//Find one and Update the data

app.patch("/user/:userId", async (req, res) => {
  const userId = req.body?.userId;
  const data = req.body;
  try {
    const ALLOWED_UPDATES = ["PhotoUrl", "about", "gender","age","skills" ]
    const isUpdateAllowed = Object.keys(data).every((k)=> ALLOWED_UPDATES.includes(k));
    if (!isUpdateAllowed) {
      return res.status(400).send("Update not allowed");
    }
    if(data?.skills.length > 5) {
      return res.status(400).send("You can only add 5 skills");
    }
    const user = await User.findByIdAndUpdate(userId, data, {
      returnDocument: "after",
      runValidators: true,
    });
    res.send("***User data updated***");
    console.log("Updated data ", user);
  } catch (error) {
    res.send(400).send("Something went wrong");
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
