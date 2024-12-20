class MovableObject {
    x = -20;
    y = 105;
    img;
    width = 250;
    height = 250;
    imageCash = [];
    currentImage = 0;
    speed = 0.2;

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

    moveRight() {
        console.log('moving right');
    }
    moveLeft(){
        setInterval(() => {
            this.x -= this.speed;
        }, 1000/60)
        }
}