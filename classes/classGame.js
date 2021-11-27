import {HIT, ATTACK} from '../data.js'
import {logs} from '../main.js'
import Player from './classPlayer.js'
import GenerateLogs from "./classGenerateLogs.js";
import Attacks from'./classAttacks.js'
import Result from "./classResult.js";

export class Game {
    constructor({$arenas, $formFight, $chat}) {
        this.$arenas = $arenas
        this.$formFight = $formFight;
        this.$chat = $chat;
        this.player1 = new Player({player: 1, name: 'Scorpion', img: 'http://reactmarathon-api.herokuapp.com/assets/scorpion.gif'});
        this.player2 = new Player({player: 2, name: 'Kitana', img: 'http://reactmarathon-api.herokuapp.com/assets/kitana.gif'});
        this.generateLogs = new GenerateLogs({logs, $chat: this.$chat})
        this.attacks = new Attacks({HIT, ATTACK, $formFight: this.$formFight})
        this.result = new Result({$formFight: this.$formFight, $arenas: this.$arenas, $chat: this.$chat})
    }

    createElement = (element, classname) => {
        const $elem = document.createElement(element);
        if (classname) {
            $elem.classList.add(classname);
        }

        return $elem;
    }

    createPlayer = ({player, hp, name, img}) => {

        const $player = this.createElement('div', `player${player}`);
        const $progressbar = this.createElement('div', 'progressbar');
        const $character = this.createElement('div', 'character');
        const $life = this.createElement('div', 'life');
        const $name = this.createElement('div', 'name');
        const $img = this.createElement('img');

        $life.style.width = `${hp}%`;
        $name.innerText = name;
        $img.src = img;

        $progressbar.appendChild($name)
        $progressbar.appendChild($life)

        $character.appendChild($img)

        $player.appendChild($progressbar)
        $player.appendChild($character)

        return $player;

    }

    start = () => {

        this.$arenas.appendChild(this.createPlayer(this.player1));
        this.$arenas.appendChild(this.createPlayer(this.player2));

        this.generateLogs.createLog('start', this.player1, this.player2)

        this.$formFight.addEventListener('submit',  (e) => {
            e.preventDefault();

            const {hit: enemyHit, value: enemyHitValue, defence: enemyDefence} = this.attacks.enemyAttack();
            const {hit: playerHit, value: playerHitValue, defence: playerDefence} = this.attacks.playerAttack();

            if(enemyHit !== playerDefence){
                this.player1.changeHP( enemyHitValue);
                this.player1.renderHP();

                this.generateLogs.createLog('hit', this.player2, this.player1, enemyHitValue)

            } else {

                this.generateLogs.createLog('defence', this.player1, this.player2)
            }

            if(playerHit !== enemyDefence) {
                this.player2.changeHP(playerHitValue);
                this.player2.renderHP();
                this.generateLogs.createLog('hit', this.player1, this.player2, playerHitValue)
            } else {

                this.generateLogs.createLog('defence', this.player2, this.player1)
            }

            this.result.showResult(this.player1, this.player2);

        })
    }

}

export default Game