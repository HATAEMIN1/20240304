const multer = require("multer");
const { v4: uuid } = require("uuid");
const mime = require("mime-types");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    cb(null, uuid() + "." + mime.extension(file.mimetype));
  },
});

const upload = multer({
  storage,
  fileFilter: function (req, file, cb) {
    if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
      cb(null, true);
    } else {
      cb(new Error("jpg만 업로드 가능"), false);
    }
  },
  limits: {
    fieldSize: 1024 * 1024 * 3,
  },
});
module.exports = { upload };
