window.onload=function() {
  const today = new Date();
  const year = today.getFullYear(); 
  const month = today.getMonth() + 1;
  const date = today.getDate();  

  const title = document.querySelector('.title');
  title.innerText = `${year}.${month}.${date}
  To Do List`; 

  if (savedToDos) {
    const parsedToDos = JSON.parse(savedToDos);
    toDos = parsedToDos;
    parsedToDos.forEach(makeToDo)
  }
}

const listForm = document.querySelector('.listForm');    // 라스트  양식
const inputBox = document.getElementById('inputField');  // 리스트 입력창
const toDoList = document.querySelector('.toDoList');    // 리스트 내역
const deleteAllButton = document.querySelector('#deleteAllButton');

let toDos = [];                                          // 리스트 저장 공간
const TODOS_KEY = "todos";                               // localStorage key값 
const savedToDos = localStorage.getItem(TODOS_KEY);      // 저장된 리스트 

function deleteAll() {
  toDos = [];
  window.localStorage.clear();
  window.location.reload();
}

deleteAllButton.addEventListener('click', deleteAll);

function removeToDos(event) {
  const targeted = event.target.parentElement;
  targeted.remove();
  toDos = toDos.filter((toDo) => toDo.id !== parseInt(targeted.id));
  saveToDos();
}

function saveToDos() {
  localStorage.setItem(TODOS_KEY, JSON.stringify(toDos));
}

function makeToDo(newToDo) {
  const list = document.createElement('li');    
  const span = document.createElement('span');
  const button = document.createElement('button');

  list.id = newToDo.id; 
  list.appendChild(span);
  list.appendChild(button);  
  span.innerText = newToDo.text;
  button.innerText = '❌';    
  toDoList.appendChild(list); 
  
  button.addEventListener('click', removeToDos);
}

function handleToDoSubmit(event) {
  event.preventDefault();    
  if (inputBox.value) {
    const newToDo = inputBox.value;
    const newToDoObject = {
      text: newToDo,
      id: Date.now(),
    };
    
    inputBox.value= "";  

    toDos.push(newToDoObject);
    makeToDo(newToDoObject);
    saveToDos();
  }
} 

 listForm.addEventListener('submit', handleToDoSubmit);

