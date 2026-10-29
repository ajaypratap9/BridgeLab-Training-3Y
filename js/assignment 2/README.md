# JavaScript Core Assignments &mdash; Assignment 2

This repository contains clean, modular, and well-commented solutions for the 10 JavaScript programming problems of **Assignment 2**. Each question is implemented in its own isolated `.js` file, strictly using vanilla JavaScript without any external libraries or frameworks.

---

## File Directory & Concept Summary

| File | Question Title | Key Concepts & Methods Used |
| :--- | :--- | :--- |
| [q1.js](file:///home/ajay/Music/Private/5th%20Sem/BridgeLabz%20Training/js/assignment%202/q1.js) | Scope Conflict Resolver | Global vs. local lexical scope, `bonus`, `salary`, `isPermanent`, scope pollution prevention |
| [q2.js](file:///home/ajay/Music/Private/5th%20Sem/BridgeLabz%20Training/js/assignment%202/q2.js) | String Manipulation Report | `trim()`, `split()`, `map()`, `join()`, `replace()`, and `.length` |
| [q3.js](file:///home/ajay/Music/Private/5th%20Sem/BridgeLabz%20Training/js/assignment%202/q3.js) | Math Utility Dashboard | `Math.round()`, `Math.sqrt()`, `Math.pow()`, random range generation `Math.floor(Math.random() * 41) + 10`, template literals |
| [q4.js](file:///home/ajay/Music/Private/5th%20Sem/BridgeLabz%20Training/js/assignment%202/q4.js) | Array Performance Analyzer | `Math.max(...arr)`, `Math.min(...arr)`, `map()`, `filter()`, `reduce()`, score statistical breakdown |
| [q5.js](file:///home/ajay/Music/Private/5th%20Sem/BridgeLabz%20Training/js/assignment%202/q5.js) | Boolean Logic Access System | Logical operators (`&&`, `||`, `!`), smart home access control, multi-scenario evaluation |
| [q6.js](file:///home/ajay/Music/Private/5th%20Sem/BridgeLabz%20Training/js/assignment%202/q6.js) | Event-Based Counter Simulation | Simulated event handlers, `increment()`, `decrement()`, nested function execution contexts, closures |
| [q7.js](file:///home/ajay/Music/Private/5th%20Sem/BridgeLabz%20Training/js/assignment%202/q7.js) | Customer Feedback Processor | String tokenization `split()`, keyword search `includes()`, word counting, sentiment conditionals |
| [q8.js](file:///home/ajay/Music/Private/5th%20Sem/BridgeLabz%20Training/js/assignment%202/q8.js) | Dynamic Discount Evaluator | Object arrays, category discounts (electronics: 10%, fashion: 5%), `reduce()`, cart threshold discounts (> ₹50,000) |
| [q9.js](file:///home/ajay/Music/Private/5th%20Sem/BridgeLabz%20Training/js/assignment%202/q9.js) | Odd–Even Number Analyzer | Range array population (1–30), modulus operator `%`, `push()`, FizzBuzz and parity classification |
| [q10.js](file:///home/ajay/Music/Private/5th%20Sem/BridgeLabz%20Training/js/assignment%202/q10.js) | Departmental Employee Evaluator | Multi-dimensional / nested arrays, nested `if-else` hierarchy, comparison operators (`>=`, `<=`) |

---

## Detailed Question Breakdowns

### Q1. Scope Conflict Resolver (`q1.js`)
- Declares a global variable `bonus = 5000`.
- Inside `calculateSalary()`, defines a local `salary = 40000` and evaluates a local `isPermanent` boolean flag.
- Adds the global bonus only if `isPermanent` is `true`.
- Demonstrates scope isolation by showing that attempting to access `salary` or `isPermanent` outside the function causes a `ReferenceError`, and that toggling `isPermanent` does not alter global state.

### Q2. String Manipulation Report (`q2.js`)
- Starts with `" wireless headphones PRO "`.
- Applies `trim()` to remove leading/trailing spaces, `toLowerCase()` to standardize case.
- Uses `split(" ")` and `map()` to capitalize the first letter of each word, and `join(" ")` to reconstruct the string.
- Replaces `"pro"` / `"Pro"` with `"Pro Edition"` using `replace()`.
- Reports the cleaned string along with its character count via `.length`.

### Q3. Math Utility Dashboard (`q3.js`)
- Computes calculations on `x = 16.75`:
  - `Math.round(x)` &rarr; `17`
  - `Math.sqrt(x)` &rarr; `4.0927`
  - `Math.pow(x, 3)` &rarr; `4699.42`
  - `Math.floor(Math.random() * 41) + 10` &rarr; bounded random integer between 10 and 50 inclusive.
- Formats all metrics into a scientific dashboard layout using multi-line template literals.

### Q4. Array Performance Analyzer (`q4.js`)
- Generates 8 random student exam scores between 30 and 100.
- Extracts highest and lowest scores using `Math.max(...arr)` and `Math.min(...arr)`.
- Calculates average score using `reduce()`.
- Filters passing students (&ge; 50) using `filter()`.
- Maps scores to academic letter grades (A+, A, B, C, D, F) using `map()`.

### Q5. Boolean Logic Access System (`q5.js`)
- Evaluates smart home status from `isDoorLocked`, `isWindowClosed`, `isAlarmOn`, and `isOwnerInside`.
- Access / security requires: `isAlarmOn && isDoorLocked && isWindowClosed && isOwnerInside`.
- Uses `&&`, `||`, and `!` to diagnose specific breaches and test 6 security scenarios.

### Q6. Event-Based Counter Simulation (`q6.js`)
- Maintains `count = 0` and defines `increment()` and `decrement()` functions.
- Implements nested helper functions inside each event handler to demonstrate lexical scoping and function execution contexts.
- Simulates user click streams and verifies internal state updates.

### Q7. Customer Feedback Processor (`q7.js`)
- Evaluates customer comments (e.g. `"Great product! Fast delivery and amazing sound quality!"`).
- Uses `trim().split(/\s+/)` to accurately count words.
- Uses `includes("bad")` and `includes("poor")` on lowercased text to flag negative sentiments.
- Returns `"Positive Feedback"` or `"Needs Improvement"`.

### Q8. Dynamic Discount Evaluator (`q8.js`)
- Processes a shopping cart array of objects:
  - Electronics &rarr; 10% discount
  - Fashion &rarr; 5% discount
  - Education &rarr; 0% discount
- Checks if overall cart value exceeds ₹50,000 to apply an extra 5% overall discount.
- Employs `for` loops, conditionals, and `reduce()` for subtotal and final balance computation.

### Q9. Odd–Even Number Analyzer (`q9.js`)
- Fills an array with numbers 1 to 30 using a loop and `push()`.
- Tests each number using `%`:
  - Divisible by 3 and 5 (`num % 3 === 0 && num % 5 === 0`) &rarr; `"FizzBuzz"`
  - Divisible by 2 (`num % 2 === 0`) &rarr; `"Even"`
  - Otherwise &rarr; `"Odd"`
- Collects results into an array and logs a structured frequency summary.

### Q10. Departmental Employee Evaluator (`q10.js`)
- Iterates through nested department records `[["HR", 72], ["Finance", 88], ["Tech", 95], ["Support", 63]]`.
- Implements an explicit nested `if-else` decision tree:
  - Score &ge; 90 &rarr; `"Excellent"`
  - 75 &le; Score &le; 89 &rarr; `"Good"`
  - 60 &le; Score &le; 74 &rarr; `"Average"`
  - Below 60 &rarr; `"Needs Improvement"`

---

## How to Run the Programs

### 1. Running with Node.js

Run any question file individually:
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

Or execute all 10 questions in sequence:
```bash
for file in q{1..10}.js; do node "$file"; done
```

### 2. Running in the Browser

Open [`index.html`](file:///home/ajay/Music/Private/5th%20Sem/BridgeLabz%20Training/js/assignment%202/index.html) in any web browser. You can:
1. Click the button on any card to execute that specific question's script.
2. Click **"Run All Questions (Q1 - Q10)"** to run everything at once.
3. Open DevTools (`F12` &rarr; **Console**) to inspect logs, objects, and styled output.
