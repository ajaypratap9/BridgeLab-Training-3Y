# JavaScript Core Fundamentals Assignment

This repository contains solutions for the 10 JavaScript core programming questions. Each question is implemented in its own separate `.js` file, strictly using core JavaScript features without any third-party libraries or frameworks.

---

## File Directory & Summary

| File | Question Title | Key Concepts & Functions Used |
| :--- | :--- | :--- |
| [q1.js](file:///home/ajay/Music/Private/5th%20Sem/BridgeLabz%20Training/js/q1.js) | Personalized Login Greeting | `Date.prototype.getHours()`, template literals, conditionals (`< 12`, `12-17`, `else`) |
| [q2.js](file:///home/ajay/Music/Private/5th%20Sem/BridgeLabz%20Training/js/q2.js) | Multi-Type Data Summary | `typeof`, `Array.isArray()`, handling `null` & `undefined`, `console.table()` |
| [q3.js](file:///home/ajay/Music/Private/5th%20Sem/BridgeLabz%20Training/js/q3.js) | Monthly Expense Tracker | Arrays, arithmetic operators, assignment operator (`+=`), `toFixed(2)` |
| [q4.js](file:///home/ajay/Music/Private/5th%20Sem/BridgeLabz%20Training/js/q4.js) | Academic Performance Evaluator | Arrays, loops, threshold validation (`< 35`), logical operators (`&&`, `||`) |
| [q5.js](file:///home/ajay/Music/Private/5th%20Sem/BridgeLabz%20Training/js/q5.js) | Weather Activity Planner | Combining logical `&&` and `||` smartly, multi-branch conditional checks |
| [q6.js](file:///home/ajay/Music/Private/5th%20Sem/BridgeLabz%20Training/js/q6.js) | Progressive Discount System | Progressive tier calculation (25%, 15%, 5%, 0%), `Math.round()` |
| [q7.js](file:///home/ajay/Music/Private/5th%20Sem/BridgeLabz%20Training/js/q7.js) | Smart Guessing Game | `Math.random()`, `Math.floor()`, nested `if` statements, proximity range check (`±3`) |
| [q8.js](file:///home/ajay/Music/Private/5th%20Sem/BridgeLabz%20Training/js/q8.js) | Employee Salary Projection | `for` loop (5-year projection), assignment operator (`+=`), `Math.round()`, `console.table()` |
| [q9.js](file:///home/ajay/Music/Private/5th%20Sem/BridgeLabz%20Training/js/q9.js) | Random Math Quiz Generator | `Math.random()`, arithmetic evaluation via `switch`, division with `toFixed(2)` |
| [q10.js](file:///home/ajay/Music/Private/5th%20Sem/BridgeLabz%20Training/js/q10.js) | Citizen Eligibility Validator | Nested `if-else`, logical operators (`&&`, `>=`), voting & passport evaluation |

---

## How to Run the Programs

### Option 1: Running with Node.js
You can run any question individually from the terminal:
```bash
node q1.js
node q2.js
node q3.js
node q4.js
node q5.js
node q6.js
node q7.js
node q8.js
node q9.js
node q10.js
```

Or run all questions together sequentially:
```bash
for file in q{1..10}.js; do node "$file"; done
```

### Option 2: Running in Browser Console
Open [`index.html`](file:///home/ajay/Music/Private/5th%20Sem/BridgeLabz%20Training/js/index.html) in any browser (Chrome, Firefox, Safari, Edge) and open DevTools Console (`F12` or `Ctrl+Shift+I`) to view outputs and interactive tables.
