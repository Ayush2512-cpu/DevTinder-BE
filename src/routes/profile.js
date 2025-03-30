const express = require("express");
const profileRouter = express.Router();
const userAuth = require("../middlewares/auth");
const validateEditFields = require("../utils/validateEditFields");

profileRouter.get("/profile/view", userAuth, async (req, res) => {
  if (req.user) res.send(req.user);
  else res.send("user not found");
});

profileRouter.patch("/profile/edit", userAuth, async (req, res) => {
  if (!validateEditFields(req.body)) {
    return res.status(422).send("Invalid fields to update");
  }
  const loggedUser = req.user;
  Object.keys(req.body).forEach((key) => {
    loggedUser[key] = req.body[key];
  });
  console.log(req.body);
  await req.user.updateOne(req.body);
  res.send({ message: "Profile updated successfully", user: loggedUser });
});

profileRouter.patch("/profile/changePassword", userAuth, async (req, res) => {
  // try {
  if (req.user.password === req.body.oldPassword) {
    await req.user.updateOne({ password: req.body.newPassword });
    res.send({ message: "Password changed successfully" });
  } else {
    res.send("Failed to change password");
  }
  //  else {
  /*   throw new Error("Invalid old password");
    }
  } catch (err) {
    console.log(err);
    res.send(err);
  } */
});
module.exports = profileRouter;
