const express = require("express");
const router = require("./routes/userRoute");

const app = express();

const port = process.env.PORT || 3000;
app.listen(3000,()=>{
  console.log("server listening for request on port", port);
});


app.use("/user",router);