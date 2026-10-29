/**
 * Question 9: Random Math Quiz Generator
 * 
 * Requirements:
 * - Use Math.random() to generate two numbers (1-20) and a random operator from ['+', '-', '*', '/'].
 * - Calculate the correct answer using switch statement.
 * - Display question and correct answer in the console.
 * - Ensure division is rounded to two decimals with toFixed(2).
 */

/**
 * Generates and evaluates a single random arithmetic quiz question.
 */
function generateQuizQuestion() {
  // Step 1: Generate two random integers between 1 and 20
  const operandOne = Math.floor(Math.random() * 20) + 1;
  const operandTwo = Math.floor(Math.random() * 20) + 1;

  // Step 2: Randomly pick an operator from ['+', '-', '*', '/']
  const operators = ['+', '-', '*', '/'];
  const operatorIndex = Math.floor(Math.random() * operators.length);
  const selectedOperator = operators[operatorIndex];

  // Step 3: Calculate the correct answer using a switch statement
  let calculatedAnswer;

  switch (selectedOperator) {
    case '+':
      calculatedAnswer = operandOne + operandTwo;
      break;

    case '-':
      calculatedAnswer = operandOne - operandTwo;
      break;

    case '*':
      calculatedAnswer = operandOne * operandTwo;
      break;

    case '/':
      // Ensure division result is formatted to two decimal places
      calculatedAnswer = Number((operandOne / operandTwo).toFixed(2));
      break;

    default:
      console.log("Unsupported operator encountered.");
      return;
  }

  // Step 4: Display the question and correct answer
  const questionString = `What is ${operandOne} ${selectedOperator} ${operandTwo}?`;
  console.log(`Question       : ${questionString}`);
  console.log(`Correct Answer : ${calculatedAnswer}`);
  console.log("-----------------------------------------");

  return { operandOne, operandTwo, selectedOperator, calculatedAnswer };
}

// Primary execution: Single challenge
console.log("=== Q9: Random Math Quiz Generator ===");
console.log("Challenge 1 (Live Run):");
generateQuizQuestion();

// Optional demonstration: Generate a round of 4 additional questions to demonstrate variety
console.log("\nGenerating Practice Quiz Round (All Operators Showcase):");
for (let i = 1; i <= 4; i++) {
  console.log(`Quiz Item #${i}:`);
  generateQuizQuestion();
}
