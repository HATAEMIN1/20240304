const express = require("express");
const app = express();
const mongoose = require("mongoose");
const { User } = require("../01express/src/model/User");

const users = [];
app.get("/user", function (req, res) {});

app.post("/user", async function (req, res) {
  let { username, name } = req.body;
  const user = new User(req.body);
  await user.save();
  res.send({ user });
});

app.listen(3000);
