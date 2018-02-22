const menu_state = {
    container: null,
    canvas: null,
    ui: null,
    create: function() {
        this.container = document.querySelector("#game-container");
        this.canvas = document.querySelector("#game-container > canvas");

        this.ui = document.createElement("div");
        this.ui.classList.add("game-ui");

        this.ui.innerHTML =
            '<div id="intro-info">\n' +
            '<h1>TEST HØRSELEN &mdash; INFORMASJON TIL DE VOKSNE</h1>\n' +
            '<p>Spillet tar ca. ti minutter og passer for barn fra 5 år. Det går ut på å høre ord gjennom støy, og trykke på bilde av det ordet du hører. Spilleren må forstå norsk.</p>\n' +
            '<p>Siden spillet er en hørselstest, vil noen av ordene være vanskelig å høre. Også for de som hører godt.</p>\n' +
            '</div>\n' +
            '<input id="intro-btn-start" type="image" src="images/btn-start.png"></input>\n' +
            '<div id="intro-vol-adjust"></div>';

        this.container.appendChild(this.ui);

        document.querySelector("#intro-btn-start").addEventListener("click", () => {
            this.ui.remove();
            game.state.start('game');
        })

        game.add.image(game.world.centerX - 288 / 2, 32, 'logo-lyderslyder');
        game.add.image(game.width - 256, 0, 'version_img');
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

