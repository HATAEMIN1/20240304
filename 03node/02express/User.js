const mongoose = require("mongoose");

const UserSchema = mongoose.Schema(
  {
    username: {
      type: String,
      require: true,
    },
    name: {
      first: {
        type: String,
        require: true,
      },
      last: {
        type: String,
        require: true,
      },
      age: Number,
      email: String,
    },
  },
  { timestamps: true }
);
const User = mongoose.model("uesr", UserSchema);
module.exports = { User };
