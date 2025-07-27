const express = require("express");
const app = express();

app.use(
  "/user",
 [(req, res, next) => {
    console.log("Route handler 1");
    // res.send("route handler 1 executed");

    next();
  },
  (req, res, next) => {
    console.log("Route handler 2");
    next();

  },] ,
  (req, res, next) => {
    console.log("Route handler 3");
    next();
  },
  (req, res, next) => {
    console.log("Route handler 4");
    res.send("route handler 4 executed");

  }
);

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
