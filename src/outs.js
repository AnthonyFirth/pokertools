import questions from "./questions.json" 

export default function loadOutsGame(){ 

    //queue pops every time we answer a question
    const queue = [... questions];


    //manipulating DOM
    const content = document.getElementById("content");

    const questionBox = document.createElement("div");
    questionBox.id = "question-box";

    const questionRow = document.createElement("div");
    questionRow.className = "question-row";

    const heroHand = document.createElement("span");
    heroHand.id = "hero-hand";
    heroHand.className = "question-text";

    const villainHand = document.createElement("span");
    villainHand.id = "villain-hand";
    villainHand.className = "question-text"

    const boardCards = document.createElement("span");
    boardCards.id = "board-cards";
    boardCards.className = "question-text";

    
    const form = document.createElement("form");
    const answerBox = document.createElement("input");
    answerBox.type = "text";
    answerBox.id = "answerBox";

    form.appendChild(answerBox);
    
    questionRow.appendChild(heroHand);
    questionRow.appendChild(villainHand);
    questionRow.appendChild(boardCards);

    questionBox.appendChild(questionRow);
    questionBox.appendChild(form);

    content.appendChild(questionBox);



    //game logic
    const suitSymbols = { "spade": "♠", "club": "♣", "diamond": "♦", "heart": "♥" };

    function cardText(cards){
        //within each herohand / villainhand etc we need to create a series of spans 
        //then colour the spans according to the suit
        const spans = []
        for (const card of cards){
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
    }

    answerBox.addEventListener("input", () => {
        if (queue.length == 0) return;

        if (answerBox.value == queue.at(-1).answer) {
            //go to next question and update cards

            answerBox.value = "";
            queue.pop();

            if (queue.length > 0) updateCards(queue.at(-1));
            else alert("yay! you finished all questions")
        }
    })

    updateCards(queue.at(-1));
}