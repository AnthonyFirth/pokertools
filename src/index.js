import "./styles.css"
import loadOutsGame from "./outs.js"


//have a queue that holds the question objects 
//pop each time we answer a question

loadOutsGame();

const qobj1 = {villain: "8J", hero: "KA", board: "5QKA", answer: "4"};
const qobj2 = {villain: "AJ", hero: "33", board: "J82A", answer: "2"};
const qobj3 = {hero: "K9", villain: "JJ", board: "486A", answer: "3"};

const queue = [qobj1, qobj2, qobj3];


function updateCards(qobj){

    const villain = document.getElementById("villain-hand");
    const hero = document.getElementById("hero-hand");
    const board = document.getElementById("board-cards");

    villain.textContent = "Villain: " + qobj.villain;
    hero.textContent = "Hero: " + qobj.hero;
    board.textContent = "Board: " + qobj.board;
}

const answerBox = document.getElementById("answerBox");
answerBox.addEventListener("input", () => {
    if (queue.length == 0) return;

    if (answerBox.value == queue.at(-1).answer){
        //go to next question and update cards

        answerBox.value = "";
        queue.pop();

        if (queue.length > 0) updateCards(queue.at(-1));
        else alert("yay! you finished all questions")
    }
})


updateCards(queue.at(-1));