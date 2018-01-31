const SEQUENCE_LENGTH = 15;
let num_correct = 0;

let playing_animation = false;
let playing_sound = false;
let animator = null;
const sprites = {};
const sequence = [];

let target_id = null;

function GameItem(group, def, col, row) {
    this.id = def.id;
    this.name = def.name;
    this.animation1 = def.animation1;
    this.animation2 = def.animation2;

    this.circle = group.create(0, 0, def.ring);
    this.sprite = group.create(0, 0, def.resource);

    this.sprite.anchor.x = this.sprite.anchor.y = 0.5;
    this.circle.anchor.x = this.circle.anchor.y = 0.5;

    this.row = row;
    this.col = col;

    this.reset();
    this.circle.position = this.sprite.position.clone();

    // Animate:
    this.circle.angle = 10 * (((row + col & 1) == 0) ? 1 : -1);
    while(Math.abs(this.circle.angle) < 1) this.circle.angle *= 10;
    this.tween = game.add.tween(this.circle)
        .to({ angle: -this.circle.angle }, 1000, 'Linear', true, 0, Number.MAX_VALUE, true);

    // Interact:
    this.circle.inputEnabled = true;
    this.circle.events.onInputDown.add(() => {
        on_sprite_click(this);
    }, this);
}

GameItem.prototype.reset = function() {
    let offset = 0;
    if((this.row & 1) === 0) {
        offset = 240;
    }
    else {
        offset = 430;
    }

    this.sprite.position.x = offset + 400 * (this.col-1);
    this.sprite.position.y = (this.row - 2) * 270 + 1080 / 2 - 90;
    this.sprite.z = 1;

    this.circle.position = this.sprite.position.clone();
    this.circle.z = 0;

    this.sprite.alpha = 1;
    this.circle.scale.set(1);
}

function get_volume_from_SNR(snr) {
    return 1.0 * Math.pow(10, snr / 20).toFixed(2);
}

const game_state = {
    create: function() {
        num_correct = 0;

        this.curr_SNR = 4;
        this.step_SNR = 2;
        this.min_SNR = -16;
        this.max_SNR = 2;

        game.add.image(0, 0, 'bg-light');
        game.add.image(1920 / 2 - 781 / 2, 1080 - 140, 'prog-bar-outline');
        this.prog_bar = game.add.image(1920 / 2 - 781 / 2, 1080 - 140, 'prog-bar-fill');
        this.prog_rect = new Phaser.Rectangle(0, 0, 781, 71);

        const prog_text_style = {
            font: "bold 32px catbirdregular",
            fill: "#2D2D2D",
            boundsAlignH: "center",
            boundsAlignV: "middle"
        };

        this.prog_text = game.add.text(0, 0, `0 / ${SEQUENCE_LENGTH}`, prog_text_style);
        this.prog_text.setTextBounds(1920 / 2 - 781 / 2, 1080 - 140, 781, 71);

        let i = 0;
        this.group = game.add.group(null, 'Game items');
        for(const game_item of game_items) {
            sprites[game_item.name] = new GameItem(this.group, game_item, (i % 4)+1, Math.floor(i / 4)+1);
            ++i;
        }

        animator = new Animator();
        animator.on_complete = on_animation_end;

        this.noise = audio_clips['noise'];

        this.current_word_index = -1;

        this.word_sequence = [];
        for(let i=0; i<Math.min(SEQUENCE_LENGTH, game_items.length); ++i) {
            this.word_sequence.push(i);
        }

        this.word_sequence = shuffle_array(this.word_sequence);

        for(let i=0; i<(SEQUENCE_LENGTH - game_items.length); ++i) {
            const choice = Math.floor(Math.random() * game_items.length);
            this.word_sequence.push(choice);
        }

        this.choose_next_word();
    },
    update: function() {
        this.group.sort('z', Phaser.Group.SORT_ASCENDING);
        animator.update();
    },
    choose_next_word: function() {
        ++this.current_word_index;

        if(this.current_word_index >= this.word_sequence.length) {
            this.noise.stop();
            game.state.start('end');
        }
        else {
            this.prog_text.setText(`${this.current_word_index+1} / ${SEQUENCE_LENGTH}`);
            this.prog_rect.width = 781 * ((this.current_word_index+1) / SEQUENCE_LENGTH);
            this.prog_bar.crop(this.prog_rect);

            target_id = this.word_sequence[this.current_word_index];

            playing_sound = true; this.noise.play();
            this.noise.fade(0, 1, 1000);

            window.setTimeout(() => {
                console.log(`${this.current_word_index+1}: Playing ${game_items[target_id].name}. Current SNR: ${this.curr_SNR}`);
                const word_sound = audio_clips[game_items[target_id].resource];
                word_sound.volume(get_volume_from_SNR(this.curr_SNR));
                word_sound.play();
                window.setTimeout(() => {
                    this.noise.fade(1, 0, 500);
                    playing_sound = false;
                }, 1200);
            }, 1250);
        }
    }
};

function set_noise_volume(vol) {
    const old_vol = game_state.noise.volume();
    game_state.noise.fade(old_vol, vol, 500);
}

function start_animation(circle) {
    game_state.noise.fade(0, 1, 750);
    animator.new_animation(circle, circle.animation1);
}

function on_animation_end(circle) {
    circle.reset();

    const old_vol = game_state.noise.volume();
    game_state.noise.fade(old_vol, 0, 500);

    window.setTimeout(() => {
        playing_animation = false;
        game_state.choose_next_word();
    }, 1500);
}

function on_sprite_click(circle) {
    if(playing_animation || playing_sound) return;

    if(circle.id === target_id) {
        ++num_correct;
        game_state.curr_SNR -= game_state.step_SNR;
        if(game_state.curr_SNR < game_state.min_SNR) {
            game_state.curr_SNR = game_state.min_SNR;
        }

        playing_animation = true;
        circle.circle.z = 100;
        const center = game.add.tween(circle.circle)
            .to({ x: 1920/2, y: 1080/2 }, 500, 'Linear', true);

        const fade = game.add.tween(circle.sprite)
            .to({ alpha: 0 }, 250, 'Linear', true);

        const enlarge = game.add.tween(circle.circle.scale)
            .to({ x: 12, y: 12 }, 500, 'Linear', true)
            .onComplete.add(() => { start_animation(circle); });
    }
    else {
        game_state.curr_SNR += game_state.step_SNR;
        if(game_state.curr_SNR > game_state.max_SNR) {
            game_state.curr_SNR = game_state.max_SNR;
        }

        circle.sprite.angle = 20;
        const shake = game.add.tween(circle.sprite)
            .to({ angle: -circle.sprite.angle }, 50, 'Linear', true, 0, 0, true);

        shake.onComplete.add(() => {
            circle.sprite.angle = 0;
            window.setTimeout(() => {
                game_state.choose_next_word();
            }, 1000);
        });
    }
}

