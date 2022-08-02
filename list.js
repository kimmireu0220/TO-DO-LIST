const todayDate = document.querySelector('.todayDate');                               // 현재 날짜
const listForm = document.querySelector('.listForm');                                 // 리스트 양식
const inputBox = document.getElementById('inputField');                               // 리스트 입력창
const toDoList = document.querySelector('.toDoList');                                 // 리스트 내역
const deleteAllButton = document.querySelector('#deleteAllButton');                   // '전체 삭제' 버튼
const confirmModal = document.querySelector('.confirmModal');                         // '전체 삭제' 확인 창
const confirmModalOverlay = document.querySelector('.confirmModalOverlay');           // '전체 삭제' 확인 창 배경
const confirmDeleteButton = document.querySelector('.confirmDeleteButton');           // '전체 삭제' '⭕️' 버튼
const rejectDeleteButton = document.querySelector('.rejectDeleteButton');             // '전체 삭제' '❌' 버튼  
let toDos = [];                                                                       // 리스트 저장 공간
const TODOS_KEY = "todos";                                                            // localStorage key 값 
const savedToDos = localStorage.getItem(TODOS_KEY);                                   // 저장된 리스트 

window.onload = function() {
  const today = new Date();
  const [year, month, date] = [today.getFullYear(), today.getMonth() + 1, today.getDate()];
  todayDate.innerText = `${year}.${month}.${date}`; 
  if (savedToDos) {
    const parsedToDos = JSON.parse(savedToDos);
    toDos = parsedToDos;
    parsedToDos.forEach(makeToDo);
  }
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

function makeToDo(newToDo) {
  const list = document.createElement('li');    
  const span = document.createElement('span');
  const button = document.createElement('button');
  list.id = newToDo.id; 
  list.appendChild(span);
  list.appendChild(button);  
  toDoList.appendChild(list); 
  span.innerText = newToDo.text;
  button.innerText = '❌';    
  button.addEventListener('click', removeToDos);
}

function saveToDos() {
  localStorage.setItem(TODOS_KEY, JSON.stringify(toDos));
}

function removeToDos(event) {
  const targeted = event.target.parentElement;
  targeted.remove();
  toDos = toDos.filter((toDo) => toDo.id !== parseInt(targeted.id));
  saveToDos();
}

function showConfirm() {
  confirmModal.removeAttribute('id');
  confirmModalOverlay.removeAttribute('id');
}
deleteAllButton.addEventListener('click', showConfirm);

function confirmDelete() {
  toDos = [];
  inputBox.value = "";
  window.location.remove(TODOS_KEY); 
  window.location.reload()
}
confirmDeleteButton.addEventListener('click', confirmDelete);

function hideConfirm() {
  confirmModal.id =  confirmModalOverlay.id = 'hidden';
}
rejectDeleteButton.addEventListener("click", hideConfirm);
confirmModalOverlay.addEventListener('click', hideConfirm);
window.addEventListener("keyup", e => {if (e.key === "Escape") hideConfirm()});



