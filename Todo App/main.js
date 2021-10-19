//Set Selector
let todoInput = document.querySelector('.todo-input');
let todoBtn = document.querySelector('.todo-btn');
let todoList = document.querySelector('.todo-list');

//Event Listener
todoBtn.addEventListener('click', addTodo);
todoList.addEventListener('click', deleteChecked);
document.addEventListener('DOMContentLoaded', getTodos);

//Functions
function addTodo(event) {
  //prevent form from submitting
  event.preventDefault();
  if (todoInput.value != '') {
    // Todo DIV
    let todoDiv = document.createElement('div');
    todoDiv.classList.add('todo');
    // Create LI
    let newTodo = document.createElement('li');
    todoDiv.appendChild(newTodo);
    newTodo.classList.add('todo-item');
    newTodo.innerText = todoInput.value;
    // Add todo to localstorage
    saveLocalTodos(todoInput.value);
    // Create Mark BUTTON
    let completedBtn = document.createElement('button');
    todoDiv.appendChild(completedBtn);
    completedBtn.classList.add('complete-btn');
    completedBtn.innerHTML = '<i class="fas fa-check"</i>';
    // Create Trash BUTTON
    let trashBtn = document.createElement('button');
    todoDiv.appendChild(trashBtn);
    trashBtn.classList.add('trash-btn');
    trashBtn.innerHTML = '<i class="fas fa-trash"</i>';
    //Append Big DIV (todoDiv) To Todo List
    todoList.appendChild(todoDiv);
  }
  //Clear todoInput value
  todoInput.value = '';
}

function deleteChecked(e) {
  // console.log(e.target.classList[0]);
  let todo = e.target.parentElement;
  // Delete Todo
  if (e.target.classList[0] === 'trash-btn') {
    todo.classList.add('fall');
    // call function that remove todo from localstorage
    removeLoclalTodos(todo);
    // it's kind of wait (only execute after the animation completed)
    todo.addEventListener('transitionend', function () {
      todo.remove();
    });
  }
  //Mark check
  if (e.target.classList[0] === 'complete-btn') {
    todo.classList.toggle('completed');
  }
}

function saveLocalTodos(todo) {
  // todo => todoInput.valu
  // Check---Do i already have thig in there?
  let todos;
  if (localStorage.getItem('todos') === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem('todos'));
  }

  todos.push(todo);
  localStorage.setItem('todos', JSON.stringify(todos));
}

function getTodos() {
  // Check---Do i already have thig in there?
  let todos;
  if (localStorage.getItem('todos') === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem('todos'));
  }
  todos.forEach((todo) => {
    // Todo DIV
    let todoDiv = document.createElement('div');
    todoDiv.classList.add('todo');
    // Create LI
    let newTodo = document.createElement('li');
    todoDiv.appendChild(newTodo);
    newTodo.classList.add('todo-item');
    newTodo.innerText = todo;
    // Create Mark BUTTON
    let completedBtn = document.createElement('button');
    todoDiv.appendChild(completedBtn);
    completedBtn.classList.add('complete-btn');
    completedBtn.innerHTML = '<i class="fas fa-check"</i>';
    // Create Trash BUTTON
    let trashBtn = document.createElement('button');
    todoDiv.appendChild(trashBtn);
    trashBtn.classList.add('trash-btn');
    trashBtn.innerHTML = '<i class="fas fa-trash"</i>';
    //Append Big DIV (todoDiv) To Todo List
    todoList.appendChild(todoDiv);
  });
}

function removeLoclalTodos(todo) {
  // Check---Do i already have thig in there?
  let todos;
  if (localStorage.getItem('todos') === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem('todos'));
  }
  // console.log(todos.indexOf(todo.children[0].innerText));
  todos.splice(todos.indexOf(todo.children[0].innerText), 1);
  localStorage.setItem('todos', JSON.stringify(todos));
}
