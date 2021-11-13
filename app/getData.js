const res = require("../app");
const mysql = require("mysql2");

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB,
});

function getData(res) {
  pool.query("SELECT * FROM question_table;", (error, results) => {
    if (error) {
      console.log("error connecting: " + error.stack);
      return;
    }
    const data = makeQuestions(results);
    res.header({ "Content-Type": "application/json" });
    return res.json(data);
  });
}

function makeQuestions(fullData) {
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
module.exports = getData;
