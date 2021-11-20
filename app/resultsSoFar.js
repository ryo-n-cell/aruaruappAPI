const res = require("../app")
const mysql = require("mysql2");
const pool = require("../dbController/pool");
const returnQIdCalc=[]

async function resultsSoFar(req,res){
  const qIdArray=req.query.qId;
  pool.getConnection(function(err,connection){
    pool.query(
     `SELECT * FROM status_count WHERE question_id IN(
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
        const dbData = results
        dbData.sort(function(a,b){
          if(a.question_id<b.question_id) return -1;
          if(a.question_id > b.question_id) return 1;
          return 0;
      });
        for(let qId_i = 0;qId_i <= 9;qId_i++){
          // let filterRecord = dbData.filter(qId => qId.question_id === qIdArray[qId_i]);
          // console.log(dbData)
          console.log(dbData.lastIndexOf(qIdArray[qId_i]));
        }
        connection.release();
        return res.send(dbData);
      }
    );
  })
}

function resultsCalc(qId){
  // let resultObj={};
}

module.exports = resultsSoFar

// 配列1000個あるもの（result）に対してquestion_idに合致したオブジェクトの配列を作りたい。
// 例：resultから合致する配列要素を変数filterRecordに加える。合致したresultの配列要素はその時点で消去する
// 　：一回resultをquestion_idを小さい順にソートしておく。（その時にソートするアルゴリズムを作る懸念点がある）
// 　　次にresultのquestion_idの最初の要素から「外れている」配列要素の番号を探す。
// 　　その番号から前の配列要素を変数filterRecordに加える。加えたresultの配列要素はその時点で消去する。