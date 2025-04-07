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
     * checks if player collides slimes from above
     * @param mo - enemy that collides player 
     * @returns all up collidings
     */
    isUpColliding(mo) {
        let moBounds = this.getObjectBounds(mo);
        let characterBounds = this.getCharacterBounds();
        
        return this.isUpCollisionDetected(characterBounds, moBounds);
    }

    /**
    * gets the bounds of the enemy object
    * @param {MovableObject} mo - enemy object
    * @returns object with coordinates and dimensions of the enemy
    */
    getObjectBounds(mo) {
        if (mo instanceof GreenSlime) {
            return this.getGreenSlimeBounds(mo);
        } else if (mo instanceof BlueSlime) {
            return this.getBlueSlimeBounds(mo);
        }

        return {x: mo.x, y: mo.y, width: mo.width, height: mo.height};
    }

    /**
     * gets the bounds of the green slime
     * @param {GreenSlime} mo - green slime object
     * @returns object with coordinates and dimensions of the green slime
     */
    getGreenSlimeBounds(mo) {
        return {
            x: mo.x + 40,
            y: mo.y + 120,
            width: mo.width - 90,
            height: mo.height - 120
        };
    }

    /**
    * gets the bounds of the blue slime
    * @param {BlueSlime} mo - blue slime object
    * @return object with coordinates and dimensions of the blue slime
    */
    getBlueSlimeBounds(mo) {
        return {
            x: mo.x + 60,
            y: mo.y + 160,
            width: mo.width - 130,
            height: mo.height - 160
        };
    }

    /**
    * gets the bounds of the character
    * @return object with coordinates and dimensions of the character
    */
    getCharacterBounds() {
        return {
            x: this.x + 90,
            y: this.y + 90,
            width: this.width - 200,
            height: this.height - 90
        };
    }
    
    /**
    * checks if there is a collision from above
    * @param {Object} characterBounds - bounds of the character
    * @param {Object} moBounds - bounds of the enemy object
    * @returns true if collision from above happens
    */
    isUpCollisionDetected(characterBounds, moBounds) {
        return characterBounds.y + characterBounds.height < moBounds.y + 10 &&
               characterBounds.x + characterBounds.width > moBounds.x &&
               characterBounds.x < moBounds.x;
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
        let moBounds = this.getObjectBounds(mo);
        let charBounds = this.getCharacterBounds();
    
        return this.isCollisionDetected(charBounds, moBounds);
    }

    /**
     checks if there is a collision between two objects
     @param {Object} charBounds - bounds of the character
     @param {Object} moBounds - bounds of the enemy object
     @returns true if collision happens
    */
    isCollisionDetected(charBounds, moBounds) {
        return charBounds.x + charBounds.width > moBounds.x &&
               charBounds.y + charBounds.height > moBounds.y &&
               charBounds.x < moBounds.x + moBounds.width &&
               charBounds.y < moBounds.y + moBounds.height;
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