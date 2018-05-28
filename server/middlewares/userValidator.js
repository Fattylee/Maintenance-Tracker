import validator from 'validator';
import users from './../../dummyData/userAuth';

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
    next();
  }
  
}
export default userValidator;

