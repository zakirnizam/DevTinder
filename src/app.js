const express = require("express");
const connectDB = require("./config/database");
const User = require("./models/user");
const app = express();
const cookieParser = require("cookie-parser");
const { userAuth } = require("./middleware/auth");

//MiddleWare
app.use(express.json());
app.use(cookieParser());

const authRouter = require('./routes/auth')
const profileRouter = require('./routes/profile')
const requestRouter = require('./routes/request')

app.use("/", authRouter);
app.use("/", profileRouter);
app.use("/", requestRouter);





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
