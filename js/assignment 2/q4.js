/**
 * Question 4: Array Performance Analyzer
 * 
 * Requirements:
 * - Create an array of 8 random scores between 30 and 100.
 * - Calculate:
 *   - Highest and lowest score (Math.max(...arr), Math.min(...arr))
 *   - Average score
 *   - Number of students who passed (>= 50)
 * - Use array methods like map(), filter(), and reduce().
 * - Display a full summary in a formatted output.
 */

// Helper function to generate a random score between min and max (inclusive)
function getRandomScore(min = 30, max = 100) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// 1. Generate an array of 8 random student scores between 30 and 100 using map()
const rawScores = Array.from({ length: 8 }).map(() => getRandomScore(30, 100));

// 2. Highest and lowest score using spread operator with Math.max() and Math.min()
const highestScore = Math.max(...rawScores);
const lowestScore = Math.min(...rawScores);

// 3. Average score using reduce()
const totalSum = rawScores.reduce((accumulator, score) => accumulator + score, 0);
const averageScore = (totalSum / rawScores.length).toFixed(2);

// 4. Number of students who passed (score >= 50) using filter()
const passingStudents = rawScores.filter((score) => score >= 50);
const failingStudents = rawScores.filter((score) => score < 50);
const passCount = passingStudents.length;
const failCount = failingStudents.length;
const passPercentage = ((passCount / rawScores.length) * 100).toFixed(1);

// 5. Categorize each student performance grade using map()
const performanceBreakdown = rawScores.map((score, index) => {
  let grade = "F";
  if (score >= 90) grade = "A+";
  else if (score >= 80) grade = "A";
  else if (score >= 70) grade = "B";
  else if (score >= 60) grade = "C";
  else if (score >= 50) grade = "D";

  return {
    studentId: `Student ${index + 1}`,
    score: score,
    status: score >= 50 ? "PASS" : "FAIL",
    grade: grade
  };
});

// ==========================================
// Formatted Output Summary
// ==========================================

console.log("==================================================");
console.log("       Q4: Student Array Performance Analyzer     ");
console.log("==================================================");
console.log(`Generated Scores (8 samples): [ ${rawScores.join(", ")} ]`);
console.log("--------------------------------------------------");
console.log("Performance Analysis Summary:");
console.log(`- Highest Score (Math.max)  : ${highestScore}`);
console.log(`- Lowest Score  (Math.min)  : ${lowestScore}`);
console.log(`- Total Score Sum (reduce)  : ${totalSum}`);
console.log(`- Class Average Score       : ${averageScore}`);
console.log(`- Passing Students (>= 50)  : ${passCount} out of ${rawScores.length} (${passPercentage}%)`);
console.log(`- Failing Students (< 50)   : ${failCount} out of ${rawScores.length}`);
console.log("--------------------------------------------------");
console.log("Detailed Student Breakdown (via map & filter):");
console.log("Student ID   | Score | Status | Grade");
console.log("--------------------------------------");
performanceBreakdown.forEach((item) => {
  console.log(`${item.studentId.padEnd(12)} | ${String(item.score).padEnd(5)} | ${item.status.padEnd(6)} | ${item.grade}`);
});
console.log("==================================================\n");
