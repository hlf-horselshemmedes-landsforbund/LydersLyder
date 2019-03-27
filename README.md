# Lyders Lyder - Sintef SPA

Ikke alt trenger å ligge på webserver. Kun:
index.html, style.css, dist/, images/, /fonts, og audio/

dist/spa.js genereres av make. Bare kjør `make`.
Makefile inneholder en liste av alle filer som dras inn, så det er bare å endre den for å legge til/ta bort filer fra et build.

Makefile kjører uglify.js som innstalleres med NPM. Kan sikkert også installeres på annet vis. Se https://github.com/mishoo/UglifyJS

Uglify er eneste dependency som må installeres, men vi bruker også to rammeverk: Phaser og Howler.js. Phaser er et veldig populært spillrammeverk, og håndterer tweening, grafikk, animasjoner og input.
Howler.js er et audio API som gjør det lettere å ha god kontroll uten å miste browser support. Phaser har også et audio API, men Howler er bedre (mer kontroll)

Ting jeg mener trenger være kjapt å endre ligger i src/parameters.js. Dette er tekster, sekvenslengde, min og max SNR, threshold, osv. Se der først om du skal tweake noe.

Ellers ligger ting slik:
src/app.js          - Hovedfila til prosjektet. Her gjøres all loading, samt loading screen.
src/menu.js         - Startskjermen. create-funksjonen kjøres med en gang alt er lastet ferdig.
src/game.js         - Både introduksjon og selve spillet. Her ligger det meste av koden.
src/end.js          - Kun den barnevennlige sluttsiden
src/parent.js       - Foreldresiden, med forenklet info.
src/science.js      - Forskersiden. Her, pga at Phaser ikke har input tekstfelt, og vi trenger HTML button for å trigge mail, så er alt implementert i HTML, ikke med Phaser. Ikke så pent, men..
src/game_items.js   - Kun datadefinisjon av elementene. Her er det satt opp hvilke animasjoner som skal spilles, hvilke lydfiler, og hvilket ikon ting skal ha. Animasjonene er også satt opp her.
src/animation.js    - 'klasse' for å holde animasjonsdata
src/animator.js     - Kode for å spille av sceneanimasjonene
src/utils.js        - Funksjoner for operasjoner vi trenger over alt rundt om i koden.

