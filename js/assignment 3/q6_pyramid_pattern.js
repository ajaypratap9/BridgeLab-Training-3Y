"use strict";

/**
 * ============================================================================
 * Assignment 3 - Q6: Pyramid Pattern Generator
 * ============================================================================
 * 
 * OBJECTIVES:
 * 1. Generate a pyramid pattern of asterisks based on user input (default = 5).
 * 2. Compare 'let' vs 'var' behavior and observe variable scoping/leakage.
 * 3. Track variable re-use pitfalls (the famous variable shadowing/mutation trap).
 * 4. Demonstrate how "use strict" catches undeclared loop variables.
 * 
 * PATTERN TO GENERATE:
 * *
 * * *
 * * * *
 * * * * *
 * 
 * HOISTING & SCOPE INSIGHTS:
 * ┌─────────────────┬───────────────────┬─────────────────────────────────────────┐
 * │ Keyword         │ Scope             │ Loop Behavior                           │
 * ├─────────────────┼───────────────────┼─────────────────────────────────────────┤
 * │ let             │ Block Scoped      │ Constrained within `for(...) {}`.       │
 * │                 │                   │ Clean teardown per iteration.           │
 * │ var             │ Function / Global │ Leaks outside loop block. Reusing the   │
 * │                 │                   │ same var name in nested loops destroys  │
 * │                 │                   │ outer counter.                          │
 * │ undeclared (i=) │ Implicit Global   │ In strict mode, immediately throws      │
 * │                 │                   │ ReferenceError!                         │
 * └─────────────────┴───────────────────┴─────────────────────────────────────────┘
 */

// Helper to resolve user input or default
function resolveRowCount() {
    // Check if command line argument is provided (e.g., node q6_pyramid_pattern.js 4)
    const cliArg = process.argv[2];
    if (cliArg !== undefined) {
        const parsed = parseInt(cliArg, 10);
        if (!Number.isNaN(parsed) && parsed > 0 && parsed <= 50) {
            return parsed;
        }
    }
    // Default limit
    return 5;
}

const rowLimit = resolveRowCount();

console.log("================================================================================");
console.log("                    Q6: PYRAMID PATTERN GENERATOR                               ");
console.log("================================================================================");
console.log(`Active Pyramid Row Limit: ${rowLimit} (from ${process.argv[2] ? "CLI argument" : "default setting"})\n`);

// ============================================================================
// TASK 1: GENERATION USING 'let' (BLOCK-SCOPED, SAFE)
// ============================================================================
console.log("[1] PATTERN GENERATION WITH 'let' (BLOCK SCOPE):");
console.log("-".repeat(80));

function generateWithLet(rows) {
    for (let i = 1; i <= rows; i++) {
        let rowStr = "";
        for (let j = 1; j <= i; j++) {
            rowStr += (j === 1 ? "*" : " *");
        }
        console.log(rowStr);
    }

    // VERIFY SCOPE: 'i' and 'j' do not exist here
    try {
        // Attempting to access 'i' outside the loop block
        const check = i;
    } catch (err) {
        console.log(`\n✓ Scope Verification: Accessing 'i' outside loop throws ${err.name} ('i' was cleanly block-scoped).`);
    }
}
generateWithLet(rowLimit);

// ============================================================================
// TASK 2: REPLACING 'let' WITH 'var' & OBSERVING SCOPE LEAKAGE
// ============================================================================
console.log("\n" + "-".repeat(80));
console.log("[2] REPLACING 'let' WITH 'var' - OBSERVING VARIABLE LEAKAGE");
console.log("-".repeat(80));

function generateWithVar(rows) {
    for (var i = 1; i <= rows; i++) {
        var rowStr = "";
        for (var j = 1; j <= i; j++) {
            rowStr += (j === 1 ? "*" : " *");
        }
        console.log(rowStr);
    }

    // 'i' and 'j' HAVE LEAKED outside the loop blocks!
    console.log(`\n⚠ Scope Leakage Observation:`);
    console.log(`  • Variable 'i' leaked into function scope! Value of i after loop: ${i}`);
    console.log(`  • Variable 'j' leaked into function scope! Value of j after loop: ${j}`);
    console.log(`  • Variable 'rowStr' leaked into function scope! Value: "${rowStr}"`);
}
generateWithVar(rowLimit);

// ============================================================================
// TASK 3: DEBUG STEP-BY-STEP TRACKING VARIABLE RE-USE TRAP
// ============================================================================
console.log("\n" + "-".repeat(80));
console.log("[3] TRACKING VARIABLE RE-USE (THE 'var' ACCIDENTAL OVERWRITE BUG)");
console.log("-".repeat(80));
console.log("Scenario: A developer mistakenly reuses the same index variable 'k' for both loops:");

function demonstrateVariableReuseTrap() {
    console.log("Starting nested loop with 'var k' in both outer and inner loops (limit = 3):");
    
    let iterations = 0;
    // We safeguard with iteration counter to prevent infinite freeze
    for (var k = 1; k <= 3; k++) {
        console.log(`  -> Outer loop start: k = ${k}`);
        
        // Inner loop mistakenly declares 'var k'
        // In JavaScript, this refers to the EXACT SAME variable 'k'!
        for (var k = 1; k <= 2; k++) {
            console.log(`       [Inner] k = ${k}`);
        }
        
        console.log(`  -> Outer loop end (after inner loop completed): k = ${k}`);
        iterations++;
        if (iterations > 5) {
            console.log("  [Terminated early to prevent infinite loop caused by corrupted counter!]");
            break;
        }
    }
    console.log("Explanation: Inner loop reset 'k' to 1 and incremented to 3, corrupting the outer loop counter!");
}
demonstrateVariableReuseTrap();

// ============================================================================
// TASK 4: USE "use strict" TO CATCH UNDECLARED LOOP VARIABLES
// ============================================================================
console.log("\n" + "-".repeat(80));
console.log("[4] 'use strict' CATCHING UNDECLARED LOOP VARIABLES");
console.log("-".repeat(80));

function testUndeclaredLoopVariable() {
    try {
        // Simulating: for (undeclaredVar = 0; undeclaredVar < 3; undeclaredVar++)
        const strictLoop = new Function('"use strict"; for (m = 1; m <= 3; m++) {}');
        strictLoop();
    } catch (err) {
        console.log("Caught Strict Mode Error for undeclared loop variable:");
        console.log(`  • Error Type: ${err.name}`);
        console.log(`  • Message   : ${err.message}`);
        console.log("  • Benefit   : Strict mode prevents typo variables from accidentally becoming globals!");
    }
}
testUndeclaredLoopVariable();

console.log("\n" + "=".repeat(80));
console.log("SUMMARY: LOOP VARIABLE BEST PRACTICES");
console.log("=".repeat(80));
console.log("1. Always use 'let' for loop counters to guarantee per-iteration block scoping.");
console.log("2. Avoid 'var' in loops to prevent scope leakage and accidental counter corruption.");
console.log("3. Strict mode guarantees that forgetting 'let' / 'const' throws immediately.");
console.log("=".repeat(80));
