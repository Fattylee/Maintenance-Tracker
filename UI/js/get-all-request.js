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
          let markup = '';
  
          data.userRequests.forEach(request => {
  
              
            const [year, month, day] = request.date.split('T')[0].split('-');
            const date = day+'/'+month+'/'+year;
  
            markup += `
            <div class="repair-log">
            <ul>
                <li><span>Title:</span> ${request.requesttype}</li>
                <li><span>Description:</span> ${request.description}</li>
                <li><span>Request ID:</span> ${request.request_id}</li>
                <li><span>Date:</span> ${date}</li>
                <li><span>Status:</span> <span class="${request.status === 'pending' ? 'pending': request.status === 'disapproved' ? 'critical': 'success'} no-width">${request.status}</span>
                ${request.status !== 'approved' ? `<button class='request-btn request-btn-delete' onclick = deleteRequest(event)> delete </button>` : ''}
                ${ request.status === 'pending' ? `<button class='request-btn request-btn-pending' onclick = updateRequest()>update</button>` : ''}
                
                </li>
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

    const deleteRequest = (eventObj) =>{
        
        const [a, b, id] = eventObj.target.parentElement.previousElementSibling.previousElementSibling.textContent.split(' ');

        const answer = confirm('Are you sure that you want to delete this request with ID: '+ id+' ?');
        if(!answer) return; //abort delete

        //delete from DOM
        eventObj.target.parentElement.parentElement.parentElement.remove();
        const token = localStorage.getItem('token');

        fetch('/api/v1/users/requests/'+ id, {
            method: 'DELETE',
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
            UI.showAlert('Expired session, Plase login to make a request', 'red');

            setTimeout(()=> location.assign('../index.html'), 1500);
            return;
            }

            message = 'invalid request ID';
            if(data.message === message){
                UI.showAlert(data.message, 'red');
            }

            message = 'request deleted successfully';
            if(data.message === message){
                UI.showAlert(data.message, 'green');
            }

        })
        .catch( err => console.log('Error', err.message));
        
    };

    const updateRequest = () =>{

        console.log("updated!");
    };