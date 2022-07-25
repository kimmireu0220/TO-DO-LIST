const listForm = document.querySelector('.listForm');
const inputBox = document.getElementById('inputField');  // 할 일 입력창
const toDoList = document.querySelector('.toDoList');    // 할 일 리스트창

listForm.addEventListener('submit', function(e) {
  e.preventDefault();    
  const list = document.createElement('li');     
  const span = document.createElement('span');
  const button = document.createElement('button');

  if (inputBox.value) {
    list.appendChild(span);
    list.appendChild(button);  
    span.innerText = inputBox.value;
    button.innerText = 'X';    
    toDoList.appendChild(list);  
    inputBox.value= "";   
  }  
     
  list.addEventListener('click', function() {
    if (list.style.textDecoration == 'none') {
      list.style.textDecoration = 'line-through';
    } 
    else {
      list.style.textDecoration = 'none';
    }
  })
  
  button.addEventListener('click', function(e) {
    e.preventDefault();  
    const removingOne = e.target.parentElement;
    removingOne.remove();
  })
})