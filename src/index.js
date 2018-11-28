import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

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
  return (
    <button
      className="square"
      onClick={props.onClick}
    >
      {props.value}
    </button>
  );
}

class Board extends React.Component {
  renderSquare(i) {
    return (
      <Square
        value={this.props.squares[i]}
        key={i}
        onClick={() => this.props.onClick(i)}
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
        columns.push(
          this.renderSquare(currentSquare)
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
    if (calculateWinner(squares) || squares[i]) {
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
    const winner = calculateWinner(current.squares);

    let status;
    if (winner) {
      status = 'Winner: ' + winner;
    } else {
      status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
    }

    return (
      <div className="game">
        <div className="game-board">
          <Board
            squares={current.squares}
            onClick={(i) => this.handleClick(i)}
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

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i< lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
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

// ================================

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);

