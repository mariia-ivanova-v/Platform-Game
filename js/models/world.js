class World{
    character = new Character();
    enemies = [
        new GreenSlime(),
        new GreenSlime(),
        new GreenSlime()
    ]
    backgroundObjects = [
        new Background('img/bg/Battleground3/Bright/sky.png',0,0),
        new Background('img/bg/Battleground3/Bright/jungle_bg.png',0,0),
        new Background('img/bg/Battleground3/Bright/trees&bushes.png',0,0),
        new Background('img/bg/Battleground3/Bright/grasses.png',0,0),
        new Background('img/bg/Battleground3/Bright/grass&road.png', 0, 0),
        new Background('img/bg/Battleground3/Bright/lianas.png',0,0),
        new Background('img/bg/Battleground3/Bright/fireflys.png',0,0)
    ]
    canvas;
    ctx;
    keyboard;

    constructor(canvas){
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard
        this.draw();
        this.setWorld();
    }

    setWorld(){
        this.character.world = this;
    }

    draw(){
        this.ctx.clearRect(0,0,this.character.width, this.character.height);
        this.addObjectsToMap(this.backgroundObjects);
        this.addToMap(this.character);
        this.addObjectsToMap(this.enemies);
        
        
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
        this.ctx.drawImage(mo.img, mo.x, mo.y, mo.width, mo.height);
        
    }
}