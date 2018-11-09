const MealPlanner = require("./MealPlanner.js");

var foodClient = new MealPlanner.FoodDataClient();
var ben = new MealPlanner.Person(27, "Male", 170, 72, "VERY ACTIVE");
var mealPlan = new MealPlanner.MealPlan(ben, 3);
var breakfast = new MealPlanner.Meal("Breakfast", mealPlan, 1);
var lunch = new MealPlanner.Meal("Lunch", mealPlan, 3);
var dinner = new MealPlanner.Meal("Lunch", mealPlan, 1);

breakfast.addFood("11829", 1);
breakfast.addFood("05009", 1);
console.log(foodClient.searchFood("Chicken"));

lunch.addFood("11829", 1);
lunch.addFood("11829", 1);

mealPlan.addMeal(breakfast);
mealPlan.addMeal(lunch);


// testing validation methods
// console.log(breakfast.validate_lessThanServingLimit());
// console.log(breakfast.validate_equalsServingLimit());
// console.log(breakfast.validate_FoodUnqiueness());
console.log(breakfast.validate_GroupVariety());
console.log(breakfast.validate_GroupVarietyCanBeMet());
// console.log(mealPlan.validate_GroupServingLimit());
// console.log(mealPlan.validate_ServingRequirement());
console.log(breakfast.foodArray.reduce((acc, red) => acc + red.servings, 0));
console.log(breakfast.servingsRequired);
