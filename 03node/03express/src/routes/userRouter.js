const { Router } = require("express");
const mongoose = require("mongoose");
const User = require("../model/User");
const userRouter = Router();

userRouter.get("/", async function (req, res) {
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
  try {
    const user = new User(req.body);
    await user.save();
    res.send({ user });
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
});
userRouter.delete("/:userId", async function (req, res) {
  try {
    const { userId } = req.params;
    const user = await User.findByIdAndDelete({ _id: userId });
    return res.send({ user });
  } catch (error) {}
});
userRouter.put("/:userId", async function (req, res) {
  try {
    let { userId } = req.params;
    let { age, email } = req.body;
    const user = await User.findByIdAndUpdate(
      userId,
      {
        $set: { age, email },
      },
      { new: true }
    );
    return res.send({ user });
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
});
module.exports = { userRouter };
