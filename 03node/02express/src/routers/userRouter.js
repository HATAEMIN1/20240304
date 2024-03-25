const { Router } = require("express");
const { default: mongoose } = require("mongoose");
const { User } = require("../models/User");
const userRouter = Router();

userRouter.get("/", async function (req, res) {
  try {
    const users = await User.find({});
    return res.send({ users });
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
});
userRouter.post("/", async function (req, res) {
  try {
    const user = new User(req.body);
    await user.save();
    return res.send({ user });
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
});
userRouter.delete("/:userId", async function (req, res) {
  try {
    const { userId } = req.params;
    const user = await User.findByIdAndDelete({ _id: userId });
    return res.send({ user });
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
});
userRouter.put("/:userId", async function (req, res) {
  try {
    const { userId } = req.params;
    const { username, name } = req.body;
    const user = await User.findByIdAndUpdate(
      userId,
      { $set: { username, name } },
      { new: true }
    );
    return res.send({ user });
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
});

module.exports = { userRouter };
