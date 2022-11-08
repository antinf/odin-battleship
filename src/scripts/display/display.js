class Display {
  constructor(player, isPlayer) {
    this.player = player;
    this.isPlayer = isPlayer;
    this.boardElement = this.getBoard();

    // initalizes the grid on both sides
    this.displayGrid();
  }

  addSpaceListeners(PLAYERDISPLAY) {
    const allSpaces = this.boardElement.querySelectorAll('.space');
    allSpaces.forEach((space) => {
      space.addEventListener('click', () => {
        // play player turn
        PLAYERDISPLAY.player.playerTurn(this.player.Gameboard, [9 - space.getAttribute('x'), space.getAttribute('y')]);
        // update cpu grid
        this.displayGrid();
        // add event listeners again that were removed (recursive)
        this.addSpaceListeners(PLAYERDISPLAY);
        // play cpu turn
        this.player.cpuTurn(PLAYERDISPLAY.player.Gameboard);
        // update player grid
        PLAYERDISPLAY.displayGrid();
      });
    });
  }

  getBoard() {
    if (this.isPlayer === true) {
      return document.querySelector('#player-board');
    }
    return document.querySelector('#cpu-board');
  }

  displayGrid() {
    // clear grid
    this.boardElement.innerHTML = '';
    // store the board array in a variable
    const board = this.player.Gameboard.boardArray;
    // create 10 rows
    for (let i = 0; i < 10; i += 1) {
      // create a row
      const row = document.createElement('div');
      /* the index is set to 9 - i. 9 being the max grid size
      so essentially it will appear to display the rows in reverse
      on screen */
      row.setAttribute('index', 9 - i);
      // add row to row class
      row.setAttribute('class', 'row');
      // create 10 spaces per row
      for (let j = 0; j < 10; j += 1) {
        // create a space
        const space = document.createElement('div');
        // set coordinates
        // sets x as 9 - i for same reason as above comment
        space.setAttribute('x', 9 - i);
        space.setAttribute('y', j);
        // add space to space class
        space.setAttribute('class', 'space');
        /* if space is 'S' add space to ship class
        doesn't display enemy ships to player */
        if (board[i][j] === 'S' && this.isPlayer === true) {
          space.classList.add('ship');
        }
        // if space is 'M' add space to miss class
        if (board[i][j] === 'M') {
          space.classList.add('miss');
        }
        // if space is 'H' add space to hit class
        if (board[i][j] === 'H') {
          space.classList.add('hit');
        }

        // add space to row
        row.appendChild(space);
      }
      // append row to player board;
      this.boardElement.appendChild(row);
    }
  }
}

export default Display;
