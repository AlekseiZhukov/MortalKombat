const $chat = document.querySelector('.chat');

import {getRandom} from './utils.js';
import {logs} from './main.js';

const normalize = (num) => (num.toString().length > 1 ? num : `0${num}`);

const generateLogs = (type, {name: namePlayer1}, {name: namePlayer2, hp}, forceBlow=null) => {
    let text = '';
    let el = '';
    const date = new Date();
    
    switch (type) {
        case 'start':
            text = logs['start'].replace('[time]', `${normalize(date.getHours())}:${normalize(date.getMinutes())}`)
                .replace('[player1]', (namePlayer1).toUpperCase())
                .replace('[player2]', (namePlayer2).toUpperCase());
            el =`<p>${text}</p>`;
            break

        case 'hit':
            text = logs['hit'][getRandom(logs['hit'].length-1)]
                .replace('[playerKick]', (namePlayer1).toUpperCase())
                .replace('[playerDefence]', (namePlayer2).toUpperCase());
            el =`<p>${normalize(date.getHours())}:${normalize(date.getMinutes())} - ${text} -${forceBlow} [${hp}/100]</p>`;
            break

        case 'defence':
            text = logs['defence'][getRandom(logs['defence'].length-1)]
                .replace('[playerKick]', (namePlayer2).toUpperCase())
                .replace('[playerDefence]', (namePlayer1).toUpperCase());
            el =`<p>${normalize(date.getHours())}:${normalize(date.getMinutes())} - ${text} </p>`;
            break

        case 'end':
            text = logs['end'][getRandom(logs['end'].length-1)]
                .replace('[playerWins]', (namePlayer1).toUpperCase())
                .replace('[playerLose]', (namePlayer2).toUpperCase());
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

export default generateLogs;