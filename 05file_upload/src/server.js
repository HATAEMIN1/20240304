const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const { upload } = require("./middlewares/imageUpload");
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
    app.post("/upload", upload.single("image"), async function (req, res) {
      //form의 name = image
      try {
        console.log(req.file);
        return res.send(req.file);
      } catch (error) {
        return res.status(500).send({ error: error.message });
      }
    });

    app.listen(3000);
  } catch (error) {
    console.log("연결안됨");
  }
};
server();
