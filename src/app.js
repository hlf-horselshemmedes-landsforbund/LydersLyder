var game = null;

window.onload = () => {
    game = new Phaser.Game(
        1280, 720,
        Phaser.CANVAS,
        'game-container',
        { preload: preload, create: create });
};

const audio_clips = {};

function load_image(img, ext = 'png') {
    game.load.image(img, `images/${img}.${ext}`);
}

function load_audio(name, file) {
    const sound = new Howl({
        src: [ file ],
        autoplay: false,
        loop: false
    });

    audio_clips[name] = sound;
}

const loading_state = {
    preload: function() {
        game.add.sprite(0, 0, 'bg-light-blank');
        const load_bar_frame = game.add.sprite(game.world.centerX - 515 / 2, game.world.centerY - 47 / 2, 'prog-bar-outline');
        const load_bar_fill = game.add.sprite(game.world.centerX - 515 / 2, game.world.centerY - 47 / 2, 'prog-bar-fill');

        game.load.setPreloadSprite(load_bar_fill);

        load_image('bg-light');

        load_image('version_img');

        load_image('logo-lyderslyder');
        load_image('btn-start');
        load_image('btn-reload');

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

        for(let i=0; i<10; ++i) {
            const filename = `images/transition/animspa-transition-${left_pad_string(i+1, 2)}.png`
            const name = `transition-${i}`;
            game.load.image(name, filename);
        }

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

        load_audio('noise', 'audio/Noise_1.wav');

        load_audio('lyse_kasser', 'audio/lyse_kasser.wav');
        load_audio('lyse_knapper', 'audio/lyse_knapper.wav');
        load_audio('lyse_kurver', 'audio/lyse_kurver.wav');
        load_audio('lyse_luer', 'audio/lyse_luer.wav');
        load_audio('lyse_penner', 'audio/lyse_penner.wav');
        load_audio('lyse_ringer', 'audio/lyse_ringer.wav');
        load_audio('morke_kasser', 'audio/morke_kasser.wav');
        load_audio('morke_knapper', 'audio/morke_knapper.wav');
        load_audio('morke_kurver', 'audio/morke_kurver.wav');
        load_audio('morke_luer', 'audio/morke_luer.wav');
        load_audio('morke_penner', 'audio/morke_penner.wav');
        load_audio('morke_ringer', 'audio/morke_ringer.wav');

        game.state.add('menu', menu_state);
        game.state.add('game', game_state);
        game.state.add('end', end_state);
    },
    create: function() {
        game.state.start('menu');
    }
};

function preload() {
    game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    game.scale.align(true, true);
    game.scale.refresh();

    load_image('bg-light-blank');
    load_image('prog-bar-outline');
    load_image('prog-bar-fill');

    game.state.add('loading', loading_state);
}

function create() {
    game.state.start('loading');
}

