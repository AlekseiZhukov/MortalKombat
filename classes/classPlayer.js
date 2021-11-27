import {createElement} from '../utils.js'

export class Player {

	constructor ({player, name, hp, img, rootSelector}) {
		this.player = player
		this.name = name
		this.hp = hp
		this.img = img
		this.rootSelector = rootSelector
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

	createPlayer = () => {

		const $player = createElement('div', `player${this.player}`);
		const $progressbar = createElement('div', 'progressbar');
		const $character = createElement('div', 'character');
		const $life = createElement('div', 'life');
		const $name = createElement('div', 'name');
		const $img = createElement('img');

		$life.style.width = `${this.hp}%`;
		$name.innerText = this.name;
		$img.src = this.img;

		$progressbar.appendChild($name)
		$progressbar.appendChild($life)

		$character.appendChild($img)

		$player.appendChild($progressbar)
		$player.appendChild($character)

		return $player;

	}
}

export default Player;