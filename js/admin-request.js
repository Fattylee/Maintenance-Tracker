
let markup="";
for (let i = 1; i < 101; i++) {
   markup += `
   <ul>
   <li><span>Username</span>: yourname${i}</li>
   <li><span>Maintenance/Repair</span>: repair${i}</li>
   <li><span>Description</span>: fix problem${i}</li>
   <li><span>Date</span>: ${i}/${i}/197${i}</li>
   <li><span>(Dis)approve</span>: ${(i%2===0) ? "approved":"disapproved"}</li>
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
   <li><span>(Dis)approve</span>: ${true ? "approved":"disapproved"}</li>
   </ul>
   `; 
}
if(document.querySelector(".content-area-approve"))
document.querySelector(".content-area-approve").innerHTML += markup;