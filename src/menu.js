/**
 * Lyders Lyder
 *
 * Copyright (c) Able Magic AS
 * All rights reserved.
 *
 * MIT License
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy of this
 * software and associated documentation files (the "Software"), to deal in the Software
 * without restriction, including without limitation the rights to use, copy, modify, merge,
 * publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons
 * to whom the Software is furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all copies or
 * substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED *AS IS*, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED,
 * INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR
 * PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE
 * FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
 * OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
 * DEALINGS IN THE SOFTWARE.
 */

const menu_state = {
    create: function() {
        const logo = game.add.image(game.world.centerX, 32, 'sprites', 'logo-lyderslyder');
        logo.anchor.setTo(0.5, 0);

        const header_style = { font: "bold 25px Helvetica" };
        const text_style = { font: "14px Helvetica" };

        game.add.text(game.width - 256, 32, version_text, header_style);

        game.add.text(64, 200, intro_text_header, header_style);
        game.add.text(64, 256, intro_text, text_style);

        const waterfall = game.add.sprite(game.width-128, 330, 'waterfall');
        waterfall.anchor.setTo(1, 0.5);
        waterfall.animations.add('fall', null, 10, true);
        waterfall.play('fall');

        let waterfall_muted = true;
        const sound_button = game.add.button(
            game.width-128-waterfall.width/2+24, 150,
            'sound_toggle');
        sound_button.anchor.setTo(1, 0.5);
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

        game.add.text(game.width-420, 505, intro_vol_calibration_text, text_style);

        /* Frame around waterfall
        const border = game.add.graphics(game.width-520, 205);
        border.lineStyle(3)
        border.drawRoundedRect(0, 0, 400, 390);
        */

        const start_button = add_button(game.world.centerX, game.height-116, 'btn-start');
        start_button.anchor.setTo(0.5, 0);
        start_button.scale.setTo(0.75, 0.75);
        start_button.onInputUp.add(() => {
            audio_clips['noise'].stop();
            game.state.start('game');
        });
    }
};
