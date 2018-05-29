const pg = require('pg');
const express = require('express');

const bodyParser  = require('body-parser');
require('dotenv').config();

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.post('/api/v1/auth/signup',(req, res, next)=>{

 // console.log('response',req.body);

  //res.send(req.body);

  // const Client = pg.Client;
  // const client = new Client();

  const Pool = pg.Pool;
  const pool = new Pool();

  //console.log("b4 client connect");

//   client.connect()
//   .then(()=>{
//     //console.log('connection complete');
  

//     const sql = 'insert into users (name, email, username, password) values ($1, $2, $3, $4)';
//     const params = [
//       req.body.name,
//       req.body.email,
//       req.body.username,
//       req.body.password
//     ];
//     console.log('connection complete6667');
//     return client.query(sql, params);
//     console.log('connection complete');
//   })
  // .then((result)=>{
  //   console.log('result?', result);
  //   res.json({
  //     message: `${req.body.name}, your signup was successful`
  //   });
  // })
  // .catch((error)=>{
  //   res.json({
  //     error: error,
  //     message: 'something went wrong'
  //   });
  // });
  
  let { name, email, username, password } = req.body;

  const sql = 'insert into users (name, email, username, password) values ($1, $2, $3, $4)';
  const params = [
    req.body.name,
    req.body.email,
    req.body.username,
    req.body.password
  ];
  //check for existing email address
  pool.query('select email from users where email = $1', [email.toLowerCase()])
  .then((result)=>{
    if (result.rowCount !== 0){
      return res.status(406)
      .json({
        message: 'email already exist, login or sign up with another email',
      });
    }
  
    })
      return pool.query(sql,params)
    .then((result)=>{
     // console.log('result?', result);
      res.json({
        message: `${req.body.name}, your signup was successful`
      });
    })
    .catch((error)=>{
      res.json({
        error: error,
        message: 'something went wrong'
      });
    });
 });

app.listen(3000, ()=>{
  console.log("server running on port ",process.env.PORT);
});


