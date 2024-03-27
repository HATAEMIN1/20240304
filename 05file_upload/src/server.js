const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const { imageRouter } = require("./routes/imageRouter");
const { userImage } = require("./routes/userRouter");
const { userRouter } = require("./routes/userRouter2");
dotenv.config();
// app.use(express.static("uploads"));    localhost:3000/abc.jpeg
app.use("/uploads", express.static("uploads"));
//  localhost:3000/uploads/abc.jpeg
const server = async function (req, res) {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("db연결");
    mongoose.set("debug", true);
    app.use(express.json());
    app.use("/upload", imageRouter);
    app.use("/user2", userRouter);
    app.use("/user", userImage);
    app.listen(3000);
  } catch (error) {
    console.log("연결안됨");
  }
};
server();
