class MovableObject extends DrawableObject {
    currentImage = 0;
    speed = 0.2;
    otherDirection = false;
    speedY = 0;
    acceleration = 1;
    energy = 100;
    lastHit = 0;
    money = 0;
    ammo = 0;




    isCollidingBoss(boss){
        let character_collision_x = this.x+80;
        let character_collision_y = this.y+90;
        let character_collision_width = this.width-180;
        let character_collision_height = this.height-90;

        return character_collision_x + character_collision_width > boss.x &&
        character_collision_y + character_collision_height > boss.y &&
        character_collision_x > boss.x &&
        character_collision_y < boss.y + boss.height;
    }
    
    isUpColliding(mo){
        let mo_collision_x = mo.x;
        let mo_collision_y = mo.y;
        let mo_collision_height = mo.height;
        let mo_collision_width = mo.width;

        let character_collision_x = this.x+80;
        let character_collision_y = this.y+90;
        let character_collision_width = this.width-180;
        let character_collision_height = this.height-90;

        if (mo instanceof GreenSlime){
            mo_collision_x = mo.x+40;
            mo_collision_y = mo.y+110;
            mo_collision_width = mo.width-80;
            mo_collision_height = mo.height-110;
        }else if(mo instanceof BlueSlime){
            mo_collision_x = mo.x+50;
            mo_collision_y = mo.y+150;
            mo_collision_width = mo.width-110;
            mo_collision_height = mo.height-150;
        }

        return character_collision_y + character_collision_height < mo_collision_y +10 &&
        character_collision_x + character_collision_width > mo_collision_x &&
        character_collision_x < mo_collision_x;
    }

    isCollidingResource(mo){
        let character_collision_x = this.x+80;
        let character_collision_y = this.y+90;
        let character_collision_width = this.width-180;
        let character_collision_height = this.height-90;

        return character_collision_x + character_collision_width > mo.x &&
        character_collision_y + character_collision_height > mo.y &&
        character_collision_x < mo.x &&
        character_collision_y < mo.y + mo.height;
    }

        isColliding(mo){
        let mo_collision_x = mo.x;
        let mo_collision_y = mo.y;
        let mo_collision_height = mo.height;
        let mo_collision_width = mo.width;

        let character_collision_x = this.x+80;
        let character_collision_y = this.y+90;
        let character_collision_width = this.width-180;
        let character_collision_height = this.height-90;

        if (mo instanceof GreenSlime){
            mo_collision_x = mo.x+40;
            mo_collision_y = mo.y+110;
            mo_collision_width = mo.width-80;
            mo_collision_height = mo.height-110;
        }else if(mo instanceof BlueSlime){
            mo_collision_x = mo.x+50;
            mo_collision_y = mo.y+150;
            mo_collision_width = mo.width-110;
            mo_collision_height = mo.height-150;
        }
        return character_collision_x + character_collision_width > mo_collision_x &&
        character_collision_y + character_collision_height > mo_collision_y &&
        character_collision_x < mo_collision_x &&
        character_collision_y < mo_collision_y + mo_collision_height;
    }

    isCollidingShoot(shoot){
        return this.x + this.width > shoot.x && 
        this.x + this.height > shoot.y &&
        this.x < shoot.x && 
        this.y < shoot.y + shoot.height;
    }

    hit(){
        this.energy -= 10;
        if (this.energy <= 0){
            this.energy = 0;
        } else{
            this.lastHit = new Date().getTime();
        }
    }

    heal(){
        this.energy += 20;
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
    
    isAbouveGround(){
        if(this instanceof AmmoShoot){
            return true;
        }else{
        return this.y < 100;
        }
    }

    moveRight() {
        //this.updateCollisionBox();
    }
    moveLeft(){
        setInterval(() => {
            this.x -= this.speed;
            //this.updateCollisionBox();
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