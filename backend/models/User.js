const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    businessName: String,
    ownerName: String,
    email: {
      type: String,
      unique: true,
    },
    password: String,
    storeType: String,
  },
  { timestamps: true }
);

module.exports = mongoose.models.User || mongoose.model("User", userSchema);
