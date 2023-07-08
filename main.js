const ipBox = document.querySelector('.container .toDo .ip input'),
addText = document.querySelector('.container .toDo .ip button'),
todoList = document.querySelector('.container .list'),
filters = document.querySelectorAll('.container .control .status span'),
clear = document.querySelector('.container .control .delete')

ipBox.addEventListener('keyup', enterKey);
addText.addEventListener('click', addTask);
todoList.addEventListener('click', checkTask);
clear.addEventListener('click', emptyTask);

let todos = JSON.parse(localStorage.getItem("todo-list"));
let editId;
let isEdited = false;

function showTodo(status) {
    let li = "";
    if(todos) {
        todos.forEach((todo, id) => {
            let isCompleted = todo.status == "completed" ? "checked" : ""; // lưu lại event click mỗi khi refresh lại trang
            if(status == todo.status || status == "all") {
                li += `<li id="${id}" class="${isCompleted}"> 
                            ${todo.name} 
                            <span onclick="editTask(${id}, '${todo.name}')" class="edit"><i class="bx bx-edit"></i></span> 
                            <span onclick="deleteTask(${id})" class="trash"><i class="bx bxs-trash-alt"></i>
                       </li>`;
            }
        });
        todoList.innerHTML = li || `<span> You don't have any task here.`;
    }
}
showTodo("all");

function enterKey(e) {
    let userTask = ipBox.value.trim();
    if(e.key === "Enter" && userTask) {
        if(!isEdited) {
            if(!todos) {
                todos = [];
            }
            let taskInfo = {name: userTask, status: 'pending'};
            todos.push(taskInfo);
        } else {
            isEdited = false;
            todos[editId].name = userTask;
        }
        ipBox.value = "";
        localStorage.setItem("todo-list", JSON.stringify(todos));
        showTodo("all");
    }
}

function addTask() {
    let userTask = ipBox.value.trim();
    if(userTask === '') {
        alert('You must write something!');
    } else {
        if(!isEdited) {
            if(!todos) {
                todos = [];
            }
            let taskInfo = {name: userTask, status: 'pending'};
            todos.push(taskInfo);
        } else {
            isEdited = false;
            todos[editId].name = userTask;
        }
        ipBox.value = "";
        localStorage.setItem("todo-list", JSON.stringify(todos));
        showTodo("all");
    }
}

function checkTask(e) {
    if(e.target.tagName === 'LI' && !e.target.classList.contains('checked')) {
        e.target.classList.add('checked');
        todos[e.target.id].status = "completed";
    } else if (e.target.tagName === 'LI' && e.target.classList.contains('checked')) {
        e.target.classList.remove('checked');
        todos[e.target.id].status = "pending";
    }
    localStorage.setItem("todo-list", JSON.stringify(todos));
}

function editTask(taskId, taskName) {
    ipBox.value = taskName;
    editId = taskId;
    isEdited = true;
}

function deleteTask(e) {
    todos.splice(e, 1);  
    localStorage.setItem("todo-list", JSON.stringify(todos));
    showTodo("all");
}

filters.forEach(option => {
    option.addEventListener("click", () => {
        document.querySelector(".control .status span.active").classList.remove("active");
        option.classList.add("active");
        showTodo(option.id);
    })
})
 
function emptyTask() {
    todos.splice(0, todos.length);
    localStorage.setItem("todo-list", JSON.stringify(todos));
    showTodo("all");
}