const todoform = document.querySelector('#todo-form')
const mainInput = document.querySelector('#todo-form input')
const todolist = document.querySelector('.todos')
const timing = document.querySelector("#timing");
const totaltask = document.querySelector("#total-task");
const remainingtask = document.querySelector("#remaining-tasks");
const completedtask = document.querySelector("#completed-tasks");

setInterval(() => {
  timing.innerHTML = `${new Date().toLocaleString()} `;
}, 1000);


let tasks = JSON.parse(localStorage.getItem('tasks'))||[]
// console.log(tasks)
if (localStorage.getItem('tasks')) {
    tasks.map((task) => {
        // console.log(task)
        createTask(task)
    })
}

todoform.addEventListener('submit', (e) => {
    e.preventDefault()
    const inputvalue = mainInput.value
    if (inputvalue === "") {
        return
    }
    
    const task = {
        id:new Date().getTime(),
        name: inputvalue,
        isCompleted:false,
    }

    tasks.push(task)
    // console.log(tasks)
    localStorage.setItem('tasks',JSON.stringify(tasks))
  
    createTask(task)
    todoform.reset()
    countTask()
})

todolist.addEventListener('click', (e) => {
    if (e.target.classList.contains('remove-task') || (e.target.parentElement.classList.contains('remove-task')))
    {
        // console.log('hello')
        const taskId=e.target.closest('li').id
        // console.log(li)

       removeTask(taskId)
       
       countTask()
    }
})

todolist.addEventListener('input', (e) => {
    // console.log(e.target)
      const taskId = e.target.closest("li").id;

    updateTask(taskId,e.target)
})

function createTask(task) {
    const li = document.createElement('li')
    li.setAttribute('id',task.id)
    li.innerHTML = `<div>
            <input type="checkbox" name="tasks" id=${task.id}>
            <span contenteditable>${task.name}</span>
        </div>
        <button title="Remove task" class="remove-task">
                        
<svg viewBox="0 0 24 24" fill="none" class="remove-task">
<path d="M17.25 17.25L6.75 6.75"
stroke="#A4D0E3" stroke-width="1.5"
stroke-linecap="round"
stroke-linejoin="round"/>
<path d="M17.25 6.75L6.75 17.25"
stroke="#A4D0E3" stroke-width="1.5"
stroke-linecap="round"
stroke-linejoin="round"/>
</svg>
            
        </button>`;
    // console.log(li)
    todolist.appendChild(li)
    
}

function removeTask(taskId) {
    
    tasks = tasks.filter((task) => task.id !== parseInt(taskId))
    localStorage.setItem('tasks',JSON.stringify(tasks))
    document.getElementById(taskId).remove()
}

function updateTask(taskId, el) {
    // console.log(el)
    const task = tasks.find((task) => task.id === parseInt(taskId))
    
    if (el.hasAttribute('contentEditable')) {
        // console.log(el)
    
        task.name = el.textContent; 
    } else {
        
        task.isCompleted=!task.isCompleted
        const span = el.nextElementSibling
        const parent=el.closest('li')
    
        if (task.isCompleted) {
span.removeAttribute("contenteditable");
            parent.classList.add("complete");
        } else {
            span.setAttribute('contenteditable','true')
            parent.classList.remove('complete')
        }
        
    }
    
    
    // console.log(tasks)

    // task.name = span.textContent; 
    // console.log(task.name)
    
    localStorage.setItem('tasks', JSON.stringify(tasks))
    countTask()
}

function countTask() {
   const completedtaskArray= tasks.filter((task)=>task.isCompleted===true)
    completedtask.textContent = completedtaskArray.length;
    totaltask.textContent = tasks.length;
    
    remainingtask.textContent = tasks.length - completedtaskArray.length;
}
// countTask()