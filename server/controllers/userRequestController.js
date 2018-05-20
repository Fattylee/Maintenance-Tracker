const requests = require("./../../dummyData/loggedinUsersRequest");
//import requests from './../../dummyData/loggedinUsersRequest';


class UserRequestHandler{

  static getAllRequest(req,res){
    res.send(requests);
  }

  static getARequest(req,res){
    const requestId = req.params.id;
    const request = requests.find(request => request.id === parseInt(requestId));
  
    if(!request){
      res.status(404);
      res.send("Invalid request id");
      return false;
    }
    
    res.send(request);
  }
  

}



module.exports = UserRequestHandler;
