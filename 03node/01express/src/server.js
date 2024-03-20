const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const { User } = require("./model/User.js");

const users = [];
dotenv.config();
//process.env.MONGO_URL

// let result = mongoose.connect(MONGO_URL);
// console.log(result);

// mongoose.connect(MONGO_URL).then(function (result) {
//   return console.log(result);
// });

const server = async function () {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    app.use(express.json()); ///제이슨으로 변경하는 미들웨어

    app.get("/user", async function (req, res) {
      // return res.send({ uesr: users });
      try {
        const users = await User.find({});
        return res.send({ users });
      } catch (error) {
        return res.status(500).send({ error: error.message });
      }
    });

    app.post("/user", async function (req, res) {
      // 01
      // console.log(req.body);
      // users.push({ name: "홍길동", age: 30 });
      // users.push({ name: req.body.name, age: req.body.age });
      // return res.send({ sucess: true });

      // 02
      // let username = req.body.username;
      try {
        let { username, name } = req.body;
        if (!username) {
          return res.status(400).send({ error: "이름이 없네요!" });
        }
        if (!name || !name.first || !name.last) {
          return res.status(400).send({ error: "성/이름이 없네요!!!" });
        }
        const user = new User(req.body);
        await user.save();
        res.send({ user });
      } catch (error) {
        return res.status(500).send({ error: error.message });
      }
    });

    app.delete("/user/:userId", async function (req, res) {
      try {
        let { userId } = req.params;

        if (!mongoose.isValidObjectId(userId)) {
          return res.status(400).send({ error: "유저가 없네요!" });
        }
        const user = await User.findByIdAndDelete({ _id: userId });
        res.send({ user });
      } catch (error) {
        return res.status(500).send({ error: error.message });
      }
    });

    app.put("/user/:userId", async function (req, res) {
      try {
        let { userId } = req.params;
        let { age } = req.body;
        if (!mongoose.isValidObjectId(userId)) {
          return res.status(400).send({ error: "유저가 없네요!" });
        }
        if (!age) {
          return res.status(400).send({ error: "나이입력해주세요!" });
        }
        if (typeof age !== "number") {
          return res.status(400).send({ error: "숫자입력해주세요!" });
        }

        const user = await User.findByIdAndUpdate(
          userId, //id로찾음
          { $set: { age } }, //바꿀 키값
          { new: true } //새로고침 후 바로 반영 ,없으면 2번해줘야함
        );
        return res.send({ user });
      } catch (error) {
        return res.status(500).send({ error: error.message });
      }
    });

    app.listen(3000);
  } catch (error) {
    console.log("잘못연결");
  }
};

server();
