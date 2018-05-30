import validator from 'validator';
import users from './../../dummyData/loggedinUsersRequest';
import pg from 'pg';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

class requestValidator{

  static getARequest(req,res,next){
    // const requestId = req.params.id;
    // const request = users.find(request => request.id === parseInt(requestId));

    jwt.verify(req.token, 'secreteKey', (err, authData) => {
      
      if(err) {
        res.status(403)
        .json({
          message: 'invalid token'
        });
      } 
      else {

        const Pool = pg.Pool;
        const pool = new Pool();
      
        const sql = 'select * from requests where owner_id = $1';
        const params = [authData.user[0].user_id]
        pool.query(sql, params)
        .then((result)=>{
          const userRequests = result.rows;

          const requestId = req.params.id;
          const request = userRequests.find(request => request.id === parseInt(requestId));
          if(request){
            res.status(200)
            .json({
              request,
              message: 'all requests successfully served'
            });
          }
          else{
            res.status(404)
            .json({
              message: 'invalid request ID'
            });
        }
        })
        .catch((error)=>{
          res.status(500)
          .json({
            message: error.message
          });
        });
      }//end else
    });
    //return next();
  }//End getARequest
  
  static modifyRequest(req, res, next){
    const requestId = req.params.id;
    const request = users.find(request => request.id === parseInt(requestId));

    if (!request) {
      return res.status(404)
      .json({
        message: 'Invalid request id',
      });
    }

    let { name, email,requestType, description } = req.body;

    if (name === undefined ){
      return res.status(404)
      .json({
        message: 'No input was received for name',
      });
    }
    if (validator.isEmpty(name)) {
      return res.status(404)
        .json({
          message: 'name cannot be empty',
        });
    }
     name = validator.trim(name);

    if (!validator.isLength(name,{ min: 3, max: 30 })) {
      return res.status(406)
        .json({
          message: 'name should be 3 to 30 characters long',
        });
    }

    if (!(validator.isAlpha(name) ||validator.contains(name,' '))) {
      return res.status(406)
        .json({
          message: 'name can only contains alphanumeric characters',
        });
    }
    
    if (email === undefined ){
      return res.status(404)
      .json({
        message: 'No input was received for email',
      });
    }
    if (email === '' ){
      return res.status(404)
      .json({
        message: 'email cannot be empty',
      });
    }
    if (!validator.isEmail(email)) {
      return res.status(406)
        .json({
          message: 'please enter a valid email format',
        });
    }
     email = validator.trim(email);
     email = email.toLowerCase();

    if (requestType === undefined ){
      return res.status(404)
      .json({
        message: 'No input was received for requestType',
      });
    }
      
    if (requestType.toLowerCase() !== "maintenance" && requestType.toLowerCase() !== "repair") {
      return res.status(400)
        .json({
          message: 'requestType can only be maintenance / repair',
        });
    }

    if (description === undefined ){
      return res.status(404)
      .json({
        message: 'No input was received for description',
      });
    }
    if (validator.isEmpty(description)) {
      return res.status(404)
        .json({
          message: 'description cannot be empty',
        });
    }
     description = validator.trim(description);

    if (!validator.isLength(description,{ min: 10, max: 50 })) {
      return res.status(406)
        .json({
          message: 'description should be 10 to 50 characters long',
        });
    }

    req.body.request = request;
    return next();
  }//End modifyRequest
    
  
  static postARequest(req, res, next) {
    let { name, email, requestType, description } = req.body;

    if (requestType === undefined ){
      return res.status(404)
      .json({
        message: 'No input was received for requestType',
      });
    }
      
    if (requestType.toLowerCase() !== "maintenance" && requestType.toLowerCase() !== "repair") {
      return res.status(400)
        .json({
          message: 'requestType can only be maintenance / repair',
        });
    }

    if (description === undefined ){
      return res.status(404)
      .json({
        message: 'No input was received for description',
      });
    }
    if (validator.isEmpty(description)) {
      return res.status(404)
        .json({
          message: 'description cannot be empty',
        });
    }
     description = validator.trim(description);

    if (!validator.isLength(description,{ min: 10, max: 50 })) {
      return res.status(406)
        .json({
          message: 'description should be 10 to 50 characters long',
        });
    }
    next();
  }//End postARequest

}

export default requestValidator;
