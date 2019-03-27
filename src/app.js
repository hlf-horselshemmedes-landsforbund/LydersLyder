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
    game.load.image(img, `images/${img}.${ext}`); }

function load_audio(name, file, loop = false) {
    const sound = new Howl({
        src: [ file ],
        autoplay: false,
        loop: loop
    });

    audio_clips[name] = sound;
}

const loading_state = {
    preload: function() {
        const load_bar_frame = game.add.sprite(game.world.centerX - 515 / 2, game.world.centerY - 47 / 2, 'prog-bar-outline');
        const load_bar_fill = game.add.sprite(game.world.centerX - 515 / 2, game.world.centerY - 47 / 2, 'prog-bar-fill');

        game.load.setPreloadSprite(load_bar_fill);
        game.add.image(game.world.centerX-305, game.height-130, 'LYDERSLYDER-merking');

        load_image('bg-light');
        load_image('version_img');
        load_image('waterfall_border');
        game.load.atlas('sprites', 'images/atlas.png', 'images/atlas.json');

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
                        load_image(name);
                    }
                }
            }

            if(game_item.hasOwnProperty("animation2")) {
                const anim = game_item.animation2;

                for(let i=0; i<anim.get_num_frames(); ++i) {
                    const name = anim.get_frame(i);

                    if(loaded_anim_frames.indexOf(name) === -1) {
                        loaded_anim_frames.push(name);
                        load_image(name);
                    }
                }
            }
        }

        game.load.spritesheet('clap', 'images/clap/clap.png', 512, 512);
        game.load.spritesheet('waterfall', 'images/waterfall.png', 256, 256);
        game.load.spritesheet('sound_toggle', 'images/sound-toggle.png', 48, 48);

        load_audio('noise', 'audio/Noise_1-6dB.wav', true);
        load_audio('sine', 'audio/1kHz0dB.wav');
        load_audio('100Hz', 'audio/100Hz0dB.wav');
        load_audio('1kHz_pulsed', 'audio/1kHz0dB_pulsed.wav');

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
        game.state.add('parent', parent_state);
        // NOTE(istarnion): Uncomment to enable the 'science' view. Also edit end.js and the Makefile
        // game.state.add('science', science_state);
    },

    create: function() {
        game.state.start('menu');
    }
};

function preload() {
    game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    game.scale.align(true, true);
    game.scale.refresh();

    game.stage.backgroundColor = "#FFF";
    game.stage.disableVisibilityChange = true;

    load_image('LYDERSLYDER-merking');
    load_image('prog-bar-outline');
    load_image('prog-bar-fill');

    game.state.add('loading', loading_state);
}

function create() {
    game.state.start('loading');
}

