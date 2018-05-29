import validator from 'validator';
import pg from 'pg';
import dotenv from 'dotenv';
dotenv.config();

class userValidator{

  static signupInput(req, res, next) {
    let { name, email, username, password } = req.body;

    if (name === undefined ){
      return res.status(400)
      .json({
        message: 'No input was received for name',
      });
    }

    if (validator.isEmpty(name)) {
      return res.status(406)
        .json({
          message: 'name cannot be empty',
        });
    }

    name = validator.trim(name);

    if (!validator.isLength(name,{ min: 2, max: 30 })) {
      return res.status(406)
        .json({
          message: 'name should be 2 to 30 characters long',
        });
    }

    if (!(validator.isAlpha(name) || validator.contains(name,' '))) {
      return res.status(406)
        .json({
          message: 'name can only contains alphanumeric characters',
        });
    }
    if (email === undefined ){
      return res.status(400)
      .json({
        message: 'No input was received for email',
      });
    }

    if (validator.isEmpty(email)) {
      return res.status(406)
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

    if (!validator.isLength(email,{ min: 10, max: 50 })) {
      return res.status(406)
        .json({
          message: 'email should be 10 to 50 characters long',
        });
    }

    const pool = new pg.Pool();
    pool.query('select email from users where email = $1', [email.toLowerCase()])
    .then((result)=>{
      if (result.rowCount !== 0){
        return res.status(409)
        .json({
          message: 'email already exist, login or sign up with another email',
        });
      }

      if (username === undefined ){
        return res.status(406)
        .json({
          message: 'no input was received for username',
        });
      }
      if (validator.isEmpty(username)) {
        return res.status(406)
          .json({
            message: 'username cannot be empty',
          });
      }

      username = validator.trim(username);
      username = username.toLowerCase();

      if (!validator.isLength(username,{ min: 2, max: 15 })) {
        return res.status(406)
          .json({
            message: 'username should be 2 to 15 characters long',
          });
      }

      if (validator.contains(username," ")) {
        return res.status(406)
          .json({
            message: 'username should not contain whitespace',
          });
      }

      if (!(validator.isAlphanumeric(username))) {
        return res.status(406)
          .json({
            message: 'username can only contains a-zA-Z0-9',
          });
      }
      
        pool.query('select username from users where username = $1', [username.toLowerCase()])
      .then((result)=>{
        if (result.rowCount !== 0){
          return res.status(409)
          .json({
            message: 'username already exist, login to your account',
          });
        }

        if (password === undefined ){
          return res.status(406)
          .json({
            message: 'no input was received for password',
          });
        }

        if (validator.isEmpty(password)) {
          return res.status(406)
            .json({
              message: 'password cannot be empty',
            });
        }

        password = validator.trim(password);

        if (!validator.isLength(password,{ min: 4, max: 16 })) {
          return res.status(406)
            .json({
              message: 'password should be 4 to 16 characters long',
            });
        }
        next();
      })
        .catch((errror)=>{
          console.log('Error',errror);
        });

      
    })    
    .catch((errror)=>{
      console.log('Error',errror);
    });

  }
  
}
export default userValidator;

