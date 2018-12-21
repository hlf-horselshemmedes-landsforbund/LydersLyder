// final_score.toFixed(2)
const end_state = {
    create: function() {
        for(let i=game.stage.children.length-1; i >= 1; --i) {
            game.stage.children[i].destroy();
        }

        const clap = game.add.sprite(game.world.centerX, 0, 'clap');
        clap.anchor.setTo(0.5, 0);
        const clap_anim = clap.animations.add('clap', null, 10, true);
        clap.play('clap');

        const style = {
            font: "bold 32px catbirdregular",
            fill: "#2D2D2D",
            boundsAlignH: "center",
            boundsAlignV: "middle"
        };

        text = game.add.text(0, 164, 'Bra jobba! Håper du hadde det morsomt!', style);

        text.setTextBounds(0, 0, game.width, game.height);

        // If enabling the science page, move this button to centerX-325
        const parent_button =
            add_button(game.world.centerX - 155, game.height - 128, 'btn-results');

        parent_button.onInputUp.add(() => {
            game.state.start('parent');
        });

        // NOTE(istarnion): Uncomment to enable the 'science' view. Also edit app.js and the Makefile
        /*
        const science_button =
            add_button(game.world.centerX + 16, game.height - 128, 'btn-science');


        science_button.onInputUp.add(() => {
            game.state.start('science');
        });
        */
    }
};

