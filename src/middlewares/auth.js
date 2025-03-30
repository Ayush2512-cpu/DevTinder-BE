const User = require("../models/user");
const jwt = require("jsonwebtoken");

const userAuth = async (req, res, next) => {
  try {
    const { token } = req.cookies;
    if (!token) {
      throw new Error("Invalid token");
    }
    const decoded = jwt.verify(token, "dev@tinder");
    req.user = decoded;
    const user = await User.findById(decoded._id);
    if (!user) {
      throw new Error("User not found");
    }
    req.user = user;
    next();
  } catch (err) {
    console.log(err);
    res.status(401).send(err);
  }
};

module.exports = userAuth;
