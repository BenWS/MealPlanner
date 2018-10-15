const MealPlanner = require("./MealPlanner.js");

var ben = new MealPlanner.Person(27, "Male", 170, 72, "VERY ACTIVE");
var mealPlan = new MealPlanner.MealPlan(ben, 3);
var breakfast = new MealPlanner.Meal("Breakfast", mealPlan, 1);

//have user select food group
var foodGroup = "Meat, Poultry, Nuts";
//display all the food options under selected food Group
var foodsInGroup = MealPlanner.food.filter((element) => element.Group == foodGroup).map((element) => element.Food);
// console.log(foodsInGroup);
breakfast.addFood("Banana", 1);
breakfast.addFood("Almonds", 1);
breakfast.addFood("Cheddar Cheese", 1);
// console.log("Meal Details: " + JSON.stringify(breakfast));
breakfast.validate();
// mealPlan.addMeal(breakfast);

//daily food serving requirement:

//MealPlan.getAllFood()
