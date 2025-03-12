class World{
    character = new Character();
    boss = new Boss();
    level = level1;
    canvas;
    ctx;
    keyboard;
    camera_x = -100;
    statusBar = new StatusBar();
    ammoShoot = []


    constructor(canvas, keyboard){
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard
        this.draw();
        this.setWorld();
        this.run();
    }
    checkBoss(){
        if(this.boss.dead){
            return true;
        }else{
            return false;
        }
    }
    checkCharacter(){
        if(this.character.dead){
            return true;
        }else{
            return false;
        }
    }
    toogleSound(bool){
        this.character.toogleSound(bool);
    }

    setWorld(){
        this.character.world = this;
    }

    run(){
        setInterval(()=> {
            this.checkCollisions();
            this.checkShootAmmo();
            this.checkCharacterX();
        }, 300)
    }

    checkCharacterX(){
        let character_x = this.character.x;
        let boss_x = this.boss.x;

        if(boss_x>character_x && boss_x-character_x < 500){
            this.boss.noticeCharacter();
        }
        this.boss.characterX = character_x;
        if(boss_x==character_x || boss_x - character_x <60 && boss_x > character_x ||character_x > boss_x && character_x - boss_x < 60){
            this.boss.startAtacking();
        }else{
            this.boss.stopAtacking();
        }
    }
//shoot
    checkShootAmmo(){
        if(this.keyboard.SHOOT){
            let ammoAmmount = this.statusBar.checkAmmo();
            if(ammoAmmount){
            let ammo = new AmmoShoot(this.character.x+150, this.character.y+110);
            this.ammoShoot.push(ammo);
            }
        }
    }

    checkCollisions(){
        if(this.character.isCollidingBoss(this.boss)){
            this.character.hit();
                this.statusBar.setHpPercentage(this.character.energy);
        }
        this.ammoShoot = this.ammoShoot.filter((shoot) => {
            if (this.boss.isCollidingShoot(shoot)) {
                this.boss.shooted();
                return false;
            }
            return true; 
        });
        
        this.level.enemies.forEach((enemy) =>{
            if(this.character.isColliding(enemy)){
                this.character.hit();
                this.statusBar.setHpPercentage(this.character.energy);
            }else if(this.character.isUpColliding(enemy)){
                this.character.jump();
                this.enemyKilled(enemy);
            }
        })
        this.level.coins.forEach((coins)=>{
            if(this.character.isCollidingResource(coins)){
                this.restoreResource(coins);
                this.statusBar.updateCoins();
            }
        })
        this.level.ammo.forEach((ammo)=>{
            if(this.character.isCollidingResource(ammo)){
                this.restoreResource(ammo);
                this.statusBar.updateAmmo();
            }
        })
        this.level.beer.forEach((beer)=>{
            if(this.character.isCollidingResource(beer)){
                this.character.heal();
                this.restoreResource(beer);
                this.statusBar.addHpPersentage();
            }
        })
    }

    draw(){
        this.ctx.clearRect(0,0,this.character.width, this.character.height);
        this.ctx.translate(this.camera_x,0);

        this.addObjectsToMap(this.level.backgroundObjects);
        this.addToMap(this.boss);
        this.ctx.translate(-this.camera_x,0);
        this.addToMap(this.statusBar);
        
        this.ctx.translate(this.camera_x,0);
        this.addToMap(this.character);
        this.addObjectsToMap(this.level.enemies);
        this.addObjectsToMap(this.ammoShoot);
        this.addObjectsToMap(this.level.ammo);
        this.addObjectsToMap(this.level.coins);
        this.addObjectsToMap(this.level.beer);


        this.ctx.translate(-this.camera_x,0);
        
        
        let self = this;
        requestAnimationFrame(function(){
            self.draw();
        })
    }

    addObjectsToMap(objects){
        objects.forEach(o => {
            this.addToMap(o);
            })
    }

    addToMap(mo){
        if(mo.otherDirection){
            this.flipImage(mo);
        }
        mo.draw(this.ctx);
        if(mo.otherDirection){
            this.flipImageBack(mo);
        }
        
    }

    flipImage(mo){
        this.ctx.save();
            this.ctx.translate(mo.width, 0);
            this.ctx.scale(-1,1);
            mo.x = mo.x * -1;
    }

    flipImageBack(mo){
        mo.x = mo.x * -1;
            this.ctx.restore();
    }

    enemyKilled(enemy){
            setTimeout(() => {
        this.level.enemies = this.level.enemies.filter(e => e !== enemy);
        }, 500); 
    
    }
    restoreResource(resource) {
        this.level.coins = this.level.coins.filter((coin) => coin !== resource);
        this.level.ammo = this.level.ammo.filter((ammo) => ammo !== resource);
        this.level.beer = this.level.beer.filter((beer) => beer !== resource);
    }
    
}