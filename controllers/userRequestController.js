const requests = require("./../dummyData/loggedinUsersRequest");

const get = (req,res)=>{
  //res.send("List of logged in users");
  res.send(requests);
};

module.exports ={
  get
};