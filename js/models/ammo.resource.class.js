class AmmoResources extends DrawableObject{
    ammoImage = 'img/icons/ammo-icon-single.png';
    
    x = 300+Math.random()*800;
    y = 200;
    height = 40;
    width = 20;

    constructor(){
        super();
        this.loadImage(this.ammoImage);
    }
}