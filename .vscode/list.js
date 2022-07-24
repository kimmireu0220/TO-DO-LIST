const inputBox = document.getElementById('inputField');  // 할 일 입력창
const addToDo = document.getElementById('addToDo');      // + 버튼
const toDoList = document.querySelector('.toDoList');    // 할 일 리스트창

addToDo.addEventListener('click', function() {    
  const list = document.createElement('li');     
  list.innerText = inputBox.value;

  if (inputBox.value) {
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
  
  list.addEventListener('contextmenu', function(e) {
    e.preventDefault();  
    toDoList.removeChild(list);
  })
})