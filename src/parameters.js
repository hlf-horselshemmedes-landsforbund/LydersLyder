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

// Many of these are let, not const, so we can set them in-game from the console
const version_text = "v1.0";
let INITIAL_SNR = -6;
let STEP_SNR = 2;
let MIN_SNR = -40;
const MAX_SNR = 6; // This is not tweakable cuz physix

let noise_vol = 1.0;
let test_mode = false; // Test mode skips intro, and swaps word sounds for 1kHz0dB_pulsed and noise for 100Hz0dB. For accurate results, noise_vol should be 0.5 when test_mode is true

let SEQUENCE_LENGTH = 20;

let results_to_count_for_final_score = 11; // The 10 last and the one that would have played next

let TIME_BEFORE_TIMER = 8;    // In seconds
let TIMER_DURATION = 8;       // in seconds.

const SNR_threshold = -12;   // Any worse than this, and we suspect difficulties hearing

let target_email = "Spill.Audiometri@gmail.com";

const intro_text_header = "TEST HØRSELEN — INFORMASJON TIL DE VOKSNE";
const intro_text = "Spillet tar ca. ti minutter og passer for barn fra 5 år. Det går ut på å høre ord gjennom støy,\nog trykke på bilde av det ordet du hører. Spilleren må forstå norsk.\n\nSiden spillet er en hørselstest, vil noen av ordene være vanskelig å høre. Også for de som\nhører godt.";

const intro_vol_calibration_text = "Gjennomfør spillet i stille omgivelser - Bruk gjerne\nhodetelefoner. Før du starter må du justere lyden\nså du hører suset fra fossen høyt og tydelig";

const result_text_below_threshold = "Resultatet viser ingen tegn på nedsatt hørsel.\nHvis du likevel er usikker, kan du la barnet prøve spillet en gang til – eller kontakte fastlege/helsestasjon for en mer presis vurdering.";

const result_text_above_threshold = "Resultatet kan bety at barnet hører dårlig.\nPrøv testen en gang til. Ved gjentatte dårlige svar anbefaler vi at du tar kontakt med fastlege/helsestasjon for en mer presis veiledning.";

const result_text_contact = "\n\nInformasjonsmateriell om hørsel og oppvekst finnes på HLFs hjemmesider:\nhttps://www.hlf.no/";
