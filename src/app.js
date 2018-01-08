const game = new Phaser.Game(
    1920, 1080,
    Phaser.AUTO,
    'game-container',
    { preload: preload, create: create });


function preload() {
    game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    game.scale.align(true, true);
    game.scale.refresh();

    game.load.image('bg-white', 'images/bg-light.png');
}

function create() {
    game.add.image(0, 0, 'bg-white');
}

