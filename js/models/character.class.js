class Character extends MovableObject{
    IMAGES_WALKING = [
        'img/gangster/walk/tile000.png',
        'img/gangster/walk/tile001.png',
        'img/gangster/walk/tile002.png',
        'img/gangster/walk/tile003.png',
        'img/gangster/walk/tile004.png',
        'img/gangster/walk/tile005.png',
        'img/gangster/walk/tile006.png',
        'img/gangster/walk/tile007.png',
        'img/gangster/walk/tile008.png',
        'img/gangster/walk/tile009.png'
    ];
    world;

    constructor(){
        super().loadImage('img/gangster/idle/tile000.png')
        this.loadImages(this.IMAGES_WALKING);
        this.animate();
    }

    animate(){
        setInterval(() => {
            if(this.currentImage >= this.IMAGES_WALKING.length){
                this.currentImage = 0;
            }
            let path = this.IMAGES_WALKING[this.currentImage];
            this.img = this.imageCash[path];
            this.currentImage++;
        }, 100)
    }

    jump(){}
}