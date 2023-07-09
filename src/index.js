const icon =document.querySelector(".toggle-btn")
const add = document.querySelector(".add");
const cl = document.querySelector(".close");
const form= document.querySelector("form");
const tasksList = document.querySelector(".task");
// const otherTaskslist = document.querySelector("#activity-section");
// // let taskName = document.querySelector("#task-name");
// // let imageUrl = document.querySelector("#im");
// // let taskDate = document.querySelector("#date");
// let modal = document.querySelector(".modal");
// let errorMessage = document.querySelector(".error-message");
let activitySection = document.querySelector("#activity-section");
// let activityStatus = document.querySelector(".activity-status");
// let taskArray = [];

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

// id 
// window.location = ".delete.php?id= {$id}"
taskForm.addEventListener("submit", function(event) {
    // event.preventDefault();

    // // task.id++;
    // taskName = document.querySelector("#task-name").value;
    // imageUrl = document.querySelector("#im").value;
    // taskDate = document.querySelector("#date").value;

    const task = {
        id: Date.now(),
        name: taskName,
        image: imageUrl,
        date: taskDate
    }
    

    // taskArray.push(task);

//     // clearForm()
    // document.getElementById('task-name').value = '';
    // document.getElementById('im').value = '';
    // document.getElementById('date').value = '';

//     let bestStreak = new Date('9999-12-31');

//     for (let i = 0; i < taskArray.length; i++) {
//         const task = taskArray[i];
//         const taskdate = new Date(task.date);

//         if(taskdate<bestStreak){
//             bestStreak = taskdate;
//         }
        
//     }
//     let taskWithEarliestDate = taskArray.find(task => new Date(task.date).getTime() === bestStreak.getTime());

//     // console.log(taskWithEarliestDate);
        
//         addTaskToBestStreak(taskWithEarliestDate);
 
//         addTaskToOtherStreaks(task);
});

// function addTaskToBestStreak(task) {
//     // Create a new task element
//     const taskElement = document.createElement('div');
//     taskElement.classList.add('sep');
//     taskElement.dataset.date = task.date;
//     taskElement.setAttribute('id', task.id);

//     // Set the task content
//     taskElement.innerHTML = `
//     <img src="${task.image}" alt="Task Image">
//     <h4>${task.name}</h4>
//     <p>${task.date}</p>
//     `
//     // Add the task to the best streak section
//     tasksList.innerHTML = '';
//     tasksList.appendChild(taskElement);
// }


const createModal = ()=>{
    let itemsArray = Array.from(activitySection.children)
    itemsArray.forEach((task)=>{
        task.addEventListener("click", ()=> {Modalcreate(task)});
        // console.log(task);
    })
    tasksList.addEventListener("click", ()=> {Modalcreate(tasksList)});
}

const Modalcreate = (task) => {
    let taskDisplay = document.querySelector(".overlay")
    let taskid = task.getAttribute('id');
    let taskImage = task.querySelector("img").getAttribute("src");
    let taskName = task.querySelector("h4").textContent;
    let taskDate = task.querySelector("p").textContent;
    let days = calculateNoOfDays(taskDate);
    let Modal = document.createElement('div');
    Modal.classList.add('modal');

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
            <button class="btn update" type="submit">UPDATE</button>
        </div>`

      Modal.style.cssText = 'display: flex;';
      Modal.style.flexDirection = 'column';
    //   Modal.style.background = 'white';
      while(taskDisplay.firstChild){
        taskDisplay.removeChild(taskDisplay.firstChild)
      }
      taskDisplay.appendChild(Modal)
      let closeModal = document.querySelector(".close-modal")
      let deleteModal = document.querySelector(".delete-modal")
      let update = document.querySelector(".update")
      closeModal.addEventListener('click', ()=> {closeModalBtn(Modal)});
      deleteModal.addEventListener('click', ()=> {delModalBtn(Modal,taskid)});
      update.addEventListener('click', ()=>{updateform(Modal,form, taskid)});
      
}

const closeModalBtn = (Modal) => {
    Modal.style.display = "none"
}

const delModalBtn = (Modal,id) => {
    Modal.style.display = "none"
    const taskElements = document.querySelectorAll(`#${CSS.escape(id)}`);
    console.log(taskElements);

    taskElements.forEach((item)=>{
        item.remove()
    })
    delUrl = `./delete.php?taskid=${encodeURIComponent(id)}`;
    window.location.href = delUrl;
}

const updateform = (Modal, form, id) => {
    console.log("User clicked");
    form.style.cssText = "display: grid; position: absolute;";
    Modal.style.display = "none";
    updateUrl = `./retrieve.php?taskid=${encodeURIComponent(id)}`;
    window.location.href = updateUrl;
}

// function addTaskToOtherStreaks(task) {
//     // Create a new task element
//     const taskElement = document.createElement('div');
//     taskElement.classList.add('sep');
//     taskElement.dataset.date = task.date;
//     taskElement.setAttribute('id', task.id);
//     // Set the task content
//     taskElement.innerHTML = `
//     <img src="${task.image}" alt="Task Image">
//     <h4>${task.name}</h4>
//     <p>${task.date}</p>
//     `;

//     // Add the task to the other streaks section
//     activitySection.appendChild(taskElement);
//     createModal();
// }
  
function calculateNoOfDays(taskDate) {
    let currentDate = new Date().getTime();

    let dayAdded = new Date(taskDate).getTime();

    let days = Math.floor((currentDate - dayAdded) / (1000 * 3600 * 24));


    if (days <= 0) {
    return days = 0;
    }
    return days;
}