let canvas;
let ctx;
let keyboard = new Keyboard();
let musicOn = localStorage.getItem('musicOn') !== 'false';
let backgroundMusic = new Audio('./sounds/ni_idea.wav');
backgroundMusic.loop = true;
backgroundMusic.volume = musicOn ? 0.5 : 0;
let endMusic = new Audio('./sounds/main.wav');
endMusic.loop = true;
endMusic.volume = 0.4;
let intervalIds = [];
const originalSetInterval = window.setInterval;
let gameEnded = false;




/**
 * creates everything in canvas
 */
function init() {
    stopAllIntervals();
    canvas = document.getElementById('canvas');
    renderLevel();
    createWorld();
    setInterval(checkBoss, 100);
    setInterval(checkCharacter, 100);
}

/**
 * creates new world
 */
function createWorld() {
    world = '';
    world = new World(canvas, keyboard);
}
/**
 * Overrides the default `setInterval` function, keeping track of all created interval ids.
 * @param callback - The function to be executed at the specified time interval.
 * @param {number} delay - The delay in milliseconds before executing `callback` each time.
 * @returns - The id of the created interval (can be used with `clearInterval`). 
 */
window.setInterval = function (callback, delay) {
    let id = originalSetInterval(callback, delay);
    intervalIds.push(id);
    return id;
};

/**
 * stops all known intervals
 */
function stopAllIntervals() {
    clearInterval();
    intervalIds.forEach(id => clearInterval(id));
    intervalIds = [];
}

/**
 * changes the sound depending on the 'musicOn' parameter, than changes button and saves musicOn in localStorage
 */
function toggleSound() {
    if (musicOn) {
        musicIsOn();
    } else {
        musicIsOff();
    }
    changeSoundButton()
    localStorage.setItem('musicOn', musicOn);
}

/**
 * turns all sounds off
 */
function musicIsOn() {
    world.toggleSound(true);
    backgroundMusic.volume = 0;
    endMusic.volume = 0;
    musicOn = false
}

/**
 * turns all sounds on
 */
function musicIsOff() {
    musicOn = true;
    if (!gameEnded) {
        world.toggleSound(false);
        backgroundMusic.volume = 0.3;
        backgroundMusic.play()
    }
    endMusic.volume = 0.3;
}

/**
 * changes sound button content
 */
function changeSoundButton() {
    const soundButton = document.getElementById('sound-button');
    if (musicOn) {
        soundButton.style.content = 'url(./img/icons/sound.png)'
    } else {
        soundButton.style.content = 'url(./img/icons/no-sound.png)'
    }
}

/**
 * makes info-container and background visible
 * @param {*} id - current info-container's id
 */
function openInfo(id) {
    const currentInfo = document.getElementById(id);
    const backgroundMain = document.getElementById('background');
    if (currentInfo === 'game-info') {
        currentInfo.style.display = 'block';
    } else {
        currentInfo.style.display = 'flex'
    }
    backgroundMain.style.display = 'block';
}

/**
 * makes info-containers and background unvisible
 */
function closeInfo() {
    const gameInfo = document.getElementById('game-info');
    const controlInfo = document.getElementById('control-info');
    const backgroundMain = document.getElementById('background');
    gameInfo.style.display = 'none';
    controlInfo.style.display = 'none';
    backgroundMain.style.display = 'none';
}

/**
 * prepares everything to start game
 */
function startGame() {
    removeAllScreens();
    toggleButtons();
    init();
    if (musicOn) {
        endMusic.pause();
        backgroundMusic.play();
        world.toggleSound(false);
    } else {
        world.toggleSound(true)
    }
    changeSoundButton()
    gameEnded = false;
}

/**
 * makes all small screens unvisible and canvas visible
 */
function removeAllScreens() {
    const startScreen = document.getElementById('start-screen');
    const canvas = document.getElementById('canvas');
    const endScreen = document.getElementById('end-screen');
    startScreen.classList.add('d-none');
    canvas.classList.remove('d-none');
    endScreen.classList.add('d-none');
}

/**
 * changed buttons that man can see
 */
function toggleButtons() {
    const soundButton = document.getElementById('sound-button');
    const infoButton = document.getElementById('inform');
    const controlButton = document.getElementById('control');
    infoButton.classList.add('d-none');
    controlButton.classList.add('d-none');
    soundButton.style.display = 'flex';

}

/**
 * reload website
 */
function reloadGame() {
    location.reload()
}

/**
 * checks if boss is dead and then ends game
 */
function checkBoss() {
    let bossParam = world.checkBoss();
    if (bossParam) {
        setTimeout(() => {
            endGame(true)
        }, 700)
    }
}

/**
 * checks if character is dead and then ends game
 */
function checkCharacter() {
    let characterParam = world.checkCharacter();
    if (characterParam) {
        setTimeout(() => {
            endGame(false)
        }, 600)
    }
}

/**
 * stop all game
 * makes endscreen visible, stop all intervals
 * @param {*} bool - transmits whether the player has won or not
 */
function endGame(bool) {
    const endScreen = document.getElementById('end-screen');
    const canvas = document.getElementById('canvas');
    document.getElementById('mob-buttons').classList.add('d-none');
    document.getElementById('shoot').classList.add('d-none');
    gameEnded = true;
    backgroundMusic.pause();
    checkendMusic();
    setEndText(bool, endScreen);
    stopAllIntervals();
    endScreen.classList.remove('d-none');
    canvas.classList.add('d-none')
}

/**
 * checks if music is on and than turns endmusic
 */
function checkendMusic() {
    endMusic.play();
    if (!musicOn) {
        musicIsOn();
    }
}

/**
 * set text, depends from game result
 * @param {*} bool - transmits whether the player has won
 * @param {*} endScreen - current end screen container 
 */
function setEndText(bool, endScreen) {
    const endScreenH1 = document.getElementById('end-screen-h1')
    if (bool) {
        endScreenH1.innerText = "Victory!"
        endScreen.classList.add('victory');
    } else {
        endScreenH1.innerText = "You're dead..."
        endScreen.classList.add('lose');
    }
}

/**
 * handles the `keydown` event and updates the keyboard state based on the pressed key
 */
window.addEventListener('keydown', (e) => {
    if (e.keyCode == 68) {
        keyboard.RIGHT = true;
    }
    if (e.keyCode == 65) {
        keyboard.LEFT = true;
    }
    if (e.keyCode == 87) {
        keyboard.UP = true;
    }
    if (e.keyCode == 69) {
        keyboard.SHOOT = true;
    }
    if (e.keyCode == 32) {
        keyboard.SPACE = true;
    }
})

/**
 * handles the `keyup` event and updates the keyboard state based on the released key
 */
window.addEventListener('keyup', (e) => {
    if (e.keyCode == 68) {
        keyboard.RIGHT = false;
    }
    if (e.keyCode == 65) {
        keyboard.LEFT = false;
    }
    if (e.keyCode == 87) {
        keyboard.UP = false;
    }
    if (e.keyCode == 69) {
        keyboard.SHOOT = false;
    }
    if (e.keyCode == 32) {
        keyboard.SPACE = false;
    }
})

/**
 * Updates the keyboard state for mobile controls based on the given key and boolean value
 * @param {*} key - the key to be updated ('RIGHT', 'LEFT', 'UP', 'SHOOT')
 * @param {*} boolean - the state to set (true for pressed, false for released)
 */
function mobileKeys(key, boolean) {
    if (key == 'RIGHT') {
        keyboard.RIGHT = boolean;
    }
    if (key == 'LEFT') {
        keyboard.LEFT = boolean;
    }
    if (key == 'UP') {
        keyboard.UP = boolean;
    }
    if (key == 'SHOOT') {
        keyboard.SHOOT = boolean;
    }
}