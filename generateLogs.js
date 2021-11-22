const $chat = document.querySelector('.chat');

import {getRandom, normalize} from './utils.js'
import {logs} from './main.js'

export function generateLogs (type, player1, player2, forceBlow=null) {
    let text = '';
    let el = '';
    const date = new Date();
    
    switch (type) {
        case 'start':
            text = logs['start'].replace('[time]', `${normalize(date.getHours())}:${normalize(date.getMinutes())}`)
                .replace('[player1]', (player1.name).toUpperCase())
                .replace('[player2]', (player2.name).toUpperCase());
            el =`<p>${text}</p>`;
            break

        case 'hit':
            text = logs['hit'][getRandom(logs['hit'].length-1)]
                .replace('[playerKick]', (player1.name).toUpperCase())
                .replace('[playerDefence]', (player2.name).toUpperCase());
            el =`<p>${normalize(date.getHours())}:${normalize(date.getMinutes())} - ${text} -${forceBlow} [${player2.hp}/100]</p>`;
            break

        case 'defence':
            text = logs['defence'][getRandom(logs['defence'].length-1)]
                .replace('[playerKick]', (player2.name).toUpperCase())
                .replace('[playerDefence]', (player1.name).toUpperCase());
            el =`<p>${normalize(date.getHours())}:${normalize(date.getMinutes())} - ${text} </p>`;
            break

        case 'end':
            text = logs['end'][getRandom(logs['end'].length-1)]
                .replace('[playerWins]', (player1.name).toUpperCase())
                .replace('[playerLose]', (player2.name).toUpperCase());
            el =`<p>${text}</p>`;
            break

        case 'draw':
            text = logs['draw'];
            el =`<p>${text}</p>`;
            break

        default:
            console.log('unexpected error');
            break
    }

    $chat.insertAdjacentHTML('afterbegin', el);
}

export default generateLogs