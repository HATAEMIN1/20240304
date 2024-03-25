const express = require("express");
const { default: mongoose } = require("mongoose");
const app = express();
const dotenv = require("dotenv");
const { userRouter } = require("./src/routers/userRouter");
const { blogRouter } = require("./src/routers/blogRouter");
dotenv.config();

const server = async function () {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("db연결됨");
    mongoose.set("debug", true);
    app.use(express.json());
    app.use("/user", userRouter);
    app.use("/blog", blogRouter);
    app.listen(3000);
  } catch (error) {
    console.log("잘못연결");
  }
};
server();
