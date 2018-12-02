import React from 'react';

function Sort(props) {
  return (
    <button
    onClick={props.onClick}
    >
      Sort by {props.value}
    </button>
  );
}

export default Sort;
