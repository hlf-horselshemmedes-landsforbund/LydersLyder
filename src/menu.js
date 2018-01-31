const menu_state = {
    create: function() {
        game.add.image(0, 0, 'bg-light-blank');

        game.add.image(game.world.centerX - 992 / 2, game.world.centerY - 500, 'logo-lyderslyder');
        const button = game.add.button(game.world.centerX - 374 / 2, game.world.centerY + 32, 'btn-start');
        button.onInputUp.add(() => {
            game.state.start('game');
        });
    }
};

