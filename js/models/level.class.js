class Level{
    ammo;
    coins;
    beer;
    enemies;
    backgroundObjects;
    level_end_x = 1250;

    constructor(enemies, backgroundObjects, ammo, coins, beer){
        this.enemies = enemies;
        this.backgroundObjects = backgroundObjects;
        this.ammo = ammo;
        this.coins = coins;
        this.beer =beer;
    }
}