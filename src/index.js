import "./styles.css";

const projectButtons = document.querySelectorAll(".project-btn");

projectButtons.forEach(button => {
    button.addEventListener("click", () => {
        console.log("I was clicked");
    });
});