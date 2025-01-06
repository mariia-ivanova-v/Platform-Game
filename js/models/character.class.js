class Character extends MovableObject{
    IMAGES_JUMPING = [
        'img/gangster/jump/tile000.png',
        'img/gangster/jump/tile001.png',
        'img/gangster/jump/tile002.png',
        'img/gangster/jump/tile003.png',
        'img/gangster/jump/tile004.png',
        'img/gangster/jump/tile005.png',
        'img/gangster/jump/tile006.png',
        'img/gangster/jump/tile007.png',
        'img/gangster/jump/tile008.png',
        'img/gangster/jump/tile009.png'
    ];
    
    IMAGES_WALKING = [
        'img/gangster/walk/tile000.png',
        'img/gangster/walk/tile001.png',
        'img/gangster/walk/tile002.png',
        'img/gangster/walk/tile003.png',
        'img/gangster/walk/tile004.png',
        'img/gangster/walk/tile005.png',
        'img/gangster/walk/tile006.png',
        'img/gangster/walk/tile007.png',
        'img/gangster/walk/tile008.png',
        'img/gangster/walk/tile009.png'
    ];

    IMAGES_DEAD = [
        'img/gangster/death/tile000.png',
        'img/gangster/death/tile000.png',
        'img/gangster/death/tile001.png',
        'img/gangster/death/tile001.png',
        'img/gangster/death/tile002.png',
        'img/gangster/death/tile002.png',
        'img/gangster/death/tile003.png',
        'img/gangster/death/tile003.png',
        'img/gangster/death/tile004.png',
        'img/gangster/death/tile004.png',
        'img/gangster/death/tile004.png',
        'img/gangster/death/tile004.png'
    ]

    IMAGES_HURT = [
        'img/gangster/hurt/tile000.png',
        'img/gangster/hurt/tile001.png',
        'img/gangster/hurt/tile002.png',
        'img/gangster/hurt/tile003.png',
        'img/gangster/hurt/tile004.png',
    ]

    IMAGES_IDLE = [
        'img/gangster/idle/tile000.png',
        'img/gangster/idle/tile000.png',
        'img/gangster/idle/tile000.png',
        'img/gangster/idle/tile001.png',
        'img/gangster/idle/tile001.png',
        'img/gangster/idle/tile001.png',
        'img/gangster/idle/tile002.png',
        'img/gangster/idle/tile002.png',
        'img/gangster/idle/tile002.png',
        'img/gangster/idle/tile003.png',
        'img/gangster/idle/tile003.png',
        'img/gangster/idle/tile003.png',
        'img/gangster/idle/tile004.png',
        'img/gangster/idle/tile004.png',
        'img/gangster/idle/tile004.png',
        'img/gangster/idle/tile005.png',      
        'img/gangster/idle/tile005.png',        
        'img/gangster/idle/tile005.png',
        'img/gangster/idle/tile006.png',        
        'img/gangster/idle/tile006.png',
        'img/gangster/idle/tile006.png',
        'img/gangster/idle/tile007.png',
        'img/gangster/idle/tile007.png',
        'img/gangster/idle/tile007.png',
        'img/gangster/idle/tile008.png',
        'img/gangster/idle/tile008.png',
        'img/gangster/idle/tile008.png',
        'img/gangster/idle/tile009.png',
        'img/gangster/idle/tile009.png',
        'img/gangster/idle/tile009.png',
        'img/gangster/idle/tile010.png',
        'img/gangster/idle/tile010.png',
        'img/gangster/idle/tile010.png'
    ];
    world;
    speed = 0.45;
    x = -20;
    y = 39;//105
    walking_sound = new Audio('sounds/walking.wav');
    jump_sound = new Audio('sounds/jump.wav');
    character_collision_x = this.x+80;
    character_collision_y = this.y+90;
    //(this.x+80, this.y+90, this.width-180,this.height-90);
    

    constructor(){
        super().loadImage('img/gangster/idle/tile000.png');
        this.loadImages(this.IMAGES_JUMPING);
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_IDLE);
        this.loadImages(this.IMAGES_DEAD);
        this.loadImages(this.IMAGES_HURT);
        this.applyGravity();
        this.animate();

    }

    animate(){

        setInterval(() =>{
            if(this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x){
                this.x += this.speed;
                this.otherDirection = false;
            }
            if(this.world.keyboard.LEFT && this.x > -719){
                this.x -= this.speed;
                this.otherDirection = true;
            }
            if(this.world.keyboard.UP && !this.isAbouveGround()){
                this.speedY = 15;
            }

            //this.updateCollisionBox();
            this.world.camera_x = -this.x;
        }, 1000/500);

        setInterval(() => {
            this.walking_sound.pause();
            this.jump_sound.pause();
            if(this.isDead()){
                this.playAnimation(this.IMAGES_DEAD);
            }else if(this.isHurt()){
                this.playAnimation(this.IMAGES_HURT);
            }
            else{
            if(this.isAbouveGround()){
                this.playAnimation(this.IMAGES_JUMPING);
                this.jump_sound.play();
            }else{
                if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT){
                    this.playAnimation(this.IMAGES_WALKING);
                    this.walking_sound.play();

                }else{
                        this.playAnimation(this.IMAGES_IDLE);
                }
            }}
        }, 100)
    }

    jump(){}


}