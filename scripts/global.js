const arrow = document.getElementById("nav-move-button");
const nav = document.getElementById("nav");

let isFlipped = localStorage.getItem("nav-flipped") === "true";

function flip (defaultState = false) {
    if(!defaultState) 
        isFlipped = !isFlipped;

    arrow.classList.toggle("flipped", isFlipped);

    if(isFlipped)
        nav.style.left = "auto",
        nav.style.right = "0";
    else
        nav.style.right = "auto",
        nav.style.left = "0";

    localStorage.setItem("nav-flipped", isFlipped);
    console.log(`Menu Position Change: ${isFlipped ? "Right" : "Left"}`);
}

arrow.addEventListener("click", () => {
    flip();
});

window.addEventListener("keydown", (event) => {
    if (event.key === "ArrowLeft" || event.key === "ArrowRight")
        flip();
});

flip(true);