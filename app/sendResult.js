const res = require("../app");
const mysql = require("mysql2");
const pool = require("../dbController/pool");

function sendResult(req, res) {
  const reqData = JSON.parse(JSON.stringify(req.body));
  pool.getConnection(function(err,connection){
    connection.query("select count (*) from status_counts;", (error, results) => {
      if (error) {
        console.log("error connecting: " + error.stack);
        return;
      }
      const addId = results[0]["count (*)"] + 1;
      insertQuery(reqData, addId,connection);
      connection.release();
    });
  })
  res.status(201);
  res.send("POST OK")
  return
}

function insertQuery(reqData, addId,connection) {
  let insertObj = {
    idArray: [],
    questionArray: [],
    statusArray: [],
    createat: Date.now(),
  };
  for (reqDataCount_i = 0; reqDataCount_i <= 9; reqDataCount_i++) {
    insertObj.idArray.push(addId);
    addId += 1;
    insertObj.questionArray.push(reqData[reqDataCount_i].question_id);
    insertObj.statusArray.push(reqData[reqDataCount_i].status);
  }
  connection.query(
    `INSERT INTO status_counts(id,question_id,status,Created_at) VALUES 
    (${insertObj.idArray[0]},${insertObj.questionArray[0]},${insertObj.statusArray[0]},${insertObj.createat}),
    (${insertObj.idArray[1]},${insertObj.questionArray[1]},${insertObj.statusArray[1]},${insertObj.createat}),
    (${insertObj.idArray[2]},${insertObj.questionArray[2]},${insertObj.statusArray[2]},${insertObj.createat}),
    (${insertObj.idArray[3]},${insertObj.questionArray[3]},${insertObj.statusArray[3]},${insertObj.createat}),
    (${insertObj.idArray[4]},${insertObj.questionArray[4]},${insertObj.statusArray[4]},${insertObj.createat}),
    (${insertObj.idArray[5]},${insertObj.questionArray[5]},${insertObj.statusArray[5]},${insertObj.createat}),
    (${insertObj.idArray[6]},${insertObj.questionArray[6]},${insertObj.statusArray[6]},${insertObj.createat}),
    (${insertObj.idArray[7]},${insertObj.questionArray[7]},${insertObj.statusArray[7]},${insertObj.createat}),
    (${insertObj.idArray[8]},${insertObj.questionArray[8]},${insertObj.statusArray[8]},${insertObj.createat}),
    (${insertObj.idArray[9]},${insertObj.questionArray[9]},${insertObj.statusArray[9]},${insertObj.createat});`,
    (error, results) => {
      if (error) {
        console.log("error connecting: " + error.stack);
        return;
      }
    }
  );
}

module.exports = sendResult;
