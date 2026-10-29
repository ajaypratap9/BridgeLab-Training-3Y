/**
 * Question 2: String Manipulation Report
 * 
 * Requirements:
 * - Store a product name like " wireless headphones PRO ".
 * - Trim extra spaces, convert to lowercase, then capitalize the first letter of each word.
 * - Replace "pro" with "Pro Edition".
 * - Display the cleaned title and its length.
 * - Use methods/properties: trim(), split(), map(), join(), replace(), and length.
 */

// 1. Initial raw product name with extra whitespace and inconsistent casing
const rawProductTitle = " wireless headphones PRO ";

/**
 * Formats an e-commerce product title following standard naming conventions.
 * 
 * Pipeline:
 * 1. trim()        -> Removes leading and trailing whitespace.
 * 2. toLowerCase() -> Normalizes the entire string to lowercase.
 * 3. split()       -> Splits words by space into an array.
 * 4. map()         -> Capitalizes the first character of each word.
 * 5. join()        -> Reassembles words into a formatted string.
 * 6. replace()     -> Replaces 'Pro' (or 'pro') with 'Pro Edition'.
 * 7. length        -> Evaluates character length of the cleaned string.
 * 
 * @param {string} title - Raw product title
 * @returns {object} Formatted title and breakdown of steps
 */
function formatProductTitle(title) {
  // Step 1: Remove leading and trailing whitespace
  const trimmed = title.trim();

  // Step 2: Convert to lowercase for uniform processing
  const lowercased = trimmed.toLowerCase();

  // Step 3 & 4: Split into individual words, then capitalize the first letter of each word
  const wordsArray = lowercased.split(" ");
  const capitalizedArray = wordsArray.map((word) => {
    if (!word) return "";
    return word.charAt(0).toUpperCase() + word.slice(1);
  });

  // Step 5: Join words back into a single title string
  const capitalizedTitle = capitalizedArray.join(" ");

  // Step 6: Replace "Pro" with "Pro Edition"
  // Using replace with regex /pro/i or exact string "Pro"
  const cleanedTitle = capitalizedTitle.replace(/Pro\b/i, "Pro Edition");

  // Step 7: Get string length
  const titleLength = cleanedTitle.length;

  return {
    raw: title,
    trimmed,
    lowercased,
    wordsArray,
    capitalizedTitle,
    cleanedTitle,
    titleLength
  };
}

// Execute formatting on the sample product title
const result = formatProductTitle(rawProductTitle);

// ==========================================
// Formatted Output Report
// ==========================================

console.log("==================================================");
console.log("       Q2: String Manipulation Report             ");
console.log("==================================================");
console.log(`Original Raw Title      : "${result.raw}"`);
console.log(`Original Length         : ${result.raw.length} characters`);
console.log("--------------------------------------------------");
console.log(`Step 1: After trim()    : "${result.trimmed}"`);
console.log(`Step 2: After toLower() : "${result.lowercased}"`);
console.log(`Step 3: After split()   : [ ${result.wordsArray.map(w => `"${w}"`).join(", ")} ]`);
console.log(`Step 4: After map()     : [ ${result.wordsArray.map(w => `"${w.charAt(0).toUpperCase() + w.slice(1)}"`).join(", ")} ]`);
console.log(`Step 5: After join()    : "${result.capitalizedTitle}"`);
console.log(`Step 6: After replace() : "${result.cleanedTitle}"`);
console.log("--------------------------------------------------");
console.log(`Final Cleaned Title     : "${result.cleanedTitle}"`);
console.log(`Final Title Length      : ${result.titleLength} characters (via .length)`);
console.log("==================================================");

// Additional test cases to verify robustness
console.log("\n--- Additional Test Demonstrations ---");
const testCases = [
  "   ultra gaming MOUSE pro   ",
  " smart WATCH pro ",
  "mechanical KEYBOARD   pro"
];

testCases.forEach((testTitle, index) => {
  const formatted = formatProductTitle(testTitle);
  console.log(`Test ${index + 1}: "${testTitle}"`);
  console.log(`  -> Cleaned: "${formatted.cleanedTitle}" (Length: ${formatted.titleLength})`);
});
console.log("==================================================\n");
