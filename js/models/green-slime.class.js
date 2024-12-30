class GreenSlime extends MovableObject{
    IMAGES_WALKING = [
        'img/slimes/green/walk/tile000.png',
        'img/slimes/green/walk/tile001.png',
        'img/slimes/green/walk/tile002.png',
        'img/slimes/green/walk/tile003.png',
        'img/slimes/green/walk/tile004.png',
        'img/slimes/green/walk/tile005.png',
        'img/slimes/green/walk/tile006.png',
        'img/slimes/green/walk/tile007.png'
    ];

    constructor(){
        super().loadImage('img/slimes/green/idle/tile000.png');
        this.width = 150;
        this.height = 150;
        this.y = 205;

        this.x = 200 + Math.random()*500;
        this.loadImages(this.IMAGES_WALKING);
        this.animate();
    }

    animate(){
        setInterval(() => {
            this.playAnimation(this.IMAGES_WALKING);
        }, 100)
        this.moveLeft();
    }
    

}