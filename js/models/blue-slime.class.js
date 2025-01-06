class BlueSlime extends MovableObject{
        IMAGES_WALKING = [
            'img/slimes/blue/walk/tile000.png',
            'img/slimes/blue/walk/tile001.png',
            'img/slimes/blue/walk/tile002.png',
            'img/slimes/blue/walk/tile003.png',
            'img/slimes/blue/walk/tile004.png',
            'img/slimes/blue/walk/tile005.png',
            'img/slimes/blue/walk/tile006.png',
            'img/slimes/blue/walk/tile007.png'
        ];
        //ctx.rect(this.x+50, this.y+150, this.width-110,this.height-150);
    
        constructor(){
            super().loadImage('img/slimes/blue/idle/tile000.png');
            this.width = 200;
            this.height = 200;
            this.y = 155;
    
            this.x = 500 + Math.random()*500;
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