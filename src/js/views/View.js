import icons from '../../img/icons.svg';


class View {
    _data;
    _parentElement;

    constructor(parentElement) {
        this._parentElement = document.querySelector(parentElement);
    }
    
    render(data) {

        this._data = data;
        
        if (!data || (Array.isArray(data) && data.length === 0)) {
            return this.renderError('No data available.');
        }
        
        
        const markup = this._generateMarkup();
        this._parentElement.innerHTML = markup;
    }

    _clear() {
        this._parentElement.innerHTML = '';
    }

    renderSpinner() {
        const markup = `
            <div class="spinner">
                <svg>
                    <use href="${icons}#icon-loader"></use>
                </svg>
            </div>`;
        this._parentElement.innerHTML = '';
        this._parentElement.insertAdjacentHTML('afterbegin', markup);
    }

    renderError(message = this._errorMessage) {
        this._clear();
        const markup = `
            <div class="error">
                <div>
                    <svg>
                        <use href="${icons}#icon-alert-triangle"></use>
                    </svg>
                </div>
                <p>${message}</p>
            </div>`;    
        this._parentElement.insertAdjacentHTML('afterbegin', markup);
    }

    renderMessage(message = this._message) {
        this._clear();
        const markup = `
            <div class="message">
                <div>
                    <svg>
                        <use href="${icons}#icon-smile"></use>
                    </svg>
                </div>
                <p>${message}</p>
            </div>`;
    
        this._parentElement.insertAdjacentHTML('afterbegin', markup);
    }
}

export default View;