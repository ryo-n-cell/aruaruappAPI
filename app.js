const express = require("express");
const app = express();
app.use(express.json());

app.get("/", (req, res, next) => {
  if (!req.query.completed) {
    (async()=>{
      const data = await require('./app/send-question');
      console.log(data);
      res.header({'Content-Type': 'application/json'});
      return res.json(data);
    })().catch(next);
  }
});

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