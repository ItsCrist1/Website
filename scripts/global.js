const main = document.querySelector("main");
const arrow = document.getElementById("nav-move-button");
const menu = document.getElementById("nav-menu-button")
const nav = document.getElementById("nav");

const elements_to_be_hidden = document.querySelectorAll("nav h1, nav a");

const margin = "220px";

let isFlipped = localStorage.getItem("nav-flipped") === "true";
let isHidden = localStorage.getItem("is-hidden") === "true";

function flip (defaultState = false) {
    if(!defaultState) isFlipped = !isFlipped;
    arrow.classList.toggle("flipped", isFlipped);

    if(isFlipped)
        nav.style.left = "auto",
        nav.style.right = "0px",
        main.style.marginLeft = "0px",
        main.style.marginRight = margin;
    else
        nav.style.right = "auto",
        nav.style.left = "0",
        main.style.marginRight = "0px",
        main.style.marginLeft = margin;

    localStorage.setItem("nav-flipped", isFlipped);
    
    console.log(`${defaultState ? "Initial" : ""} Menu Position Change: ${isFlipped ? "Right" : "Left"}`);
}

function toggleHide(defaultState = false) {
    if(!defaultState) isHidden = !isHidden;
    localStorage.setItem("is-hidden", isHidden);

    if(isHidden) main.style.marginLeft = main.style.marginRight = "0px";
    else flip(true);

    nav.style.background = isHidden ? "none" : "rgba(29, 29, 36, 0.45)";
    nav.style.backdropFilter = isHidden ? "none" : "blur(10px)";
    nav.style.borderRight = isHidden ? "none" : "border-right: 2px solid rgba(41, 110, 248, 0.3)";

    elements_to_be_hidden.forEach(element => {
        element.style.opacity = isHidden ? "0" : "100";
    });

    arrow.style.opacity = isHidden ? "0" : "100";
    menu.style.backdropFilter = isHidden ? "blur(10px)" : "none";

    console.log(`${defaultState ? "Initial" : ""} Menu Visibility Change: ${isHidden ? "Hidden" : "Visible"}`);
}

arrow.addEventListener("click", () => {
    flip();
});

window.addEventListener("keydown", (event) => {
    if (event.key === "ArrowLeft" || event.key === "ArrowRight")
        flip();
});

menu.addEventListener("click", () => {
    toggleHide();
});

flip(true); // initial flip to check in storage for the last state
toggleHide(true); // same