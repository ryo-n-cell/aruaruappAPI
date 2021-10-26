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

// const testData = {
//   id: 4,
//   question_id: 4,
//   category_id: 4,
//   status: true,
//   create_at: Date.now(),
// };

// connection.query(
//   `insert into heroku_5d14dd59fe74ea5.status_count values (${testData.id}, ${testData.question_id}, ${testData.category_id},${testData.status},${testData.create_at});`,
//   (error, results) => {
//     if (error) throw error;
//     console.log(results);
//   }
// );

// DBへ接続
// app.post("/", (req, res) => {

// });
