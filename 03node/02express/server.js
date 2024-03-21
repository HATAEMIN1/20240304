const express = require("express");
const { default: mongoose } = require("mongoose");
const app = express();
const { User } = require("./src/models/User");
const dotenv = require("dotenv");
dotenv.config();

const server = async function () {
  await mongoose.connect(process.env.MONGO_URL);
  app.use(express.json());

  app.get("/", async function (req, res) {
    const user = await User.find({});
    res.send({ user });
  });

  app.post("/", async function (req, res) {
    const user = new User(req.body);
    await user.save();
  });
};

server();
