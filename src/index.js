import './style.css';
import addElem from './addElement.js';
import TaskList from './class_task_list.js';
import refreshList from './refresh.js';

const taskList = new TaskList();

const mainContainer = document.querySelector('.todo-list-container');

mainContainer.innerHTML = `<div class="row">
<h1>Today's To Do</h1>
<i class="fa-solid fa-rotate fa-lg font-awesome-icon"></i>
</div>`;
const inputContainer = addElem('form', [], mainContainer);
const inputText = addElem('input', ['input-add-task'], inputContainer);
inputText.setAttribute('placeholder', 'Add to your list...');
addElem('i', ['fa-solid', 'fa-arrow-right-to-bracket', 'fa-sm', 'font-awesome-icon'], inputContainer);

const listContainer = addElem('div', [], mainContainer);

const clearButton = addElem('button', ['button'], mainContainer);
clearButton.textContent = 'Clear all completed';

// Input functionalities
inputContainer.onsubmit = (e) => {
  e.preventDefault();
  taskList.addTask(inputText.value);

  inputContainer.reset();
  refreshList(taskList, listContainer);
};

// clear button
clearButton.onclick = () => {
  taskList.clearCompleted();
  refreshList(taskList, listContainer);
};

// On load
refreshList(taskList, listContainer);