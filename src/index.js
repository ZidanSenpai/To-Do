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
    
});
