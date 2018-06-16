class UI{
 
  static showAlert(message, bgColor, loginIndex){
    const alertBox = document.querySelectorAll('.alertBox')[loginIndex ? 1 : 0];
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
  
  static resetRequest(){
    const select = document.getElementById('request-type');
    select.options[0].removeAttribute('selected');
    select.options[0].setAttribute('selected','selected');
    document.getElementById('description').value = '';
  }
}//End UI
