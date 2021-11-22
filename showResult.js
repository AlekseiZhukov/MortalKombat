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

export function showResult(player1, player2) {

    if (player1.hp === 0 || player2.hp === 0) {
        $formFight.querySelector('.button').disabled = true;
        createReloadButton();

    }

    if (player1.hp === 0 && player2.hp > player1.hp) {
        $arenas.appendChild(showWinner(player2.name));
        generateLogs ('end', player2, player1)
    } else if (player2.hp === 0 && player1.hp > player2.hp)  {
        $arenas.appendChild(showWinner(player1.name));
        generateLogs ('end', player1, player2)
    } else if (player2.hp === 0 && player1.hp === 0){
        $arenas.appendChild(showWinner());
        generateLogs ('draw', player1, player2)
    }
}

export default showResult