const readline = require('readline');
// const MealPlanner = require("./MealPlanner.js");

// var foodClient = new MealPlanner.FoodDataClient();
// var ben = new MealPlanner.Person(27, "Male", 170, 72, "VERY ACTIVE");
// var mealPlan = new MealPlanner.MealPlan(ben, 3);


const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

var askPersonalInformation = function() {
  var age;
  var gender;
  var weight_lbs;
  var height_inches;
  var activityLevel;
  var numberOfMeals;

  rl.question('Age? ', (answer) => {
    age = answer;
    rl.question ('Gender (Male/Female)? ', (answer) => {
      gender = answer;
      rl.question('Weight (lbs): ', (answer) => {
        weight_lbs = answer;
        rl.question('Height (inches): ', (answer) => {
          height_inches = answer;
          rl.question('Number of meals? ', (answer) => {
            numberOfMeals = answer;
            askMealPlanInformation(0, numberOfMeals);
          })
        });
      });
    });
  });
}

var askMealPlanInformation = function(counter, limit) {
    rl.question("New Meal Name: ", (answer) => {
      rl.question("Meal Size: " ", (answer) => {
        if (counter < limit - 1) {
          askMealPlanInformation(counter + 1, limit);
        } else {
          return;
        }
      })
    });
}

askMealPlanInformation(0, 3);
