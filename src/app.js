const express = require("express");
const app = express();



app.use("/test", (req, res) => {
  res.send("test path");
});

app.use("/hello", (req, res) => {
  res.send("hello path");
});

app.use("/", (req, res) => {
  res.send("default path");
});


app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
