import validator from 'validator';
import users from './../../dummyData/loggedinUsersRequest';

class requestValidator{

  static getARequest(req,res,next){
    const requestId = req.params.id;
    const request = users.find(request => request.id === parseInt(requestId));

    if (!request) {
      return res.status(404)
      .json({
        status: "Not found",
        message: 'Invalid request id',
      });
    }
    req.body.request = request;
    return next();
  }//End getARequest
  
  static modifyRequest(req,res,next){
    const requestId = req.params.id;
    const request = users.find(request => request.id === parseInt(requestId));

    if (!request) {
      return res.status(404)
      .json({
        status: "Not found",
        message: 'Invalid request id',
      });
    }

    let { name, email,requestType, description } = req.body;

    if (name === undefined ){
      return res.status(404)
      .json({
        status: 'Not found',
        message: 'No input was received for name',
      });
    }
    if (validator.isEmpty(name)) {
      return res.status(404)
        .json({
          status: 'Not found',
          message: 'name cannot be empty',
        });
    }
     name = validator.trim(name);

    if (!validator.isLength(name,{ min: 3, max: 30 })) {
      return res.status(406)
        .json({
          status: 'Not accepted',
          message: 'name should be 3 to 30 characters long',
        });
    }
    
    if (email === undefined ){
      return res.status(404)
      .json({
        status: 'Not found',
        message: 'No input was received for email',
      });
    }
    if (!validator.isEmail(email)) {
      return res.status(406)
        .json({
          status: 'Not accepted',
          message: 'please enter a valid email format',
        });
    }
     email = validator.trim(email);
     email = email.toLowerCase();

    if (requestType === undefined ){
      return res.status(404)
      .json({
        status: 'Not found',
        message: 'No input was received for requestType',
      });
    }
      
    if (requestType.toLowerCase() !== "maintenance" && requestType.toLowerCase() !== "repair") {
      return res.status(400)
        .json({
          status: 'Bad request',
          message: 'requestType can only be maintenance / repair',
        });
    }

    if (description === undefined ){
      return res.status(404)
      .json({
        status: 'Not found',
        message: 'No input was received for description',
      });
    }
    if (validator.isEmpty(description)) {
      return res.status(404)
        .json({
          status: 'Not found',
          message: 'description cannot be empty',
        });
    }
     description = validator.trim(description);

    if (!validator.isLength(description,{ min: 10, max: 50 })) {
      return res.status(406)
        .json({
          status: 'Not accepted',
          message: 'description should be 10 to 50 characters long',
        });
    }

    req.body.request = request;
    return next();
  }//End modifyRequest
    
  
  static postARequest(req, res, next) {
    let { name, email,requestType, description } = req.body;

    if (name === undefined ){
      return res.status(404)
      .json({
        status: 'Not found',
        message: 'No input was received for name',
      });
    }
    if (validator.isEmpty(name)) {
      return res.status(404)
        .json({
          status: 'Not found',
          message: 'name cannot be empty',
        });
    }
     name = validator.trim(name);

    if (!validator.isLength(name,{ min: 3, max: 30 })) {
      return res.status(406)
        .json({
          status: 'Not accepted',
          message: 'name should be 3 to 30 characters long',
        });
    }
    
    if (email === undefined ){
      return res.status(404)
      .json({
        status: 'Not found',
        message: 'No input was received for email',
      });
    }
     email = validator.trim(email);
     email = email.toLowerCase();

    if (requestType === undefined ){
      return res.status(404)
      .json({
        status: 'Not found',
        message: 'No input was received for requestType',
      });
    }
      
    if (requestType.toLowerCase() !== "maintenance" && requestType.toLowerCase() !== "repair") {
      return res.status(400)
        .json({
          status: 'Bad request',
          message: 'requestType can only be maintenance / repair',
        });
    }

    if (description === undefined ){
      return res.status(404)
      .json({
        status: 'Not found',
        message: 'No input was received for description',
      });
    }
    if (validator.isEmpty(description)) {
      return res.status(404)
        .json({
          status: 'Not found',
          message: 'description cannot be empty',
        });
    }
     description = validator.trim(description);

    if (!validator.isLength(description,{ min: 10, max: 50 })) {
      return res.status(406)
        .json({
          status: 'Not accepted',
          message: 'description should be 10 to 50 characters long',
        });
    }
    req.body.email = email;
    return next();
  }//End postARequest

}

export default requestValidator;
