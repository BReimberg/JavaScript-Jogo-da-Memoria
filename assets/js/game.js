const grid = document.querySelector('.grid');
const spanPlayer = document.querySelector('.player');
const spanTimer = document.querySelector('.timer');

//Array das fotos
const characters = [
    'bobby',
    'castiel',
    'crowley',
    'dean',
    'jo',
    'john',
    'mary',
    'meg',
    'ruby',
    'sam'
];

//Criar elementos
const createElement = (tag, className) => {
    const element = document.createElement(tag);
    element.className = className;
    return element;
}

//Variáveis da primeira escolha e segunda escolha
let firstCard = '';
let secondCard = '';

const checkEndGame = () => {
    //procurar por todas as classes disabled-card
    const disabledCrds = document.querySelectorAll('.disabled-card');

    if(disabledCrds.length === 20){
        clearInterval(this.loop);
        alert(`Parabéns ${spanPlayer.innerHTML}! Seu tempo foi: ${spanTimer.innerHTML}`);
    }
}

//Combinação certa ou errada
const checkCards = () => {
    const firstCharacter = firstCard.getAttribute('data-character');
    const secondCharacter = secondCard.getAttribute('data-character');

    //verificar
    if (firstCharacter === secondCharacter) {

        //MANTÉM AS CARTAS CERTAS E MODIFICA A COR
        firstCard.firstChild.classList.add('disabled-card');
        secondCard.firstChild.classList.add('disabled-card');

        //RESET
        firstCard = '';
        secondCard = '';

        //Checar se o jogo foi finalizado com sucesso
        checkEndGame();

    } else {
        setTimeout(() => {

            //ESCONDE AS CARTAS NOVAMENTE
            firstCard.classList.remove('reveal-card');
            secondCard.classList.remove('reveal-card');
      
            //RESET
            firstCard = '';
            secondCard = '';
      
          }, 500);
    }
}

//Revelar carta
const revealCard = ({ target }) => {
    if (target.parentNode.className.includes('reveal-card')) {
        return;
    }

    if (firstCard === '') {
        //revela a carta
        target.parentNode.classList.add('reveal-card');
        //salva a carta
        firstCard = target.parentNode;
    } else if (secondCard === '') {
        target.parentNode.classList.add('reveal-card');
        secondCard = target.parentNode;

        checkCards();
    }
}

// Criar carta
const createCard = (character) => {
    const card = createElement('div', 'card');
    const front = createElement('div', 'face front');
    const back = createElement('div', 'face back');

    front.style.backgroundImage = `url('../img/${character}.png')`;

    card.appendChild(front);
    card.appendChild(back);

    card.addEventListener('click', revealCard);
    card.setAttribute('data-character', character);

    return card;
}

//Módo do jogo
const loadGame = () => {
    const duplicateCharacters = [...characters, ...characters];

    const shuffledArray = duplicateCharacters.sort(() => Math.random() - 0.5);

    shuffledArray.forEach((character) => {
        const card = createCard(character);
        grid.appendChild(card);
    });
}

const startTimer = () => {
    this.loop = setInterval(() => {
        const currentTime = Number(spanTimer.innerHTML);
        spanTimer.innerHTML = currentTime + 1;
    }, 1000);
}

//Quando a janela do navegador terminar de carregar...
window.onload = () => {

    //Pega o nome salvo na hora do login e adiciona no campo superior perto do tempo
    spanPlayer.innerHTML = localStorage.getItem('player');

    startTimer();
    loadGame();
}
