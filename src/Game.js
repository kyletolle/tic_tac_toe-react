import React, { Component } from 'react';

function Sort(props) {
  return (
    <button
    onClick={props.onClick}
    >
      Sort by {props.value}
    </button>
  );
}

function Square(props) {
  let classNameText = 'square';
  if (props.isWinningSquare === true) {
    classNameText += ' winning';
  }

  return (
    <button
      className={classNameText}
      onClick={props.onClick}
    >
      {props.value}
    </button>
  );
}

class Board extends React.Component {
  renderSquare(i, isWinningSquare) {
    return (
      <Square
        value={this.props.squares[i]}
        key={i}
        onClick={() => this.props.onClick(i)}
        isWinningSquare={isWinningSquare}
      />
    );
  }

  // Got this idea from: https://blog.cloudboost.io/for-loops-in-react-render-no-you-didnt-6c9f4aa73778
  renderBoard() {
    let currentSquare = 0;
    let rows = [];

    for (let j = 0; j < BoardConfig.numRows; j++) {
      let columns = [];
      for (let k = 0; k < BoardConfig.numColumns; k++) {
        let isWinningSquare = false;
        if (this.props.winningSquaresIndexes != null) {
          const winningSquaresIndexes = this.props.winningSquaresIndexes;
          for (let a = 0; a < winningSquaresIndexes.length; a++) {
            if (currentSquare === winningSquaresIndexes[a]) {
              isWinningSquare = true;
            }
          }
        }
        columns.push(
          this.renderSquare(currentSquare, isWinningSquare)
        );
        currentSquare += 1;
      }
      rows.push(
        <div className="board-row" key={j}>
          {columns}
        </div>
      );
    }

    return rows;
  }

  render() {
    return this.renderBoard();
  }
}

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [{
        squares: Array(0).fill(null),
        indexClicked: null,
      }],
      stepNumber: 0,
      xIsNext: true,
      sortIsAscending: true,
    };
  }

  jumpTo(step) {
    this.setState({
      stepNumber: step,
      xIsNext: (step % 2) === 0,
    });
  }

  handleClick(i) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice()
    const contest = new Contest(squares)
    const squareAlreadyFilled = squares[i];
    if (squareAlreadyFilled || contest.hasEnded()) {
      return;
    }
    squares[i] = this.state.xIsNext ? 'X' : 'O';
    this.setState({
      history: history.concat([{
        squares: squares,
        indexClicked: i,
      }]),
      stepNumber: history.length,
      xIsNext: !this.state.xIsNext,
    });
  }

  handleSortClick() {
    this.setState({
      sortIsAscending: !this.state.sortIsAscending,
    });
  }

  renderSort() {
    return (
      <Sort
        value={this.state.sortIsAscending ? 'Desending' : 'Ascending'}
        onClick={() => this.handleSortClick()}
      />
    );
  }

  renderMoves() {
    const history = this.state.history;
    const moves = history.map((step, move) => {
      let desc;
      if (move) {
        const index = new Index(step.indexClicked);
        desc = 'Go to move #' + move + ' at [' + index.row() + ',' + index.column() + ']';
      } else {
        desc = 'Go to game start';
      }
      return (
        <li key={move}>
          <button
            className={(this.state.stepNumber === move) ? 'current-step' : ''}
            onClick={() => this.jumpTo(move)}
          >
            {desc}
          </button>
        </li>
      );
    });

    return (
      this.state.sortIsAscending ? moves : moves.reverse()
    );
  }

  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const contest = new Contest(current.squares);
    contest.hasEnded()

    let status;
    if (contest.isADraw()) {
      status = 'Draw!'
    } else if (contest.hasWinner()) {
      status = 'Winner: ' + contest.winner;
    } else {
      status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
    }

    return (
      <div className="game">
        <div className="game-board">
          <Board
            squares={current.squares}
            onClick={(i) => this.handleClick(i)}
            winningSquaresIndexes={contest.winningSquaresIndexes}
          />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <div className="move-list">
            <div className="moves">Moves | {this.renderSort()}</div>
            <ol reversed={this.state.sortIsAscending ? false : true}>{this.renderMoves()}</ol>
          </div>
        </div>
      </div>
    );
  }
}

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

const BoardConfig = {
  numRows: 3,
  numColumns: 3
}

class Index {
  constructor(at) {
    this.at = at;
  }

  row() {
    return Math.floor(this.at/BoardConfig.numRows);
  }

  column() {
    return this.at % BoardConfig.numColumns;
  }
}

export default Game;