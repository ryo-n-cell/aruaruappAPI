require("dotenv").config();
const express = require("express");
const app = express();

const cors = require("cors");
app.use(cors());

const mysql = require("mysql");

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB,
});

// 接続自体のエラーハンドリング
connection.connect((err) => {
  if (err) {
    console.log("error connecting: " + err.stack);
    return;
  }
  console.log("success");
});

// DBへ接続
app.get("/", (req, res) => {
  connection.query(
    "SELECT * FROM heroku_5d14dd59fe74ea5.question_table;",
    (error, results) => {
      let sendData = makeQuestion(results);
      // console.log(res);
      app.get;
      res.send(sendData);
    }
  );
});

// ランダマイズされたJSONデータが帰ってくる関数
function makeQuestion(fullData) {
  const maxDataLength = fullData.length;
  let outputData = [];
  // maxDataLength-1を最大とし0~最大数の重複なしの配列を10つ出す
  let existNumber = [];
  do {
    let tmp = intRandom(0, maxDataLength - 1);
    if (!existNumber.includes(tmp)) {
      existNumber.push(tmp);
    }
  } while (existNumber.length !== 10);
  // existNumberを添え字としてfullDataオブジェクトを10こ取り出す
  for (let i = 0; existNumber.length - 1 >= i; i++) {
    let tmpData = fullData[existNumber[i]];
    outputData.push(tmpData);
  }
  return JSON.stringify(outputData);

  function intRandom(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
}

app.listen(process.env.PORT || 5000);
