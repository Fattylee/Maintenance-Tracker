const express = require("express");

const app = express();

const port = process.env.PORT || 3000;
app.listen(3000,()=>{
  console.log("server listening for request on port", port);
});