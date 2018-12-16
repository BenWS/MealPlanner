//https://www.npmjs.com/package/readline-sync
const rl = require('readline-sync');
const mp = require('./MealPlanner');
//
// console.log('\r\nWelcome to Meal Planner. Please provide the requested information.\r\n');
// var age = rl.question('Age (years): ');
// var gender  = rl.question('Gender (Male/Female): ');
// var weight = rl.question('Weight (lbs): ');
// var heightInches = rl.question('Height (inches): ');
// var numberOfMeals = rl.question('Number of meals? ');
//
// var activityLevels = ['Sedentary','Lightly Active','Moderately Active','Very Active','Exceptionally Active'];
// var activityLevelIndex = rl.keyInSelect(activityLevels, 'Activity Level? ');
// console.log(`You selected '${activityLevels[activityLevelIndex]}'`);


var age = 28;
var gender = 'Male';
var weight = 170;
var heightInches = 72;
var numberOfMeals = 3;
var activityLevelIndex = 3;


var person = new mp.Person(age, gender, weight, heightInches, activityLevelIndex);
var mealPlan = new mp.MealPlan(person, numberOfMeals);

while (!mealPlan.isComplete()) {
    console.log('\n\n****************\nNew Meal Entry\n****************');
    console.log(mealPlan.getStatus());
    var mealName = rl.question('Meal Name: ');
    var mealSize = rl.question('Meal Size: ');
    var meal = mealPlan.addMeal(mealName, mealSize);
    while(!meal.isComplete()) {
      console.log('\n\n****************\nNew Food Entry\n****************');
      console.log('Current Meal Status');
      console.log('Servings Required: ' + meal.getStatus().servingsRequired);
      console.log('Servings Chosen: ' + meal.getStatus().servingsChosen);
      var object = {'Beef, ground, 85% lean meat / 15% fat, crumbles, cooked, pan-browned':'23570','Broccoli, cooked, boiled, drained, with salt':'11742','Apples, raw, with skin - medium (3\" dia) ':'09003','Cheddar Cheese':'01270','Brown Rice, Cooked':'20041'};
      var array = Object.keys(object);

      var foodEntry = rl.keyInSelect(array,'Food?');
      var servings = rl.question('Food Servings: ');
      var foodSelection = array[foodEntry  - 1];
      meal.addFood(object[foodSelection], servings);
    }
}

//save Meal Plan file to user's Downloads folder
console.log(mealPlan.meals);
