const foodDatabase = require("./FoodDatabase.js");


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
  var groups = getDistinctValues(array.map((element) => element[groupByProperty]));
  var sum = {};
  groups.forEach((group) => sum[group] = 0);
  array.forEach((element) => sum[element[groupByProperty]] += element[sumOverProperty]);
  return sum;
}



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
  this.mealSize = mealSize;

  if(this.servingsRequired >= 3) {
    this.distinctGroupsRequired = 3;
  } else {
    this.distinctGroupsRequired = this.servingsRequired;
  }
}


Meal.prototype.addFood = function(foodID,numberOfServings) {
  //does adding new meal item viloate the meal serving requirement?
  //does adding new meal item violate the group seving requirement?
  //does adding new meal item allow the user to still meet the group serving requirement?
  var foodDataClient = new FoodDataClient();
  var foodObject = foodDataClient.getFood(foodID);

  foodObject.servings = numberOfServings;
  this.foodArray.push(foodObject);
  return true;
}

Meal.prototype.removeFood = function(foodArrayIndex) {
  return this.foodArray.splice(key,1);
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

Meal.prototype.validate_lessThanServingLimit = function () {
  var servingsInMeal = this.foodArray.reduce((accumulator, current) => accumulator + current.servings, 0);
  if(servingsInMeal < this.servingsRequired ) {
    return true;
  } else {
    return false;
  }
}

Meal.prototype.validate_equalsServingLimit = function () {
  var servingsInMeal = this.foodArray.reduce((accumulator, current) => accumulator + current.servings, 0);
  if(servingsInMeal == this.servingsRequired ) {
    return true;
  } else {
    return false;
  }
}

Meal.prototype.validate_GroupVarietyCanBeMet = function() {
  var distinctGroupsRequired = (this.servingsRequired < 3 ? this.servingsRequired : 3);
  var distinctGroupsChosen =   getDistinctValues(this.foodArray.map(element => element.foodGroupID)).length;
  var servingsChosen = this.foodArray.reduce((accumulator, current) => accumulator + current.servings, 0);;
  var servingsRemaining = this.servingsRequired - servingsChosen;
  var distinctGroupsRemaining = distinctGroupsRemaining - distinctGroupsChosen;

  //if count distinct food groups required < servingsRemaining, then meal fails validation
  if (servingsRemaining < distinctGroupsRemaining) {
    return false;
  } else {
    return true;
  }
}

Meal.prototype.validate_GroupVariety = function() {
  var foodGroupCount = getDistinctValues(this.foodArray.map(element => element.foodGroupID)).length;
  if (foodGroupCount < 3) {
    return false;
  } else {
    return true;
  }
}

Meal.prototype.getStatus = function() {
  var distinctFoodGroupsChosen = getDistinctValues(this.foodArray.map(element => element.foodGroupID)).length;
  var servingsChosen = this.foodArray.reduce((acc, red) => acc + red.servings, 0)

  var status = {}
  status.distinctFoodGroupsChosen =  distinctFoodGroupsChosen;
  status.servingsChosen = servingsChosen;
  status.servingsRequired = this.servingsRequired;
  status.distinctGroupsRequired = this.distinctGroupsRequired;

  return status;
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
  this.meals.forEach(element => {
    foodArray_MealPlan = foodArray_MealPlan.concat(element.foodArray)
  });

  var currentGroupServings = sumOverArray(foodArray_MealPlan, "foodGroup", "servings");
  var distinctGroups = Object.keys(currentGroupServings);

  var violations = distinctGroups.filter(group => {
    return (currentGroupServings[group] > this.servingsRequiredbyGroup[group])
  });

  if (violations.length == 0) {
    return true;
  } else {
    return false;
  }
}

MealPlan.prototype.validate_ServingRequirement = function() {
  var mealUnitsSelected = this.meals.reduce((sum, meal) => sum + meal.mealSize, 0);
  var mealsRemaining = this.numberOfMeals - this.meals.length

  /*Rule:"if lowest possible meal unit count is less than
    , and highest possible meal unit count is greater than 10"
  If ^^ is met then we know the meal variety requirement can still be met*/
  if (mealUnitsSelected + mealsRemaining <= 10 && mealUnitsSelected + (mealsRemaining * 5) >= 10) {
    return true;
  } else {
    return false;
  }
}

MealPlan.prototype.getStatus = function() {
  var mealPlanFoodArray = [];
  this.meals.forEach(element => mealPlanFoodArray = mealPlanFoodArray.concat(element.foodArray));
  var servingsChosen = mealPlanFoodArray.reduce((accumulator, currentElement) => {
     return accumulator + currentElement.servings;
   }, 0);

  var foodArray_MealPlan = [];
  this.meals.forEach(meal => {
   foodArray_MealPlan = foodArray_MealPlan.concat(meal.foodArray)
  });
  var currentGroupServings = sumOverArray(foodArray_MealPlan, "foodGroup", "servings");

  var result = {};
  result.numberOfMealsChosen = this.meals.length;
  result.numberOfMealsRequired = this.numberOfMeals;
  result.numberOfServingsChosen = servingsChosen;
  result.numberOfServingsRequired = this.servingsRequired;//console.log(this.servingsRequired);
  result.numberOfGroupServingsChosen = currentGroupServings; //console.log(currentGroupServings);
  result.numberOfGroupServingsRequired = this.servingsRequiredbyGroup; //console.log(this.servingsRequiredbyGroup);
  return result;
}

MealPlan.prototype.addMeal = function(meal) {
  //does new meal violate the serving requirement?
  return this.meals.push(meal);
}


function FoodDataClient() {
  //constructor method is empty because this is a utility class
}

FoodDataClient.prototype.searchFood = function(searchTerm) {
  return foodDatabase.filter((foodRecord) => foodRecord.foodName.includes(searchTerm));
}

FoodDataClient.prototype.getFood = function(foodID) {
  var searchResult = foodDatabase.find((foodRecord) => foodRecord.ID === foodID);
  var returnObject = {};
  Object.assign(returnObject, searchResult);
  return returnObject;
}


module.exports.Meal = Meal;
module.exports.Person = Person;
module.exports.MealPlan = MealPlan;
module.exports.FoodDataClient = FoodDataClient;
