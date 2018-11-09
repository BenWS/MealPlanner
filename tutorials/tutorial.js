function Person (age, sex, weight_lbs, height_in, activityLevel) {
  this.age = age;
  this.sex = sex;
  this.weight_lbs = weight_lbs;
  this.height_inches = height_in;
  this.activityLevel = activityLevel;

  //assign activityFactor value for CalorieExpenditure calculation
  if (activityLevel==="SEDENTARY") {this.activityFactor = 1.2}
  else if (this.activityLevel==="LIGHTLY ACTIVE") {this.activityFactor = 1.375}
  else if (this.activityLevel==="MODERATELY ACTIVE") {this.activityFactor = 1.55}
  else if (this.activityLevel==="VERY ACTIVE") {this.activityFactor = 1.725}
  else if (this.activityLevel==="EXTRA ACTIVE") {this.activityFactor = 1.9}

  //determine BMR based on sex
  if (sex === "Male") {this.bmr = 66 + (6.3*this.weight_lbs) + (12.9*this.height_inches) - (6.8*this.age)};
  else if (sex === "Female") {this.bmr = 655 + (4.3*this.weight_lbs) + (4.7*this.height_inches) - (4.7*this.age)};

  //determine calorie expenditure through calculated properties
  this.dailyCalorieExpenditure = (this.bmr*this.activityFactor).toFixed(2);
}

function MealPlan (person, numberOfMeals) {
  //get total servings required with assumption that a serving on average contains 100 calories
  this.servingsRequired = person.dailyCalorieExpenditure/100;
  this.servingsRequiredbyGroup  = {
    "Vegetable": this.servingsRequired * (5/26)
    , "Dairy": this.servingsRequired * (3/26)
    , "Meat_Poultry_Fish_Nuts":this.servingsRequired * (3/26)
    , "Fruit": this.servingsRequired * (4/26)
    , "Grains":this.servingsRequired * (11/26)
  };

  this.numberOfMeals = numberOfMeals;
  this.requirements;
  this.meals;
  this.addMeal;
  this.removeMeal;
  this.savePlan;
  this.getMeals;
  this.validate;
}

function Meal (mealPlan, mealSize) {
  this.servingRequirement;
  this.addFood;
  this.removeFood;
  this.validate;
}

var ben = new Person(27, "Male", 170, 72, "VERY ACTIVE");
var mealPlan = new MealPlan(ben, 3);

console.log(mealPlan.servingsRequiredbyGroup);
