import React, { Component } from 'react';
import Contest from './Contest';

class Status extends Component {
  constructor(props) {
    super(props);

    this.state = {
      contest: props.contest,
      xIsNext: props.xIsNext,
    }
  }

  statusText() {
    const contest = this.state.contest;

    let statusText;
    if (contest.isADraw()) {
      statusText = 'Draw!'
    } else if (contest.hasWinner()) {
      statusText = 'Winner: ' + contest.winner;
    } else {
      statusText = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
    }
    return statusText;
  }

  render() {
    return (
      <div className="status">{this.statusText()}</div>
    );
  }
}

export default Status;
