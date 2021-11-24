import Player from './classPlayer.js'
import {HIT, ATTACK} from './data.js'
import {logs} from "./main.js";

export class Game {
    constructor(props) {

        this.$arenas = document.querySelector('.arenas');
        this.$formFight = document.querySelector('.control');
        this.$chat = document.querySelector('.chat');
        this.player1 = new Player({player: 1, name: 'Scorpion', img: 'http://reactmarathon-api.herokuapp.com/assets/scorpion.gif'});
        this.player2 = new Player({player: 2, name: 'Kitana', img: 'http://reactmarathon-api.herokuapp.com/assets/kitana.gif'});
    }

    getRandom = (num) => Math.ceil(Math.random() * num);

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

    enemyAttack = () => {
        const hit = ATTACK[this.getRandom(3) - 1];
        const defence = ATTACK[this.getRandom(3) - 1];

        return {
            value: this.getRandom(HIT[hit]),
            hit,
            defence,
        }
    }

    playerAttack = () => {

        const attack = {};

        for (let item of this.$formFight) {

            if (item.checked && item.name === 'hit') {
                attack.value = this.getRandom(HIT[item.value]);
                attack.hit = item.value;
            }

            if (item.checked && item.name === 'defence') {
                attack.defence = item.value;
            }

            item.checked = false;

        }
        return attack
    }

    createReloadButton = () => {
        const $reloadWrap = this.createElement('div', 'reloadWrap');
        const $buttonRestart = this.createElement('button', 'button');

        $buttonRestart.innerText = 'Restart';

        $buttonRestart.addEventListener('click', function () {
            window.location.reload()
        });

        $reloadWrap.appendChild($buttonRestart);
        this.$arenas.appendChild($reloadWrap)
    }

    showWinner = (name) => {
        const $loseTitle = this.createElement('div', 'loseTitle');
        if (!name) {
            $loseTitle.innerText = `draw!`;
        } else {
            $loseTitle.innerText = `${name} win!`;
        }

        return $loseTitle
    }

    showResult = () => {

        const {name: namePlayer1, hp: hpPlayer1} = this.player1;
        const {name: namePlayer2, hp: hpPlayer2} = this.player2;

        if (hpPlayer1 === 0 || hpPlayer2 === 0) {
            this.$formFight.querySelector('.button').disabled = true;
            this.createReloadButton();

        }

        if (hpPlayer1 === 0 && hpPlayer2 > hpPlayer1) {

            this.$arenas.appendChild(this.showWinner(namePlayer2));
            this.generateLogs ('end', this.player2, this.player1)

        } else if (hpPlayer2 === 0 && hpPlayer1 > hpPlayer2)  {

            this.$arenas.appendChild(this.showWinner(namePlayer1));
            this.generateLogs ('end', this.player1, this.player2)

        } else if (hpPlayer2 === 0 && hpPlayer1 === 0){

            this.$arenas.appendChild(this.showWinner());
            this.generateLogs ('draw', this.player1, this.player2)
        }
    }

    generateLogs = (type, {name: namePlayer1}, {name: namePlayer2, hp}, forceBlow=null) => {
        const normalize = (num) => (num.toString().length > 1 ? num : `0${num}`);
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
                text = logs['hit'][this.getRandom(logs['hit'].length-1)]
                    .replace('[playerKick]', (namePlayer1).toUpperCase())
                    .replace('[playerDefence]', (namePlayer2).toUpperCase());
                el =`<p>${normalize(date.getHours())}:${normalize(date.getMinutes())} - ${text} -${forceBlow} [${hp}/100]</p>`;
                break

            case 'defence':
                text = logs['defence'][this.getRandom(logs['defence'].length-1)]
                    .replace('[playerKick]', (namePlayer2).toUpperCase())
                    .replace('[playerDefence]', (namePlayer1).toUpperCase());
                el =`<p>${normalize(date.getHours())}:${normalize(date.getMinutes())} - ${text} </p>`;
                break

            case 'end':
                text = logs['end'][this.getRandom(logs['end'].length-1)]
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

        this.$chat.insertAdjacentHTML('afterbegin', el);
    }

    start = () => {

        this.$arenas.appendChild(this.createPlayer(this.player1));
        this.$arenas.appendChild(this.createPlayer(this.player2));
        this.generateLogs('start', this.player1, this.player2);

        this.$formFight.addEventListener('submit',  (e) => {
            e.preventDefault();

            const {hit: enemyHit, value: enemyHitValue, defence: enemyDefence} = this.enemyAttack();
            const {hit: playerHit, value: playerHitValue, defence: playerDefence} = this.playerAttack();

            if(enemyHit !== playerDefence){
                this.player1.changeHP( enemyHitValue);
                this.player1.renderHP();
                this.generateLogs ('hit', this.player2, this.player1, enemyHitValue)

            } else {
                this.generateLogs ('defence', this.player1, this.player2)
            }

            if(playerHit !== enemyDefence) {
                this.player2.changeHP(playerHitValue);
                this.player2.renderHP();
                this.generateLogs ('hit', this.player1, this.player2, playerHitValue)

            } else {
                this.generateLogs ('defence', this.player2, this.player1)
            }

            this.showResult(this.player1, this.player2);

        })
    }

}

export default Game