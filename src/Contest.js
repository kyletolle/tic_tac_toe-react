import BoardConfig from './BoardConfig';

class Contest {
  constructor(squares) {
    this._squares = squares;
    this._lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    this.winningSquaresIndexes = null;
    this.winner = null;
  }

  hasWinner() {
    for (let i = 0; i < this._lines.length; i++) {
      const [a, b, c] = this._lines[i];
      if (this._squares[a] &&
          this._squares[a] === this._squares[b] &&
          this._squares[a] === this._squares[c]
      ) {
        this.winningSquaresIndexes = this._lines[i];
        this.winner = this._squares[a];
        return true;
      }
    }
    return false;
  }

  isADraw() {
    return !this.hasWinner() && this._allSquaresAreFilled();
  }

  hasEnded() {
    return this.hasWinner() || this.isADraw();
  }

  _allSquaresAreFilled() {
    let numFilledSquares = 0;
    for (let i = 0; i < this._squares.length; i++) {
      if (this._squares[i] != null) {
        numFilledSquares += 1;
      }
    }
    return numFilledSquares === (BoardConfig.numRows * BoardConfig.numColumns)
  }
}

export default Contest;
