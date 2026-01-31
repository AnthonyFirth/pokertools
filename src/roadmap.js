import loadOutsGame from "./outs.js"
import loadEquityGame from "./equity.js"
import loadPotoddsGame from "./potodds.js"

import katex from "katex";
import "katex/dist/katex.min.css";
import renderMathInElement from "katex/dist/contrib/auto-render";

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
        desc.innerHTML = description;

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
        renderMathInElement(desc);

        
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
        Pot odds tells you whether you should call, depending on your equity and the size of the pot. 
        Ideally we call whenever E[call] > 0, from this we can derive the required equity to call.

        \\[ 
        E[call] > 0 \\\\
        E[win] + E[lose] > 0 \\\\
        P(w)(pot) - P(l) (call) > 0 \\\\
        \\vdots \\\\
        P(w) > \\frac{call}{pot + call} 
        \\]

        We know from the previous section that the probability of winning is our equity! So our equity just has to be
        greater than this fraction.
        <br> <br>
        If we memorize this table we can do the calculation even faster. 

        <table>
            <tr><th>Call</th><th>Required equity</th></tr>
            <tr><td>2x the size of the pot</td><td>40%</td></tr>
            <tr><td>Pot-size</td><td>33%</td></tr>
            <tr><td>2/3 the size of the pot</td><td>28%</td></tr>
            <tr><td>1/2 the size of the pot</td><td>25%</td></tr>
            <tr><td>1/3 the size of the pot</td><td>20%</td></tr>
            <tr><td>1/4 the size of the pot</td><td>16%</td></tr>
        </table>
        `


        openPanel("Pot Odds", description, loadPotoddsGame); //fix this and actually create pot odds game...
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