const input = document.querySelector('.login__input');
const button = document.querySelector('.login__button');
const form = document.querySelector('.login-form');


//habilitar e desabilitar button:
const validateInput = ({ target }) => {
    if(target.value.length > 2){
        button.removeAttribute('disabled');
    } else {
        button.setAttribute('disabled', '');
    }
}

//Envio do formulário:
const handleSubmit = (event) => {
    event.preventDefault();

    localStorage.setItem('player', input.value);
    window.location = './assets/pages/game.html';
}

input.addEventListener('input', validateInput);
form.addEventListener('submit', handleSubmit);