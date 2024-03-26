const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const { userRouter } = require("./route/userRouter.js");
const { blogRouter } = require("./route/blogRouter.js");
const { commentRouter } = require("./route/commentRouter.js");
const { upload } = require("./middlewares/imageUpload.js");
dotenv.config();

app.use("/uploads", express.static("uploads"));

const server = async function () {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("디비연결완료");
    app.use(express.json());
    app.post("/upload", upload.array("image", 3), async function (req, res) {
      //form의 name = image
      try {
        console.log(req.files);
        return res.send(req.files);
      } catch (error) {
        return res.status(500).send({ error: error.message });
      }
    });
    app.use("/user", userRouter);
    app.use("/blog", blogRouter);
    app.use("/blog/:blogId/comment", commentRouter);
    app.listen(3000);
  } catch (error) {
    console.log("연결안됨");
  }
};
server();
