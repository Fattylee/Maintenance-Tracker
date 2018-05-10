window. addEventListener("load", function(){

//display sign up form on page load
const dataForm =document. querySelectorAll(".data-form");
dataForm[0]. style. display ='block' ;

const signup = document. getElementById("sign-up"),
signin = document. getElementById("sign-in");
 
signup.addEventListener("click", toggleForm);
signin. addEventListener("click", toggleForm);

//click events handler for sign-in and sign-up button
function toggleForm(event){

if(event. target. id ==="sign-in"){

dataForm[0]. style. display = "none" ;
dataForm[1]. style. display = "block" ;

}else {

dataForm[1]. style. display = "none" ;
dataForm[0]. style. display = "block" ;
}
}//End toggleForm 

document.getElementById("request-list").addEventListener("click",requestNavigator);

//request list event handler (navigate to request-list.html)
function requestNavigator(){
location.assign("request-list.html");
}//End requestNavigator


});