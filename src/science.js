// final_score.toFixed(2)
const science_state = {
    create: function() {
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

