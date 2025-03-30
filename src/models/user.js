const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
  },
  lastName: {
    type: String,
  },
  email: {
    type: String,
  },
  password: {
    type: String,
  },
  age: {
    type: Number,
  },
  gender: {
    type: String,
  },
  about: {
    type: String,
  },
  profilePhoto: {
    type: String,
  },
});

userSchema.methods.getJWT = async function () {
  const user = this;
  console.log(user);
  const token = await jwt.sign(
    {
      _id: user.id,
    },
    "dev@tinder",
    {
      expiresIn: "1d",
    }
  );
  return token;
};
module.exports = mongoose.model("User", userSchema);
