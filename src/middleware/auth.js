const adminAuth = (req,res,next) => {

    console.log("***Authentication of admin***");
    const token = "xyz";
    const isAdmin = token === "xyz";
    if (isAdmin) {
      res.send("Admin Authenticated");
      next();
    } else {
      res.status(401).send("You are not an admin");
    }
};

const userAuth = (req,res,next) => {

    console.log("***Authentication of user***");
    const token = "xyz";
    const isAdmin = token === "xy1z";
    if (isAdmin) {
      res.send("User Authenticated");
      next();
    } else {
      res.status(401).send("You are not an existing user");
    }
};

module.exports={
    adminAuth,
    userAuth
}
