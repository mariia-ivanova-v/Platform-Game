class AmmoResources extends DrawableObject{
    ammoImage = 'img/icons/ammo-icon-single.png';
    
    x = 300+Math.random()*1000;
    y = 200;
    height = 40;
    width = 20;

    constructor(){
        super();
        this.loadImage(this.ammoImage);
    }
    /*
    draw(ctx) {
        ctx.drawImage(this.beerImage, this.x, this.y, this.width, this.height);
        ctx.drawImage(this.ammoImage, this.x+40, this.y , this.width, this.height);
        ctx.drawImage(this.coinImage, this.x+80, this.y, this.width, this.height);
    }*/
}