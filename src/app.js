const express = require("express");
const app = express();

app.get("/getUserData", (req, res) => {
  // Use try catch everywher, its a good coding practice
  try {
    throw new Error("Some error here");
  } catch (error) {
    res.status(500).send("Something went wrong | CATCH BLOCK");
  }
});

// Use This As a Wildcard , It will be triggered when there are unhandled Errors
app.use("/", (err, req, res, next) => {
  if (err) {
    res.send("Something Went Wrong , Please Try Again Sometime");
  }
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
