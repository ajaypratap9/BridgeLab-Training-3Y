/**
 * Question 6: Event-Based Counter Simulation
 * 
 * Requirements:
 * - Use variable count = 0.
 * - Create two functions: increment() and decrement().
 * - Each function modifies count and logs the current value.
 * - Simulate “click” by calling these functions manually in code.
 * - Use a nested function to show function scope of count updates.
 */

// 1. Initialize count variable
let count = 0;

/**
 * Increments the counter by 1.
 * Utilizes a nested helper function to showcase function scope and lexical environment access.
 */
function increment() {
  // Nested function demonstrating function scope:
  // The inner function 'performIncrement' has access to the outer variable 'count' via closure / lexical scope chain.
  function performIncrement() {
    count++;
    return count;
  }

  // Execute the nested function
  const updatedValue = performIncrement();
  console.log(`[Event: Click -> Increment (+1)] Current Count: ${updatedValue}`);
  return updatedValue;
}

/**
 * Decrements the counter by 1.
 * Utilizes a nested helper function to demonstrate inner function scope modifying count.
 */
function decrement() {
  // Nested function with its own scope, updating the outer 'count' variable
  function performDecrement() {
    count--;
    return count;
  }

  // Execute the nested function
  const updatedValue = performDecrement();
  console.log(`[Event: Click -> Decrement (-1)] Current Count: ${updatedValue}`);
  return updatedValue;
}

/**
 * Bonus Demonstration: Modular Counter with Private Scope (Closure)
 * Demonstrates state encapsulation using nested functions.
 */
function createEncapsulatedCounter(initialValue = 0) {
  let privateCount = initialValue;

  function modify(amount) {
    privateCount += amount;
    return privateCount;
  }

  return {
    clickIncrement: () => {
      const val = modify(1);
      console.log(`  [Modular Counter] Increment -> Current: ${val}`);
      return val;
    },
    clickDecrement: () => {
      const val = modify(-1);
      console.log(`  [Modular Counter] Decrement -> Current: ${val}`);
      return val;
    },
    getValue: () => privateCount
  };
}

// ==========================================
// Simulation of Click Events
// ==========================================

console.log("==================================================");
console.log("       Q6: Event-Based Counter Simulation         ");
console.log("==================================================");
console.log(`Initial Counter Value: count = ${count}`);
console.log("--------------------------------------------------");
console.log("Simulating User Click Events on standard counter:");
console.log("--------------------------------------------------");

// Simulating a sequence of button clicks
increment(); // count becomes 1
increment(); // count becomes 2
increment(); // count becomes 3
decrement(); // count becomes 2
increment(); // count becomes 3
decrement(); // count becomes 2
decrement(); // count becomes 1

console.log("--------------------------------------------------");
console.log(`Final Global Counter Value: count = ${count}`);
console.log("--------------------------------------------------");

console.log("\nDemonstration of Modular Encapsulated Counter (Closure):");
const counterInstance = createEncapsulatedCounter(10);
counterInstance.clickIncrement();
counterInstance.clickIncrement();
counterInstance.clickDecrement();
console.log(`Final Encapsulated Value: ${counterInstance.getValue()}`);
console.log("==================================================\n");
