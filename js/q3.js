/**
 * Question 3: Monthly Expense Tracker
 * 
 * Requirements:
 * - Use an array of expenses for 5 categories (food, travel, rent, bills, leisure).
 * - Use arithmetic and assignment operators to add 10% tax to the total.
 * - Use toFixed(2) to round values.
 * - Display total, average, and final amount after tax.
 */

// 1. Array of monthly expenses across 5 distinct categories
const monthlyExpenses = [
  { category: "Food", amount: 4500.50 },
  { category: "Travel", amount: 1850.25 },
  { category: "Rent", amount: 12000.00 },
  { category: "Bills", amount: 2350.75 },
  { category: "Leisure", amount: 3100.00 }
];

console.log("=== Q3: Monthly Expense Tracker ===");
console.log("Category-wise Breakdown:");

// 2. Calculate the total expenses using arithmetic and assignment operator (+=)
let totalExpense = 0;

for (let i = 0; i < monthlyExpenses.length; i++) {
  const item = monthlyExpenses[i];
  totalExpense += item.amount; // Compound assignment operator
  console.log(`- ${item.category.padEnd(8)}: ₹${item.amount.toFixed(2)}`);
}

// 3. Compute the average monthly expense using division (/) operator
const numberOfCategories = monthlyExpenses.length;
const averageExpense = totalExpense / numberOfCategories;

// 4. Calculate 10% tax using arithmetic (*) and assignment (+=) operators
const taxRate = 0.10; // 10% tax
const taxAmount = totalExpense * taxRate;

let finalAmountWithTax = totalExpense;
finalAmountWithTax += taxAmount; // Adding tax using compound assignment

// 5. Display the calculated summary rounded to 2 decimal places using toFixed(2)
console.log("-----------------------------------------");
console.log(`Subtotal (Before Tax) : ₹${totalExpense.toFixed(2)}`);
console.log(`Average Category Cost : ₹${averageExpense.toFixed(2)}`);
console.log(`Tax Added (10%)       : ₹${taxAmount.toFixed(2)}`);
console.log(`Final Amount After Tax: ₹${finalAmountWithTax.toFixed(2)}`);
console.log("-----------------------------------------");
