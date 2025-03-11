class Boss extends MovableObject{
height = 400;
width = 300;
y = -45;
noticed = false;
speed = 6;
mycharacter;
characterX;
hp = 100;
atacking = false;
dead = false;


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

    IMAGES_DEAD = [
        'img/wolf/dead/tile000.png',
        'img/wolf/dead/tile000.png',
        'img/wolf/dead/tile000.png',
        'img/wolf/dead/tile000.png',
        'img/wolf/dead/tile000.png',
        'img/wolf/dead/tile001.png',
        'img/wolf/dead/tile001.png',
        'img/wolf/dead/tile001.png'
    ];

    IMAGES_HURT = [
        'img/wolf/hurt/tile000.png',
        'img/wolf/hurt/tile001.png'
    ]

    IMAGES_ATACK = [
        'img/wolf/atack/tile000.png',
        'img/wolf/atack/tile001.png',
        'img/wolf/atack/tile002.png',
        'img/wolf/atack/tile003.png'
    ];

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
        this.loadImages(this.IMAGES_ATACK);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_DEAD);
        this.x = 1300;
        this.animate();
        this.otherDirection = true;
    }

    animate(){
        setInterval(() => {
            if(this.dead == true){
                this.playAnimation(this.IMAGES_DEAD);
            }else if(this.noticed == false){
            this.playAnimation(this.IMAGES_IDLE);
            }else if(this.atacking == false){
                this.playAnimation(this.IMAGES_WALKING);
                this.walking();
            }else{
                this.playAnimation(this.IMAGES_ATACK);
            }
        }, 100)
    }

    startAtacking(){
        this.atacking = true;
    }
    stopAtacking(){
        this.atacking = false;
    }

    noticeCharacter(){
        this.noticed = true;
    }

    walking(){{
            if(this.characterX < this.x && this.x - this.characterX > 60){
                this.moveBossLeft();
            }else if(this.x < this.characterX && this.characterX - this.x > 60){
                this.moveBossRight();
            }
        }
    }
    moveBossLeft(){
        this.x -= this.speed;
        this.otherDirection = true;
    }
    moveBossRight(){
        this.x += this.speed;
        this.otherDirection = false;
    }

    shooted(){
        this.hp = this.hp - 15;
        if(this.hp <= 0){
            this.dead = true;
        }
    }
}