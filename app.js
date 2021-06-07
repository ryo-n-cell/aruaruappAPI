const express = require("express");
const app = express();
const cors = require("cors");

app.use(cors());

var jsonData = {
  key: [
    {
      id: 1,
      question: "ほぼ100%の(ほぼ)にピクッとなる",
    },
    {
      id: 2,
      question: "コンパイルを実行する時のエンターキーだけなんか強打しちゃう",
    },
    {
      id: 3,
      question: "手作業で30分掛かるものを3秒で終わらせるために3時間掛ける",
    },
    {
      id: 4,
      question:
        "大規模なサービスで障害が置きていると、妙な親近感とワクワクを感じる",
    },
    {
      id: 5,
      question: "コードを打ち込む時間より調べている時間のほうが長い",
    },
    {
      id: 6,
      question: "ソースコードに記述するコメントに性格が出る",
    },
    {
      id: 7,
      question: "帰ろうとするとトラブルが発生する",
    },
    {
      id: 8,
      question: "キーボードやマウスにはこだわるほうだ",
    },
    {
      id: 9,
      question: "パソコンのことは何でも知っていると思われてる",
    },
    {
      id: 10,
      question: "PCが調子悪かったら「とりあえず再起動」",
    },
  ],
};

// app.get("/", (req, res) => {
//   res.json(jsonData);
// });

app.get("/", function (req, res, next) {
  res.json(jsonData);
});

app.listen(process.env.PORT || 5000);

console.log("env");
// herokuにこのアプリをデプロイしてAPIを見る
// const connection = mysql.createConnection({
//   host: "サーバ名",
//   user: "ユーザー名",
//   password: "パスワード",
//   database: "データベース"
// });
