import main from './src/index.js';
import readline from 'readline';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const aliveCells = [];

function promptUser() {
  rl.question('Enter row,col (or type "done" to finish): ', (input) => {
    if (input.toLowerCase() === 'done') {
      rl.close();
      const result = main(aliveCells);
      console.log('Result:');
      let output = "";
      for (const cell of result) {
       output += `${cell[0]},${cell[1]}\n`;
      }
      console.log(output);
    } else {
      const [row, col] = input.split(',').map(Number);
      if (!isNaN(row) && !isNaN(col)) {
        aliveCells.push([row, col]);
      } else {
        console.log('Invalid input. Please enter in the format "row,col".');
      }
      promptUser();
    }
  });

  return;
}

promptUser();
