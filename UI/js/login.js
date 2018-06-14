const signIn = (eventObj) => {
  eventObj.preventDefault();
      
      console.log("from onsubmit"); 
         let username = document.getElementById('username1').value,
          password = document.getElementById('password1').value;

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
          localStorage.setItem('token', data.token);
          console.log('ferom dis', data.token);
      })
      .catch(err => {
          console.log('from catch', err);
      });
  }

  document.getElementById('signin-form').addEventListener('submit', signIn);
 