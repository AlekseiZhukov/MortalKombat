const scorpion = {
    name: 'Scorpion',
    hp: 100,
    img: 'http://reactmarathon-api.herokuapp.com/assets/scorpion.gif',
    weapon: ['sword', 'shuriken', 'spear'],
    attack: function() {
        console.log(this.name + ', Fight...')
    }
}

const kitana = {
    name: 'Kitana',
    hp: 95,
    img: 'http://reactmarathon-api.herokuapp.com/assets/kitana.gif',
    weapon: ['sword', 'spear'],
    attack: function() {
        console.log(this.name + ', Fight...')
    }
}

const $arenas = document.querySelector('.arenas');

function createDivElement (element, classname) {
    const $elem = document.createElement(element);
    $elem.classList.add(classname);
    return $elem;
}


function createPlayer (elem, classname, obj) {
    
    elem.appendChild(createDivElement('div', classname));

    const $player = document.querySelector(`div.${classname}`);
    $player.appendChild(createDivElement('div',  `progressbar`));
    $player.appendChild(createDivElement('div',  `character`));

    const $progressbar =document.querySelector(`div.${classname} div.progressbar`);
    $progressbar.appendChild(createDivElement('div', `life`));
    $progressbar.appendChild(createDivElement('div', `name`));

    const $life = document.querySelector(`div.${classname} div.life`);
    $life.style.width = `${obj.hp}%`;

    const $name = document.querySelector(`div.${classname} div.name`);
    $name.innerText = obj.name;

    const $img = document.createElement('img');
    $img.src = obj.img;
    document.querySelector(`div.${classname} div.character`).appendChild($img);

}
createPlayer($arenas, 'player1', scorpion)
createPlayer($arenas, 'player2', kitana)
