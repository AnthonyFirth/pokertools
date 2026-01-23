export default function loadOutsGame(){ 
    const content = document.getElementById("content");

    const questionBox = document.createElement("div");
    questionBox.id = "questionBox";

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
}