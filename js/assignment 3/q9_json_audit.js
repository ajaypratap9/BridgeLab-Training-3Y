"use strict";

/**
 * ============================================================================
 * Assignment 3 - Q9: JSON Audit
 * ============================================================================
 * 
 * OBJECTIVE:
 * Ingest an array of raw JSON strings, parse them with robust try...catch handling,
 * detect malformed JSON syntax as well as schema/key discrepancies (missing user/age),
 * log errors with line/record numbers, trace step-by-step control flow, sanitize/convert
 * age to a Number, and filter out under-18 users.
 * 
 * HOISTING & SCOPE INSIGHTS:
 * 1. Scope of variables inside `try {}`: Variables declared with `const`/`let` inside
 *    the `try` block are block-scoped to `try`. They cannot be accessed in `catch` or
 *    outside unless declared in the outer scope before `try`.
 * 2. `catch (err)` binding: The identifier `err` is strictly scoped to the catch block.
 * 3. Hoisting: Helper validation functions are hoisted to the top of the script.
 * 
 * DEBUG & CONTROL FLOW OBSERVATIONS:
 * - When `JSON.parse('{invalid}')` throws a `SyntaxError`, the runtime immediately
 *   aborts further evaluation within the `try` block.
 * - Program counter jumps directly to the first instruction of the `catch` block.
 * - The error object retains the stack trace, message, and error name.
 * - After `catch` executes, loop execution proceeds normally without halting.
 */

// Provided dataset
const rawData = [
    '{"user":"Alex","age":25}',
    '{"id":2}',
    '{invalid}',
    '{"user":"Mina","age":"22"}'
];

// Augmented dataset including an under-18 user and edge cases to test bonus filter
const extendedData = [
    ...rawData,
    '{"user":"Leo","age":15}',             // Under 18 (should be filtered out in bonus)
    '{"user":"Sam","age":"invalid_age"}',  // Invalid age conversion
    '{"age":30}'                           // Missing 'user' key
];

/**
 * Custom error class for JSON Schema / Key Validation failures.
 */
class JsonSchemaError extends Error {
    constructor(message, lineNumber, rawPayload) {
        super(message);
        this.name = "JsonSchemaError";
        this.lineNumber = lineNumber;
        this.rawPayload = rawPayload;
    }
}

/**
 * Validates, parses, and transforms a single raw JSON string entry.
 * 
 * @param {string} rawString - Raw JSON entry string
 * @param {number} lineNumber - 1-based line/record number
 * @returns {Object} Sanitized object with numeric age
 */
function auditAndParseEntry(rawString, lineNumber) {
    // 1. JSON Parsing
    let parsedObj;
    try {
        parsedObj = JSON.parse(rawString);
    } catch (parseError) {
        // Control flow: syntax error caught and rethrown with line context
        throw new JsonSchemaError(
            `Malformed JSON syntax: ${parseError.message}`,
            lineNumber,
            rawString
        );
    }

    // 2. Validate object type
    if (!parsedObj || typeof parsedObj !== "object" || Array.isArray(parsedObj)) {
        throw new JsonSchemaError("Parsed payload is not a valid JSON object", lineNumber, rawString);
    }

    // 3. Detect missing keys ('user' and 'age')
    const missingKeys = [];
    if (!("user" in parsedObj)) missingKeys.push("user");
    if (!("age" in parsedObj)) missingKeys.push("age");

    if (missingKeys.length > 0) {
        throw new JsonSchemaError(
            `Missing required key(s): ${missingKeys.map(k => `'${k}'`).join(", ")}`,
            lineNumber,
            rawString
        );
    }

    // 4. Validate and convert 'age' to Number
    const rawAge = parsedObj.age;
    const numAge = Number(rawAge);

    if (Number.isNaN(numAge) || typeof rawAge === "boolean" || rawAge === null || String(rawAge).trim() === "") {
        throw new JsonSchemaError(
            `Invalid age value '${rawAge}'; unable to convert to a valid number`,
            lineNumber,
            rawString
        );
    }

    if (numAge < 0 || numAge > 150) {
        throw new JsonSchemaError(
            `Age ${numAge} is outside reasonable human lifespan range (0-150)`,
            lineNumber,
            rawString
        );
    }

    // Return sanitized object
    return {
        user: String(parsedObj.user).trim(),
        age: numAge,
        originalLine: lineNumber
    };
}

console.log("================================================================================");
console.log("                          Q9: JSON AUDIT REPORT                                 ");
console.log("================================================================================");

const cleanArray = [];
const auditErrorLog = [];

console.log("\n[1] STEP-BY-STEP AUDIT OF DATASET:\n");

// Process dataset
for (let i = 0; i < extendedData.length; i++) {
    const lineNumber = i + 1; // 1-based line number for user-friendly logging
    const rawEntry = extendedData[i];

    console.log(`Analyzing Line ${lineNumber}: ${rawEntry}`);

    try {
        // Step-by-step: try parsing and validating
        const validatedUser = auditAndParseEntry(rawEntry, lineNumber);
        cleanArray.push(validatedUser);
        console.log(`  -> [SUCCESS] Parsed cleanly: User="${validatedUser.user}", Age=${validatedUser.age}\n`);
    } catch (error) {
        // Step-by-step: Catch control flow
        auditErrorLog.push({
            line: lineNumber,
            raw: rawEntry,
            errorType: error.name,
            message: error.message
        });
        console.log(`  -> [ERROR on Line ${lineNumber}] ${error.name}: ${error.message}\n`);
    }
}

// Display Clean Array
console.log("-".repeat(80));
console.log("[2] CLEAN ARRAY (PARSED & SANITIZED VALID ENTRIES):");
console.log("-".repeat(80));
cleanArray.forEach((entry, idx) => {
    console.log(`  [${idx + 1}] User: ${entry.user.padEnd(10)} | Age: ${String(entry.age).padEnd(4)} (type: ${typeof entry.age}) | Origin: Line ${entry.originalLine}`);
});

// Display Error Log with Line Numbers
console.log("\n" + "-".repeat(80));
console.log("[3] AUDIT ERROR LOG (RECORDED WITH LINE NUMBERS):");
console.log("-".repeat(80));
auditErrorLog.forEach(item => {
    console.log(`  ✗ Line ${item.line}: [${item.errorType}] ${item.message} | Payload: ${item.raw}`);
});

// BONUS TASK: Filter Under-18 Users
console.log("\n" + "-".repeat(80));
console.log("[4] BONUS TASK: FILTER UNDER-18 USERS (ADULT USERS ONLY):");
console.log("-".repeat(80));

const adultUsers = cleanArray.filter(person => person.age >= 18);
const minorUsers = cleanArray.filter(person => person.age < 18);

console.log(`Eligible Adult Users (Age >= 18):`);
adultUsers.forEach(u => {
    console.log(`  ✓ ${u.user} (Age: ${u.age}) - ELIGIBLE ADULT`);
});

if (minorUsers.length > 0) {
    console.log(`\nFiltered Out Minors (Age < 18):`);
    minorUsers.forEach(u => {
        console.log(`  ✗ ${u.user} (Age: ${u.age}) - EXCLUDED (< 18)`);
    });
}

// Final Summary
console.log("\n" + "=".repeat(80));
console.log("FINAL AUDIT SUMMARY");
console.log("=".repeat(80));
console.log(`Total Records Evaluated : ${extendedData.length}`);
console.log(`Syntactically Valid     : ${cleanArray.length}`);
console.log(`Rejected with Errors    : ${auditErrorLog.length}`);
console.log(`Adults (Age >= 18)      : ${adultUsers.length}`);
console.log(`Minors (Age < 18)       : ${minorUsers.length}`);
console.log("=".repeat(80));
