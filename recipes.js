// Load the JSON file containing recipe data
function loadRecipes(selectedRecipe) {
  fetch(`recipes/${selectedRecipe}.json`)
    .then(response => response.json())
    .then(data => {
      // Clear the existing recipe display
      const recipeDisplay = document.querySelector('#recipe-display');
      recipeDisplay.innerHTML = '';
      
      // Create the HTML elements for the new recipe display
      const title = document.createElement('h2');
      const ingredientsList = document.createElement('ul');
      const instructionsList = document.createElement('ol');
      
      // Set the content for each element based on the recipe data
      title.textContent = data.title;
      data.ingredients.forEach(ingredient => {
        const li = document.createElement('li');
        li.textContent = ingredient;
        ingredientsList.appendChild(li);
      });
      data.instructions.forEach(instruction => {
        const li = document.createElement('li');
        li.textContent = instruction;
        instructionsList.appendChild(li);
      });
      
      // Add the elements to the container div and append it to the document
      recipeDisplay.appendChild(title);
      recipeDisplay.appendChild(ingredientsList);
      recipeDisplay.appendChild(instructionsList);
    })
    .catch(error => console.error(error));
}

// Define the path to the recipe files
const recipePath = "./recipes/";

// Get a reference to the recipe selector dropdown
const recipeSelector = document.getElementById("recipe-selector");

// Fetch the list of recipe files and populate the selector dropdown
fetch(recipePath)
  .then(response => response.json())
  .then(data => {
    // Iterate over each recipe file and add its title to the dropdown
    data.forEach(recipe => {
      const option = document.createElement("option");
      option.text = recipe.title;
      recipeSelector.add(option);
    });
  })
  .catch(error => console.error(error));
