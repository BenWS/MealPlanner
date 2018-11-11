/*
Welcome user
Prompt user for information in order to appropriately set calorie intake restriction
Prompt user to choose the number of meals they would like
While Meal Plan is incomplete
	Display Status (See Below)
	Prompt user to create new Meal entry
		Prompt user to select meal size
		Prompt user to name new meal
		Validation #1 (See Below)
		While Meal is incomplete, AddFoodEntryToMeal.txt
		Validation #2 (See Below)
Display Meal Plan to user
*/

const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

console.log("Welcome to Meal Planner. Please answer the following questions: ")

rl.question('Name: ', (answer) => {
  // TODO: Log the answer in a database
  var name = answer;
  
});

rl.question('Age: ', (answer) => {
  // TODO: Log the answer in a database
  var age = answer;
  rl.close();
});

// rl.question('Gender (M/F): ', (answer) => {
//   var gender = answer;
//   rl.close();
// });

// rl.question('Weight (lbs): ', (answer) => {
//   var weight_lbs = answer;
//   rl.close();
// });
//
// rl.question('Height (in): ', (answer) => {
//   var height_inches = answer;
//   rl.close();
// });
//
// rl.question('Activity Level: ', (answer) => {
//   var height_inches = answer;
//   rl.close();
// });
//
// rl.question('Activity Factor: ', (answer) => {
//   var height_inches = answer;
//   rl.close();
// });
