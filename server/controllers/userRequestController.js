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
  
  static postARequest(req,res){
    const { username, requestType, description } = req.body;
    const id = requests[requests.length - 1].id + 1;
    const newRequest = {
      id,
      username,
      requestType,
      description,
    };
    requests.push(newRequest);
    res.status(201)
    .json({
      status: 'created',
      message: 'Success'
    })
  }
  

}



module.exports = UserRequestHandler;
