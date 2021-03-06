
let markup="";
for (let i = 1; i < 101; i++) {
   markup += `
   <ul>
   <li><span>Username</span>: yourname${i}</li>
   <li><span>Maintenance/Repair</span>: repair${i}</li>
   <li><span>Description</span>: fix problem${i}</li>
   <li><span>Date</span>: ${i}/${i}/197${i}</li>
   <li><span>(Dis)approve</span>: <button class="success">approve</button> <button class="critical">disapprove</button></li>
   </ul>
   `; 
}
if(document.querySelector(".content-area-all")){
    document.querySelector(".content-area-all").innerHTML += markup;
}


markup="";
for (let i = 1; i < 71; i++) {
   markup += `
   <ul>
   <li><span>Username</span>: yourname${i}</li>
   <li><span>Maintenance/Repair</span>: repair${i}</li>
   <li><span>Description</span>: fix problem${i}</li>
   <li><span>Date</span>: ${i}/${i}/197${i}</li>
   <li><span>Action</span>: <button class="success">resolve</button> 
   <button class="pending">pending</button> <button class="critical">unresolve</button></li>
   </ul>
   `; 
}
if(document.querySelector(".content-area-approve"))
document.querySelector(".content-area-approve").innerHTML += markup;

markup="";
for (let i = 1; i < 31; i++) {
   markup += `
   <ul>
   <li><span>Username</span>: yourname${i}</li>
   <li><span>Maintenance/Repair</span>: repair${i}</li>
   <li><span>Description</span>: fix problem${i}</li>
   <li><span>Date</span>: ${i}/${i}/197${i}</li>
   <li><span>(Dis)approve</span>: <span class="critical">disapproved</span></li>
   </ul>
   `; 
}
if(document.querySelector(".content-area-disapprove"))
document.querySelector(".content-area-disapprove").innerHTML += markup;

markup="";
for (let i = 1; i < 46; i++) {
   markup += `
   <ul>
   <li><span>Username</span>: yourname${i}</li>
   <li><span>Maintenance/Repair</span>: repair${i}</li>
   <li><span>Description</span>: fix problem${i}</li>
   <li><span>Date</span>: ${i}/${i}/197${i}</li>
   <li><span>Status</span>: <span class="success">resolved</span></li>
   </ul>
   `; 
}
if(document.querySelector(".content-area-resolve"))
document.querySelector(".content-area-resolve").innerHTML += markup;

markup="";
for (let i = 1; i < 21; i++) {
   markup += `
   <ul>
   <li><span>Username</span>: yourname${i}</li>
   <li><span>Maintenance/Repair</span>: repair${i}</li>
   <li><span>Description</span>: fix problem${i}</li>
   <li><span>Date</span>: ${i}/${i}/197${i}</li>
   <li><span>Status</span>: <span class="pending">pending</span></li>
   </ul>
   `; 
}
if(document.querySelector(".content-area-pending"))
document.querySelector(".content-area-pending").innerHTML += markup;


markup="";
for (let i = 1; i < 6; i++) {
   markup += `
   <ul>
   <li><span>Username</span>: yourname${i}</li>
   <li><span>Maintenance/Repair</span>: repair${i}</li>
   <li><span>Description</span>: fix problem${i}</li>
   <li><span>Date</span>: ${i}/${i}/197${i}</li>
   <li><span>Status</span>: <span class="critical">unresolve</span></li>
   </ul>
   `; 
}
if(document.querySelector(".content-area-unresolve"))
document.querySelector(".content-area-unresolve").innerHTML += markup;