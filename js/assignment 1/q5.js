/**
 * Question 5: Weather Activity Planner
 * 
 * Requirements:
 * - Create variables for temperature, isRaining, windSpeed.
 * - If raining -> "Stay indoors with hot coffee."
 * - Else if temperature > 35 -> "Go swimming."
 * - Else if temperature < 15 and windSpeed > 20 -> "Too cold and windy — stay home."
 * - Else -> "Perfect day for a walk."
 * - Combine && and || conditions smartly.
 */

// Step 1: Declare weather condition variables
let temperature = 24;  // Temperature in Celsius
let isRaining = false;  // Boolean flag indicating precipitation
let windSpeed = 12;    // Wind speed in km/h

/**
 * Evaluates weather conditions and advises an appropriate outdoor/indoor activity.
 * Combines && (logical AND) and || (logical OR) operators smartly.
 */
function getWeatherAdvice(temp, raining, wind) {
  // Input validation combining || (OR) operators
  if (typeof temp !== "number" || typeof wind !== "number" || typeof raining !== "boolean") {
    return "Invalid input data: Please provide valid weather metrics.";
  }

  // Smart Weather Decision Flow:
  // 1. Highest priority check: Rain condition
  if (raining) {
    return "Stay indoors with hot coffee.";
  }
  // 2. High heat condition
  else if (temp > 35) {
    return "Go swimming.";
  }
  // 3. Combined check with &&: Both freezing cold AND high wind speed
  else if (temp < 15 && wind > 20) {
    return "Too cold and windy — stay home.";
  }
  // 4. Default moderate weather
  else {
    return "Perfect day for a walk.";
  }
}

// Step 2: Primary execution
console.log("=== Q5: Weather Activity Planner ===");
console.log(`Current Weather Parameters:`);
console.log(`- Temperature : ${temperature}°C`);
console.log(`- Is Raining  : ${isRaining}`);
console.log(`- Wind Speed  : ${windSpeed} km/h`);
console.log(`Activity Advice: ${getWeatherAdvice(temperature, isRaining, windSpeed)}`);

// Step 3: Demonstrate all distinct weather scenarios
console.log("\n--- Testing All Weather Scenarios ---");
const testCases = [
  { temp: 22, rain: true, wind: 10, scenario: "Rainy Day" },
  { temp: 38, rain: false, wind: 12, scenario: "Hot Summer Day (> 35°C)" },
  { temp: 10, rain: false, wind: 28, scenario: "Cold & Windy (< 15°C and > 20 km/h)" },
  { temp: 12, rain: false, wind: 14, scenario: "Cold but Calm (< 15°C but <= 20 km/h)" },
  { temp: 24, rain: false, wind: 15, scenario: "Pleasant Day" }
];

testCases.forEach((tc) => {
  const result = getWeatherAdvice(tc.temp, tc.rain, tc.wind);
  console.log(`[${tc.scenario.padEnd(35)}] -> ${result}`);
});
