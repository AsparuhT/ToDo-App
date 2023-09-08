
// Validate the input if the task <input> and the edit <textarea>
function validateInput(textInput) {

    // Trim the input
    let validatedText = textInput.trim();

    // Add min-max size check
    const minChars = 1;
    const maxChars = 500;
    if (validatedText.length < minChars) {
        alert('The task title should contain at lest 1 character. ');
        return false;
    }

    if (validatedText.length > maxChars) {
        let textLenght = validatedText.length;
        alert(`The task title can be up to of 500 charcters. At the moment the task title is ${textLenght} characters long. `);
        return false;
    }

    // If all the checks are passes, return the validatedText
    return validatedText;
}




// Limit the tasks to a certain number
function tasksLimit(tasksList) {
    const maxTasks = 31;

    if (tasksList.length > maxTasks) {
        alert('No more then 31 tasks can be created at a time . ');
        return false;
    }

    return true;
}




