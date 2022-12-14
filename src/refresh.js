import addElem from './addElement.js';

// Refresh/ update list
const refreshList = (_class, _container) => {
  _container.innerHTML = '';

  _class.data.forEach((e) => {
    let isChecked;
    let strikeThrough;
    if (e.completed === true) {
      isChecked = 'checked';
      strikeThrough = 'strike-through';
    }

    const todoList = addElem('div', ['row', 'todo-list'], _container);
    const listCheckBox = addElem('input', ['checkbox'], todoList);
    listCheckBox.setAttribute('type', 'checkbox');
    listCheckBox.setAttribute(isChecked, '');
    const listText = addElem('input', ['list-text', strikeThrough], todoList);
    listText.value = e.description;
    const listIconDots = addElem('i', ['fa-solid', 'fa-ellipsis-vertical', 'fa-lg', 'font-awesome-icon'], todoList);
    const removeButton = addElem('button', ['remove-button', 'hide'], todoList);

    const elemID = e.id;

    document.body.addEventListener('click', () => {
      if (listText === document.activeElement) {
        listIconDots.classList.add('hide');
        removeButton.classList.remove('hide');
        todoList.style.backgroundColor = '#fffdcc';
      } else {
        listIconDots.classList.remove('hide');
        removeButton.classList.add('hide');
        todoList.style.backgroundColor = 'transparent';
      }
    });

    removeButton.onclick = () => {
      _class.removeTask(elemID);
      refreshList(_class, _container);
    };

    listCheckBox.addEventListener('click', () => {
      _class.updateStatus(elemID, listCheckBox.checked);
      refreshList(_class, _container);
    });

    listText.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        _class.renameTask(elemID, listText.value);
        refreshList(_class, _container);
      }
    });
  });
};

export default refreshList;