// I. Variables -  Global--> another way to name it
// 1. Todo input
let $todoInput;
// 2. Alert info
let $alertInfo;
// 3. Add button
let $addBtn;
// 4. Todo List
let $ulList;
// 5. New task - new li element
let $newTask;
// 6. All tasks
let $allTask;
// 7. Task id
let $taskId;
// 8. Popup
let $popup;
// 9. Popup info
let $popupInfo;
// 10. Edited todo
let $editedTodo;
// 11. Popup Input
let $popupInput;
// 12. Edit/Accept Popup button
let $acceptPopupBtn;
// 13. Close/Cancel popup button
let $cancelPopupBtn;

// II. Functions
// 1. Main function responsible for preparing DOM to the work
const main = () => {
    prepareDOMElements();
    prepareDOMEvents();
};

// 2. Add new task method
const addNewTask = () => {
    // console.log('ok');
    // Check if the todoInput is not empty
    if ($todoInput.value !== '') {
        // First create id as unique element of task
        $taskId = Math.round(Math.random() * (new Date() * 16));
        // Create new Task as an element of our Tasks list
        $newTask = document.createElement('li');
        // Add the text to our new task
        $newTask.innerText = $todoInput.value;
        // Add id to our new task
        // $newTask.id = `${$taskId}`;
        // OR
        $newTask.setAttribute('id', `${$taskId}`);
        // Add the task to our list of tasks
        $ulList.appendChild($newTask);
        // Clear the todo and alert
        $todoInput.value = '';
        if ($allTask.length !== 0) {
            $alertInfo.innerText = 'You still have something to do!';
        } else {
            $alertInfo.innerText = 'There is no tasks on the list!';
        }
        // Add tools to our task
        addTools();
    } else {
        // console.log('Empty task');
        $alertInfo.textContent = 'Task can not be empty!';
    }
};

// 3. Adding on enter
const enterCheck = () => {
    if (event.keyCode === 13) {
        addNewTask();
    }
};

// 4. Closing  and  clear popup on cancel
const closeAndClearPopup = () => {
    $popupInput.value = '';
    $popup.style.display = 'none';
    $popupInfo.innerText = '';
};

// 5. Update task content
const editTask = event => {
    console.log(event, event.target, event.target.closest('li'), Number(event.target.closest('li').id), typeof event.target.closest('li').id);
    // Assign popupInput value to specified task
    const taskToEdit = event.target.closest('li').id;
    // // console.log(taskToEdit, taskToEdit.id, typeof taskToEdit.id, typeof Number(taskToEdit));
    console.log(taskToEdit);
    $editedTodo = document.getElementById(`${taskToEdit}`);
    console.log($editedTodo);
    console.log($editedTodo.textContent);
    // Add the text from our task to popupInput to edit it if typo or set a new name
    $popupInput.value = $editedTodo.firstChild.textContent;


    // And open $popup
    $popup.style.display = 'flex';
};

// Set new task name on accept button and close popup
const setNewTaskName = () => {
    // Check if the new name is not empty in popup input
    if ($popupInput.value !== '') {
        // If the text is in popup than exchange our edited app
        console.log($editedTodo, $editedTodo.textContent);
        // Set the new name of our task
        $editedTodo.firstChild.textContent = $popupInput.value;
        // Close and clear our popup
        closeAndClearPopup();
    } else {
        // If the text is empty in popupInput than show alert
        $popupInfo.innerText = 'The Task value can not be empty !';
    }
};

// III. Help Functions
// 1. Prepare dom elements method - creates the DOM EL
const prepareDOMElements = () => {
    $todoInput = document.querySelector('.todo-input');
    $alertInfo = document.querySelector('.alert-info');
    $addBtn = document.querySelector('.add-btn');
    $ulList = document.querySelector('.todo-list ul');
    $allTask = document.getElementsByTagName('li');
    $popup = document.querySelector('.popup');
    $popupInfo = document.querySelector('.popup-info');
    $popupInput = document.querySelector('.popup-input');
    $acceptPopupBtn = document.querySelector('.accept');
    $cancelPopupBtn = document.querySelector('.cancel');
};
// 2. Prepare the Event listeners for the project
const prepareDOMEvents = () => {
    $addBtn.addEventListener('click', addNewTask);
    $todoInput.addEventListener('keyup', enterCheck);
    $ulList.addEventListener('click', checkTool);
    $cancelPopupBtn.addEventListener('click', closeAndClearPopup);
    $acceptPopupBtn.addEventListener('click', setNewTaskName);
};
// 3. Adding tools to the task
const addTools = () => {
    // Create div with tools class
    const toolsPanel = document.createElement('div');
    // Add class tools to the panel
    toolsPanel.classList.add('tools');
    // We can add the panel to our task
    $newTask.appendChild(toolsPanel);
    // Now add all the buttons to our toolsPanel
    // 1. Create complete btn with class
    const completeBtn = document.createElement('button');
    // Add the adequate class to our button
    completeBtn.classList.add('complete');
    // Add icon to our button
    completeBtn.innerHTML = `<i class="fas fa-check"></i>`;
    // 2. Create edit btn with class
    const editBtn = document.createElement('button');
    // Add the adequate class to our button
    editBtn.classList.add('edit');
    // Add icon to our button
    editBtn.innerHTML = `<i class="fas fa-edit"></i>`;
    // 3. Create delete btn with class
    const deleteBtn = document.createElement('button');
    // Add the adequate class to our button
    deleteBtn.classList.add('delete');
    // Add icon to our button
    deleteBtn.innerHTML = `<i class="fas fa-times"></i>`;
    // Add the buttons to the toolsPanel
    toolsPanel.appendChild(completeBtn);
    toolsPanel.appendChild(editBtn);
    toolsPanel.appendChild(deleteBtn);
};

// 4. Checking which element/task is clicked
const checkTool = event => {
    // console.log(event.target.id, event.target);
    // Prepare variables to refactor code
    // Statement if wit using closest button
    // With the secure if we clicn on the text or out of buttons somewhere
    if (event.target.classList.value !== '') {
        // Prepare variables to refactor code
        const completeTool = event.target.closest('button').classList.contains('complete');
        // console.log(completeTool);
        const editTool = event.target.closest('button').classList.contains('edit');
        // console.log(editTool);
        const deleteTool = event.target.closest('button').classList.contains('delete');
        // Closest li used for updating the specified task 
        const specifiedTask = event.target.closest('li');
        if (completeTool) {
            // console.log('complete was clicked:)');
            specifiedTask.classList.toggle('completed');
            event.target.closest('button').classList.toggle('completed');
        } else if (editTool) {
            // console.log('edit was clicked');
            // Open the popup
            editTask(event);
        } else if (deleteTool) {
            // console.log('delete was clicked');
            // specifiedTask.innerHTML = '';
            // Or with help function
            deleteTodo(specifiedTask);
        }
    };
};

// 5. Delete specified task
const deleteTodo = specifiedTask => {
    specifiedTask.remove();
    // console.log($alertInfo.innerText);
    // Add an info if there is no tasks
    if ($allTask.length !== 0) {
        $alertInfo.innerText = 'You still have something to do!';
    } else {
        $alertInfo.innerText = 'There is no tasks on the list!';
    }
};


// IV.Event Listeners
// 1. Preparing page to work
document.addEventListener('DOMContentLoaded', main);