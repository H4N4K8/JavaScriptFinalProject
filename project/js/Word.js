const canvas = document.getElementById('gameboard');
const ctx = canvas.getContext('2d');
var letters = [];
var phrase;

var found;
const myWords = [];
const cellWidth = 65;
const cellHeight = 65;
const padding = 10;
var foundWord = false;
var points = 0;
var wordPoint = 0;
var pointString = "<span>Points</span><br>";


//clears all elements
document.getElementById("reset").addEventListener("click", function () {
    pointString = "<span>Points</span><br>";
    points = 0;
    foundWord = false;
    document.getElementById("message").innerHTML = "";
    document.getElementById("points").innerHTML = "";
    document.getElementById("dups").innerHTML = "";
    document.getElementById("words").val = "";
    document.getElementById("words").focus();
})

//splitting words
document.getElementById("phrase1").addEventListener("click", function () {
    phrase = document.getElementById("phrase1").textContent;
    phrase = phrase.toLowerCase();
    letters = phrase.split(" ").join("");
    createBoard();
})
document.getElementById("phrase2").addEventListener("click", function () {
    phrase = document.getElementById("phrase2").textContent;
    phrase = phrase.toLowerCase();
    letters = phrase.split(" ").join("");
    createBoard();
})
document.getElementById("phrase3").addEventListener("click", function () {
    phrase = document.getElementById("phrase3").textContent;
    phrase = phrase.toLowerCase();
    letters = phrase.split(" ").join("");
    createBoard();
})
document.getElementById("phrase4").addEventListener("click", function () {
    phrase = document.getElementById("phrase4").textContent;
    phrase = phrase.toLowerCase();
    letters = phrase.split(" ").join("");
    createBoard();
})

//making board
function createBoard() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let i = 0; i < letters.length; i++)
    {
        //tile sizing
        const row = Math.floor(i / 4);
        const col = i % 4;
        const x = col * (cellWidth + padding);
        const y = row * (cellHeight + padding);
        //tile styling
        ctx.fillStyle = '#bc8021';
        ctx.fillRect(x, y, cellWidth, cellHeight);
        //tile styling
        ctx.font = "2.5em 'Calisto MT'";
        ctx.fillStyle = 'black';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(letters[i], x + cellWidth / 2, y + cellHeight / 2); // letters in middle of tile
    }
}

document.getElementById("words").addEventListener("keydown", function (event) {
    if (event.keyCode == 13)//enter button 13
    {
        var createdWord = document.getElementById("words").value;
        document.getElementById("words").value = "";
        document.getElementById("words").focus();

        createdWord = createdWord.toLowerCase();
        myWords[myWords.length] = createdWord;
        document.getElementById("message").innerHTML = "";
        for (var i = 0; i < myWords.length; i++)
        {
            document.getElementById("message").innerHTML += myWords[i] + "<br>";
        }
    }
});

document.getElementById("score").addEventListener("click", function () {
    myWords.forEach(function (item) {
        foundWord = 0;
        //get rid of dup words
        for (var i = 0; i < myWords.length; i++) {
            if (item == myWords[i] && foundWord > 0) {
                dupString +=  item +  "is a duplicate. No double words!";
                myWords.splice(i, 1); // removes word
            }
            else if (item == myWords[i])
                foundWord++;
        }
        points++;
    });

    pointString += "Total Points: " + points;
    document.getElementById("points").innerHTML = pointString;
    points = 0;
});
