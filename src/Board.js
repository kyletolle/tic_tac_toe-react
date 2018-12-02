import React, { Component } from 'react';
import Square from './Square';
import BoardConfig from './BoardConfig';

class Board extends Component {
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

export default Board;
