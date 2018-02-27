const personal_data = {
    ID: 0,  // ID is generated when the game starts
    age: 0,
    sex: "kvinne"
};

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
            '<label for="intro-field-age">Alder:</label>\n' +
            '<input id="intro-field-age" type="number" size="35"></input>\n' +
            '<br/>\n' +
            '<label>Kjønn:</label>\n' +
            '<input id="intro-select-sex-female" type="radio" name="sex" value="kvinne" checked>\n' +
            '<label for="intro-select-sex-female">Kvinne</label>\n' +
            '</input>\n' +
            '<input id="intro-select-sex-male" type="radio" name="sex" value="mann">\n' +
            '<label for="intro-select-sex-male">Mann</label>\n' +
            '</input>\n' +
            '</div>\n' +
            '<input id="intro-btn-start" type="image" src="images/btn-start.png"></input>\n' +
            '<div id="intro-vol-adjust">\n' +
            '<img src="images/spa-anim-foss.gif" alt="Animert foss"></img>\n' +
            '<input id="intro-toggle-audio" type="checkbox"></input>\n' +
            '<label id="intro-toggle-audio-label" for="intro-toggle-audio"></label>\n' +
            '<p>Gjennomfør spillet i stille omgivelser &mdash; Bruk gjerne hodetelefoner. Før du starter må du justere lyden så du hører suset fra fossen tydelig</p>\n' +
            '</div>';

        this.container.appendChild(this.ui);

        document.querySelector("#intro-btn-start").addEventListener("click", () => {
            const age = document.querySelector("#intro-field-age").value;
            console.log(age);
            if(age > 0 && age < 199) {
                personal_data.age = age;
            }

            const female_toggle = document.querySelector("#intro-select-sex-female");
            const male_toggle = document.querySelector("#intro-select-sex-male");
            if(female_toggle.checked === true && male_toggle.checked === false) {
                personal_data.sex = "kvinne";
            }
            else if(male_toggle.checked === true && female_toggle.checked === false) {
                personal_data.sex = "mann";
            }
            else {
                personal_data.sex = "n/a"; // Sadly, you need to edit the JS or HTML to escape the binary :( Not my call...
            }

            this.ui.remove();
            audio_clips['noise'].stop();
            game.state.start('game');
        });

        document.querySelector("#intro-toggle-audio").addEventListener("change", (e) => {
            if(e.target.checked) {
                audio_clips['noise'].play();
                audio_clips['noise'].fade(0, 0.5, 500);
            }
            else {
                audio_clips['noise'].stop();
            }
        });

        game.add.image(game.world.centerX - 288 / 2, 32, 'sprites', 'logo-lyderslyder');
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

