import Cell from './models/Cell.js';
import Grid from './models/Grid.js';
import GameOfLife from './models/GameOfLife.js';

// Main function to start the game
function main(cells) {

  let aliveCells = cells.map(cell => new Cell(cell[0], cell[1]));

  // Create a new GameOfLife instance with the Grid
  const gameOfLife = new GameOfLife(new Grid(aliveCells));

  // Tick the game/process the next generation
  gameOfLife.tick();
  
  // Get the current generation
  const currentGeneration = gameOfLife.getCurrentGeneration();

  return currentGeneration.map(cell => [cell.getRow(), cell.getCol()]);
}

export default main;