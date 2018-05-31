// import requests from './../../dummyData/loggedinUsersRequest';
import pg from 'pg';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();



class UserRequestHandler {

  static modifyRequestAdmin(req, res) {

    jwt.verify(req.token, 'secreteKey', (err, authData) => {

      if (err) {
        res.status(403)
          .json({
            message: 'invalid token'
          });
      }
      else {

        const Pool = pg.Pool;
        const pool = new Pool();

        let sql = 'select * from requests where request_id = $1';
        let params = [req.params.requestId];

        pool.query(sql, params)
          .then((result) => {
            if (!result.rows.length) {
              res.status(404)
                .json({
                  message: 'invalid requestID'
                });
            }
            sql = 'update requests set status = $1 where request_id = $2';
            params = ['approved', req.params.requestId];
            pool.query(sql, params)
              .then((success) => {

                res.status(200)
                  .json({
                    success

                  });

              })
              .catch((error) => {
                res.status(500)
                  .json({
                    message: 'from approve catch ' + error.message
                  });
              });//End inner Then
          })//End first Then
          .catch((error) => {
            res.status(500)
              .json({
                message: 'from approve catch ' + error.message
              });
          });//End outter Then
      }//End else
    }); //End verify   

  }//End modifyRequestAdmin

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
          return res.status(406)
          .json({
            message: 'you are not an admin'
          })
        }

        const Pool = pg.Pool;
        const pool = new Pool();

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
          .then((result) => {
            res.status(201)
              .json({
                message: `${req.body.name}, your request was successful!`,
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

        const Pool = pg.Pool;
        const pool = new Pool();

        const sql = 'select * from requests where owner_id = $1';
        const params = [authData.user[0].user_id]
        pool.query(sql, params)
          .then((result) => {
            //console.log(result);
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

        const Pool = pg.Pool;
        const pool = new Pool();

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

        const Pool = pg.Pool;
        const pool = new Pool();

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
             
              const Pool = pg.Pool;
              const pool = new Pool();
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

  static home(req, res, next) {
    res.status(200)
      .json({
        status: 'success',
        message: 'Welcome to fattylee Maintenance Tracker App. Have Fun!',
      });
  }//End home

  static all(req, res, next) {

    return res.status(404)
      .send("<h1>Oops!, The page you're looking for doesn't exist</h1>");
  }//End all


}//UserRequestHandler



export default UserRequestHandler;
