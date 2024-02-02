import * as model from './model.js';
import RecipeView from "./views/RecipeView.js";

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

// function init(){
//   RecipeView.addHandlerRender.(controlRecipes);
// }

// init();

// controlRecipes();

// Evento hashchange
// window.addEventListener('hashchange', controlRecipes);

// window.addEventListener('load', controlRecipes);



// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////
