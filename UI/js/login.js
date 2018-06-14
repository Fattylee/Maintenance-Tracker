const userLogin = (eventObj) => {
  eventObj.preventDefault();
         const username = document.getElementById('username1').value.trim().toLowerCase(),
             password = document.getElementById('password1').value.trim();

      fetch('/api/v1/auth/login', {
          method: 'POST',
          headers: {
              'Accept': 'application/json, text/plain, */*',
              'Content-type': 'application/json'
          },
          body: JSON.stringify({ username, password })
      })
      .then((res) => res.json())
      .then((data) => {

          let message = '';

          message = 'no input was received for username';
          if(data.message === message){
            UI.showAlert(data.message, 'red', true);
            return;
          }
          message = 'username cannot be empty';
          if(data.message === message){
            UI.showAlert(data.message, 'red', true);
            return;
          }
          message = 'username does NOT exist, signup for a new account';
          if(data.message === message){
            UI.showAlert(data.message, 'red', true);
            return;
          }
          message = 'no input was received for password';
          if(data.message === message){
            UI.showAlert(data.message, 'red', true);
            return;
          }
          message = 'password cannot be empty';
          if(data.message === message){
            UI.showAlert(data.message, 'red', true);
            return;
          }

          message = 'Incorrect password';
          if(data.message === message){
            UI.showAlert(data.message, 'red', true);
            return;
          }
          message = `Hello ${username}, your signin was successful`;
          if(data.message === message){
            UI.showAlert(data.message, 'green', true);
            
            localStorage.setItem('token', data.token);
            ;
          }
          
      })
      .catch(err => {
          console.log('from catch', err);
      });
  }

  document.getElementById('signin-form').addEventListener('submit', userLogin);
 