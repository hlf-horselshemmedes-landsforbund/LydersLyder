const menu_state = {
    create: function() {
        game.add.image(game.world.centerX - 655 / 2, game.world.centerY - 333, 'logo-lyderslyder');
        game.add.image(game.world.centerX - 256 / 2, game.height - 192, 'version_img');

        const button = game.add.button(game.world.centerX - 247 / 2, game.world.centerY + 21, 'btn-start');
        button.onInputUp.add(() => {
            game.state.start('game');
        });
    }
};

