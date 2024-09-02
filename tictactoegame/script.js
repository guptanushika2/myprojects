let gameBoard = document.querySelector(".board");
let startBtn = document.querySelector(".button");
let gameStm = document.querySelector(".gameStatement");
let allCells = document.querySelectorAll(".cell");

// console.log(allCells);

let gamePlay = false;
let turn = "X";
let count = 0;

startBtn.addEventListener("click", function () {
   

    if (gamePlay == false) {
        gameStm.innerHTML = "Player X's turn "
        startBtn.innerHTML = "Reset";
    
        count = 0;
        turn = "X";
    } else {
        gameStm.innerHTML = "";
        startBtn.innerHTML = "Start"
    }
    clearGrid();
    gamePlay = !gamePlay;
    
})



gameBoard.addEventListener("click", function (event) {
     
    if (gamePlay == true && event.target.innerHTML == "") {
        //    console.log("clicked",event.target)
        let myCell = event.target;

       
        count++;
     
        if (turn == "X") {
            myCell.innerHTML = turn;
            myCell.style.color = "black";
            turn = "0";

        } else {
            myCell.innerHTML = turn;
            myCell.style.color = 'red';
            turn = "X";
        }
        gameStm.innerHTML = `Player ${turn}'s turn `

        let output = checkWinner();
        if (output == 2) {
            gameStm.innerHTML = "Player X wins the Game";
       
            restartGame()
        } else if (output == 1) {
            gameStm.innerHTML = "Player 0 wins the Game";
     
            restartGame()
        } else if (count == 9) {
            gameStm.innerHTML = "TIE";
         
            restartGame()
        }
    } else {
       
    }
})

function checkWinner() {
  

    if (
        (allCells[0].innerHTML == "X" &&
            allCells[1].innerHTML == "X" &&
            allCells[2].innerHTML == "X") ||
        (allCells[3].innerHTML == "X" &&
            allCells[4].innerHTML == "X" &&
            allCells[5].innerHTML == "X") ||
        (allCells[6].innerHTML == "X" &&
            allCells[7].innerHTML == "X" &&
            allCells[8].innerHTML == "X") ||
        (allCells[0].innerHTML == "X" &&
            allCells[3].innerHTML == "X" &&
            allCells[6].innerHTML == "X") ||
        (allCells[1].innerHTML == "X" &&
            allCells[4].innerHTML == "X" &&
            allCells[7].innerHTML == "X") ||
        (allCells[2].innerHTML == "X" &&
            allCells[5].innerHTML == "X" &&
            allCells[8].innerHTML == "X") ||
        (allCells[0].innerHTML == "X" &&
            allCells[4].innerHTML == "X" &&
            allCells[8].innerHTML == "X") ||
        (allCells[2].innerHTML == "X" &&
            allCells[4].innerHTML == "X" &&
            allCells[6].innerHTML == "X")
    ) {
        return 2;
    } else if (
        (allCells[0].innerHTML == "0" &&
            allCells[1].innerHTML == "0" &&
            allCells[2].innerHTML == "0") ||
        (allCells[3].innerHTML == "0" &&
            allCells[4].innerHTML == "0" &&
            allCells[5].innerHTML == "0") ||
        (allCells[6].innerHTML == "0" &&
            allCells[7].innerHTML == "0" &&
            allCells[8].innerHTML == "0") ||
        (allCells[0].innerHTML == "0" &&
            allCells[3].innerHTML == "0" &&
            allCells[6].innerHTML == "0") ||
        (allCells[1].innerHTML == "0" &&
            allCells[4].innerHTML == "0" &&
            allCells[7].innerHTML == "0") ||
        (allCells[2].innerHTML == "0" &&
            allCells[5].innerHTML == "0" &&
            allCells[8].innerHTML == "0") ||
        (allCells[0].innerHTML == "0" &&
            allCells[4].innerHTML == "0" &&
            allCells[8].innerHTML == "0") ||
        (allCells[2].innerHTML == "0" &&
            allCells[4].innerHTML == "0" &&
            allCells[6].innerHTML == "0")
    ) {
        return 1;
    } else {
        return 0;
    }

}


function clearGrid() {
    for (let i = 0; i < allCells.length; i++) {
        allCells[i].innerHTML = "";
    }
}

function restartGame() {
    startBtn.innerHTML = "Game is Starting ... ";
    startBtn.disabled = true;
    gameBoard.classList.add("disabled");

    setTimeout(function () {
        clearGrid();
        startBtn.disabled = false;
        gameBoard.classList.remove("disabled");
        startBtn.click();
    }, 3000);
}