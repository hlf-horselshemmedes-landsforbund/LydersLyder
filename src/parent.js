const parent_state = {
    create: function() {
        game.add.image(game.world.centerX - 999 / 2, 32, 'result-bar');

        const legend_style = {
            font: "bold 24px Helvetica",
            fill: "#2D2D2D",
        };

        game.add.text(72, 82, 'DÅRLIG HØRSEL', legend_style);
        game.add.text(532, 82, 'NORMAL HØRSEL', legend_style);
        game.add.text(1048, 82, 'GOD HØRSEL', legend_style);

        const main_style = {
            font: "18px Helvetica",
            fill: "#2D2D2D",
        };

        let text = "";
        if(final_score < SNR_threshold) {
            text = result_text_below_threshold;
        }
        else {
            text = result_text_above_threshold;
        }

        text += result_text_contact

        game.add.text(140, 256, text, main_style);

        const back_button =
            game.add.button(game.world.centerX - 325, game.height - 128, 'btn-back');

        const reload_button =
            game.add.button(game.world.centerX + 16, game.height - 128, 'btn-reload');

        back_button.onInputUp.add(() => {
            game.state.start('end');
        });

        reload_button.onInputUp.add(() => {
            game.state.start('menu');
        });
    }
};

