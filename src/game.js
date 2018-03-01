let final_score = 0;
let game_log = [];
let tester_ID = 0;

let waiting_for_choice = false;
let animator = null;
const sprites = {};
const sequence = [];

let target_id = null;

const test_mode = true; // Set this to true to remove the noise, and replace all words with a sine wave

function LogWord(target, snr, result, time) {
    game_log.push({
        target: target,
        SNR: snr,
        result: result,
        time: (time / 1000).toFixed(1)
    });
}

function GameItem(group, def, col, row) {
    this.id = def.id;
    this.name = def.name;
    this.animation1 = def.animation1;
    this.animation2 = def.animation2;
    this.has_played_first_anim = false;

    this.circle = group.create(0, 0, 'sprites', def.ring);
    this.sprite = group.create(0, 0, 'sprites', def.resource);

    this.sprite.anchor.x = this.sprite.anchor.y = 0.5;
    this.circle.anchor.x = this.circle.anchor.y = 0.5;

    this.row = row;
    this.col = col;

    this.reset();
    this.circle.position = this.sprite.position.clone();

    this.hide();

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

GameItem.prototype.hide = function() {
    this.sprite.scale.setTo(0, 0);
    this.circle.scale.setTo(0, 0);
}

GameItem.prototype.show = function() {
    game.add.tween(this.circle.scale)
        .to({ x: 1, y: 1 }, 500, Phaser.Easing.Back.Out, true);
    game.add.tween(this.sprite.scale)
        .to({ x: 1, y: 1 }, 500, Phaser.Easing.Back.Out, true);
}

// Reset the circle after it has been scaled up
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

function ProgressBar(y) {
    this.frame = game.add.image(game.width / 2 - 515 / 2, y, 'sprites', 'prog-bar-outline');
    this.bar = game.add.image(game.width / 2 - 515 / 2, y, 'sprites', 'prog-bar-fill');
    this.rect = new Phaser.Rectangle(0, 0, 515, 47);

    const prog_text_style = {
        font: "bold 30px catbirdregular",
        fill: "#2D2D2D",
        boundsAlignH: "center",
        boundsAlignV: "middle"
    };

    this.text = game.add.text(0, 0, `0 / ${SEQUENCE_LENGTH}`, prog_text_style);
    this.text.setTextBounds(game.width / 2 - 515 / 2, y, 515, 47);
}

ProgressBar.prototype.updateProgress = function(progress) {
    this.text.setText(`${progress} / ${SEQUENCE_LENGTH}`);
    this.rect.width = 515 * (progress / SEQUENCE_LENGTH);
    this.bar.crop(this.rect);
}

// This allows us to tween the progress bar up and down
Object.defineProperty(ProgressBar.prototype, "y", {
    set: function(y) {
        this.frame.y = y;
        this.bar.y = y;
        this.text.setTextBounds(game.width / 2 - 515 / 2, y, 515, 47);
    },
    get: function() {
        return this.frame.y;
    }
});

function get_volume_from_SNR(snr) {
    return 1.0 * Math.pow(10, (snr - 6) / 20).toFixed(2);
}

const game_state = {
    target_word: "",
    create: function() {
        const storage = window.localStorage;
        tester_ID = storage.getItem('last-id');
        if(tester_ID !== null) {
            tester_ID = Number.parseInt(tester_ID) + 1;
        }
        else {
            tester_ID = 0;
        }

        storage.setItem('last-id', tester_ID);

        this.curr_SNR = INITIAL_SNR;
        this.signal_base_SNR = 6; // Because we can not boost the audio files from the browser, we have made the signals be +6dB at vol = 1

        this.prog_bar = new ProgressBar(game.height + 100);

        let i = 0;
        this.group = game.add.group(null, 'Game items', true);
        for(const game_item of game_items) {
            sprites[game_item.name] = new GameItem(this.group, game_item, (i % 4)+1, Math.floor(i / 4)+1);
            ++i;
        }

        this.transitionGroup = game.add.group(null, 'Transition group', true);
        this.transition = this.transitionGroup.create(0, 0, "transition-9");
        this.transition.z = 200;
        this.transition_frame = 9;
        this.transition_level = 1;

        animator = new Animator();
        animator.on_complete = on_animation_end;

        if(!test_mode) {
            this.noise = audio_clips['noise'];
        }

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

        // INTRO SEQUENCE
        let skip_intro = false;
        const skip_button = add_button(game.width - 316, game.height - 90, 'btn-skip');
        skip_button.onInputUp.add(() => {
            skip_intro = true;
        });
        const timer = game.time.create(false);
        timer.start();
        i = 0;
        const start_vol = get_volume_from_SNR(INITIAL_SNR);

        const introduce_word = () => {
            const name = game_items[i].name;
            const resource = game_items[i].resource;
            sprites[name].show()
            timer.add(250, () => {
                const clip = audio_clips[resource];
                clip.volume(start_vol);
                clip.play();
            });

            if(++i >= game_items.length) {
                skip_button.destroy();

                // All words are now introduced, show countdown to start:
                // First, add overlay to fade out the scene
                const overlay = game.add.graphics();
                this.group.add(overlay);
                overlay.beginFill(0xFFFFFF);
                overlay.drawRect(0, 0, game.width, game.height);
                overlay.endFill();

                overlay.alpha = 0;

                game.add.tween(overlay)
                    .to({ alpha: 0.5 }, 1000, 'Linear', true)
                    .onComplete.add(() => {
                        const intro_text_style = {
                            font: "bold 128px catbirdregular",
                            fill: "#2D2D2D",
                        };

                        const intro_text = game.add.text(game.width/2-300, game.height/2-150, "", intro_text_style);
                        this.group.add(intro_text);

                        timer.add(1000, () => { intro_text.setText(intro_text.text + 'ER DU KLAR?\n'); });
                        timer.add(2000, () => { intro_text.setText(intro_text.text + '  3'); });
                        timer.add(2750, () => { intro_text.setText(intro_text.text + ' - 2'); });
                        timer.add(3500, () => { intro_text.setText(intro_text.text + ' - 1!'); });

                        timer.add(4250, () => {
                            // Fade in the scene again, and start the game
                            intro_text.destroy();
                            game.add.tween(overlay)
                                .to({ alpha: 0 }, 250, 'Linear', true)
                                .onComplete.add(() => {
                                    overlay.destroy();
                                    timer.destroy();
                                    game.add.tween(this.prog_bar)
                                        .to({ y: game.height - 100 }, 300, Phaser.Easing.Back.Out, true);
                                    this.choose_next_word();
                                });
                        });
                    })
            }
            else {
                if(skip_intro) {
                    skip_button.destroy();
                    timer.destroy();
                    game.add.tween(this.prog_bar)
                        .to({ y: game.height - 100 }, 300, Phaser.Easing.Back.Out, true);
                    this.skip_tutorial();
                }
                else {
                    timer.add(2500, introduce_word);
                }
            }
        }

        timer.add(1000, introduce_word);
    },
    skip_tutorial: function() {
        for(const item of game_items) {
            sprites[item.name].show();
        }
        this.choose_next_word();
    },
    update: function() {
        this.group.sort('z', Phaser.Group.SORT_ASCENDING);
        animator.update();

        if(waiting_for_choice) {
            const time_passed = (performance.now() - this.word_start_time) / 1000.0;
            if(time_passed >= (TIME_BEFORE_TIMER + TIMER_DURATION)) {
                waiting_for_choice = false;
                LogWord(this.target_word, this.curr_SNR, "timeout", performance.now() - game_state.word_start_time);
                on_wrong_choice_or_timeout();
            }
            else if(time_passed > TIME_BEFORE_TIMER) {
                if(!this.timer.shown) {
                    game.add.tween(this.timer)
                        .to({ y: game.height - 64 }, 750, Phaser.Easing.Elastic.Out, true);
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

        const wanted_transition_frame = Math.max(0, Math.ceil(this.transition_level * 10) - 1);
        if(wanted_transition_frame !== this.transition_frame) {
            this.transition.loadTexture(`transition-${wanted_transition_frame}`);
            this.transition_frame = wanted_transition_frame;
        }
    },
    choose_next_word: function() {
        ++this.current_word_index;
        this.hide_timer();

        if(this.current_word_index >= this.word_sequence.length) {
            if(!test_mode) {
                this.noise.stop();
            }

            final_score = calc_final_score();
            game.state.start('end');
        }
        else {
            this.prog_bar.updateProgress(this.current_word_index+1);

            target_id = this.word_sequence[this.current_word_index];
            this.target_word = game_items[target_id].name;

            if(!test_mode) {
                this.noise.stop();
                this.noise.play();
                this.noise.fade(0, 0.5, 1000);
            }

            window.setTimeout(() => {
                let word_sound = null;

                if(test_mode) {
                    word_sound = audio_clips['sine'];
                }
                else {
                    word_sound = audio_clips[game_items[target_id].resource];
                }

                word_sound.volume(get_volume_from_SNR(this.curr_SNR));
                console.log(`${this.current_word_index+1}: Playing ${game_items[target_id].name}. Current SNR: ${this.curr_SNR} (Real volume: ${word_sound.volume()})`);
                word_sound.play();
                this.word_start_time = performance.now();
                waiting_for_choice = true;

                if(!test_mode) {
                    window.setTimeout(() => {
                        this.noise.fade(0.5, 0, 500);
                    }, 1200);
                }
            }, 1250);
        }
    },
    hide_timer: function() {
        game.add.tween(this.timer)
            .to({ y: game.height + 64 }, 750, Phaser.Easing.Elastic.In, true);
        this.timer.shown = false;
    }
};

function calc_final_score() {
    let score = 0;

    const num_SNRs_to_count = results_to_count_for_final_score;

    for(
        let i=game_log.length-(num_SNRs_to_count-1);
        i<game_log.length;
        ++i) {

        score += game_log[i].SNR;
    }

    score += game_state.curr_SNR;

    score /= num_SNRs_to_count;

    return score;
}

function set_noise_volume(vol) {
    if(!test_mode) {
        const old_vol = game_state.noise.volume();
        game_state.noise.fade(old_vol, vol, 100);
    }
}

function start_animation(circle) {
    if(!test_mode) {
        game_state.noise.fade(0, 0.5, 750);
    }

    if(circle.has_played_first_anim) {
        animator.new_animation(circle, circle.animation2);
    }
    else {
        animator.new_animation(circle, circle.animation1);
        circle.has_played_first_anim = true;
    }
}

function on_animation_end(circle) {
    circle.reset();

    if(!test_mode) {
        const old_vol = game_state.noise.volume();
        game_state.noise.fade(old_vol, 0, 500);
    }

    window.setTimeout(() => {
        game_state.choose_next_word();
    }, 1500);
}

function on_wrong_choice_or_timeout() {
    game_state.hide_timer();

    game_state.curr_SNR += STEP_SNR;
    if(game_state.curr_SNR > MAX_SNR) {
        game_state.curr_SNR = MAX_SNR;
    }

    game_state.transition_level = 0;
    game.add.tween(game_state)
        .to({ transition_level: 1 }, 800, 'Linear', true)
        .onComplete.add(() => {
            game_state.choose_next_word();
        });
}

function on_sprite_click(circle) {
    if(!waiting_for_choice) return;
    waiting_for_choice = false;

    if(circle.id === target_id) {
        LogWord(
            game_state.target_word, game_state.curr_SNR,
            circle.name, performance.now() - game_state.word_start_time);

        game_state.curr_SNR -= STEP_SNR;
        if(game_state.curr_SNR < MIN_SNR) {
            game_state.curr_SNR = MIN_SNR;
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
        circle.sprite.angle = 20;
        const shake = game.add.tween(circle.sprite)
            .to({ angle: -circle.sprite.angle }, 50, 'Linear', true, 0, 0, true);

        LogWord(
            game_state.target_word, game_state.curr_SNR,
            circle.name, performance.now() - game_state.word_start_time);

        shake.onComplete.add(() => {
            circle.sprite.angle = 0;
            window.setTimeout(() => {
                on_wrong_choice_or_timeout();
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

