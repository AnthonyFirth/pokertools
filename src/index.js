import "./styles.css"
import loadOutsGame from "./outs.js"
import loadRoadmap from "./roadmap.js"

const content = document.getElementById("content");
const practice = document.getElementById("practice");
const logo = document.getElementById("logo");

// practice.addEventListener("click", () => {
//     content.innerHTML = "";

//     loadOutsGame();
// })


logo.addEventListener("click", () => {
    content.innerHTML = "";

    loadRoadmap();
})


loadRoadmap();


