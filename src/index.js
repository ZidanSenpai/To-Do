import "./styles.css"
document.addEventListener("DOMContentLoaded", () => {
    const addBtn = document.querySelector(".addtd");
    const modalOverlay = document.getElementById("modalOverlay");
    const cancelBtn = document.getElementById("cancelBtn");
    const todoForm = document.getElementById("todoForm");
    const todoList = document.getElementById("todoList");
    const prioritySelect = document.getElementById("priority");

    document.querySelector(".todos").addEventListener("click", (e) => {
        if (e.target.closest(".delete-btn")) {
            const todoItem = e.target.closest(".todo");
            if (todoItem) todoItem.remove();
        }
    });
    const placeholderTodos = [
        {
            title: "Finish assignment",
            description: "Complete the AI project proposal",
            dueDate: "2025-08-03",
            priority: "high",
        },
        {
            title: "Grocery shopping",
            description: "Buy milk, eggs, and veggies",
            dueDate: "2025-08-02",
            priority: "medium",
        },
    ];
    if (todoList) {
        placeholderTodos.forEach((todo, index) => {
            const todoItem = document.createElement("div");
            todoItem.classList.add("todo");

            todoItem.innerHTML = `
        <div class="checklist">
            <div class= "info">
                    <input class="checkbox" type="checkbox" id="todo-${index + 1}">
                    <label class="label priority ${todo.priority}" for="todo-${index + 1}">
                    ${todo.title}
                    </label>
                <div class="meta">
                    <div class="description">${todo.description}</div>
                    <div class="due-date">${todo.dueDate}</div>
                </div>
            </div>
            <div class="edit">
                <button class="icon-button delete-btn" title="Delete">
                <svg viewBox="0 0 24 24" class="icon">
                    <path fill="currentColor"
                    d="M6 19a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z" />
                </svg>
                </button>
            </div>
        </div>
      `;

            todoList.appendChild(todoItem);
        });
    }

    // Open modal
    addBtn.addEventListener("click", () => {
        modalOverlay.style.display = "flex";
    });

    // Cancel modal
    cancelBtn.addEventListener("click", () => {
        modalOverlay.style.display = "none";
    });

    // Live priority color change
    prioritySelect.addEventListener("change", () => {
        const value = prioritySelect.value;
        prioritySelect.style.color = value === "low" ? "green" :
            value === "medium" ? "orange" :
                "red";
    });
    prioritySelect.dispatchEvent(new Event("change"));

    // Handle form submission
    todoForm.addEventListener("submit", (e) => {
        e.preventDefault();

        
        const titleInput = document.getElementById("title");
        const descriptionInput = document.getElementById("description");
        const dueDateInput = document.getElementById("dueDate");

        const title = titleInput.value.trim();
        const description = descriptionInput.value.trim();
        const dueDate = dueDateInput.value;
        const priority = prioritySelect.value;
        
        const newTodo = {
            title: titleInput.value,
            description: descriptionInput.value,
            dueDate: dueDateInput.value,
            priority: prioritySelect.value,
        };
        if (!projects[currentProject]) {
            projects[currentProject] = [];
        }
        projects[currentProject].push(newTodo);
        if (!title) return;

        const todo = document.createElement("div");
        todo.classList.add("todo");

        const id = `todo-${Date.now()}`;

        todo.innerHTML = `
      <div class="checklist">
        <div class = "info">
            <input class="checkbox" type="checkbox" id="${id}">
            <label class="label priority ${priority}" for="${id}">${title}</label>
            <div class="meta">
                ${description ? `<div class="description">${description}</div>` : ""}
                ${dueDate ? `<div class="due-date">Due: ${dueDate}</div>` : ""}
            </div>
        </div>
        <div class="edit">
          <button class="icon-button delete-btn" title="Delete">
            <svg viewBox="0 0 24 24" class="icon">
              <path fill="currentColor"
                d="M6 19a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z" />
            </svg>
          </button>
        </div>
      </div>
    `;

        todoList.appendChild(todo);
        todoForm.reset();
        modalOverlay.style.display = "none";

    });

    const projectList = document.querySelector(".projects");
    const createProjectBtn = document.getElementById("createProject");

    // Create a project modal
    const projectModal = document.createElement("div");
    projectModal.className = "modal-overlay";
    projectModal.style.display = "none";
    projectModal.innerHTML = `
    <div class="modal">
        <h2>New Project</h2>
        <form id="projectForm">
        <label for="projectTitle">Project Title:</label>
        <input type="text" id="projectTitle" required />
        <div class="form-buttons">
            <button type="submit" class="submit-btn">Add</button>
            <button type="button" id="cancelProjectBtn">Cancel</button>
        </div>
        </form>
    </div>
    `;
    document.body.appendChild(projectModal);

    // Global project store
    const projects = {
        Home: [...placeholderTodos],
        College: [
            {
                title: "Submit internal marks",
                description: "Due to academic section by next week",
                dueDate: "2025-08-05",
                priority: "high",
            },
            {
                title: "Revise ML topics",
                description: "Clustering & PCA",
                dueDate: "2025-08-04",
                priority: "medium",
            },
        ],
    };
    let currentProject = "Home";

    function renderProjects() {
        projectList.innerHTML = "";
        for (const name in projects) {
            const projectEl = document.createElement("div");
            projectEl.classList.add("project");
            projectEl.innerHTML = `<button class="project-btn">${name}</button>`;
            projectEl.addEventListener("click", () => {
                currentProject = name;
                document.querySelector(".project-name").textContent = name;
                renderTodos();
            });
            projectList.appendChild(projectEl);
        }
    }

    function renderTodos() {
        todoList.innerHTML = "";
        const todos = projects[currentProject];
        todos.forEach((todo, index) => {
            const id = `todo-${Date.now()}-${index}`;
            const todoItem = document.createElement("div");
            todoItem.classList.add("todo");

            todoItem.innerHTML = `
      <div class="checklist">
        <div class="info">
          <input class="checkbox" type="checkbox" id="${id}">
          <label class="label priority ${todo.priority}" for="${id}">${todo.title}</label>
          <div class="meta">
            ${todo.description ? `<div class="description">${todo.description}</div>` : ""}
            ${todo.dueDate ? `<div class="due-date">Due: ${todo.dueDate}</div>` : ""}
          </div>
        </div>
        <div class="edit">
          <button class="icon-button delete-btn" title="Delete">
            <svg viewBox="0 0 24 24" class="icon">
              <path fill="currentColor"
                d="M6 19a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z" />
            </svg>
          </button>
        </div>
      </div>
    `;
            todoList.appendChild(todoItem);
        });
    }

    todoList.addEventListener("click", (e) => {
        if (e.target.closest(".delete-btn")) {
            const todoEl = e.target.closest(".todo");
            const label = todoEl.querySelector("label")?.textContent.trim();
            projects[currentProject] = projects[currentProject].filter(t => t.title !== label);
            renderTodos();
        }
    });

    // Add todo with project-specific context
    todoForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const title = document.getElementById("title").value.trim();
        const description = document.getElementById("description").value.trim();
        const dueDate = document.getElementById("dueDate").value;
        const priority = prioritySelect.value;

        if (!title) return;

        projects[currentProject].push({ title, description, dueDate, priority });
        todoForm.reset();
        modalOverlay.style.display = "none";
        renderTodos();
    });

    // Project modal logic
    createProjectBtn.addEventListener("click", () => {
        projectModal.style.display = "flex";
    });
    projectModal.addEventListener("click", (e) => {
        if (e.target === projectModal || e.target.id === "cancelProjectBtn") {
            projectModal.style.display = "none";
        }
    });
    document.getElementById("projectForm").addEventListener("submit", (e) => {
        e.preventDefault();
        const newTitle = document.getElementById("projectTitle").value.trim();
        if (!newTitle || projects[newTitle]) return;

        projects[newTitle] = [];
        currentProject = newTitle;
        document.querySelector(".project-name").textContent = newTitle;
        renderProjects();
        renderTodos();
        projectModal.style.display = "none";
    });
    renderProjects();      // Populate project buttons (Home, College, etc.)
    renderTodos();         // Render todos for the current project
    document.querySelector(".project-name").textContent = currentProject;

    const deleteProjectBtn = document.getElementById("deleteProject");

    deleteProjectBtn.addEventListener("click", () => {
        if (Object.keys(projects).length <= 1) {
            alert("You must have at least one project.");
            return;
        }

        const confirmDelete = confirm(`Are you sure you want to delete "${currentProject}"?`);
        if (!confirmDelete) return;

        delete projects[currentProject];

        // Set fallback to first remaining project
        currentProject = Object.keys(projects)[0];
        document.querySelector(".project-name").textContent = currentProject;

        renderProjects();
        renderTodos();
    });

});
