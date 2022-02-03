import {logs} from '../main.js'
import Player from './classPlayer.js'
import GenerateLogs from "./classGenerateLogs.js";
import Attacks from './classAttacks.js'
import Result from "./classResult.js";
import Api from "./api.js";

export class Game {
    constructor({$arenas, $formFight, $chat}) {
        this.$arenas = $arenas
        this.$formFight = $formFight;
        this.$chat = $chat;
        this.generateLogs = new GenerateLogs({logs, $chat: this.$chat})
        this.attacks = new Attacks({$formFight: this.$formFight})
        this.result = new Result({$formFight: this.$formFight, $arenas: this.$arenas, $chat: this.$chat})
        this.api = new Api()

    }

    start = async () => {

        const p1 = JSON.parse(localStorage.getItem('player1'))
        const p2 = await this.api.getEnemyPlayers()

        const player1 = new Player({
            ...p1,
            player: 1,
            rootSelector: 'arenas'
        }                                       )
        const player2 = new Player({
            ...p2,
            player: 2,
            rootSelector: 'arenas'
        })

        this.$arenas.appendChild(player1.createPlayer())
        this.$arenas.appendChild(player2.createPlayer())
        this.generateLogs.createLog('start', player1, player2)

        this.$formFight.addEventListener('submit',  async (e) => {
            e.preventDefault();

            const {player1: {hit: enemyHit, value: enemyHitValue, defence: enemyDefence}, player2: {hit: playerHit, value: playerHitValue, defence: playerDefence}} =  await this.attacks.attack();

            if(enemyHit !== playerDefence){
                player1.changeHP( enemyHitValue);
                player1.renderHP();

                this.generateLogs.createLog('hit', player2, player1, enemyHitValue)

            } else {

                this.generateLogs.createLog('defence', player1, player2)
            }

            if(playerHit !== enemyDefence) {
                player2.changeHP(playerHitValue);
                player2.renderHP();
                this.generateLogs.createLog('hit', player1, player2, playerHitValue)
            } else {

                this.generateLogs.createLog('defence', player2, player1)
            }

            this.result.showResult(player1, player2);

        })
    }

}

export default Game