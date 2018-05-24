import validator from 'validator';
import users from './../../dummyData/userAuth';

class userValidator{

  static signupInput(req, res, next) {
    let { name, email, username, password } = req.body;

    if (name === undefined ){
      return res.status(400)
      .json({
        status: 'Bad request',
        message: 'No input was received for name',
      });
    }
    if (validator.isEmpty(name)) {
      return res.status(406)
        .json({
          status: 'Not acceptable',
          message: 'name cannot be empty',
        });
    }
     name = validator.trim(name);

    if (!validator.isLength(name,{ min: 3, max: 30 })) {
      return res.status(406)
        .json({
          status: 'Not acceptable',
          message: 'name should be 3 to 30 characters long',
        });
    }
    if (email === undefined ){
      return res.status(400)
      .json({
        status: 'Bad request',
        message: 'No input was received for email',
      });
    }
    if (validator.isEmpty(email)) {
      return res.status(406)
        .json({
          status: 'Not found',
          message: 'email cannot be empty',
        });
    }
    if (!validator.isEmail(email)) {
      return res.status(406)
        .json({
          status: 'Not acceptable',
          message: 'please enter a valid email format',
        });
    }
     email = validator.trim(email);
     email = email.toLowerCase();

    if (!validator.isLength(email,{ min: 10, max: 50 })) {
      return res.status(406)
        .json({
          status: 'Not acceptable',
          message: 'email should be 10 to 50 characters long',
        });
    }
    
    const authEmail = users.find(user => user.email === email);
    if(authEmail){
      return res.status(409)
      .json({
        status: 'Conflict',
        message: 'email already exist, login or sign up with another email',
      });
    }

    if (username === undefined ){
      return res.status(406)
      .json({
        status: 'Not acceptable',
        message: 'no input was received for username',
      });
    }
    if (validator.isEmpty(username)) {
      return res.status(406)
        .json({
          status: 'Not acceptable',
          message: 'username cannot be empty',
        });
    }
     username = validator.trim(username);
     username = username.toLowerCase();

    if (!validator.isLength(username,{ min: 2, max: 15 })) {
      return res.status(406)
        .json({
          status: 'Not acceptable',
          message: 'username should be 2 to 15 characters long',
        });
    }
    if (validator.contains(username," ")) {
      return res.status(406)
        .json({
          status: 'Not acceptable',
          message: 'username should not contain whitespace',
        });
    }
    const authUsername = users.find(user => user.username === username);
    if(authUsername){
      return res.status(409)
      .json({
        status: 'Conflict',
        message: 'username already exist, use another username or login to your account',
      });
    }

    if (password === undefined ){
      return res.status(406)
      .json({
        status: 'Not acceptable',
        message: 'no input was received for password',
      });
    }
    if (validator.isEmpty(password)) {
      return res.status(404)
        .json({
          status: 'Not found',
          message: 'password cannot be empty',
        });
    }
     password = validator.trim(password);

    if (!validator.isLength(password,{ min: 4, max: 16 })) {
      return res.status(406)
        .json({
          status: 'Not accepted',
          message: 'password should be 4 to 16 characters long',
        });
    }
    if (validator.contains(password," ")) {
      return res.status(406)
        .json({
          status: 'Not accepted',
          message: 'password should not contains whitespace',
        });
    }

    req.body.username = username;
    req.body.email = email;
    return next();
  }
  
}
export default userValidator;

