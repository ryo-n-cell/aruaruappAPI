const res = require("../app")
const mysql = require("mysql2");

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB,
});

// INSERT INTO status_count(id,question_id,category_id,status,Created_at) VALUES (5,1,1,true,"0000-00-00 00:00:00");
function sendResult(req,res){
  const reqData = JSON.parse(JSON.stringify(req.body));
  // connection.query(
  //   "select count(*) from status_count;",
  //   (error, results) => {
  //     if (error) {
  //       console.log("error connecting: " + error.stack);
  //       return;
  //     }
  //     const status_count_max_id = results
  //   }
  // );
  console.log(reqData,status_count_max_id)
  // レコード数＋１をIDとして扱う getDbId()（非同期処理）
  // resAnalysisで送られてきたJSONファイルを扱いやすいオブジェクトとして変える（型を決める/[{question_id:X,category_id:X,status:X}]
  // テンプレートリテラルを使用した一括インサート（非同期処理）
  return res.status(201);
}

// function resAnalysis(){
  
// }

module.exports = sendResult