/**
 * Question 1: Callbacks and Callback Flow
 *
 * Task:
 * Write a function greetUser(name, callback) that prints "Hello <name>" and then
 * executes a callback function showEndMessage() which prints "Welcome to the course!".
 * Demonstrate callback flow clearly.
 */

// Callback function to be executed after greeting
function showEndMessage() {
  console.log("Welcome to the course!");
}

// Higher-order function that accepts a user name and a callback function
function greetUser(name, callback) {
  console.log(`[Step 1] Executing greetUser() for: ${name}`);
  console.log(`Hello ${name}`);

  // Validate that callback is provided and is a callable function
  if (typeof callback === "function") {
    console.log("[Step 2] Invoking callback function from inside greetUser()...");
    callback();
  } else {
    console.warn("Warning: No valid callback function provided.");
  }

  console.log("[Step 3] greetUser() completed successfully.\n");
}

// --- Demonstration of Callback Flow ---
console.log("==========================================");
console.log(" Demonstration: Question 1 Callback Flow ");
console.log("==========================================\n");

console.log(">>> Test Case 1: Standard flow with showEndMessage");
greetUser("Ajay", showEndMessage);

console.log(">>> Test Case 2: Using an inline arrow function callback");
greetUser("Priya", () => {
  console.log("Custom Callback: Ready to master JavaScript!");
});

console.log(">>> Explanation of Callback Flow:");
console.log("1. The caller invokes greetUser() passing data ('Ajay') and a function reference (showEndMessage).");
console.log("2. Inside greetUser(), the primary task runs first (printing 'Hello <name>').");
console.log("3. greetUser() then relinquishes control to the callback function by calling callback().");
console.log("4. Once showEndMessage() finishes printing 'Welcome to the course!', control returns to greetUser().");
