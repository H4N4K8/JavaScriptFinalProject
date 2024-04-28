const gameBoard = document.getElementById('gameboard');
const scoreElement = document.getElementById('scoreBoard');
const incorrectElement = document.getElementById('incorrectGuess');

//reload
document.getElementById("reset").addEventListener("click", function () {
    window.location.reload();
})

//GAME FUNCTIONS-----------------------
const characters = [
    'media/anchovy.png', 'media/apple.png', 'media/azalea.png', 'media/beau.png', 'media/blaire.png', 'media/bonbon.png', 'media/deli.png', 'media/digby.png', 'media/ellie.png', 'media/fang.png'];
function shuffle(array) {
    array.sort(() => Math.random() - 0.5);
}
const cards = [...characters, ...characters];
shuffle(cards);

let score = 0;
let wrong = 0;
let guessedCharacters = [];

// create cards
function createCard(character) {
    const card = document.createElement('div');
    card.classList.add('card');
    card.dataset.image = character;

    const img = document.createElement('img');
    img.src = character;
    img.classList.add('hidden');
    card.appendChild(img);

    card.addEventListener('click', () => flipCard(card));

    return card;
}

// flip
function flipCard(card) {
    if (guessedCharacters.length < 2 && !guessedCharacters.includes(card)) {
        card.firstChild.classList.remove('hidden');
        guessedCharacters.push(card);

        if (guessedCharacters.length === 2) {
            setTimeout(checkMatch, 1000);
        }
    }
}

//check for a match
function checkMatch() {
    const [card1, card2] = guessedCharacters;
    const image1 = card1.dataset.image;
    const image2 = card2.dataset.image;

    if (image1 === image2) {
        score++;
        scoreElement.textContent = score;
        guessedCharacters = [];

    } else {
        wrong++;
        incorrectElement.textContent = wrong;
        setTimeout(() => {
            card1.firstChild.classList.add('hidden');
            card2.firstChild.classList.add('hidden');
            guessedCharacters = [];
        }, 500);
    }
}

//TIME-------------------------------------------
var start; // game start
var timeKeeper;

window.addEventListener("load", function () {
    if (!timeKeeper) {
        start = new Date().getTime();
        timeKeeper = setInterval(updateTime, 1000); // update time
    }
});
function updateTime() {
    var currentTime = new Date().getTime();
    var elapsedTime = currentTime - start;
    var seconds = Math.floor(elapsedTime / 1000) % 60; // calculate seconds
    var displayTime = seconds + " s";
    document.getElementById("timeBoard").innerHTML = displayTime;

    //when game "ends"
    if (seconds >= 60) {
        //stops time
        clearInterval(timeKeeper);
        //updates final score
        var finalScore = "Your final score: " + score;
        document.getElementById("score").innerHTML = finalScore;
    }
}

// initialize 
function init() {
    cards.forEach(image => {
        const card = createCard(image);
        gameBoard.appendChild(card);
    });
}

//start the game
init();