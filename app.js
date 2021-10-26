const express = require("express");
const app = express();

app.get("/", function (req, res) {
  const data = require("./app/send-question");
  async (data) => {
    res.send(data.sendData);
    console.log(data.sendData);
  };
});

app.post("/", function (req, res) {
  res.send("hello world");
});

app.listen(process.env.PORT || 5000);
