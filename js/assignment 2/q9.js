/**
 * Question 9: Odd-Even Number Analyzer
 * 
 * Requirements:
 * - Accept numbers 1–30 in an array using a loop.
 * - For each number:
 *   - If divisible by 3 and 5 -> print “FizzBuzz”
 *   - Else if even -> print “Even”
 *   - Else -> print “Odd”
 * - Store results in a new array and display it.
 * - Use %, push(), and conditionals.
 */

// 1. Populate numbers 1 to 30 into an initial array using a for loop and push()
const numbers = [];
for (let i = 1; i <= 30; i++) {
  numbers.push(i);
}

// 2. Classify each number based on modulus (%) arithmetic and conditionals
const analyzedResults = [];

console.log("==================================================");
console.log("       Q9: Odd-Even & Divisibility Analyzer       ");
console.log("==================================================");
console.log("Processing numbers 1 through 30:\n");

for (let i = 0; i < numbers.length; i++) {
  const num = numbers[i];
  let label = "";

  // Condition 1: Divisible by both 3 and 5 (i.e. num % 15 === 0)
  if (num % 3 === 0 && num % 5 === 0) {
    label = "FizzBuzz";
    console.log(`Number ${String(num).padStart(2)}: FizzBuzz (Divisible by both 3 and 5)`);
  }
  // Condition 2: Even number (divisible by 2)
  else if (num % 2 === 0) {
    label = "Even";
    console.log(`Number ${String(num).padStart(2)}: Even     (Divisible by 2)`);
  }
  // Condition 3: Odd number
  else {
    label = "Odd";
    console.log(`Number ${String(num).padStart(2)}: Odd      (Not even, not divisible by 15)`);
  }

  // Store structured classification into results array using push()
  analyzedResults.push({
    number: num,
    classification: label
  });
}

// ==========================================
// Final Aggregated Results & Summary
// ==========================================

console.log("\n--------------------------------------------------");
console.log("Aggregated Classification Array Output:");
console.log("--------------------------------------------------");

// Summary counts
const fizzBuzzCount = analyzedResults.filter((r) => r.classification === "FizzBuzz").length;
const evenCount = analyzedResults.filter((r) => r.classification === "Even").length;
const oddCount = analyzedResults.filter((r) => r.classification === "Odd").length;

console.log(`Total Numbers Processed : ${analyzedResults.length}`);
console.log(`- FizzBuzz Matches      : ${fizzBuzzCount} (Numbers: ${analyzedResults.filter(r => r.classification === "FizzBuzz").map(r => r.number).join(", ")})`);
console.log(`- Even Matches          : ${evenCount}`);
console.log(`- Odd Matches           : ${oddCount}`);
console.log("--------------------------------------------------");
console.log("Stored Array Dump:");
console.log(analyzedResults.map((entry) => `${entry.number} -> ${entry.classification}`).join(" | "));
console.log("==================================================\n");
