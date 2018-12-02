import React from 'react';

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

export default Square;
