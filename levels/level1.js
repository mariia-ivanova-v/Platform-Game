const level1 = new Level(
    [
        new GreenSlime(),
        new GreenSlime(),
        new GreenSlime(),
        new BlueSlime(),
        new BlueSlime(),
        new BlueSlime(),
        new BlueSlime()
    ],
    [
        new Background('img/bg/Battleground3/Bright/sky.png',-719,0),
        new Background('img/bg/Battleground3/Bright/jungle_bg.png',-719,0),
        new Background('img/bg/Battleground3/Bright/trees&bushes.png',-719,0),
        new Background('img/bg/Battleground3/Bright/grasses.png',-719,0),
        new Background('img/bg/Battleground3/Bright/grass&road.png', -719, 0),
        new Background('img/bg/Battleground3/Bright/lianas.png',-719,0),
        new Background('img/bg/Battleground3/Bright/fireflys.png',-719,0),

        new Background('img/bg/Battleground3/Bright/sky.png',0,0),
        new Background('img/bg/Battleground3/Bright/jungle_bg.png',0,0),
        new Background('img/bg/Battleground3/Bright/trees&bushes.png',0,0),
        new Background('img/bg/Battleground3/Bright/grasses.png',0,0),
        new Background('img/bg/Battleground3/Bright/grass&road.png', 0, 0),
        new Background('img/bg/Battleground3/Bright/lianas.png',0,0),
        new Background('img/bg/Battleground3/Bright/fireflys.png',0,0),

        new Background('img/bg/Battleground3/Bright/sky.png',719,0),
        new Background('img/bg/Battleground3/Bright/jungle_bg.png',719,0),
        new Background('img/bg/Battleground3/Bright/trees&bushes.png',719,0),
        new Background('img/bg/Battleground3/Bright/grasses.png',719,0),
        new Background('img/bg/Battleground3/Bright/grass&road.png', 719, 0),
        new Background('img/bg/Battleground3/Bright/lianas.png',719,0),
        new Background('img/bg/Battleground3/Bright/fireflys.png',719,0),

        new Background('img/bg/Battleground3/Bright/sky.png',719*2,0),
        new Background('img/bg/Battleground3/Bright/jungle_bg.png',719*2,0),
        new Background('img/bg/Battleground3/Bright/trees&bushes.png',719*2,0),
        new Background('img/bg/Battleground3/Bright/grasses.png',719*2,0),
        new Background('img/bg/Battleground3/Bright/grass&road.png', 719*2, 0),
        new Background('img/bg/Battleground3/Bright/lianas.png',719*2,0),
        new Background('img/bg/Battleground3/Bright/fireflys.png',719*2,0)
    ],
    [
        new AmmoResources('img/icons/ammo-icon-single.png'),
        new AmmoResources('img/icons/ammo-icon-single.png'),
        new AmmoResources('img/icons/ammo-icon-single.png'),
        new AmmoResources('img/icons/ammo-icon-single.png'),
        new AmmoResources('img/icons/ammo-icon-single.png'),
        new AmmoResources('img/icons/ammo-icon-single.png'),
        new AmmoResources('img/icons/ammo-icon-single.png'),
        new AmmoResources('img/icons/ammo-icon-single.png')
    ],
    [
        new Coins('img/icons/gold-coin.svg'),
        new Coins('img/icons/gold-coin.svg'),
        new Coins('img/icons/gold-coin.svg'),
        new Coins('img/icons/gold-coin.svg'),
        new Coins('img/icons/gold-coin.svg'),
        new Coins('img/icons/gold-coin.svg'),
        new Coins('img/icons/gold-coin.svg'),
        new Coins('img/icons/gold-coin.svg')
    ],
    [
        new Beer('img/icons/beer.png'),
        new Beer('img/icons/beer.png')
    ]
);