const express = require("express");
const User = require("../Models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const isAuth= require('../Middlewares/isAuth')
//require router
const router = express.Router();

//@role: testing
//@url: http://localhost:5000/api/user/test
router.get("/test", (req, res) => {
  res.send("it is working... ");
});
//@role: resgister a new user
//@url: http://localhost:5000/api/user/register
router.post("/register", async (req, res) => {
  //step1: add a new user

  //reccupérer les data de l'utilisateur
  const { userName, email, password, role } = req.body;
  try {
    //check if the email is reserved
    let user = await User.findOne({ email });
    if (user) {
      return res
        .status(400)
        .json({ msg: "the email is already reserved ...." });
    }

    //create a hadhed password
    const hashedPasswored = await bcrypt.hash(password, 10);

    //create the new user
    user = new User({
      userName: userName,
      email,
      password: hashedPasswored,
      role,
    });
    // save the user in the DB
    user.save();

    //step 2 : sign a token (access / login )

    // create token
    const token = jwt.sign({ userId: user._id }, process.env.SECRET_PASS);

    //response
    res.status(200).json({ user, token });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
});

//@role: login an existing  user
//@url: http://localhost:5000/api/user/login
router.post("/login", async (req, res) => {
  //reccupérer les data de l'utilisateur
  const { email, password } = req.body;

  try {
    //check if the email  exists  in the db
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ msg: "this eamil has no acount  ...." });
    }
    //verify password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: "bad creadentials..." });
    }
    //create  a token
    const token = jwt.sign({ userId: user._id }, process.env.SECRET_PASS, {
      expiresIn: "7 days",
    });
    //response
    res.status(200).json({ user, token });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
});

//@role:getting the authentificated   user
//@url: http://localhost:5000/api/user/profile
router.get('/profile',isAuth, async(req,res)=>{
try {
  res.status(200).json({user:req.user})

} catch (error) {
    res.status(500).json({msg:error.message})
}
})


//@role:getting all the user 
//@url: http://localhost:5000/api/user/all
router.get('/all',async(req,res)=>{
    try {
        const users= await User.find()
        res.status(200).json(users)
    } catch (error) {
        res.status(500).json({msg:error.message})
    }
})



//export the router
module.exports = router;
