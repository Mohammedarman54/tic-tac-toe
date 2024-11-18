console.log("Welcome to Tic Tac Toe");

// Reset the music to start from the beginning on page refresh
let music = new Audio("music1.mp3.mp3");
music.loop = true;
music.currentTime = 0; // This ensures the music starts from the beginning
music.play();

let gameover = new Audio("gameover.mp3");
let turn = new Audio("ting.mp3");
let finish = false;

// function to change the turn
let turn_var = "X";
const changeTurn = function() {
    return turn_var === "X" ? "0" : "X";
};

// function to check a win
const checkWin = function() {
    let boxtexts = document.getElementsByClassName('boxtext');
    let wins = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];
    wins.forEach(function(e) {
        if ((boxtexts[e[0]].innerText === boxtexts[e[1]].innerText) &&
            (boxtexts[e[0]].innerText === boxtexts[e[2]].innerText) &&
            (boxtexts[e[0]].innerText !== "")) {
            document.querySelector('.info').innerText = boxtexts[e[0]].innerText + " Won";
            finish = true;
            document.querySelector('.image').getElementsByTagName('img')[0].style.width = "250px";
            music.pause(); // Stop the music when someone wins
            gameover.play(); // Play the game over sound
        }
    });
};

// game logic
let boxes = document.getElementsByClassName("box");
Array.from(boxes).forEach(element => {
    let boxtext = element.querySelector('.boxtext');
    element.addEventListener('click', function() {
        if (boxtext.innerText === '' && !finish) {
            boxtext.innerText = turn_var;
            turn_var = changeTurn();
            turn.play();
            checkWin();
            if (!finish) {
                document.getElementsByClassName("info")[0].innerText = "Turn for " + turn_var;
            }
        }
    });
});

reset.addEventListener('click', () => {
    let boxtexts = document.querySelectorAll('.boxtext');
    Array.from(boxtexts).forEach(element => {
        element.innerText = "";
    });
    turn_var = "X";
    finish = false;
    document.getElementsByClassName("info")[0].innerText = "Turn for " + turn_var;
    document.querySelector('.image').getElementsByTagName('img')[0].style.width = "0px";
    music.play(); // Restart the music when the game is reset
});
