/**
 * Question 7: Smart Guessing Game (Number Range)
 * 
 * Requirements:
 * - Generate a random secret number between 1-50 using Math.floor(Math.random() * 50) + 1.
 * - Let userGuess be a variable with a test value.
 * - Print:
 *   * "Correct guess!" if equal
 *   * "Very close!" if within +/- 3 of secret
 *   * "Too high" or "Too low" otherwise
 * - Use nested if conditions and logical operators.
 */

// Step 1: Generate a random secret number between 1 and 50
const secretNumber = Math.floor(Math.random() * 50) + 1;

// Step 2: Declare test value for the user's guess
const userGuess = 25;

console.log("=== Q7: Smart Guessing Game ===");
console.log(`Secret Number Generated : ${secretNumber}`);
console.log(`User's Guess            : ${userGuess}`);

/**
 * Evaluates a guess against a secret number using nested if conditions and logical operators.
 */
function evaluateGuess(guess, secret) {
  // Level 1 check: Is the guess exactly equal to the secret number?
  if (guess === secret) {
    console.log("Outcome: Correct guess!");
    return "Correct guess!";
  } else {
    // Nested Level 2 check: Is the guess within +/- 3 range?
    const difference = Math.abs(guess - secret);

    if (difference >= 1 && difference <= 3) {
      console.log(`Outcome: Very close! (Diff: ${difference})`);
      return "Very close!";
    } else {
      // Nested Level 3 check: Determine direction (too high vs too low)
      if (guess > secret) {
        console.log("Outcome: Too high");
        return "Too high";
      } else {
        console.log("Outcome: Too low");
        return "Too low";
      }
    }
  }
}

// Evaluate the current round
evaluateGuess(userGuess, secretNumber);

// Verification Suite with fixed secret to prove all nested branches work accurately
console.log("\n--- Verification of All Branches (Fixed Secret = 30) ---");
const testSecret = 30;
const testGuesses = [
  { guess: 30, expected: "Correct guess!" },
  { guess: 32, expected: "Very close! (Within +2)" },
  { guess: 28, expected: "Very close! (Within -2)" },
  { guess: 42, expected: "Too high" },
  { guess: 14, expected: "Too low" }
];

testGuesses.forEach((t) => {
  console.log(`Testing Guess: ${t.guess} (Target: ${testSecret})`);
  evaluateGuess(t.guess, testSecret);
});
