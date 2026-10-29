/**
 * Question 3: Math Utility Dashboard
 * 
 * Requirements:
 * - Take a number x = 16.75.
 * - Display:
 *   - Rounded value (Math.round)
 *   - Square root (Math.sqrt)
 *   - Power (Math.pow(x, 3))
 *   - Random number between 10–50 (Math.floor(Math.random() * 41) + 10)
 * - Use template literals to show a formatted result summary.
 */

// 1. Target input number
const x = 16.75;

// 2. Perform the required mathematical operations
const roundedValue = Math.round(x);
const squareRootValue = Math.sqrt(x);
const powerOfThree = Math.pow(x, 3);

// Formula for random integer between min (10) and max (50) inclusive:
// Math.floor(Math.random() * (max - min + 1)) + min
// Here: (50 - 10 + 1) = 41
const randomNumber = Math.floor(Math.random() * 41) + 10;

// Additional complementary mathematical utilities for the dashboard
const floorValue = Math.floor(x);
const ceilValue = Math.ceil(x);
const absoluteValue = Math.abs(x);

// 3. Format result summary using template literals
const dashboardReport = `
==================================================
       Q3: Math Utility Scientific Dashboard      
==================================================
Input Value (x)           : ${x}
--------------------------------------------------
1. Rounded Value          : ${roundedValue}
   - Method Used          : Math.round(${x})
   - Explanation          : Rounds to nearest integer (>= 0.5 rounds up)

2. Square Root            : ${squareRootValue}
   - Formatted (4 Decimals): ${squareRootValue.toFixed(4)}
   - Method Used          : Math.sqrt(${x})

3. Power (x^3)            : ${powerOfThree}
   - Formatted (2 Decimals): ${powerOfThree.toFixed(2)}
   - Method Used          : Math.pow(${x}, 3)

4. Random Number (10 - 50): ${randomNumber}
   - Formula Used         : Math.floor(Math.random() * 41) + 10
   - Range Verification   : 10 <= ${randomNumber} <= 50 -> ${randomNumber >= 10 && randomNumber <= 50 ? "PASS" : "FAIL"}

--------------------------------------------------
Complementary Math Metrics:
- Math.floor(${x})        : ${floorValue} (Rounds down to nearest integer)
- Math.ceil(${x})         : ${ceilValue} (Rounds up to nearest integer)
- Math.abs(${x})          : ${absoluteValue} (Absolute distance from zero)
==================================================
`;

// Display the formatted summary
console.log(dashboardReport);

// Verification: Generate 5 sample random numbers to confirm range bounds [10, 50]
console.log("Range Test Verification (Generating 5 random numbers between 10 and 50):");
for (let i = 1; i <= 5; i++) {
  const sampleRandom = Math.floor(Math.random() * 41) + 10;
  console.log(`  Sample ${i}: ${sampleRandom} (Valid: ${sampleRandom >= 10 && sampleRandom <= 50})`);
}
console.log("==================================================\n");
