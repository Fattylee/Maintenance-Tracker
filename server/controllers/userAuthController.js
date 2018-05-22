import users from './../../dummyData/userAuth';


class UserAuthHandler{

  static signupUser(req, res) {
    const {
      name, email,username, password
    } = req.body;
    const id = users.length + 1;
    const newUser = {
      id,
      name,
      email:email.toLowerCase(),
      username:username.toLowerCase(),
      password
    };
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
