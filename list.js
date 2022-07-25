const listForm = document.querySelector('.listForm');
const inputBox = document.getElementById('inputField');  // 할 일 입력창
const toDoList = document.querySelector('.toDoList');    // 할 일 리스트창

let toDos = [];
const TODOS_KEY = "todos";

function saveToDos() {
  localStorage.setItem(TODOS_KEY, JSON.stringify(toDos));
}

function paintToDo(newToDo) {
  const list = document.createElement('li');    
  list.id = newToDo.id; 
  const span = document.createElement('span');
  const button = document.createElement('button');

  list.appendChild(span);
  list.appendChild(button);  
  toDoList.appendChild(list);  
  span.innerText = newToDo.text;
  button.innerText = '❌';    

  list.addEventListener('click', function() {
    if (list.style.textDecoration == 'none') {
      list.style.textDecoration = 'line-through';
    } 
    else {
      list.style.textDecoration = 'none';
    }
  })
  
  button.addEventListener('click', function(event) {
    const removingOne = event.target.parentElement;
    removingOne.remove();
    toDos = toDos.filter((toDo) => toDo.id !== parseInt(removingOne.id));
    saveToDos();
  })
}

function handleToDoSubmit(event) {
  event.preventDefault();    
  if (inputBox.value) {
    const newToDo = inputBox.value;
    inputBox.value= "";  
    const newToDoObject = {
      text: newToDo,
      id: Date.now(),
    };
    toDos.push(newToDoObject);
    paintToDo(newToDoObject);
    saveToDos();
  }
} 

 listForm.addEventListener('submit', handleToDoSubmit);

 const savedToDos = localStorage.getItem(TODOS_KEY);

 if (savedToDos !== null) {
  const parsedToDos = JSON.parse(savedToDos);
  toDos = parsedToDos;
  parsedToDos.forEach(paintToDo)
 }