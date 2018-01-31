const end_state = {
    create: function() {
        for(let i=game.stage.children.length-1; i >= 1; --i) {
            game.stage.children[i].destroy();
        }

        game.add.image(0, 0, 'bg-light');
        const style = {
            font: "bold 128px catbirdregular",
            fill: "#2D2D2D",
            boundsAlignH: "center",
            boundsAlignV: "middle"
        };

        text = game.add.text(0, 0, `${num_correct} / ${SEQUENCE_LENGTH}`, style);
        text.setShadow(3, 3, 'rgba(0,0,0,0.5)', 2);

        text.setTextBounds(0, 0, 1920, 1040);

        const button = game.add.button(game.world.centerX - 479 / 2, game.world.centerY + 64, 'btn-reload');
        button.onInputUp.add(() => {
            game.state.start('menu');
        });
    }
};

