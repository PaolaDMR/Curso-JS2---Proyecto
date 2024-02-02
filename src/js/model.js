// Importar API
import {API_URL} from './config';
import { getJSON } from './helpers';

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

        const url = `${API_URL}/${id}`;
        
        // // a. La declaración de res.
        // const response = await fetch(url); 

        // // Validacion ok
        // if (!response.ok) {
        //   throw new Error(`Error al obtener datos: ${response.status} ${response.statusText}`);
        // }

        // const data = await response.json();

        const data = await getJSON(url);
      
      // b. Declara como const el objeto recipe.
      const { recipe } = data.data;

      // c. Antepón el objeto state al recipe desestructurado.
      state.recipe = recipe;

      // d. En el console.log, también registra a recipe como objeto de state.
      console.log('Receta cargada con éxito:', state.recipe, id);
    
    
      } catch (error) {
        // a. Envía a una alerta el error.
        // alert(`Error al cargar la receta: ${error.message}`);
        // console.error('Error al cargar la receta:', error.message);
        console.log(`${error.message} 💥💥💥💥`);
      }
  }

  export async function loadSearchResults(query) {
    try {
      const url = `${API_URL}/?search=${query}`;
      const data = await getJSON(url);
      state.search.query = query;

      state.search.results = data.data.recipes.map((rec) => ({
      // const recipes = data.data.recipes.map((rec) => ({
          id: rec.id,
          title: rec.title,
          publisher: rec.publisher,
          image: rec.image_url,
      }));

      console.log(state.search.results);
      // return state.search.results;
    } catch (error) {
      throw error; 
    }
  }
  
  // Exporta la función loadRecipe
  export { loadRecipe };