// Get access to certain DOM elements:
const form = document.querySelector('form');
const taskInput = document.querySelector('#task');
const taskList = document.querySelector('.collection');
const clearButton = document.querySelector('.clear-tasks');
const taskFilter = document.querySelector('#task-filter');

// Load all the event listeners:
loadAllEventListeners();

function loadAllEventListeners () {
    document.addEventListener('DOMContentLoaded', getTaskList);
    form.addEventListener('submit', addTask);
    taskList.addEventListener('click', deleteTask);
    clearButton.addEventListener('click', clearTasks);
    taskFilter.addEventListener('keyup', filterTasks);
};

// Get task list function
function getTaskList () {
    let tasks;
    // Check if there's already been a key 'tasks' in local storage: if thereisn't - put an empty 
    // array as a value of tasks variable, if there is - get it from local storage, parse it and 
    // assign it as a value of tasks variable:
    if (localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    };

    tasks.forEach(task => {
        // Create a list-item element:
        const listItem = document.createElement('li');
        // Add a class to list-item element:
        listItem.className = 'collection-item';
        // Create a text node and append it to list-item element:
        const textNode = document.createTextNode(task);
        listItem.appendChild(textNode);
        // Create a link element:
        const link = document.createElement('a');
        // Add classes to link element:
        link.className = 'delete-item secondary-content';
        // Add delete-icon html:
        link.innerHTML = '<i class="fa fa-remove"></i>';
        // Append link element to list-item element:
        listItem.appendChild(link);
        // Append list-item element to ul.collection element:
        taskList.appendChild(listItem);
    });
};

// Add task function
function addTask (event) {
    // Check if input field is empty:
    if (taskInput.value === '') {
        alert('You should enter a task to add it to task list');
    };
    // Create a list-item element:
    const listItem = document.createElement('li');
    // Add a class to list-item element:
    listItem.className = 'collection-item';
    // Create a text node and append it to list-item element:
    const textNode = document.createTextNode(taskInput.value);
    listItem.appendChild(textNode);
    // Create a link element:
    const link = document.createElement('a');
    // Add classes to link element:
    link.className = 'delete-item secondary-content';
    // Add delete-icon html:
    link.innerHTML = '<i class="fa fa-remove"></i>';
    // Append link element to list-item element:
    listItem.appendChild(link);
    // Append list-item element to ul.collection element:
    taskList.appendChild(listItem);
    // Save task to local storage:
    saveTaskToLocalStorage(taskInput.value);
    // Clear input:
    taskInput.value = '';

    // Prevent a default page reload when submit the form:
    event.preventDefault();
};

// Save task function
function saveTaskToLocalStorage (task) {
    let tasks;
    // Check if there's already been a key 'tasks' in local storage: if thereisn't - put an empty 
    // array as a value of tasks variable, if there is - get it from local storage, parse it and 
    // assign it as a value of tasks variable:
    if (localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    };
    // Add new task to array with tasks:
    tasks.push(task);
    // Reset array with tasks in local storage:
    localStorage.setItem('tasks', JSON.stringify(tasks));
    // Tell user that task was saved:
    alert('Task was saved');
};

// Delete task function
function deleteTask (event) {
    // Check if parent element of click target (X) is a link.delete-item:
    if (event.target.parentElement.classList.contains('delete-item')) {
        // Check if user confirms task removal:
        if (confirm('Are you sure?')) {
            // Remove list-item element that is a parent element of link.delete-item
            event.target.parentElement.parentElement.remove();
            // Delete task from local storage:
            deleteTaskFromLocalStorage(event.target.parentElement.parentElement);
        };
    };
};

// Delete task from local storage function
function deleteTaskFromLocalStorage (task) {
    let tasks;
    // Check if there's already been a key 'tasks' in local storage: if thereisn't - put an empty 
    // array as a value of tasks variable, if there is - get it from local storage, parse it and 
    // assign it as a value of tasks variable:
    if (localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    };
    // Loop through task list in order to delete necessary task:
    tasks.forEach((item, index) => {
        if (task.textContent === item) {
            tasks.splice(index, 1);
        };
    });
    // Reset array with tasks in local storage:
    localStorage.setItem('tasks', JSON.stringify(tasks));
    // Tell user that task was removed:
    alert('Task was removed');
};

// Clear tasks function
function clearTasks () {
    // Check if user confirms tasks removal:
    if (confirm('Do you really want to clear ALL the tasks?')) {
        // Get access to list-items with tasks:
        const tasks = document.querySelectorAll('.collection-item');
        // Start forEach loop to remove every task:
        tasks.forEach(task => task.remove());
        // Clear tasks from local storage:
        localStorage.clear();
    };
};

// Filter tasks function
function filterTasks (event) {
    // Get access to entered text from filter tasks input:
    const text = event.target.value.toLowerCase();
    // Get access to list-items with tasks:
    const tasks = document.querySelectorAll('.collection-item');
    // Start forEach loop to filter every task:
    tasks.forEach(task => {
        // Get access to task text content:
        const item = task.firstChild.textContent;
        // Check if entered in input text is present in task text content & show / don't show task:
        if (item.toLowerCase().indexOf(text) !== -1) {
            task.style.display = 'block';
        } else {
            task.style.display = 'none';
        };
    });
};