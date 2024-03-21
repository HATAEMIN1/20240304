const { Router } = require("express");
const { default: mongoose } = require("mongoose");
const { Blog } = require("../model/Blog");
const { User } = require("../model/User");
const blogRouter = Router();

blogRouter.get("/", async function (req, res) {
  try {
    const blogs = await Blog.find({});
    return res.send({ blogs });
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
});

blogRouter.post("/", async function (req, res) {
  try {
    const { title, content, islive, userId } = req.body; // 보내고 싶은 json 내용
    let user = await User.findById({ userId }); //userId로 id찾기
    let blog = new Blog({ ...req.body, user });
    await blog.save();
    return res.send(blog);
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
});
blogRouter.get("/:blogId", async function (req, res) {
  try {
    const { blogId } = req.params;
    const blog = await Blog.findOne({ _id: blogId });
    return res.send({ blog });
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
});
module.exports = { blogRouter };
