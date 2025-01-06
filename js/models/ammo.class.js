class AmmoShoot extends MovableObject{
    speed = 1;
    height = 10;
    width = 30;
    x;
    y;

    constructor(x,y){
        super().loadImage('img/icons/ammo-icon-pixel.png');
        this.x = x;
        this.y = y;
        this.shoot()
        
    }

    shoot(){
        this.speedY = 10;
        this.applyGravity();
        setInterval(()=>{
            this.x += 10;
        },25)
    }
}