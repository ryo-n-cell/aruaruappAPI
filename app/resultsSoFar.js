const res = require("../app");
const mysql = require("mysql2");
const pool = require("../dbController/pool");
const returnQIdCalc = [];

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
        const dbData = results;
        dbData.sort(function (a, b) {
          if (a.question_id < b.question_id) return -1;
          if (a.question_id > b.question_id) return 1;
          return 0;
        });
        // ＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝
        const question_idsArray = [];
        dbData.forEach((dbData) => {
          question_idsArray.push(dbData.question_id);
        });
        const untilResultArray = [];
        // ソートした配列をquestionIDごとの配列としてまとめてuntilResultArrayへ代入する
        // question_idsArrayはquestionIDのみを入れた配列
        for (let qId_i = 0; qId_i <= 9; qId_i++) {
          qid_length = question_idsArray.lastIndexOf(Number(qIdArray[qId_i]));
          let arrayById = [];
          for (
            let qid_length_n = 0;
            qid_length_n <= qid_length;
            qid_length_n++
          ) {
            arrayById.push(dbData[qid_length_n]);
          }
          untilResultArray.push(arrayById);
          question_idsArray.splice(0, qid_length + 1);
          dbData.splice(0, qid_length + 1);
        }
        // ＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝
        // qid配列ごとにtrue/qidごとの配列の母数とBoolean
        untilResultArray.forEach(resultArray => {
          let questionParameter = resultArray.length
          console.log(resultArray.length)
          const trueCount = resultArray.filter(resultArray => resultArray.status === 1);
          console.log(trueCount.length)
          // if(trueCount === 0)
          resultRatio = Math.floor(trueCount.length/questionParameter  * 100 )/10
          console.log(resultRatio)
        });
        connection.release();
        return res.send(untilResultArray);
      }
    );
  });
}

function resultsCalc(qId) {
  // let resultObj={};
}

module.exports = resultsSoFar;

// 配列1000個あるもの（result）に対してquestion_idに合致したオブジェクトの配列を作りたい。
// 　：一回resultをquestion_idを小さい順にソートしておく。
// 　　次にresultのquestion_idの最初の要素から「外れている」配列要素の番号を探す。
// 　　その番号から前の配列要素を変数filterRecordに加える。加えたresultの配列要素はその時点で消去する。
