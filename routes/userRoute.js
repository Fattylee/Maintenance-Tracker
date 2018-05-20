const express = require("express");

const router = express.Router();

router.get("/requests",(req,res)=>{
  res.send("List of logged in users");
});

module.exports = router;