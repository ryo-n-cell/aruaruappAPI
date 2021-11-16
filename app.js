const express = require("express");
const app = express();
app.use(express.json());
const mysql = require("mysql2");
const cors = require("cors");
app.use(cors());

const getData = require("./app/getData");
app.get("/getData", (req, res, next) => {
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
app.post("/sendResult", (req, res, next) => {
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
