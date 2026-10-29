/**
 * Question 6: Progressive Discount System
 * 
 * Requirements:
 * - Input total purchase amount.
 * - If total >= 10000 -> 25% discount.
 * - Else if >= 5000 -> 15% discount.
 * - Else if >= 2000 -> 5% discount.
 * - Otherwise -> no discount.
 * - Calculate and print:
 *   * Original total
 *   * Discount percentage
 *   * Final price after discount
 * - Use Math.round() for rounding.
 */

/**
 * Calculates progressive discount based on total purchase amount.
 * @param {number} purchaseAmount - Total bill before discount
 */
function calculateProgressiveDiscount(purchaseAmount) {
  // Step 1: Determine the discount percentage using progressive threshold tiers
  let discountPercentage = 0;

  if (purchaseAmount >= 10000) {
    discountPercentage = 25;
  } else if (purchaseAmount >= 5000) {
    discountPercentage = 15;
  } else if (purchaseAmount >= 2000) {
    discountPercentage = 5;
  } else {
    discountPercentage = 0; // No discount for purchases below 2000
  }

  // Step 2: Calculate the discount amount and final price
  const discountAmount = (purchaseAmount * discountPercentage) / 100;
  const unroundedFinalPrice = purchaseAmount - discountAmount;

  // Step 3: Apply Math.round() for rounding final price and savings
  const finalPrice = Math.round(unroundedFinalPrice);
  const roundedSavings = Math.round(discountAmount);

  // Step 4: Print the summary
  console.log("-----------------------------------------");
  console.log(`Original Total          : ₹${purchaseAmount.toFixed(2)}`);
  console.log(`Discount Tier Applied   : ${discountPercentage}%`);
  console.log(`Discount Amount Saved   : ₹${roundedSavings}`);
  console.log(`Final Price After Disc. : ₹${finalPrice}`);
  console.log("-----------------------------------------");

  return { purchaseAmount, discountPercentage, finalPrice };
}

// Main execution with sample purchase total
console.log("=== Q6: Progressive Discount System ===");
const samplePurchase = 7450;
calculateProgressiveDiscount(samplePurchase);

// Testing all discount tiers
console.log("\n--- Testing All Discount Tiers ---");
const testPurchases = [
  { amount: 15400, tier: "Tier 1: >= 10000 (25%)" },
  { amount: 6800,  tier: "Tier 2: >= 5000  (15%)" },
  { amount: 3200,  tier: "Tier 3: >= 2000  (5%)"  },
  { amount: 1450,  tier: "Tier 4: < 2000   (0%)"  }
];

testPurchases.forEach((test) => {
  console.log(`\nScenario: ${test.tier}`);
  calculateProgressiveDiscount(test.amount);
});
