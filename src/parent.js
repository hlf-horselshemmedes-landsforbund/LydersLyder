const parent_state = {
    create: function() {
        game.add.image(game.world.centerX - 999 / 2, 32, 'sprites', 'result-bar');

        const worst_possible_result = (function() {
            const results = [];
            let curr = INITIAL_SNR;
            for(let i=0; i<SEQUENCE_LENGTH+1; ++i) {
                results.push(curr);
                curr += STEP_SNR;
                if(curr > MAX_SNR) curr = MAX_SNR;
            }

            let result = 0;
            for(let i=0; i<results_to_count_for_final_score; ++i) {
                result += results[results.length - (i+1)];
            }

            result /= results_to_count_for_final_score;

            return result;
        })();

        const best_possible_result = (function() {
            const results = [];
            let curr = INITIAL_SNR;
            for(let i=0; i<SEQUENCE_LENGTH+1; ++i) {
                results.push(curr);
                curr -= STEP_SNR;
                if(curr < MIN_SNR) curr = MIN_SNR;
            }

            let result = 0;
            for(let i=0; i<results_to_count_for_final_score; ++i) {
                result += results[results.length - (i+1)];
            }

            result /= results_to_count_for_final_score;

            return result;
        })();

        if(!final_score) final_score = 0;

        const left_edge = game.world.centerX - 999 / 2 + 16;
        const right_edge = game.world.centerX + 999 / 2 - 16;
        const x = map_range(
            final_score,
            best_possible_result, worst_possible_result,
            right_edge, left_edge) - 8;

        game.add.image(x, 32, 'sprites', 'result-marker');

        const legend_style = {
            font: "bold 24px Helvetica",
            fill: "#2D2D2D",
        };

        game.add.text(72, 82, 'DÅRLIG HØRSEL', legend_style);
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
            add_button(game.world.centerX - 325, game.height - 128, 'btn-back');

        const reload_button =
            add_button(game.world.centerX + 16, game.height - 128, 'btn-reload');

        back_button.onInputUp.add(() => {
            game.state.start('end');
        });

        reload_button.onInputUp.add(() => {
            game.state.start('menu');
        });
    }
};

