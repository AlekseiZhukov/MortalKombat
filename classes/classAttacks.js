import Api from "./api.js";

export class Attacks  {
    constructor ({$formFight}) {
        this.$formFight = $formFight
        this.api = new Api()
    }

    //getRandom = (num) => Math.ceil(Math.random() * num);

    /*enemyAttack = () => {
        const hit = this.ATTACK[this.getRandom(this.ATTACK.length) - 1];
        const defence = this.ATTACK[this.getRandom(this.ATTACK.length) - 1];
        this.enemyAttackData.value = this.getRandom(this.HIT[hit]);
        this.enemyAttackData.hit = hit;
        this.enemyAttackData.defence = defence;
        return this.enemyAttackData

    }*/

    playerAttack = () => {

        const playerHit = {}
        for (let item of this.$formFight) {

            if (item.checked && item.name === 'hit') {
                playerHit.hit = item.value;
            }

            if (item.checked && item.name === 'defence') {
                playerHit.defence = item.value;
            }

            item.checked = false;
        }

        return playerHit

    }

    attack = async () => {
        return await this.api.postHitPlayers(this.playerAttack())

    }

}

export default Attacks