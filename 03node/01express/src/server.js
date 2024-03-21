const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const { userRouter } = require("./route/userRouter.js");

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
    app.use("/user", userRouter);
    app.listen(3000);
  } catch (error) {
    console.log("잘못연결");
  }
};

server();
