const { Router } = require("express");
const imageRouter = Router();
const { upload } = require("../middlewares/imageUpload");
const { default: mongoose } = require("mongoose");
const { Image } = require("../models/Image");

imageRouter.post("/", upload.array("image"), async function (req, res) {
  //form의 name = image
  try {
    console.log(req.files);
    // single file
    const { title } = req.body;
    const image = await new Image({
      filename: req.file.filename,
      originalname: req.file.originalname,
      title,
    }).save();
    return res.send({ image });

    //multi file
    // const { title, content } = req.body;
    // const images = [];
    // req.files.forEach(function (item) {
    //   images.push({
    //     originalname: item.originalname,
    //     filename: item.filename,
    //   });
    // });
    // const image = await new Image({
    //   ...req.body,
    //   images,
    // }).save();
    // return res.send({ image });
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
});

module.exports = { imageRouter };
