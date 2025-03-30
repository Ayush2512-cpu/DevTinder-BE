const express = require("express");
const userRouter = express.Router();
const userAuth = require("../middlewares/auth");
const ConnectionRequest = require("../models/connectionRequest");
const User = require("../models/user");
const { default: mongoose } = require("mongoose");

userRouter.get("/user/request", userAuth, async (req, res) => {
  const users = await ConnectionRequest.find({
    receiver: req.user.id,
    status: "intrested",
  }).populate("sender", "firstName lastName");
  if (!users) {
    res.send("Request not found");
  }

  res.send(users);
});

userRouter.get("/user/request/accept", userAuth, async (req, res) => {
  try {
    const existingRequest = await ConnectionRequest.find({
      $or: [{ sender: req.user._id }, { receiver: req.user._id }],
      status: "accepted",
    });
    if (!existingRequest) {
      return res.send("Request not found");
    }
    res.send({ message: "Data fetch successfully", data: existingRequest });
  } catch (err) {
    res.status(400).send(err);
  }
});
userRouter.get("/user/feed", userAuth, async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const existingRequest = await ConnectionRequest.find({
      $or: [{ sender: req.user._id }, { receiver: req.user._id }],
    }).select("sender reciever");
    const hideUsersFeed = new Set();
    existingRequest.forEach((req) => {
      hideUsersFeed.add(req.sender);
      hideUsersFeed.add(req.receiver);
    });
    const allUsers = await User.find({
      $and: [
        { _id: { $nin: Array.from(hideUsersFeed) } },
        { _id: { $ne: req.user._id } },
      ],
    })
      .select("firstName lastName profilePicture about skills profilePhoto")
      .skip(skip)
      .limit(limit);
    res.send({ message: "Data fetch successfully", data: allUsers });
  } catch (err) {
    res.status(400).send(err);
  }
});
module.exports = userRouter;
