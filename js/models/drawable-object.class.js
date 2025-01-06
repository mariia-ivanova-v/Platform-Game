class DrawableObject{
    img;
    imageCash = [];
    x;
    y;
    width = 250;
    height = 250;
    

    loadImage(path){
        this.img = new Image();
        this.img.src = path;
    }

    draw(ctx){
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }

    drawFrame(ctx){
        if(this instanceof Character){
        ctx.beginPath();
        ctx.lineWidth = '5';
        ctx.strokeStyle = 'blue';
        ctx.rect(this.x+80, this.y+90, this.width-180,this.height-90);
        ctx.stroke();
        }
        if(this instanceof BlueSlime){
        ctx.beginPath();
        ctx.lineWidth = '5';
        ctx.strokeStyle = 'blue';
        ctx.rect(this.x+50, this.y+150, this.width-110,this.height-150);
        ctx.stroke();
        }
        if(this instanceof GreenSlime){
        ctx.beginPath();
        ctx.lineWidth = '5';
        ctx.strokeStyle = 'blue';
        ctx.rect(this.x+40, this.y+110, this.width-80,this.height-110);
        ctx.stroke();
    }}

    loadImages(arr){
        arr.forEach((path) => {
            let img = new Image();
            img.src = path;
            this.imageCash[path] = img;
        });
        
    }
}