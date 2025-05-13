import GameRulesService from '../services/GameRulesService.js';

class GameError extends Error {
  constructor(message) {
    super(message);
    this.name = 'GameError';
  }
}

class GameOfLife {
  constructor(grid, gameRulesService = new GameRulesService()) {
    if (!grid) {
      throw new GameError('Grid is required for GameOfLife');
    }
    this.grid = grid;
    this.gameRulesService = gameRulesService;
  }

  getAliveNeighbors(cell, aliveCells) {
    if (!cell || typeof cell.getNeighbors !== 'function') {
      throw new GameError('Invalid cell object');
    }
    const neighbors = cell.getNeighbors();
    return neighbors.filter(neighbor => {
      if (!neighbor) {
        throw new GameError('Invalid neighbor cell detected');
      }
      return aliveCells.some(aliveCell => aliveCell.isEqual(neighbor));
    });
  }

  tick() {
    try {
      const aliveCells = this.grid.getAliveCells();
      const deadCells = this.grid.getDeadCells();
      const newAliveCells = [];
      
      if (!Array.isArray(aliveCells) || !Array.isArray(deadCells)) {
        throw new GameError('Invalid grid state: alive or dead cells not properly initialized');
      }

      // Process alive cells
      for (const cell of aliveCells) {
        const aliveNeighbors = this.getAliveNeighbors(cell, aliveCells);
        if (this.gameRulesService.shouldSurvive(aliveNeighbors)) {
          newAliveCells.push(cell);
        }
      }

      // Process dead cells
      for (const cell of deadCells) {
        const aliveNeighbors = this.getAliveNeighbors(cell, aliveCells);
        if (this.gameRulesService.shouldRevive(aliveNeighbors)) {
          newAliveCells.push(cell);
        }
      }

      this.grid.aliveCells = newAliveCells;
      return true;
    } catch (error) {
      if (error instanceof GameError) {
        throw error;
      }
      throw new GameError(`Error during game tick: ${error.message}`);
    }
  }

  getCurrentGeneration() {
    try {
      if (!this.grid || !this.grid.aliveCells) {
        throw new GameError('Grid or alive cells not properly initialized');
      }
      return Array.from(this.grid.aliveCells);
    } catch (error) {
      if (error instanceof GameError) {
        throw error;
      }
      throw new GameError(`Error getting current generation: ${error.message}`);
    }
  }
}

export default GameOfLife;