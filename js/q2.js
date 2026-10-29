/**
 * Question 2: Multi-Type Data Summary
 * 
 * Requirements:
 * - Declare variables of different data types: string, number, boolean, array, object, null, undefined.
 * - Use typeof operator and Array.isArray() to identify each type.
 * - Print a formatted report (label + value + type) using one console.table() statement.
 */

// 1. Declare variables representing different JavaScript data types
const candidateName = "Ajay Pratap Singh";            // String
const candidateAge = 21;                              // Number
const isStudentEnrolled = true;                       // Boolean
const technicalSkills = ["JavaScript", "HTML", "CSS"]; // Array
const candidateProfile = { city: "Bengaluru", role: "Developer" }; // Object
const middleName = null;                              // Null
let scholarshipStatus;                                // Undefined (declared without initialization)

/**
 * Helper function to accurately identify the data type using typeof and Array.isArray().
 * In JavaScript:
 * - typeof [] returns "object", so Array.isArray() is required to distinguish arrays.
 * - typeof null returns "object" (legacy JS quirk), so a direct null check is used.
 */
function identifyDataType(value) {
  if (value === null) {
    return "null";
  }
  if (Array.isArray(value)) {
    return "array";
  }
  return typeof value;
}

// 2. Build the multi-type data summary array containing label, value, and type
const summaryData = [
  {
    label: "Candidate Name",
    value: candidateName,
    type: identifyDataType(candidateName)
  },
  {
    label: "Candidate Age",
    value: candidateAge,
    type: identifyDataType(candidateAge)
  },
  {
    label: "Is Enrolled",
    value: isStudentEnrolled,
    type: identifyDataType(isStudentEnrolled)
  },
  {
    label: "Technical Skills",
    value: JSON.stringify(technicalSkills),
    type: identifyDataType(technicalSkills)
  },
  {
    label: "Candidate Profile",
    value: JSON.stringify(candidateProfile),
    type: identifyDataType(candidateProfile)
  },
  {
    label: "Middle Name",
    value: String(middleName),
    type: identifyDataType(middleName)
  },
  {
    label: "Scholarship Status",
    value: String(scholarshipStatus),
    type: identifyDataType(scholarshipStatus)
  }
];

// 3. Print the formatted report using a single console.table statement
console.log("=== Q2: Multi-Type Data Summary Report ===");
console.table(summaryData);
