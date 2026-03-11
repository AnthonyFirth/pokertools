export default function loadCharts(){

    const content = document.getElementById('content')
    const chart = document.createElement('div');
    chart.id = 'chart'

    const RANKS = ["A","K","Q","J","T","9","8","7","6","5","4","3","2"];
    const selected = {};

    let painting = false;
    let erasing = false;

    document.addEventListener('mouseup', () => {
        painting = false;
        erasing = false;
    })

    function handLabel(row, col) {
        if (row === col) return RANKS[row] + RANKS[col];
        if (row < col) return RANKS[row] + RANKS[col] + "s";
        return RANKS[col] + RANKS[row] + "o";
    }

    for (let r = 0; r < 13; r++) {
        for (let c = 0; c < 13; c++) {
            let div = document.createElement('div');
            let label = handLabel(r, c);

            div.addEventListener('mousedown', (e) => {
                e.preventDefault();
                if (selected[label]) {
                    erasing = true;
                    delete selected[label];
                    div.style.background = '';
                } else {
                    painting = true;
                    selected[label] = true;
                    div.style.background = 'red';
                }
            })

            div.addEventListener('mouseenter', () => {
                if (painting) {
                    selected[label] = true;
                    div.style.background = 'red';
                } else if (erasing) {
                    delete selected[label];
                    div.style.background = '';
                }
            })

            div.textContent = label
            chart.appendChild(div)
        }
    }

    // --- game section ---
    const gameBox = document.createElement("div");
    gameBox.id = "question-box";

    const handDisplay = document.createElement("span");
    handDisplay.className = "question-text";

    const answerRow = document.createElement("div");
    answerRow.className = "question-row";
    answerRow.style.gap = "20px";

    const callButton = document.createElement("button");
    callButton.textContent = "call";
    callButton.className = "answer-button call-button";

    const foldButton = document.createElement("button");
    foldButton.textContent = "fold";
    foldButton.className = "answer-button fold-button";

    answerRow.appendChild(callButton);
    answerRow.appendChild(foldButton);

    gameBox.appendChild(handDisplay);
    gameBox.appendChild(answerRow);

    function randomHand() {
        const r1 = Math.floor(Math.random() * 13);
        let r2 = Math.floor(Math.random() * 13);
        const suited = r1 !== r2 && Math.random() < 0.5;

        let label;
        if (r1 === r2) {
            label = RANKS[r1] + RANKS[r2];
        } else {
            const hi = Math.min(r1, r2);
            const lo = Math.max(r1, r2);
            label = RANKS[hi] + RANKS[lo] + (suited ? "s" : "o");
        }
        return label;
    }

    let currentHand = randomHand();
    handDisplay.textContent = currentHand;

    function onAnswer(ans) {
        const correct = selected[currentHand] ? "call" : "fold";
        if (ans === correct) {
            currentHand = randomHand();
            handDisplay.textContent = currentHand;
        }
    }

    callButton.addEventListener("click", () => onAnswer("call"));
    foldButton.addEventListener("click", () => onAnswer("fold"));

    document.addEventListener("keydown", (e) => {
        if (e.key === "c") onAnswer("call");
        if (e.key === "f") onAnswer("fold");
    });

    const toggleBtn = document.createElement("button");
    toggleBtn.textContent = "Hide chart";
    toggleBtn.className = "answer-button";
    toggleBtn.style.background = "#555";
    toggleBtn.addEventListener("click", () => {
        if (chart.style.display === "none") {
            chart.style.display = "";
            toggleBtn.textContent = "Hide chart";
        } else {
            chart.style.display = "none";
            toggleBtn.textContent = "Show chart";
        }
    });

    content.appendChild(chart);
    content.appendChild(toggleBtn);
    content.appendChild(gameBox);

    function togglePanel(){
        if (panel.classList.contains("open")) {
            panel.classList.remove("open");
            panelTab.classList.remove("open");
            panelTab.textContent = "◀";
        } else {
            panel.innerHTML = "";

            
            // const desc = document.createElement("p");
            // desc.innerHTML = `<table>
            // <tr><th>Call</th><th>Required equity</th></tr>
            // <tr><td>2x the size of the pot</td><td>40%</td></tr>
            // <tr><td>Pot-size</td><td>33%</td></tr>
            // <tr><td>2/3 the size of the pot</td><td>28%</td></tr>
            // <tr><td>1/2 the size of the pot</td><td>25%</td></tr>
            // <tr><td>1/3 the size of the pot</td><td>20%</td></tr>
            // <tr><td>1/4 the size of the pot</td><td>16%</td></tr>
            // </table>`
            // panel.appendChild(desc);

            panel.classList.add("open");
            panelTab.classList.add("open");
            panelTab.textContent = "▶";
        }
    }
}


