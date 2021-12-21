const jwt = require("jsonwebtoken");
const User = require("../Models/User");
const isAuth = async (req, res, next) => {
  try {
    //check if the user has a token =  authentificated
    const token = req.headers["x-auth-token"];
    if (!token) {
      return res.status(404).json({ msg: "user not authentificated ... " });
    }

    //extract the user id from the token
    const decodedToken = await jwt.verify(token, process.env.SECRET_PASS);
    const id = decodedToken.userId;
    //find this specific user with this specific id
   const user = await User.findById(id);
    res.status(200).json(user);
    req.user = user;
    next()
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

module.exports = isAuth;
