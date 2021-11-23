const $formFight = document.querySelector('.control')
const $arenas = document.querySelector('.arenas');

import generateLogs from './generateLogs.js'
import {createElement} from './utils.js'

const createReloadButton = () => {
    const $reloadWrap = createElement('div', 'reloadWrap');
    const $buttonRestart = createElement('button', 'button');

    $buttonRestart.innerText = 'Restart';

    $buttonRestart.addEventListener('click', function () {
        window.location.reload()
    });

    $reloadWrap.appendChild($buttonRestart);
    $arenas.appendChild($reloadWrap)
}

const showWinner = (name) => {
    const $loseTitle = createElement('div', 'loseTitle');
    if (!name) {
        $loseTitle.innerText = `draw!`; 
    } else {
        $loseTitle.innerText = `${name} win!`;
    }
    
    return $loseTitle
}

const showResult = (player1, player2) => {

    const {name: namePlayer1, hp: hpPlayer1} = player1;
    const {name: namePlayer2, hp: hpPlayer2} = player2;

    if (hpPlayer1 === 0 || hpPlayer2 === 0) {
        $formFight.querySelector('.button').disabled = true;
        createReloadButton();

    }

    if (hpPlayer1 === 0 && hpPlayer2 > hpPlayer1) {

        $arenas.appendChild(showWinner(namePlayer2));
        generateLogs ('end', player2, player1)

    } else if (hpPlayer2 === 0 && hpPlayer1 > hpPlayer2)  {

        $arenas.appendChild(showWinner(namePlayer1));
        generateLogs ('end', player1, player2)

    } else if (hpPlayer2 === 0 && hpPlayer1 === 0){
        
        $arenas.appendChild(showWinner());
        generateLogs ('draw', player1, player2)
    }
}

export default showResult