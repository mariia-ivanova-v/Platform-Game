class BossStatus extends DrawableObject{
    BOSS_HP_IMAGES = [
        'img/icons/line/hp/tile000.png',
        'img/icons/line/hp/tile001.png',
        'img/icons/line/hp/tile002.png',
        'img/icons/line/hp/tile003.png',
        'img/icons/line/hp/tile004.png'
    ]
    x = 230;
    y = 10;
    height = 70;
    width = 400;
    hp = 100;


    constructor(){
        super();
        this.otherDirection = true;
        this.loadImages(this.BOSS_HP_IMAGES);
        this.setHpStatus(100);
    }

    setHpStatus(health){
        this.hp = health;
        let path = this.BOSS_HP_IMAGES[this.resolveImageIndex()];
        this.img = this.imageCash[path];
    }

    resolveImageIndex(){
        if(this.hp > 75){
            return 0;
        }else if(this.hp > 50){
            return 1;
        }else if(this.hp > 25){
            return 2;
        }else if(this.hp > 0){
            return 3;
        }else{
            return 4;
        }
    }
    decreaseHp(){
        this.hp = this.hp - 15;
        this.setHpStatus(this.hp);
    }
}