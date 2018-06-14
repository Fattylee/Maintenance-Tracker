// window. addEventListener("load", function(){
// console.log("working ");
// });

const makeRequest = (eventObj) => {
  eventObj.preventDefault();
      
  const name = document.getElementById('name').value.trim().toLowerCase(),
  email = document.getElementById('email').value.trim(),
  requestType = document.getElementById('request-type').value.trim(),
  description = document.getElementById('description').value.trim();


      console.log(requestType);
     

     
     let  token = localStorage.getItem('token');

      fetch('/api/v1/users/requests', {
          method: 'POST',
          headers: {
              'Accept': 'application/json, text/plain, */*',
              'Content-type': 'application/json',
              'Authorization': token
          },
          body: JSON.stringify({ requestType, description })
      })
      .then((res) => res.json())
      .then((data) => {

        console.log('from server', data);
        let message = '';

        message = 'No input was received for requestType';
        if(data.message === message){
          UI.showAlert(data.message, 'red');
          return;
        }
        message = 'requestType can only be maintenance / repair';
        if(data.message === message){
          UI.showAlert(data.message, 'red');
          return;
        }
        message = 'No input was received for description';
        if(data.message === message){
          UI.showAlert(data.message, 'red');
          return;
        }
        message = 'description cannot be empty';
        if(data.message === message){
          UI.showAlert(data.message, 'red');
          return;
        }
        message = 'description should be 10 to 50 characters long';
        if(data.message === message){
          UI.showAlert(data.message, 'red');
          return;
        }
        message = 'no token recieved, please supply a token';
        if(data.message === message){
          UI.showAlert(data.message, 'red');
          return;
        }
        message = 'invalid token';
        if(data.message === message){
          UI.showAlert('please login to your account', 'red');
          return;
        }
        message = `${name}, your request was successful!`;
        if(data.message === message){
          UI.showAlert(data.message, 'green');
          return;
        }
      })
      .catch(err => {

          console.log('from catch', err);
      });
  }

  document.getElementById('make-request').addEventListener('submit', makeRequest);