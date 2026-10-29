/**
 * Question 9: ES6 Classes (extends and super) vs Prototypal Inheritance
 *
 * Task:
 * Rewrite your Person -> Student inheritance example using ES6 classes with extends and super().
 * Show that both class and prototype versions behave the same.
 */

console.log("==========================================================================");
console.log(" Demonstration: Question 9 - ES6 Class Inheritance vs Prototype Version   ");
console.log("==========================================================================\n");

// =========================================================================
// APPROACH 1: Constructor Functions & Prototype Chain (From Question 5)
// =========================================================================
function PersonProto(name) {
  this.name = name;
}

PersonProto.prototype.printName = function () {
  return `[PersonProto] Name: ${this.name}`;
};

function StudentProto(name, branch) {
  PersonProto.call(this, name); // Constructor stealing (super equivalent)
  this.branch = branch;
}

// Prototype linkage
StudentProto.prototype = Object.create(PersonProto.prototype);
StudentProto.prototype.constructor = StudentProto;

StudentProto.prototype.printBranch = function () {
  return `[StudentProto] Branch: ${this.branch}`;
};

StudentProto.prototype.printAllDetails = function () {
  return `[StudentProto Details] Name: ${this.name}, Branch: ${this.branch}`;
};

// =========================================================================
// APPROACH 2: Modern ES6 Classes with 'extends' and 'super()'
// =========================================================================
class PersonClass {
  constructor(name) {
    this.name = name;
  }

  printName() {
    return `[PersonClass] Name: ${this.name}`;
  }
}

class StudentClass extends PersonClass {
  constructor(name, branch) {
    super(name); // Calls PersonClass constructor
    this.branch = branch;
  }

  printBranch() {
    return `[StudentClass] Branch: ${this.branch}`;
  }

  printAllDetails() {
    return `[StudentClass Details] Name: ${this.name}, Branch: ${this.branch}`;
  }
}

// =========================================================================
// Comparing Behavior of Both Implementations
// =========================================================================

const studentP = new StudentProto("Rohan Gupta", "Information Technology");
const studentC = new StudentClass("Rohan Gupta", "Information Technology");

console.log(">>> 1. Comparing Object Structure & Instance Properties:");
console.log("studentP (Prototype version):", studentP);
console.log("studentC (Class version):    ", studentC);
console.log("Are properties identical?   :",
  studentP.name === studentC.name && studentP.branch === studentC.branch
);

console.log("\n>>> 2. Comparing Method Execution Results:");
console.log("printName() output:");
console.log("   - Prototype version:", studentP.printName());
console.log("   - Class version:    ", studentC.printName());

console.log("\nprintBranch() output:");
console.log("   - Prototype version:", studentP.printBranch());
console.log("   - Class version:    ", studentC.printBranch());

console.log("\nprintAllDetails() output:");
console.log("   - Prototype version:", studentP.printAllDetails());
console.log("   - Class version:    ", studentC.printAllDetails());

console.log("\n>>> 3. Comparing Type & Instanceof Checks:");
console.log("typeof StudentProto === 'function':", typeof StudentProto === "function");
console.log("typeof StudentClass === 'function':", typeof StudentClass === "function"); // Classes are functions!

console.log("\nInstanceof checks for studentP (Prototype):");
console.log("   studentP instanceof StudentProto :", studentP instanceof StudentProto); // true
console.log("   studentP instanceof PersonProto  :", studentP instanceof PersonProto);  // true
console.log("   studentP instanceof Object       :", studentP instanceof Object);       // true

console.log("\nInstanceof checks for studentC (Class):");
console.log("   studentC instanceof StudentClass :", studentC instanceof StudentClass); // true
console.log("   studentC instanceof PersonClass  :", studentC instanceof PersonClass);  // true
console.log("   studentC instanceof Object       :", studentC instanceof Object);       // true

console.log("\n>>> 4. Comparing Prototype Chain Structure:");
console.log("Prototype chain of studentP (Prototype version):");
console.log("   Object.getPrototypeOf(studentP) === StudentProto.prototype         :", Object.getPrototypeOf(studentP) === StudentProto.prototype);
console.log("   Object.getPrototypeOf(StudentProto.prototype) === PersonProto.proto:", Object.getPrototypeOf(StudentProto.prototype) === PersonProto.prototype);

console.log("Prototype chain of studentC (Class version):");
console.log("   Object.getPrototypeOf(studentC) === StudentClass.prototype         :", Object.getPrototypeOf(studentC) === StudentClass.prototype);
console.log("   Object.getPrototypeOf(StudentClass.prototype) === PersonClass.proto:", Object.getPrototypeOf(StudentClass.prototype) === PersonClass.prototype);

console.log("\n>>> 5. Checking Method Location (Own vs Prototype Property):");
console.log("Does studentC own 'printBranch'?", studentC.hasOwnProperty("printBranch")); // false
console.log("Does StudentClass.prototype own 'printBranch'?", StudentClass.prototype.hasOwnProperty("printBranch")); // true

// -------------------------------------------------------------
// Key Takeaways & Explanation
// -------------------------------------------------------------
console.log("\n==================== CONCLUSION & KEY TAKEAWAY ====================");
console.log(
  "1. Syntactic Sugar: ES6 `class`, `extends`, and `super` do not introduce a new\n" +
  "   object-oriented inheritance model to JavaScript. They provide a cleaner, more\n" +
  "   intuitive syntax over the existing prototypal inheritance mechanism.\n" +
  "2. Under the Hood:\n" +
  "   - `class StudentClass` is compiled into a constructor function.\n" +
  "   - Methods inside the class body are automatically placed on `StudentClass.prototype`.\n" +
  "   - `extends` establishes the prototype link: Object.setPrototypeOf(StudentClass.prototype, PersonClass.prototype).\n" +
  "   - `super(...)` invokes the parent constructor (equivalent to PersonProto.call(this, ...)).\n" +
  "3. As demonstrated above, both approaches produce identical memory layouts,\n" +
  "   identical prototype chains, and identical runtime behavior."
);
console.log("===================================================================\n");
