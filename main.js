const $arenas = document.querySelector('.arenas');
const $formFight = document.querySelector('.control');
const $chat = document.querySelector('.chat');
const HIT = {
    head: 30,
    body: 25,
    foot: 20,
}

const ATTACK = ['head', 'body', 'foot'];

const logs = {
    start: 'Часы показывали [time], когда [player1] и [player2] бросили вызов друг другу.',
    end: [
        'Результат удара [playerWins]: [playerLose] - труп',
        '[playerLose] погиб от удара бойца [playerWins]',
        'Результат боя: [playerLose] - жертва, [playerWins] - убийца',
    ],
    hit: [
        '[playerDefence] пытался сконцентрироваться, но [playerKick] разбежавшись раздробил копчиком левое ухо врага.',
        '[playerDefence] расстроился, как вдруг, неожиданно [playerKick] случайно раздробил грудью грудину противника.',
        '[playerDefence] зажмурился, а в это время [playerKick], прослезившись, раздробил кулаком пах оппонента.',
        '[playerDefence] чесал <вырезано цензурой>, и внезапно неустрашимый [playerKick] отчаянно размозжил грудью левый бицепс оппонента.',
        '[playerDefence] задумался, но внезапно [playerKick] случайно влепил грубый удар копчиком в пояс оппонента.',
        '[playerDefence] ковырялся в зубах, но [playerKick] проснувшись влепил тяжелый удар пальцем в кадык врага.',
        '[playerDefence] вспомнил что-то важное, но внезапно [playerKick] зевнув, размозжил открытой ладонью челюсть противника.',
        '[playerDefence] осмотрелся, и в это время [playerKick] мимоходом раздробил стопой аппендикс соперника.',
        '[playerDefence] кашлянул, но внезапно [playerKick] показав палец, размозжил пальцем грудь соперника.',
        '[playerDefence] пытался что-то сказать, а жестокий [playerKick] проснувшись размозжил копчиком левую ногу противника.',
        '[playerDefence] забылся, как внезапно безумный [playerKick] со скуки, влепил удар коленом в левый бок соперника.',
        '[playerDefence] поперхнулся, а за это [playerKick] мимоходом раздробил коленом висок врага.',
        '[playerDefence] расстроился, а в это время наглый [playerKick] пошатнувшись размозжил копчиком губы оппонента.',
        '[playerDefence] осмотрелся, но внезапно [playerKick] робко размозжил коленом левый глаз противника.',
        '[playerDefence] осмотрелся, а [playerKick] вломил дробящий удар плечом, пробив блок, куда обычно не бьют оппонента.',
        '[playerDefence] ковырялся в зубах, как вдруг, неожиданно [playerKick] отчаянно размозжил плечом мышцы пресса оппонента.',
        '[playerDefence] пришел в себя, и в это время [playerKick] провел разбивающий удар кистью руки, пробив блок, в голень противника.',
        '[playerDefence] пошатнулся, а в это время [playerKick] хихикая влепил грубый удар открытой ладонью по бедрам врага.',
    ],
    defence: [
        '[playerKick] потерял момент и храбрый [playerDefence] отпрыгнул от удара открытой ладонью в ключицу.',
        '[playerKick] не контролировал ситуацию, и потому [playerDefence] поставил блок на удар пяткой в правую грудь.',
        '[playerKick] потерял момент и [playerDefence] поставил блок на удар коленом по селезенке.',
        '[playerKick] поскользнулся и задумчивый [playerDefence] поставил блок на тычок головой в бровь.',
        '[playerKick] старался провести удар, но непобедимый [playerDefence] ушел в сторону от удара копчиком прямо в пятку.',
        '[playerKick] обманулся и жестокий [playerDefence] блокировал удар стопой в солнечное сплетение.',
        '[playerKick] не думал о бое, потому расстроенный [playerDefence] отпрыгнул от удара кулаком куда обычно не бьют.',
        '[playerKick] обманулся и жестокий [playerDefence] блокировал удар стопой в солнечное сплетение.'
    ],
    draw: 'Ничья - это тоже победа!'
};

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

    return document.querySelector(`.player${this.player} .life`)

}

function renderHP () {
    
    const $div = this.elHP();
    $div.style.width = this.hp +'%'
    
}
//------------------------------------------------------------------------------------------

function showWinner (name) {
    const $loseTitle = createElement('div', 'loseTitle');
    if (!name) {
        $loseTitle.innerText = `draw!`; 
    } else {
        $loseTitle.innerText = `${name} win!`;
    }
    
    return $loseTitle
}

$arenas.appendChild(createPlayer(player1));
$arenas.appendChild(createPlayer(player2));
generateLogs('start', player1, player2);


function enemyAttack () {
    const hit = ATTACK[getRandom(3) - 1];
    const defence = ATTACK[getRandom(3) - 1];
    
    return {
        value: getRandom(HIT[hit]),
        hit,
        defence,
    }
}

function playerAttack () {

    const attack = {};

    for (let item of $formFight) {

        if (item.checked && item.name === 'hit') {
            attack.value = getRandom(HIT[item.value]);
            attack.hit = item.value;
        }

        if (item.checked && item.name === 'defence') {
            attack.defence = item.value;
        }

        item.checked = false;

    }
    return attack
}

function showResult() {
    if (player1.hp === 0 || player2.hp === 0) {
        $formFight.querySelector('.button').disabled = true;
        createReloadButton();

    }

    if (player1.hp === 0 && player2.hp > player1.hp) {
        $arenas.appendChild(showWinner(player2.name));
        generateLogs ('end', player2, player1)
    } else if (player2.hp === 0 && player1.hp > player2.hp)  {
        $arenas.appendChild(showWinner(player1.name));
        generateLogs ('end', player1, player2)
    } else if (player2.hp === 0 && player1.hp === 0){
        $arenas.appendChild(showWinner());
        generateLogs ('draw', player1, player2)
    }
}

function generateLogs (type, player1, player2, forceBlow=null) {
    let text = '';
    let el = '';
    const date = new Date();
    const normalize = (num) => (num.toString().length > 1 ? num : `0${num}`);
    switch (type) {
        case 'start':
            text = logs['start'].replace('[time]', `${normalize(date.getHours())}:${normalize(date.getMinutes())}`)
                .replace('[player1]', (player1.name).toUpperCase())
                .replace('[player2]', (player2.name).toUpperCase());
            el =`<p>${text}</p>`;
            break

        case 'hit':
            text = logs['hit'][getRandom(logs['hit'].length-1)]
                .replace('[playerKick]', (player1.name).toUpperCase())
                .replace('[playerDefence]', (player2.name).toUpperCase());
            el =`<p>${normalize(date.getHours())}:${normalize(date.getMinutes())} - ${text} -${forceBlow} [${player2.hp}/100]</p>`;
            break

        case 'defence':
            text = logs['defence'][getRandom(logs['defence'].length-1)]
                .replace('[playerKick]', (player2.name).toUpperCase())
                .replace('[playerDefence]', (player1.name).toUpperCase());
            el =`<p>${normalize(date.getHours())}:${normalize(date.getMinutes())} - ${text} </p>`;
            break

        case 'end':
            text = logs['end'][getRandom(logs['end'].length-1)]
                .replace('[playerWins]', (player1.name).toUpperCase())
                .replace('[playerLose]', (player2.name).toUpperCase());
            el =`<p>${text}</p>`;
            break

        case 'draw':
            text = logs['draw'];
            el =`<p>${text}</p>`;
            break

        default:
            console.log('unexpected error');
            break
    }

    $chat.insertAdjacentHTML('afterbegin', el);
}

$formFight.addEventListener('submit', function (e) {
    e.preventDefault();

    const enemy = enemyAttack();
    const player = playerAttack();

    if(enemy.hit !== player.defence){
        player1.changeHP(enemy.value);
        player1.renderHP();
        generateLogs ('hit', player2, player1, enemy.value)
    } else {
        generateLogs ('defence', player1, player2)
    }

    if(player.hit !== enemy.defence) {
        player2.changeHP(player.value);
        player2.renderHP();
        generateLogs ('hit', player1, player2, player.value)
    } else {
        generateLogs ('defence', player2, player1)
    }

    showResult();

})