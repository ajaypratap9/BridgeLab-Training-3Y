/**
 * Question 7: Function Factory and Closures
 *
 * Task:
 * Write a function makeMultiplier(multiplier) that returns another function to
 * multiply any number by that multiplier.
 *
 * Example:
 *   const triple = makeMultiplier(3);
 *   console.log(triple(5)); // 15
 *
 * Explain how closure works in this example.
 */

console.log("==============================================================");
console.log(" Demonstration: Question 7 - Function Closures (makeMultiplier) ");
console.log("==============================================================\n");

/**
 * Higher-order factory function that returns a multiplier function.
 *
 * @param {number} multiplier - The factor by which inputs will be multiplied.
 * @returns {Function} A closure that multiplies its argument by the remembered multiplier.
 */
function makeMultiplier(multiplier) {
  // 'multiplier' is part of the lexical environment of makeMultiplier

  return function (number) {
    // The inner function maintains a reference to 'multiplier'
    // via a closure even after makeMultiplier has returned.
    return number * multiplier;
  };
}

// --- Demonstration ---

// Create specialized multiplier functions
const double = makeMultiplier(2);
const triple = makeMultiplier(3);
const tenfold = makeMultiplier(10);

console.log(">>> Testing the generated multiplier functions:");
console.log("triple(5)   :", triple(5));     // Expected: 15
console.log("double(7)   :", double(7));     // Expected: 14
console.log("tenfold(4.5):", tenfold(4.5)); // Expected: 45

// -------------------------------------------------------------
// Detailed Explanation of Closure
// -------------------------------------------------------------
console.log("\n==================== HOW CLOSURE WORKS HERE ====================");
console.log(
  "1. WHAT IS A CLOSURE?\n" +
  "   A closure is the combination of a function bundled together (enclosed) with\n" +
  "   references to its surrounding lexical environment (variables outside itself).\n\n" +
  "2. STEP-BY-STEP LIFECYCLE:\n" +
  "   Step A: When `makeMultiplier(3)` is executed, a new execution context is created\n" +
  "           where the local parameter `multiplier` is assigned the value 3.\n" +
  "   Step B: `makeMultiplier` returns the inner anonymous function:\n" +
  "           `function(number) { return number * multiplier; }`\n" +
  "   Step C: Under normal function execution, once `makeMultiplier` finishes,\n" +
  "           its local variables would be cleared from the stack.\n" +
  "   Step D: BUT because the returned inner function still references `multiplier`,\n" +
  "           JavaScript preserves `multiplier = 3` in heap memory within the function's\n" +
  "           `[[Scopes]]` closure reference.\n" +
  "   Step E: When `triple(5)` is later called:\n" +
  "           - `number` is set to 5 in its local scope.\n" +
  "           - It looks for `multiplier` in its local scope (not found).\n" +
  "           - It climbs up the scope chain into the closure scope and finds `multiplier = 3`.\n" +
  "           - It returns `5 * 3 = 15`.\n\n" +
  "3. INDEPENDENT CLOSURE INSTANCES:\n" +
  "   Each call to `makeMultiplier` creates a completely distinct, isolated closure environment.\n" +
  "   `double` holds `multiplier = 2`, while `triple` holds `multiplier = 3` without interference."
);
console.log("================================================================\n");
