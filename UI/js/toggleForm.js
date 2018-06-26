let signin = '';
window. addEventListener("load", function(){
  const signup = document. getElementById("sign-up");
  signin = document. getElementById("sign-in");

  //display sign up form on page load
  const dataForm =document. querySelectorAll(".data-form");
  dataForm[0]. style. display ='block' ;
  dataForm[0].querySelector('form input').focus();
  
  signup.addEventListener("click", toggleForm);
  signin. addEventListener("click", toggleForm);

  //click event handler for sign-in and sign-up button
  function toggleForm(event){

  if(event. target. id ==="sign-in"){

  signin.parentElement.style.display = 'none';
  signup.parentElement.style.display = 'block';
  dataForm[0]. style. display = "none" ;
  dataForm[1]. style. display = "block" ;
  dataForm[1].querySelector('form input').focus()

}else {
signin.parentElement.style.display = 'block';
signup.parentElement.style.display = 'none';
dataForm[1]. style. display = "none" ;
dataForm[0]. style. display = "block" ;
dataForm[0].querySelector('form input').focus();
}
}//End toggleForm 


});//End window load
