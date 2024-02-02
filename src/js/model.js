// Importar API
import {API_URL, RES_PER_PAGE} from './config';
import { getJSON } from './helpers';

// Define el objeto state con un objeto recipe vacío
const state = {
  search: {
    query: '',
    results: [],
    page: 1, 
    resultsPerPage: RES_PER_PAGE,
  },
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

        loadSearchResults(`pizza`);
    
      } catch (error) {
        // a. Envía a una alerta el error.
        // alert(`Error al cargar la receta: ${error.message}`);
        // console.error('Error al cargar la receta:', error.message);
        console.log(`${error.message} 💥💥💥💥`);
      }
  }

  async function loadSearchResults(query) {
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

    // Imprime los resultados en la consola
    // console.log('Resultados:', state.search.results);

      return state.search.results;
    } catch (error) {
      throw error; 
    }
  }


  const getSearchResultsPage = (page = state.search.page) => {
    state.search.page = page;
  
    // variables de start, end
    const start = (page - 1) * state.search.resultsPerPage;
    const end = page * state.search.resultsPerPage;
  
    return state.search.results.slice(start, end);
  };

  // loadSearchResults('pizza');

  // Exporta la función loadRecipe
  export { loadRecipe, loadSearchResults, getSearchResultsPage };