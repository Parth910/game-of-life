class Cell {
  constructor(row, col) {
    this.row = row;
    this.col = col;
  }

  getRow() {
    return this.row;
  }

  getCol() {
    return this.col;
  }

  isEqual(cell) {
    return this.row === cell.row && this.col === cell.col;
  }

  getNeighbors() {
    const row = this.row;
    const col = this.col;
    const neighbors = [];

    for (let i = -1; i <= 1; i++) {
      for (let j = -1; j <= 1; j++) {
        if (i === 0 && j === 0) {
          continue;
        }
        const neighbor = new Cell(row + i, col + j);
        neighbors.push(neighbor);
      }
    }

    return neighbors;
  }
  
  
}

export default Cell;