const res = require("../app");
const mysql = require("mysql2");
const pool = require("../dbController/pool");
const reqJson = [];

async function resultsSoFar(req, res) {
  const qIdArray = req.query.qId;
  pool.getConnection(function (err, connection) {
    pool.query(
      `SELECT * FROM status_counts WHERE question_id IN(
      ${qIdArray[0]},
      ${qIdArray[1]},
      ${qIdArray[2]},
      ${qIdArray[3]},
      ${qIdArray[4]},
      ${qIdArray[5]},
      ${qIdArray[6]},
      ${qIdArray[7]},
      ${qIdArray[8]},
      ${qIdArray[9]}
      );`,
      (error, results) => {
        if (error) {
          console.log("error connecting: " + error.stack);
          return;
        }
        // ＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝question_idごとに区切るrecordオブジェクトを作る
        const carvingDatas = [];
        for (let qIdArray_i = 0; qIdArray_i <= 9; qIdArray_i++) {
          let carvingVar = results.filter(
            (record) => record.question_id === Number(qIdArray[qIdArray_i])
          );
          carvingDatas.push(carvingVar);
        }
        // ＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝carvingDatasのtrueの割合を計算
        carvingDatas.forEach((carvingDataObj) => {
          let trueSum = carvingDataObj.filter(
            (DataObjRecord) => DataObjRecord.status === 1
          );
          resultRatio = Math.floor(
            (trueSum.length / carvingDataObj.length) * 100
          );
          reqJson.push({
            id: carvingDataObj[0].question_id,
            trueRatio: resultRatio,
          });
        });
        console.log(reqJson);
        connection.release();
        return res.send(reqJson);
      }
    );
  });
}
module.exports = resultsSoFar;
