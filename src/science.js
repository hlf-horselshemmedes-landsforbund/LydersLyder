const personal_data = {
    ID: 0,  // ID is generated when the game starts
    age: 0,
    sex: "kvinne"
};

const science_state = {
    container: null,
    canvas: null,
    ui: null,
    create: function() {

        this.container = document.querySelector("#game-container");
        this.canvas = document.querySelector("#game-container > canvas");

        this.ui = document.createElement("div");
        this.ui.classList.add("game-ui");

        let html = '<div id="stat-info">\n';

        let tab_data = "";

        html += `<h1>ID: ${personal_data.ID} Resultat: ${final_score.toFixed(2)} Kjønn: ${personal_data.sex} Alder: ${personal_data.age}</h1>\n`;
        for(let i=0; i<game_log.length; ++i) {
            const log = game_log[i];
            html += `<span class="stat-target">${i+1}. ${log.target}</span><span class="stat-snr">SNR: ${log.SNR.toFixed(2)}</span><span class="stat-result">Svar: ${log.result}</span><span class="stat-time">Tid: ${log.time}s</span><br/>\n`;

            tab_data += `<span class="stat-tab-line">${personal_data.ID};${personal_data.sex};${personal_data.age};${final_score.toFixed(2)};${i+1};${log.target};${log.SNR.toFixed(2)};${log.result};${log.time}</span><br/>\n`;
        }
        html += '</div>\n<div id="stat-tab">\n';

        html += '<span class="stat-tab-format">Tabelldataformat:</span><br/>\n';
        html += '<span class="stat-tab-format">ID;kjønn;alder;resultat;sekvensnummer;ord;SNR;svar;tid</span><br/>\n';
        html += tab_data;

        html += '</div>';

        html += '<input id="stat-btn-back" type="image" src="images/btn-back.png"></input>\n';
        html += '<input id="stat-btn-reload" type="image" src="images/btn-reload.png"></input>\n';

        this.ui.innerHTML = html;
        this.container.appendChild(this.ui);

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
    }
};

