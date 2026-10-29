"use strict";

/**
 * ============================================================================
 * Assignment 3 - Q4: Debugging Mystery
 * ============================================================================
 * 
 * INITIAL CODE:
 * "use strict";
 * function showMessage() {
 *     greeting = "Welcome"; // undeclared
 *     console.log(greeting);
 * }
 * showMessage();
 * 
 * ============================================================================
 * TASK 1: WHY THIS THROWS AN ERROR UNDER STRICT MODE
 * ============================================================================
 * 1. Non-Strict (Sloppy) Mode Behavior:
 *    When JavaScript encounters an assignment to an undeclared variable (`greeting = "Welcome"`),
 *    the engine traverses the lexical scope chain:
 *      Function Scope -> Global Scope
 *    When not found in the global scope, non-strict JS auto-creates a property on the
 *    global object (e.g., `window.greeting` in browsers or `global.greeting` in Node.js).
 *    This is known as an "implicit global" or "leaked global".
 * 
 * 2. Strict Mode Behavior ("use strict"):
 *    ECMAScript strict mode was introduced to eliminate JavaScript's silent pitfalls.
 *    In strict mode, assigning to an unresolvable LHS (Left-Hand Side) reference prevents
 *    implicit global creation and immediately throws:
 *      ReferenceError: greeting is not defined
 * 
 * ============================================================================
 * TASK 2: HOW SCOPE DECLARATION RULES CHANGE BEHAVIOR
 * ============================================================================
 * By declaring `greeting` with `let`, `const`, or `var`:
 * - `let` / `const`: Creates a block-scoped variable confined to `showMessage()`.
 *   It is hoisted to the Temporal Dead Zone (TDZ) of that block and initialized at the declaration.
 * - `var`: Creates a function-scoped variable hoisted to the top of `showMessage()`,
 *   initialized with `undefined`.
 * Neither `let`, `const`, nor `var` will leak into the global object or pollute external code.
 * 
 * ============================================================================
 * TASK 3: DEBUGGER OBSERVATIONS & CALL STACK (VS CODE / CHROME DEVTOOLS)
 * ============================================================================
 * Breakpoint Placement:
 *   Place a breakpoint or `debugger;` on line 87 (inside `showMessageFixed`).
 * 
 * Watch Variables to Configure in Debugger Panel:
 *   1. `greeting`       -> Initially `<not available>` / TDZ, then `"Welcome"`.
 *   2. `typeof greeting`-> `"undefined"` before declaration, `"string"` after.
 *   3. `this`           -> In strict mode within a standalone function, `this` is `undefined`
 *                          (instead of window / global object).
 * 
 * Call Stack Inspection:
 *   When paused at the breakpoint inside `showMessageFixed()`:
 *     ┌────────────────────────────────────────────────────────┐
 *     │ CALL STACK (most recent call on top)                  │
 *     ├────────────────────────────────────────────────────────┤
 *     │ showMessageFixed()        q4_debugging_mystery.js:87   │
 *     │ (anonymous / Module)      q4_debugging_mystery.js:105  │
 *     └────────────────────────────────────────────────────────┘
 *   Notice the call stack clearly depicts the transition from the global/module
 *   execution context into the local `showMessageFixed` execution context.
 */

console.log("================================================================================");
console.log("                       Q4: DEBUGGING MYSTERY                                    ");
console.log("================================================================================");

// Demonstration 1: Reproducing the Strict Mode ReferenceError safely
console.log("\n[1] DEMONSTRATING ORIGINAL CODE UNDER 'use strict':");
console.log("-".repeat(80));

function reproduceOriginalError() {
    try {
        // Intentionally eval-like execution to demonstrate without crashing process
        // greeting = "Welcome"; // In strict mode, directly writing this causes ReferenceError
        const testFunc = new Function('"use strict"; greeting = "Welcome"; return greeting;');
        testFunc();
    } catch (err) {
        console.log("Caught Expected Strict Mode Error:");
        console.log(`  • Error Type : ${err.name}`);
        console.log(`  • Message    : ${err.message}`);
        console.log(`  • Cause      : Undeclared variable assignment 'greeting' is forbidden in strict mode.`);
    }
}
reproduceOriginalError();

// Demonstration 2: Fixed Version with 'let' (Block Scoped)
console.log("\n[2] FIXED IMPLEMENTATION (LOCAL SCOPE WITH 'let'):");
console.log("-".repeat(80));

function showMessageFixed() {
    // Declaring with 'let' restricts 'greeting' to this function's scope
    let greeting = "Welcome";
    
    // Uncomment 'debugger;' when debugging in VS Code / Chrome DevTools
    // debugger;

    console.log(`Inside showMessageFixed(): ${greeting}`);
    return greeting;
}

const resultFixed = showMessageFixed();
console.log(`Function output: "${resultFixed}"`);

// Verify that greeting did NOT leak to global scope
const isGreetingGlobal = typeof globalThis.greeting !== "undefined";
console.log(`Verification - Is 'greeting' present on global scope? ${isGreetingGlobal ? "YES (Leak!)" : "NO (Clean encapsulation)"}`);

// Demonstration 3: Fixed Version with 'const' (Immutable Reference)
console.log("\n[3] BEST PRACTICE IMPLEMENTATION (WITH 'const'):");
console.log("-".repeat(80));

function showMessageConst() {
    // If greeting is not intended to be reassigned, 'const' enforces immutability
    const greeting = "Welcome";
    console.log(`Inside showMessageConst(): ${greeting}`);
    return greeting;
}
showMessageConst();

console.log("\n" + "=".repeat(80));
console.log("SUMMARY OF SCOPE DECLARATION RULES");
console.log("=".repeat(80));
console.log("1. Undeclared (sloppy) : Leaks to global object (window/global), anti-pattern.");
console.log("2. Undeclared (strict) : ReferenceError thrown immediately, fails fast.");
console.log("3. var                 : Function-scoped, hoisted as undefined, does not create TDZ.");
console.log("4. let / const         : Block-scoped, hoisted in TDZ, strict access before init.");
console.log("=".repeat(80));
