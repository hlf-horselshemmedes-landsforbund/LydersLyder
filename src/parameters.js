const INITIAL_SNR = 0;
const STEP_SNR = 2;
const MIN_SNR = -40;
const MAX_SNR = 6;

const SEQUENCE_LENGTH = 20;

const results_to_count_for_final_score = 11; // The 10 last and the one that would have played next

const TIME_BEFORE_TIMER = 8;    // In seconds
const TIMER_DURATION = 8;       // in seconds.

const SNR_threshold = -4;   // Any worse than this, and we suspect difficulties hearing

const result_text_below_threshold = "Resultatet viser ingen tegn på nedsatt hørsel.\nHvis du likevel er usikker, kan du la barnet prøve spillet en gang til – eller ta kontakt med fastlegen for en vurdering.";

const result_text_above_threshold = "Resultatet kan bety at barnet hører dårlig.\nVi anbefaler at du tar kontakt med fastlegen for en vurdering og mulig henvisning til spesialist.\nHvis du er usikker, kan du la barnet prøve spillet en gang til.";

const result_text_contact = "\n\nSpørsmål om hørsel? Ta kontakt!\nhlf@hlf.no\n22 63 99 00";

