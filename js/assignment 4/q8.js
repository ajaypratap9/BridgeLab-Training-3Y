/**
 * Question 8: Custom Polyfill / Prototype Extension: Array.prototype.myMap
 *
 * Task:
 * Add a custom prototype method myMap() to all arrays that behaves like the built-in map() function.
 * Example:
 *   [1, 2, 3].myMap(num => num * 2); // [2, 4, 6]
 */

console.log("==============================================================");
console.log(" Demonstration: Question 8 - Array.prototype.myMap Polyfill   ");
console.log("==============================================================\n");

/**
 * Custom implementation of Array.prototype.map.
 *
 * @param {Function} callback - Function called with (element, index, array).
 * @param {Object} [thisArg] - Value to use as 'this' when executing callback.
 * @returns {Array} A new array containing the results of calling callback on every element.
 */
Array.prototype.myMap = function (callback, thisArg) {
  // 1. Ensure 'this' is not null or undefined
  if (this == null) {
    throw new TypeError("Array.prototype.myMap called on null or undefined");
  }

  // 2. Validate that the callback is indeed a function
  if (typeof callback !== "function") {
    throw new TypeError(`${callback} is not a function`);
  }

  // 3. 'this' refers to the array on which myMap was invoked
  const originalArray = this;
  const length = originalArray.length >>> 0; // Convert to unsigned 32-bit integer length
  const mappedArray = new Array(length);

  // 4. Iterate over each index
  for (let i = 0; i < length; i++) {
    // Check if property exists on the array to handle sparse arrays correctly (e.g. [1, , 3])
    if (i in originalArray) {
      // Invoke callback with: (currentValue, index, originalArray), binding thisArg if supplied
      mappedArray[i] = callback.call(thisArg, originalArray[i], i, originalArray);
    }
  }

  // 5. Return the newly created array
  return mappedArray;
};

// -------------------------------------------------------------
// Demonstration & Test Cases
// -------------------------------------------------------------

// Test Case 1: Required Example (Doubling numbers)
const numbers = [1, 2, 3];
const doubled = numbers.myMap((num) => num * 2);

console.log(">>> Test Case 1: [1, 2, 3].myMap(num => num * 2)");
console.log("Original Array :", numbers);
console.log("Result Array   :", doubled); // [2, 4, 6]

// Test Case 2: Using index and array arguments in callback
const words = ["ant", "bison", "camel"];
const indexedWords = words.myMap((word, index) => `${index + 1}. ${word.toUpperCase()}`);
console.log("\n>>> Test Case 2: Using element and index parameters");
console.log("Original words :", words);
console.log("Indexed words  :", indexedWords);

// Test Case 3: Using 'thisArg' parameter context
const multiplierService = {
  factor: 10,
  multiply(val) {
    return val * this.factor;
  }
};
const multiplied = [2, 4, 6].myMap(function (num) {
  return this.multiply(num);
}, multiplierService);
console.log("\n>>> Test Case 3: Using thisArg context");
console.log("Multiplied with service factor 10:", multiplied); // [20, 40, 60]

// Test Case 4: Handling sparse arrays (empty slots)
const sparseArray = [1, , 3]; // index 1 is empty slot
const sparseMapped = sparseArray.myMap((x) => x * 10);
console.log("\n>>> Test Case 4: Handling sparse arrays correctly");
console.log("Original sparse array :", sparseArray);
console.log("Mapped sparse array   :", sparseMapped); // [10, <empty>, 30]

// Test Case 5: Error handling when non-function passed
console.log("\n>>> Test Case 5: Error handling for invalid callback");
try {
  [1, 2, 3].myMap("not a function");
} catch (error) {
  console.log("Caught expected error:", error.message);
}

// -------------------------------------------------------------
// Verification against built-in map()
// -------------------------------------------------------------
console.log("\n>>> Verification: Comparing myMap output with native Array.prototype.map:");
const sample = [5, 10, 15, 20];
const nativeResult = sample.map((x) => x / 5);
const customResult = sample.myMap((x) => x / 5);

console.log("Native map() result :", nativeResult);
console.log("Custom myMap() result:", customResult);
console.log("Do results match?    :", JSON.stringify(nativeResult) === JSON.stringify(customResult));
