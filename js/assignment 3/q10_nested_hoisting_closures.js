"use strict";

/**
 * ============================================================================
 * Assignment 3 - Q10: Nested Hoisting and Closures
 * ============================================================================
 * 
 * ORIGINAL SNIPPET TO ANALYZE:
 * -------------------------------------------------------------
 * function outer() {
 *     console.log(count);
 *     var count = 5;
 *     function inner() {
 *         console.log(count);
 *         var count = 10;
 *     }
 *     inner();
 * }
 * outer();
 * -------------------------------------------------------------
 * 
 * ============================================================================
 * TASK 1: PREDICTION & LOGIC EXPLANATION
 * ============================================================================
 * OUTPUT PREDICTION:
 *   undefined
 *   undefined
 * 
 * DETAILED EXPLANATION:
 * 1. Invoking `outer()`:
 *    - An Execution Context for `outer` is created.
 *    - In the creation phase, `var count` inside `outer` is hoisted and initialized to `undefined`.
 *    - When `console.log(count)` executes on line 1 of `outer`, `count` is read as `undefined`.
 *    - Then, `count = 5` assigns the value 5 to `outer`'s `count`.
 * 
 * 2. Invoking `inner()`:
 *    - A new Execution Context for `inner` is created and pushed onto the Call Stack.
 *    - In `inner`'s creation phase, its own local declaration `var count` is hoisted to the
 *      top of `inner`'s local scope and initialized to `undefined`.
 *    - This local `count` SHADOWS the outer `count` (which holds 5).
 *    - When `console.log(count)` executes on line 1 of `inner`, the JS engine checks the
 *      local scope first. It finds the hoisted local `count`, which is `undefined`!
 *    - It prints `undefined` (NOT 5).
 *    - Then `count = 10` assigns 10 to `inner`'s local `count`.
 * 
 * ============================================================================
 * TASK 2: HOW HOISTING CREATES SEPARATE MEMORY CONTEXTS
 * ============================================================================
 * ┌───────────────────────────────────────────────────────────────────────────┐
 * │ 1. Global Execution Context (GEC)                                        │
 * │    - Scope / Environment: outer -> Function Object                       │
 * └───────────────────────────────────┬───────────────────────────────────────┘
 *                                     │ calls outer()
 * ┌───────────────────────────────────▼───────────────────────────────────────┐
 * │ 2. outer() Execution Context (OEC)                                        │
 * │    - Variable Environment : count = 5 (initially undefined)               │
 * │    - Lexical Environment  : inner -> Function Object                      │
 * │    - Outer Reference      : points to Global Scope                        │
 * └───────────────────────────────────┬───────────────────────────────────────┘
 *                                     │ calls inner()
 * ┌───────────────────────────────────▼───────────────────────────────────────┐
 * │ 3. inner() Execution Context (IEC)                                        │
 * │    - Variable Environment : count = 10 (initially undefined) [SHADOWS]    │
 * │    - Outer Reference      : points to outer() Scope                       │
 * │    - Scope Chain Search   : Resolves local 'count' before checking outer  │
 * └───────────────────────────────────────────────────────────────────────────┘
 * 
 * ============================================================================
 * TASK 4: CALL STACK & DEBUGGER SESSION (STEP-BY-STEP)
 * ============================================================================
 * When debugging in VS Code or Chrome DevTools (`debugger;` placed below):
 * 
 * CALL STACK TRACE:
 *   Step A: Call Stack: [ global ]
 *   Step B: Call Stack: [ outer, global ]
 *   Step C: Call Stack: [ inner, outer, global ]
 *   Step D: inner completes -> popped -> Call Stack: [ outer, global ]
 *   Step E: outer completes -> popped -> Call Stack: [ global ]
 * 
 * SCOPE INSPECTOR AT BREAKPOINT INSIDE inner():
 *   - Local Scope     : count = undefined (hoisted local variable)
 *   - Closure (outer) : count = 5 (outer function's variable)
 *   - Global Scope    : standard globals
 */

console.log("================================================================================");
console.log("                Q10: NESTED HOISTING AND CLOSURES                               ");
console.log("================================================================================");

// Task 1: Running the original code and verifying the prediction
console.log("\n[1] RUNNING ORIGINAL CODE SNIPPET:");
console.log("-".repeat(80));

function originalOuter() {
    console.log("outer() line 1 -> count is:", count); // undefined
    var count = 5;
    console.log("outer() line 3 -> count assigned:", count); // 5

    function inner() {
        console.log("inner() line 1 -> count is:", count); // undefined (due to local hoisting & shadowing!)
        var count = 10;
        console.log("inner() line 3 -> count assigned:", count); // 10
    }

    inner();
}
originalOuter();

// ============================================================================
// TASK 3: CONVERTING INNER FUNCTION TO AN ARROW FUNCTION
// ============================================================================
console.log("\n" + "-".repeat(80));
console.log("[2] BEHAVIOR WITH ARROW FUNCTION:");
console.log("-".repeat(80));

/*
 * SCENARIO 3A: Arrow function WITH its own local 'var count = 10'
 * Even though it is an arrow function, 'var' is still function-scoped to the arrow
 * function's body! Therefore, 'count' is hoisted locally and still logs 'undefined'.
 */
console.log("--- Scenario 3A: Arrow function with its own 'var count' ---");
function outerWithArrowLocalVar() {
    var count = 5;

    const innerArrow = () => {
        console.log("innerArrow (with local var) count is:", count); // undefined!
        var count = 10;
    };

    innerArrow();
}
outerWithArrowLocalVar();

/*
 * SCENARIO 3B: Arrow function WITHOUT local declaration (TRUE CLOSURE)
 * When the arrow function does not declare its own 'count', the JavaScript engine
 * traverses the scope chain to the enclosing lexical environment (outer) and reads
 * outer's 'count' (which is 5).
 */
console.log("\n--- Scenario 3B: Arrow function accessing outer's variable (Closure) ---");
function outerWithTrueClosure() {
    var count = 5;

    const innerClosure = () => {
        // No local 'count' declared here; captures 'count' from outer scope
        console.log("innerClosure (closing over outer) count is:", count); // 5!
    };

    innerClosure();
}
outerWithTrueClosure();

// ============================================================================
// TASK 4: DEBUGGER INSPECTION AND CALL STACK WALKTHROUGH
// ============================================================================
console.log("\n" + "-".repeat(80));
console.log("[3] INTERACTIVE DEBUGGER & CALL STACK OBSERVATION:");
console.log("-".repeat(80));

function debuggedOuter() {
    const stage = "outer-execution";
    var outerCount = 5;

    function debuggedInner() {
        // Programmatic Breakpoint for IDE / Chrome DevTools:
        /*
         * UNCOMMENT 'debugger;' TO OBSERVE IN DEVTOOLS / VS CODE:
         * 1. Check CALL STACK: debuggedInner -> debuggedOuter -> (anonymous)
         * 2. Check SCOPES:
         *    - Local: innerCount = undefined (hoisted!)
         *    - Closure (debuggedOuter): outerCount = 5, stage = "outer-execution"
         */
        // debugger;

        console.log("Debugged Inner: Local 'innerCount' prior to assignment is:", innerCount);
        var innerCount = 10;
        console.log("Debugged Inner: Local 'innerCount' after assignment is:", innerCount);
        console.log("Debugged Inner: Accessing outer's 'outerCount' directly:", outerCount);
    }

    debuggedInner();
}
debuggedOuter();

console.log("\n" + "=".repeat(80));
console.log("SUMMARY: HOISTING & CLOSURE TAKEAWAYS");
console.log("=".repeat(80));
console.log("1. 'var' declarations are always hoisted to the top of their immediate function scope.");
console.log("2. Local declarations shadow (mask) identifiers of the same name in parent scopes.");
console.log("3. To allow an inner function to close over an outer variable, do NOT re-declare it inside.");
console.log("4. Arrow functions share 'this' lexically, but still have their own variable environments");
console.log("   if 'var', 'let', or 'const' is declared inside their block.");
console.log("=".repeat(80));
