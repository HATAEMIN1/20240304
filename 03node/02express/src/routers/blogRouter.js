const { Router } = require("express");
const { default: mongoose } = require("mongoose");
const { Blog } = require("../models/Blog");
const { User } = require("../models/User");
const blogRouter = Router();

blogRouter.get("/", async function (req, res) {
  try {
    const blog = await Blog.find({});
    return res.send({ blog });
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
});
blogRouter.post("/", async function (req, res) {
  const { title, content, islive, userId } = req.body;
  const user = await User.findById(userId);
  new Blog({ ...req.body });
});

module.exports = { blogRouter };
