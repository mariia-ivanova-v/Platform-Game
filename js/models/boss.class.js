class Boss extends MovableObject{
height = 400;
width = 300;
y = -45;



    IMAGES_WALKING = [
        'img/wolf/idle/tile000.png',
        'img/wolf/idle/tile001.png',
        'img/wolf/idle/tile002.png',
        'img/wolf/idle/tile003.png',
        'img/wolf/idle/tile004.png',
        'img/wolf/idle/tile005.png',
        'img/wolf/idle/tile006.png',
        'img/wolf/idle/tile007.png'

        /* walk
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
        */
    ];
    constructor(){
        super().loadImage(this.IMAGES_WALKING[0]);
        this.loadImages(this.IMAGES_WALKING);
        this.x = 1300;
        this.animate();
        this.otherDirection = true;
    }

    animate(){
        setInterval(() => {
            this.playAnimation(this.IMAGES_WALKING);
        }, 100)
    }
}