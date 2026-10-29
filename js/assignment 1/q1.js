/**
 * Question 1: Personalized Login Greeting
 * 
 * Requirements:
 * - Declare variables for userName and current hour using new Date().getHours().
 * - If time is before 12 -> "Good Morning [name]!"
 * - If time is between 12 and 17 -> "Good Afternoon [name]!"
 * - Otherwise -> "Good Evening [name]!"
 * - Use template literals and proper string formatting.
 */

// 1. Declare the user name variable
const userName = "Ajay";

// 2. Fetch the current hour (0-23) using the Date object
const currentHour = new Date().getHours();

// 3. Determine the greeting based on the current hour using conditional statements
let greeting = "";

if (currentHour < 12) {
  // Condition 1: If time is before 12 (0 - 11 AM)
  greeting = `Good Morning ${userName}!`;
} else if (currentHour >= 12 && currentHour <= 17) {
  // Condition 2: If time is between 12 and 17 (12 PM - 5 PM)
  greeting = `Good Afternoon ${userName}!`;
} else {
  // Condition 3: Otherwise (18 to 23, i.e., 6 PM onwards)
  greeting = `Good Evening ${userName}!`;
}

// 4. Output the greeting using template literals and console.log
console.log("=== Q1: Personalized Login Greeting ===");
console.log(`User Name    : ${userName}`);
console.log(`Current Hour : ${currentHour}:00`);
console.log(`Greeting     : ${greeting}`);

// Optional: Test simulation function to verify all greeting branches
console.log("\n--- Verification for All Time Windows ---");
function getGreetingForHour(name, hour) {
  if (hour < 12) {
    return `Good Morning ${name}!`;
  } else if (hour >= 12 && hour <= 17) {
    return `Good Afternoon ${name}!`;
  } else {
    return `Good Evening ${name}!`;
  }
}

console.log(`Test 09:00 -> ${getGreetingForHour(userName, 9)}`);
console.log(`Test 14:00 -> ${getGreetingForHour(userName, 14)}`);
console.log(`Test 20:00 -> ${getGreetingForHour(userName, 20)}`);
