const SEQUENCE_LENGTH = 15;

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
        offset = 260;
    }
    else {
        offset = 450;
    }

    this.sprite.position.x = offset + 400 * (this.col-1);
    this.sprite.position.y = (this.row - 2) * 340 + 1080 / 2;
    this.sprite.z = 1;

    this.circle.position = this.sprite.position.clone();
    this.circle.z = 0;

    this.sprite.alpha = 1;
    this.circle.scale.set(1);
}

const game_state = {
    create: function() {
        game.add.image(0, 0, 'bg-light');

        let i = 0;
        this.group = game.add.group(null, 'Game items', true);
        for(const game_item of game_items) {
            sprites[game_item.name] = new GameItem(this.group, game_item, (i % 4)+1, Math.floor(i / 4)+1);
            ++i;
        }

        animator = new Animator();
        animator.on_complete = on_animation_end;

        this.noise = game.add.sound('noise', 1, true);

        this.current_word_index = -1;

        this.word_sequence = [];
        for(let i=0; i<Math.min(SEQUENCE_LENGTH, game_items.length); ++i) {
            this.word_sequence.push(i);
        }

        for(let i=0; i<(SEQUENCE_LENGTH - game_items.length); ++i) {
            const choice = Math.floor(Math.random() * game_items.length);
            this.word_sequence.push(choice);
        }

        this.word_sequence = shuffle_array(this.word_sequence);

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
            target_id = this.word_sequence[this.current_word_index];

            playing_sound = true;
            this.noise.volume = 0;
            this.noise.play();
            game.add.tween(this.noise)
                .to({ volume: 1 }, 600, Phaser.Easing.Quintic.In, true);

            window.setTimeout(() => {
                // TODO(istarnion): Use proper volume here
                game.add.sound(game_items[target_id].resource).play();
                window.setTimeout(() => {
                    game.add.tween(this.noise)
                        .to({ volume: 0 }, 500, Phaser.Easing.Quadratic.Out, true);
                    playing_sound = false;
                }, 1200);
            }, 1500);
        }
    }
};

function set_noise_volume(vol) {
    game.add.tween(game_state.noise)
        .to({ volume: vol }, 500, Phaser.Easing.Quintic.In, true);
}

function start_animation(circle) {
    game_state.noise.volume = 1;
    animator.new_animation(circle, circle.animation1);
}

function on_animation_end(circle) {
    circle.reset();

    game.add.tween(game_state.noise)
        .to({ volume: 0 }, 500, Phaser.Easing.Quadratic.Out, true);

    window.setTimeout(() => {
        playing_animation = false;
        game_state.choose_next_word();
    }, 1000);
}

function on_sprite_click(circle) {
    if(playing_animation || playing_sound) return;

    if(circle.id === target_id) {
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
        circle.sprite.angle = 20;
        const shake = game.add.tween(circle.sprite)
            .to({ angle: -circle.sprite.angle }, 50, 'Linear', true, 0, 0, true);

        shake.onComplete.add(() => {
            circle.sprite.angle = 0;
            window.setTimeout(() => {
                game_state.choose_next_word();
            }, 500);
        });
    }
}

