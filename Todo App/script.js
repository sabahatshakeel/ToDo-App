let tasks = [];
let completedTasks = [];
let editIndex = null;  // Track the index of the task being edited

const addOrUpdateTask = (taskText, priority) => {
    if (editIndex !== null) {
        // Update an existing task
        tasks[editIndex] = { text: taskText, priority: priority, completed: false };
        editIndex = null;
    } else {
        // Add a new task
        tasks.push({ text: taskText, priority: priority, completed: false });
    }
    updateUI();
    document.getElementById("taskForm").reset(); // Clear form fields
};

const markTaskComplete = (index) => {
    const completedTask = tasks.splice(index, 1)[0];
    completedTask.completed = true;
    completedTasks.push(completedTask);
    updateUI();
};

const deleteTask = (index, isCompleted = false) => {
    if (isCompleted) {
        completedTasks.splice(index, 1);
    } else {
        tasks.splice(index, 1);
    }
    updateUI();
};

const editTask = (index) => {
    const task = tasks[index];
    document.getElementById("taskInput").value = task.text;
    document.getElementById("prioritySelect").value = task.priority;
    editIndex = index;  // Set the task index being edited
};

const updateUI = () => {
    const taskList = document.getElementById("taskList");
    const completedList = document.getElementById("completedList");
    
    taskList.innerHTML = "";
    completedList.innerHTML = "";

    tasks.forEach((task, index) => {
        const listItem = document.createElement("li");
        listItem.classList.add("task-item");
        listItem.innerHTML = `
            <p>${task.text} <span class="priority ${task.priority}">${task.priority}</span></p>
            <div>
                <button onclick="markTaskComplete(${index})">&#10003;</button>
                <button onclick="editTask(${index})">✎</button>
                <button onclick="deleteTask(${index})">&#10006;</button>
            </div>
        `;
        taskList.appendChild(listItem);
    });

    completedTasks.forEach((task, index) => {
        const listItem = document.createElement("li");
        listItem.classList.add("task-item");
        listItem.innerHTML = `
            <p><s>${task.text}</s> <span class="priority ${task.priority}">${task.priority}</span></p>
            <button onclick="deleteTask(${index}, true)">&#10006;</button>
        `;
        completedList.appendChild(listItem);
    });
};

document.getElementById("taskForm").addEventListener("submit", function (e) {
    e.preventDefault();
    const taskInput = document.getElementById("taskInput");
    const prioritySelect = document.getElementById("prioritySelect");
    
    const taskText = taskInput.value.trim();
    const priority = prioritySelect.value;

    if (taskText) {
        addOrUpdateTask(taskText, priority);
    }
});
