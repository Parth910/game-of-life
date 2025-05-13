// GameRulesService class
class GameRulesService {
  shouldSurvive(aliveNeighbors) {
    // A live cell survives if it has 2 or 3 live neighbors
    return aliveNeighbors.length === 2 || aliveNeighbors.length === 3;
  }

  shouldRevive(aliveNeighbors) {
    // A dead cell becomes alive if it has exactly 3 live neighbors
    return aliveNeighbors.length === 3;
  }
}

export default GameRulesService; 