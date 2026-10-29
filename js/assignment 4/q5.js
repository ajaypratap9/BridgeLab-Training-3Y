/**
 * Question 5: Prototypal Inheritance (Person -> Student)
 *
 * Task:
 * Create a Person constructor with property name.
 * Then create a Student constructor that inherits from Person and adds property branch.
 * Add methods to print both name and branch using prototypes.
 * Demonstrate the prototype chain working.
 */

console.log("================================================================");
console.log(" Demonstration: Question 5 - Prototypal Inheritance (Person -> Student) ");
console.log("================================================================\n");

// 1. Parent Constructor: Person
function Person(name) {
  this.name = name;
}

// Parent Prototype Method: printName
Person.prototype.printName = function () {
  console.log(`[Person.prototype.printName] Name: ${this.name}`);
};

// 2. Child Constructor: Student
function Student(name, branch) {
  // Call super-constructor to initialize parent properties on 'this' (Constructor Stealing)
  Person.call(this, name);
  this.branch = branch;
}

// 3. Inherit from Person prototype using Object.create
// This links Student.prototype's __proto__ to Person.prototype
Student.prototype = Object.create(Person.prototype);

// 4. Restore Student constructor reference (Object.create overwrote it)
Student.prototype.constructor = Student;

// 5. Child Prototype Method: printBranch
Student.prototype.printBranch = function () {
  console.log(`[Student.prototype.printBranch] Branch: ${this.branch}`);
};

// Child Prototype Method that accesses both inherited and own properties
Student.prototype.printAllDetails = function () {
  console.log(`[Student.prototype.printAllDetails] Name: ${this.name}, Branch: ${this.branch}`);
};

// -------------------------------------------------------------
// Demonstration
// -------------------------------------------------------------

console.log(">>> Creating an instance of Student:");
const student1 = new Student("Aarav Sharma", "Computer Science and Engineering");
console.log("student1 object:", student1);

console.log("\n>>> Calling methods across the prototype chain:");
// Calling method defined on Child's prototype (Student.prototype)
student1.printBranch();

// Calling method inherited from Parent's prototype (Person.prototype)
student1.printName();

// Calling method that uses both properties
student1.printAllDetails();

// -------------------------------------------------------------
// Prototype Chain Verification
// -------------------------------------------------------------
console.log("\n>>> Proving the Prototype Chain:");
console.log("1. student1 instanceof Student  :", student1 instanceof Student);  // true
console.log("2. student1 instanceof Person   :", student1 instanceof Person);   // true
console.log("3. student1 instanceof Object   :", student1 instanceof Object);   // true

console.log("\n>>> Inspecting Prototype Links directly:");
const studentProto = Object.getPrototypeOf(student1);
const personProto = Object.getPrototypeOf(studentProto);
const objectProto = Object.getPrototypeOf(personProto);
const nullProto = Object.getPrototypeOf(objectProto);

console.log("Object.getPrototypeOf(student1) === Student.prototype           :", studentProto === Student.prototype);
console.log("Object.getPrototypeOf(Student.prototype) === Person.prototype   :", personProto === Person.prototype);
console.log("Object.getPrototypeOf(Person.prototype) === Object.prototype   :", objectProto === Object.prototype);
console.log("Object.getPrototypeOf(Object.prototype)                         :", nullProto); // null (end of chain)

console.log("\n>>> Constructor reference verification:");
console.log("student1.constructor === Student :", student1.constructor === Student);
console.log("student1.constructor === Person  :", student1.constructor === Person);
