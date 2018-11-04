const MealPlanner = require("./MealPlanner.js");

var ben = new MealPlanner.Person(27, "Male", 170, 72, "VERY ACTIVE");
var mealPlan = new MealPlanner.MealPlan(ben, 3);
var breakfast = new MealPlanner.Meal("Breakfast", mealPlan, 1);
var lunch = new MealPlanner.Meal("Lunch", mealPlan, 3);
// var foodDataClient = new MealPlanner.FoodDataClient()

breakfast.addFood("05009", 3);
breakfast.addFood("05009", 3);
breakfast.addFood("11829", 1);
lunch.addFood("11829", 1);
lunch.addFood("11829", 1);

mealPlan.addMeal(breakfast);
mealPlan.addMeal(lunch);

/*
User cannot make food selection that violates the daily limit of N servings for group G

Get Meal Plan Limit for every Food Group
Get Current Number of Servings for Each Group in Meal Plan
  Create DistinctFoodGroupArray
  For Each Group in DistinctFoodGroupArray
    For each Food in FoodArray
      If Food is in Group then servingCount += Food.servings
      If Else, Continue
If Meal Plan Limit Exceeds
*/
// console.log(mealPlan.servingsRequiredbyGroup);

// For each Distinct Food Group
//   If mealPlan current servings count exceeds requiredByGroup, return FALSE
//   Else return true

console.log(mealPlan.validate_GroupServingLimit());
