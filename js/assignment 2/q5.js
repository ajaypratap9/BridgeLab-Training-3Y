/**
 * Question 5: Boolean Logic Access System
 * 
 * Requirements:
 * - Variables: isDoorLocked, isWindowClosed, isAlarmOn, isOwnerInside.
 * - Access is granted / system is secure only if:
 *   - Alarm is on
 *   - Door and window are closed (and locked)
 *   - Owner is inside
 * - Use Boolean logic (&&, ||, !) to print “Secure” or “Unsafe”.
 * - Change values and test multiple outcomes.
 */

/**
 * Evaluates the smart home security status using logical operators (&&, ||, !).
 * 
 * @param {boolean} isDoorLocked - Whether the main door is securely locked
 * @param {boolean} isWindowClosed - Whether all windows are closed
 * @param {boolean} isAlarmOn - Whether the security alarm is armed/on
 * @param {boolean} isOwnerInside - Whether the registered homeowner is inside
 * @returns {object} Status evaluation details
 */
function evaluateHomeSecurity(isDoorLocked, isWindowClosed, isAlarmOn, isOwnerInside) {
  // Primary Boolean Logic Condition:
  // System is secure ONLY IF Alarm is ON AND Door is locked AND Window is closed AND Owner is inside
  const isSecure = isAlarmOn && isDoorLocked && isWindowClosed && isOwnerInside;

  // Demonstrating logical NOT (!) and logical OR (||):
  // Check if any vulnerability or breach exists in the perimeter
  const hasBreach = (!isAlarmOn) || (!isDoorLocked) || (!isWindowClosed) || (!isOwnerInside);

  // Determine final status label
  const status = isSecure && !hasBreach ? "Secure" : "Unsafe";

  // Build diagnostic reasons for unsafe state
  const vulnerabilities = [];
  if (!isAlarmOn) vulnerabilities.push("Alarm is inactive / OFF (!isAlarmOn)");
  if (!isDoorLocked) vulnerabilities.push("Front door is unlocked (!isDoorLocked)");
  if (!isWindowClosed) vulnerabilities.push("Windows are open (!isWindowClosed)");
  if (!isOwnerInside) vulnerabilities.push("Owner is outside the premises (!isOwnerInside)");

  return {
    isDoorLocked,
    isWindowClosed,
    isAlarmOn,
    isOwnerInside,
    isSecure,
    hasBreach,
    status,
    vulnerabilities
  };
}

// ==========================================
// Test Cases & Execution
// ==========================================

console.log("==================================================");
console.log("       Q5: Boolean Logic Smart Home Access System ");
console.log("==================================================");

// Baseline scenario: Default variables
let isDoorLocked = true;
let isWindowClosed = true;
let isAlarmOn = true;
let isOwnerInside = true;

const initialCheck = evaluateHomeSecurity(isDoorLocked, isWindowClosed, isAlarmOn, isOwnerInside);
console.log("Baseline Configuration (All Conditions Met):");
console.log(`- Door Locked   : ${isDoorLocked}`);
console.log(`- Window Closed : ${isWindowClosed}`);
console.log(`- Alarm On      : ${isAlarmOn}`);
console.log(`- Owner Inside  : ${isOwnerInside}`);
console.log(`-> System Status: ${initialCheck.status}`);

console.log("\n--------------------------------------------------");
console.log("Testing Multiple Outcome Scenarios:");
console.log("--------------------------------------------------");

// Multi-scenario test matrix demonstrating changing boolean values
const scenarios = [
  {
    name: "Scenario 1: Ideal State (Secure)",
    door: true, window: true, alarm: true, owner: true
  },
  {
    name: "Scenario 2: Window Left Open (Perimeter Breach)",
    door: true, window: false, alarm: true, owner: true
  },
  {
    name: "Scenario 3: Alarm System Disabled (System Vulnerable)",
    door: true, window: true, alarm: false, owner: true
  },
  {
    name: "Scenario 4: Door Unlocked (Physical Breach)",
    door: false, window: true, alarm: true, owner: true
  },
  {
    name: "Scenario 5: Owner Away / Outside House",
    door: true, window: true, alarm: true, owner: false
  },
  {
    name: "Scenario 6: Completely Compromised (All False)",
    door: false, window: false, alarm: false, owner: false
  }
];

scenarios.forEach((test, idx) => {
  const result = evaluateHomeSecurity(test.door, test.window, test.alarm, test.owner);
  console.log(`[${idx + 1}] ${test.name}`);
  console.log(`    Inputs: Door=${test.door}, Window=${test.window}, Alarm=${test.alarm}, OwnerInside=${test.owner}`);
  console.log(`    Evaluation: ${result.status.toUpperCase()}`);
  if (result.vulnerabilities.length > 0) {
    console.log(`    Reasons   : ${result.vulnerabilities.join(" | ")}`);
  }
  console.log("");
});

console.log("==================================================\n");
