const game_items = [
    {
        id: 0,
        name: "Lyse knapper",
        ring: "circle-01",
        resource: "lyse_knapper",
        animation1: new Animation("animasjon_3/Frames-3-1/animspa-31-")
            .range(1, 28)
            .loop(4, 29, 30, 31, 32),
        animation2: new Animation("animasjon_3/Frames-3-2/animspa-32-")
            .range(1, 40)
    },
    {
        id: 1,
        name: "Mørke knapper",
        ring: "circle-02",
        resource: "morke_knapper",
        animation1: new Animation("animasjon_4/Frames-4-1/animspa-41-")
            .range(1, 34)
            .loop(2, 34),
        animation2: new Animation("animasjon_4/Frames-4-2/animspa-42-")
            .range(1, 38)
    },
    {
        id: 2,
        name: "Lyse penner",
        ring: "circle-03",
        resource: "lyse_penner",
        animation1: new Animation("animasjon_10/Frames-10-1/animspa-101-")
            .range(1, 25)
            .loop(5, 25),
        animation2: new Animation("animasjon_10/Frames-10-2/animspa-102-")
            .range(1, 37)
    },
    {
        id: 3,
        name: "Lyse kurver",
        ring: "circle-01",
        resource: "lyse_kurver",
        animation1: new Animation("animasjon_11/Frames-11-1/animspa-111-")
            .range(1, 25)
            .loop(4, 26, 27, 28, 29),
        animation2: new Animation("animasjon_11/Frames-11-2/animspa-112-")
            .range(1, 45)
    },
    {
        id: 4,
        name: "Mørke kurver",
        ring: "circle-02",
        resource: "morke_kurver",
        animation1: new Animation("animasjon_12/Frames-12-1/animspa-121-")
            .range(1, 26)
            .loop(5, 26),
        animation2: new Animation("animasjon_12/Frames-12-2/animspa-122-")
            .range(1, 39)
    },
    {
        id: 5,
        name: "Mørke ringer",
        ring: "circle-03",
        resource: "morke_ringer",
        animation1: new Animation("animasjon_8/Frames-8-1/animspa-81-")
            .range(1, 24)
            .range(13, 24)
            .sequence(7, 6, 5, 4, 3)
            .loop(4, 3),
        animation2: new Animation("animasjon_8/Frames-8-2/animspa-82-")
            .range(1, 46)
    },
    {
        id: 6,
        name: "Mørke penner",
        ring: "circle-01",
        resource: "morke_penner",
        animation1: new Animation("animasjon_9/Frames-9-1/animspa-91-")
            .range(1, 26)
            .loop(4, 26),
        animation2: new Animation("animasjon_9/Frames-9-2/animspa-92-")
            .range(1, 44)
    },
    {
        id: 7,
        name: "Mørke kasser",
        ring: "circle-02",
        resource: "morke_kasser",
        animation1: new Animation("animasjon_2/Frames-2-1/animspa-21-")
            .range(1, 24)
            .loop(6, 24),
        animation2: new Animation("animasjon_2/Frames-2-2/animspa-22-")
            .range(1, 37)
    },
    {
        id: 8,
        name: "Lyse luer",
        ring: "circle-03",
        resource: "lyse_luer",
        animation1: new Animation("animasjon_5/Frames-5-1/animspa-51-")
            .range(1, 38)
            .loop(3, 38),
        animation2: new Animation("animasjon_5/Frames-5-2/animspa-52-")
            .range(1, 39)
    },
    {
        id: 9,
        name: "Lyse ringer",
        ring: "circle-01",
        resource: "lyse_ringer",
        animation1: new Animation("animasjon_7/Frames-7-1/animspa-71-")
            .loop(3, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12),
        animation2: new Animation("animasjon_7/Frames-7-2/animspa-72-")
            .range(1, 40)
    },
    {
        id: 10,
        name: "Lyse kasser",
        ring: "circle-02",
        resource: "lyse_kasser",
        animation1: new Animation("animasjon_1/Frames-1-1/animspa-11-")
            .range(1, 14)
            .loop(7, 15, 16, 17, 18),
        animation2: new Animation("animasjon_1/Frames-1-2/animspa-12-")
            .range(1, 38)
    },
    {
        id: 11,
        name: "Mørke luer",
        ring: "circle-03",
        resource: "morke_luer",
        animation1: new Animation("animasjon_6/Frames-6-1/animspa-61-")
            .range(1, 30)
            .loop(2, 31, 32, 33, 34),
        animation2: new Animation("animasjon_6/Frames-6-2/animspa-62-")
            .range(1, 43)
    }
]

