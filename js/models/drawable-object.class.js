class DrawableObject {
    img;
    imageCash = [];
    x;
    y;
    width = 250;
    height = 250;


    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }

    /**
     * draws the object on the given canvas context
     * @param ctx - canvas rendering context where the image will be drawn
     */
    draw(ctx) {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }

    /**
     * draws unvisible frames for colliding checking
     * @param ctx - canvas rendering context where the image is drawn
     */
    drawFrame(ctx) {
        if (this instanceof Character) {
            this.frameCharacter(ctx);
        } else if (this instanceof BlueSlime) {
            this.frameBlueSlime(ctx);
        } else if (this instanceof GreenSlime) {
            this.frameGreenSlime(ctx);
        } else if (this instanceof Boss) {
            this.frameBoos(ctx);
        } else {
            ctx.beginPath();
            ctx.lineWidth = '5';
            ctx.strokeStyle = 'blue';
            ctx.rect(this.x, this.y, this.width, this.height);
            ctx.stroke();
        }
    }
    /**
     * draws frame for character
     * @param ctx - canvas rendering context where the image is drawn 
     */
    frameCharacter(ctx) {
        ctx.beginPath();
        ctx.lineWidth = '5';
        ctx.strokeStyle = 'blue';
        ctx.rect(this.x + 90, this.y + 90, this.width - 200, this.height - 90);
        ctx.stroke();
    }

    /**
     * draws frame for boss
     * @param ctx - canvas rendering context where the image is drawn 
     */
    frameBoos(ctx) {
        ctx.beginPath();
        ctx.lineWidth = '5';
        ctx.strokeStyle = 'blue';
        ctx.rect(this.x + 90, this.y + 110, this.width - 170, this.height - 110);
        ctx.stroke();
    }

    /**
     * draws frame for green slime
     * @param ctx - canvas rendering context where the image is drawn 
     */
    frameGreenSlime(ctx) {
        ctx.beginPath();
        ctx.lineWidth = '5';
        ctx.strokeStyle = 'blue';
        ctx.rect(this.x + 40, this.y + 120, this.width - 90, this.height - 120);
        ctx.stroke();
    }

    /**
     * draws frame for blue slime
     * @param ctx - canvas rendering context where the image is drawn 
     */
    frameBlueSlime(ctx) {
        ctx.beginPath();
        ctx.lineWidth = '5';
        ctx.strokeStyle = 'blue';
        ctx.rect(this.x + 60, this.y + 160, this.width - 130, this.height - 160);
        ctx.stroke();
    }

    /**
     * loades images and saves it in cash
     * @param {} arr 
     */
    loadImages(arr) {
        arr.forEach((path) => {
            let img = new Image();
            img.src = path;
            this.imageCash[path] = img;
        });

    }
}