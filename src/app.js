const express = require("express");
const app = express();



app.get('/user',(req,res)=>{
res.send({"Name":"Nizam","Gender":"male"})
});

app.post('/user',(req,res)=>{

res.send("Added new users to DB")
});

app.delete('/user',(req,res)=>{

res.send("Deleted a user from DB")
})


app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
