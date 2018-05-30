// import requests from './../../dummyData/loggedinUsersRequest';
import pg from 'pg';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();



class UserRequestHandler {

  static postARequest(req, res) {
    jwt.verify(req.token, 'secreteKey', (err, authData) => {
      
      if(err) {
        res.status(403)
        .json({
          message: 'invalid token'
        });
      } 
      else {
        
          req.body.name = authData.user[0].name;
          req.body.email = authData.user[0].email;
          req.body.owner_id = authData.user[0].user_id;

          const Pool = pg.Pool;
          const pool = new Pool();
          const sql = 'insert into requests (name, email, requesttype, description, owner_id) \
          values ($1, $2, $3, $4, $5)';
      
          const params = [
            req.body.name, 
            req.body.email, 
            req.body.requestType, 
            req.body.description, 
            req.body.owner_id
          ];
      
          pool.query(sql, params)
          .then((result)=>{
            res.status(201)
            .json({
              message:`${req.body.name}, your request was successful!`,
            });

          })
          .catch((err)=>{
            res.status(500)
            .json({
              dev: 'database error',
              message: err.message
            })
          });
         
      }

    });//End jwt verify

  }//End postARequest





  static getAllRequest(req, res) {

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
          //console.log(result);
          const userRequests = result.rows;
          res.status(200)
          .json({
            userRequests,
            message: 'all requests successfully served'
          });
        })
        .catch((error)=>{
          res.status(500)
          .json({
            message: error.message
          });
        });
      }//end else
    });

  }//End getAllRequest

  static getARequest(req, res) {
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
              message: 'request successfully served'
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
    
  }//End getARequest

  static modifyRequest(req, res) {
    // const request = req.body.request;
    // request.name = req.body.name;
    // request.email = req.body.email;
    // request.requestType = req.body.requestType;
    // request.description = req.body.description;
      
    //   res.status(205)
    //     .json({
    //       request,
    //       message: 'modified successfully',
    //     });

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
          //console.log('ready to modify data');
          req.body.name = authData.user[0].name;
          req.body.email = authData.user[0].email;
          req.body.owner_id = authData.user[0].user_id;

          const sql = 'UPDATE requests SET requesttype = $1, description= $2 WHERE id = $3';
          const params = [
            req.body.requestType, 
            req.body.description, 
            requestId
          ];
      
          pool.query(sql, params)
          .then((result)=>{
            console.log('from modified: result',result);
            res.status(201)
            .json({
              message:`${req.body.name}, your request was successfully modified!`
            });

          })
          .catch((err)=>{
            res.status(500)
            .json({
              dev: 'database error',
              message: err.message
            })
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

    });//end jwt.verify
    

  }//End modifyRequest

  static home(req, res, next){
    res.status(200)
    .json({
      status: 'success',
      message: 'Welcome to fattylee Maintenance Tracker App. Have Fun!',
    });
  }//End home

  static all(req, res, next){
    
    return res.status(404)
    .send("<h1>Oops!, The page you're looking for doesn't exist</h1>");
  }//End all
  

}//UserRequestHandler



export default UserRequestHandler;
