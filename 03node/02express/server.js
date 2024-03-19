const express = require("express");
const app = express();
const mongoose = require("mongoose");
const { User } = require("./User.js");
const MONGO_URL =
  "mongodb+srv://gkxoals33:0lUDwiTsPmcWsDG5@mongodb0.3ej5iia.mongodb.net/book?retryWrites=true&w=majority&appName=mongodb0";
const users = [];
const server = async function () {
  await mongoose.connect(MONGO_URL);
  app.use(express.json());
  app.get("/user", async function (req, res) {
    try {
      const users = await User.find({});
      return res.send({ users });
    } catch (error) {
      return res.status(500).send({ error: error.message });
    }
    const users = await User.find({});
    res.send({ users });
  });

  app.post("/user", async function (req, res) {
    try {
      let { username, name } = req.body;
      if (!username) {
        return res.status(400).send({ error: "이름없음" });
      }
      if (!name || !name.first || !name.latst) {
        return res.status(400).send({ error: "성/이름이 없네요" });
      }

      console.log("자료" + req.body.username);
      const user = new User(req.body);
      await user.save();
      res.send({ user });
    } catch (error) {}
  });

  app.listen(3000);
};

server();
