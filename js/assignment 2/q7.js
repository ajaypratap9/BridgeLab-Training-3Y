/**
 * Question 7: Customer Feedback Processor
 * 
 * Requirements:
 * - Store a feedback string like "Great product! Fast delivery and amazing sound quality!".
 * - Use string methods to:
 *   - Count words
 *   - Check if the feedback includes "bad" or "poor"
 *   - If not -> print "Positive Feedback"
 *   - Else -> "Needs Improvement"
 * - Use includes(), split(), and conditional statements.
 */

// 1. Initial sample customer feedback string
const sampleFeedback = "Great product! Fast delivery and amazing sound quality!";

/**
 * Analyzes a customer review string for word count and sentiment classification.
 * 
 * @param {string} feedbackText - The customer comment string
 * @returns {object} Analysis result containing word count, classification, and flagged words
 */
function processCustomerFeedback(feedbackText) {
  // Step 1: Count words using split()
  // Clean whitespace and split on one or more space characters
  const trimmedText = feedbackText.trim();
  const wordsArray = trimmedText.length > 0 ? trimmedText.split(/\s+/) : [];
  const wordCount = wordsArray.length;

  // Normalize string to lowercase to ensure case-insensitive matching
  const normalizedText = feedbackText.toLowerCase();

  // Step 2: Check for negative sentiment keywords using includes()
  const hasBad = normalizedText.includes("bad");
  const hasPoor = normalizedText.includes("poor");
  const hasNegativeKeyword = hasBad || hasPoor;

  // Step 3: Conditional statement to classify sentiment
  let feedbackCategory = "";
  if (!hasNegativeKeyword) {
    feedbackCategory = "Positive Feedback";
  } else {
    feedbackCategory = "Needs Improvement";
  }

  // Collect any detected trigger terms
  const detectedIssues = [];
  if (hasBad) detectedIssues.push("'bad'");
  if (hasPoor) detectedIssues.push("'poor'");

  return {
    rawText: feedbackText,
    wordCount,
    hasNegativeKeyword,
    feedbackCategory,
    detectedIssues
  };
}

// Process baseline review
const defaultResult = processCustomerFeedback(sampleFeedback);

// ==========================================
// Formatted Output Report
// ==========================================

console.log("==================================================");
console.log("       Q7: Customer Feedback Processor            ");
console.log("==================================================");
console.log(`Input Feedback String : "${defaultResult.rawText}"`);
console.log("--------------------------------------------------");
console.log(`Total Word Count (split) : ${defaultResult.wordCount} words`);
console.log(`Includes "bad"? (includes): ${defaultResult.rawText.toLowerCase().includes("bad")}`);
console.log(`Includes "poor"? (includes): ${defaultResult.rawText.toLowerCase().includes("poor")}`);
console.log("--------------------------------------------------");
console.log(`Classification Result    : >>> ${defaultResult.feedbackCategory} <<<`);
console.log("==================================================");

// Additional multi-sample evaluation
console.log("\n--- Testing Multiple Customer Reviews ---");
const testReviews = [
  "Great product! Fast delivery and amazing sound quality!",
  "The build quality is bad and buttons feel cheap.",
  "Battery backup is extremely poor, disappointing experience.",
  "Not a bad device, but software could be better.",
  "Decent packaging and prompt customer service."
];

testReviews.forEach((review, index) => {
  const analysis = processCustomerFeedback(review);
  console.log(`Review ${index + 1}: "${analysis.rawText}"`);
  console.log(`  - Words: ${analysis.wordCount}`);
  console.log(`  - Flagged Keywords: ${analysis.detectedIssues.length > 0 ? analysis.detectedIssues.join(", ") : "None"}`);
  console.log(`  - Verdict: ${analysis.feedbackCategory}`);
  console.log("");
});
console.log("==================================================\n");
