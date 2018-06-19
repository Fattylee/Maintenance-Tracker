let signin = '';
window. addEventListener("load", function(){

//display sign up form on page load
const dataForm =document. querySelectorAll(".data-form");
dataForm[0]. style. display ='block' ;
dataForm[0].querySelector('form input').focus();

const signup = document. getElementById("sign-up");
signin = document. getElementById("sign-in");
 
signup.addEventListener("click", toggleForm);
signin. addEventListener("click", toggleForm);

//click event handler for sign-in and sign-up button
function toggleForm(event){

if(event. target. id ==="sign-in"){

dataForm[0]. style. display = "none" ;
dataForm[1]. style. display = "block" ;
dataForm[1].querySelector('form input').focus()

}else {

dataForm[1]. style. display = "none" ;
dataForm[0]. style. display = "block" ;
dataForm[0].querySelector('form input').focus();
}
}//End toggleForm 


});//End window load
