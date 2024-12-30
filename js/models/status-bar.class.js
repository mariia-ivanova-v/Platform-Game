class StatusBar extends DrawableObject{
    IMAGES = [
        'img/icons/line/hp/tile000.png',
        'img/icons/line/hp/tile001.png',
        'img/icons/line/hp/tile002.png',
        'img/icons/line/hp/tile003.png',
        'img/icons/line/hp/tile004.png'
    ]
    percentage = 100;

    constructor(){
        super();
        this.loadImages(this.IMAGES);
        this.x = 30;
        this.y = 10;
        this.height = 50;
        this.width = 150;
        this.setPercentage(100);
    }

    setPercentage(percentage){
        this.percentage = percentage;
        let path = this.IMAGES[this.resolveImageIndex()];
        this.img= this.imageCash[path];     
    }

    resolveImageIndex(){
        if(this.percentage > 75){
            return 0;
        }else if(this.percentage > 50){
            return 1;
        }else if(this.percentage > 25){
            return 2;
        }else if(this.percentage > 0){
            return 3;
        }else{
            return 4;
        }
    }
}