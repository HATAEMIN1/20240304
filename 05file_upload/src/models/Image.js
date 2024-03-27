const { default: mongoose } = require("mongoose");
const imageSchema = mongoose.Schema(
  {
    title: { type: String, required: true },
    content: { type: String, required: true },
    images: [{ originalname: { type: String }, filename: { type: String } }],
  },
  { Timestamps: true }
);
const Image = mongoose.model("image", imageSchema);
module.exports = { Image };
