// Get access to certain DOM elements:
const form = document.querySelector('form');
const taskInput = document.querySelector('#task');
const taskList = document.querySelector('.collection');
const clearButton = document.querySelector('.clear-tasks');
const taskFilter = document.querySelector('#task-filter');

// Load all the event listeners:
loadAllEventListeners();

function loadAllEventListeners () {
    form.addEventListener('submit', addTask);
    taskList.addEventListener('click', deleteTask);
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
    // Clear input:
    taskInput.value = '';

    // Prevent a default page reload when submit the form:
    event.preventDefault();
};

// Delete task function
function deleteTask (event) {
    if (event.target.parentElement.classList.contains('delete-item')) {
        if (confirm('Are you sure?')) {
            event.target.parentElement.parentElement.remove();
        };
    };
};