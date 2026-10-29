"use strict";

/**
 * ============================================================================
 * Assignment 3 - Q1: Dynamic Data Parser
 * ============================================================================
 * 
 * OBJECTIVE:
 * Process mixed API data, convert each value into Number, Boolean, and String forms,
 * separate valid numeric values from invalid numeric entries, and print a detailed report.
 * 
 * HOISTING & SCOPE CONCEPTS:
 * 1. "use strict" prevents accidental global variable leaks.
 * 2. `const` and `let` declarations are block-scoped and hoisted to the Temporal
 *    Dead Zone (TDZ). They cannot be accessed before their declaration line.
 * 3. Functions declared with `function` keyword are hoisted with definition intact,
 *    allowing invocation before definition.
 * 
 * DEBUG OBSERVATIONS & JS COERCION QUIRKS:
 * - Number(" ") === 0 : In JS, whitespace strings coerce to 0 when using Number().
 * - Number(null) === 0: null coerces to 0 in numeric contexts.
 * - Number(undefined) === NaN: undefined coerces to NaN.
 * - Number("100px") === NaN: Number() requires the entire string to be valid numeric characters,
 *   unlike parseInt("100px") which parses up to the first non-numeric character.
 * - Number("NaN") === NaN: String literal "NaN" becomes the numeric NaN.
 * - Number.isNaN(x) is safer than isNaN(x) because isNaN() coerces its argument first,
 *   whereas Number.isNaN() strictly checks if the value is both of type 'number' and NaN.
 */

// Input dataset
const apiData = ["25", "true", "false", "NaN", " ", "100px", "3.14", null, undefined];

/**
 * Validates whether a given raw value represents a legitimate numeric value.
 * Explicitly rejects null, undefined, and whitespace-only strings despite
 * JavaScript's implicit coercion of null and "" / " " to 0.
 *
 * @param {*} value - Raw value from API
 * @returns {{ isValid: boolean, reason: string }}
 */
function validateNumeric(value) {
    // Check for null or undefined
    if (value === null) {
        return { isValid: false, reason: "Null value (coerces to 0 implicitly, but not a valid numeric input)" };
    }
    if (value === undefined) {
        return { isValid: false, reason: "Undefined value (coerces to NaN)" };
    }

    // Check for whitespace string (which Number() mistakenly coerces to 0)
    if (typeof value === "string" && value.trim() === "") {
        return { isValid: false, reason: "Whitespace string (coerces to 0 in Number(), but invalid numeric data)" };
    }

    // Check for explicit "NaN" string
    if (value === "NaN") {
        return { isValid: false, reason: "Literal string 'NaN' evaluates to NaN" };
    }

    const convertedNum = Number(value);

    // Check if conversion yielded NaN
    if (Number.isNaN(convertedNum)) {
        if (typeof value === "string" && /[a-zA-Z]/.test(value)) {
            return { isValid: false, reason: `Alphanumeric string '${value}' contains non-digit characters` };
        }
        return { isValid: false, reason: "Number conversion resulted in NaN" };
    }

    return { isValid: true, reason: "Valid number" };
}

// Arrays to store categorized data
const validNumericData = [];
const invalidNumericData = [];
const conversionAuditLog = [];

console.log("================================================================================");
console.log("                       Q1: DYNAMIC DATA PARSER REPORT                           ");
console.log("================================================================================");
console.log("\n[1] PROCESSING & TYPE CONVERSIONS:\n");

// Iterate through the mixed API dataset
for (let i = 0; i < apiData.length; i++) {
    const raw = apiData[i];

    // Explicit Type Conversions
    const asNumber = Number(raw);
    const asBoolean = Boolean(raw);
    const asString = String(raw);

    // Validation
    const validation = validateNumeric(raw);

    const record = {
        index: i,
        rawValue: raw,
        rawType: typeof raw,
        numberForm: asNumber,
        booleanForm: asBoolean,
        stringForm: asString,
        isValidNumber: validation.isValid,
        reason: validation.reason
    };

    conversionAuditLog.push(record);

    if (validation.isValid) {
        validNumericData.push({
            index: i,
            raw: raw,
            parsedNumber: asNumber,
            booleanForm: asBoolean,
            stringForm: asString
        });
    } else {
        invalidNumericData.push({
            index: i,
            raw: raw,
            convertedAs: asNumber,
            reason: validation.reason
        });
    }

    // Log individual item conversion
    const displayRaw = raw === " " ? "' '" : (typeof raw === "string" ? `'${raw}'` : String(raw));
    console.log(
        `Item [${i}] ${displayRaw.padEnd(12)} -> Number: ${String(asNumber).padEnd(8)} | Boolean: ${String(asBoolean).padEnd(6)} | String: "${asString}"`
    );
}

// Print Separated Reports
console.log("\n" + "-".repeat(80));
console.log("[2] VALID NUMERIC DATA ARRAY:");
console.log("-".repeat(80));
if (validNumericData.length === 0) {
    console.log("No valid numeric values found.");
} else {
    validNumericData.forEach((item) => {
        console.log(
            `  ✓ [Index ${item.index}] Raw: ${String(item.raw).padEnd(8)} => Value: ${item.parsedNumber} (typeof: ${typeof item.parsedNumber})`
        );
    });
}

console.log("\n" + "-".repeat(80));
console.log("[3] SKIPPED / INVALID NUMERIC DATA ARRAY (LOGGED SEPARATELY):");
console.log("-".repeat(80));
invalidNumericData.forEach((item) => {
    const displayRaw = item.raw === " " ? "' '" : (typeof item.raw === "string" ? `'${item.raw}'` : String(item.raw));
    console.log(
        `  ✗ [Index ${item.index}] Raw: ${displayRaw.padEnd(12)} => Reason: ${item.reason}`
    );
});

// Final Summary
console.log("\n" + "=".repeat(80));
console.log("FINAL SUMMARY REPORT");
console.log("=".repeat(80));
console.log(`Total API Records Processed : ${apiData.length}`);
console.log(`Valid Numeric Records       : ${validNumericData.length}`);
console.log(`Invalid / Skipped Records   : ${invalidNumericData.length}`);
console.log("=".repeat(80));
