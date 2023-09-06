const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

console.log('Welcome! Enter a calculation, and it will give you the answer.');

function calculate(input) {
  try {
    let result = eval(input);
    let operator = '';
    
    if (input.includes('+')) {
      operator = '+';
    } else if (input.includes('-')) {
      operator = '-';
    } else if (input.includes('*')) {
      operator = '*';
    } else if (input.includes('/')) {
      operator = '/';
    }
    
    if (operator === '') {
      return 'Error: Invalid input';
    }

    return `=${result}`;
  } catch (error) {
    return 'Error: Invalid input';
  }
}

function startCalculator() {
  rl.question('>', (input) => {
    if (input.toLowerCase() === 'exit') {
        console.log('Good bye')
      rl.close();
    } else {
      const result = calculate(input);
      console.log(result);
      startCalculator();
    }
  });
}

startCalculator();



Step1: terminal used for type exit 
goodbye

next 1+1  example

