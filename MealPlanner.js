const foodDatabase = require("./FoodDatabase.js");

function Person (age, sex, weight_lbs, height_in, activityLevel) {
  this.age = age;
  this.sex = sex;
  this.weight_lbs = weight_lbs;
  this.height_inches = height_in;
  this.activityLevel = activityLevel;

  //assign activityFactor value for CalorieExpenditure calculation
  if (activityLevel==="SEDENTARY") {
    this.activityFactor = 1.2
  } else if (this.activityLevel==="LIGHTLY ACTIVE") {
    this.activityFactor = 1.375
  } else if (this.activityLevel==="MODERATELY ACTIVE") {
    this.activityFactor = 1.55
  } else if (this.activityLevel==="VERY ACTIVE") {
    this.activityFactor = 1.725
  } else if (this.activityLevel==="EXTRA ACTIVE") {
    this.activityFactor = 1.9
  }

  //determine BMR (Base Metabolic Rate) according to sex
  if (sex === "Male") {
    this.bmr = 66 + (6.3*this.weight_lbs) + (12.9*this.height_inches) - (6.8*this.age)
  } else if (sex === "Female") {
    this.bmr = 655 + (4.3*this.weight_lbs) + (4.7*this.height_inches) - (4.7*this.age)
  };

  //determine calorie expenditure through calculated properties
  this.dailyCalorieExpenditure = (this.bmr*this.activityFactor).toFixed(2);
}

function Meal (name, mealPlan, mealSize) {

  mealSize = parseInt(mealSize);
  if (mealSize >= 1 && mealSize <= 5) {
    this.servingsRequired = parseInt(mealSize*(1/10)*mealPlan.servingsRequired);
  } else if (mealSize < 1) {
    this.servingsRequired = parseInt((1/10)*mealPlan.servingsRequired);
  } else if (mealPlan > 5) {
    this.servingsRequired = parseInt(5*(1/10)*mealPlan.servingsRequired);
  }

  this.addFood;
  this.removeFood;
  this.validate;
  this.name = name;
  this.foodArray = [];
  this.mealPlan = mealPlan;

  if(this.servingsRequired >= 3) {
    this.distinctGroupsRequired = 3;
  } else {
    this.distinctGroupsRequired = this.servingsRequired;
  }
}

Meal.prototype.addFood = function(foodID,numberOfServings) {

  var foodDataClient = new FoodDataClient();
  var foodObject = foodDataClient.getFood(foodID);

  foodObject.servings = numberOfServings;
  this.foodArray.push(foodObject);
  return true;
}

Meal.prototype.removeFood = function(foodArrayIndex) {
  return this.foodArray.splice(key,1);
}

function getDistinctValues(array) {
  var distinctArray = [];
  array.forEach((element) => {
    if(!distinctArray.includes(element)) {
      distinctArray.push(element);
    }
  })
  return distinctArray;
}

function getCountsPerElement(array) {
  var distinctArray = getDistinctValues(array);
  var counts = {};
  distinctArray.forEach((element) => counts[element] = 0);
  distinctArray.forEach((element) => counts[element] = 0);
  array.forEach((element) => counts[element] = counts[element] + 1);
  return counts;
}

function sumOverArray(array, groupByProperty, sumOverProperty) {

  var tempArray = array.map((element) => element[groupByProperty])
  var distinctArray = getDistinctValues(tempArray);
  var sums = {};
  distinctArray.forEach((element) => sums[element] = 0);
  array.forEach((element) => sums[element[groupByProperty]] += element[sumOverProperty]);
  return sums;
}

Meal.prototype.validate_FoodUnqiueness = function () {

  var foodIDArray = this.foodArray.map((element) => element.ID);
  var countObject = getCountsPerElement(foodIDArray);
  var counts = Object.values(countObject);

  if(counts.filter((count) => count > 1).length > 0) {
    return false;
  } else {
    return true;
  };
}

Meal.prototype.validate_MealServingLimit = function () {
  // Validation #4 - meal serving limit
  //# servings chosen does not overshoot the meal requirement
  //if (servingsChosen > servingsRequired) then FALSE
  // var servingsChosen = this.foodArray.map(foodRecord  => foodRecord.servings).reduce((accumulator, reducer) => accumulator + reducer);
}


Meal.prototype.validate_Variety = function() {
  // Validation #1 - Food group meal variety requirement
  //if serving variety requirement has not been met, and count distinct food groups needing to be chosen < servingsRemaining then return false
  var distinctGroupsChosen = 1;
  var servingsChosen = 2;
  var distinctFoodGroupsRemaining = this.distintGroupsRequired - distinctGroupsChosen;
  var servingsRemaining = this.servingsRequired - servingsChosen;
  if (distinctFoodGroupsRemaining > servingsRemaining) {
    return false;
  } else {
    return true;
  }
}

function MealPlan (person, numberOfMeals) {

  this.numberOfMeals = parseInt(numberOfMeals);
  //get total servings required with assumption that a serving on average contains 100 calories
  this.servingsRequired = parseInt(person.dailyCalorieExpenditure/100);
  this.servingsRequiredbyGroup  = {
    "Vegetables": parseInt(this.servingsRequired * (5/26))
    , "Dairy": parseInt(this.servingsRequired * (3/26))
    , "Meat, Poultry, Nuts":parseInt(this.servingsRequired * (3/26))
    , "Fruits": parseInt(this.servingsRequired * (4/26))
    , "Grains":parseInt(this.servingsRequired * (11/26))
  };

  this.numberOfMeals = numberOfMeals;
  this.requirements;
  this.meals = [];
  this.savePlan;
  this.getMeals;
  this.validate;
}

MealPlan.prototype.validate_GroupServingLimit = function() {
  //Prevents user from making food selection that violates the daily limit of N servings for group G
  var foodArray_MealPlan = [];
  this.meals.forEach(meal => {
    foodArray_MealPlan = foodArray_MealPlan.concat(meal.foodArray)
  });

  var currentGroupServings = sumOverArray(foodArray_MealPlan, "foodGroup", "servings");
  var distinctGroups = Object.keys(currentGroupServings);

  var violations = distinctGroups.filter(group => {
    return (currentGroupServings[group] > this.servingsRequiredbyGroup[group])
  });

  if (violations.length  = 0) {
    return true;
  } else {
    return false;
  }
}

MealPlan.prototype.addMeal = function(meal) {
  return this.meals.push(meal);
}

module.exports.Meal = Meal;
module.exports.Person = Person;
module.exports.MealPlan = MealPlan;
module.exports.FoodDataClient = FoodDataClient;
// module.exports.food = foodList;

function FoodDataClient() {
  //constructor method is empty because this is a utility class
}

FoodDataClient.prototype.searchFood = function(searchTerm) {
  return foodDatabase.filter((foodRecord) => foodRecord.name.includes(searchTerm));
}

FoodDataClient.prototype.getFood = function(foodID) {
  return foodDatabase.find((foodRecord) => foodRecord.ID === foodID);
}
