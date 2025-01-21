const express = require('express');
const app = express();
const connectToDB = require("./config/database");

connectToDB()
  .then(() =>
    app.listen(5000, () => {
      console.log("server running on port 5000");
    })
  )
  .catch((err: any) => {
    console.log("cant connect to database error: ", err);
  });
