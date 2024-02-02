import * as model from './model.js';
import RecipeView from "./views/RecipeView.js";
import SearchView from "./views/SearchView.js";
import resultsView from './views/ResultsView.js';
import paginationView from './views/paginationView';
// function renderSpinner(parentEl) {
//   const markup = `
//   <div class="spinner">
//     <svg>
//       <use href="${icons}#icon-loader"></use>
//     </svg>
//   </div>`;

//   parentEl.innerHTML = '';
//   parentEl.insertAdjacentHTML('afterbegin', markup);
// }

async function controlRecipes(){

   // Declarar variable 
    var id = window.location.hash;
    id = id.slice(1);

    if(!id){
      return;
    }
    
    RecipeView.renderSpinner();

    console.log(`id value:`,id);

   const url = `https://forkify-api.herokuapp.com/api/v2/recipes/${id}`;
  
    try {
      const response = await fetch(url);
  
      if (!response.ok) {
        throw new Error(`Error en la solicitud: ${response.status}`);
      }
  
      const data = await response.json();
      const resp = data.data.recipe;


      const recipe = {
        id: data.data.recipe.id,
        title: data.data.recipe.title,
        publisher: data.data.recipe.publisher,
        sourceURL: data.data.recipe.source_url,
        image: data.data.recipe.image_url,
        servings: data.data.recipe.servings,
        cookTime: data.data.recipe.cooking_time,
        ingredients: data.data.recipe.ingredients,
      }

      await model.loadRecipe(id);

      RecipeView.render(model.state.recipe);


    } catch (error){
      alert('Error: ' + error.message);
    }
};

async function controlSearchResults() {
  try {
    // Invoca a la función model.loadsearchResults 
    const searchQuery = SearchView.getQuery();

    if (!searchQuery) {
      return;
    }

    resultsView.renderSpinner();

    const searchResults = await model.loadSearchResults(searchQuery);


    resultsView.render(model.getSearchResultsPage());
    paginationView.render(model.state.search);
    // Imprime en la consola el resultado
    console.log("Resultado de la búsqueda:", searchResults);


  } catch (error) {
    // Manejo de errores
    console.error("Error en la búsqueda:", error.message);
  }
}


async function controlPagination(goToPage) {
  try {

    model.getSearchResultsPage(goToPage);
    resultsView.render(model.getSearchResultsPage());
    paginationView.render(model.state.search);

  } catch (err) {
    console.error(err);
  }
}
// controlSearchResults("pizza");

function init(){
  RecipeView.addHandlerRender(controlRecipes);
  SearchView.addHandlerSearch(controlSearchResults);
  paginationView.addHandlerClick(controlPagination);
}

init();

// controlRecipes();

// Evento hashchange
// window.addEventListener('hashchange', controlRecipes);

// window.addEventListener('load', controlRecipes);



// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////
