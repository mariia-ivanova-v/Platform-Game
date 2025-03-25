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




    /**
     * checks if player collidies boss
     * @param boss - main boss
     * @returns all collidings
     */
    isCollidingBoss(boss) {
        let character_collision_x = this.x + 90;
        let character_collision_y = this.y + 90;
        let character_collision_width = this.width - 200;
        let character_collision_height = this.height - 90;

        return character_collision_x + character_collision_width > boss.x &&
            character_collision_y + character_collision_height > boss.y &&
            character_collision_x > boss.x &&
            character_collision_y < boss.y + boss.height;
    }

    /**
     * checks if player collides slimes up
     * @param mo - enemy that collides player 
     * @returns all up collidings
     */
    isUpColliding(mo) {
        let mo_collision_x = mo.x;
        let mo_collision_y = mo.y;
        let mo_collision_height = mo.height;
        let mo_collision_width = mo.width;

        let character_collision_x = this.x + 90;
        let character_collision_y = this.y + 90;
        let character_collision_width = this.width - 200;
        let character_collision_height = this.height - 90;

        if (mo instanceof GreenSlime) {
            mo_collision_x = mo.x + 40;
            mo_collision_y = mo.y + 120;
            mo_collision_width = mo.width - 90;
            mo_collision_height = mo.height - 120;
        } else if (mo instanceof BlueSlime) {
            mo_collision_x = mo.x + 60;
            mo_collision_y = mo.y + 160;
            mo_collision_width = mo.width - 130;
            mo_collision_height = mo.height - 160;
        }

        return character_collision_y + character_collision_height < mo_collision_y + 10 &&
            character_collision_x + character_collision_width > mo_collision_x &&
            character_collision_x < mo_collision_x;
    }

    /**
     * checks if player collides current resourse
     * @param mo - current resourse
     * @returns if player collides current resourse
     */
    isCollidingResource(mo) {
        let character_collision_x = this.x + 90;
        let character_collision_y = this.y + 90;
        let character_collision_width = this.width - 200;
        let character_collision_height = this.height - 90;

        return character_collision_x + character_collision_width > mo.x &&
            character_collision_y + character_collision_height > mo.y &&
            character_collision_x < mo.x &&
            character_collision_y < mo.y + mo.height;
    }

    /**
     * checks if player collides slimes
     * @param mo - enemy that collides player 
     * @returns all collidings 
     */
    isColliding(mo) {
        let mo_collision_x = mo.x;
        let mo_collision_y = mo.y;
        let mo_collision_height = mo.height;
        let mo_collision_width = mo.width;

        let character_collision_x = this.x + 90;
        let character_collision_y = this.y + 90;
        let character_collision_width = this.width - 200;
        let character_collision_height = this.height - 90;

        if (mo instanceof GreenSlime) {
            mo_collision_x = mo.x + 40;
            mo_collision_y = mo.y + 120;
            mo_collision_width = mo.width - 90;
            mo_collision_height = mo.height - 120;
        } else if (mo instanceof BlueSlime) {
            mo_collision_x = mo.x + 60;
            mo_collision_y = mo.y + 160;
            mo_collision_width = mo.width - 130;
            mo_collision_height = mo.height - 160;
        }
        return character_collision_x + character_collision_width > mo_collision_x &&
            character_collision_y + character_collision_height > mo_collision_y &&
            character_collision_x < mo_collision_x &&
            character_collision_y < mo_collision_y + mo_collision_height;
    }

    /**
     * checks if shoot collides something
     * @param shoot - current shoot
     * @returns if shoot collides something
     */
    isCollidingShoot(shoot) {
        return this.x + this.width > shoot.x &&
            this.x + this.height > shoot.y &&
            this.x < shoot.x &&
            this.y < shoot.y + shoot.height;
    }

    /**
     * decreases player's energy
     */
    hit() {
        this.energy -= 10;
        if (this.energy <= 0) {
            this.energy = 0;
        } else {
            this.lastHit = new Date().getTime();
        }
    }

    /**
     * increases player's energy
     */
    heal() {
        this.energy += 20;
    }

    /**
     * checks if the object is still in a "hurt" state based on the time since the last hit
     * @returns true if less than 0.5 seconds have passed since the last hit, otherwise false
     */
    isHurt() {
        let timepassed = new Date().getTime() - this.lastHit;
        timepassed = timepassed / 1000;
        return timepassed < 0.5;
    }

    /**
     * checks if the entity is dead based on its energy level
     * @returns returns true if energy is 0, otherwise false
     */
    isDead() {
        return this.energy == 0;
    }

    /**
     * applies gravity
     */
    applyGravity() {
        setInterval(() => {
            if (this.isAbouveGround() || this.speedY > 0) {
                this.y -= this.speedY;
                this.speedY -= this.acceleration;
            }
        }, 1000 / 25)
    }

    /**
     * checks if player is in jump
     * @returns true if in the air, otherwise false
     */
    isAbouveGround() {
        if (this instanceof AmmoShoot) {
            return true;
        } else {
            return this.y < 100;
        }
    }

    /**
     * moves something left
     */
    moveLeft() {
        setInterval(() => {
            this.x -= this.speed;
        }, 1000 / 60)
    }

    /**
     * playes non-stop animarion
     * @param images - images that we use
     */
    playAnimation(images) {
        if (this.currentImage >= images.length) {
            this.currentImage = 0;
        }
        let path = images[this.currentImage];
        this.img = this.imageCash[path];
        this.currentImage++;
    }

}