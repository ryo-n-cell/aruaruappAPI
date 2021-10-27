require("dotenv").config();
const express = require("express");
const app = express();

const cors = require("cors");
app.use(cors());

const mysql = require("mysql");

const db_config = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB,
};

function handleDisconnect() {
  console.log('INFO.CONNECTION_DB: ');
  connection = mysql.createConnection(db_config);
  //connection取得
  connection.connect(function(err) {
      if (err) {
          console.log('ERROR.CONNECTION_DB: ', err);
          setTimeout(handleDisconnect, 1000);
      }
  });
  connection.on('error', function(err) {
      console.log('ERROR.DB: ', err);
      if (err.code === 'PROTOCOL_CONNECTION_LOST') {
          console.log('ERROR.CONNECTION_LOST: ', err);
          handleDisconnect();
      } else {
          throw err;
      }
  });
}
handleDisconnect();

// DBへ接続
function conect(){
  connection.query(
    "SELECT * FROM heroku_5d14dd59fe74ea5.question_table;",
    (error, results) => {
      if (error) {
        console.log("error connecting: " + error.stack);
        return;
      }
      exports.sendData = makeQuestion(results);
    }
  );
}
conect()

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
  return outputData;

  function intRandom(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
}
