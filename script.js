(function() {

   let board = [
      ['', '', ''],
      ['', '', ''],
      ['', '', '']
   ];
   let currentPlayer = 'X'

   function displayBoard() {
      const boardDOM = document.getElementById('boardGrid');
      boardDOM.innerHTML = '';

      board.forEach((row, rowIndex) => {
         row.forEach((col, colIndex) => {
            const boardElementDOM = document.createElement('div');
            boardElementDOM.classList.add('board-cell');
            boardElementDOM.innerText = col;

            boardElementDOM.dataset.row = rowIndex;
            boardElementDOM.dataset.col = colIndex;

            boardElementDOM.addEventListener('click', function() {
               const row = this.dataset.row;
               const col = this.dataset.col;
               addPiece(Number(row), Number(col))
            });
            document.getElementById('boardGrid').appendChild(boardElementDOM)});
      });
  }

   function addPiece(row, col) {
      let announcement = '';

      if (board[row][col] === '') {
         board[row][col] = currentPlayer;

         if (checkWin()) {
            announcement = `Player ${currentPlayer} wins!`;
            document.getElementById('announcement').innerText = announcement;
         } else if (isBoardFull()) {
            announcement = `The game is a tie!`;
            document.getElementById('announcement').innerText = announcement;
         } else {
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
         }
         displayBoard();
      } else {
         announcement = `That spot is taken. Try again.`;
         document.getElementById('announcement').innerText = announcement;
      }
   }

   function isBoardFull() {
      return board.every(row => row.every(cell => cell !== ''));
   }

   function checkWin() {
      for (let i = 0; i < 3; i++) {
         if (board[i][0] === currentPlayer && board[i][1] === currentPlayer && board[i][2] === currentPlayer)
            return true;
         if (board[0][i] === currentPlayer && board[1][i] === currentPlayer && board[2][i] === currentPlayer)
            return true;
      } 
      if (board[0][0] === currentPlayer && board[1][1] === currentPlayer && board[2][2] === currentPlayer)
         return true;
      if (board[0][2] === currentPlayer && board[1][1] === currentPlayer && board[2][0] === currentPlayer)
         return true;
   
      return false;
   }

   function start() {
      const playerForm = document.getElementById('playerForm');
      playerForm.addEventListener('submit', function() {
         event.preventDefault();

         const player1Input = document.getElementById('player1Input').value;
         const player2Input = document.getElementById('player2Input').value;

         if ((player1Input === '') || (player2Input === '')) {
            alert('Please input correct names')
         } else {
            const player1 = document.createElement('div');
            const player2 = document.createElement('div');

            player1.innerText = player1Input + " (x)";
            player2.innerText = player2Input + " (o)";

            document.getElementById('names').appendChild(player1);
            document.getElementById('names').appendChild(player2);
            
            document.getElementById('playerForm').style.display = "none";

            displayBoard();
            const reset = document.createElement('button');
            reset.innerText = "Reset";
            reset.addEventListener('click', function() {
               location.reload();
               start();
            });
            document.getElementById('board').appendChild(reset);
            
            const announcement = document.createElement('div');
            announcement.setAttribute('id', 'announcement');
            document.getElementById('board').appendChild(announcement);
         }
      })
   }

   start();
})();