const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const { userRouter } = require("./route/userRouter.js");
const { blogRouter } = require("./route/blogRouter.js");
const { commentRouter } = require("./route/commentRouter.js");

const users = [];
dotenv.config();
const server = async function () {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("디비연결완료");
    mongoose.set("debug", true);
    app.use(express.json()); ///제이슨으로 변경하는 미들웨어
    app.use("/user", userRouter);
    app.use("/blog", blogRouter);
    app.use("/blog/:blogId/comment", commentRouter);

    app.listen(3000);
  } catch (error) {
    console.log("잘못연결");
  }
};

server();
