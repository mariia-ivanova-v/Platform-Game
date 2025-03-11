class Level{
    ammo;
    coins;
    beer;
    //resources;
    enemies;
    backgroundObjects;
    level_end_x = 1250;

    constructor(enemies, backgroundObjects, /*resources */ammo, coins, beer){
        this.enemies = enemies;
        this.backgroundObjects = backgroundObjects;
        //this.resources = resources;
        this.ammo = ammo;
        this.coins = coins;
        this.beer =beer;
    }
}