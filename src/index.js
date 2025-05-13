import Cell from './models/Cell.js';
import Grid from './models/Grid.js';
import GameOfLife from './models/GameOfLife.js';

function main(cells) {
  let aliveCells = cells.map(cell => new Cell(cell[0], cell[1]));
  const grid = new Grid(aliveCells);

  const gameOfLife = new GameOfLife(grid);

  gameOfLife.tick();

  const currentGeneration = gameOfLife.getCurrentGeneration();

  return currentGeneration.map(cell => [cell.getRow(), cell.getCol()]);
}

export default main;