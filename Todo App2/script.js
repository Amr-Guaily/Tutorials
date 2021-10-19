// Selector
let input = document.querySelector('.input');
let inputBtn = document.querySelector('.input-btn');
let todoList = document.querySelector('.todo-list');
let counter = document.querySelector('.counter');
let deleteAllBtn = document.querySelector('.footer button');

// Event Listener
inputBtn.addEventListener('click', addTodo);
deleteAllBtn.addEventListener('click', deleteAllTodos);

// Functions
showTodos(); //calling showTodos function

function checkInput() {
  if (input.value.trim() != 0) {
    inputBtn.classList.add('active');
  } else {
    inputBtn.classList.remove('active');
  }
}

function addTodo(event) {
  event.preventDefault(); //prevent form from submitting
  addToLocal(input.value); //calling addToLocal function
  showTodos(); //calling showTodos function
  input.value = ''; //once todo added leave the input field blank
}

function addToLocal(todo) {
  // todo => todoInput.valu
  // Check---Do i already have thing in there?
  let todos;
  if (localStorage.getItem('todos') === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem('todos'));
  }

  todos.push(todo);
  localStorage.setItem('todos', JSON.stringify(todos));
}

function showTodos() {
  let todos;
  if (localStorage.getItem('todos') === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem('todos'));
  }
  // Good idea(best practice)
  let newTodo = '';
  todos.forEach((todo, idx) => {
    newTodo += `<li class="todo">
    ${todo} <span onclick="deleteTodo(${idx})"><i class="fas fa-trash"></i></span>
    </li>`;
  });
  todoList.innerHTML = newTodo;
  counter.textContent = todos.length;
  if (todos.length > 0) {
    deleteAllBtn.classList.add('active');
  } else {
    deleteAllBtn.classList.remove('active');
  }
}

function deleteTodo(idx) {
  let todos = JSON.parse(localStorage.getItem('todos'));
  todos.splice(idx, 1);
  //after remove the todo, update the localstorage again
  localStorage.setItem('todos', JSON.stringify(todos));
  showTodos();
}

function deleteAllTodos() {
  todos = [];
  //after delete all todos, update the localstorage again
  localStorage.setItem('todos', JSON.stringify(todos));
  showTodos();
}
