let taskList = document.getElementById("taskList");

window.onload = loadTasks;

function addTask(){
    let input = document.getElementById("taskInput");
    if(input.value === "") return;

    let task = input.value;
    createTask(task,false);
    saveTask(task,false);

    input.value = "";
}

function createTask(task,completed){
    let li = document.createElement("li");
    if(completed) li.classList.add("completed");

    li.innerHTML = `
        <span>${task}</span>
        <div class="actions">
            <button class="done-btn" onclick="toggleTask(this)">✔</button>
            <button class="del-btn" onclick="deleteTask(this)">🗑</button>
        </div>
    `;
    taskList.appendChild(li);
}

function toggleTask(btn){
    let li = btn.parentElement.parentElement;
    li.classList.toggle("completed");
    updateStorage();
}

function deleteTask(btn){
    btn.parentElement.parentElement.remove();
    updateStorage();
}

function saveTask(task,completed){
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.push({task,completed});
    localStorage.setItem("tasks",JSON.stringify(tasks));
}

function loadTasks(){
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.forEach(t => createTask(t.task,t.completed));
}

function updateStorage(){
    let tasks = [];
    document.querySelectorAll("li").forEach(li=>{
        tasks.push({
            task: li.querySelector("span").innerText,
            completed: li.classList.contains("completed")
        });
    });
    localStorage.setItem("tasks",JSON.stringify(tasks));
}
