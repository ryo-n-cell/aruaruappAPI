const express = require("express");
const app = express();
app.use(express.json());

const cors = require("cors");
app.use(cors());

const mysql = require("mysql2");
require("dotenv").config();
const dbConnection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB,
});

// mySQLは一定時間接続するとPROTOCOL_CONNECTION_LOSTするのでそれを防ぐためのポーリングコードを書く
dbConnection.connect((error) => {
  if (error) {
    console.error("Database Connect Error:" + error);
    return;
  } else {
    console.log("Database Connection Success: id=" + dbConnection.threadId);
  }
});

const getData = require("./app/getData");
app.get("/", (req, res, next) => {
  try {
    if (!req.query.completed) {
      return getData(res);
    }
  } catch (err) {
    err.statusCode = 400;
    return next(err);
  }
});

const sendResult = require("./app/sendResult");
app.post("/", (req, res, next) => {
  try {
    return sendResult(req, res);
  } catch (error) {
    const err = new Error("Reqest body is not JSON");
    err.statusCode = 400;
    return next(err);
  }
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Internal Server Error");
});

app.listen(process.env.PORT || 5000);
