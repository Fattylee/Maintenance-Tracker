import requests from './../../dummyData/loggedinUsersRequest';


class UserRequestHandler {

  static getAllRequest(req, res) {
    res.send(requests);
  }

  static getARequest(req, res) {
    const requestId = req.params.id;
    const request = requests.find(request => request.id === parseInt(requestId));

    if (!request) {
      res.status(404);
      res.send('Invalid request id');
      return false;
    }

    res.send(request);
  }

  static postARequest(req, res) {
    const { name,email, requestType, description } = req.body;
    const id = requests[requests.length - 1].id + 1;
    const newRequest = {
      id,
      name,
      email,
      requestType,
      description,
    };
    requests.push(newRequest);
    res.status(201)
      .json({
        status: 'created',
        message: 'Success'
      });
  }

  static modifyRequest(req, res) {
    const request = requests.find(requestItem => requestItem.id === parseInt(req.params.id, 10));
    if (request) {
      request.name = req.body.name;
      request.email = req.body.email;
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



export default UserRequestHandler;
