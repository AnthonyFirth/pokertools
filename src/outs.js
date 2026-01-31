import questions from "./outs-questions.json" 

export default function loadOutsGame(){ 
    // how to go back and make it good:
    // add an I give up button
    // worked examples -> practice basics with the table -> composite scenarios
    // then we could create an endless practice scenario if we figured out how to generate hands
    //queue pops every time we answer a question

    //https://github.com/goldfire/pokersolver/tree/master 
    //can use to create endless mode

    const queue = [... questions].reverse();


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

    
    const form = document.createElement("form");
    const prompt = document.createElement("span");
    prompt.classList.add("question-text");
    const answerBox = document.createElement("input");
    
    prompt.textContent = "Hero's outs:";
    
    answerBox.type = "text";
    answerBox.id = "answerBox";

    // form.appendChild(prompt);
    form.appendChild(answerBox);
    
    handsRow.appendChild(heroHand);
    handsRow.appendChild(villainHand);

    boardRow.appendChild(boardCards);

    questionBox.appendChild(handsRow);
    questionBox.appendChild(boardRow);
    questionBox.appendChild(form);

    content.appendChild(questionBox);
    answerBox.focus();



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