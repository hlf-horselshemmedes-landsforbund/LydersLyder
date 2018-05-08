const menu_state = {
    create: function() {
        //game.add.image(game.world.centerX - 288 / 2, 32, 'sprites', 'logo-lyderslyder');
        game.add.image(game.world.centerX / 2, 32, 'sprites', 'logo-lyderslyder');
        //game.add.image(game.width - 256, 0, 'version_img');

        const header_style = { font: "bold 25px Helvetica" };
        const text_style = { font: "16px Helvetica" };

        game.add.text(game.width - 256, 32, version_text, header_style);

        game.add.text(64, 200, intro_text_header, header_style);
        game.add.text(64, 256, intro_text, text_style);

        const waterfall = game.add.sprite(game.width-322, 330, 'waterfall');
        waterfall.anchor.setTo(0.5, 0.5);
        waterfall.animations.add('fall', null, 10, true);
        waterfall.play('fall');

        const border = game.add.graphics(game.width-520, 205);
        border.lineStyle(3)
        border.drawRoundedRect(0, 0, 400, 390);

        let waterfall_muted = true;
        const sound_button = game.add.button(game.width-322-24, 458, 'sound_toggle');
        sound_button.frame = 0;
        sound_button.onInputUp.add(() => {
            waterfall_muted = !waterfall_muted;
            if(waterfall_muted) {
                sound_button.frame = 0;
                if(test_mode) {
                    audio_clips['100Hz'].stop();
                }
                else {
                    audio_clips['noise'].stop();
                }
            }
            else {
                sound_button.frame = 1;
                if(test_mode) {
                    audio_clips['100Hz'].volume(noise_vol);
                    audio_clips['100Hz'].play();
                }
                else {
                    audio_clips['noise'].volume(noise_vol);
                    audio_clips['noise'].play();
                }
            }
        });

        game.add.text(game.width-505, 505, intro_vol_calibration_text, text_style);

        const start_button = add_button(game.width/2-197, game.height-116, 'btn-start');
        start_button.onInputUp.add(() => {
            audio_clips['noise'].stop();
            game.state.start('game');
        });
    }
};
