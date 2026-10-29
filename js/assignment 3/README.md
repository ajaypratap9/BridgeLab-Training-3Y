# JavaScript Assignment 3: Strict Mode, Hoisting, Scope, Error Handling & Debugging

This directory contains standalone, self-contained JavaScript solutions for Assignment 3. Each file is written under `"use strict"`, relies solely on native JavaScript (no external libraries), outputs formatted results via `console.log()`, and contains deep explanatory comments on logic, hoisting mechanics, execution contexts, and debug observations.

---

## File Directory & Quick Reference

| Question | File Name | Symlink | Key Concepts Demonstrated |
| :--- | :--- | :--- | :--- |
| **Q1** | [`q1_data_parser.js`](file:///home/ajay/Music/Private/5th%20Sem/BridgeLabz%20Training/js/assignment%203/q1_data_parser.js) | `q1.js` | Type conversion (`Number()`, `Boolean()`, `String()`), JS coercion quirks (`" "`, `null`, `NaN`), `Number.isNaN()`. |
| **Q2** | [`q2_employee_bonus.js`](file:///home/ajay/Music/Private/5th%20Sem/BridgeLabz%20Training/js/assignment%203/q2_employee_bonus.js) | `q2.js` | Object iteration, `try...catch` validation, strict mode global leak prevention, template literals. |
| **Q3** | [`q3_transaction_validator.js`](file:///home/ajay/Music/Private/5th%20Sem/BridgeLabz%20Training/js/assignment%203/q3_transaction_validator.js) | `q3.js` | Custom Error class inheritance, categorizing valid/invalid records, debugger watch variables. |
| **Q4** | [`q4_debugging_mystery.js`](file:///home/ajay/Music/Private/5th%20Sem/BridgeLabz%20Training/js/assignment%203/q4_debugging_mystery.js) | `q4.js` | Strict mode vs sloppy mode variable assignment, `ReferenceError`, lexical block scoping (`let`/`const`). |
| **Q5** | [`q5_hoisting_sequence_trap.js`](file:///home/ajay/Music/Private/5th%20Sem/BridgeLabz%20Training/js/assignment%203/q5_hoisting_sequence_trap.js) | `q5.js` | Memory creation phase vs execution phase, `var` vs `let` (TDZ), arrow function hoisting semantics. |
| **Q6** | [`q6_pyramid_pattern.js`](file:///home/ajay/Music/Private/5th%20Sem/BridgeLabz%20Training/js/assignment%203/q6_pyramid_pattern.js) | `q6.js` | Nested loops, `var` leakage vs `let` block scoping, variable reuse trap, CLI parameter limit (`process.argv`). |
| **Q7** | [`q7_smart_calculator.js`](file:///home/ajay/Music/Private/5th%20Sem/BridgeLabz%20Training/js/assignment%203/q7_smart_calculator.js) | `q7.js` | Switch-case routing, mathematical domain errors (`DivisionByZeroError`, `NegativeRootError`), `InvalidOperationError`. |
| **Q8** | [`q8_strict_mode_showdown.js`](file:///home/ajay/Music/Private/5th%20Sem/BridgeLabz%20Training/js/assignment%203/q8_strict_mode_showdown.js) | `q8.js` | Strict mode prohibitions: duplicate parameter names, implicit globals, deleting plain identifiers. |
| **Q9** | [`q9_json_audit.js`](file:///home/ajay/Music/Private/5th%20Sem/BridgeLabz%20Training/js/assignment%203/q9_json_audit.js) | `q9.js` | `JSON.parse` with `try...catch`, schema key validation, line number logging, filtering under-18 users. |
| **Q10** | [`q10_nested_hoisting_closures.js`](file:///home/ajay/Music/Private/5th%20Sem/BridgeLabz%20Training/js/assignment%203/q10_nested_hoisting_closures.js) | `q10.js` | Nested execution contexts, variable shadowing, arrow function closure vs local variable environment. |

---

## How to Run the Files

You can run each file directly using Node.js either by its full name or by its short alias:

```bash
# Run individual questions
node q1.js
node q2.js
node q3.js
node q4.js
node q5.js
node q6.js 4      # Accepts optional row count argument (defaults to 5)
node q7.js
node q8.js
node q9.js
node q10.js

# Or run all 10 in sequence
for i in {1..10}; do echo "=== Running Q$i ==="; node "q${i}.js"; echo ""; done
```

---

## Interactive Debugging with VS Code / Chrome DevTools

To inspect breakpoints (`debugger;`) and examine the **Call Stack** and **Watch Variables**:

1. Run with Node inspector:
   ```bash
   node --inspect-brk q3.js
   ```
2. Open Google Chrome and navigate to `chrome://inspect`.
3. Click **Inspect** to open DevTools connected to your running script.
4. Add watch variables:
   - In Q3: `tx`, `i`, `err.name`, `validTransactions.length`, `invalidTransactions.length`
   - In Q4: `greeting`, `this`
   - In Q10: `count`, `outerCount`, `innerCount`
