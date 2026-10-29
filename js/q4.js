/**
 * Question 4: Academic Performance Evaluator
 * 
 * Requirements:
 * - Input marks of 5 subjects (use an array).
 * - Calculate average and overall percentage.
 * - Use logical operators to print:
 *   * "Promoted with Distinction" if >= 85%
 *   * "Promoted" if between 50%-84%
 *   * "Detained" if < 50%
 * - Add validation: if any subject < 35 -> automatically "Detained".
 */

/**
 * Evaluates academic performance based on an array of subject marks (out of 100).
 * Uses logical operators (||, &&, <, >=) for status determination and validation.
 */
function evaluateAcademicPerformance(subjectMarks, studentName = "Student") {
  console.log(`\nEvaluating Report for: ${studentName}`);
  console.log(`Marks: [${subjectMarks.join(", ")}]`);

  const PASSING_MARKS = 35;
  const numberOfSubjects = subjectMarks.length;

  // Step 1: Validation - Check if any individual subject mark is below the passing threshold (35)
  let hasFailedAnySubject = false;
  let failedSubjectsCount = 0;

  for (let i = 0; i < numberOfSubjects; i++) {
    if (subjectMarks[i] < PASSING_MARKS) {
      hasFailedAnySubject = true;
      failedSubjectsCount++;
    }
  }

  // Step 2: Calculate total marks, average, and percentage
  let totalMarks = 0;
  for (let i = 0; i < numberOfSubjects; i++) {
    totalMarks += subjectMarks[i];
  }

  const averageMarks = totalMarks / numberOfSubjects;
  const maxPossibleMarks = numberOfSubjects * 100;
  const overallPercentage = (totalMarks / maxPossibleMarks) * 100;

  console.log(`Total Marks : ${totalMarks} / ${maxPossibleMarks}`);
  console.log(`Average     : ${averageMarks.toFixed(2)}`);
  console.log(`Percentage  : ${overallPercentage.toFixed(2)}%`);

  // Step 3: Determine outcome using logical operators
  let resultStatus = "";

  // If any subject is below 35, student is automatically Detained
  if (hasFailedAnySubject) {
    resultStatus = "Detained";
    console.log(`Remark      : Failed in ${failedSubjectsCount} subject(s) with marks < ${PASSING_MARKS}.`);
  } else if (overallPercentage >= 85) {
    resultStatus = "Promoted with Distinction";
  } else if (overallPercentage >= 50 && overallPercentage < 85) {
    resultStatus = "Promoted";
  } else {
    // Covers overallPercentage < 50
    resultStatus = "Detained";
  }

  console.log(`Result      : ${resultStatus}`);
  return resultStatus;
}

// Main execution with primary test input
console.log("=== Q4: Academic Performance Evaluator ===");
const primaryStudentMarks = [88, 92, 79, 85, 91];
evaluateAcademicPerformance(primaryStudentMarks, "Ajay");

// Verification with various test cases
console.log("\n--- Verification of All Performance Criteria ---");
// Case 1: Promoted (between 50% and 84%)
evaluateAcademicPerformance([65, 72, 58, 60, 70], "Rahul (50% - 84%)");

// Case 2: Detained due to overall percentage < 50%
evaluateAcademicPerformance([40, 42, 45, 48, 38], "Pooja (< 50%)");

// Case 3: Detained because of validation rule (one subject < 35 despite high total)
evaluateAcademicPerformance([95, 90, 88, 92, 30], "Vikas (Subject < 35 validation)");
