import loadOutsGame from "./outs.js"

export default function loadRoadmap(){
    //basically the roadmap


    const content = document.getElementById("content");

    const roadmap = document.createElement("div");
    roadmap.id = "roadmap";

    const outs = document.createElement("button");
    outs.textContent = "counting outs";
    outs.className = "roadmap-button";

    outs.addEventListener("click", () => {
        content.innerHTML = "";
        loadOutsGame();
    })

    const equity = document.createElement("button");
    equity.textContent = "estimating equity";
    equity.className = "roadmap-button";



    roadmap.appendChild(outs);
    roadmap.appendChild(equity);

    content.appendChild(roadmap);
}