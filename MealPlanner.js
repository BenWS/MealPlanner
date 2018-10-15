
var foodList =

[{"Food":"Butter","Group":"Fats, Oils, Sugars", "Amount":"1", "UOM":"tbsp","Grams":"14","Calories":"100","Protein":"t","Carbohydrates":"t", "Fiber":"0", "Fat":"11"}
, {"Food":"Sour Cream","Group":"Fats, Oils, Sugars", "Amount":"2", "UOM":"tbsp","Grams":"24","Calories":"46.3","Protein":"0.5","Carbohydrates":"0.7", "Fiber":"0", "Fat":"4.7"}
, {"Food":"Olive Oil","Group":"Fats, Oils, Sugars", "Amount":"1", "UOM":"tbsp","Grams":"14","Calories":"125","Protein":"0","Carbohydrates":"0", "Fiber":"0", "Fat":"14"}
, {"Food":"Banana","Group":"Fruit", "Amount":"1", "UOM":"item","Grams":"150","Calories":"85","Protein":"1","Carbohydrates":"23", "Fiber":"0.9", "Fat":"t"}
, {"Food":"Apple","Group":"Fruit", "Amount":"1", "UOM":"item","Grams":"130","Calories":"70","Protein":"t","Carbohydrates":"18", "Fiber":"1", "Fat":"t "}
, {"Food":"Brown Rice, Uncooked","Group":"Grains", "Amount":"0.50", "UOM":"cup","Grams":"104","Calories":"374","Protein":"7.5","Carbohydrates":"77", "Fiber":"0.6", "Fat":"1.5"}
, {"Food":"Almonds","Group":"Meat, Poultry, Nuts", "Amount":"0.25", "UOM":"cup","Grams":"35","Calories":"212.5","Protein":"6.5","Carbohydrates":"6.5", "Fiber":"0.9", "Fat":"19"}
, {"Food":"Chicken Breast, Cooked","Group":"Meat, Poultry, Nuts", "Amount":"1.00", "UOM":"oz","Grams":"28.33","Calories":"61.66","Protein":"7.66","Carbohydrates":"0", "Fiber":"0", "Fat":"3"}
, {"Food":"Raw Carrots","Group":"Vegetable", "Amount":"1.00", "UOM":"cup","Grams":"110","Calories":"45","Protein":"1","Carbohydrates":"10", "Fiber":"1.2", "Fat":"t"}
, {"Food":"Baked Potato","Group":"Vegetable", "Amount":"1.00", "UOM":"item","Grams":"100","Calories":"100","Protein":"2","Carbohydrates":"22", "Fiber":"0.5", "Fat":"t"}
, {"Food":"Broccoli, Steamed","Group":"Vegetable", "Amount":"0.50", "UOM":"cup","Grams":"75","Calories":"22.5","Protein":"2.5","Carbohydrates":"4", "Fiber":"0.95", "Fat":"t"}
, {"Food":"Cheddar Cheese","Group":"Dairy", "Amount":"1.00", "UOM":"slice","Grams":"21","Calories":"85","Protein":"4.8","Carbohydrates":"0.71", "Fiber":"0", "Fat":"7"}]

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
  //further research: look into ways to validate object construction

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

  if(this.servingsRequired >= 3) {
    this.distinctGroupsRequired = 3;
  } else {
    this.distinctGroupsRequired = this.servingsRequired;
  }
}

Meal.prototype.addFood = function(food,numberOfServings) {
  //to do: add check that food does not already exist in the foodArray
  var foodLookupResult = foodList.filter((foodRecord) => foodRecord.Food === food)[0];
  var newArrayLength = this.foodArray.push({
    "food":foodLookupResult.Food
    ,"calories_per_serving":foodLookupResult.Calories
    , "servings":numberOfServings});

  return newArrayLength - 1; //return position of new entry in array
}

Meal.prototype.removeFood = function(lookupKey) {
  return this.foodArray.splice(lookupKey,1);
}

Meal.prototype.validate = function() {
  //current food groups chosen makes it possible for the user to still meet the food group variety requirement
  //daily food group serving requirement is not exceeded

  //# servings chosen does not overshoot the meal requirement
  console.log(this.foodArray);
  console.log(this.foodArray.map(foodRecord  => foodRecord.servings).reduce((accumulator, reducer) => accumulator + reducer));

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
    "Vegetable": parseInt(this.servingsRequired * (5/26))
    , "Dairy": parseInt(this.servingsRequired * (3/26))
    , "Meat_Poultry_Fish_Nuts":parseInt(this.servingsRequired * (3/26))
    , "Fruit": parseInt(this.servingsRequired * (4/26))
    , "Grains":parseInt(this.servingsRequired * (11/26))
  };

  this.numberOfMeals = numberOfMeals;
  this.requirements;
  this.meals = [];
  this.addMeal;
  this.removeMeal;
  this.savePlan;
  this.getMeals;
  this.validate;
}


module.exports.Meal = Meal;
module.exports.Person = Person;
module.exports.MealPlan = MealPlan;
module.exports.food = foodList;
