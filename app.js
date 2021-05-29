const express = require("express");
const app = express();
const port = 3000;
var jsonData = {
  key: [
    {
      id: 1,
      content: "AAAA",
    },
    {
      id: 2,
      content: "BBBBB",
    },
    {
      id: 3,
      content: "CCCCC",
    },
  ],
};

app.get("/", (req, res) => {
  res.json(jsonData);
});

app.listen(process.env.PORT || 5000);

// herokuにこのアプリをデプロイしてAPIを見る
