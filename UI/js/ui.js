class UI{
 
  static showAlert(message, bgColor){
    const alertBox = document.querySelector('.alertBox');
    //hide existing message
    alertBox.style.display = 'none';

    alertBox.innerHTML = message;
    alertBox.style.display = 'block';
    alertBox.style.backgroundColor = bgColor;

    //hide showAlert Div
    setTimeout(()=>{
      alertBox.style.display = 'none';
    }, 3000);

  }//End showAlert

  static clearField(){
    document.getElementById('name').value = '';
    document.getElementById('email').value = '';
    document.getElementById('username').value = '';
    document.getElementById('password').value = '';
  }//End clearFied
  
}//End UI