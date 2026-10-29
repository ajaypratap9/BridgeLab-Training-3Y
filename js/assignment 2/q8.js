/**
 * Question 8: Dynamic Discount Evaluator
 * 
 * Requirements:
 * - Use an array of objects:
 *   const cart = [
 *     { item: "Laptop", category: "electronics", price: 45000 },
 *     { item: "Shoes", category: "fashion", price: 2500 },
 *     { item: "Book", category: "education", price: 600 }
 *   ];
 * - If category = "electronics" -> 10% discount
 * - If category = "fashion" -> 5% discount
 * - If total cart value > 50000 -> apply extra 5% overall discount.
 * - Use loops, conditionals, and reduce() to calculate the final total.
 */

// 1. Initial cart array of objects
const cart = [
  { item: "Laptop", category: "electronics", price: 45000 },
  { item: "Shoes", category: "fashion", price: 2500 },
  { item: "Book", category: "education", price: 600 }
];

/**
 * Calculates itemized discounts, cart subtotals, overall discounts, and final payable amount.
 * Utilizes loops, conditionals, and Array.prototype.reduce().
 * 
 * @param {Array<Object>} items - Array of cart item objects
 * @returns {Object} Comprehensive billing breakdown
 */
function evaluateCartDiscounts(items) {
  // Step 1: Use a loop and conditionals to evaluate category-specific discounts
  const itemizedCart = [];

  for (let i = 0; i < items.length; i++) {
    const product = items[i];
    let discountRate = 0;

    // Conditional evaluation based on product category
    if (product.category === "electronics") {
      discountRate = 0.10; // 10% discount for electronics
    } else if (product.category === "fashion") {
      discountRate = 0.05; // 5% discount for fashion
    } else {
      discountRate = 0.00; // No discount for other categories
    }

    const discountAmount = product.price * discountRate;
    const discountedPrice = product.price - discountAmount;

    itemizedCart.push({
      item: product.item,
      category: product.category,
      originalPrice: product.price,
      discountRatePercent: discountRate * 100,
      discountAmount: discountAmount,
      discountedPrice: discountedPrice
    });
  }

  // Step 2: Use reduce() to compute original cart total and category-discounted subtotal
  const originalTotal = items.reduce((accum, curr) => accum + curr.price, 0);
  const subtotalAfterCategoryDiscounts = itemizedCart.reduce((accum, curr) => accum + curr.discountedPrice, 0);
  const totalCategoryDiscounts = itemizedCart.reduce((accum, curr) => accum + curr.discountAmount, 0);

  // Step 3: Condition for extra overall discount if cart value exceeds 50000
  let extraOverallDiscountRate = 0;
  let extraOverallDiscountAmount = 0;

  // Threshold checked against original cart total (> 50,000)
  if (originalTotal > 50000) {
    extraOverallDiscountRate = 0.05; // Extra 5%
    extraOverallDiscountAmount = subtotalAfterCategoryDiscounts * extraOverallDiscountRate;
  }

  // Final payable total
  const finalPayableTotal = subtotalAfterCategoryDiscounts - extraOverallDiscountAmount;
  const netTotalSavings = originalTotal - finalPayableTotal;

  return {
    itemizedCart,
    originalTotal,
    totalCategoryDiscounts,
    subtotalAfterCategoryDiscounts,
    extraOverallDiscountRate,
    extraOverallDiscountAmount,
    finalPayableTotal,
    netTotalSavings
  };
}

// ==========================================
// Formatted Output Display
// ==========================================

console.log("==================================================");
console.log("       Q8: Dynamic Discount Evaluator             ");
console.log("==================================================");

const bill1 = evaluateCartDiscounts(cart);

console.log("Itemized Cart Breakdown:");
console.log("Item     | Category    | Price (₹) | Disc % | Savings (₹) | Net Price (₹)");
console.log("---------------------------------------------------------------------");
bill1.itemizedCart.forEach((item) => {
  console.log(
    `${item.item.padEnd(8)} | ` +
    `${item.category.padEnd(11)} | ` +
    `${String(item.originalPrice).padStart(9)} | ` +
    `${String(item.discountRatePercent + "%").padStart(6)} | ` +
    `${String(item.discountAmount).padStart(11)} | ` +
    `${String(item.discountedPrice).padStart(13)}`
  );
});

console.log("---------------------------------------------------------------------");
console.log(`Original Cart Total (reduce)          : ₹${bill1.originalTotal}`);
console.log(`Total Category Discount Savings       : -₹${bill1.totalCategoryDiscounts}`);
console.log(`Subtotal after Category Discounts     : ₹${bill1.subtotalAfterCategoryDiscounts}`);
console.log(`Extra 5% Discount (Total > ₹50,000?)  : ${bill1.originalTotal > 50000 ? `YES (-₹${bill1.extraOverallDiscountAmount})` : "NO (Cart does not exceed ₹50,000)"}`);
console.log("---------------------------------------------------------------------");
console.log(`Final Payable Total                   : ₹${bill1.finalPayableTotal}`);
console.log(`Total Customer Savings                : ₹${bill1.netTotalSavings}`);
console.log("==================================================");

// Case 2: Cart exceeding ₹50,000 threshold to demonstrate the extra 5% overall discount
console.log("\n--- Demonstrating Cart Exceeding ₹50,000 (Extra 5% Discount Active) ---");
const highValueCart = [
  { item: "Laptop", category: "electronics", price: 45000 },
  { item: "Smartphone", category: "electronics", price: 25000 },
  { item: "Shoes", category: "fashion", price: 2500 },
  { item: "Book", category: "education", price: 600 }
];

const bill2 = evaluateCartDiscounts(highValueCart);
console.log(`Original Total: ₹${bill2.originalTotal} (> ₹50,000 threshold met!)`);
console.log(`Subtotal after category discounts : ₹${bill2.subtotalAfterCategoryDiscounts}`);
console.log(`Extra 5% overall discount applied : -₹${bill2.extraOverallDiscountAmount.toFixed(2)}`);
console.log(`Final Payable Total               : ₹${bill2.finalPayableTotal.toFixed(2)}`);
console.log(`Total Savings                     : ₹${bill2.netTotalSavings.toFixed(2)}`);
console.log("==================================================\n");
