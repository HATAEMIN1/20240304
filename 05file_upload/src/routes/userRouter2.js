const { Router } = require("express");
const { default: mongoose } = require("mongoose");
const { User } = require("../models/User");
const { upload } = require("../middlewares/imageUpload");
const userRouter = Router();
const { hash, compare } = require("bcryptjs");

userRouter.post("/reg", async function (req, res) {
  try {
    const password = await hash(req.body.password, 10);
    console.log(password);
    const user = await new User({ ...req.body, password }).save();
    // return res.send({ user });
    return res.send({ user });
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
});
userRouter.get("/", async function (req, res) {
  try {
    const user = await User.find({});
    return res.send(user);
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
});
userRouter.post("/login", async function (req, res) {
  try {
    // console.log(req.body);
    const user = await User.findOne({ useremail: req.body.useremail });
    const isValid = await compare(req.body.password, user.password);
    if (!isValid) {
      return res
        .status(400)
        .send({ error: "입력하신 정보가 올바르지 않습니다." });
    }
    console.log(isValid);
    return res.send({ message: "로그인 되었습니다.", email: user.useremail });

    // return res.send(req.body);
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
});

userRouter.put(
  "/reg_modi/:userId",
  upload.single("avatar"),
  async function (req, res) {
    try {
      const { userId } = req.params;
      const { username } = req.body;
      const { filename, originalname } = req.file;
      const image = [{ filename, originalname }];
      const update = await User.findOneAndUpdate(
        { _id: userId },
        { username, image },
        { new: true }
      );
      return res.send({ update });
    } catch (error) {
      return res.status(500).send({ error: error.message });
    }
  }
);

module.exports = { userRouter };
