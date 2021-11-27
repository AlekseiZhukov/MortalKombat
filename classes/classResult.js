import {createElement} from '../utils.js'
import GenerateLogs from "./classGenerateLogs.js";
import {logs} from "../main.js";

export class Result {
    constructor  ({$formFight, $arenas, $chat}) {
        this.$chat = $chat
        this.$formFight = $formFight
        this.$arenas = $arenas
        this.generateLogs = new GenerateLogs({logs, $chat: this.$chat})

    }

    createReloadButton = () => {
        const $reloadWrap = createElement('div', 'reloadWrap');
        const $buttonRestart = createElement('button', 'button');

        $buttonRestart.innerText = 'Restart';

        $buttonRestart.addEventListener('click', function () {
            window.location.reload()
        });

        $reloadWrap.appendChild($buttonRestart);
        this.$arenas.appendChild($reloadWrap)
    }

    showWinner = (name) => {
        const $loseTitle = createElement('div', 'loseTitle');
        if (!name) {
            $loseTitle.innerText = `draw!`;
        } else {
            $loseTitle.innerText = `${name} win!`;
        }

        return $loseTitle
    }

    showResult = (player1, player2) => {

        const {name: namePlayer1, hp: hpPlayer1} = player1;
        const {name: namePlayer2, hp: hpPlayer2} = player2;

        if (hpPlayer1 === 0 || hpPlayer2 === 0) {
            this.$formFight.querySelector('.button').disabled = true;
            this.createReloadButton();

        }

        if (hpPlayer1 === 0 && hpPlayer2 > hpPlayer1) {

            this.$arenas.appendChild(this.showWinner(namePlayer2));
            this.generateLogs.createLog('end', player2, player1)

        } else if (hpPlayer2 === 0 && hpPlayer1 > hpPlayer2)  {

            this.$arenas.appendChild(this.showWinner(namePlayer1));
            this.generateLogs.createLog ('end', player1, player2)

        } else if (hpPlayer2 === 0 && hpPlayer1 === 0){

            this.$arenas.appendChild(this.showWinner());
            this.generateLogs.createLog ('draw', player1, player2)
        }
    }
}

export default Result