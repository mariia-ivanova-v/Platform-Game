let canvas;
let ctx;
let keyboard = new Keyboard();


function init(){
    canvas = document.getElementById('canvas');
    world = new World(canvas, keyboard);
}

function startGame(){
    const startScreen = document.getElementById('start-screen');
    startScreen.style.display = "none";
    init();
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