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

    const loaded_anim_frames = [];
    for(const game_item of game_items) {
        if(game_item.hasOwnProperty("animation1")) {
            const anim = game_item.animation1;

            for(let i=0; i<anim.get_num_frames(); ++i) {
                const name = anim.get_frame(i);

                if(loaded_anim_frames.indexOf(name) === -1) {
                    loaded_anim_frames.push(name);
                    load_image(name, 'jpg');
                }
            }
        }
    }

    game.load.audio('noise', 'audio/Noise_1.wav');

    game.load.audio('lyse_kasser', 'audio/lyse_kasser.wav');
    game.load.audio('lyse_knapper', 'audio/lyse_knapper.wav');
    game.load.audio('lyse_kurver', 'audio/lyse_kurver.wav');
    game.load.audio('lyse_luer', 'audio/lyse_luer.wav');
    game.load.audio('lyse_penner', 'audio/lyse_penner.wav');
    game.load.audio('lyse_ringer', 'audio/lyse_ringer.wav');
    game.load.audio('morke_kasser', 'audio/morke_kasser.wav');
    game.load.audio('morke_knapper', 'audio/morke_knapper.wav');
    game.load.audio('morke_kurver', 'audio/morke_kurver.wav');
    game.load.audio('morke_luer', 'audio/morke_luer.wav');
    game.load.audio('morke_penner', 'audio/morke_penner.wav');
    game.load.audio('morke_ringer', 'audio/morke_ringer.wav');

    game.state.add('menu', menu_state);
    game.state.add('game', game_state);
    game.state.add('end', end_state);
}

function create() {
    game.state.start('game');
}

