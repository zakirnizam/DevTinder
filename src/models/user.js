const mongoose = require("mongoose");

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
    },
    password: { type: String, required: true },
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
    },
    skills: { type: [String] },
    about: { type: String, default: "Hello, I am using DevTinder" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
