export const player1 = {
    player: 1,
    name: 'Scorpion',
    hp: 100,
    img: 'http://reactmarathon-api.herokuapp.com/assets/scorpion.gif',
    weapon: ['sword', 'shuriken', 'spear'],

    changeHP,
    elHP,
    renderHP,
    attack,
}

export const player2 = {
    player: 2,
    name: 'Kitana',
    hp: 100,
    img: 'http://reactmarathon-api.herokuapp.com/assets/kitana.gif',
    weapon: ['sword', 'spear'],

    changeHP,
    elHP,
    renderHP,
    attack,
}
function attack() {

    console.log(this.name + ', Fight...')

}

function changeHP (num) {
    
    if (this.hp > 0) {
        this.hp -= num;
    } 

    if (this.hp <= 0) {
        this.hp = 0;
    }
}

function elHP () {

    return document.querySelector(`.player${this.player} .life`)

}

function renderHP () {
    
    const $div = this.elHP();
    $div.style.width = this.hp +'%'
    
}