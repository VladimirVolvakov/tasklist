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
    clearButton.addEventListener('click', clearTasks);
    taskFilter.addEventListener('keyup', filterTasks);
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
    // Check if parent element of click target (X) is a link.delete-item:
    if (event.target.parentElement.classList.contains('delete-item')) {
        // Check if user confirms task removal:
        if (confirm('Are you sure?')) {
            // Remove list-item element that is a parent element of link.delete-item
            event.target.parentElement.parentElement.remove();
        };
    };
};

// Clear tasks function
function clearTasks () {
    // Check if user confirms tasks removal:
    if (confirm('Do you really want to clear ALL the tasks?')) {
        // Get access to list-items with tasks:
        const tasks = document.querySelectorAll('.collection-item');
        // Start forEach loop to remove every task:
        tasks.forEach(task => task.remove());
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