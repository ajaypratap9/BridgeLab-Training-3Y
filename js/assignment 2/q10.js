/**
 * Question 10: Departmental Employee Evaluator
 * 
 * Requirements:
 * - Create a nested array for departments:
 *   const departments = [
 *     ["HR", 72],
 *     ["Finance", 88],
 *     ["Tech", 95],
 *     ["Support", 63]
 *   ];
 * - Use loops and conditionals to print:
 *   - "Excellent" if score >= 90
 *   - "Good" if 75–89
 *   - "Average" if 60–74
 *   - "Needs Improvement" otherwise
 * - Use comparison operators and nested if-else conditions.
 */

// 1. Nested array storing departments and their respective performance points
const departments = [
  ["HR", 72],
  ["Finance", 88],
  ["Tech", 95],
  ["Support", 63]
];

/**
 * Evaluates performance rating using explicit nested if-else statements and comparison operators.
 * 
 * @param {number} score - Department score points
 * @returns {string} Performance tier evaluation
 */
function evaluatePerformance(score) {
  let rating = "";

  // Explicit nested if-else structure with comparison operators
  if (score >= 90) {
    rating = "Excellent";
  } else {
    // Nested check when score < 90
    if (score >= 75 && score <= 89) {
      rating = "Good";
    } else {
      // Nested check when score < 75
      if (score >= 60 && score <= 74) {
        rating = "Average";
      } else {
        // Fallback when score < 60
        rating = "Needs Improvement";
      }
    }
  }

  return rating;
}

// ==========================================
// Loop Execution & Formatted Display
// ==========================================

console.log("==================================================");
console.log("    Q10: Departmental Performance Evaluator       ");
console.log("==================================================");
console.log("Department   | Points | Evaluation");
console.log("--------------------------------------------------");

// Loop through the nested array using a standard for loop
for (let i = 0; i < departments.length; i++) {
  const departmentName = departments[i][0];
  const departmentScore = departments[i][1];

  // Evaluate rating using nested if-else logic
  const evaluationResult = evaluatePerformance(departmentScore);

  console.log(
    `${departmentName.padEnd(12)} | ` +
    `${String(departmentScore).padStart(6)} | ` +
    `${evaluationResult}`
  );
}

console.log("==================================================");

// Additional edge-case testing including "Needs Improvement" branch (< 60)
console.log("\n--- Comprehensive Edge-Case Verification ---");
const testDepartments = [
  ["Tech Leads", 95],     // >= 90 -> Excellent
  ["Finance", 88],        // 75-89 -> Good
  ["HR Ops", 72],         // 60-74 -> Average
  ["Support Tier 1", 63], // 60-74 -> Average
  ["Logistics", 52],      // < 60  -> Needs Improvement
  ["Training", 40]        // < 60  -> Needs Improvement
];

console.log("Dept Name        | Score | Evaluation");
console.log("-----------------------------------------");
for (const [dept, points] of testDepartments) {
  const result = evaluatePerformance(points);
  console.log(`${dept.padEnd(16)} | ${String(points).padStart(5)} | ${result}`);
}
console.log("==================================================\n");
