const { Router } = require("express");
const { default: mongoose } = require("mongoose");
const { User } = require("../model/User");
const { Blog } = require("../model/Blog");
const { Comment } = require("../model/Comment");
const commentRouter = Router({ mergeParams: true });

commentRouter.post("/", async function (req, res) {
  const { blogId } = req.params;
  const { content, userId } = req.body;

  const [blog, user] = await Promise.all([
    Blog.findOne({ _id: blogId }),
    User.findOne({ _id: userId }),
  ]);
  const comment = new Comment({ content, user, blog });
  await comment.save();
  return res.send({ comment });
});
commentRouter.get("/", async function (req, res) {
  const { blogId } = req.params;
  const comments = await Comment.find({ blog: blogId });
  return res.send({ comments });
});
module.exports = { commentRouter };
