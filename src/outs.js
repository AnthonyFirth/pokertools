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


    questionBox.appendChild(questionRow);
    questionRow.appendChild(heroHand);
    questionRow.appendChild(villainHand);
    questionRow.appendChild(boardCards);

    questionBox.appendChild(form);

    content.appendChild(questionBox);



    //game logic
    function updateCards(qobj) {
        villainHand.textContent = "Villain: " + qobj.villain;
        heroHand.textContent = "Hero: " + qobj.hero;
        boardCards.textContent = "Board: " + qobj.board;
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