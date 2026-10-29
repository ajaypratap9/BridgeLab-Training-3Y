/**
 * Question 6: Multi-Level Prototype Chain (Person -> Faculty -> Professor)
 *
 * Task:
 * Create a prototype chain using constructor functions:
 *   Person -> Faculty -> Professor
 * Each should have its own property and method.
 * Show how a Professor object can access all methods up the chain.
 */

console.log("==========================================================================");
console.log(" Demonstration: Question 6 - Multi-Level Prototype Chain (Person->Faculty->Prof)");
console.log("==========================================================================\n");

// ==========================================
// Level 1: Person (Base Constructor)
// ==========================================
function Person(name) {
  this.name = name;
}

Person.prototype.introducePerson = function () {
  return `[Person Level] My name is ${this.name}.`;
};

// ==========================================
// Level 2: Faculty (Inherits from Person)
// ==========================================
function Faculty(name, department) {
  // Call super-constructor (Person)
  Person.call(this, name);
  this.department = department;
}

// Inherit prototype from Person
Faculty.prototype = Object.create(Person.prototype);
Faculty.prototype.constructor = Faculty;

Faculty.prototype.introduceFaculty = function () {
  return `[Faculty Level] I belong to the Department of ${this.department}.`;
};

// ==========================================
// Level 3: Professor (Inherits from Faculty)
// ==========================================
function Professor(name, department, researchArea) {
  // Call super-constructor (Faculty)
  Faculty.call(this, name, department);
  this.researchArea = researchArea;
}

// Inherit prototype from Faculty
Professor.prototype = Object.create(Faculty.prototype);
Professor.prototype.constructor = Professor;

Professor.prototype.introduceProfessor = function () {
  return `[Professor Level] My research area is ${this.researchArea}.`;
};

// Summary method utilizing properties from all 3 levels
Professor.prototype.getFullAcademicProfile = function () {
  return (
    `Full Academic Profile:\n` +
    `  - Name: ${this.name}\n` +
    `  - Department: ${this.department}\n` +
    `  - Research Area: ${this.researchArea}`
  );
};

// ==========================================
// Demonstration
// ==========================================

const prof = new Professor(
  "Dr. Alan Turing",
  "Computer Science & Mathematics",
  "Theoretical Computer Science and AI"
);

console.log(">>> Created Professor Instance:");
console.log(prof);

console.log("\n>>> Demonstrating Method Access Across the Entire Prototype Chain:");
// 1. Method from Professor.prototype (Direct prototype)
console.log("1. Calling prof.introduceProfessor():");
console.log("   -->", prof.introduceProfessor());

// 2. Method from Faculty.prototype (1 level up)
console.log("\n2. Calling prof.introduceFaculty():");
console.log("   -->", prof.introduceFaculty());

// 3. Method from Person.prototype (2 levels up)
console.log("\n3. Calling prof.introducePerson():");
console.log("   -->", prof.introducePerson());

// 4. Method from Object.prototype (Top of chain)
console.log("\n4. Calling prof.toString() (from Object.prototype):");
console.log("   -->", prof.toString());

// 5. Full summary method
console.log("\n5. Calling prof.getFullAcademicProfile():");
console.log(prof.getFullAcademicProfile());

// ==========================================
// Verifying the Chain
// ==========================================
console.log("\n>>> Verifying 'instanceof' up the chain:");
console.log("prof instanceof Professor :", prof instanceof Professor); // true
console.log("prof instanceof Faculty   :", prof instanceof Faculty);   // true
console.log("prof instanceof Person    :", prof instanceof Person);    // true
console.log("prof instanceof Object    :", prof instanceof Object);    // true

console.log("\n>>> Visualizing the Prototype Chain traversal:");
let currentProto = Object.getPrototypeOf(prof);
let level = 1;
const levelNames = [
  "Professor.prototype",
  "Faculty.prototype",
  "Person.prototype",
  "Object.prototype",
  "null (Chain End)"
];

while (currentProto !== null) {
  console.log(`Level ${level}: ${levelNames[level - 1]}`);
  currentProto = Object.getPrototypeOf(currentProto);
  level++;
}
console.log(`Level ${level}: ${levelNames[level - 1]}`);
