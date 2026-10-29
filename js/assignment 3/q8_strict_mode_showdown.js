"use strict";

/**
 * ============================================================================
 * Assignment 3 - Q8: Strict Mode Showdown
 * ============================================================================
 * 
 * ORIGINAL SNIPPET:
 * -------------------------------------------------------------
 * function demo(a, a) {
 *     total = 10;
 *     delete total;
 * }
 * demo(5, 10);
 * -------------------------------------------------------------
 * 
 * ============================================================================
 * TASK 1 & 2: BEHAVIOR COMPARISON (WITH VS WITHOUT 'use strict')
 * ============================================================================
 * 
 * 1. DUPLICATE PARAMETERS: `function demo(a, a)`
 *    - Without "use strict":
 *      Silently allowed! The second parameter `a` shadows the first `a`.
 *      Inside the function, `a` receives the second argument (`10`). The first
 *      argument (`5`) is accessible only via `arguments[0]`.
 *    - With "use strict":
 *      Throws immediately during parsing:
 *      `SyntaxError: Duplicate parameter name not allowed in this context`
 * 
 * 2. UNDECLARED VARIABLE ASSIGNMENT: `total = 10;`
 *    - Without "use strict":
 *      Creates an implicit global property `globalThis.total = 10`.
 *      No error is thrown.
 *    - With "use strict":
 *      Throws at runtime:
 *      `ReferenceError: total is not defined`
 * 
 * 3. DELETING UNQUALIFIED IDENTIFIER: `delete total;`
 *    - Without "use strict":
 *      Deletes the property from the global object (returns `true`).
 *      (If `total` were declared with `var`, it would return `false` without error).
 *    - With "use strict":
 *      Throws during parsing / compilation:
 *      `SyntaxError: Delete of an unqualified identifier in strict mode.`
 * 
 * ============================================================================
 * TASK 3: WHY STRICT MODE MAKES THESE OPERATIONS ILLEGAL
 * ============================================================================
 * - Duplicate Parameters: They obscure code clarity and make static analysis
 *   ambiguous. If two parameters share the same identifier, intent is unclear.
 * - Undeclared Variables: They pollute the global scope, leak memory, and cause
 *   silent regressions when variable names are misspelled.
 * - Deleting Identifiers: `delete` was designed strictly for object properties
 *   (`delete object.property`). Allowing `delete identifier` hinders V8 engine
 *   optimization (hidden classes and inline caching) and compromises variable permanence.
 */

console.log("================================================================================");
console.log("                      Q8: STRICT MODE SHOWDOWN                                  ");
console.log("================================================================================");

// Demonstration 1: Running in Non-Strict (Sloppy) Mode
console.log("\n[1] NON-STRICT (SLOPPY) MODE EXECUTION:");
console.log("-".repeat(80));

function runSloppyDemo() {
    // We execute inside an isolated non-strict function wrapper
    const sloppyFn = new Function(`
        function demo(a, a) {
            total = 10;
            var deleted = delete total;
            return {
                lastParamA: a,
                globalTotalDeleted: deleted
            };
        }
        return demo(5, 10);
    `);

    const result = sloppyFn();
    console.log("Result in Non-Strict Mode:");
    console.log(`  • Function demo(5, 10) executed WITHOUT throwing.`);
    console.log(`  • Parameter 'a' resolved to second value : ${result.lastParamA}`);
    console.log(`  • 'delete total' executed with return    : ${result.globalTotalDeleted}`);
    console.log(`  • Global pollution occurred during execution.`);
}
runSloppyDemo();

// Demonstration 2: Strict Mode Violations Breakdown
console.log("\n" + "-".repeat(80));
console.log("[2] STRICT MODE VIOLATIONS BREAKDOWN:");
console.log("-".repeat(80));

// Test 2A: Duplicate Parameter
try {
    new Function('"use strict"; function test(a, a) {}');
} catch (err) {
    console.log(`A. Duplicate Parameters Check:`);
    console.log(`   • Error  : [${err.name}] ${err.message}`);
    console.log(`   • Reason : Strict mode prohibits duplicate parameter names.`);
}

// Test 2B: Undeclared Variable Assignment
try {
    new Function('"use strict"; total = 10;')();
} catch (err) {
    console.log(`\nB. Undeclared Variable Check:`);
    console.log(`   • Error  : [${err.name}] ${err.message}`);
    console.log(`   • Reason : Strict mode prevents implicit global variables.`);
}

// Test 2C: Delete Unqualified Identifier
try {
    new Function('"use strict"; var x = 5; delete x;');
} catch (err) {
    console.log(`\nC. Deleting Plain Variable Check:`);
    console.log(`   • Error  : [${err.name}] ${err.message}`);
    console.log(`   • Reason : Only object properties may be deleted via 'delete obj.prop'.`);
}

// ============================================================================
// TASK 4: CORRECT ES6 IMPLEMENTATION
// ============================================================================
console.log("\n" + "-".repeat(80));
console.log("[3] CORRECT MODERN ES6 IMPLEMENTATION:");
console.log("-".repeat(80));

/**
 * Modern ES6 Clean Version:
 * 1. Unique, descriptive parameter names with default values.
 * 2. Proper variable declaration with `const` or `let`.
 * 3. Proper object property deletion via `delete object.property` or rest destructuring.
 * 
 * @param {number} base - Initial baseline number
 * @param {number} factor - Multiplication or addition factor
 * @returns {Object} Computation state
 */
function cleanDemo(base = 0, factor = 0) {
    // 1. Declare variables explicitly using const/let
    let total = base + factor;

    // 2. Encapsulate properties within an object
    const state = {
        base,
        factor,
        total,
        temporaryFlag: true
    };

    // 3. Deleting an object property is valid and explicit
    const wasDeleted = delete state.temporaryFlag;

    console.log(`Inside cleanDemo(${base}, ${factor}):`);
    console.log(`  • Base: ${base}, Factor: ${factor}`);
    console.log(`  • Calculated Total: ${state.total}`);
    console.log(`  • Deleted 'temporaryFlag' from state object: ${wasDeleted}`);

    return state;
}

const finalState = cleanDemo(5, 10);
console.log("\nFinal Returned Object:", JSON.stringify(finalState));

console.log("\n" + "=".repeat(80));
console.log("SUMMARY: STRICT MODE DEFENSIVE ADVANTAGES");
console.log("=".repeat(80));
console.log("1. Eliminates silent errors by converting them into thrown exceptions.");
console.log("2. Disallows bad practices (eval scope leaks, duplicate params, deleting vars).");
console.log("3. Enables JavaScript engines (V8, SpiderMonkey) to perform heavy optimizations.");
console.log("=".repeat(80));
