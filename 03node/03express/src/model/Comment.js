const { Schema, model, Types } = require("mongoose");
const CommentSchema = Schema({
  content: { type: String, required: true },
  user: { type: Types.ObjectId, required: true, ref: "user" },
  blog: { type: Types.ObjectId, required: true, ref: "user" },
});

const Comment = model("comment", CommentSchema);
module.exports = { Comment };
