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

