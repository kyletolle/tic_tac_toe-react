import React, { Component } from 'react';
import Sort from './Sort';
import BoardConfig from './BoardConfig';
import Board from './Board';
import Contest from './Contest';

class Game extends Component {
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
