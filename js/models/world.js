class World{
    character = new Character();
    boss = new Boss();
    level = level1;
    canvas;
    ctx;
    keyboard;
    camera_x = -100;
    statusBar = new StatusBar();
    bossHP = new BossStatus();
    ammoShoot = []
    noticed = false;


    constructor(canvas, keyboard){
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard
        this.draw();
        this.setWorld();
        this.run();
    }

    /**
     * checks if boss is dead
     * @returns true or false
     */
    checkBoss(){
        if(this.boss.dead){
            return true;
        }else{
            return false;
        }
    }

    /**
     * checks if character is dead
     * @returns true or false
     */
    checkCharacter(){
        if(this.character.dead){
            return true;
        }else{
            return false;
        }
    }

    /**
     * changes sound depending on boolean
     * @param {boolean} bool - tells what to do with sound (turn on or off)
     */
    toggleSound(bool){
        this.character.toggleSound(bool);
    }

    /**
     * sets world
     */
    setWorld(){
        this.character.world = this;
    }

    /**
     * run function
     */
    run(){
        setInterval(()=> {
            this.checkCollisions();
            this.checkShootAmmo();
            this.checkCharacterX();
        }, 300)
    }

    /**
     * checks character position so that the boss can notice him
     */
    checkCharacterX(){
        let character_x = this.character.x;
        let boss_x = this.boss.x;

        if(boss_x>character_x && boss_x-character_x < 500){
            this.boss.noticeCharacter();
            this.addToMap(this.bossHP);
            this.noticed = true;
        }
        this.boss.characterX = character_x;
        if(boss_x==character_x || boss_x - character_x <60 && boss_x > character_x ||character_x > boss_x && character_x - boss_x < 60){
            this.boss.startAtacking();
        }else{
            this.boss.stopAtacking();
        }
    }
    
/**
 * checks if player has ammo and let him shoot
 */
    checkShootAmmo(){
        if(this.keyboard.SHOOT){
            let ammoAmmount = this.statusBar.checkAmmo();
            if(ammoAmmount){
                this.character.hasAmmo = true;
                setTimeout(() => {
                    let ammo = new AmmoShoot(this.character.x+200, this.character.y+110);
                    this.ammoShoot.push(ammo);  
                }, 300);
                
            }else{
                this.character.hasAmmo = false;
            }
        }
    }

    /**
     * checks collision with everything
     */
    checkCollisions(){
        this.checkBossCollision();
        this.checkShootCollision();
        this.checkEnemyCollision();      
        this.checkCoinsCollision();
        this.checkAmmoCollision();
        this.checkBeerCollision();   
    }

    /**
     * checks collision with boos
     */
    checkBossCollision(){
        if(this.character.isCollidingBoss(this.boss)){
            this.character.hit();
            this.statusBar.setHpPercentage(this.character.energy);
        }
    }

    /**
     * checks collision with shoot
     */
    checkShootCollision(){
        this.ammoShoot = this.ammoShoot.filter((shoot) => {
            if (this.boss.isCollidingShoot(shoot)) {
                this.boss.shooted();
                this.bossHP.decreaseHp();
                return false; 
            }
            return true;
        });
    }

    /**
     * checks collision with enemies
     */
    checkEnemyCollision(){
        this.level.enemies.forEach((enemy) =>{
            if(this.character.isColliding(enemy)){
                this.character.hit();
                this.statusBar.setHpPercentage(this.character.energy);
            }else if(this.character.isUpColliding(enemy)){
                this.character.jump();
                this.enemyKilled(enemy);
            }
        })
    }

    /**
     * checks collision with coins
     */
    checkCoinsCollision(){
        this.level.coins.forEach((coins)=>{
            if(this.character.isCollidingResource(coins)){
                this.restoreResource(coins);
                this.statusBar.updateCoins();
            }
        })
    }

    /**
     * checks collision with ammo
     */
    checkAmmoCollision(){
        this.level.ammo.forEach((ammo)=>{
            if(this.character.isCollidingResource(ammo)){
                this.restoreResource(ammo);
                this.statusBar.updateAmmo();
            }
        })
    }

    /**
     * checks collision with beer
     */
    checkBeerCollision(){
        this.level.beer.forEach((beer)=>{
            if(this.character.isCollidingResource(beer)){
                this.character.heal();
                this.restoreResource(beer);
                this.statusBar.addHpPersentage();
            }
        })
    }

    /**
     * draws everything in current level
     */
    draw(){
        this.ctx.clearRect(0,0,this.character.width, this.character.height);
        this.ctx.translate(this.camera_x,0);

        this.addObjectsToMap(this.level.backgroundObjects);
        this.addToMap(this.boss);
        this.ctx.translate(-this.camera_x,0);
        this.addToMap(this.statusBar);
        if(this.noticed){
            this.addToMap(this.bossHP);
        }
        this.drawTranslated()        
        let self = this;
        requestAnimationFrame(function(){
            self.draw();
        })
    }

    /**
     * draws everything that translated by camera
     */
    drawTranslated(){
        this.ctx.translate(this.camera_x,0);
        this.addToMap(this.character);
        this.addObjectsToMap(this.level.enemies);
        this.addObjectsToMap(this.ammoShoot);
        this.addObjectsToMap(this.level.ammo);
        this.addObjectsToMap(this.level.coins);
        this.addObjectsToMap(this.level.beer);
        this.ctx.translate(-this.camera_x,0);
    }

    /**
     * renders every object on the map
     * @param objects - current object that shood be drawn (character, enemy, ammo and ets.)
     */
    addObjectsToMap(objects){
        objects.forEach(o => {
            this.addToMap(o);
            })
    }

    /**
     * draws current object
     * @param {object} mo - current object that is drawing
     */
    addToMap(mo){
        if(mo.otherDirection){
            this.flipImage(mo);
        }
        mo.draw(this.ctx);
        if(mo.otherDirection){
            this.flipImageBack(mo);
        }
    }

    /**
     * changes object's x 
     * @param {object} mo - current object
     */
    flipImage(mo){
        this.ctx.save();
            this.ctx.translate(mo.width, 0);
            this.ctx.scale(-1,1);
            mo.x = mo.x * -1;
    }

    /**
     * changes object's x wenn it's rotated
     * @param {object} mo 
     */
    flipImageBack(mo){
        mo.x = mo.x * -1;
            this.ctx.restore();
    }

    /**
     * takes dead enemy away
     * @param {object} enemy - current enemy that is dead
     */
    enemyKilled(enemy){
            setTimeout(() => {
        this.level.enemies = this.level.enemies.filter(e => e !== enemy);
        }, 500); 
    
    }
    
    /**
     * restores all resources
     * @param {Object} resource 
     */
    restoreResource(resource) {
        this.level.coins = this.level.coins.filter((coin) => coin !== resource);
        this.level.ammo = this.level.ammo.filter((ammo) => ammo !== resource);
        this.level.beer = this.level.beer.filter((beer) => beer !== resource);
    }
    
}