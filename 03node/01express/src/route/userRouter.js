const { Router } = require("express");
const mongoose = require("mongoose");
const { User } = require("../model/User.js");
const userRouter = Router();

userRouter.get("/", async function (req, res) {
  // return res.send({ uesr: users });
  try {
    const users = await User.find({});
    return res.send({ users });
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
});
userRouter.get("/:userId", async function (req, res) {
  try {
    const { userId } = req.params;
    const user = await User.findOne({ _id: userId });
    return res.send({ user });
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
});
userRouter.post("/", async function (req, res) {
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

userRouter.delete("/:userId", async function (req, res) {
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

userRouter.put("/:userId", async function (req, res) {
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

module.exports = { userRouter };
