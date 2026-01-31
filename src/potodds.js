import questions from "./potodds-questions.json"

export default function loadPotoddsGame() {
    //to make this good we first have a section where we just do what's our required equity, to memorize the table
    //then we have the call or fold simulator
    //and same progression with the others with simple->complex scenarios
    //wait maybe it is looking like neetcode !!

    const queue = [...questions].reverse();


    //manipulating DOM
    const content = document.getElementById("content");

    const questionBox = document.createElement("div");
    questionBox.id = "question-box";

    const handsRow = document.createElement("div");
    handsRow.className = "question-row";

    const boardRow = document.createElement("div");
    boardRow.className = "question-row";

    const heroHand = document.createElement("span");
    heroHand.id = "hero-hand";
    heroHand.className = "question-text";

    const villainHand = document.createElement("span");
    villainHand.id = "villain-hand";
    villainHand.className = "question-text"

    const boardCards = document.createElement("span");
    boardCards.id = "board-cards";
    boardCards.className = "question-text";
    
    const promptRow = document.createElement("div");
    promptRow.className = "question-row";

    const promptText = document.createElement("span");
    promptText.className = "question-text";
    promptText.classList.add("question-prompt");

    const form = document.createElement("form");
    const answerBox = document.createElement("input");
    answerBox.type = "text";
    answerBox.id = "answerBox"; //change to buttons here

    const answerRow = document.createElement("div");
    answerRow.className = "question-row";
    answerRow.style.gap = "20px";

    const callButton = document.createElement("button");
    callButton.textContent = "call";
    callButton.className = "answer-button call-button";

    const foldButton = document.createElement("button");
    foldButton.textContent = "fold";
    foldButton.className = "answer-button fold-button";

    const panel = document.createElement("div");
    panel.className = "panel";
    panel.classList.add("ingame");

    const panelTab = document.createElement("div");
    panelTab.className = "panel-tab";
    panelTab.textContent = "◀";
    panelTab.addEventListener("click", () => togglePanel());

    answerRow.appendChild(callButton);
    answerRow.appendChild(foldButton);

    const hint = document.createElement("div");
    hint.className = "keyboard-hint";
    hint.textContent = "press C to call, F to fold, P to open panel";

    form.appendChild(answerBox);

    promptRow.appendChild(promptText);

    handsRow.appendChild(heroHand);
    handsRow.appendChild(villainHand);

    boardRow.appendChild(boardCards);

    questionBox.appendChild(handsRow);
    questionBox.appendChild(boardRow);
    questionBox.appendChild(promptRow);
    questionBox.appendChild(answerRow);
    

    content.appendChild(questionBox);
    content.appendChild(hint);
    content.appendChild(panelTab);
    content.appendChild(panel);

    setTimeout(() => hint.classList.add("fade-out"), 3000);


    //game logic
    const suitSymbols = { "spade": "♠", "club": "♣", "diamond": "♦", "heart": "♥" };

    function cardText(cards) {
        //within each herohand / villainhand etc we need to create a series of spans 
        //then colour the spans according to the suit
        const spans = []
        for (const card of cards) {
            const rankSpan = document.createElement("span");
            rankSpan.textContent = card.rank;

            const suitSpan = document.createElement("span");
            suitSpan.textContent = suitSymbols[card.suit];

            suitSpan.style.color = (card.suit == "spade" || card.suit == "club") ? "black" : "red";

            spans.push(rankSpan, suitSpan);
        }
        return spans;
    }

    function updateCards(qobj) { //textbased
        heroHand.textContent = "Hero: ";
        cardText(qobj.hero).forEach((e) => heroHand.appendChild(e));

        villainHand.textContent = "Villain: ";
        cardText(qobj.villain).forEach(e => villainHand.appendChild(e));

        boardCards.textContent = "Board: ";
        cardText(qobj.board).forEach(e => boardCards.appendChild(e));

        promptText.textContent = qobj.prompt;
    }

    // answerBox.addEventListener("input", () => {
    //     if (queue.length == 0) return;

    //     if (answerBox.value == queue.at(-1).answer) {
    //         //go to next question and update cards

    //         answerBox.value = "";
    //         queue.pop();

    //         if (queue.length > 0) updateCards(queue.at(-1));
    //         else alert("yay! you finished all questions")
    //     }
    // })

    callButton.addEventListener("click", () => {
        onAnswer("call");
    })

    foldButton.addEventListener("click", () => {
        onAnswer("fold");
    })

    document.addEventListener("keydown", (e) => {
        if (e.key == "c") onAnswer("call");
        if (e.key == "f") onAnswer("fold");
        if (e.key == "p") togglePanel();
        
    })

    function onAnswer(ans){
        if (queue.length == 0) return;

        if (ans == queue.at(-1).answer){
            queue.pop();

            if (queue.length > 0) updateCards(queue.at(-1));
            else alert("yay! you finished all questions");
        }
    }

    function togglePanel(){
        if (panel.classList.contains("open")){
            panel.classList.remove("open");
            panelTab.classList.remove("open");
            panelTab.textContent = "◀";
        } else {
            panel.innerHTML = "";

            const desc = document.createElement("p");
            desc.innerHTML = `<table>
            <tr><th>Call</th><th>Required equity</th></tr>
            <tr><td>2x the size of the pot</td><td>40%</td></tr>
            <tr><td>Pot-size</td><td>33%</td></tr>
            <tr><td>2/3 the size of the pot</td><td>28%</td></tr>
            <tr><td>1/2 the size of the pot</td><td>25%</td></tr>
            <tr><td>1/3 the size of the pot</td><td>20%</td></tr>
            <tr><td>1/4 the size of the pot</td><td>16%</td></tr>
            </table>`
            panel.appendChild(desc);

            panel.classList.add("open");
            panelTab.classList.add("open");
            panelTab.textContent = "▶";
        }
    }


    updateCards(queue.at(-1));
}