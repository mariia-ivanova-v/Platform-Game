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

    IMAGES_DEAD = [
        'img/slimes/green/dead/tile000.png',
        'img/slimes/green/dead/tile001.png',
        'img/slimes/green/dead/tile002.png'
    ]

    IMAGES_ATACK = [
        'img/slimes/green/atack/tile000.png',
        'img/slimes/green/atack/tile001.png',
        'img/slimes/green/atack/tile002.png',
        'img/slimes/green/atack/tile003.png'
    ]
    dead = false;
    //ctx.rect(this.x+40, this.y+110, this.width-80,this.height-110);

    constructor(){
        super().loadImage('img/slimes/green/idle/tile000.png');
        this.loadImages(this.IMAGES_ATACK);
        this.loadImages(this.IMAGES_DEAD);
        this.width = 150;
        this.height = 150;
        this.y = 205;

        this.x = 200 + Math.random()*500;
        this.loadImages(this.IMAGES_WALKING);
        this.animate();
    }

    animate(){
        if(!this.dead){
        setInterval(() => {
            this.playAnimation(this.IMAGES_WALKING);
        }, 100)
        this.moveLeft();
        }else{
            console.log('Slime is killed')
            this.playAnimation(this.IMAGES_DEAD);
            
        }
        //this.updateCollisionBox()
/*
            if(this.isHurt){
            this.playAnimation(this.IMAGES_ATACK);
            }*/
        
    }
    die(){
        this.dead = true;
        this.playAnimation(this.IMAGES_DEAD);
    }
    

}