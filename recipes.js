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

// Load the list of recipes and populate the dropdown
fetch('recipes/recipe-list.json')
  .then(response => response.json())
  .then(data => {
    const recipeSelector = document.querySelector('#recipe-selector');
    
    // Populate the dropdown with options for each recipe
    data.recipes.forEach(recipe => {
      const option = document.createElement('option');
      option.value = recipe.file;
      option.textContent = recipe.title;
      recipeSelector.appendChild(option);
    });
    
    // Add an event listener to the dropdown to update the recipe display
    recipeSelector.addEventListener('change', event => {
      loadRecipes(event.target.value);
    });
    
    // Load the first recipe by default
    loadRecipes(data.recipes[0].file);
  })
  .catch(error => console.error(error));
