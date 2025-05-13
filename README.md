# Game of Life

A JavaScript implementation of Conway's Game of Life.

## Rules

The Game of Life follows these rules:

1. Any live cell with fewer than two live neighbors dies (underpopulation)
2. Any live cell with two or three live neighbors lives on to the next generation
3. Any live cell with more than three live neighbors dies (overpopulation) 
4. Any dead cell with exactly three live neighbors becomes a live cell (reproduction)

## Implementation

This implementation includes:

- Cell class for managing individual cell state and position
- Grid class for managing the game board
- GameRulesService for applying the rules of the game
- GameOfLife class orchestrating game progression
- Test suite validating core functionality

## Usage

Prerequisites:
- Node.js installed on your machine

To run the game:

1. Clone the repository
2. Navigate to root dir(game-of-life/)
3. Run `node app.js` to start the game

To Test the game:

1. Clone the repository
2. Navigate to root dir(game-of-life/)
3. Run `node test.js` to test the game


## Examples

Here are some common patterns in Conway's Game of Life:

### Still Life Patterns
1. Block (2x2 square)

Input
```
1,1
1,2
2,1
2,2
```
Output
```
1,1
1,2
2,1
2,2
```

### Oscillators
1. Blinker (Period 2)

Input
```
1,1
1,0
1,2
```
Output
```
1,1
0,1
2,1
```
