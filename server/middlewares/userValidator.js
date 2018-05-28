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
    
  }
  
}
export default userValidator;

