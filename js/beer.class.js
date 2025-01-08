class Beer extends DrawableObject{
    beerImage = 'img/icons/beer.png'
    x = 150+Math.random()*1000;
    y = 250;
    height = 50;
    width = 50;

    constructor(){
        super();
        this.loadImage(this.beerImage);
    }
}