const game = new Phaser.Game(
    1920, 1080,
    Phaser.CANVAS,
    'game-container',
    { preload: preload, create: create });

function load_image(img, ext = 'png') {
    game.load.image(img, `images/${img}.${ext}`);
}

function preload() {
    game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    game.scale.align(true, true);
    game.scale.refresh();

    load_image('bg-light');

    load_image('circle-01');
    load_image('circle-02');
    load_image('circle-03');

    load_image('lyse_kasser');
    load_image('lyse_knapper');
    load_image('lyse_kurver');
    load_image('lyse_luer');
    load_image('lyse_penner');
    load_image('lyse_ringer');

    load_image('morke_kasser');
    load_image('morke_knapper');
    load_image('morke_kurver');
    load_image('morke_luer');
    load_image('morke_penner');
    load_image('morke_ringer');

    game.state.add('menu', menu_state);
    game.state.add('game', game_state);
}

function create() {
    game.state.start('game');
}

