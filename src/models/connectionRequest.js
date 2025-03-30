const mongoose = require("mongoose");
const connectionRequestSchema = new mongoose.Schema(
  {
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    receiver: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    status: {
      type: String,
      required: true,
      enum: ["intrested", "ignored", "accepted", "rejected"],
    },
  },
  { timestamps: true }
);

// connectionRequestSchema.index({ sender: 1, receiver: 1 }, { unique: true });
/* connectionRequestSchema.pre("save", function (next) {
  const connnectionRequest = this;
  if (connnectionRequest.sender.equals(connnectionRequest.receiver)) {
    next(new Error("Sender and receiver cannot be same"));
  }
}); */
module.exports = mongoose.model("ConnectionRequest", connectionRequestSchema);
