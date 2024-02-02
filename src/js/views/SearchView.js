class SearchView {  
    _parentEl;

    constructor() {
        // Elemento padre privado
        this._parentEl = document.querySelector('.search');
    
        // Listener para el evento clic
        this._parentEl.addEventListener('click', this._handleClick.bind(this));
      }

      _clearInput(){
        this._parentEl.querySelector('.search__field').value = '';
    }

      // Método para obtener el valor del campo de búsqueda
      getQuery() {
        const query = this._parentEl.querySelector('.search__field').value;

        this._clearInput();
        
        return query;
        
    }

    _handleClick(event) {
        // console.log('Click en el elemento de búsqueda:', event.target);
    }

      addHandlerSearch(handler) {
        this._parentEl.addEventListener('submit', function (e) {
            e.preventDefault(); 
            handler(); 
        });
    }
}

export default new SearchView();
