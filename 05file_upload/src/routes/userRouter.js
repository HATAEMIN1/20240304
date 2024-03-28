const { Router } = require("express");
const { default: mongoose } = require("mongoose");
const { User } = require("../models/User");
// const { Image } = require("../models/Image");
const { upload } = require("../middlewares/imageUpload");
const userImage = Router();
const { hash } = require("bcryptjs");

userImage.post("/", upload.array("image", 3), async function (req, res) {
  try {
    const imagess = [];
    const password = await hash(req.body.password, 10);

    //single
    // if (!req.file) {
    //   return res.status(400).send({ error: "No file uploaded." });
    // }
    // const { originalname, filename } = req.file;
    // const image = [{ originalname, filename }];
    // console.log(req.file);
    // console.log(req.file.originalname);
    // console.log(req.file.filename);
    // const images = await new User({
    //   ...req.body,
    //   image,
    // }).save();
    // return res.send({ images });

    //multi
    req.files.forEach(function (item) {
      imagess.push({
        originalname: item.originalname,
        filename: item.filename,
      });
    });
    const images = await new User({
      ...req.body,
      password,
      image: imagess,
    }).save();
    return res.send({ images });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

userImage.put(
  "/:userImageid",
  upload.array("image", 3),
  async function (req, res) {
    try {
      const { userImageid } = req.params;
      const { username } = req.body;
      //single
      // const { originalname, filename } = req.file;
      // const image = [{ originalname, filename }];
      // const update = await User.findOneAndUpdate(
      //   { _id: userImageid },
      //   { username, image },
      //   { new: true }
      // );

      //multi
      const imagess = [];
      req.files.forEach(function (item) {
        imagess.push({
          originalname: item.originalname,
          filename: item.filename,
        });
      });
      const update = await User.findOneAndUpdate(
        { _id: userImageid },
        { username, image: imagess },
        { new: true }
      );
      return res.send({ update });
    } catch (error) {
      res.status(500).send({ error: error.message });
    }
  }
);
module.exports = { userImage };
