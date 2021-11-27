export class Player {

	constructor ({player, name, img, hp = 100}) {
		this.player = player,
		this.name = name,
		this.hp = hp,
		this.img = img
	}

	attack = () => {

    console.log(this.name + ', Fight...');

	}

	changeHP =  (num) => {
	    
	    if (this.hp > 0) {
	        this.hp -= num;
	    } 

	    if (this.hp <= 0) {
	        this.hp = 0;
	    }
	}

	elHP = () => {

	    return document.querySelector(`.player${this.player} .life`);

	}

	renderHP = () => {
	    
	    const $div = this.elHP();
	    $div.style.width = this.hp +'%';
	    
	}
}

export default Player;