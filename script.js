

const qobj = {villain: "8J", hero: "KA", board: "5QKA", answer: "4"};

function updateCards(){
    const villain = document.getElementById("villain-hand");
    const hero = document.getElementById("hero-hand");
    const board = document.getElementById("board-cards");

    villain.textContent = "Villain: " + qobj.villain;
    hero.textContent = "Hero: " + qobj.hero;
    board.textContent = "Board: " + qobj.board;
}

const answerBox = document.getElementById("answerBox");
answerBox.addEventListener("keydown", () => {
    
})

updateCards();