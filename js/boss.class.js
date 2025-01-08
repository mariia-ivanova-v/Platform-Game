class Boss extends MovableObject{
height = 400;
width = 300;
y = -45;
noticed = false;
speed = 0.1;
mycharacter;
characterX;
hp = 100;


    IMAGES_IDLE = [
        'img/wolf/idle/tile000.png',
        'img/wolf/idle/tile001.png',
        'img/wolf/idle/tile002.png',
        'img/wolf/idle/tile003.png',
        'img/wolf/idle/tile004.png',
        'img/wolf/idle/tile005.png',
        'img/wolf/idle/tile006.png',
        'img/wolf/idle/tile007.png'
    ]

    IMAGES_WALKING = [
        "img/wolf/walk/tile000.png",
        "img/wolf/walk/tile001.png",
        "img/wolf/walk/tile002.png",
        "img/wolf/walk/tile003.png",
        "img/wolf/walk/tile004.png",
        "img/wolf/walk/tile005.png",
        "img/wolf/walk/tile006.png",
        "img/wolf/walk/tile007.png",
        "img/wolf/walk/tile008.png",
        "img/wolf/walk/tile009.png",
        "img/wolf/walk/tile010.png"
        
    ];
    constructor(){
        super().loadImage(this.IMAGES_WALKING[0]);
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_IDLE);
        this.x = 1300;
        this.animate();
        this.otherDirection = true;
    }

    animate(){
        setInterval(() => {
            if(this.noticed == false){
            this.playAnimation(this.IMAGES_IDLE);
            }else{
                this.playAnimation(this.IMAGES_WALKING);
                this.walking();
            }
        }, 100)
    }

    noticeCharacter(){
        this.noticed = true;
    }

    walking(){/*
        setInterval(() => {
            let mycharacterX = this.characterX;
            if(this.x-mycharacterX > 500){
                this.moveBossLeft();
            }else if(mycharacterX - this.x > 500){
                this.moveBossRight();
            }
        },25)*/
        
        setInterval(()=>{
            if(this.mycharacter){
                this.moveBossLeft();
            }else if(!this.mycharacter){
                this.moveBossRight();
            }
        },60)
    }
    moveBossLeft(){
        this.x -= this.speed;
        console.log('go left');
    }
    moveBossRight(){
        this.x += this.speed;
        console.log('go right')
    }
/*
    moveBossLeft(){
        setInterval(() => {
            this.x -= this.speed;
            console.log('go left')
        }, 1000/60)
    }
    returnToRight(){
        setInterval(() => {
            this.x += this.speed;
            console.log('go right')
        }, 1000/60)
    }*/

}