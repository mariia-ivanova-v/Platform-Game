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

        if(boss_x-character_x < 500){
            this.boss.noticeCharacter();
            this.boss.mycharacter = true;
            this.boss.characterX = this.character_x;
            //this.boss.moveBossLeft()
        }else if(character_x - boss_x > 500){
            this.boss.mycharacter = false;
            //this.boss.returnToRight();
        }
        /*
        if(this.character.x >= 800){
            console.log('more than 800')
            this.boss.noticeCharacter();
            return true;
        }else{
            return false;
        }*/
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

//doesnt die
    checkCollisions(){
        this.level.enemies.forEach((enemy) =>{
            if(this.character.isColliding(enemy)){
                this.character.hit();
                this.statusBar.setHpPercentage(this.character.energy);
                //this.enemy.atack();
                console.log('Collision', enemy, this.character.energy);
            }else if(this.character.isUpColliding(enemy)){
                this.character.jump();
                this.enemyKilled(enemy);
                console.log(enemy + 'was killed');
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
                this.statusBar.ee;
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
        mo.drawFrame(this.ctx);
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

    enemyKilled(enemy){/*
        if (!enemy.isDead) {
            this.enemy.dead = true;
            //this.enemy.die();*/
            setTimeout(() => {
        this.level.enemies = this.level.enemies.filter(e => e !== enemy);
        console.log('Enemy killed:', enemy);
        }, 500); 
    //}
    }
    restoreResource(resource) {
        this.level.coins = this.level.coins.filter((coin) => coin !== resource);
        this.level.ammo = this.level.ammo.filter((ammo) => ammo !== resource);
        this.level.beer = this.level.beer.filter((beer) => beer !== resource);
    
        console.log('Resource collected:', resource);
    }
}