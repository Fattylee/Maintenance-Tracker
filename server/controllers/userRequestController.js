import jwt from 'jsonwebtoken';
import pool from './db';
import table from './createTable';
import { request } from 'http';




class UserRequestHandler {

  static adminResolve(req, res){
    jwt.verify(req.token, 'secreteKey', (err, authData) => {

      if (err) {
        res.status(403)
          .json({
            message: 'invalid token'
          });
      }
      else {

        const role = authData.user[0].role;
        if(role !== 'admin'){
          return res.status(406)
          .json({
            message: 'you are not an admin'
          });
        }

        const  requestId = Number(req.params.requestId);

        if(!requestId){
          return res.status(403)
          .json({
            message: 'not a valid requestID number format'
          });
        }

        let sql = 'select * from requests where request_id = $1';
        let params = [req.params.requestId];

        pool.query(sql, params)
          .then((result) => {
            if (!result.rows.length) {
              return res.status(404)
                .json({
                  message: 'invalid requestID'
                });
            }
            if (result.rows[0].status === 'disapproved') {
              return res.status(406)
                .json({
                  message: 'can not resolve a disapproved request'
                });
            }
           
            sql = 'update requests set status = $1 where request_id = $2';
            params = ['resolved', req.params.requestId];
            pool.query(sql, params)
              .then((success) => {

                res.status(200)
                  .json({
                    message: 'request resloved!'
                  });
              })
              .catch((error) => {
                res.status(500)
                  .json({
                    message: error.message
                  });
              });//End inner Then
          })//End first Then
          .catch((error) => {
            res.status(500)
              .json({
                message: error.message
              });
          });//End outter Then
      }//End else
    }); //End verify   

  }//End adminResolve


  static adminDisapprove(req, res){
    jwt.verify(req.token, 'secreteKey', (err, authData) => {

      if (err) {
        res.status(403)
          .json({
            message: 'invalid token'
          });
      }
      else {

        const role = authData.user[0].role;
        if(role !== 'admin'){
          return res.status(403)
          .json({
            message: 'you are not an admin'
          });
        }

        const  requestId = Number(req.params.requestId);

        if(!requestId){
          return res.status(403)
          .json({
            message: 'not a valid requestID number format'
          });
        }
        
        let sql = 'select * from requests where request_id = $1';
        let params = [req.params.requestId];

        pool.query(sql, params)
          .then((result) => {
            if (!result.rows.length) {
              return res.status(404)
                .json({
                  message: 'invalid requestID'
                });
            }

            if(result.rows[0].status ==='resolved'){
              return res.status(406)
                .json({
                  message: 'can not disapprove a resolved request'
                });
            }
           
            sql = 'update requests set status = $1 where request_id = $2';
            params = ['disapproved', req.params.requestId];
            pool.query(sql, params)
              .then((success) => {

                res.status(200)
                  .json({
                    message: 'request dispproved!'
                  });
              })
              .catch((error) => {
                res.status(500)
                  .json({
                    message: error.message
                  });
              });//End inner Then
          })//End first Then
          .catch((error) => {
            res.status(500)
              .json({
                message: error.message
              });
          });//End outter Then
      }//End else
    }); //End verify   

  }//End adminDisapprove

  static adminApprove(req, res) {

    jwt.verify(req.token, 'secreteKey', (err, authData) => {

      if (err) {
        res.status(403)
          .json({
            message: 'invalid token'
          });
      }
      else {

        const role = authData.user[0].role;
        if(role !== 'admin'){
          return res.status(403)
          .json({
            message: 'you are not an admin'
          });
        }
        const  requestId = Number(req.params.requestId);

        if(!requestId){
          return res.status(403)
          .json({
            message: 'not a valid requestID number format'
          });
        }

        let sql = 'select * from requests where request_id = $1';
        let params = [req.params.requestId];

        pool.query(sql, params)
          .then((result) => {
            if (!result.rows.length) {
              return res.status(404)
                .json({
                  message: 'invalid requestID'
                });
            }
            if (result.rows[0].status === 'resolved') {
              return res.status(406)
                .json({
                  message: 'request already resolved!'
                });
            }
            sql = 'update requests set status = $1 where request_id = $2';
            params = ['approved', req.params.requestId];
            pool.query(sql, params)
              .then((success) => {

                res.status(200)
                  .json({
                    message: 'request approved!'
                  });
              })
              .catch((error) => {
                res.status(500)
                  .json({
                    message: error.message
                  });
              });//End inner Then
          })//End first Then
          .catch((error) => {
            res.status(500)
              .json({
                message: error.message
              });
          });//End outter Then
      }//End else
    }); //End verify   

  }//End adminApprove

  static getAllRequestAdmin(req, res) {
    jwt.verify(req.token, 'secreteKey', (err, authData) => {

      if (err) {
        res.status(403)
          .json({
            message: 'invalid token'
          });
      }
      else {
        const role = authData.user[0].role;
        if(role !== 'admin'){
          return res.status(403)
          .json({
            message: 'you are not an admin'
          });
        }
        const sql = 'select * from requests ';
        pool.query(sql)
          .then((result) => {
            const userRequests = result.rows;
            res.status(200)
              .json({
                userRequests,
                message: 'all requests successfully served'
              });
          })
          .catch((error) => {
            res.status(500)
              .json({
                message: error.message
              });
          });
      }//end else
    });


  }//End getAllRequestAdmin

  static postARequest(req, res) {
    jwt.verify(req.token, 'secreteKey', (err, authData) => {

      if (err) {
        res.status(403)
          .json({
            message: 'invalid token'
          });
      }
      else {

        req.body.name = authData.user[0].name;
        req.body.email = authData.user[0].email;
        req.body.owner_id = authData.user[0].user_id;

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
          .then((postResult) => {
           
            const sql = 'select * from requests order by request_id desc limit 1';
            pool.query(sql)
              .then((result) => {
               const request = result.rows[0];
              return res.status(201)
              .json({
                request,
                message: `${request.name}, your request was successful!`,
              });
                
              })//End get result Den
              .catch((error) => {
                res.status(500)
                  .json({
                    message: error.message
                  });
              });

          })//End postResult Then
          .catch((err) => {
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

      if (err) {
        res.status(403)
          .json({
            message: 'invalid token'
          });
      }
      else {

        const sql = 'select * from requests where owner_id = $1 order by request_id desc';
        const params = [authData.user[0].user_id]
        pool.query(sql, params)
          .then((result) => {
            
            const userRequests = result.rows;
            res.status(200)
              .json({
                userRequests: userRequests.length? userRequests: 'your request list is empty, create a request',
                message: 'all requests successfully served'
              });
          })
          .catch((error) => {
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

      if (err) {
        res.status(403)
          .json({
            message: 'invalid token'
          });
      }
      else {

        const sql = 'select * from requests where owner_id = $1';
        const params = [authData.user[0].user_id]
        pool.query(sql, params)
          .then((result) => {
            const userRequests = result.rows;

            const requestId = req.params.id;
            const request = userRequests.find(request => request.request_id === parseInt(requestId));
            if (request) {
              res.status(200)
                .json({
                  request,
                  message: 'request successfully served'
                });
            }
            else {
              res.status(404)
                .json({
                  message: 'invalid request ID'
                });
            }
          })
          .catch((error) => {
            res.status(500)
              .json({
                message: error.message
              });
          });
      }//end else
    });

  }//End getARequest

  static modifyRequest(req, res) {

    jwt.verify(req.token, 'secreteKey', (err, authData) => {

      if (err) {
        res.status(403)
          .json({
            message: 'invalid token'
          });
      }
      else {

        const sql = 'select * from requests where owner_id = $1';
        const params = [authData.user[0].user_id]
        pool.query(sql, params)
          .then((result) => {
            const userRequests = result.rows;

            const requestId = req.params.id;
            const request = userRequests.find(request => request.request_id === parseInt(requestId));
            //for a valid requstID
            if (request) {
              req.body.name = authData.user[0].name;
              
              if(request.status !== 'pending'){
                return res.json({
                  message: 'can\'t modify request at this stage, it\'s no longer pending'
                });
              }
              const sql = 'update requests set  requesttype = $1, description = $2 where request_id = $3';
              const params = [
                req.body.requestType,
                req.body.description,
                req.params.id
              ];

              pool.query(sql, params)
                .then((result) => {
                  res.status(201)
                    .json({
                      message: `${req.body.name}, your request was successfully modified!`
                    });

                })
                .catch((err) => {
                  res.status(500)
                    .json({
                      dev: 'database error',
                      message: err.message
                    })
                });

            }
            else {
              res.status(404)
                .json({
                  message: 'invalid request ID'
                });
            }
          })
          .catch((error) => {
            res.status(500)
              .json({
                message: error.message
              });
          });
      }//end else
    });

  }//End modifyRequest

  static createTable(req, res) {
    pool.query(table.dateColumn)
    .then((result)=>{
      
      return res.status(201)
      .json({
        result,
        message: 'date column added!'
      })

    })
    .catch((err)=>{
      return res.status(500)
      .json({
        message: 'from database '+ err
      })

    });
    
  }//End createTable

  static home(req, res, next) {
    res.status(200)
      .json({
        message: `Maintenance Tracker App is an application that provides users with the ability to reach out to operations or repairs department regarding repair or maintenance requests and monitor the status of their request.. Have Fun!`,
      });
  }//End home

  static all(req, res, next) {

    return res.status(404)
      .send("<h1>Oops!, The page you're looking for doesn't exist</h1>");
  }//End all

  static validateToken(req, res) {

    jwt.verify(req.token, 'secreteKey', (err, authData) => {

      if (err) {
        res.status(403)
          .json({
            message: 'invalid token'
          });
      }
    });
  }//End validateToken


}//UserRequestHandler



export default UserRequestHandler;
