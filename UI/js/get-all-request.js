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
           
            const message = 'your request list is empty, create a request';
            if(data.message === message){
                UI.showAlert(data.message, 'red', true);
                
                //redirect to create request
                setTimeout(()=>{document.getElementById('request-list').click()}, 1500);
                return;
            }
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
                ${ request.status === 'pending' ? `<button class='request-btn request-btn-pending' onclick = updateRequest(event)>update</button>` : ''}
                
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
    };
  
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
            UI.showAlert('Expired session, Plase login to make a request', 'red', true);

            setTimeout(()=> location.assign('../index.html'), 1500);
            return;
            }

            message = 'invalid request ID';
            if(data.message === message){
                UI.showAlert(data.message, 'red', true);
            }

            message = 'request deleted successfully';
            if(data.message === message){
                UI.showAlert(data.message, 'green', true);
            }

        })
        .catch( err => console.log('Error', err.message));
        
    };

    const updateRequest = (eventObj) =>{
        
        //display modify-form
        const modifyRequest = document.querySelector('.modify-request');
        modifyRequest.style.display = 'block';
        const overlay = document.querySelector('.overlay');
        overlay.style.display = 'block';

        //cancel modify request form
        document.querySelector('.cancel-request').addEventListener('click', () =>{
            modifyRequest.style.display = 'none';
            overlay.style.display = 'none';
            
            UI.resetRequest();

        });

        const [a, b, id] = eventObj.target.parentElement.previousElementSibling.previousElementSibling.textContent.split(' ');

        //on submit modify-request
        document.querySelector('#modify-request').addEventListener('submit',(eventObj) =>{
        eventObj.preventDefault();
        const token = localStorage.getItem('token'),
              requestType = document.getElementById('request-type').value,
              description = document.getElementById('description').value.trim();

        
        fetch('/api/v1/users/requests/'+id,{
            method: 'PUT',
            headers: {
                'Accept': 'application/json, plain/text, */*',
                'Content-type': 'application/json',
                'Authorization': token
            },
            body: JSON.stringify({requestType, description})

        })
        .then( res => res.json())
        .then( data => {
            
        let message = 'requestType can only be maintenance / repair';
        if(data.message === message){
          UI.showAlert(data.message, 'red');
          return;
        }
        
        message = 'description cannot be empty';
        if(data.message === message){
          UI.showAlert(data.message, 'red');
          return;
        }
        message = 'description should be 10 to 150 characters long';
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
          UI.showAlert('Expired session, Plase login to make a UPDATE request', 'orange');

          setTimeout(()=> location.assign('../index.html'), 1500);
          return;
        }
        message = `${data.request.name}, your request was successfully modified!`;
        if(data.message === message){
          UI.showAlert(`${data.request.name}, your request(#${id}) was successfully modified!`, 'green');

          //remove overlay
          setTimeout(()=>{ location.reload(); }, 1500);
        }
  
        })
        .catch( err => console.log('Error', err.message));
    });//End on submit form

};//End updateRequest

