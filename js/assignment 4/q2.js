/**
 * Question 2: Array Transformation using Higher-Order Functions and Callbacks
 *
 * Task:
 * Create a function applyOperation(numbers, operation) that takes an array and a callback function.
 * Use it to:
 *   - Double each number in [1, 2, 3, 4]
 *   - Square each number in [1, 2, 3, 4]
 */

/**
 * Higher-order function that applies a callback transformation to each element of an array.
 *
 * @param {Array<number>} numbers - An array of numerical values.
 * @param {Function} operation - Callback function executed for each element.
 * @returns {Array<number>} A new array containing the transformed values.
 */
function applyOperation(numbers, operation) {
  // Validate input parameters
  if (!Array.isArray(numbers)) {
    throw new TypeError("The first argument 'numbers' must be an Array.");
  }
  if (typeof operation !== "function") {
    throw new TypeError("The second argument 'operation' must be a Function.");
  }

  // Create a new array to preserve immutability of the input array
  const result = [];

  for (let i = 0; i < numbers.length; i++) {
    // Invoke the callback function for each element and store the returned value
    const transformedValue = operation(numbers[i], i, numbers);
    result.push(transformedValue);
  }

  return result;
}

// --- Callback Definition: Doubling a number ---
function doubleNumber(num) {
  return num * 2;
}

// --- Callback Definition: Squaring a number ---
function squareNumber(num) {
  return num * num;
}

// --- Demonstration ---
console.log("==============================================");
console.log(" Demonstration: Question 2 - applyOperation  ");
console.log("==============================================\n");

const inputNumbers = [1, 2, 3, 4];
console.log("Original Input Array:", inputNumbers);

// 1. Double each number using named callback function
const doubledNumbers = applyOperation(inputNumbers, doubleNumber);
console.log("\n1. Doubled numbers (using doubleNumber callback):");
console.log("   Result:", doubledNumbers);

// 2. Square each number using named callback function
const squaredNumbers = applyOperation(inputNumbers, squareNumber);
console.log("\n2. Squared numbers (using squareNumber callback):");
console.log("   Result:", squaredNumbers);

// 3. Alternative: Using inline ES6 arrow functions
const doubledInline = applyOperation(inputNumbers, (n) => n * 2);
const squaredInline = applyOperation(inputNumbers, (n) => n ** 2);
console.log("\n3. Inline arrow function tests:");
console.log("   Inline Doubled:", doubledInline);
console.log("   Inline Squared:", squaredInline);

// Verify immutability
console.log("\nVerify that original array remains unchanged:");
console.log("   Original Array:", inputNumbers);
