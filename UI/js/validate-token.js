//alert('b4 page load');
const validateToken = () => {
  const requestType='maintenance',
        description = 'heloo there';

  let  token = localStorage.getItem('token');

      fetch('/api/v1/token', {
          method: 'GET',
          headers: {
              'Accept': 'application/json, text/plain, */*',
              'Content-type': 'application/json',
              'Authorization': token
          }
      })
      .then((res) => res.json())
      .then((data) => {
        console.log('from validate.js',data);
        let message = '';

        message = 'invalid token';
        if(data.message === message){
          location.assign('../unauthorized.html');
          return;
        }
      })
      .catch(err => {
          console.log('Error', err.message);
      });
  }

validateToken();