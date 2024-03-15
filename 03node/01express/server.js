const express = require("express");
const app = express();

const users = [];

app.use(express.json());

app.get("/user", function (req, res) {
  return res.send({ uesrs: users });
});

app.post("/user", function (req, res) {
  // console.log(req.body);
  //   users.push({ name: "홍길동", age: 30 });
  users.push({ name: req.body.name, age: req.body.age });
  return res.send({ sucess: true });
});

app.listen(3000);
