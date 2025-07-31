document.addEventListener('DOMContentLoaded', () => {
  const taskInput = document.getElementById('taskInput');
  const addBtn = document.getElementById('addBtn');
  const taskList = document.getElementById('taskList');

  let taskBeingEdited = null; // Track the task currently being edited

  addBtn.addEventListener('click', () => {
    const text = taskInput.value.trim();

    if (text === '') return;

    if (taskBeingEdited) {
      // If editing, update the existing task text
      taskBeingEdited.querySelector('span').textContent = text;
      taskBeingEdited = null;
      addBtn.textContent = '➕ Add'; // Reset button label
    } else {
      // Otherwise, create a new task
      const li = document.createElement('li');
      li.className = 'task';

      const span = document.createElement('span');
      span.textContent = text;

      const editBtn = document.createElement('button');
      editBtn.textContent = '✏️ Edit';
      editBtn.onclick = () => {
        taskInput.value = span.textContent;
        taskBeingEdited = li;
        addBtn.textContent = '✅ Save';
      };

      const delBtn = document.createElement('button');
      delBtn.textContent = '❌ Delete';
      delBtn.onclick = () => {
        taskList.removeChild(li);
        if (taskBeingEdited === li) {
          taskInput.value = '';
          addBtn.textContent = '➕ Add';
          taskBeingEdited = null;
        }
      };

      li.append(span, editBtn, delBtn);
      taskList.appendChild(li);
    }

    taskInput.value = '';
  });
});
