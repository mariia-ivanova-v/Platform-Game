class MovableObject {
    x = -20;
    img;
    width = 250;
    height = 250;
    imageCash = [];
    currentImage = 0;
    speed = 0.2;
    otherDirection = false;
    speedY = 0;
    acceleration = 1;

    loadImage(path){
        this.img = new Image();
        this.img.src = path;
    }

    loadImages(arr){
        arr.forEach((path) => {
            let img = new Image();
            img.src = path;
            this.imageCash[path] = img;
        });
        
    }

    applyGravity(){
        setInterval(()=> {
            if (this.isAbouveGround() || this.speedY>0){
            this.y -= this.speedY;
            this.speedY -= this.acceleration;
            }
        }, 1000/25)
    }

    isAbouveGround(){
        return this.y < 100;
    }

    moveRight() {
        console.log('moving right');
    }
    moveLeft(){
        setInterval(() => {
            this.x -= this.speed;
        }, 1000/60)
        }
        playAnimation(images){
            if(this.currentImage >= images.length){
                this.currentImage = 0;
            }
            let path = images[this.currentImage];
            this.img = this.imageCash[path];
            this.currentImage++;
        }
}