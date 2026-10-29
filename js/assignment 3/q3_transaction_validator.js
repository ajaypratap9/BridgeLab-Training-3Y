"use strict";

/**
 * ============================================================================
 * Assignment 3 - Q3: Transaction Validator
 * ============================================================================
 * 
 * OBJECTIVE:
 * Validate an array of financial transactions, throw specific custom errors
 * for various anomalies (null entries, missing id/amount, negative amounts),
 * categorize transactions into valid/invalid groups, and demonstrate debugger usage.
 * 
 * HOISTING & SCOPE INSIGHTS:
 * 1. Custom Error Classes: Classes in ES6 (`class NullTransactionError extends Error`)
 *    are NOT hoisted in the way function declarations are! They reside in the TDZ
 *    until evaluated. Declaring them at the top is mandatory.
 * 2. `try...catch` block scoping: The error object `catch (error)` is strictly
 *    block-scoped to the catch block and cannot be accessed outside.
 * 3. The `debugger;` statement acts as a programmatic breakpoint. When Node.js is run
 *    with `node --inspect-brk q3_transaction_validator.js`, execution will pause here.
 * 
 * DEBUGGER WATCH VARIABLES TO MONITOR IN VS CODE / DEVTOOLS:
 * - `tx` : Current transaction object being inspected.
 * - `i`  : Current loop iteration index.
 * - `err.name` : Exact error subtype caught.
 * - `validTransactions.length` : Count of verified valid transactions.
 * - `invalidTransactions.length`: Count of failed transactions.
 * - CALL STACK:
 *   [3] validateTransaction (q3_transaction_validator.js:L90)
 *   [2] (for loop iteration in main script)
 *   [1] (anonymous / Module wrapper function)
 */

// Custom Error Classes
class TransactionError extends Error {
    constructor(message) {
        super(message);
        this.name = "TransactionError";
    }
}

class NullTransactionError extends TransactionError {
    constructor(index) {
        super(`Transaction at index ${index} is null or undefined`);
        this.name = "NullTransactionError";
        this.index = index;
    }
}

class MissingFieldError extends TransactionError {
    constructor(missingField, transaction, index) {
        super(`Transaction at index ${index} is missing required field: '${missingField}'`);
        this.name = "MissingFieldError";
        this.missingField = missingField;
        this.transaction = transaction;
        this.index = index;
    }
}

class NegativeAmountError extends TransactionError {
    constructor(amount, transaction, index) {
        super(`Transaction at index ${index} (ID: ${transaction?.id}) has invalid negative amount: ${amount}`);
        this.name = "NegativeAmountError";
        this.amount = amount;
        this.transaction = transaction;
        this.index = index;
    }
}

// Input transactions dataset
const transactions = [
    { id: 1, amount: 2000 },
    { id: 2, amount: -500 },
    { id: 3 },
    null
];

/**
 * Validates a single transaction against business rules.
 * Throws specific custom errors if validation fails.
 * 
 * @param {Object} tx - The transaction object
 * @param {number} index - Index in the transactions list
 * @returns {Object} Validated transaction
 */
function validateTransaction(tx, index) {
    // Breakpoint: Step here to observe incoming transaction object
    // debugger; // Uncomment when debugging in IDE or Chrome DevTools

    // Rule 1: Reject Null / Undefined entries
    if (tx === null || tx === undefined) {
        throw new NullTransactionError(index);
    }

    // Rule 2: Check for missing ID
    if (tx.id === undefined || tx.id === null) {
        throw new MissingFieldError("id", tx, index);
    }

    // Rule 3: Check for missing Amount
    if (tx.amount === undefined || tx.amount === null) {
        throw new MissingFieldError("amount", tx, index);
    }

    // Rule 4: Check for non-numeric Amount
    if (typeof tx.amount !== "number" || Number.isNaN(tx.amount)) {
        throw new TransactionError(`Transaction at index ${index} has non-numeric amount: ${tx.amount}`);
    }

    // Rule 5: Reject Negative Amount
    if (tx.amount < 0) {
        throw new NegativeAmountError(tx.amount, tx, index);
    }

    return tx;
}

// Storage buckets
const validTransactions = [];
const invalidTransactions = [];
const errorTypeCounts = {
    NullTransactionError: 0,
    MissingFieldError: 0,
    NegativeAmountError: 0,
    TransactionError: 0
};

console.log("================================================================================");
console.log("                       Q3: TRANSACTION VALIDATOR                                ");
console.log("================================================================================");
console.log("\n[1] VALIDATING TRANSACTIONS IN LOOP:\n");

for (let i = 0; i < transactions.length; i++) {
    const rawTx = transactions[i];

    // Programmatic breakpoint for debugger attachment
    /*
     * DEBUG INSTRUCTIONS:
     * To trigger: Run `node --inspect-brk q3_transaction_validator.js`
     * Open `chrome://inspect` in Chrome or press F5 in VS Code.
     * Add watch variable: `rawTx`, `validTransactions.length`, `invalidTransactions.length`
     */
    // debugger;

    try {
        const validated = validateTransaction(rawTx, i);
        validTransactions.push({
            index: i,
            transaction: validated
        });
        console.log(`✓ [Index ${i}] VALID   : ID ${validated.id} | Amount: ₹${validated.amount}`);
    } catch (err) {
        // Categorize by error type
        const errorCategory = err.name in errorTypeCounts ? err.name : "TransactionError";
        errorTypeCounts[errorCategory] = (errorTypeCounts[errorCategory] || 0) + 1;

        invalidTransactions.push({
            index: i,
            raw: rawTx,
            errorType: err.name,
            message: err.message
        });

        console.log(`✗ [Index ${i}] INVALID : [${err.name}] ${err.message}`);
    }
}

// Print detailed reports
console.log("\n" + "-".repeat(80));
console.log("[2] VALID TRANSACTIONS SUMMARY:");
console.log("-".repeat(80));
validTransactions.forEach(item => {
    console.log(`  • Index: ${item.index} | ID: ${item.transaction.id} | Amount: ₹${item.transaction.amount}`);
});

console.log("\n" + "-".repeat(80));
console.log("[3] INVALID TRANSACTIONS BY CATEGORY:");
console.log("-".repeat(80));
invalidTransactions.forEach(item => {
    console.log(`  • Index ${item.index}: [${item.errorType}] => ${item.message}`);
});

console.log("\n" + "-".repeat(80));
console.log("[4] ERROR DISTRIBUTION BREAKDOWN:");
console.log("-".repeat(80));
Object.entries(errorTypeCounts).forEach(([type, count]) => {
    console.log(`  • ${type.padEnd(25)} : ${count}`);
});

console.log("\n" + "=".repeat(80));
console.log("FINAL AUDIT COUNTS");
console.log("=".repeat(80));
console.log(`Total Transactions Checked : ${transactions.length}`);
console.log(`Successful (Valid)         : ${validTransactions.length}`);
console.log(`Failed (Invalid)           : ${invalidTransactions.length}`);
console.log("=".repeat(80));
