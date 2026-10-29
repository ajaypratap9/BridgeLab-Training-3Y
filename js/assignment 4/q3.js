/**
 * Question 3: Understanding `this` Binding in Arrow Functions vs Regular Functions
 *
 * Task:
 * Create an object user with:
 *   - a property name
 *   - a method showName written as an arrow function
 * Log the output and explain why this.name is undefined.
 * Then fix it by using a normal function.
 */

console.log("==============================================================");
console.log(" Demonstration: Question 3 - 'this' in Arrow vs Normal Functions ");
console.log("==============================================================\n");

// 1. Initial Object with an arrow function method
const userWithArrowFunction = {
  name: "Alex Johnson",
  showName: () => {
    // Arrow functions retain lexical 'this' from their definition scope
    console.log(`[Arrow Function Method] Output: this.name is -> ${this ? this.name : undefined}`);
    console.log(`[Arrow Function Method] Value of 'this':`, this);
  }
};

console.log(">>> Invoking showName (Arrow Function):");
userWithArrowFunction.showName();

// -------------------------------------------------------------
// EXPLANATION: Why is `this.name` undefined?
// -------------------------------------------------------------
console.log("\n==================== WHY THIS IS UNDEFINED ====================");
console.log(
  "1. Arrow functions DO NOT have their own execution context or `this` binding.\n" +
  "2. Instead, arrow functions resolve `this` lexically from their enclosing scope\n" +
  "   at the time of creation.\n" +
  "3. An object literal `{ ... }` DOES NOT create a new local scope for `this`.\n" +
  "4. Therefore, the arrow function captures `this` from the surrounding file/module\n" +
  "   scope (in Node.js CommonJS, `module.exports`, which is `{}` by default; in a\n" +
  "   browser, the `window` object).\n" +
  "5. Since the module/global object does not have a `name` property defined on it,\n" +
  "   `this.name` evaluates to `undefined`."
);
console.log("================================================================\n");

// 2. Fixing the issue using a normal (regular) function
const userWithNormalFunction = {
  name: "Alex Johnson",

  // Using a regular function expression
  showNameRegular: function () {
    console.log(`[Regular Function] Hello, my name is ${this.name}`);
  },

  // Using ES6 method definition shorthand (also dynamically binds 'this')
  showNameShorthand() {
    console.log(`[Method Shorthand] Hello, my name is ${this.name}`);
  }
};

console.log(">>> Invoking fixed methods (Regular Functions):");
userWithNormalFunction.showNameRegular();
userWithNormalFunction.showNameShorthand();

// -------------------------------------------------------------
// EXPLANATION: Why normal functions work
// -------------------------------------------------------------
console.log("\n================== WHY NORMAL FUNCTIONS WORK ===================");
console.log(
  "1. Regular functions bind `this` dynamically at runtime based on the call-site\n" +
  "   (how and where the function is invoked).\n" +
  "2. When invoked as `userWithNormalFunction.showNameRegular()`, the object preceding\n" +
  "   the dot (`userWithNormalFunction`) becomes the implicit `this` context.\n" +
  "3. Thus, `this.name` successfully resolves to 'Alex Johnson'."
);
console.log("================================================================\n");
