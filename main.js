const $arenas = document.querySelector('.arenas');
const $randomButton = document.querySelector('.button');

const player1 = {
    player: 1,
    name: 'Scorpion',
    hp: 100,
    img: 'http://reactmarathon-api.herokuapp.com/assets/scorpion.gif',
    weapon: ['sword', 'shuriken', 'spear'],
    attack: function() {
        console.log(this.name + ', Fight...')
    }
}

const player2 = {
    player: 2,
    name: 'Kitana',
    hp: 100,
    img: 'http://reactmarathon-api.herokuapp.com/assets/kitana.gif',
    weapon: ['sword', 'spear'],
    attack: function() {
        console.log(this.name + ', Fight...')
    }
}

function createElement (element, classname) {
    const $elem = document.createElement(element);
    if (classname) {
        $elem.classList.add(classname);
    }
    
    return $elem;
}

function createPlayer (objPlayer) {
    
    const $player = createElement('div', `player${objPlayer.player}`);
    const $progressbar = createElement('div', 'progressbar');
    const $character = createElement('div', 'character');
    const $life = createElement('div', 'life');
    const $name = createElement('div', 'name');
    const $img = document.createElement('img');

    $life.style.width = `${objPlayer.hp}%`;
    $name.innerText = objPlayer.name;
    $img.src = objPlayer.img;

    $progressbar.appendChild($name)
    $progressbar.appendChild($life)

    $character.appendChild($img)

    $player.appendChild($progressbar)
    $player.appendChild($character)
    
    return $player;

}


function getRandomDamageHP (num) {
    return Math.ceil(Math.random() * num)
}

function changeHP (player) {

    const $playerLife = document.querySelector(`.player${player.player} .life`);

    player.hp -= getRandomDamageHP(20);
        
    if (player.hp <= 0) {
        player.hp = 0;
    } 
    
    $playerLife.style.width = player.hp + '%';
    
}

function showWiner (name) {
    const $loseTitle = createElement('div', 'loseTitle');
    if (!name) {
        $loseTitle.innerText = `draw!`; 
    } else {
        $loseTitle.innerText = `${name} win!`;
    }
    
    return $loseTitle
}



$randomButton.addEventListener('click', function () {
    changeHP(player1);
    changeHP(player2);

    if (player1.hp === 0 || player2.hp === 0) {
        $randomButton.disabled = true;
    }

    if (player1.hp === 0 && player2.hp > player1.hp) {
        $arenas.appendChild(showWiner(player2.name));
    } else if (player2.hp === 0 && player1.hp > player2.hp)  {
        $arenas.appendChild(showWiner(player1.name));
    } else if (player2.hp === 0 && player1.hp === 0){
        $arenas.appendChild(showWiner());
    }
    
    
});



$arenas.appendChild(createPlayer(player1))
$arenas.appendChild(createPlayer(player2))
