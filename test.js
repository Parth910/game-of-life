import Cell from './src/models/Cell.js';
import Grid from './src/models/Grid.js';
import GameRulesService from './src/services/GameRulesService.js';
import GameOfLife from './src/models/GameOfLife.js';
import main from './src/index.js';

// Simple test runner
function runTest(name, testFn) {
  try {
    testFn();
    console.log(`✅ ${name} passed`);
  } catch (error) {
    console.error(`❌ ${name} failed:`, error.message);
  }
}

// Test Cell class
runTest('Cell creation and properties', () => {
  const cell = new Cell(1, 2);
  if (cell.getRow() !== 1 || cell.getCol() !== 2) {
    throw new Error('Cell properties not set correctly');
  }
});

runTest('Cell equality', () => {
  const cell1 = new Cell(1, 2);
  const cell2 = new Cell(1, 2);
  const cell3 = new Cell(2, 1);
  
  if (!cell1.isEqual(cell2)) {
    throw new Error('Equal cells not recognized as equal');
  }
  if (cell1.isEqual(cell3)) {
    throw new Error('Different cells recognized as equal');
  }
});

runTest('Cell neighbors', () => {
  const cell = new Cell(1, 1);
  const neighbors = cell.getNeighbors();
  
  if (neighbors.length !== 8) {
    throw new Error(`Expected 8 neighbors, got ${neighbors.length}`);
  }
  
  // Check if all neighbors are at correct positions
  const expectedPositions = [
    [0, 0], [0, 1], [0, 2],
    [1, 0],         [1, 2],
    [2, 0], [2, 1], [2, 2]
  ];
  
  for (const [row, col] of expectedPositions) {
    const hasNeighbor = neighbors.some(n => n.getRow() === row && n.getCol() === col);
    if (!hasNeighbor) {
      throw new Error(`Missing neighbor at position [${row}, ${col}]`);
    }
  }
});

// Test GameRulesService
runTest('Game rules - survival', () => {
  const rules = new GameRulesService();
  const neighbors = [new Cell(0, 0), new Cell(0, 1)]; // 2 neighbors
  
  if (!rules.shouldSurvive(neighbors)) {
    throw new Error('Cell should survive with 2 neighbors');
  }
  
  neighbors.push(new Cell(1, 0)); // 3 neighbors
  if (!rules.shouldSurvive(neighbors)) {
    throw new Error('Cell should survive with 3 neighbors');
  }
  
  neighbors.push(new Cell(1, 1)); // 4 neighbors
  if (rules.shouldSurvive(neighbors)) {
    throw new Error('Cell should not survive with 4 neighbors');
  }
});

runTest('Game rules - revival', () => {
  const rules = new GameRulesService();
  const neighbors = [new Cell(0, 0), new Cell(0, 1), new Cell(1, 0)]; // 3 neighbors
  
  if (!rules.shouldRevive(neighbors)) {
    throw new Error('Cell should revive with 3 neighbors');
  }
  
  neighbors.push(new Cell(1, 1)); // 4 neighbors
  if (rules.shouldRevive(neighbors)) {
    throw new Error('Cell should not revive with 4 neighbors');
  }
});

// Test main game logic with a simple pattern
runTest('Main game logic - blinker pattern', () => {
  // Create a blinker pattern (3 cells in a row)
  const initialCells = [
    [1, 1],
    [1, 2],
    [1, 3]
  ];
  
  const result = main(initialCells);
  
  // After one tick, the blinker should be vertical
  const expectedPositions = [
    [0, 2],
    [1, 2],
    [2, 2]
  ];
  
  if (result.length !== expectedPositions.length) {
    throw new Error(`Expected ${expectedPositions.length} cells, got ${result.length}`);
  }
  
  for (const [row, col] of expectedPositions) {
    const hasCell = result.some(([r, c]) => r === row && c === col);
    if (!hasCell) {
      throw new Error(`Missing cell at position [${row}, ${col}]`);
    }
  }
});

console.log('\nAll tests completed!'); 