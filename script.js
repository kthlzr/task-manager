document.addEventListener("DOMContentLoaded", () => {
    // Load Navbar
    fetch("./components/navbar.html")
        .then((response) => response.text())
        .then((data) => {
            document.getElementById("navbar-container").innerHTML = data;

            // Initialize Mobile Menu Behavior
            const menuBtn = document.getElementById("menu-btn");
            const mobileMenu = document.getElementById("mobile-menu");

            menuBtn.addEventListener("click", () => {
                mobileMenu.classList.toggle("hidden");
            });
        });

    // Fetch and load the main content
    fetch("./components/main.html")
        .then((response) => response.text())
        .then((data) => {
            document.getElementById("main-container").innerHTML = data;

            // Handle task addition and display from localStorage
            const taskInput = document.getElementById("task-input");
            const addTaskBtn = document.getElementById("add-task-btn");
            const taskList = document.getElementById("task-list");

            // Load tasks from localStorage
            const loadTasks = () => {
                // Get tasks from localStorage or initialize an empty array if not found
                const tasks = JSON.parse(localStorage.getItem("tasks")) || [];

                // Clear the existing task list
                taskList.innerHTML = "";

                // Loop through the tasks and display them
                tasks.forEach((task) => {
                    addTaskToList(task.text, task.id);
                });
            };
            // Add task to list
            const addTaskToList = (taskText, taskId) => {
                const taskItem = document.createElement("div");
                taskItem.classList.add("flex", "items-center", "space-x-4", "bg-gray-100", "px-4", "py-2", "rounded-md", "shadow-md");
                taskItem.setAttribute("data-id", taskId);

                // Task content
                const taskContent = document.createElement("span");
                taskContent.textContent = taskText;

                // Delete button
                const deleteBtn = document.createElement("button");
                deleteBtn.classList.add("text-red-600", "hover:text-red-800", "focus:outline-none");
                deleteBtn.textContent = "Delete";
                deleteBtn.addEventListener("click", () => {
                    taskItem.remove();
                    removeTaskFromLocalStorage(taskId);
                });

                // Append task to list
                taskItem.appendChild(taskContent);
                taskItem.appendChild(deleteBtn);
                taskList.appendChild(taskItem);
            };

            // Add task when button is clicked
            addTaskBtn.addEventListener("click", () => {
                const taskText = taskInput.value.trim();
                if (taskText) {
                    // Create a unique ID for each task
                    const taskId = Date.now();
                    const newTask = { text: taskText, id: taskId };

                    // Add task to list and localStorage
                    addTaskToList(taskText, taskId);
                    saveTaskToLocalStorage(newTask);

                    // Clear input
                    taskInput.value = "";
                }
            });

            // Save task to localStorage
            const saveTaskToLocalStorage = (task) => {
                const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
                tasks.push(task);
                localStorage.setItem("tasks", JSON.stringify(tasks));
            };

            // Remove task from localStorage
            const removeTaskFromLocalStorage = (taskId) => {
                let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
                tasks = tasks.filter(task => task.id !== taskId);
                localStorage.setItem("tasks", JSON.stringify(tasks));
            };

            // Load tasks when the page is loaded
            loadTasks();
        });

    fetch("./components/about.html")
        .then((response) => response.text())
        .then((data) => {
            document.getElementById("about-container").innerHTML = data;
        });

});
