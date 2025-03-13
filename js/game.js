let canvas;
let ctx;
let keyboard = new Keyboard();
let musicOn = true;
let backgroundMusic = new Audio('./sounds/ni_idea.wav');
backgroundMusic.loop = true;
backgroundMusic.volume = 0.5;
let endMusic = new Audio('./sounds/main.wav');
endMusic.loop = true;
endMusic.volume = 0.4;




function init(){
    canvas = document.getElementById('canvas');
    world = new World(canvas, keyboard);
    setInterval(checkBoss, 100);
    setInterval(checkCharacter, 100);
}
function toggleSound(){
    const soundButton = document.getElementById('sound-button');
    if(musicOn){
        world.toogleSound(true)
        soundButton.style.content = 'url(./img/icons/no-sound.png)'
        backgroundMusic.volume = 0;
        endMusic.volume = 0;
        musicOn = false
    }else{
        world.toogleSound(false)
        soundButton.style.content = 'url(./img/icons/sound.png)'
        backgroundMusic.volume = 0.3;
        endMusic.volume = 0.3;
        musicOn = true;
    }
}

function openInfo(){
    const gameInfo = document.getElementById('game-info');
    const backgroundMain = document.getElementById('background');
    gameInfo.style.display = 'block';
    backgroundMain.style.display = 'block';
}
function closeInfo(){
    const gameInfo = document.getElementById('game-info');
    const backgroundMain = document.getElementById('background');
    gameInfo.style.display = 'none';
    backgroundMain.style.display = 'none';
}

function startGame(){
    const startScreen = document.getElementById('start-screen');
    const soundButton = document.getElementById('sound-button');
    startScreen.classList.add('d-none');
    soundButton.style.display = 'flex';
    backgroundMusic.play();
    init();
}

function reloadGame(){
    location.reload()
}

function checkBoss(){
    let bossParam = world.checkBoss();
    if(bossParam){
        setTimeout(() => {
            endGame(true)
        },700)
    }
}

function checkCharacter(){
    let characterParam = world.checkCharacter();
    if(characterParam){
        setTimeout(() => {
            endGame(false)
        },600)
    }
}

function endGame(bool){
    const endScreen = document.getElementById('end-screen');
    const endScreenH1 = document.getElementById('end-screen-h1')
    const canvas = document.getElementById('canvas');
    document.getElementById('mob-buttons').classList.add('d-none');
    document.getElementById('shoot').classList.add('d-none');
    backgroundMusic.pause();
    endMusic.play();
    if(bool){
        endScreenH1.innerText = "Victory!"
        endScreen.classList.add('victory');
    }else{
        endScreenH1.innerText = "You're dead..."
        endScreen.classList.add('lose');
    }
    endScreen.classList.remove('d-none');
    canvas.classList.add('d-none')
}

window.addEventListener('keydown', (e) =>{
    if ( e.keyCode == 68){
        keyboard.RIGHT = true;
    }
    if ( e.keyCode == 65){
        keyboard.LEFT = true;
    }
    if ( e.keyCode == 87){
        keyboard.UP = true;
    }
    if ( e.keyCode == 69){
        keyboard.SHOOT = true;
    }
    if ( e.keyCode == 32){
        keyboard.SPACE = true;
    }
})

window.addEventListener('keyup', (e) =>{
    if ( e.keyCode == 68){
        keyboard.RIGHT = false;
    }
    if ( e.keyCode == 65){
        keyboard.LEFT = false;
    }
    if ( e.keyCode == 87){
        keyboard.UP = false;
    }
    if ( e.keyCode == 69){
        keyboard.SHOOT = false;
    }
    if ( e.keyCode == 32){
        keyboard.SPACE = false;
    }
})

function mobileKeys(key, boolean){
    if(key == 'RIGHT'){
        keyboard.RIGHT = boolean;
    }
    if(key == 'LEFT'){
        keyboard.LEFT = boolean;
    }
    if(key == 'UP'){
        keyboard.UP = boolean;
    }
    if(key == 'SHOOT'){
        keyboard.SHOOT = boolean;
    }
}