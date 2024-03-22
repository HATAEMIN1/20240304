const { Router } = require("express");
const { Comment } = require("../model/comment");
const { Blog } = require("../model/Blog");
const { User } = require("../model/User");
const { default: mongoose } = require("mongoose");
const commentRouter = Router({ mergeParams: true });

commentRouter.post("/", async function (req, res) {
  try {
    const { blogId } = req.params;
    const { content, userId } = req.body;

    const [blog, user] = await Promise.all([
      Blog.findOne({ _id: blogId }),
      User.findOne({ _id: userId }),
    ]);

    // const blog = await Blog.findOne({ _id: blogId });
    // const user = await User.findOne({ _id: userId });

    if (!blog || !user) {
      return res.status(400).send({ err: "blog,user를 찾을 수 없음" });
    }
    const comment = new Comment({ content, user, blog });
    await comment.save();

    return res.send({ comment });
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
});

commentRouter.get("/", async function (req, res) {
  try {
    const { blogId } = req.params;
    const comments = await Comment.find({ blog: blogId });
    return res.send({ comments });
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
});

commentRouter.delete("/:commentId", async function (req, res) {
  let { commentId } = req.params;
  const comment = await Comment.findByIdAndDelete({ _id: commentId });
  return res.send({ comment });
});

module.exports = { commentRouter };
