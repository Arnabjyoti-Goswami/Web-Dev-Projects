const todoList = [];

function renderTodoList() {
  let todoListHTML = '';

  for(let i = 0; i < todoList.length; i++) {
    const todoObject = todoList[i];
    const { name, dueDate } = todoObject; //  destructure properties out from the object and store it in variables

    const html = `
      <div>${name}</div>
      <div>${dueDate}</div>
      <button onclick="
        todoList.splice(${i},1); //first parameter is the index we want to remove and second parameter is the number of items we want to remove starting from that index
          renderTodoList();
      " class="delete-todo-button">Delete</button>
    `;

    todoListHTML += html;
  }

  document.querySelector('.js-todo-list').innerHTML = todoListHTML;
}

function addTodo() {
  const inputElement = document.querySelector('.js-name-input');
  const name = inputElement.value; //to get the value of the text entered in the input text box

  const dateInputElement = document.querySelector('.js-due-date-input');
  const dueDate = dateInputElement.value;

  if(name || dueDate) { // if both the name and the dueDate is not selected then don't add an empty todo item
    todoList.push( { 
      name, // shorthand for: name (property name: string): name (variable name)
      dueDate
    }); //add object to the end of the array
  }

  inputElement.value = ''; //to reset the text in the textbox

  renderTodoList();
}