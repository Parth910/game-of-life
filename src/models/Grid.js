class Grid {
  constructor(aliveCells) {
    this.aliveCells = aliveCells;
  }

  getAliveCells() {
    return this.aliveCells;
  }

  containsCell(cells, targetCell) {
    return cells.some(cell => cell.isEqual(targetCell));
  }

  getDeadCells() {
    const aliveCells = this.aliveCells;
    const deadCells = [];
    
    // Get all unique neighbors of alive cells
    for (const cell of aliveCells) {
      for (const neighbor of cell.getNeighbors()) {
        // Check if the neighbor is not in alive cells and not already in deadCells
        if (!this.containsCell(aliveCells, neighbor) && !this.containsCell(deadCells, neighbor)) {
          deadCells.push(neighbor);
        }
      }
    }
    
    return deadCells;
  }

  addCell(cell) {
    this.aliveCells.push(cell);
  }

  removeCell(cell) {
    this.aliveCells = this.aliveCells.filter(c => !c.isEqual(cell));
  }
}

export default Grid;