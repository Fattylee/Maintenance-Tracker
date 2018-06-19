const getRequest = (eventObj) => {
  eventObj.preventDefault();
     
     let  token = localStorage.getItem('token');

      fetch('/api/v1/requests', {
          method: 'GET',
          headers: {
              'Accept': 'application/json, text/plain, */*',
              'Content-type': 'application/json',
              'Authorization': token
          }
      })
      .then((res) => res.json())
      .then((data) => {
         
          let message = '';
          
          message = 'invalid token';
          if(data.message === message){
          UI.showAlert('Expired session, Plase login to view all request', 'red');

          setTimeout(()=> location.assign('../index.html'), 1500);
          return;
        }
        message = 'you are not an admin';
        if(data.message === message){
          location.assign('../unauthorized.html');
          return;
        }
        message = 'no request yet';
          if(data.message === message){
              UI.showAlert(data.message, 'blue', true);
              return;
          }

        message = 'all requests successfully served';
        if(data.message === message){
            let markup = '';

        data.userRequests.forEach(request => {
                        
          const [year, month, day] = request.date.split('T')[0].split('-');
          const date = day+'/'+month+'/'+year;

          markup += `
          <ul class='request'>
          <li><span>Title</span> ${request.requesttype}</li>
          <li><span>Name</span> ${request.name}</li>
          <li><span>Email</span> ${request.email}</li>
          <li><span>Description</span> ${request.description}</li>
          <li><span>Request ID</span> ${request.request_id}</li>
          <li><span>Date</span> ${date}</li>
          <li><span>Status</span> 
          <span class="${request.status === 'pending' ? 'pending': request.status === 'disapproved' ? 'critical': 'success'}">${request.status}</span>
          ${request.status === 'pending' ? `<button class='admin-btn admin-btn-approve' onclick = approveRequest(event)>approve</button>
          <button class='admin-btn admin-btn-disapprove' onclick = disapproveRequest(event)>disapprove</button>` : ''}
          ${ request.status === 'approved' ? `<button class='admin-btn admin-btn-approve' onclick = resolveRequest(event)>resolve</button>` : ''}
          
          </li>
         </ul>
          `;
        });

        document.querySelector('.all-request').innerHTML = markup;

         
        }
        
      })
      .catch(err => {
          console.log('from catch', err);
      });
  };

  document.addEventListener('DOMContentLoaded', getRequest);

  const approveRequest = (eventObj) =>{
      const [a, b, id] = eventObj.target.parentElement.previousElementSibling.previousElementSibling.textContent.split(' ');

      const answer = confirm('Are you sure that you want to approve this request with ID: '+ id+' ?');
      if(!answer) return; //abort approve

      //change status, add resolve button and delete approve and disapprove button from DOM
      eventObj.target.nextElementSibling.remove();
      eventObj.target.previousElementSibling.className = 'success';
      eventObj.target.previousElementSibling.innerHTML = 'approved';
      eventObj.target.innerHTML = 'resolve';
      eventObj.target.setAttribute('onclick','resolveRequest(event)');

      const token = localStorage.getItem('token');

      fetch('/api/v1/requests/'+ id +'/approve', {
          method: 'PUT',
          headers: {
              'Accept': 'application/json, text/plain, */*',
              'Authorization': token,
              'Content-type': 'application/json'
          }

      })
      .then( res => res.json())
      .then( data => {
          let message = '';

          message = 'invalid token';
          if(data.message === message){
          UI.showAlert('Expired session, Plase login to approve request', 'red');

          setTimeout(()=> location.assign('../index.html'), 1500);
          return;
          }

          message = 'request approved!';
          if(data.message === message){
              UI.showAlert(data.message, 'green');
          }

      })
      .catch( err => console.log('Error', err.message));
      
  };//End approveRequest


  const disapproveRequest = (eventObj) =>{
    const [a, b, id] = eventObj.target.parentElement.previousElementSibling.previousElementSibling.textContent.split(' ');

    const answer = confirm('Are you sure that you want to disapprove this request with ID: '+ id+' ?');
    if(!answer) return; //abort disapprove

    //change status, delete approve and disapprove button from DOM
    eventObj.target.previousElementSibling.remove();
    eventObj.target.previousElementSibling.className = 'critical';
    eventObj.target.previousElementSibling.innerHTML = 'disapproved';
    eventObj.target.remove();
    

    const token = localStorage.getItem('token');

    fetch('/api/v1/requests/'+ id +'/disapprove', {
        method: 'PUT',
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Authorization': token,
            'Content-type': 'application/json'
        }

    })
    .then( res => res.json())
    .then( data => {
        let message = '';

        message = 'invalid token';
        if(data.message === message){
        UI.showAlert('Expired session, Plase login to disapprove request', 'red');

        setTimeout(()=> location.assign('../index.html'), 1500);
        return;
        }

        message = 'request disapproved!';
        if(data.message === message){
            UI.showAlert(data.message, 'green');
        }

    })
    .catch( err => console.log('Error', err.message));
    
};//End disapproveRequest

const resolveRequest = (eventObj) =>{
    const [a, b, id] = eventObj.target.parentElement.previousElementSibling.previousElementSibling.textContent.split(' ');

    const answer = confirm('Are you sure that you want to resolve this request with ID: '+ id+' ?');
    if(!answer) return; //abort resolve

    //change status, delete resolve button from DOM
    eventObj.target.previousElementSibling.innerHTML = 'resolved';
    eventObj.target.remove();

    
    const token = localStorage.getItem('token');

    fetch('/api/v1/requests/'+ id +'/resolve', {
        method: 'PUT',
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Authorization': token,
            'Content-type': 'application/json'
        }

    })
    .then( res => res.json())
    .then( data => {
        let message = '';

        message = 'invalid token';
        if(data.message === message){
        UI.showAlert('Expired session, Plase login to resolve request', 'red');

        setTimeout(()=> location.assign('../index.html'), 1500);
        return;
        }

        message = 'request resolved!';
        if(data.message === message){
            UI.showAlert(data.message, 'green');
        }

    })
    .catch( err => console.log('Error', err.message));
    
};//End resolveRequest

