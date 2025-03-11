class Coins extends DrawableObject{
    coinImage = 'img/icons/gold-coin.svg';
    x = 150+Math.random()*1000;
    y = 150;
    height = 30;
    width = 30;

    constructor(){
        super();
        this.loadImage(this.coinImage);
    }
}