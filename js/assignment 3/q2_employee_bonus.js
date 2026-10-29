"use strict";

/**
 * ============================================================================
 * Assignment 3 - Q2: Employee Bonus Calculator
 * ============================================================================
 * 
 * OBJECTIVE:
 * Calculate employee bonuses based on tenure (years of service) and salary,
 * enforce strict mode to avoid implicit global leaks, handle edge cases with
 * try...catch blocks, and print formatted outputs using template strings.
 * 
 * HOISTING & SCOPE INSIGHTS:
 * 1. "use strict": Without "use strict", assigning to an undeclared variable
 *    (e.g., `bonusRate = 0.10;`) would silently attach `bonusRate` to the global
 *    object (window or globalThis). In strict mode, this immediately throws a
 *    ReferenceError at runtime, preserving scope encapsulation.
 * 2. `let` and `const` inside functions and loops are block-scoped. They do not
 *    leak outside their containing `{}` block.
 * 3. Hoisting: `function calculateBonus()` is hoisted entirely to the top of its scope.
 *    Variables declared with `const`/`let` are hoisted in an uninitialized state (TDZ).
 * 
 * DEBUG OBSERVATIONS:
 * - Parsing numbers: `Number("45000")` yields 45000. `Number("abc")` yields NaN.
 * - Missing properties: Accessing `employee.salary` on `{ name: "John" }` returns `undefined`.
 *   `Number(undefined)` yields `NaN`.
 * - Type check `Number.isNaN()` is required to catch failed numeric conversions.
 */

// Provided baseline dataset
const employees = [
    { name: "Amit", salary: "45000", years: "5" },
    { name: "Sara", salary: "38000", years: "2" },
    { name: "Kiran", salary: "52000", years: "7" }
];

// Additional edge-case records to verify robust try...catch error handling
const edgeCaseEmployees = [
    { name: "Rajesh", salary: "invalid_salary", years: "4" },   // Conversion error (NaN)
    { name: "Pooja", salary: "60000" },                        // Missing property 'years'
    { salary: "75000", years: "3" },                           // Missing property 'name'
    { name: "Deepak", salary: "-5000", years: "2" },           // Negative salary validation error
    null                                                       // Null object
];

/**
 * Custom error class for employee processing failures.
 */
class EmployeeValidationError extends Error {
    constructor(message, employeeRef) {
        super(message);
        this.name = "EmployeeValidationError";
        this.employeeRef = employeeRef;
    }
}

/**
 * Processes an individual employee record, validates fields, converts types,
 * calculates bonus, and returns a formatted report object.
 * 
 * @param {Object} emp - Employee data object
 * @returns {Object} Calculated details
 */
function processEmployee(emp) {
    // Check if the employee object itself is valid
    if (!emp || typeof emp !== "object") {
        throw new EmployeeValidationError("Employee record is null or not an object", emp);
    }

    // Check for missing mandatory properties
    if (!emp.name || typeof emp.name !== "string" || emp.name.trim() === "") {
        throw new EmployeeValidationError("Missing or invalid 'name' property", emp);
    }

    if (emp.salary === undefined || emp.salary === null) {
        throw new EmployeeValidationError(`Employee '${emp.name}' is missing property 'salary'`, emp);
    }

    if (emp.years === undefined || emp.years === null) {
        throw new EmployeeValidationError(`Employee '${emp.name}' is missing property 'years'`, emp);
    }

    // Convert string inputs to numbers
    const numSalary = Number(emp.salary);
    const numYears = Number(emp.years);

    // Validate numeric conversions
    if (Number.isNaN(numSalary)) {
        throw new EmployeeValidationError(`Invalid salary value '${emp.salary}' for ${emp.name}; conversion resulted in NaN`, emp);
    }

    if (Number.isNaN(numYears)) {
        throw new EmployeeValidationError(`Invalid years value '${emp.years}' for ${emp.name}; conversion resulted in NaN`, emp);
    }

    if (numSalary < 0) {
        throw new EmployeeValidationError(`Salary cannot be negative (${numSalary}) for ${emp.name}`, emp);
    }

    if (numYears < 0) {
        throw new EmployeeValidationError(`Years of service cannot be negative (${numYears}) for ${emp.name}`, emp);
    }

    // Business Logic:
    // bonus = (salary * 0.1) if years > 3 else (salary * 0.05)
    // NOTE: In strict mode, if we omitted 'const', JS would throw: ReferenceError: bonusRate is not defined
    const bonusRate = numYears > 3 ? 0.10 : 0.05;
    const bonusAmount = numSalary * bonusRate;
    const totalCompensation = numSalary + bonusAmount;

    return {
        name: emp.name,
        salary: numSalary,
        years: numYears,
        bonusRatePercentage: bonusRate * 100,
        bonusAmount: bonusAmount,
        totalCompensation: totalCompensation
    };
}

console.log("================================================================================");
console.log("                     Q2: EMPLOYEE BONUS CALCULATOR                              ");
console.log("================================================================================");

console.log("\n[1] PROCESSING STANDARD EMPLOYEE LIST:\n");

const successfulCalculations = [];
const failedCalculations = [];

// Process standard employees
for (let i = 0; i < employees.length; i++) {
    const rawEmp = employees[i];
    try {
        const result = processEmployee(rawEmp);
        successfulCalculations.push(result);

        // Template string output with formatting
        console.log(`--------------------------------------------------------------------------------`);
        console.log(`Employee Name       : ${result.name}`);
        console.log(`Base Salary         : ₹${result.salary.toLocaleString("en-IN")}`);
        console.log(`Years of Service    : ${result.years} year(s)`);
        console.log(`Bonus Tier          : ${result.bonusRatePercentage}% (${result.years > 3 ? "Tenure > 3 yrs" : "Tenure ≤ 3 yrs"})`);
        console.log(`Calculated Bonus    : ₹${result.bonusAmount.toLocaleString("en-IN")}`);
        console.log(`Total Compensation  : ₹${result.totalCompensation.toLocaleString("en-IN")}`);
    } catch (error) {
        failedCalculations.push({ employee: rawEmp, error: error.message });
        console.error(`[ERROR] Failed to process employee: ${error.message}`);
    }
}

console.log("\n" + "=".repeat(80));
console.log("[2] TESTING ERROR HANDLING (MISSING PROPERTIES & CONVERSION FAILURES):");
console.log("=".repeat(80));

for (let i = 0; i < edgeCaseEmployees.length; i++) {
    const rawEmp = edgeCaseEmployees[i];
    try {
        const result = processEmployee(rawEmp);
        console.log(`✓ Processed successfully: ${result.name}`);
    } catch (error) {
        failedCalculations.push({ employee: rawEmp, error: error.message });
        console.log(`✗ Caught Expected Error [Item ${i}]: ${error.name} - ${error.message}`);
    }
}

console.log("\n" + "=".repeat(80));
console.log("FINAL SUMMARY REPORT");
console.log("=".repeat(80));
console.log(`Total Employees Evaluated     : ${employees.length + edgeCaseEmployees.length}`);
console.log(`Successfully Processed       : ${successfulCalculations.length}`);
console.log(`Rejected with Caught Errors  : ${failedCalculations.length}`);
console.log("=".repeat(80));
