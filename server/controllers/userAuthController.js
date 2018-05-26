import users from './../../dummyData/userAuth';


class UserAuthHandler{

  static signupUser(req, res) {


    
    const newUser = {
      id: users.length + 1,
      name: req.body.name,
      email: req.body.email,
      username: req.body.username,
      password: req.body.password,
    }
    users.push(newUser);
    res.status(201)
    .json({
      newUser,
      status: 'created',
      message: 'Success'
    })
  } 
  
 
}

export default UserAuthHandler;
