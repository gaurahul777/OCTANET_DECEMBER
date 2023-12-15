const todoform = document.querySelector("#todo-form");
const todolist = document.querySelector(".todos");
const totalTasks = document.querySelector("#total-task");
const completedTasks = document.querySelector("#completed-tasks");
const remainingTasks = document.querySelector("#remaining-tasks");
const mainInput = document.querySelector("#todo-form input");
const timing = document.querySelector("#timing");

setInterval(() => {

    timing.innerHTML = `${new Date().toLocaleString()} `
},1000)

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

if (localStorage.getItem("tasks")) {
  tasks.map((task) => 
    createTask(task)
  );
}

todoform.addEventListener("submit", (e) => {
  e.preventDefault();
  const inputvalue = mainInput.value;

  if (inputvalue === "") {
    return;
  }

  const task = {
    id: new Date().getTime(),
    name: inputvalue,
    isCompleted: false,
  };
  // console.log(task);
  tasks.push(task);
  localStorage.setItem("tasks", JSON.stringify(tasks));

  createTask(task);
  todoform.reset();
  mainInput.focus();
});

todolist.addEventListener("click", (e) => {
    // e.preventDefault();
  // console.log(e.target)
  if (e.target.classList.contains("removetask") || e.target.parentElement.classList.contains('removetask')) {
    const taskId = e.target.closest("li").id;
    // console.log(taskId);
    removeTask(taskId);
  }
});

todolist.addEventListener('keydown', (e) => {
  if (e.keyCode === 13) {
    e.preventDefault()
    e.target.blur()
  }
})

todolist.addEventListener('input', (e) => {
  const taskId = e.target.closest('li').id
  // console.log(e.target);
  // console.log(taskId);
  updateTask(taskId,e.target)
})


// todolist.addEventListener("click", (e) => {
//   if (
//     e.target.classList.contains("remove-task") &&
//     !e.target.classList.contains("disabled")
//   ) {
//     e.target.classList.add("disabled");

//     const taskId = e.target.closest("li").id;
//     removeTask(taskId);

//     setTimeout(() => {
//       e.target.classList.remove("disabled");
//     }, 1000); // Adjust the delay as needed
//   }
// });

// function debounce(func, wait) {
//   let timeout;
//   return function () {
//     const context = this,
//       args = arguments;
//     clearTimeout(timeout);
//     timeout = setTimeout(() => {
//       func.apply(context, args);
//     }, wait);
//   };
// }

// const debouncedRemoveTask = debounce((taskId) => {
//   removeTask(taskId);
// }, 1000); // Adjust the delay as needed

// todolist.addEventListener("click", (e) => {
//     if (e.target.classList.contains("remove-task")) {
//         const taskId = e.target.closest("li").id;
//         debouncedRemoveTask(taskId);
//     }
// });

function countTask() {
  const completedTasksArray = tasks.filter((task) => task.isCompleted === true);
  totalTasks.textContent = tasks.length;
  completedTasks.textContent = completedTasksArray.length;
  remainingTasks.textContent = tasks.length - completedTasksArray.length;
}

function createTask(task) {
  const taskEl = document.createElement("li");
  taskEl.setAttribute("id", task.id);

  if (task.isCompleted) {
    taskEl.classList.add("complete");
  }

  const taskElMarkup = `
<div>
<input type="checkbox" name="tasks" id="${task.id}" ${
    task.isCompleted ? "checked" : ""
  }>
<span ${!task.isCompleted ? "contenteditable" : ""}>${task.name}</span>
</div>
<button title="Remove the  ${task.name}task"
class='removetask'>
<svg viewBox="0 0 24 24" fill="none" class="removetask">
<path d="M17.25 17.25L6.75 6.75" stroke="#A4D0E3"
stroke-width="1.5" stroke-linecap="round"
stroke-linejoin="round"/>
<path d="M17.25 6.75L6.75 17.25" stroke="#A4D0E3"
stroke-width="1.5" stroke-linecap="round"
stroke-linejoin="round"/>
</svg>
</button>

    `;

  taskEl.innerHTML = taskElMarkup;
  todolist.appendChild(taskEl);
  countTask();
}


function removeTask(taskId) {
  tasks = tasks.filter((task) => task.id !== parseInt(taskId));

  localStorage.setItem("tasks", JSON.stringify(tasks));

  document.getElementById(taskId).remove();
  countTask();
}

function updateTask(taskId, eL) {
  
  const task=tasks.find((task)=>task.id===parseInt(taskId))
  if (eL.hasAttribute('contenteditable')) {
    task.name = eL.textContent
    // console.log('uuuj')
  } else {
     const span=eL.nextElementSibling
    const parent = eL.closest('li')
    
    task.isCompleted = !task.isCompleted
    
    if (task.isCompleted) {
      span.removeAttribute('contenteditable')
      parent.classList.add('complete')
    }
    else {
      span.setAttribute('contenteditable','true')
      parent.classList.remove('complete')
    }
  }
  
  localStorage.setItem('tasks',JSON.stringify(tasks))
countTask()

}
