//import users from './../../dummyData/userAuth';
import pg from 'pg';
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
 
}

export default UserAuthHandler;
