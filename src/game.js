function GameItem(image, col, row) {
    this.id = image;

    this.sprite = game.add.sprite(
        0,
        0,
        image);

    this.sprite.anchor.x = this.sprite.anchor.y = 0.5;

    // Position:
    if(row === 2) {
        this.sprite.position.x = (col - 2.5) * 500 + (1920 / 2);
    }
    else {
        this.sprite.position.x = (col - 2) * 500 + (1920 / 2);
    }

    this.sprite.position.y = (row - 2) * 340 + 1080 / 2;

    // Animate:
    this.sprite.angle = 10 * (((row + col & 1) == 0) ? 1 : -1);
    while(Math.abs(this.sprite.angle) < 1) this.sprite.angle *= 10;
    this.tween = game.add.tween(this.sprite)
        .to({ angle: -this.sprite.angle }, 1000, 'Linear', true, 0, Number.MAX_VALUE, true);

    // Interact:
    this.sprite.inputEnabled = true;
    this.sprite.events.onInputDown.add(() => {
        on_sprite_click(this);
    }, this);
}

const game_state = {
    create: function() {
        game.add.image(0, 0, 'bg-light');

        /* sprites is a global */
        sprites = {
            l_kasser: new GameItem('lyse_kasser', 3, 3),
            l_knapper: new GameItem('lyse_knapper', 1, 1),
            //l_kurver: new GameItem('lyse_kurver'),
            l_luer: new GameItem('lyse_luer', 1, 3),
            l_penner: new GameItem('lyse_penner', 3, 1),
            l_ringer: new GameItem('lyse_ringer', 2, 2),

            m_kasser: new GameItem('morke_kasser', 4, 2),
            m_knapper: new GameItem('morke_knapper', 2, 1),
            //m_kurver: new GameItem('morke_kurver'),
            m_luer: new GameItem('morke_luer', 1, 2),
            m_penner: new GameItem('morke_penner', 3, 2),
            m_ringer: new GameItem('morke_ringer', 2, 3)
        };
    }
};

function on_sprite_click(circle) {
    // TODO(istarnion): If correct -> Tween clicked circle to center, scale to 1, then play animation

    // If not correct:
    if(true) {
        circle.tween.pause();

        circle.sprite.angle = 20;
        const shake = game.add.tween(circle.sprite)
            .to({ angle: -circle.sprite.angle }, 50, 'Linear', true, 0, 0, true);

        shake.onComplete.add(() => { circle.tween.resume(); });
    }
}

