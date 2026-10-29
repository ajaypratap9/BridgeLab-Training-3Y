/**
 * Question 1: Scope Conflict Resolver
 * 
 * Requirements:
 * - Declare a global variable bonus = 5000.
 * - Inside a function calculateSalary(), declare a local variable salary = 40000.
 * - Add the bonus only if a local variable isPermanent (boolean) is true.
 * - Print total salary inside the function.
 * - Demonstrate how changing isPermanent affects the global variable scope.
 */

// 1. Declare a global variable for bonus
let bonus = 5000;

/**
 * Calculates and displays total salary based on employee permanence status.
 * Demonstrates local variable scoping vs. global variable access.
 * 
 * @param {boolean} isPermanentStatus - Whether the employee is permanent
 */
function calculateSalary(isPermanentStatus = true) {
  // Local variable scoped strictly to calculateSalary()
  let salary = 40000;

  // Local boolean variable to determine eligibility for bonus
  let isPermanent = isPermanentStatus;

  // Variable to store final computed salary
  let totalSalary = salary;

  // Add global bonus only if employee is permanent
  if (isPermanent) {
    totalSalary += bonus; // Global 'bonus' accessed via scope chain
    console.log(`[Status: Permanent] Base Salary: ₹${salary}, Bonus: ₹${bonus} -> Total Salary: ₹${totalSalary}`);
  } else {
    console.log(`[Status: Non-Permanent] Base Salary: ₹${salary}, Bonus: None -> Total Salary: ₹${totalSalary}`);
  }

  // Print total salary inside the function as required
  console.log(`Computed Total Salary inside function: ₹${totalSalary}`);
  return totalSalary;
}

// ==========================================
// Execution & Scope Demonstrations
// ==========================================

console.log("==================================================");
console.log("       Q1: Scope Conflict Resolver Report         ");
console.log("==================================================");

console.log(`Initial Global Bonus: ₹${bonus}`);
console.log("--------------------------------------------------");

// Case 1: Employee is permanent (isPermanent = true)
console.log("Case 1: Calculating salary for permanent employee (isPermanent = true):");
calculateSalary(true);

console.log("\n--------------------------------------------------");

// Case 2: Employee is non-permanent (isPermanent = false)
console.log("Case 2: Calculating salary for contract employee (isPermanent = false):");
calculateSalary(false);

console.log("\n--------------------------------------------------");
console.log("--- Demonstrating Variable Scoping & Scope Isolation ---");

// Check if local variables leaked into global scope
console.log(`Global scope 'bonus' value: ₹${bonus}`);

try {
  // Attempting to access local 'salary' outside the function
  console.log(salary);
} catch (error) {
  console.log(`Attempt to access local 'salary' globally: ${error.name} - ${error.message}`);
}

try {
  // Attempting to access local 'isPermanent' outside the function
  console.log(isPermanent);
} catch (error) {
  console.log(`Attempt to access local 'isPermanent' globally: ${error.name} - ${error.message}`);
}

console.log("\nScope Explanation:");
console.log("1. 'bonus' is in the global lexical environment and accessible inside calculateSalary().");
console.log("2. 'salary' and 'isPermanent' are confined to the function execution context.");
console.log("3. Toggling 'isPermanent' controls execution flow locally without polluting or altering global scope.");
console.log("==================================================\n");
