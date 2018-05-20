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

  static modifyRequest(req,res) {
    const request = requests.find(requestItem => requestItem.id === parseInt(req.params.id, 10));
    if (request) {
      request.username = req.body.username;
      request.description = req.body.description;
      request.requestType = req.body.requestType;
      res.status(200)
      .json({
        request,
        status: 'success',
        message: 'modified successfully',
      });
    }
  }
  

}



module.exports = UserRequestHandler;
