const express = require("express");
const User = require("../models/user");
const authRouter = express.Router();
const bcrypt = require("bcrypt");

authRouter.post("/signup", async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;
    const EncryptedPassowrd = await bcrypt.hash(password, 10);
    const user = new User({
      firstName,
      lastName,
      email,
      password: EncryptedPassowrd,
    });
    console.log(user);
    await user.save();
    res.send(user + " added successfully");
  } catch (err) {
    res.send(err);
  }
});

authRouter.post("/login", async (req, res) => {
  const user = await User.findOne({
    email: req.body.email,
    password: req.body.password,
  }).select("-password -__v");
  // const EncryptedPassowrd = await bcrypt.hash(user.password, 10);
  console.log(user);
  if (user) {
    const token = await user.getJWT();
    console.log(token);
    res.cookie("token", token);
    res.send(user);
  } else {
    res.send("wrong credentials");
  }
});

authRouter.get("/logout", async (req, res) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
  });
  res.send("logged out");
});

module.exports = authRouter;
