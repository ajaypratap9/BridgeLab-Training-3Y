/**
 * Question 10: Citizen Eligibility Validator
 * 
 * Requirements:
 * - Input: age and isCitizen (boolean).
 * - Use nested if-else and logical operators to print:
 *   * "Eligible for all services." if citizen and age >= 18 (above voting-only age bracket, i.e., > 20)
 *   * "Eligible to vote only." if citizen and 18-20
 *   * "Only age criteria met." if not citizen but age >= 18
 *   * "Not eligible yet." otherwise
 * - Use console.log() for all outcomes.
 */

/**
 * Validates civil service eligibility based on age and citizenship status.
 * Uses nested if-else statements combined with logical operators (&&, >=, <=).
 * 
 * @param {number} age - Person's age in years
 * @param {boolean} isCitizen - Whether the person is a verified citizen
 */
function validateCitizenEligibility(age, isCitizen) {
  console.log(`Applicant Profile: Age = ${age}, Citizen = ${isCitizen}`);

  // Outer Condition: Check if applicant meets the baseline legal age (age >= 18)
  if (age >= 18) {
    // Nested Condition Level 1: Applicant meets age and holds citizenship
    if (isCitizen) {
      // Nested Condition Level 2: Specific sub-tier evaluation using logical AND (&&)
      // If citizen is between 18 and 20 (inclusive), voting privilege only is granted
      if (age >= 18 && age <= 20) {
        console.log("Eligible to vote only.");
      } else {
        // Citizens aged 21 or older have unrestricted access to all services (voting, driving, passport)
        console.log("Eligible for all services.");
      }
    } else {
      // Applicant is >= 18 but lacks citizenship
      console.log("Only age criteria met.");
    }
  } else {
    // Applicant is under 18 years of age regardless of citizenship
    console.log("Not eligible yet.");
  }
}

// Step 1: Primary input variables
const personAge = 22;
const isPersonCitizen = true;

console.log("=== Q10: Citizen Eligibility Validator ===");
validateCitizenEligibility(personAge, isPersonCitizen);

// Step 2: Comprehensive test suite for all 4 specified criteria outcomes
console.log("\n--- Testing All Eligibility Categories ---");

console.log("\n1. Citizen aged 25 (Expected: Eligible for all services.)");
validateCitizenEligibility(25, true);

console.log("\n2. Citizen aged 19 (Expected: Eligible to vote only.)");
validateCitizenEligibility(19, true);

console.log("\n3. Non-citizen aged 24 (Expected: Only age criteria met.)");
validateCitizenEligibility(24, false);

console.log("\n4. Citizen aged 16 (Expected: Not eligible yet.)");
validateCitizenEligibility(16, true);

console.log("\n5. Non-citizen aged 15 (Expected: Not eligible yet.)");
validateCitizenEligibility(15, false);
