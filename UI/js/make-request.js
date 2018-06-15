// window. addEventListener("load", function(){
// console.log("working ");
// });

const makeRequest = (eventObj) => {
  eventObj.preventDefault();
     
  const requestType = document.getElementById('request-type').value,
  description = document.getElementById('description').value.trim();

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
        message = `${data.request.name}, your request was successful!`;
        if(data.message === message){
          UI.showAlert(data.message, 'green');

          //increase request-counter
          const requestCounter = document.querySelector('.request-counter');
          requestCounter.innerHTML = parseInt(requestCounter.innerHTML) + 1;
          return;
        }
      })
      .catch(err => {
          console.log('Error', err.message);
      });
  }

  document.getElementById('make-request').addEventListener('submit', makeRequest);