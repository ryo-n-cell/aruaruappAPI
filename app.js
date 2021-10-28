require("dotenv").config();
const express = require("express");
const app = express();
app.use(express.json());

const cors = require("cors");
app.use(cors());

const mysql = require("mysql2");

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB,
});

connection.connect((error) => {
  if (error) {
      console.error('Database Connect Error:' + error);
      return;
  } else {
      console.log('Database Connection Success: id=' + connection.threadId);
  }
});

app.get("/", (req, res, next) => {
  if (!req.query.completed) {
    res.header({'Content-Type': 'application/json'});
    connect(res)
  }
});

function connect(res){
  connection.query(
    "SELECT * FROM heroku_5d14dd59fe74ea5.question_table;",
    (error, results) => {
      if (error) {
        console.log("error connecting: " + error.stack);
        return;
      }
      const data =  makeQuestion(results);
      return res.json(data);
    }
  );
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
}



// function promisDb(){
//   return new Promise((resolve,reject)=>
//   setTimeout(()=>{
//     try {
//       handleDisconnect()
//       resolve(connect())
//     }catch(err){
//       reject(err)
//     }
//   },1000)
//   )
// }

app.post("/", (req, res, next) => {
  try{
    const reqData = JSON.stringify(req.body);
    JSON.parse(reqData);
    console.log("OK")
    res.status(201);
  }catch(error){
    const err = new Error("Reqest body is not JSON");
    err.statusCode = 400;
    return next(err);
  }
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Internal Server Error');
});

app.listen(process.env.PORT || 5000);