"use strict";

/**
 * ============================================================================
 * Assignment 3 - Q7: Smart Calculator
 * ============================================================================
 * 
 * OBJECTIVE:
 * Implement a calculator engine driven by a switch statement supporting operations
 * ("add", "divide", "power", "root", "subtract"), enforce strict mathematical boundaries
 * via custom error classes (DivisionByZeroError, NegativeRootError, InvalidOperationError),
 * handle each via try...catch, and print a comprehensive execution report.
 * 
 * HOISTING & SCOPE INSIGHTS:
 * 1. Switch block scope: Variables declared with `let` or `const` inside a switch
 *    statement share the same lexical environment unless enclosed in `{}` blocks
 *    per case clause. To prevent lexical redeclaration collisions, wrap case logic
 *    in braces or return immediately.
 * 2. Strict Mode prevents accidental global assignment if an operation helper
 *    omits variable keywords.
 * 3. JS quirk: Standard JavaScript returns `Infinity` for `25 / 0` and `NaN` for
 *    `Math.sqrt(-25)`. Custom domain validation is required to throw proper exceptions.
 */

// Custom Error Classes
class CalculatorError extends Error {
    constructor(message) {
        super(message);
        this.name = "CalculatorError";
    }
}

class DivisionByZeroError extends CalculatorError {
    constructor(dividend) {
        super(`Math Error: Division by zero is undefined (${dividend} / 0)`);
        this.name = "DivisionByZeroError";
    }
}

class NegativeRootError extends CalculatorError {
    constructor(radicand) {
        super(`Math Error: Real square root of a negative number is undefined (√${radicand})`);
        this.name = "NegativeRootError";
    }
}

class InvalidOperationError extends CalculatorError {
    constructor(operation) {
        super(`Unsupported operation: '${operation}'. Permitted operations: add, subtract, multiply, divide, power, root`);
        this.name = "InvalidOperationError";
    }
}

/**
 * Executes a mathematical calculation using switch-case logic.
 * 
 * @param {string} op - Operation name
 * @param {number} a - First operand
 * @param {number} b - Second operand
 * @returns {number} Result of operation
 */
function calculate(op, a, b) {
    if (typeof a !== "number" || Number.isNaN(a) || typeof b !== "number" || Number.isNaN(b)) {
        throw new CalculatorError(`Invalid operand(s): a=${a}, b=${b}. Both must be valid numbers.`);
    }

    switch (op.toLowerCase().trim()) {
        case "add":
            return a + b;

        case "subtract":
            return a - b;

        case "multiply":
            return a * b;

        case "divide": {
            if (b === 0) {
                throw new DivisionByZeroError(a);
            }
            return a / b;
        }

        case "power":
            return Math.pow(a, b);

        case "root": {
            // Evaluates the principal square root of the first operand
            if (a < 0) {
                throw new NegativeRootError(a);
            }
            return Math.sqrt(a);
        }

        default:
            throw new InvalidOperationError(op);
    }
}

// Provided inputs
const operations = ["add", "divide", "power", "root", "subtract"];
const num1 = 25, num2 = 0;

console.log("================================================================================");
console.log("                        Q7: SMART CALCULATOR REPORT                             ");
console.log("================================================================================");
console.log(`Primary Operands: num1 = ${num1}, num2 = ${num2}\n`);

const resultsLog = [];

console.log("[1] EXECUTING SPECIFIED OPERATIONS ARRAY WITH (25, 0):");
console.log("-".repeat(80));

for (let i = 0; i < operations.length; i++) {
    const op = operations[i];
    try {
        const result = calculate(op, num1, num2);
        resultsLog.push({
            operation: op,
            num1: num1,
            num2: num2,
            status: "SUCCESS",
            result: result,
            note: "OK"
        });
        console.log(`✓ Operation: ${op.padEnd(10)} | Input: (${num1}, ${num2}) => Result: ${result}`);
    } catch (err) {
        resultsLog.push({
            operation: op,
            num1: num1,
            num2: num2,
            status: "FAILED",
            result: null,
            note: `[${err.name}] ${err.message}`
        });
        console.log(`✗ Operation: ${op.padEnd(10)} | Input: (${num1}, ${num2}) => FAILED: [${err.name}] ${err.message}`);
    }
}

// Additional test cases to verify NegativeRootError and InvalidOperationError
console.log("\n" + "-".repeat(80));
console.log("[2] TESTING EDGE CASES (NEGATIVE ROOT, UNKNOWN OPERATION, VALID DIVISION):");
console.log("-".repeat(80));

const edgeCases = [
    { op: "root", a: -25, b: 0, desc: "Square root of negative number" },
    { op: "modulus", a: 25, b: 4, desc: "Unrecognized operation" },
    { op: "divide", a: 100, b: 4, desc: "Valid division with non-zero denominator" },
    { op: "power", a: 2, b: 8, desc: "Exponentiation 2^8" }
];

for (let j = 0; j < edgeCases.length; j++) {
    const test = edgeCases[j];
    try {
        const res = calculate(test.op, test.a, test.b);
        resultsLog.push({
            operation: test.op,
            num1: test.a,
            num2: test.b,
            status: "SUCCESS",
            result: res,
            note: test.desc
        });
        console.log(`✓ ${test.desc.padEnd(45)} => Result: ${res}`);
    } catch (err) {
        resultsLog.push({
            operation: test.op,
            num1: test.a,
            num2: test.b,
            status: "FAILED",
            result: null,
            note: `[${err.name}] ${err.message}`
        });
        console.log(`✗ ${test.desc.padEnd(45)} => Caught: [${err.name}] ${err.message}`);
    }
}

// Formatted Summary Table
console.log("\n" + "=".repeat(80));
console.log("FINAL CALCULATION AUDIT SUMMARY");
console.log("=".repeat(80));
console.log(
    "Op".padEnd(12) +
    "Operands".padEnd(16) +
    "Status".padEnd(12) +
    "Outcome / Detail"
);
console.log("-".repeat(80));

resultsLog.forEach(entry => {
    const opDisplay = entry.operation.padEnd(12);
    const operandsDisplay = `(${entry.num1}, ${entry.num2})`.padEnd(16);
    const statusDisplay = (entry.status === "SUCCESS" ? "✓ SUCCESS" : "✗ FAILED").padEnd(12);
    const detailDisplay = entry.status === "SUCCESS" ? `Result: ${entry.result}` : entry.note;
    console.log(`${opDisplay}${operandsDisplay}${statusDisplay}${detailDisplay}`);
});
console.log("=".repeat(80));
