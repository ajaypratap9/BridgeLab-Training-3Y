/**
 * Question 4: Constructor Functions & Prototype Method Sharing
 *
 * Task:
 * Create a constructor function Car(brand, model).
 * Add a prototype method getDetails() that prints car brand and model.
 * Create two car objects and call this method to show method sharing via prototype.
 */

console.log("==============================================================");
console.log(" Demonstration: Question 4 - Prototype Method Sharing in Car  ");
console.log("==============================================================\n");

// 1. Constructor Function
function Car(brand, model) {
  // Instance-specific properties
  this.brand = brand;
  this.model = model;
}

// 2. Add prototype method to Car
Car.prototype.getDetails = function () {
  return `Car Details -> Brand: ${this.brand}, Model: ${this.model}`;
};

// 3. Create two car instances
const car1 = new Car("Toyota", "Supra");
const car2 = new Car("Tesla", "Model S");

// 4. Call getDetails() on both instances
console.log(">>> Invoking getDetails() on instances:");
console.log("car1.getDetails():", car1.getDetails());
console.log("car2.getDetails():", car2.getDetails());

// 5. Demonstrate Method Sharing via Prototype
console.log("\n>>> Proving Method Sharing via Reference Comparison:");
const isSharedMethod = car1.getDetails === car2.getDetails;
console.log("Are car1.getDetails and car2.getDetails the same function reference in memory?");
console.log("car1.getDetails === car2.getDetails ->", isSharedMethod);

// Check prototype link
console.log("\n>>> Prototype Chain Verification:");
console.log("Object.getPrototypeOf(car1) === Car.prototype ->", Object.getPrototypeOf(car1) === Car.prototype);
console.log("Object.getPrototypeOf(car2) === Car.prototype ->", Object.getPrototypeOf(car2) === Car.prototype);
console.log("Does car1 have 'getDetails' as an own property?", car1.hasOwnProperty("getDetails"));
console.log("Does Car.prototype have 'getDetails' as an own property?", Car.prototype.hasOwnProperty("getDetails"));

// -------------------------------------------------------------
// EXPLANATION: Prototype Method Sharing Benefits
// -------------------------------------------------------------
console.log("\n================ KEY TAKEAWAY: WHY USE PROTOTYPES ================");
console.log(
  "1. Memory Efficiency: When a method is defined on Car.prototype, only ONE copy\n" +
  "   of the function exists in memory, no matter how many instances are created.\n" +
  "2. Prototype Lookup: When car1.getDetails() is called, JavaScript first looks for\n" +
  "   'getDetails' on car1 itself. Not finding it there, it traverses up the prototype\n" +
  "   chain to Car.prototype and finds the method.\n" +
  "3. If getDetails were defined inside the constructor (this.getDetails = ...),\n" +
  "   every car instance would allocate a brand new function copy in heap memory."
);
console.log("==================================================================\n");
