let canvas;
let ctx;
let keyboard = new Keyboard();




function init(){
    canvas = document.getElementById('canvas');
    world = new World(canvas, keyboard);
    setInterval(checkBoss, 100);
    setInterval(checkCharacter, 100);
}

function startGame(){
    const startScreen = document.getElementById('start-screen');
    startScreen.classList.add('d-none');
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