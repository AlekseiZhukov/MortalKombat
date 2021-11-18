const $arenas = document.querySelector('.arenas');
//const $randomButton = document.querySelector('.button');
const $formFight = document.querySelector('.control')

const HIT = {
    head: 30,
    body: 25,
    foot: 20,
}

const ATTACK = ['head', 'body', 'foot'];


const player1 = {
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

const player2 = {
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

//вспомогательные функции-------------------------------------------------------------------

function createElement (element, classname) {
    const $elem = document.createElement(element);
    if (classname) {
        $elem.classList.add(classname);
    }
    
    return $elem;
}

function getRandom (num) {

    return Math.ceil(Math.random() * num)

}

//-------------------------------------------------------------------------------------------

//функции создания элементов----------------------------------------------------------------

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

function createReloadButton () {
    const $reloadWrap = createElement('div', 'reloadWrap');
    const $buttonRestart = createElement('button', 'button');

    $buttonRestart.innerText = 'Restart';

    $buttonRestart.addEventListener('click', function () {
        window.location.reload()
        });

    $reloadWrap.appendChild($buttonRestart);
    $arenas.appendChild($reloadWrap)
}

//------------------------------------------------------------------------------



//функции методов объектов-------------------------------------------------------

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
    const $el = document.querySelector(`.player${this.player} .life`)
    return $el
}

function renderHP () {
    
    const $div = this.elHP();
    $div.style.width = this.hp +'%'
    
}
//------------------------------------------------------------------------------------------

function showWiner (name) {
    const $loseTitle = createElement('div', 'loseTitle');
    if (!name) {
        $loseTitle.innerText = `draw!`; 
    } else {
        $loseTitle.innerText = `${name} win!`;
    }
    
    return $loseTitle
}


/*$randomButton.addEventListener('click', function () {

    player1.changeHP(getRandom(20));
    player1.renderHP();
    
    player2.changeHP(getRandom(20));
    player2.renderHP();

    if (player1.hp === 0 || player2.hp === 0) {
        $randomButton.disabled = true;
        createReloadButton();
    }

    if (player1.hp === 0 && player2.hp > player1.hp) {
        $arenas.appendChild(showWiner(player2.name));
    } else if (player2.hp === 0 && player1.hp > player2.hp)  {
        $arenas.appendChild(showWiner(player1.name));
    } else if (player2.hp === 0 && player1.hp === 0){
        $arenas.appendChild(showWiner());
    }
    
    
});
*/


$arenas.appendChild(createPlayer(player1));
$arenas.appendChild(createPlayer(player2));

function enemyAttack () {
    const hit = ATTACK[getRandom(3) - 1];
    const defence = ATTACK[getRandom(3) - 1];
    console.log('hit', hit);
    console.log('defence', defence)
}

$formFight.addEventListener('click', function (e) {
    e.preventDefault();
    enemyAttack ()
})