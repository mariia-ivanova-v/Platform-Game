class World{
    character = new Character();
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
        }, 300)
    }

    checkShootAmmo(){
        if(this.keyboard.SHOOT){
            let ammo = new AmmoShoot(this.character.x+150, this.character.y+110);
            this.ammoShoot.push(ammo);
        }
    }

    checkCollisions(){
        this.level.enemies.forEach((enemy) =>{
            if(this.character.isColliding(enemy)){
                this.character.hit();
                this.statusBar.setHpPercentage(this.character.energy);
                //this.enemy.atack();
                console.log('Collision', enemy, this.character.energy);
            }
        })
    }

    draw(){
        this.ctx.clearRect(0,0,this.character.width, this.character.height);
        this.ctx.translate(this.camera_x,0);

        this.addObjectsToMap(this.level.backgroundObjects);
        
        this.ctx.translate(-this.camera_x,0);
        this.addToMap(this.statusBar);
        this.ctx.translate(this.camera_x,0);
        this.addToMap(this.character);
        this.addObjectsToMap(this.level.enemies);
        this.addObjectsToMap(this.ammoShoot);

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
}