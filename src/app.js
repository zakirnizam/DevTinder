const express = require("express");
const app = express();

const {adminAuth,userAuth} = require("./middleware/auth");


app.use('/admin',adminAuth);

app.use('/user',userAuth,(req,res)=>{
  console.log("User Data");  
})

app.get('/admin/getAlldata',(req,res)=>{
  console.log("Access to all the data");
}
)

app.get('/admin/deleteData',(req,res)=>{
  console.log("Delete all the data");
}
)

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
