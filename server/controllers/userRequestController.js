const requests = require("./../../dummyData/loggedinUsersRequest");
//import requests from './../../dummyData/loggedinUsersRequest';


class UserRequestHandler{

  static getAllRequest(req,res){
    res.send(requests);
  }


  

}



module.exports = UserRequestHandler;
