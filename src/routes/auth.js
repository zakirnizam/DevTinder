const express = require("express")
const authRouter= express.Router();
const User = require("../models/user");
const bcrypt = require("bcrypt");
const { validateSignUpData } = require("../utils/validator");




// Creating a POST /signUp API
authRouter.post("/signup", async (req, res) => {
  try {
    validateSignUpData(req);
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
authRouter.post("/login", async (req, res) => {
  try {
    const { emailId, password } = req.body;
    const user = await User.findOne({ emailId: emailId });
    if (!user) {
      throw new Error("Invalid Credentials");
    }
    const isPasswordValid = await user.validatePassword(password);
    if (isPasswordValid) {
        console.log("nizam")
      //Creare a JWT token
      const token = await user.getJWT();
      res.cookie("token", token, {expires: new Date(Date.now() + 86400000)
      });
      res.send("Login Successfull");
    } else {
      throw new Error("Invalid Password");
    }
  } catch (error) {
    res.status(400).send("ERROR :" + error.message);
  }
});
module.exports = authRouter;