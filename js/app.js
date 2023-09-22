

const taskInput = document.querySelector('#task-input');
const addTaskBtn = document.querySelector('#add-task-btn');
const taskSectionList = document.querySelector('.tasks-section__list'); // The <ul>



/* **********************
 * 
 * 
 *  Create Task
 * 
 * 
 * **********************/

// Function that creates the <li> element that will hold the task
// also set a default value for the completed status

/*
* This is how a task should look like
    <li class="task clearfix">
        <p class="task-text">Hey! I'm a default task. If you click on me, that willl mark me as completed!</p>
        <button class="task-btn remove-task-btn">Remove</button>
        <button class="task-btn edit-task-btn">Edit</button>
    </li>
*
*/
function createTask(textInput, completed = false) {
    // Check if the input is valid before anything else
    const validatedInput = validateInput(textInput);

    if (!validatedInput) {
        return;
    }

    // Check if more tasks can be created
    let currentTasks = document.querySelectorAll('.task');

    if (!tasksLimit(currentTasks)) {
        return;
    }



    // Create the <li> and <p> elements that will hold the task. Add their classes
    let taskLi = document.createElement('li');
    taskLi.classList.add('task');

    // Create the P element
    let taskText = document.createElement('p');
    taskText.classList.add('task-text');
    taskText.textContent = textInput;

    // Create the Span element
    let checkmark = document.createElement('p');

    // Append them
    taskLi.appendChild(checkmark);
    taskLi.appendChild(taskText);

    // add the completed class
    if (completed) {
        taskLi.classList.add('completed');
    }



    // Create the remove <button>
    let removeTaskBtn = document.createElement('button');
    removeTaskBtn.classList.add('task-btn', 'remove-task-btn');
    removeTaskBtn.textContent = 'Remove';
    taskLi.appendChild(removeTaskBtn);


    // Create the edit <button>
    let editTaskBtn = document.createElement('button');
    editTaskBtn.classList.add('task-btn', 'edit-task-btn');
    editTaskBtn.textContent = 'Edit';
    taskLi.appendChild(editTaskBtn);


    // Append the <li> element to the tasks list
    taskSectionList.appendChild(taskLi);

    // Save the tasks to the local storage
    saveTasksToTheLocalStorage();

    // Add event listeners to the newly created edit and remove buttons
    removeTaskBtn.addEventListener('click', (e) => {
        const taskLi = e.target.parentNode;
        taskLi.remove();
        saveTasksToTheLocalStorage();
    });


    editTaskBtn.addEventListener('click', (e) => {
        const taskLi = e.target.parentNode;
        editTask(taskLi);
    });

}// end of createTask()


// Listener that add the task to the task-list
addTaskBtn.addEventListener('click', () => {
    createTask(taskInput.value); // Add the task
    taskInput.value = ''; // Clear the input
    taskInput.focus(); // Return the focus on the input
});

// Add event listener that adds a task when Enter is pressed
taskInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        createTask(taskInput.value);
        taskInput.value = '';
    }
});







/* **********************
 * 
 * 
 *  Edit Task
 * 
 * 
 * **********************/

// Function that edits a task
function editTask(taskLi) {
    //Target the <p> element that hold the text
    let textParagraph = taskLi.querySelector('.task-text');

    //Create textarea field there, and add the existing text to it
    let editTextarea = document.createElement('textarea');
    editTextarea.classList.add('edit-textarea');
    editTextarea.value = textParagraph.textContent;

    // Hide the paragraph that shows the taks text normaly, as it will be repllace with the textarea
    // Also hide the Remove <button>, The only button there will be the Save button
    textParagraph.style.display = 'none';
    let removeTaskBtn = taskLi.querySelector('.remove-task-btn');
    removeTaskBtn.style.display = 'none';

    //Hide the edit <button>
    let editBtn = taskLi.querySelector('.edit-task-btn');
    editBtn.style.display = 'none';

    // Create the Save button
    let saveBtn = document.createElement('button');
    saveBtn.setAttribute('id', 'save-task-btn');
    saveBtn.textContent = 'Save';
    saveBtn.style.background = '#198754';

    // Append the <textarea> element to the tasks list, on top of the Save button
    taskLi.appendChild(editTextarea);
    taskLi.appendChild(saveBtn);

    // Add padding on edit so the Save button is not so close the buttons below
    taskLi.classList.add('add-45px-padding');

}




/* **********************
 * 
 * 
 *  Save Task
 * 
 * 
 * **********************/

// Function that saves the editd task
function saveTask(e) {
    let textLi = e.target.parentNode;
    let textArea = textLi.querySelector('.edit-textarea');
    let textParagraph = textLi.querySelector('.task-text');
    let removeTaskBtn = textLi.querySelector('.remove-task-btn');
    let saveBtn = textLi.querySelector('#save-task-btn');
    let editBtn = textLi.querySelector('.edit-task-btn');


    // Check if the input is valid before anything else
    const validatedInput = validateInput(textArea.value);

    if (!validatedInput) {
        return;
    }


    // Transfer the text from the texarea to the paragraph
    textParagraph.textContent = textArea.value;

    // Remove the save button and the textarea
    saveBtn.remove();
    textArea.remove();


    // Show the paragraph and the remove and edit buttons
    textParagraph.style.display = 'inline-block';
    removeTaskBtn.style.display = 'inline-block';
    editBtn.style.display = 'inline-block';

    // Save the tasks to the local storage. We save all the tasks here, this is why the function does not take any arguments
    saveTasksToTheLocalStorage();


    // Remove the added paddong
    textLi.classList.remove('add-45px-padding');
} // end of saveTask()


// Listener that saves the tasks after an edit
// The taskSectionList here is the UL element that holds the tasks
taskSectionList.addEventListener('click', (e) => {
    if (e.target.id === 'save-task-btn') {
        saveTask(e);
    }
});






/* **********************
 * 
 * 
 *  Mark a Task As Completed
 * 
 * 
 * **********************/


function completeTask(e) {

    // Declare the taskLi variable
    let taskLi;

    // Assign the <li> element to it
    if (e.target.tagName == 'LI') {  // if the clicked on el is the <li> we assign it directly
        taskLi = e.target;
    }
    if (e.target.tagName == 'P') {  // if the clicked on el is the text (p), then the <li> is it parent
        taskLi = e.target.parentNode;
    }

    // toggle the completed classes
    // Add the complete class on the <li> element's that's clicked on
    taskLi.classList.toggle('completed');
}

// We add the event listener to the <ul> element, so we can listen for clicks on its children
taskSectionList.addEventListener('click', (e) => {
    // if the clicked elelemnt is <li> or <p> 
    if (e.target.classList.contains('task') || e.target.classList.contains('task-text')) {
        completeTask(e); // complete the taks
        saveTasksToTheLocalStorage(); // save the taks in the localstorage, with the new completed status
    }
});










// Save the tasks with their completed status ( calass )
function saveTasksToTheLocalStorage() {
    const tasksNodeList = document.querySelectorAll('.task');


    // The returned value is a NodeList so it should be converted in array, in order to conver it in JSON later
    // Then, map the text of each list item to the array
    const tasksArray = Array.from(tasksNodeList).map((task, index) => {

        // Save the tasks and its completes status.
        // Check if the li element has a class of completed
        // and store it in separate storage entry, using its index as a marker
        let taskText = task.querySelector('.task-text').textContent;

        // Check if the task have a class of completed. The retuned values are:
        // true if the tasks has it
        // false if it does not have it
        let completedStatus = task.classList.contains('completed');

        // Here we save the completed status, with the index of the taks and true/false as its value
        // Example: task0_completed:"false"
        localStorage.setItem(`task${index}_completed`, JSON.stringify(completedStatus));

        // We return the text so it can be added in the tasksArray. It will be added in the same index there as the index if the completed status, so we can be sure they are always synchronized
        return taskText;
    })

    //Once we have the tasks in array, we can convert it JSON format and save it in the local storage
    const tasksJson = JSON.stringify(tasksArray);
    localStorage.setItem('tasks', tasksJson);
} // end of saveTasksToTheLocalStorage()








function loadDataFromTheLocalStorage() {
    if (localStorage.getItem('tasks')) {
        // Get the tasks and convert the back into array format
        let tasks = JSON.parse(localStorage.getItem('tasks'));

        // create <li> element with the data
        tasks.forEach((textContent, index) => {
            //createTask(textContent)

            // Get the completedStatus
            // The value of completedStatus here will be either true of false
            const completedStatus = JSON.parse(localStorage.getItem(`task${index}_completed`));

            // Create the task with its completed status
            createTask(textContent, completedStatus);
        });
    }
}

// Load the taks from the localStorage on page load
document.addEventListener('DOMContentLoaded', () => {
    loadDataFromTheLocalStorage();

    // make sure the page loads with clear input
    taskInput.value = '';
});

