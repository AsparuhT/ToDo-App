

const taskInput = document.querySelector('#task-input');
const addTaskBtn = document.querySelector('#add-task-btn');
// const removeTaskBtn = document.querySelectorAll('.remove-task-btn');
// const editTaskBtn = document.querySelectorAll('.edit-task-btn');
const taskSectionList = document.querySelector('.tasks-section__list');



/* **********************
 * 
 * 
 *  Create Task
 * 
 * 
 * **********************/

// Function that creates the <li> element that will hold the task
// also set a default value for the completed status
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
    createTask(taskInput.value);
    taskInput.value = '';
    taskInput.focus();
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

    //Hide the original text and display the input. Also hide the Remove <button>
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

    // Append the <textarea> element to the tasks list, on top of the button
    taskLi.appendChild(editTextarea);
    taskLi.appendChild(saveBtn);

    // Add padding on edit so the Save button is not close the buttons below
    taskLi.classList.add('add-45px-padding');

}












// Listener that edit a task
// editTaskBtn.forEach(editTaskBtn => {
//     taskSectionList.addEventListener('click', (e) => {
//         // Target the <li> element that holds the clicked-on button
//         let taskLi = e.target.parentNode;
//         // Check if the elements that's clicked on is the edit button
//         if (e.target.classList.contains('edit-task-btn')) {
//             editTask(taskLi);
//         }
//     });
// });



// Listener that removes the task from the task-list
// removeTaskBtn.forEach(removeTaskBtn => {
//     taskSectionList.addEventListener('click', (e) => {
//         // Target the <li> element that holds the clicked-on button
//         let taskLi = e.target.parentNode;
//         // Check if the elements that's clicked on is the remove button
//         if (e.target.classList.contains('remove-task-btn')) {
//             // Remove that <li> element from the list
//             taskLi.remove();

//             // Save the tasks to the local storage
//             saveTasksToTheLocalStorage();
//         }
//     });
// });






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

    // Remove the save button and the text area
    saveBtn.remove();
    textArea.remove();


    // Show the paragraph and the remove <button>
    textParagraph.style.display = 'inline-block';
    removeTaskBtn.style.display = 'inline-block';
    editBtn.style.display = 'inline-block';

    // Save the tasks to the local storage
    saveTasksToTheLocalStorage();


    // Remove the added paddong
    textLi.classList.remove('add-45px-padding');
}


// Listener that saves the tasks after an edit
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

    // Declare the taskLi and taskP variable
    let taskLi;

    // Assign the <li> element to it
    if (e.target.tagName == 'LI') {
        taskLi = e.target;
    }
    if (e.target.tagName == 'P') {
        taskLi = e.target.parentNode;
    }

    // Apply the completed styling
    // taskLi.style.background = '#19c37d';
    // taskLi.querySelector('.task-text').style.color = '#fff';
    // taskLi.style.transition = '1.3s';
    // taskLi.style.borderBottom = '1px solid #cddcd3';
    // taskLi.querySelector('.task-text').style.textDecoration = 'line-through';
    // taskLi.querySelector('.task-text').classList.add('completed');

    // toggle the completed classes
    taskLi.classList.toggle('completed');
}


taskSectionList.addEventListener('click', (e) => {
    if (e.target.classList.contains('task') || e.target.classList.contains('task-text')) {
        completeTask(e);
        saveTasksToTheLocalStorage();
    }
});

















/* **********************
 * 
 * 
 *  Save The Task To The Local Storage
 * 
 * 
 * **********************/

// function saveTasksToTheLocalStorage() {
//     const tasksNodeList = document.querySelectorAll('.task');

//     // The returned value is a NodeList so it should be converted in array
//     // Then, map the text of each list item to the array
//     const tasksArray = Array.from(tasksNodeList).map((task) => task.querySelector('.task-text').textContent);

//     //Once we have the tasks in array, we can convert it JSON format and save it in the local storage
//     const tasksJson = JSON.stringify(tasksArray);
//     localStorage.setItem('tasks', tasksJson);
// }



// Load the data from the localStorage
// function loadDataFromTheLocalStorage() {
//     if (localStorage.getItem('tasks')) {
//         // Get the tasks and convert the back into array format
//         let tasks = JSON.parse(localStorage.getItem('tasks'));

//         // create <li> element with the data
//         tasks.forEach((textContent) => createTask(textContent));
//     }
// }

// // Load the taks from the localStorage on page load
// document.addEventListener('DOMContentLoaded', () => {
//     loadDataFromTheLocalStorage();
// });




// Save the tasks with their classes
function saveTasksToTheLocalStorage() {
    const tasksNodeList = document.querySelectorAll('.task');
    //let completedStatus;

    // The returned value is a NodeList so it should be converted in array
    // Then, map the text of each list item to the array
    const tasksArray = Array.from(tasksNodeList).map((task, index) => {

        // How to check for completed class?
        // Check if the li element has a class of completed
        // and store it in separate storage array, using its index as a marker
        let taskText = task.querySelector('.task-text').textContent;
        let completedStatus = task.classList.contains('completed');

        localStorage.setItem(`task${index}_completed`, JSON.stringify(completedStatus));

        return taskText;
    })

    //Once we have the tasks in array, we can convert it JSON format and save it in the local storage
    const tasksJson = JSON.stringify(tasksArray);
    localStorage.setItem('tasks', tasksJson);

    //console.log(localStorage);
}

//console.log(localStorage);





function loadDataFromTheLocalStorage() {
    if (localStorage.getItem('tasks')) {
        // Get the tasks and convert the back into array format
        let tasks = JSON.parse(localStorage.getItem('tasks'));

        // create <li> element with the data
        tasks.forEach((textContent, index) => {
            //createTask(textContent)

            // Get the completedStatus
            const completedStatus = JSON.parse(localStorage.getItem(`task${index}_completed`));

            createTask(textContent, completedStatus);

            //console.log(completedStatus);
        });
    }
}

// Load the taks from the localStorage on page load
document.addEventListener('DOMContentLoaded', () => {
    loadDataFromTheLocalStorage();

    // make sure the page loads with clear input
    taskInput.value = '';
});




console.log(JSON.parse(localStorage.getItem(`task1_completed`)));