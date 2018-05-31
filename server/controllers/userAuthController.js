import pg from 'pg';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

class UserAuthHandler{

  static signupUser(req, res) {

  const Pool = pg.Pool;
  const pool = new Pool();

  const sql = 'insert into users (name, email, username, password) values ($1, $2, $3, $4)';
    const params = [
      req.body.name,
      req.body.email, 
      req.body.username,
      req.body.password
    ];
  pool.query(sql, params)
  .then((result)=>{
    res.status(201)
    .json({
      message: `${req.body.name}, your signup was successful`
    });
  })
  .catch((error)=>{
    res.json({
      error,
      message: 'something went wrong'
    });
  });

  }//End signupUser

  static signinUser(req, res) {

    const Pool = pg.Pool;
    const pool = new Pool();
    const sql = 'select * from users where username = $1 and password = $2';

    const params = [req.body.username, req.body.password];
  
    pool.query(sql, params)
    .then((result)=>{

      if (result.rowCount !== 0) {
        const user = result.rows;  //array of objects
        return jwt.sign({ user }, 'secreteKey', { expiresIn: '1200s' }, (err, token) => {
            res.status(200)
            .json({
              message: `Hello ${req.body.username}, your signin was successful`,
              token
          });
        });
      }
      res.status(404)
      .json({
        message: 'Incorrect username or password'
      })
    })
    .catch((error)=>{
      res.json({
        message: error.message
      });
    });
    
  }//End signinUser
 
}

export default UserAuthHandler;
