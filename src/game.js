let playing_animation = false;

function GameItem(group, def, col, row) {
    this.id = def.id;

    this.circle = group.create(0, 0, def.ring);
    this.sprite = group.create(0, 0, def.image);

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

        /* sprites is a global */
        sprites = {};

        let i = 0;
        this.group = game.add.group(null, 'Game items', true);
        for(const game_item of game_items) {
            sprites[game_item.name] = new GameItem(this.group, game_item, (i % 4)+1, Math.floor(i / 4)+1);
            ++i;
        }

    },
    update: function() {
        this.group.sort('z', Phaser.Group.SORT_ASCENDING);
    }
};

function on_animation_end(circle) {
    circle.reset();
    playing_animation = false;
}

function on_sprite_click(circle) {
    if(playing_animation) return;

    if(true) {
    // TODO(istarnion): If correct -> Tween clicked circle to center, scale to 1, then play animation
        playing_animation = true;
        circle.circle.z = 100;
        const center = game.add.tween(circle.circle)
            .to({ x: 1920/2, y: 1080/2 }, 500, 'Linear', true);
        const fade = game.add.tween(circle.sprite)
            .to({ alpha: 0 }, 250, 'Linear', true);
        const enlarge = game.add.tween(circle.circle.scale)
            .to({ x: 12, y: 12 }, 500, 'Linear', true);

        window.setTimeout(() => { on_animation_end(circle); }, 3000);
    }
    else {
        circle.sprite.angle = 20;
        const shake = game.add.tween(circle.sprite)
            .to({ angle: -circle.sprite.angle }, 50, 'Linear', true, 0, 0, true);

        shake.onComplete.add(() => { circle.sprite.angle = 0; });
    }
}

