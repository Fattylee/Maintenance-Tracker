const signUp = (eventObj) => {
  eventObj.preventDefault();

  console.log("from onsubmit");
  let name = document.getElementById('name').value.trim(),
    email = document.getElementById('email').value.trim().toLowerCase(),
    username = document.getElementById('username').value.trim().toLowerCase(),
    password = document.getElementById('password').value.trim();

  fetch('/api/v1/auth/signup', {
    method: 'POST',
    headers: {
      'Accept': 'application/json, text/plain, */*',
      'Content-type': 'application/json'
    },
    body: JSON.stringify({ name, email, username, password })
  })
    .then((res) => res.json())
    .then((data) => {
      console.log('from signup', data);
      let message = '';

      message = 'No input was received for name';
      if(data.message === message){
        UI.showAlert(data.message, 'red');
        return;
      }

      message = 'name cannot be empty';
      if(data.message === message){
        UI.showAlert(data.message, 'red');
        return;
      }

      message = 'name should be 2 to 30 characters longt';
      if(data.message === message){
        UI.showAlert(data.message, 'red');
        return;
      }
      message = 'name can only contains alphanumeric characters';
      if(data.message === message){
        UI.showAlert(data.message, 'red');
        return;
      }
      
      message = 'No input was received for email';
      if(data.message === message){
        UI.showAlert(data.message, 'red');
        return;
      }
      message = 'email cannot be empty';
      if(data.message === message){
        UI.showAlert(data.message, 'red');
        return;
      }
      message = 'please enter a valid email format';
      if(data.message === message){
        UI.showAlert(data.message, 'red');
        return;
      }
      message = 'email should be 10 to 50 characters long';
      if(data.message === message){
        UI.showAlert(data.message, 'red');
        return;
      }
      message = 'email already exist, login or sign up with another email';
      if(data.message === message){
        UI.showAlert(data.message, 'red');
        return;
      }
      message = 'no input was received for username';
      if(data.message === message){
        UI.showAlert(data.message, 'red');
        return;
      }

      message = 'username cannot be empty';
      if(data.message === message){
        UI.showAlert(data.message, 'red');
        return;
      }
      message = 'username should be 2 to 15 characters long';
      if(data.message === message){
        UI.showAlert(data.message, 'red');
        return;
      }

      message = 'username should not contain whitespace';
      if(data.message === message){
        UI.showAlert(data.message, 'red');
        return;
      }
      message = 'username can only contains a-zA-Z0-9';
      if(data.message === message){
        UI.showAlert(data.message, 'red');
        return;
      }
      message = 'username already exist, login to your account';
      if(data.message === message){
        UI.showAlert(data.message, 'red');
        return;
      }

      message = 'no input was received for password';
      if(data.message === message){
        UI.showAlert(data.message, 'red');
        return;
      }

      message = 'password cannot be empty';
      if(data.message === message){
        UI.showAlert(data.message, 'red');
        return;
      }

      message = 'password should be 4 to 16 characters long';
      if(data.message === message){
        UI.showAlert(data.message, 'red');
        return;
      }
      message = 'password should not contains whitespace';
      if(data.message === message){
        UI.showAlert(data.message, 'red');
        return;
      }
      
      
      message = `${name}, your signup was successful`;
      if (data.message === message ) {
        UI.showAlert(data.message,'green');
      } 
    })
    .catch(err => {
      console.log('from catch', err);
    });
}

document.getElementById('signupForm').addEventListener('submit', signUp);