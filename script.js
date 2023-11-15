let inputBox = document.getElementById('input-box');
let allTasks = document.getElementById('all-tasks');
let btn = document.getElementById('btn');
let myModal = document.getElementById('myModal');

//Function to add tasks entered by the user
const addTask = () => {
    let newLi = document.createElement('li');
    let uncheckedTask = document.createElement('i');
    let deleteTaskBtn = document.createElement('i');

    allTasks.insertAdjacentElement('afterbegin', newLi);
    newLi.innerHTML = inputBox.value;

    newLi.insertAdjacentElement('afterbegin', uncheckedTask);
    uncheckedTask.classList.add('fa-regular', 'fa-circle');

    newLi.insertAdjacentElement('beforeend', deleteTaskBtn);
    deleteTaskBtn.classList.add('delete-task');
    deleteTaskBtn.classList.add('fa-regular', 'fa-circle-xmark');

    deleteTaskBtn.addEventListener('mouseover', () => {
        deleteTaskBtn.setAttribute('title', 'Delete Task');
    })
}

//EventListener on ADD Button
btn.addEventListener('click', () => {
    if (inputBox.value === '') {
        myModal.style.translate = '1rem 0';
        setTimeout(() => {
            myModal.style.translate = '20rem 0'
        }, 2000)
    } else {
        addTask();
    }
    inputBox.value = ''
    saveData();
})
//EventListener on INPUT field when Enter Key is pressed
inputBox.addEventListener('keydown', (e) => {
    if (e.code === 'Enter') {
        if (inputBox.value === '') {
            myModal.style.translate = '1rem 0';
            setTimeout(() => {
                myModal.style.translate = '20rem 0'
            }, 2000)
        }else{
            addTask();
        } 
        inputBox.value = ''
    } else {

    }
    saveData();
})

//Function to toggle between done and undone tasks
allTasks.addEventListener('click', (e) => {
    const checkTask = () => {
        if (e.target.tagName === "LI") {
            e.target.classList.toggle('checked');
            let icon = e.target.firstElementChild;
            if (icon.classList.contains('fa-circle')) {
                icon.classList.remove('fa-regular', 'fa-circle')
                icon.classList.add('fa-solid', 'fa-circle-check')
            } else {
                icon.classList.remove('fa-solid', 'fa-circle-check');
                icon.classList.add('fa-regular', 'fa-circle');
            }
            saveData();
        }
    }
    checkTask();
    if (e.target.tagName === 'I' && e.target.classList.contains('fa-circle-xmark')) {
        e.target.parentElement.remove();
        saveData();
    }
}, false);

// Function to save data in Local Storage
const saveData = () => {
    localStorage.setItem("data", allTasks.innerHTML);
}

//Function to show data from Local Storage
const showTask = () => {
    let storedHtml = localStorage.getItem("data");
    allTasks.innerHTML = storedHtml;
}

showTask();