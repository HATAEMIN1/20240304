const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");

const { User } = require("./src/model/User.js");

const users = [];
dotenv.config();
const server = async function () {
  try {
    //DB연결
    await mongoose.connect(process.env.MONGO_URL);
    //JSON으로 변경해주는 미들웨어
    app.use(express.json());
    //GET
    app.get("/user", async function (req, res) {
      try {
        const users = await User.find({});
        return res.send({ users });
      } catch (error) {
        return res.status(500).send({ error: error.message });
      }
    });
    //POST
    app.post("/user", async function (req, res) {
      try {
        let { username, name } = req.body;
        if (!username) {
          return res.status(400).send({ error: "이름없음" });
        }
        if (!name || !name.first || !name.last) {
          return res.status(400).send({ error: "성/이름이 없네요" });
        }

        console.log("자료" + req.body.username);
        const user = new User(req.body);
        await user.save();
        res.send({ user });
      } catch (error) {}
    });
    //DELETE
    app.delete("/user/:userId", async function (req, res) {
      try {
        let { userId } = req.params;
        if (!mongoose.isValidObjectId(userId)) {
          return res.status(400).send({ error: "유저가 없네요!" });
        }
        const user = await User.findByIdAndDelete({ _id: userId });
        res.send({ user });
      } catch (e) {
        return res.status(500).send({ error: error.message });
      }
    });
    //UPDATE
    app.put("/user/:userId", async function (req, res) {
      try {
        let { userId } = req.params;
        let { username, name, age, email } = req.body;
        if (!mongoose.isValidObjectId(userId)) {
          return res.status(400).send({ error: "유저가 없네요!" });
        }
        if (typeof age !== "number") {
          return res.status(400).send({ error: "숫자만 입력해주세요" });
        }
        if (!username || !name || !age || email) {
          return res
            .status(400)
            .send({ error: "유저이름,이름,나이,이메일을 입력하세요" });
        }

        const user = await User.findByIdAndUpdate(
          userId,
          { $set: { username, name, age, email } },
          { new: true }
        );
        res.send({ user });
      } catch (error) {
        return res.status(500).send({ error: error.message });
      }
    });
    app.listen(3000);
  } catch (e) {
    console.log("잘못 연결됨");
  }
};

server();
