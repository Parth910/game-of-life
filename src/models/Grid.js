// Grid class
class Grid {
  constructor(aliveCells) {
    this.aliveCells = aliveCells;
  }

  // Get all alive cells
  getAliveCells() {
    return this.aliveCells;
  }

  // Check if a cell is in a list of cells
  containsCell(cells, targetCell) {
    return cells.some(cell => cell.isEqual(targetCell));
  }

  // Get all dead cells
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
}

export default Grid;