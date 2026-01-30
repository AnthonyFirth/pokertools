import loadOutsGame from "./outs.js"
import loadEquityGame from "./equity.js"

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

    const potOdds = document.createElement("button");
    potOdds.textContent = "Pot odds";
    potOdds.className = "roadmap-button";

    const arrowPotOdds = document.createElement("div");
    arrowPotOdds.className = "arrow";


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

    outs.addEventListener("click", (e) => {
        e.stopPropagation();
        // content.innerHTML = "";
        let description = `
        An out is a card that could come in the future, which would give you the winning hand. 
        For example, if we had A9 and the villain had KK, then we have 3 outs, being the other three aces.  
        `
        openPanel("Counting outs", description, loadOutsGame);
        // loadOutsGame();
    })

    equity.addEventListener("click", (e) => {
        e.stopPropagation();
        let description = `
        Equity is the % at which we can expect to win a hand (if we go to showdown). If we are on the flop (thus going to see the turn and river) we can multiply 
        our outs by 4. If we are on the turn (and hence will see the river) then we multiply the number of outs by 2. 
        `

        openPanel("Estimating equity", description, loadEquityGame);
    })

    potOdds.addEventListener("click", (e) => {
        e.stopPropagation();
        let description = `
        Pot odds is basically determining the EV of a call based on the size of the pot. 
        `
    })

    content.addEventListener("click", () => {
        if (panel.classList.contains("open")){
            panel.classList.remove("open");
            content.classList.remove("darken");
        } 
        
    })
    

    roadmap.appendChild(outs);
    roadmap.appendChild(arrow);
    roadmap.appendChild(equity);
    roadmap.appendChild(arrowPotOdds);
    roadmap.appendChild(potOdds);
    

    content.appendChild(roadmap);
    
    body.appendChild(panel);
}