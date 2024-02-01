// Define el objeto state con un objeto recipe vacío
const state = {
    recipe: {}
  };
  
  // Exportar el objeto state
  export { state };
  
  // función asíncrona loadRecipe para obtener la receta de la API
  async function loadRecipe(id) {
    try {
      // Hacer la llamada a la API para obtener la receta

      const url = `https://forkify-api.herokuapp.com/api/v2/recipes/${id}`;
      
      // a. La declaración de res.
      const response = await fetch(url); 
    
    // b. Declara como const el objeto recipe.
    const { recipe } = await response.json();

    // c. Antepón el objeto state al recipe desestructurado.
    state.recipe = recipe;

    // d. En el console.log, también registra a recipe como objeto de state.
    console.log('Receta cargada con éxito:', state.recipe, id);
  
  
} catch (error) {
    // a. Envía a una alerta el error.
    alert(`Error al cargar la receta: ${error.message}`);
    console.error('Error al cargar la receta:', error.message);
  }
  }
  
  // Exporta la función loadRecipe
  export { loadRecipe };