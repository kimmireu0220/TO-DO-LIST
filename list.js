const listForm = document.querySelector('.listForm');
const inputBox = document.getElementById('inputField');  // 할 일 입력창
const toDoList = document.querySelector('.toDoList');    // 할 일 리스트창

function paintToDo(newToDo) {
  const list = document.createElement('li');     
  const span = document.createElement('span');
  const button = document.createElement('button');

  list.appendChild(span);
  list.appendChild(button);  
  toDoList.appendChild(list);  
  span.innerText = newToDo;
  button.innerText = '❌';    

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
}

function handleToDoSubmit(event) {
  event.preventDefault();    
  if (inputBox.value) {
    const newToDo = inputBox.value;
    paintToDo(newToDo);
    inputBox.value= "";  
  }
} 

 listForm.addEventListener('submit', handleToDoSubmit);