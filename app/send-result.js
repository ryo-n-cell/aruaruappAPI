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
      let test = makeQuestion(results);
      // console.log(res);
      app.get;
      res.send(test);
    }
  );
});

// GETでクライアントから送られたJSONファイルを取得してPOSTでDBに追加する

app.listen(process.env.PORT || 5000);
