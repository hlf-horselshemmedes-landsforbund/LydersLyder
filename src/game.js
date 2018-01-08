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
    this.sprite.angle = 40 * (Math.random() - 0.5)
    while(Math.abs(this.sprite.angle) < 1) this.sprite.angle *= 10;
    this.tweenA = game.add.tween(this.sprite)
        .to({ angle: -this.sprite.angle }, 500, 'Linear', true, 0, Number.MAX_VALUE, true);

    // Interact:
    this.sprite.inputEnabled = true;
    this.sprite.events.onInputDown.add(() => {
        on_sprite_click(this.id);
    }, this);
}

function on_sprite_click(id) {
}

const game_state = {
    create: function() {
        game.add.image(0, 0, 'bg-light');

        const l_kasser = new GameItem('lyse_kasser', 3, 3);
        const l_knapper = new GameItem('lyse_knapper', 1, 1);
        //const l_kurver = new GameItem('lyse_kurver');
        const l_luer = new GameItem('lyse_luer', 1, 3);
        const l_penner = new GameItem('lyse_penner', 3, 1);
        const l_ringer = new GameItem('lyse_ringer', 2, 2);

        const m_kasser = new GameItem('morke_kasser', 4, 2);
        const m_knapper = new GameItem('morke_knapper', 2, 1);
        //const m_kurver = new GameItem('morke_kurver');
        const m_luer = new GameItem('morke_luer', 1, 2);
        const m_penner = new GameItem('morke_penner', 3, 2);
        const m_ringer = new GameItem('morke_ringer', 2, 3);
    }
};

