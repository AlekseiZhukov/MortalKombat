
export class Attacks  {
    constructor ({HIT, ATTACK, $formFight}) {
        this.HIT = HIT
        this.ATTACK = ATTACK
        this.$formFight = $formFight
        this.enemyAttackData = {}
        this.playerAttackData = {}
    }

    getRandom = (num) => Math.ceil(Math.random() * num);

    enemyAttack = () => {
        const hit = this.ATTACK[this.getRandom(this.ATTACK.length) - 1];
        const defence = this.ATTACK[this.getRandom(this.ATTACK.length) - 1];
        this.enemyAttackData.value = this.getRandom(this.HIT[hit]);
        this.enemyAttackData.hit = hit;
        this.enemyAttackData.defence = defence;
        return this.enemyAttackData

    }

    playerAttack = () => {

        for (let item of this.$formFight) {

            if (item.checked && item.name === 'hit') {
                this.playerAttackData.value = this.getRandom(this.HIT[item.value]);
                this.playerAttackData.hit = item.value;
            }

            if (item.checked && item.name === 'defence') {
                this.playerAttackData.defence = item.value;
            }

            item.checked = false;
        }
        return this.playerAttackData

    }

}

export default Attacks