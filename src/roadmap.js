import loadOutsGame from "./outs.js"

export default function loadRoadmap(){
    //basically the roadmap

    const content = document.getElementById("content");
    const body = document.body; 

    const roadmap = document.createElement("div");
    roadmap.id = "roadmap";

    const outs = document.createElement("button");
    outs.textContent = "counting outs";
    outs.className = "roadmap-button";

    const panel = document.createElement("div");
    panel.className = "panel";


    //practice button on the panel for outs ( but what do later with other practice buttons ?)
    

    

    const equity = document.createElement("button");
    equity.textContent = "estimating equity";
    equity.className = "roadmap-button";

    const arrow = document.createElement("div");
    arrow.className = "arrow";


    function openPanel(title, description, onPractice){
        panel.innerHTML = "";

        const heading = document.createElement("h2");
        heading.textContent = title;

        const desc = document.createElement("p");
        desc.textContent = description;

        const practiceBtn = document.createElement("button");
        practiceBtn.textContent = "Practice";
        practiceBtn.className = "practice-button";

        practiceBtn.addEventListener("click", () => {
            panel.classList.remove("open");
            content.classList.remove("darken");
            content.innerHTML = "";
            onPractice();
        });

        content.classList.add("darken");
        panel.classList.add("open");

        panel.appendChild(heading);
        panel.appendChild(desc);
        panel.appendChild(practiceBtn);
    }

    outs.addEventListener("click", () => {
        // content.innerHTML = "";
        let description = `
        An out is a card that could come in the future, which would give you the winning hand. 
        For example, if we had A9 and the villain had KK, then we have 3 outs, being the other three aces.  
        `
        openPanel("Counting outs", description, loadOutsGame);
        // loadOutsGame();
    })

    

    roadmap.appendChild(outs);
    roadmap.appendChild(arrow);
    roadmap.appendChild(equity);

    content.appendChild(roadmap);
    
    body.appendChild(panel);
}