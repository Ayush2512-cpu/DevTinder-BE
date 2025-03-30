const express = require("express");
const ConnectionRequest = require("../models/connectionRequest");
const userAuth = require("../middlewares/auth");
const requestRouter = express.Router();
const User = require("../models/user");

requestRouter.post(
  "/request/send/:status/:toUserId",
  userAuth,
  async (req, res) => {
    try {
      const { status, toUserId } = req.params;
      const isValidStatus = ["intrested", "ignored"];
      if (!isValidStatus.includes(status)) {
        return res.status(400).send("Invalid status");
      }
      const toUser = await User.findById(toUserId);
      if (!toUser) {
        return res.status(404).send("User not found");
      }
      const existingRequest = await ConnectionRequest.findOne({
        $or: [
          { sender: req.user._id, receiver: toUserId },
          { sender: toUserId, receiver: req.user._id },
        ],
      });
      if (existingRequest) {
        return res.status(400).send("Request already exists");
      }
      const user = new ConnectionRequest({
        sender: req.user._id,
        receiver: toUserId,
        status,
      });
      const data = await user.save();
      console.log(data);
      res.send(data + " added successfully");
    } catch (err) {
      res.status(400).send(err);
    }
  }
);

requestRouter.post(
  "/request/review/:status/:toUserId",
  userAuth,
  async (req, res) => {
    try {
      const { status, toUserId } = req.params;
      const isValidStatus = ["accepted", "rejected"];
      if (!isValidStatus.includes(status)) {
        return res.status(400).send("Invalid status");
      }
      const requestStatus = await ConnectionRequest.findOne({
        sender: toUserId,
        receiver: req.user._id,
        status: "intrested",
      });
      if (!requestStatus) {
        return res.status(404).send("Request not found");
      }
      requestStatus.status = status;
      console.log(requestStatus);
      const data = await ConnectionRequest.updateOne(requestStatus);
      res.json({ message: "Connection Request", data });
    } catch (err) {
      res.status(400).send(err);
    }
  }
);
module.exports = requestRouter;
