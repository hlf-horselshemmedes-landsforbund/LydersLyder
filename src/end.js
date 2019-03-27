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

