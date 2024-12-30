class MovableObject extends DrawableObject {
    currentImage = 0;
    speed = 0.2;
    otherDirection = false;
    speedY = 0;
    acceleration = 1;
    energy = 100;
    lastHit = 0;






    isColliding(mo){
        return this.x + this.width > mo.x &&
        this.y + this.height > mo.y &&
        this.x < mo.x &&
        this.y < mo.y + mo.height;
    }

    hit(){
        this.energy -= 10;
        if (this.energy <= 0){
            this.energy = 0;
            console.log('Dead');
        } else{
            this.lastHit = new Date().getTime();
        }
    }

    isHurt(){
        let timepassed = new Date().getTime()-this.lastHit;
        timepassed = timepassed / 1000;
        return timepassed<0.5;
    }

    isDead(){
        return this.energy == 0;
    }

    applyGravity(){
        setInterval(()=> {
            if (this.isAbouveGround() || this.speedY>0){
            this.y -= this.speedY;
            this.speedY -= this.acceleration;
            }
        }, 1000/25)
    }

    /*atack(){
        return true;
    }*/

    isAbouveGround(){
        return this.y < 100;
    }

    moveRight() {
        console.log('moving right');
    }
    moveLeft(){
        setInterval(() => {
            this.x -= this.speed;
        }, 1000/60)
        }
        playAnimation(images){
            if(this.currentImage >= images.length){
                this.currentImage = 0;
            }
            let path = images[this.currentImage];
            this.img = this.imageCash[path];
            this.currentImage++;
        }
}