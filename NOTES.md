# Flow
Menu -> start, instructions?

Game ->
    Play sound
    On user clicks one of the items:
        If correct -> Score animation
        Else -> shake to signal error
    Loop

End ->
    Some stuff, button to parental info

Audio clip with noise. Is 3s, should be longer
Words should be in a long audio file, so we can use audio sprites. This is to improve load times.

Free to place fancy-sounds on anims
Keep anims short. Need to test what children does after seeing anims.
Exit/restart in game

{
    gender: "..",
    age: 20,
    events: [
        { played: "svarte knapper", snr: 0, result: "hørte ikke", time: 1.2 },
        { played: "hvite kurver", snr: 2, result: "hvite kurver", time: 2.0 },
        { played: "svarte votter", snr: 0, result: "svarte penner", time: 2.5 },
        ...
    ]
}

Vi skal lagre:
For hver test: alder, kjønn og en liste over hva som skjedde. Hvert elemnt skal ha: hvilken lyd ble spilt, hvilken SNR, hva valgte barnet, og hvor lang tid brukte barnet.

