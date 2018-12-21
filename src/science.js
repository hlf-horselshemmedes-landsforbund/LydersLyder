const science_state = {
    container: null,
    canvas: null,
    ui: null,
    email_link: null,
    get_csv: function() {
        let CSV_data = ""; // We will add to this string to send to server/mail whatever

        const input_id = document.querySelector("#stat-input-id");
        const id = input_id.value;

        const input_age = document.querySelector("#stat-input-age");
        const age = input_age.value;

        const radio_sex = document.querySelector("#stat-input-sex-f");
        const sex = (radio_sex.checked) ? "kvinne" : "mann";

        for(let i=0; i<game_log.length; ++i) {
            const log = game_log[i];
            CSV_data += `${id};${sex};${age};${final_score.toFixed(2)};${i+1};${log.target};${log.SNR.toFixed(2)};${log.result};${log.time}%0D%0A`;
        }

        return CSV_data;
    },
    create: function() {
        this.container = document.querySelector("#game-container");
        this.canvas = document.querySelector("#game-container > canvas");

        this.ui = document.createElement("div");
        this.ui.classList.add("game-ui");
        this.ui.classList.add("stat-text");

        let html = '<div id="stat-info">\n';

        html += `<span class="stat-text stat-target">RESULT:</span><span class="stat-snr">SNR: ${final_score.toFixed(2)}</span><br/>\n`;
        for(let i=0; i<game_log.length; ++i) {
            const log = game_log[i];
            html += `<span class="stat-text stat-target">${i+1}. ${log.target}</span><span class="stat-snr">SNR: ${log.SNR.toFixed(2)}</span><span class="stat-text stat-result">Svar: ${log.result}</span><span class="stat-text stat-time">Tid: ${log.time}s</span><br/>\n`;
        }

        html += '</div>\n';

        html += '<div id="stat-input" class="stat-text">\n';

        html += '<label for="stat-input-id" class="stat-text>ID:</label>\n<br/>\n';
        html += `<input id="stat-input-id" type="number" value="${tester_ID}"></input>\n<br/>\n`;

        html += '<label for="stat-input-age" class="stat-text>Alder:</label>\n<br/>\n';
        html += '<input id="stat-input-age" type="number" value="0"></input>\n<br/>\n';

        html += '<label for="stat-input-sex-f" class="stat-text>Kvinne:</label>\n';
        html += '<input id="stat-input-sex-f" type="radio" name="stat-sex"checked></input>\n<br/>\n';
        html += '<label for="stat-input-sex-m" class="stat-text>Mann:</label>\n';
        html += '<input id="stat-input-sex-m" type="radio" name="stat-sex"></input>\n';

        html += '</div>\n';

        html += '<a id="stat-btn-email"><img src="images/btn-email.png"></img></a>\n';
        html += '<input id="stat-btn-back" type="image" src="images/btn-back.png"></input>\n';
        html += '<input id="stat-btn-reload" type="image" src="images/btn-reload.png"></input>\n';

        this.ui.innerHTML = html;
        this.container.appendChild(this.ui);
        this.email_link = document.querySelector("#stat-btn-email");

        document.querySelector("#stat-btn-back").addEventListener("click", () => {
            this.ui.remove();
            game.state.start('end');
        });

        document.querySelector("#stat-btn-reload").addEventListener("click", () => {
            this.ui.remove();
            game.state.start('menu');
        });
    },

    update: function() {
        const rect = this.canvas.getBoundingClientRect();
        const container_rect = this.container.getBoundingClientRect();

        this.ui.style.left = `${rect.left}px`;
        this.ui.style.top = `${rect.top}px`;

        this.ui.style.right = `${rect.right}px`;
        this.ui.style.bottom = `${rect.bottom}px`;

        this.ui.style.width = `${rect.width}px`;
        this.ui.style.height = `${rect.height}px`;

        // FIXME(istarnion): Now we're setting the target of the link every frame.
        // That's like, super bad
        const mailto_string = `mailto:${target_email}?subject=Lyders%20Lyder%20resultat&body=${this.get_csv()}`;
        this.email_link.href = mailto_string;
    }
};

