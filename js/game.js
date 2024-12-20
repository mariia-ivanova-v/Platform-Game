let canvas;
let ctx;
let keyboard = new Keyboard();


function init(){
    canvas = document.getElementById('canvas');
    world = new World(canvas, keyboard)
    

    console.log('My character is', keyboard)
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
        keyboard.THROW = true;
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
        keyboard.THROW = false;
    }
    if ( e.keyCode == 32){
        keyboard.SPACE = false;
    }
})