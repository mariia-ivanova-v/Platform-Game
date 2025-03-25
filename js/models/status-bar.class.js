class StatusBar extends DrawableObject {
    HP_IMAGES = [
        'img/icons/line/hp/tile000.png',
        'img/icons/line/hp/tile001.png',
        'img/icons/line/hp/tile002.png',
        'img/icons/line/hp/tile003.png',
        'img/icons/line/hp/tile004.png'
    ]
    AMMO_IMAGES = [
        'img/icons/line/ammo/tile000.png',
        'img/icons/line/ammo/tile001.png',
        'img/icons/line/ammo/tile002.png',
        'img/icons/line/ammo/tile003.png',
        'img/icons/line/ammo/tile004.png'
    ]
    COINS_IMAGES = [
        'img/icons/line/coins/tile000.png',
        'img/icons/line/coins/tile001.png',
        'img/icons/line/coins/tile002.png',
        'img/icons/line/coins/tile003.png',
        'img/icons/line/coins/tile004.png'
    ]

    percentage = 100;
    coins_percentage = 0;
    ammo_percentage = 0;

    constructor() {
        super();
        this.loadImages(this.HP_IMAGES);
        this.loadImages(this.AMMO_IMAGES);
        this.loadImages(this.COINS_IMAGES);
        this.x = 30;
        this.y = 10;
        this.height = 50;
        this.width = 150;
        this.setHpPercentage(100);
        this.updateAmmo(0);
        this.updateCoins(0);
    }

    /**
     * changes hp persentage and changes hp image
     * @param {number} percentage - current hp persentage
     */
    setHpPercentage(percentage) {
        this.percentage = percentage;
        let path = this.HP_IMAGES[this.resolveImageIndex()];
        this.img = this.imageCash[path];
    }
    /**
     * increases hp persentage when player used heal and set new value
     */
    addHpPersentage() {
        this.percentage = this.percentage + 20;
        this.setHpPercentage(this.percentage);
    }

    /**
     * changes ammo persentage and changes ammo image
     */
    updateAmmo() {
        this.ammo_percentage++;
        let path = this.AMMO_IMAGES[this.resolveAmmoImageIndex()];
        this.ammoImg = this.imageCash[path];
        return this.ammo_percentage;
    }

    /**
     * changes coins persentage and changes coins image
     * @returns current coins persentage
     */
    updateCoins() {
        this.coins_percentage++;
        let path = this.COINS_IMAGES[this.resolveCoinsImageIndex()];
        this.coinsImg = this.imageCash[path];

        return this.coins_percentage;
    }

    /**
     * draws the object on the given canvas context
     * @param ctx - canvas rendering context where the image will be drawn
     */
    draw(ctx) {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);

        ctx.drawImage(this.ammoImg, this.x + 5, this.y + this.height - 12, this.width, this.height);

        ctx.drawImage(this.coinsImg, this.x - 4, this.y + (this.height - 9) * 2, this.width, this.height);
    }

    /**
     * checks which image to use depending on player's hp
     * @returns arrays index
     */
    resolveImageIndex() {
        if (this.percentage > 75) {
            return 0;
        } else if (this.percentage > 50) {
            return 1;
        } else if (this.percentage > 25) {
            return 2;
        } else if (this.percentage > 0) {
            return 3;
        } else {
            return 4;
        }
    }

    /**
     * checks which image to use depending on ammo value
     * @returns arrays index
     */
    resolveAmmoImageIndex() {
        if (this.ammo_percentage >= 8) {
            return 0;
        } else if (this.ammo_percentage >= 6) {
            return 1;
        } else if (this.ammo_percentage >= 4) {
            return 2;
        } else if (this.ammo_percentage >= 2) {
            return 3;
        } else {
            return 4;
        }
    }

    /**
     * checks which image to use depending on coin value
     * @returns arrays index
     */
    resolveCoinsImageIndex() {
        if (this.coins_percentage >= 8) {
            return 0;
        } else if (this.coins_percentage >= 6) {
            return 1;
        } else if (this.coins_percentage >= 4) {
            return 2;
        } else if (this.coins_percentage >= 2) {
            return 3;
        } else {
            return 4;
        }
    }

    /**
     * checks if player has any ammo
     * @returns true if player has, otherwise false
     */
    checkAmmo() {
        if (this.ammo_percentage > 0) {
            this.ammo_percentage--;
            this.ammo_percentage--;
            this.updateAmmo()
            return true;
        } else {
            return false;
        }
    }
}