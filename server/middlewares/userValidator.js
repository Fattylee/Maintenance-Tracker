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
      next();
    })    
    .catch((errror)=>{
      console.log('Error',errror);
    });

  }
  
}
export default userValidator;

