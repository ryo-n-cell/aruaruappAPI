const express = require('express');
const mysql = require('mysql');

const app = express();

const connection = mysql.createConnection({
  host: 'us-cdbr-east-04.cleardb.com',
  user: 'b6e2e681d4a1ba',
  password: '59fa5562',
  database: 'heroku_5d14dd59fe74ea5'
});

connection.connect((err) => {
  if (err) {
    console.log('error connecting: ' + err.stack);
    return;
  }
  console.log('success');
});

app.get('/', (req, res) => {
  connection.query(
    'SELECT * FROM heroku_5d14dd59fe74ea5.question_table;',
    (error, results) => {
      console.log(results);
      res.render(results);
    }
  );
});

app.listen(3000);

// DB_NAME='heroku_5d14dd59fe74ea5'
// DB_USERNAME='b6e2e681d4a1ba'
// DB_PASSWORD='59fa5562'
// DB_HOSTNAME='us-cdbr-east-04.cleardb.com'
// DB_PORT='3306'
// heroku_5d14dd59fe74ea5
// DATABASE_URL='mysql://b6e2e681d4a1ba:59fa5562@us-cdbr-east-04.cleardb.com/heroku_5d14dd59fe74ea5?reconnect=true'