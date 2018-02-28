const menu_state = {
    create: function() {
        game.add.image(game.world.centerX - 288 / 2, 32, 'sprites', 'logo-lyderslyder');
        game.add.image(game.width - 256, 0, 'version_img');

        const header_style = { font: "bold 25px Helvetica" };
        const text_style = { font: "16px Helvetica" };

        game.add.text(64, 200, intro_text_header, header_style);
        game.add.text(64, 256, intro_text, text_style);

        const border = game.add.image(game.width-322, 370, 'waterfall_border');
        border.anchor.setTo(0.5, 0.5);
        const waterfall = game.add.sprite(game.width-322, 328, 'waterfall');
        waterfall.anchor.setTo(0.5, 0.5);
        waterfall.animations.add('fall', null, 10, true);
        waterfall.play('fall');

        let waterfall_muted = true;
        audio_clips['noise'].volume(0.5);
        const sound_button = game.add.button(game.width-322-24, 464, 'sound_toggle');
        sound_button.frame = 0;
        sound_button.onInputUp.add(() => {
            waterfall_muted = !waterfall_muted;
            if(waterfall_muted) {
                sound_button.frame = 0;
                audio_clips['noise'].stop();
            }
            else {
                sound_button.frame = 1;
                audio_clips['noise'].play();
            }
        });

        const start_button = add_button(game.width/2-197, game.height-116, 'btn-start');
        start_button.onInputUp.add(() => {
            audio_clips['noise'].stop();
            game.state.start('game');
        });
    }
};

