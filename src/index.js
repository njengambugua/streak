const icon =document.querySelector(".toggle-btn")
const add = document.querySelector(".add");
const cl = document.querySelector(".close");
const taskForm = document.querySelector("#taskForm");
const tasksList = document.querySelector("#task");
const otherTaskslist = document.querySelector("#activity-section");
const taskName = document.querySelector("#task-name").value;
const imageUrl = document.querySelector("#im").value;
const taskDate = document.querySelector("#date").value;
let modal = document.querySelector(".modal");
let errorMessage = document.querySelector(".error-message");
let activitySection = document.querySelector("#activity-section");
let activityStatus = document.querySelector(".activity-status");
let taskId = 1
const taskArray = [];
// const task = {
//     id: taskId,
//     name: taskName,
//     Image: imageUrl,
//     date: taskDate
// }
// console.log(task)

icon.addEventListener("click",()=>{
    if (icon.className === "bi bi-plus-circle toggle-btn") {
        icon.className = "bi bi-x-circle toggle-btn";
        add.style.display = "none"
        cl.style.display = "flex"
    } else {
        icon.className = "bi bi-plus-circle toggle-btn";
        cl.style.display = "none"
        add.style.display = "flex"
    }
})

let bestStreak = null;

taskForm.addEventListener("submit", function(event) {
    event.preventDefault();
    // addTask();

    const taskName = document.querySelector("#task-name").value;
    const imageUrl = document.querySelector("#im").value;
    const taskDate = document.querySelector("#date").value;

    const task = {
        id: taskId,
        name: taskName,
        image: imageUrl,
        date: taskDate
    };

    taskId++;
    console.log(task);

    taskArray.push(task)

    clearForm()

    if (isNewBestStreak(task.date)) {
        addTaskToBestStreak(task);
      } else {
        addTaskToOtherStreaks(task);
     }
    
      document.getElementById('task-name').value = '';
      document.getElementById('im').value = '';
      document.getElementById('date').value = '';
});


function isNewBestStreak(date) {
    // Get the current best streak date
    const bestStreakDate = tasksList.children[0]?.dataset.date;
  
    // If there is no best streak or the new date is older, it is a new best streak
    return !bestStreakDate || date < bestStreakDate;
}


function addTaskToBestStreak(task) {

    if (bestStreak) {
        addTaskToOtherStreaks(bestStreak);
      }
    
      // Set the new best streak
      bestStreak = task;    
  
    // Create a new task element
    const taskElement = document.createElement('div');
    taskElement.classList.add('task');
    taskElement.dataset.date = task.date;
  
    // Set the task content
    taskElement.innerHTML = `
      <img src="${task.image}" alt="Task Image">
      <h4>${task.name}</h4>
      <p>${task.date}</p>
    `;
  
    // Add the task to the best streak section
    tasksList.innerHTML = '';
    tasksList.appendChild(taskElement);
}


const createModal = (task)=>{
    let itemsArray = Array.from(otherTaskslist.children)
    itemsArray.forEach((task)=>{
        task.addEventListener("click", ()=> {Modalcreate(task)});
    })
    tasksList.addEventListener("click", ()=> {Modalcreate(tasksList)});
}

const Modalcreate = (task) => {
    let taskDisplay = document.querySelector(".overlay")
    let taskid = task.getAttribute("id");
    let taskImage = task.querySelector("img").getAttribute("src");
    let taskName = task.querySelector("h4").textContent;
    let taskDate = task.querySelector("p").textContent;
    let days = calculateNoOfDays(taskDate);
    let Modal = document.createElement('div');
    Modal.classList.add('modal')

    Modal.innerHTML = `
    <div class="modal-image">
        <img src="${taskImage}" alt="Task Image">
    </div>
    <h4 class="activity-name">${taskName}</h4>
    <p class="date">${taskDate}</p>
    <p class="time-passed">${days} days ago</p>
    <div class="close-delete-btn">
        <button class="btn close-modal" type="submit">CLOSE</button>
        <button class="btn delete-modal" type="submit">DELETE</button>
    </div>
    `

      Modal.style.cssText = 'display: flex;';
      Modal.style.flexDirection = 'column';
      Modal.style.background = 'white';
      while(taskDisplay.firstChild){
        taskDisplay.removeChild(taskDisplay.firstChild)
      }

      taskDisplay.appendChild(Modal)
      let closeModal = document.querySelector(".close-modal")
      let deleteModal = document.querySelector(".delete-modal")
      closeModal.addEventListener('click', ()=> {closeModalBtn()});
      deleteModal.addEventListener('click', ()=> {delModalBtn()});
}

const closeModalBtn = () => {
    return (modal.style.display = 'none');
}

function addTaskToOtherStreaks(task) {
    // Create a new task element
    const taskElement = document.createElement('div');
    taskElement.classList.add('task');
    taskElement.dataset.date = task.date;
    // Set the task content
    taskElement.innerHTML = `
      <img src="${task.image}" alt="Task Image">
      <h4>${task.name}</h4>
      <p>${task.date}</p>
    `;
  
    // Add the task to the other streaks section
    activitySection.appendChild(taskElement);
    createModal();
}
  
function calculateNoOfDays(taskDate) {
    let currentDate = new Date().getTime();

    let dayAdded = new Date(taskDate).getTime();

    let days = Math.floor((currentDate - dayAdded) / (1000 * 3600 * 24));


    if (days <= 0) {
    return days = 0;
    }
    return days;
}

function clearForm() {
    document.querySelector("#task-name").value.value = '',
    document.querySelector("#im").value.value = '',
    document.querySelector("#date").value.value = ''

    return true;
}

