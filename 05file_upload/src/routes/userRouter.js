const { Router } = require("express");
const { default: mongoose } = require("mongoose");
const { User } = require("../models/User");
// const { Image } = require("../models/Image");
const { upload } = require("../middlewares/imageUpload");
const userImage = Router();

userImage.post("/", upload.single("image"), async function (req, res) {
  try {
    const { username, useremail, password } = req.body;
    // if (!req.file) {
    //   return res.status(400).send({ error: "No file uploaded." });
    // }
    const { originalname, filename } = req.file;
    const image = [{ originalname, filename }];
    console.log(req.file);
    console.log(req.file.originalname);
    console.log(req.file.filename);
    const images = await new User({
      ...req.body,
      image,
    }).save();
    return res.send({ images });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

userImage.put(
  "/:userImageid",
  upload.single("image"),
  async function (req, res) {
    try {
      const { userImageid } = req.params;
      const { username, useremail, password, role } = req.body;
      const { originalname, filename } = req.file;
      const image = [{ originalname, filename }];
      const update = await User.findOneAndUpdate(
        { _id: userImageid },
        { username, image },
        { new: true }
      );
      return res.send({ update });
    } catch (error) {
      res.status(500).send({ error: error.message });
    }
  }
);
module.exports = { userImage };
