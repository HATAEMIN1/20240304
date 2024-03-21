const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const { userRouter } = require("../src/routes/userRouter.js");
const { blogRouter } = require("./routes/blogRouter.js");
dotenv.config();

const server = async function () {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("디비연결완료");
    app.use(express.json());
    app.use("/user", userRouter);
    app.use("/blog", blogRouter);
    app.listen(3000);
  } catch (error) {
    console.log("연결안됨");
  }
};
server();
