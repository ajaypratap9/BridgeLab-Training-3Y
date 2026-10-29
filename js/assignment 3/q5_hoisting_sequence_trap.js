"use strict";

/**
 * ============================================================================
 * Assignment 3 - Q5: Hoisting Lab: The Sequence Trap
 * ============================================================================
 * 
 * ORIGINAL SNIPPET TO PREDICT:
 * -------------------------------------------------------------
 * console.log(score);
 * announce();
 * var score = 50;
 * function announce() { console.log("Game started"); }
 * let status = "ready";
 * startGame();
 * function startGame() {
 *     console.log(status);
 * }
 * -------------------------------------------------------------
 * 
 * ============================================================================
 * TASK 1: MEMORY STATE & HOISTING EXPLANATION
 * ============================================================================
 * JavaScript executes in two distinct phases:
 * 
 * PHASE 1: CREATION PHASE (COMPILATION / MEMORY ALLOCATION)
 * ┌───────────────────┬─────────────────────────┬───────────────────────────────┐
 * │ Identifier        │ Declaration Type        │ Memory State in Scope         │
 * ├───────────────────┼─────────────────────────┼───────────────────────────────┤
 * │ score             │ var                     │ Hoisted and initialized as    │
 * │                   │                         │ `undefined`.                  │
 * │ announce          │ function declaration    │ Hoisted with full function    │
 * │                   │                         │ body in memory.               │
 * │ status            │ let                     │ Hoisted into Temporal Dead    │
 * │                   │                         │ Zone (TDZ). Uninitialized.    │
 * │ startGame         │ function declaration    │ Hoisted with full function    │
 * │                   │                         │ body in memory.               │
 * └───────────────────┴─────────────────────────┴───────────────────────────────┘
 * 
 * PHASE 2: EXECUTION PHASE (STEP-BY-STEP CODE RUN)
 * 1. Line 1: `console.log(score)` -> Reads `score` from memory. Since `score` is
 *    currently `undefined`, it logs: `undefined`. (NOT 50, and NOT ReferenceError).
 * 2. Line 2: `announce()` -> `announce` is already a callable function.
 *    Executes its body. Logs: `"Game started"`.
 * 3. Line 3: `var score = 50` -> `score` is now assigned the value `50`.
 * 4. Line 4: `function announce() { ... }` -> Declaration already handled; skipped.
 * 5. Line 5: `let status = "ready"` -> `status` is initialized with `"ready"`, exiting TDZ.
 * 6. Line 6: `startGame()` -> Calls `startGame()`. Inside, `console.log(status)` looks up
 *    `status`. Since line 5 already initialized `status` to `"ready"`, it logs: `"ready"`.
 * 7. Line 7: `function startGame() { ... }` -> Declaration already handled; skipped.
 * 
 * PREDICTED OUTPUT:
 *   undefined
 *   Game started
 *   ready
 */

console.log("================================================================================");
console.log("                Q5: HOISTING LAB: THE SEQUENCE TRAP                             ");
console.log("================================================================================");

console.log("\n[1] RUNNING ORIGINAL CODE SEQUENCE (VERIFYING PREDICTION):");
console.log("-".repeat(80));

// Step-by-step reproduction of the original sequence
console.log("Step 1: console.log(score)   => Output:", score);
announce();
var score = 50;
console.log("Step 3: Post assignment score => Output:", score);

function announce() {
    console.log("Step 2: announce() called    => Output: Game started");
}

let status = "ready";
console.log("Step 5: status initialized   => Output:", status);
startGame();

function startGame() {
    console.log("Step 6: startGame() called   => Output:", status);
}

// ============================================================================
// TASK 2: FIX CODE TO RUN LOGICALLY & CLEANLY
// ============================================================================
console.log("\n" + "-".repeat(80));
console.log("[2] FIXED VERSION: CLEAN, PREDICTABLE DECLARATION ORDER");
console.log("-".repeat(80));

/**
 * Clean version rules:
 * 1. Declare all variables (prefer const/let) before using them.
 * 2. Keep functions declared before execution calls for readability.
 * 3. Avoid depending on var's undefined hoisting behavior.
 */
function cleanSequentialDemo() {
    // Declarations first
    const cleanScore = 50;
    const cleanStatus = "ready";

    function cleanAnnounce() {
        console.log("✓ Game announcement: Game started");
    }

    function cleanStartGame() {
        console.log(`✓ Game initialized! Status: '${cleanStatus}', Score: ${cleanScore}`);
    }

    // Invocations after initialization
    cleanAnnounce();
    console.log(`✓ Accessing score after initialization: ${cleanScore}`);
    cleanStartGame();
}
cleanSequentialDemo();

// ============================================================================
// TASK 3: REWRITE USING ARROW FUNCTIONS (HOISTING COMPARISON)
// ============================================================================
console.log("\n" + "-".repeat(80));
console.log("[3] ARROW FUNCTION HOISTING BEHAVIOR COMPARISON");
console.log("-".repeat(80));

/*
 * KEY DIFFERENCE:
 * - Function declarations (`function foo() {}`) are hoisted with definition.
 * - Arrow functions assigned to `const` or `let` (`const foo = () => {}`) are hoisted
 *   into the TDZ like any other let/const variable.
 * - Arrow functions assigned to `var` (`var foo = () => {}`) are hoisted as `undefined`.
 *   Calling `foo()` before its assignment throws `TypeError: foo is not a function`!
 */

// Demonstration 3A: Arrow function with 'const' before initialization
try {
    // Attempting to call arrow function before definition
    // constArrowAnnounce(); // Uncaught ReferenceError
    const testTdz = new Function('"use strict"; arrowConst(); const arrowConst = () => {};');
    testTdz();
} catch (err) {
    console.log(`A. Arrow with 'const' before assignment:`);
    console.log(`   • Caught Error : ${err.name} - ${err.message}`);
    console.log(`   • Explanation  : Arrow functions with const/let reside in the TDZ before declaration.`);
}

// Demonstration 3B: Arrow function with 'var' before initialization
try {
    const testVarArrow = new Function('"use strict"; arrowVar(); var arrowVar = () => {};');
    testVarArrow();
} catch (err) {
    console.log(`\nB. Arrow with 'var' before assignment:`);
    console.log(`   • Caught Error : ${err.name} - ${err.message}`);
    console.log(`   • Explanation  : 'arrowVar' is hoisted as undefined. Calling undefined() throws TypeError.`);
}

// Demonstration 3C: Properly declared Arrow Functions
console.log(`\nC. Properly Ordered Arrow Functions:`);
const arrowAnnounce = () => {
    console.log("   • [Arrow] Game started");
};

const arrowScore = 50;
const arrowStatus = "ready";

const arrowStartGame = () => {
    console.log(`   • [Arrow] Game running with status: ${arrowStatus}, score: ${arrowScore}`);
};

arrowAnnounce();
arrowStartGame();

console.log("\n" + "=".repeat(80));
console.log("HOISTING MATRIX SUMMARY");
console.log("=".repeat(80));
console.log("1. function declaration : Hoisted WITH body. Callable anywhere in scope.");
console.log("2. var variable         : Hoisted as 'undefined'. No TDZ.");
console.log("3. let / const variable : Hoisted in TDZ. Throws ReferenceError if accessed early.");
console.log("4. var arrow function   : Variable is 'undefined'. Early call throws TypeError.");
console.log("5. const arrow function : Resides in TDZ. Early call throws ReferenceError.");
console.log("=".repeat(80));
