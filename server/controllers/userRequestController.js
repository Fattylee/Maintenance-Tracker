import requests from './../../dummyData/loggedinUsersRequest';


class UserRequestHandler {


  static getAllRequest(req, res) {
    res.status(200)
    .json({
      users: requests,
      message: 'successful request'
    });
  }

  static getARequest(req, res) {
    res.status(200)
    .json({
      request:req.body.request,
      status: 'ok',
      message: 'successful request'
    });
  }

  static postARequest(req, res) {
    const { name,email, requestType, description } = req.body;
    const id = requests[requests.length - 1].id + 1;

    const newRequest = Object.assign({id},req.body);
    requests.push(newRequest);
    res.status(201)
      .json({
        status: 'created',
        message: 'Success'
      });
  }

  static modifyRequest(req, res) {
    const request = req.body.request;
    request.name = req.body.name;
    request.email = req.body.email;
    request.requestType = req.body.requestType;
    request.description = req.body.description;
      
      res.status(205)
        .json({
          request,
          message: 'modified successfully',
        });
  }

  static home(req, res, next){
    res.status(200)
    .json({
      status: 'success',
      message: 'Welcome to fattylee Maintenance Tracker App. Have Fun!',
    });
  }
  static all(req, res, next){
    
    return res.status(404)
    .send("<h1>Oops!, The page you're looking for doesn't exist</h1>");
  }
  
}



export default UserRequestHandler;
