import validator from 'validator';
import users from './../../dummyData/loggedinUsersRequest';

class requestValidator{

  static postARequest(req, res, next) {
    let { name, email, username, password } = req.body;

    if (name === undefined ){
      return res.status(404)
      .json({
        status: 'Not found',
        message: 'No input was received for name',
      });
    }
    if (validator.isEmpty(name)) {
      return res.status(404)
        .json({
          status: 'Not found',
          message: 'name cannot be empty',
        });
    }
     name = validator.trim(name);

    if (!validator.isLength(name,{ min: 3, max: 30 })) {
      return res.status(406)
        .json({
          status: 'Not accepted',
          message: 'name should be 3 to 30 characters long',
        });
    }
    if (email === undefined ){
      return res.status(404)
      .json({
        status: 'Not found',
        message: 'No input was received for email',
      });
    }
    if (validator.isEmpty(email)) {
      return res.status(404)
        .json({
          status: 'Not found',
          message: 'email cannot be empty',
        });
    }
    if (!validator.isEmail(email)) {
      return res.status(406)
        .json({
          status: 'Not accepted',
          message: 'please enter a valid email format',
        });
    }