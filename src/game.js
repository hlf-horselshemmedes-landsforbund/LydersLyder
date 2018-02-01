const SEQUENCE_LENGTH = 15;
let num_correct = 0;
const TIME_BEFORE_TIMER = 8;    // In seconds
const TIMER_DURATION = 8;       // in seconds.

let waiting_for_choice = false;
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
        offset = 160;
    }
    else {
        offset = 287;
    }

    this.sprite.position.x = offset + 270 * (this.col-1);
    this.sprite.position.y = (this.row - 2) * 180 + game.height / 2 - 50;
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
        this.max_SNR = 6;

        game.add.image(0, 0, 'bg-light');
        game.add.image(game.width / 2 - 515 / 2, game.height - 100, 'prog-bar-outline');
        this.prog_bar = game.add.image(game.width / 2 - 515 / 2, game.height - 100, 'prog-bar-fill');
        this.prog_rect = new Phaser.Rectangle(0, 0, 515, 47);

        const prog_text_style = {
            font: "bold 30px catbirdregular",
            fill: "#2D2D2D",
            boundsAlignH: "center",
            boundsAlignV: "middle"
        };

        this.prog_text = game.add.text(0, 0, `0 / ${SEQUENCE_LENGTH}`, prog_text_style);
        this.prog_text.setTextBounds(game.width / 2 - 515 / 2, game.height - 100, 515, 47);

        let i = 0;
        this.group = game.add.group(null, 'Game items', true);
        for(const game_item of game_items) {
            sprites[game_item.name] = new GameItem(this.group, game_item, (i % 4)+1, Math.floor(i / 4)+1);
            ++i;
        }

        animator = new Animator();
        animator.on_complete = on_animation_end;

        this.noise = audio_clips['noise'];

        this.word_start_time = 0;
        this.timer = {
            graphics: game.add.graphics(),
            x: 64,
            y: game.height + 64,
            fill: 0,
            shown: false
        };

        this.current_word_index = -1;

        this.word_sequence = generate_word_sequence();

        this.choose_next_word();
    },
    update: function() {
        this.group.sort('z', Phaser.Group.SORT_ASCENDING);
        animator.update();

        if(waiting_for_choice) {
            const time_passed = (performance.now() - this.word_start_time) / 1000.0;
            if(time_passed >= (TIME_BEFORE_TIMER + TIMER_DURATION)) {
                this.hide_timer();

                this.curr_SNR += this.step_SNR;
                if(this.curr_SNR > this.max_SNR) {
                    this.curr_SNR = this.max_SNR;
                }

                // TODO(istarnion): Play transition

                waiting_for_choice = false;
                this.choose_next_word();
            }
            else if(time_passed > TIME_BEFORE_TIMER) {
                if(!this.timer.shown) {
                    game.add.tween(this.timer)
                        .to({ y: game.height - 64 }, 500, Phaser.Easing.Elastic.Out, true);
                    this.timer.shown = true;
                }

                this.timer.fill = (time_passed - TIME_BEFORE_TIMER) / TIMER_DURATION;
                if(this.timer.fill > 1) this.timer.fill = 1;
            }
        }

        this.timer.graphics.clear();
        this.timer.graphics.beginFill(0x96CFD2);
        this.timer.graphics.drawCircle(this.timer.x, this.timer.y, 68);
        this.timer.graphics.endFill();
        this.timer.graphics.beginFill(0xFFFFFF);
        this.timer.graphics.arc(
            this.timer.x, this.timer.y, 32,
            Math.PI / -2,
            Math.PI / -2 + (2*Math.PI * this.timer.fill),
            true);
        this.timer.graphics.endFill();
    },
    choose_next_word: function() {
        ++this.current_word_index;
        this.hide_timer();

        if(this.current_word_index >= this.word_sequence.length) {
            this.noise.stop();
            game.state.start('end');
        }
        else {
            this.prog_text.setText(`${this.current_word_index+1} / ${SEQUENCE_LENGTH}`);
            this.prog_rect.width = 515 * ((this.current_word_index+1) / SEQUENCE_LENGTH);
            this.prog_bar.crop(this.prog_rect);

            target_id = this.word_sequence[this.current_word_index];

            this.noise.play();
            this.noise.fade(0, 1, 1000);

            window.setTimeout(() => {
                console.log(`${this.current_word_index+1}: Playing ${game_items[target_id].name}. Current SNR: ${this.curr_SNR}`);
                const word_sound = audio_clips[game_items[target_id].resource];
                word_sound.volume(get_volume_from_SNR(this.curr_SNR));
                word_sound.play();
                this.word_start_time = performance.now();
                waiting_for_choice = true;
                window.setTimeout(() => {
                    this.noise.fade(1, 0, 500);
                }, 1200);
            }, 1250);
        }
    },
    hide_timer: function() {
        game.add.tween(this.timer)
            .to({ y: game.height + 64 }, 500, Phaser.Easing.Elastic.In, true);
        this.timer.shown = false;
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
        game_state.choose_next_word();
    }, 1500);
}

function on_sprite_click(circle) {
    if(!waiting_for_choice) return;
    waiting_for_choice = false;

    if(circle.id === target_id) {
        ++num_correct;
        game_state.curr_SNR -= game_state.step_SNR;
        if(game_state.curr_SNR < game_state.min_SNR) {
            game_state.curr_SNR = game_state.min_SNR;
        }

        circle.circle.z = 100;
        const center = game.add.tween(circle.circle)
            .to({ x: game.width/2, y: game.height/2 }, 500, 'Linear', true);

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

        // TODO(istarnion): Play transition

        shake.onComplete.add(() => {
            circle.sprite.angle = 0;
            window.setTimeout(() => {
                game_state.choose_next_word();
            }, 1000);
        });
    }
}

function generate_word_sequence() {
    const word_sequence = [];

    for(let i=0; i<Math.min(SEQUENCE_LENGTH, game_items.length); ++i) {
        word_sequence.push(i);
    }

    shuffle_array(word_sequence);

    const num_remaining = SEQUENCE_LENGTH - game_items.length;

    for(let i=num_remaining-1; i>=0; --i) {
        word_sequence.push(word_sequence[i]);
    }

    return word_sequence;
}

