const res = require("../app");
const mysql = require("mysql2");

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB,
});

function sendResult(req, res) {
  const reqData = JSON.parse(JSON.stringify(req.body));
  connection.query("select count (*) from status_count;", (error, results) => {
    if (error) {
      console.log("error connecting: " + error.stack);
      return;
    }
    const addId = results[0]["count (*)"] + 1;
    insertQuery(reqData, addId);
  });
  return res.status(201);
}

function insertQuery(reqData, addId) {
  let insertObj = {
    idArray: [],
    questionArray: [],
    categoryArray: [],
    statusArray: [],
    createat: Date.now(),
  };
  for (reqDataCount_i = 0; reqDataCount_i <= 9; reqDataCount_i++) {
    insertObj.idArray.push(addId);
    addId += 1;
    insertObj.questionArray.push(reqData[reqDataCount_i].question_id);
    insertObj.categoryArray.push(reqData[reqDataCount_i].category_id);
    insertObj.statusArray.push(reqData[reqDataCount_i].status);
  }
  console.log(insertObj);
  connection.query(
    //ORMを使用してクエリを綺麗にすること (https://scrapbox.io/uki00a/Node.js%E3%81%AEORM%E3%81%AB%E3%81%A4%E3%81%84%E3%81%A6)
    `INSERT INTO status_count(id,question_id,category_id,status,Created_at) VALUES 
    (${insertObj.idArray[0]},${insertObj.questionArray[0]},${insertObj.categoryArray[0]},${insertObj.statusArray[0]},${insertObj.createat}),
    (${insertObj.idArray[1]},${insertObj.questionArray[1]},${insertObj.categoryArray[1]},${insertObj.statusArray[1]},${insertObj.createat}),
    (${insertObj.idArray[2]},${insertObj.questionArray[2]},${insertObj.categoryArray[2]},${insertObj.statusArray[2]},${insertObj.createat}),
    (${insertObj.idArray[3]},${insertObj.questionArray[3]},${insertObj.categoryArray[3]},${insertObj.statusArray[3]},${insertObj.createat}),
    (${insertObj.idArray[4]},${insertObj.questionArray[4]},${insertObj.categoryArray[4]},${insertObj.statusArray[4]},${insertObj.createat}),
    (${insertObj.idArray[5]},${insertObj.questionArray[5]},${insertObj.categoryArray[5]},${insertObj.statusArray[5]},${insertObj.createat}),
    (${insertObj.idArray[6]},${insertObj.questionArray[6]},${insertObj.categoryArray[6]},${insertObj.statusArray[6]},${insertObj.createat}),
    (${insertObj.idArray[7]},${insertObj.questionArray[7]},${insertObj.categoryArray[7]},${insertObj.statusArray[7]},${insertObj.createat}),
    (${insertObj.idArray[8]},${insertObj.questionArray[8]},${insertObj.categoryArray[8]},${insertObj.statusArray[8]},${insertObj.createat}),
    (${insertObj.idArray[9]},${insertObj.questionArray[9]},${insertObj.categoryArray[9]},${insertObj.statusArray[9]},${insertObj.createat});`,
    (error, results) => {
      if (error) {
        console.log("error connecting: " + error.stack);
        return;
      }
    }
  );
}

module.exports = sendResult;