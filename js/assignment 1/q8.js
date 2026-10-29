/**
 * Question 8: Employee Salary Projection
 * 
 * Requirements:
 * - Declare current salary and annual increment rate (in %).
 * - Use a for loop to compute salary for each of 5 years.
 * - Print yearly salary in a formatted console table.
 * - Apply rounding and assignment operators.
 */

// Step 1: Declare initial current salary and annual increment rate (in %)
const startingSalary = 60000;       // Initial base salary in ₹
const annualIncrementRate = 10;     // 10% annual appraisal increment

console.log("=== Q8: Employee 5-Year Salary Projection ===");
console.log(`Starting Salary        : ₹${startingSalary}`);
console.log(`Annual Increment Rate  : ${annualIncrementRate}%\n`);

// Array to accumulate yearly projection data for console.table
const projectionReport = [];

// Track cumulative salary across years using assignment operator
let currentSalary = startingSalary;

// Step 2: Use a for loop to project the salary over 5 years
for (let year = 1; year <= 5; year++) {
  const baseSalaryThisYear = currentSalary;

  // Compute yearly increment using arithmetic operator and Math.round()
  const incrementAmount = Math.round(baseSalaryThisYear * (annualIncrementRate / 100));

  // Apply assignment operator (+=) to update salary with the increment
  currentSalary += incrementAmount;

  // Push formatted yearly projection into the array
  projectionReport.push({
    "Year": `Year ${year}`,
    "Opening Salary (₹)": baseSalaryThisYear,
    "Increment Rate": `${annualIncrementRate}%`,
    "Increment Amount (₹)": incrementAmount,
    "Projected Salary (₹)": currentSalary
  });
}

// Step 3: Print the yearly salary projection in a formatted console table
console.table(projectionReport);

// Summary calculation
const totalGrowth = currentSalary - startingSalary;
const overallGrowthPercentage = ((totalGrowth / startingSalary) * 100).toFixed(2);

console.log(`Final Salary after 5 Years : ₹${currentSalary}`);
console.log(`Total 5-Year Salary Growth : ₹${totalGrowth} (+${overallGrowthPercentage}%)`);
