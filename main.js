// To Get Meal Data from MealDB
const meals = (name) => {
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`)
        .then((res) => res.json())
        .then((data) => displayMeals(data))
        .catch(() => errorHandler());
};

// Search Button and input taking
const searchBtn = () => {
    searchInput = document.getElementById("searchInput").value;
    searchInput != "" ? meals(searchInput) : emptyError();
    document.getElementById("searchInput").value = "";
};

//Displaying Meals by letter or word
const displayMeals = (data) => {
    document.getElementById("search-error").innerHTML = "";
    const mealsDiv = document.getElementById("meals");
    mealsDiv.innerHTML = "";
    document.getElementById("meal-ingredients").innerHTML = "";
    document.getElementById("empty-error").innerHTML = "";
    data.meals.forEach((meal) => {

        const { strMeal, strMealThumb } = meal;
        const mealDiv = document.createElement("div");
        mealDiv.className = "meal";
        mealDiv.innerHTML = `
          <div class="display-meal-box" onclick="displayMealIngredients('${strMeal}')">
            <img src="${strMealThumb}" alt="">
            <h3 class="meal-name">${strMeal}</h3>
          </div>
          </a>
        `;
        mealsDiv.appendChild(mealDiv);
    });
};

//To Get Ingredient Data
const displayMealIngredients = (name) => {
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`)
        .then((res) => res.json())
        .then((data) => {
            getMealIngredients(data.meals[0]);
        });
};


//Showing Meal Details
const getMealIngredients = (meal) => {
    const { strMeal, strMealThumb } = meal;
    const mealIngredients = document.getElementById("meal-ingredients");
    mealIngredients.innerHTML = `
        <div class="meal-ingredients-show">
          <img src="${strMealThumb}" alt="">
           <div class="ingredients">
             <h3>${strMeal}</h3>
             <h4>Ingredient List</h4>
             <ul>
               ${displayIngredientsList(meal)}
             </ul>
           </div>
        </div>
      `;
};

//Ingrediants list making
const displayIngredientsList = (list) => {
    let ingredients = "";
    for (let i = 1; i < 15; i++) {
        ingredients +=
            list["strIngredient" + i] != "" || null
                ? `<li>${list["strIngredient" + i]}</li>`
                : "";
    }
    return ingredients;
};


// Empty search error handle
const emptyError = () => {
    document.getElementById("search-error").innerHTML = '';
    document.getElementById("empty-error").innerHTML = `
      <p>Attention! Search field is empty! Type something...</p>
      `;
}
// Not fount search error massage
const errorHandler = () => {
    document.getElementById("search-error").innerHTML = `
    <p class="error-massage"> Not Found! 
    <br> Sorry, Can't find the Meal you're looking for. 
    <br> Please try again...</p>`;
};