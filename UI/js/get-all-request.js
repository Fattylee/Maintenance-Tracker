const getRequest = (eventObj) => {
    eventObj.preventDefault();
       
       let  token = localStorage.getItem('token');
  
        fetch('/api/v1/users/requests', {
            method: 'GET',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-type': 'application/json',
                'Authorization': token
            }
        })
        .then((res) => res.json())
        .then((data) => {
          console.log( data);
          let markup = '';
  
          data.userRequests.forEach(request => {
  
              
            const [year, month, day] = request.date.split('T')[0].split('-');
            const date = day+'/'+month+'/'+year;
  
            markup += `
            <div class="repair-log">
            <ul>
                <li><span>Title:</span> ${request.requesttype}</li>
                <li><span>Description:</span> ${request.description}</li>
                <li><span>Date:</span> ${date}</li>
                <li><span>Status:</span> <span class="success">${request.status}</span></li>
            </ul>
            </div>
            `;
          });
  
          document.querySelector('.all-request').innerHTML = markup;
  
        })
        .catch(err => {
            console.log('from catch', err);
        });
    }
  
    document.addEventListener('DOMContentLoaded', getRequest);