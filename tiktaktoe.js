// Move twodarray outside so it's globally accessible
let twodarray = [
   ['', '', ''],
   ['', '', ''],
   ['', '', ''],
 ];
 
 function printboard() {
   const boardDiv = document.getElementById('board');
   boardDiv.innerHTML = ''; // Clear the board
 
   for (let i = 0; i < twodarray.length; i++) {
     let row = document.createElement('div');
     for (let j = 0; j < twodarray[i].length; j++) {
       let col = document.createElement('span');
       col.style.padding = '10px';
       col.style.border = '1px solid black';
       col.style.display = 'inline-block';
       col.style.width = '30px';
       col.style.height = '30px';
       col.style.textAlign = 'center';
       col.innerHTML = twodarray[i][j] === '' ? '&nbsp;' : twodarray[i][j];
       row.appendChild(col);
     }
     boardDiv.appendChild(row);
   }
 }
 
 const startGame = () => {
   // Reset the board array
   twodarray = [
     ['', '', ''],
     ['', '', ''],
     ['', '', ''],
   ];
 //yo
   const player = (name, symbol) => {
     return { name, symbol };
   };
 
   const player1 = player("player1", "X");
   const player2 = player("player2", "O");
 
   function pickspot() {
      let row, col;
  let k = 'yo';
      // Loop until a valid row is provided
      while (true) {
        row = parseInt(prompt("Enter row choice {0,1, or 2}"));
        if (row >= 0 && row <= 2 && !isNaN(row)) break;
        alert("Invalid input! Please enter a row between 0 and 2.");
      }
    
      // Loop until a valid column is provided
      while (true) {
        col = parseInt(prompt("Enter col choice {0,1, or 2}"));
        if (col >= 0 && col <= 2 && !isNaN(col)) break;
        alert("Invalid input! Please enter a column between 0 and 2.");
      }
    
      return [row, col];
    }
 
   const checkWin = (twodarray) => {
     // Check rows
     for (let i = 0; i < 3; i++) {
       if (twodarray[i][0] !== '' && twodarray[i][0] === twodarray[i][1] && twodarray[i][1] === twodarray[i][2]) {
         return true; // A row is complete
       }
     }
 
     // Check columns
     for (let i = 0; i < 3; i++) {
       if (twodarray[0][i] !== '' && twodarray[0][i] === twodarray[1][i] && twodarray[1][i] === twodarray[2][i]) {
         return true; // A column is complete
       }
     }
 
     // Check diagonals
     if (twodarray[0][0] !== '' && twodarray[0][0] === twodarray[1][1] && twodarray[1][1] === twodarray[2][2]) {
       return true; // First diagonal (top-left to bottom-right)
     }
     if (twodarray[0][2] !== '' && twodarray[0][2] === twodarray[1][1] && twodarray[1][1] === twodarray[2][0]) {
       return true; // Second diagonal (top-right to bottom-left)
     }
 
     return false; // No winner yet
   };
 
   let counter = 1;
 
   function gameLoop() {
      printboard(); // Print the board after each move
      
      if (checkWin(twodarray)) { 
        // If a win is detected, log the winner and stop the game
        alert(`Player ${counter % 2 === 0 ? "O" : "X"} wins!`);
        return; // Stop the game loop
      } else if (counter > 9) {
        // If all 9 moves are made and no winner, it's a tie
        console.log("It's a tie!");
        return; // Stop the game loop
      }
  
      // If no winner or tie, continue the game
      let userChoice = pickspot();
  
      if (twodarray[userChoice[0]][userChoice[1]] !== '') {
        alert("Spot taken! Try again.");
        setTimeout(gameLoop, 100); // Continue the game loop after a short delay
      } else {
        // Alternate between players
        if (counter % 2 === 0) {
          twodarray[userChoice[0]][userChoice[1]] = "X";
        } else {
          twodarray[userChoice[0]][userChoice[1]] = "O";
        }
        counter++;
        printboard(); // Immediately update the board
        setTimeout(gameLoop, 100); // Continue the game loop after a short delay
      }
    }
 
   printboard(); // Display the initial board
   gameLoop();// Start the game loop after a short delay
 };
 
 window.onload = function() {
   printboard(); // Display the initial empty board on page load
 };
 
 const startButton = document.getElementById('start');
 startButton.addEventListener('click', startGame);
 