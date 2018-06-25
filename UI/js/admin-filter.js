const adminFilter =  (eventObj)=>{
  let counter = 0,
      searchBy = '';
    
  document.querySelectorAll('.request').forEach(ul =>{

    let selectElem = '';
    document.querySelectorAll('.search-type').forEach( selectElement => {
      
      selectElem = selectElement.value;
      if(window.innerWidth >= 520){
        selectElem = document.querySelectorAll('.search-type')[0].value;
      }
    });
       
     if (selectElem === 'title') {
      searchBy = ul.firstElementChild.textContent.slice(6);
    } else if (selectElem === 'name') {
      searchBy = ul.firstElementChild.nextElementSibling.textContent.slice(5);
    }else if (selectElem === 'email') {
      searchBy = ul.firstElementChild.nextElementSibling.nextElementSibling.textContent.slice(6);
    }else if (selectElem === 'description') {
      searchBy = ul.firstElementChild.nextElementSibling.nextElementSibling.nextElementSibling.textContent.slice(12);
    }else if (selectElem === 'requestid') {
      searchBy = ul.lastElementChild.previousElementSibling.previousElementSibling.textContent.slice(11);
    }else if (selectElem === 'date') {
      searchBy = ul.lastElementChild.previousElementSibling.textContent.slice(5);
    }else if (selectElem === 'status') {
      searchBy = ul.lastElementChild.firstElementChild.nextElementSibling.textContent;
    }
  
    counter = newFunction(eventObj, searchBy, ul, counter);
  });
  
  document.querySelectorAll('.counter').forEach( counterSpan => counterSpan.innerHTML =  counter);

  if(eventObj.target.value === ''){
    document.querySelectorAll('.counter').forEach( counterSpan => counterSpan.innerHTML =  '');
  }
};

document.querySelectorAll('.search').forEach(search => search.addEventListener('keyup', adminFilter));

function newFunction(eventObj, searchBy, ul, counter) {
  const searchQuery = eventObj.target.value.toLowerCase();
  const found = searchBy.toLowerCase().startsWith(searchQuery);
  if (found) {
    ul.style.display = 'block';
    counter++;
  }
  else {
    ul.style.display = 'none';
  }
  return counter;
}

document.querySelectorAll('.search-type').forEach( selectElem => {
  selectElem.addEventListener('change', (eventObj)=>{
    eventObj.target.previousElementSibling.value = '';
    
    document.querySelectorAll('.request').forEach(ul => ul.style.display = 'block');

    document.querySelectorAll('.counter').forEach( counterSpan => counterSpan.innerHTML =  '');
  });

  
});



