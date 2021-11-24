import Player from './classPlayer.js'

export class Game {
    constructor(props) {

        this.$arenas = document.querySelector('.arenas');
        this.$formFight = document.querySelector('.control');
        this.player1 = new Player({player: 1, name: 'Scorpion', img: 'http://reactmarathon-api.herokuapp.com/assets/scorpion.gif'});
        this.player2 = new Player({player: 2, name: 'Kitana', img: 'http://reactmarathon-api.herokuapp.com/assets/kitana.gif'});
    }


    start = () => {
        console.log(this)
    }




}

export default Game