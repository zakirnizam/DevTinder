const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true, minlength: 4, maxlength: 20 },
    lastName: { type: String },
    emailId: {
      type: String,
      unique: true,
      required: true,
      lowercase: true,
      trim: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error("Invalid Email Id");
        }
      },
    },
    password: {
      type: String,
      required: true,
      validate(value) {
        if (!validator.isStrongPassword(value)) {
          throw new Error("Please enter a strong password");
        }
      },
    },
    gender: {
      type: String,
      validate(value) {
        if (!["male", "female", "other"].includes(value)) {
          throw new Error("Invalid Gender Type");
        }
      },
    },
    age: { type: Number, min: 18 },
    photoUrl: {
      type: String,
      default:
        "https://png.pngtree.com/png-vector/20250718/ourmid/pngtree-cartoon-hand-drawn-handsome-boy-avatar-png-image_16798195.webp",
      validate(value) {
        if (!validator.isURL(value)) {
          throw new Error("Please provide a valid URL");
        }
      },
    },
    skills: { type: [String] },
    about: { type: String, default: "Hello, I am using DevTinder" },
  },
  { timestamps: true }
);

userSchema.methods.getJWT = async function () {
  const user = this;
  const token = await jwt.sign({ _id: user._id }, "#Nizam17", {expiresIn: '1d'});
  return token;
}

userSchema.methods.validatePassword = async function (passwordInputbyUser) {
  const user = this;
  const HashedPassword = user.password;
  const isPasswordValid = await bcrypt.compare(passwordInputbyUser, HashedPassword);
  return isPasswordValid;
}


module.exports = mongoose.model("User", userSchema);
