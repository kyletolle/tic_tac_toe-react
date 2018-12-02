import BoardConfig from './BoardConfig';

class SquareIndex {
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

export default SquareIndex;
