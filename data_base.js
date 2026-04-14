//current database
let users = [
    {
        id: 0,
        username: "Tahdah001",
        rank: "F",
        currency: {
            gil: 0
        },
        profile: {
            title: "",
            created_at: ""
        }
    }
];

let avatars = [
    {
        id: 0,
        name: "Tahdah Hihat",
        type: "Red",
        image_portrait: "spr_character_0_dialogue.png",
        image_idle: "spr_character_idle_0.gif",
        image_walk: "spr_character_0_walk.gif"
    }
];

let users_avatars = [
    {
        id: 0,
        user_id: 0,
        avatar_id: 0,
        avatar_level: 1,
        base_stats: {
            hearts: 3,
            def: 12,
            res: 4,
            atk: 3,
            eva: 0,
            spATK: 0,
            dex: 0,
            spDEF: 2,
            cp: 7
        }
    }
];
let current_squad = [
    {slot: 0, user_id: 0, avatar_id: 0, ready: true},
    {slot: 1, user_id: null, avatar_id: null, ready: false},
    {slot: 2, user_id: null, avatar_id: null, ready: false}
];

const rank_reload_turns = {
    F: 0,
    E: 1,
    D: 2,
    C: 3,
    B: 4,
    A: 5,
    S: 7,
    SS: 7
};
    
let weapons = [
    {
        id: 0,
        name: "Shock Baton",
        desc: "Can possibly stun enemies.",
        image: "weapon_0.png",
        color: "blue",
        rarity: "common",
        cp_cost: 1,
        reload_type: "rank_based",
        use_phase: "battle",
        target_type: "enemy_single",
        uses_per_battle: null,
        stat_requirements: { spATK: 12 },
        effects: { def: 3, res: 5, atk: 3, eva: 4, spATK: 12, dex: 0, spDEF: 0 }
    },
    {
        id: 1,
        name: "Iron Pipe",
        desc: "Not the most practical weapon.",
        image: "weapon_1.png",
        color: "yellow",
        rarity: "common",
        cp_cost: 1,
        reload_type: "rank_based",
        use_phase: "battle",
        target_type: "enemy_single",
        uses_per_battle: null,
        stat_requirements: { atk: 5 },
        effects: { def: 4, res: 2, atk: 5, eva: 1, spATK: 0, dex: 1, spDEF: 0 }
    },
    {
        id: 2,
        name: "Combat Sword",
        desc: "A standard issued blade.",
        image: "weapon_2.png",
        color: "yellow",
        rarity: "common",
        cp_cost: 1,
        reload_type: "rank_based",
        use_phase: "battle",
        target_type: "enemy_single",
        uses_per_battle: null,
        stat_requirements: { atk: 8 },
        effects: { def: 3, res: 3, atk: 8, eva: 3, spATK: 0, dex: 4, spDEF: 1 }
    },
    {
        id: 3,
        name: "Chain Saw",
        desc: "A tool for buzzing off branches.",
        image: "weapon_3.png",
        color: "yellow",
        rarity: "uncommon",
        cp_cost: 2,
        reload_type: "rank_based",
        use_phase: "battle",
        target_type: "enemy_single",
        uses_per_battle: null,
        stat_requirements: { atk: 14 },
        effects: { def: 2, res: 1, atk: 14, eva: 0, spATK: 0, dex: -1, spDEF: 0 }
    },
    {
        id: 4,
        name: "Iron Chain",
        desc: "Whip and grab with this.",
        image: "weapon_4.png",
        color: "green",
        rarity: "common",
        cp_cost: 1,
        reload_type: "rank_based",
        use_phase: "battle",
        target_type: "enemy_single",
        uses_per_battle: null,
        stat_requirements: { dex: 6 },
        effects: { def: 1, res: 2, atk: 4, eva: 5, spATK: 0, dex: 6, spDEF: 0 }
    },
    {
        id: 5,
        name: "Sniper Rifle",
        desc: "With practice you can be super precise.",
        image: "weapon_5.png",
        color: "indigo",
        rarity: "rare",
        cp_cost: 3,
        reload_type: "rank_based",
        use_phase: "battle",
        target_type: "enemy_single",
        uses_per_battle: null,
        stat_requirements: { atk: 10, dex: 10 },
        effects: { def: 1, res: 3, atk: 10, eva: 2, spATK: 0, dex: 10, spDEF: 0 }
    },
    {
        id: 6,
        name: "Wooden Club",
        desc: "Though it is wooden, it really hurts.",
        image: "weapon_6.png",
        color: "yellow",
        rarity: "common",
        cp_cost: 1,
        reload_type: "rank_based",
        use_phase: "battle",
        target_type: "enemy_single",
        uses_per_battle: null,
        stat_requirements: { atk: 6 },
        effects: { def: 3, res: 1, atk: 6, eva: 0, spATK: 0, dex: 0, spDEF: 0 }
    },
    {
        id: 7,
        name: "Shotgun",
        desc: "Can hit more than one target.",
        image: "weapon_7.png",
        color: "indigo",
        rarity: "uncommon",
        cp_cost: 2,
        reload_type: "rank_based",
        use_phase: "battle",
        target_type: "enemy_single",
        uses_per_battle: null,
        stat_requirements: { atk: 12, dex: 10 },
        effects: { def: 2, res: 2, atk: 12, eva: -1, spATK: 0, dex: 1, spDEF: 0 }
    },
    {
        id: 8,
        name: "Blessed Staff",
        desc: "Use for pure reasons.",
        image: "weapon_8.png",
        color: "violet",
        rarity: "rare",
        cp_cost: 3,
        reload_type: "rank_based",
        use_phase: "battle",
        target_type: "enemy_single",
        uses_per_battle: null,
        stat_requirements: { spATK: 10, spDEF: 16 },
        effects: { def: 2, res: 8, atk: 2, eva: 2, spATK: 10, dex: 0, spDEF: 16 }
    },
    {
        id: 9,
        name: "Cursed Staff",
        desc: "Use for destruction.",
        image: "weapon_9.png",
        color: "blue",
        rarity: "uncommon",
        cp_cost: 2,
        reload_type: "rank_based",
        use_phase: "battle",
        target_type: "enemy_single",
        uses_per_battle: null,
        stat_requirements: { spATK: 16 },
        effects: { def: 1, res: 3, atk: 3, eva: 1, spATK: 16, dex: 0, spDEF: 2 }
    },
    {
        id: 10,
        name: "Sling Shot",
        desc: "Can stun enemies.",
        image: "weapon_10.png",
        color: "indigo",
        rarity: "common",
        cp_cost: 1,
        reload_type: "rank_based",
        use_phase: "battle",
        target_type: "enemy_single",
        uses_per_battle: null,
        stat_requirements: { dex: 8 },
        effects: { def: 1, res: 1, atk: 2, eva: 6, spATK: 0, dex: 8, spDEF: 0 }
    },
    {
        id: 11,
        name: "Iron Mace",
        desc: "Crushes bones easily.",
        image: "weapon_11.png",
        color: "yellow",
        rarity: "common",
        cp_cost: 1,
        reload_type: "rank_based",
        use_phase: "battle",
        target_type: "enemy_single",
        uses_per_battle: null,
        stat_requirements: { atk: 9 },
        effects: { def: 5, res: 2, atk: 9, eva: -1, spATK: 0, dex: 0, spDEF: 1 }
    },
    {
        id: 12,
        name: "Iron Spear",
        desc: "Swing or throw this one.",
        image: "weapon_12.png",
        color: "yellow",
        rarity: "common",
        cp_cost: 1,
        reload_type: "rank_based",
        use_phase: "battle",
        target_type: "enemy_single",
        uses_per_battle: null,
        stat_requirements: { atk: 7 },
        effects: { def: 3, res: 2, atk: 7, eva: 3, spATK: 0, dex: 5, spDEF: 0 }
    },
    {
        id: 13,
        name: "Gauntlet",
        desc: "A puncher to punch with.",
        image: "weapon_13.png",
        color: "indigo",
        rarity: "common",
        cp_cost: 1,
        reload_type: "rank_based",
        use_phase: "battle",
        target_type: "enemy_single",
        uses_per_battle: null,
        stat_requirements: { dex: 6 },
        effects: { def: 4, res: 3, atk: 6, eva: 4, spATK: 0, dex: 6, spDEF: 0 }
    },
    {
        id: 14,
        name: "Iron Claws",
        desc: "Slice foes or make a salad.",
        image: "weapon_14.png",
        color: "yellow",
        rarity: "common",
        cp_cost: 1,
        reload_type: "rank_based",
        use_phase: "battle",
        target_type: "enemy_single",
        uses_per_battle: null,
        stat_requirements: { atk: 8 },
        effects: { def: 2, res: 2, atk: 8, eva: 5, spATK: 0, dex: 7, spDEF: 0 }
    },
    {
        id: 15,
        name: "Poison Dagger",
        desc: "Simple cut will poison enemies.",
        image: "weapon_15.png",
        color: "green",
        rarity: "common",
        cp_cost: 1,
        reload_type: "rank_based",
        use_phase: "battle",
        target_type: "enemy_single",
        uses_per_battle: null,
        stat_requirements: { dex: 8, eva: 8 },
        effects: { def: 1, res: 2, atk: 5, eva: 14, spATK: 6, dex: 5, spDEF: 0 }
    },
    {
        id: 16,
        name: "Iron Axe",
        desc: "Swing this around or throw it if you are feeling lucky.",
        image: "weapon_16.png",
        color: "yellow",
        rarity: "uncommon",
        cp_cost: 2,
        reload_type: "rank_based",
        use_phase: "battle",
        target_type: "enemy_single",
        uses_per_battle: null,
        stat_requirements: { atk: 11 },
        effects: { def: 4, res: 2, atk: 11, eva: 1, spATK: 0, dex: 2, spDEF: 0 }
    },
    {
        id: 17,
        name: "Ye Old Blapper",
        desc: "One shot in the chamber, great damage if it hits.",
        image: "weapon_17.png",
        color: "indigo",
        rarity: "uncommon",
        cp_cost: 2,
        reload_type: "rank_based",
        use_phase: "battle",
        target_type: "enemy_single",
        uses_per_battle: null,
        stat_requirements: { dex: 13, atk: 8 },
        effects: { def: 1, res: 1, atk: 5, eva: -2, spATK: 0, dex: 13, spDEF: 0 }
    },
    {
        id: 18,
        name: "Leather Whip",
        desc: "Crack that whip.",
        image: "weapon_18.png",
        color: "green",
        rarity: "common",
        cp_cost: 1,
        reload_type: "rank_based",
        use_phase: "battle",
        target_type: "enemy_single",
        uses_per_battle: null,
        stat_requirements: { dex: 7, eva: 6 },
        effects: { def: 1, res: 2, atk: 3, eva: 6, spATK: 0, dex: 7, spDEF: 0 }
    },
    {
        id: 19,
        name: "Spiked Mace",
        desc: "Swing this around but watch yourself.",
        image: "weapon_19.png",
        color: "red",
        rarity: "uncommon",
        cp_cost: 2,
        reload_type: "rank_based",
        use_phase: "battle",
        target_type: "enemy_single",
        uses_per_battle: null,
        stat_requirements: { atk: 12, def: 8 },
        effects: { def: 5, res: 2, atk: 12, eva: -2, spATK: 0, dex: 0, spDEF: 1 }
    },
    {
        id: 20,
        name: "Mage Staff",
        desc: "Perfect magic walking stick.",
        image: "weapon_20.png",
        color: "violet",
        rarity: "rare",
        cp_cost: 3,
        reload_type: "rank_based",
        use_phase: "battle",
        target_type: "enemy_single",
        uses_per_battle: null,
        stat_requirements: { spATK: 11, spDEF: 11 },
        effects: { def: 2, res: 7, atk: 3, eva: 2, spATK: 11, dex: 0, spDEF: 11 }
    },
    {
        id: 21,
        name: "Buster Sword",
        desc: "A huge sword that takes strength to carry.",
        image: "weapon_21.png",
        color: "yellow",
        rarity: "uncommon",
        cp_cost: 2,
        reload_type: "rank_based",
        use_phase: "battle",
        target_type: "enemy_single",
        uses_per_battle: null,
        stat_requirements: { atk: 14, def: 8 },
        effects: { def: 6, res: 3, atk: 14, eva: -3, spATK: 0, dex: 1, spDEF: 1 }
    },
    {
        id: 22,
        name: "Bow",
        desc: "An accurate choice.",
        image: "weapon_22.png",
        color: "indigo",
        rarity: "rare",
        cp_cost: 3,
        reload_type: "rank_based",
        use_phase: "battle",
        target_type: "enemy_single",
        uses_per_battle: null,
        stat_requirements: { dex: 19 },
        effects: { def: 1, res: 2, atk: 7, eva: 4, spATK: 0, dex: 19, spDEF: 0 }
    },
    {
        id: 23,
        name: "Iron Dagger",
        desc: "Baby's first weapon.",
        image: "weapon_23.png",
        color: "green",
        rarity: "common",
        cp_cost: 1,
        reload_type: "rank_based",
        use_phase: "battle",
        target_type: "enemy_single",
        uses_per_battle: null,
        stat_requirements: { dex: 6, eva: 4 },
        effects: { def: 1, res: 1, atk: 4, eva: 5, spATK: 0, dex: 6, spDEF: 0 }
    }
];
let equipments = [
    {
        id: 0,
        name: "Clown Shoes",
        desc: "Defense-focused footwear. Good for risky dungeons, but lowers evasion.",
        image: "equip_0.png",
        color: "red",
        rarity: "common",
        slot_type: "equipment",
        equip_phase: "out_of_battle",
        tags: ["defense", "tradeoff"],
        effects: { def: 18, res: 8, atk: 4, eva: -4, spATK: 0, dex: 6, spDEF: 8 }
    },
    {
        id: 1,
        name: "Fairy Wings",
        desc: "Resistance-focused gear with balanced magical support.",
        image: "equip_1.png",
        color: "orange",
        rarity: "common",
        slot_type: "equipment",
        equip_phase: "out_of_battle",
        tags: ["resistance", "support"],
        effects: { def: 8, res: 18, atk: 4, eva: 8, spATK: 8, dex: 4, spDEF: 8 }
    },
    {
        id: 2,
        name: "Black Hoodie",
        desc: "Attack-focused gear with modest mobility, but weaker defense.",
        image: "equip_2.png",
        color: "yellow",
        rarity: "common",
        slot_type: "equipment",
        equip_phase: "out_of_battle",
        tags: ["attack", "tradeoff"],
        effects: { def: -4, res: 0, atk: 18, eva: 5, spATK: 0, dex: 6, spDEF: 0 }
    },
    {
        id: 3,
        name: "Green Ring",
        desc: "Evasion-focused gear with a light offensive penalty.",
        image: "equip_3.png",
        color: "green",
        rarity: "common",
        slot_type: "equipment",
        equip_phase: "out_of_battle",
        tags: ["evasion", "tradeoff"],
        effects: { def: 4, res: 8, atk: -2, eva: 18, spATK: 8, dex: 6, spDEF: 6 }
    },
    {
        id: 4,
        name: "Tap Shoes",
        desc: "Special attack-focused gear with fragile footing.",
        image: "equip_4.png",
        color: "blue",
        rarity: "common",
        slot_type: "equipment",
        equip_phase: "out_of_battle",
        tags: ["special_attack", "tradeoff"],
        effects: { def: -4, res: 8, atk: 4, eva: -2, spATK: 18, dex: 4, spDEF: 9 }
    },
    {
        id: 5,
        name: "Gas Mask",
        desc: "Dexterity-focused equipment with practical survivability.",
        image: "equip_5.png",
        color: "indigo",
        rarity: "common",
        slot_type: "equipment",
        equip_phase: "out_of_battle",
        tags: ["dexterity", "utility"],
        effects: { def: 7, res: 4, atk: 0, eva: 8, spATK: 0, dex: 18, spDEF: 4 }
    },
    {
        id: 6,
        name: "Blessed Thorns",
        desc: "Special defense-focused gear with balanced support stats.",
        image: "equip_6.png",
        color: "violet",
        rarity: "common",
        slot_type: "equipment",
        equip_phase: "out_of_battle",
        tags: ["special_defense", "support"],
        effects: { def: 8, res: 8, atk: 4, eva: 0, spATK: 7, dex: 8, spDEF: 18 }
    },

    {
        id: 7,
        name: "Clown Hat",
        desc: "Heavy defense gear with a harsher evasion tradeoff.",
        image: "equip_7.png",
        color: "red",
        rarity: "uncommon",
        slot_type: "equipment",
        equip_phase: "out_of_battle",
        tags: ["defense", "tradeoff"],
        effects: { def: 30, res: 12, atk: 6, eva: -6, spATK: 0, dex: 10, spDEF: 12 }
    },
    {
        id: 8,
        name: "Glittering Gown",
        desc: "High resistance gear with balanced magical growth.",
        image: "equip_8.png",
        color: "orange",
        rarity: "uncommon",
        slot_type: "equipment",
        equip_phase: "out_of_battle",
        tags: ["resistance", "support"],
        effects: { def: 12, res: 30, atk: 6, eva: 12, spATK: 12, dex: 8, spDEF: 12 }
    },
    {
        id: 9,
        name: "Yellow Sneakers",
        desc: "High attack gear with reduced defense.",
        image: "equip_9.png",
        color: "yellow",
        rarity: "uncommon",
        slot_type: "equipment",
        equip_phase: "out_of_battle",
        tags: ["attack", "tradeoff"],
        effects: { def: -6, res: 0, atk: 30, eva: 8, spATK: 0, dex: 12, spDEF: 0 }
    },
    {
        id: 10,
        name: "Whispful Shaw",
        desc: "High evasion gear that trades away some attack.",
        image: "equip_10.png",
        color: "green",
        rarity: "uncommon",
        slot_type: "equipment",
        equip_phase: "out_of_battle",
        tags: ["evasion", "tradeoff"],
        effects: { def: 6, res: 12, atk: -4, eva: 30, spATK: 12, dex: 10, spDEF: 10 }
    },
    {
        id: 11,
        name: "Purple Blazer",
        desc: "High special attack gear with defensive drawbacks.",
        image: "equip_11.png",
        color: "blue",
        rarity: "uncommon",
        slot_type: "equipment",
        equip_phase: "out_of_battle",
        tags: ["special_attack", "tradeoff"],
        effects: { def: -6, res: 12, atk: 6, eva: -4, spATK: 30, dex: 8, spDEF: 14 }
    },
    {
        id: 12,
        name: "Tactical Boots",
        desc: "High dexterity gear with balanced support bonuses.",
        image: "equip_12.png",
        color: "indigo",
        rarity: "uncommon",
        slot_type: "equipment",
        equip_phase: "out_of_battle",
        tags: ["dexterity", "utility"],
        effects: { def: 10, res: 8, atk: 0, eva: 12, spATK: 0, dex: 30, spDEF: 8 }
    },
    {
        id: 13,
        name: "Queens Robe",
        desc: "High special defense gear with broad magical support.",
        image: "equip_13.png",
        color: "violet",
        rarity: "uncommon",
        slot_type: "equipment",
        equip_phase: "out_of_battle",
        tags: ["special_defense", "support"],
        effects: { def: 12, res: 12, atk: 6, eva: 0, spATK: 10, dex: 12, spDEF: 30 }
    },

    {
        id: 14,
        name: "War Paint",
        desc: "Very high defense gear with steep evasion loss.",
        image: "equip_14.png",
        color: "red",
        rarity: "rare",
        slot_type: "equipment",
        equip_phase: "out_of_battle",
        tags: ["defense", "tradeoff"],
        effects: { def: 45, res: 18, atk: 10, eva: -8, spATK: 0, dex: 16, spDEF: 18 }
    },
    {
        id: 15,
        name: "Magic Slippers",
        desc: "Very high resistance gear with strong supportive bonuses.",
        image: "equip_15.png",
        color: "orange",
        rarity: "rare",
        slot_type: "equipment",
        equip_phase: "out_of_battle",
        tags: ["resistance", "support"],
        effects: { def: 18, res: 45, atk: 10, eva: 18, spATK: 18, dex: 12, spDEF: 18 }
    },
    {
        id: 16,
        name: "Black Jeans",
        desc: "Very high attack gear with severe defensive tradeoff.",
        image: "equip_16.png",
        color: "yellow",
        rarity: "rare",
        slot_type: "equipment",
        equip_phase: "out_of_battle",
        tags: ["attack", "tradeoff"],
        effects: { def: -8, res: 0, atk: 45, eva: 12, spATK: 0, dex: 16, spDEF: 0 }
    },
    {
        id: 17,
        name: "Braided Band",
        desc: "Very high evasion gear with offensive loss.",
        image: "equip_17.png",
        color: "green",
        rarity: "rare",
        slot_type: "equipment",
        equip_phase: "out_of_battle",
        tags: ["evasion", "tradeoff"],
        effects: { def: 10, res: 18, atk: -6, eva: 45, spATK: 18, dex: 16, spDEF: 14 }
    },
    {
        id: 18,
        name: "Black Tie",
        desc: "Very high special attack gear with weaker defenses.",
        image: "equip_18.png",
        color: "blue",
        rarity: "rare",
        slot_type: "equipment",
        equip_phase: "out_of_battle",
        tags: ["special_attack", "tradeoff"],
        effects: { def: -8, res: 18, atk: 10, eva: -6, spATK: 45, dex: 12, spDEF: 20 }
    },
    {
        id: 19,
        name: "Tactical Vest",
        desc: "Very high dexterity gear with strong utility balance.",
        image: "equip_19.png",
        color: "indigo",
        rarity: "rare",
        slot_type: "equipment",
        equip_phase: "out_of_battle",
        tags: ["dexterity", "utility"],
        effects: { def: 16, res: 12, atk: 0, eva: 18, spATK: 0, dex: 45, spDEF: 12 }
    },
    {
        id: 20,
        name: "Royal Ring",
        desc: "Very high special defense gear with broad stat support.",
        image: "equip_20.png",
        color: "violet",
        rarity: "rare",
        slot_type: "equipment",
        equip_phase: "out_of_battle",
        tags: ["special_defense", "support"],
        effects: { def: 18, res: 18, atk: 10, eva: 0, spATK: 16, dex: 18, spDEF: 45 }
    }
];



let items = [
    // BASIC BATTLE ITEMS
    {
        id: 0,
        name: "Potion",
        desc: "Regain 1 Heart.",
        image: "item_0.png",
        color: "red",
        rarity: "common",
        use_phase: "battle",
        uses_per_battle: 1,
        consume_on_use: false,
        reload_type: "battle_reset",
        durability: null,
        effects: { type: "heart", amount: 1 },
        cp_cost: 1,
    },
    {
        id: 1,
        name: "Ether",
        desc: "Reduce card reload by 1 turn.",
        image: "item_1.png",
        color: "orange",
        rarity: "common",
        use_phase: "battle",
        uses_per_battle: 1,
        consume_on_use: false,
        reload_type: "battle_reset",
        durability: null,
        effects: { type: "cooldown", amount: -1 },
        cp_cost: 1,
    },
    {
        id: 2,
        name: "Antidote",
        desc: "Remove one negative status effect.",
        image: "item_2.png",
        color: "green",
        rarity: "common",
        use_phase: "battle",
        uses_per_battle: 1,
        consume_on_use: false,
        reload_type: "battle_reset",
        durability: null,
        effects: { type: "cleanse", amount: 1 },
        cp_cost: 1,
    },
    {
        id: 3,
        name: "Barrier",
        desc: "Build a barrier that absorbs 2 hits.",
        image: "item_3.png",
        color: "yellow",
        rarity: "common",
        use_phase: "battle",
        uses_per_battle: 1,
        consume_on_use: false,
        reload_type: "battle_reset",
        durability: null,
        effects: { type: "barrier", amount: 2 },
        cp_cost: 1,
    },
    {
        id: 4,
        name: "Healyx",
        desc: "Regenerate stats at a low rate. Can go beyond normal max.",
        image: "item_4.png",
        color: "violet",
        rarity: "common",
        use_phase: "battle",
        uses_per_battle: 1,
        consume_on_use: false,
        reload_type: "battle_reset",
        durability: null,
        effects: { type: "regen", amount: 0.2 },
        cp_cost: 1,
    },
    {
        id: 5,
        name: "Revive",
        desc: "Revive self or team-mate with 1 Heart.",
        image: "item_5.png",
        color: "orange",
        rarity: "common",
        use_phase: "battle",
        uses_per_battle: 1,
        consume_on_use: false,
        reload_type: "battle_reset",
        durability: null,
        effects: { type: "revive", amount: 1 },
        cp_cost: 3,
    },

    // BASIC FIELD ITEM
    {
        id: 6,
        name: "Sleeping Bag",
        desc: "Out of battle: regain all hearts. Breaks on use. Sets checkpoint.",
        image: "item_6.png",
        color: "indigo",
        rarity: "common",
        use_phase: "field",
        uses_per_battle: 0,
        consume_on_use: true,
        reload_type: "none",
        durability: 1,
        effects: { type: "recovery", amount: 1 }
    },

    // MID BATTLE ITEMS
    {
        id: 7,
        name: "Mid Potion",
        desc: "Regain 2 Hearts.",
        image: "item_7.png",
        color: "red",
        rarity: "uncommon",
        use_phase: "battle",
        uses_per_battle: 1,
        consume_on_use: false,
        reload_type: "battle_reset",
        durability: null,
        effects: { type: "heart", amount: 2 },
        cp_cost: 2,
    },
    {
        id: 8,
        name: "Mid Ether",
        desc: "Reduce card reload by 2 turns.",
        image: "item_8.png",
        color: "blue",
        rarity: "uncommon",
        use_phase: "battle",
        uses_per_battle: 1,
        consume_on_use: false,
        reload_type: "battle_reset",
        durability: null,
        effects: { type: "cooldown", amount: -2 },
        cp_cost: 2,
    },
    {
        id: 9,
        name: "Mid Antidote",
        desc: "Remove up to 2 negative status effects.",
        image: "item_9.png",
        color: "green",
        rarity: "uncommon",
        use_phase: "battle",
        uses_per_battle: 1,
        consume_on_use: false,
        reload_type: "battle_reset",
        durability: null,
        effects: { type: "cleanse", amount: 2 },
        cp_cost: 2,
    },
    {
        id: 10,
        name: "Mid Barrier",
        desc: "Build a barrier that absorbs 2 strong hits.",
        image: "item_10.png",
        color: "yellow",
        rarity: "uncommon",
        use_phase: "battle",
        uses_per_battle: 1,
        consume_on_use: false,
        reload_type: "battle_reset",
        durability: null,
        effects: { type: "barrier", amount: 2 },
        cp_cost: 2,
    },
    {
        id: 11,
        name: "Mid Healyx",
        desc: "Regenerate stats at a medium rate. Can go beyond normal max.",
        image: "item_11.png",
        color: "violet",
        rarity: "uncommon",
        use_phase: "battle",
        uses_per_battle: 1,
        consume_on_use: false,
        reload_type: "battle_reset",
        durability: null,
        effects: { type: "regen", amount: 0.5 },
        cp_cost: 2,
    },
    {
        id: 12,
        name: "Mid Revive",
        desc: "Revive self or team-mate with 2 Hearts.",
        image: "item_12.png",
        color: "orange",
        rarity: "uncommon",
        use_phase: "battle",
        uses_per_battle: 1,
        consume_on_use: false,
        reload_type: "battle_reset",
        durability: null,
        effects: { type: "revive", amount: 2 },
        cp_cost: 3,
    },

    // MID FIELD ITEM
    {
        id: 13,
        name: "Tent",
        desc: "Out of battle: regain all hearts. Breaks after 2 uses. Sets checkpoint. Can cook food.",
        image: "item_13.png",
        color: "indigo",
        rarity: "uncommon",
        use_phase: "field",
        uses_per_battle: 0,
        consume_on_use: false,
        reload_type: "none",
        durability: 2,
        effects: { type: "recovery", amount: 2 }
    },

    // HIGH BATTLE ITEMS
    {
        id: 14,
        name: "High Potion",
        desc: "Regain 3 Hearts.",
        image: "item_14.png",
        color: "red",
        rarity: "rare",
        use_phase: "battle",
        uses_per_battle: 1,
        consume_on_use: false,
        reload_type: "battle_reset",
        durability: null,
        effects: { type: "heart", amount: 3 },
        cp_cost: 3,
    },
    {
        id: 15,
        name: "High Ether",
        desc: "Reduce card reload by 3 turns.",
        image: "item_15.png",
        color: "blue",
        rarity: "rare",
        use_phase: "battle",
        uses_per_battle: 1,
        consume_on_use: false,
        reload_type: "battle_reset",
        durability: null,
        effects: { type: "cooldown", amount: -3 },
        cp_cost: 3,
    },
    {
        id: 16,
        name: "High Antidote",
        desc: "Remove up to 3 negative status effects.",
        image: "item_16.png",
        color: "green",
        rarity: "rare",
        use_phase: "battle",
        uses_per_battle: 1,
        consume_on_use: false,
        reload_type: "battle_reset",
        durability: null,
        effects: { type: "cleanse", amount: 3 },
        cp_cost: 3,
    },
    {
        id: 17,
        name: "High Barrier",
        desc: "Build a barrier that absorbs 3 hits.",
        image: "item_17.png",
        color: "yellow",
        rarity: "rare",
        use_phase: "battle",
        uses_per_battle: 1,
        consume_on_use: false,
        reload_type: "battle_reset",
        durability: null,
        effects: { type: "barrier", amount: 3 },
        cp_cost: 3,
    },
    {
        id: 18,
        name: "High Healyx",
        desc: "Regenerate stats at a rapid rate. Can go beyond normal max.",
        image: "item_18.png",
        color: "violet",
        rarity: "rare",
        use_phase: "battle",
        uses_per_battle: 1,
        consume_on_use: false,
        reload_type: "battle_reset",
        durability: null,
        effects: { type: "regen", amount: 1.0 },
        cp_cost: 3,
    },
    {
        id: 19,
        name: "High Revive",
        desc: "Revive self or team-mate with 3 Hearts.",
        image: "item_19.png",
        color: "orange",
        rarity: "rare",
        use_phase: "battle",
        uses_per_battle: 1,
        consume_on_use: false,
        reload_type: "battle_reset",
        durability: null,
        effects: { type: "revive", amount: 3 },
        cp_cost: 4,
    },

    // HIGH FIELD ITEM
    {
        id: 20,
        name: "Cottage",
        desc: "Out of battle: regain all hearts. Breaks after 3 uses. Checkpoint, cooking, and shopping.",
        image: "item_20.png",
        color: "indigo",
        rarity: "rare",
        use_phase: "field",
        uses_per_battle: 0,
        consume_on_use: false,
        reload_type: "none",
        durability: 3,
        effects: { type: "recovery", amount: 3 }
    },

    // EPIC BATTLE ITEMS
    {
        id: 21,
        name: "Moon Potion",
        desc: "Once per battle, the squad regains all Hearts.",
        image: "item_21.png",
        color: "red",
        rarity: "epic",
        use_phase: "battle",
        uses_per_battle: 1,
        consume_on_use: false,
        reload_type: "battle_reset",
        durability: null,
        effects: { type: "heart", amount: "full" },
        cp_cost: 4,
    },
    {
        id: 22,
        name: "Void Ether",
        desc: "Once per battle, reset all card cooldowns.",
        image: "item_22.png",
        color: "blue",
        rarity: "epic",
        use_phase: "battle",
        uses_per_battle: 1,
        consume_on_use: false,
        reload_type: "battle_reset",
        durability: null,
        effects: { type: "cooldown", amount: "reset_all" },
        cp_cost: 4,
    },
    {
        id: 23,
        name: "Star Antidote",
        desc: "Once per battle, remove all negative status effects.",
        image: "item_23.png",
        color: "green",
        rarity: "epic",
        use_phase: "battle",
        uses_per_battle: 1,
        consume_on_use: false,
        reload_type: "battle_reset",
        durability: null,
        effects: { type: "cleanse", amount: "all" },
        cp_cost: 4,
    },
    {
        id: 24,
        name: "Moon Barrier",
        desc: "Once per battle, build a barrier that lasts 3 turns.",
        image: "item_24.png",
        color: "yellow",
        rarity: "epic",
        use_phase: "battle",
        uses_per_battle: 1,
        consume_on_use: false,
        reload_type: "battle_reset",
        durability: null,
        effects: { type: "barrier", amount: "3turn" },
        cp_cost: 4,
    },
    {
        id: 25,
        name: "Void Healyx",
        desc: "Once per battle, max out stats for 3 turns.",
        image: "item_25.png",
        color: "violet",
        rarity: "epic",
        use_phase: "battle",
        uses_per_battle: 1,
        consume_on_use: false,
        reload_type: "battle_reset",
        durability: null,
        effects: { type: "regen", amount: "max" },
        cp_cost: 4,
    },
    {
        id: 26,
        name: "Star Revive",
        desc: "Once per battle, revive the squad with 4 Hearts and max stats.",
        image: "item_26.png",
        color: "orange",
        rarity: "epic",
        use_phase: "battle",
        uses_per_battle: 1,
        consume_on_use: false,
        reload_type: "battle_reset",
        durability: null,
        effects: { type: "revive", amount: 4 },
        cp_cost: 5,
    },

    // LEGENDARY FIELD ITEM
    {
        id: 27,
        name: "Hotel Door",
        desc: "Out of battle: regain 4 hearts. Breaks after 4 uses. Checkpoint, food, shop, and teleport.",
        image: "item_27.png",
        color: "indigo",
        rarity: "legendary",
        use_phase: "field",
        uses_per_battle: 0,
        consume_on_use: false,
        reload_type: "none",
        durability: 4,
        effects: { type: "recovery", amount: 4 }
    }
];


let manifest = [
    // WAVE 1 — common
    {
        id: 0,
        name: "Rock",
        desc: "Manifest rocks to damage multiple enemies. Slightly lowers enemy defense.",
        image: "manifest_0.png",
        color: "red",
        rarity: "common",
        cp_cost: 1,
        use_phase: "battle",
        reload_type: "rank_based",
        uses_per_battle: null,
        target_type: "enemy_all",
        stat_requirements: { def: 10 },
        effects: {
            damage_type: "earth",
            d_output: 0.40,
            perk_type: "def_down",
            p_output: 0.05,
            special: null
        }
    },
    {
        id: 1,
        name: "Splash",
        desc: "Manifest water to hit multiple enemies. Slightly regenerates player stats.",
        image: "manifest_1.png",
        color: "orange",
        rarity: "common",
        cp_cost: 1,
        use_phase: "battle",
        reload_type: "rank_based",
        uses_per_battle: null,
        target_type: "enemy_all",
        stat_requirements: { res: 10 },
        effects: {
            damage_type: "water",
            d_output: 0.40,
            perk_type: "regen",
            p_output: 0.05,
            special: null
        }
    },
    {
        id: 2,
        name: "Spark",
        desc: "Manifest fire sparks to hit a single enemy. Slightly lowers enemy attack.",
        image: "manifest_2.png",
        color: "yellow",
        rarity: "common",
        cp_cost: 1,
        use_phase: "battle",
        reload_type: "rank_based",
        uses_per_battle: null,
        target_type: "enemy_single",
        stat_requirements: { atk: 10 },
        effects: {
            damage_type: "fire",
            d_output: 0.40,
            perk_type: "atk_down",
            p_output: 0.05,
            special: null
        }
    },
    {
        id: 3,
        name: "Blow",
        desc: "Manifest wind to hit a single enemy. Slightly raises player evasion.",
        image: "manifest_3.png",
        color: "green",
        rarity: "common",
        cp_cost: 1,
        use_phase: "battle",
        reload_type: "rank_based",
        uses_per_battle: null,
        target_type: "enemy_single",
        stat_requirements: { eva: 10 },
        effects: {
            damage_type: "wind",
            d_output: 0.40,
            perk_type: "eva_up",
            p_output: 0.05,
            special: null
        }
    },
    {
        id: 4,
        name: "Whisper",
        desc: "Manifest cosmic energy to hit multiple enemies. Slightly lowers enemy special attack and raises player attack.",
        image: "manifest_4.png",
        color: "blue",
        rarity: "common",
        cp_cost: 1,
        use_phase: "battle",
        reload_type: "rank_based",
        uses_per_battle: null,
        target_type: "enemy_all",
        stat_requirements: { spATK: 10 },
        effects: {
            damage_type: "cosmic",
            d_output: 0.40,
            perk_type: "spatk_mix",
            p_output: 0.05,
            special: null
        }
    },
    {
        id: 5,
        name: "Dart",
        desc: "Manifest a dart to hit a single enemy. Slightly lowers enemy evasion.",
        image: "manifest_5.png",
        color: "indigo",
        rarity: "common",
        cp_cost: 1,
        use_phase: "battle",
        reload_type: "rank_based",
        uses_per_battle: null,
        target_type: "enemy_single",
        stat_requirements: { dex: 10 },
        effects: {
            damage_type: "pierce",
            d_output: 0.40,
            perk_type: "eva_down",
            p_output: 0.05,
            special: null
        }
    },
    {
        id: 6,
        name: "Wall",
        desc: "Manifest a wall to hit multiple enemies. Raises player special defense.",
        image: "manifest_6.png",
        color: "violet",
        rarity: "common",
        cp_cost: 1,
        use_phase: "battle",
        reload_type: "rank_based",
        uses_per_battle: null,
        target_type: "enemy_all",
        stat_requirements: { spDEF: 10 },
        effects: {
            damage_type: "impact",
            d_output: 0.40,
            perk_type: "spdef_up",
            p_output: 0.05,
            special: null
        }
    },

    // WAVE 2 — uncommon
    {
        id: 7,
        name: "Stone",
        desc: "Manifest stones to damage multiple enemies. Lowers enemy defense.",
        image: "manifest_7.png",
        color: "red",
        rarity: "uncommon",
        cp_cost: 2,
        use_phase: "battle",
        reload_type: "rank_based",
        uses_per_battle: null,
        target_type: "enemy_all",
        stat_requirements: { def: 18 },
        effects: {
            damage_type: "earth",
            d_output: 0.55,
            perk_type: "def_down",
            p_output: 0.08,
            special: null
        }
    },
    {
        id: 8,
        name: "Wave",
        desc: "Manifest a wave to hit multiple enemies. Regenerates player stats and can stun enemies.",
        image: "manifest_8.png",
        color: "orange",
        rarity: "uncommon",
        cp_cost: 2,
        use_phase: "battle",
        reload_type: "rank_based",
        uses_per_battle: null,
        target_type: "enemy_all",
        stat_requirements: { res: 18 },
        effects: {
            damage_type: "water",
            d_output: 0.55,
            perk_type: "regen",
            p_output: 0.08,
            special: "stun_chance"
        }
    },
    {
        id: 9,
        name: "Whisp",
        desc: "Manifest a fire whisp to hit a single enemy. Lowers enemy attack and slightly raises player attack.",
        image: "manifest_9.png",
        color: "yellow",
        rarity: "uncommon",
        cp_cost: 2,
        use_phase: "battle",
        reload_type: "rank_based",
        uses_per_battle: null,
        target_type: "enemy_single",
        stat_requirements: { atk: 18 },
        effects: {
            damage_type: "fire",
            d_output: 0.55,
            perk_type: "atk_down",
            p_output: 0.08,
            special: "atk_up_small"
        }
    },
    {
        id: 10,
        name: "Gust",
        desc: "Manifest a gust of wind to hit multiple enemies. Raises player evasion.",
        image: "manifest_10.png",
        color: "green",
        rarity: "uncommon",
        cp_cost: 2,
        use_phase: "battle",
        reload_type: "rank_based",
        uses_per_battle: null,
        target_type: "enemy_all",
        stat_requirements: { eva: 18 },
        effects: {
            damage_type: "wind",
            d_output: 0.55,
            perk_type: "eva_up",
            p_output: 0.08,
            special: null
        }
    },
    {
        id: 11,
        name: "Voice",
        desc: "Manifest cosmic energy to hit a single enemy. Lowers enemy special attack and raises player special attack.",
        image: "manifest_11.png",
        color: "blue",
        rarity: "uncommon",
        cp_cost: 2,
        use_phase: "battle",
        reload_type: "rank_based",
        uses_per_battle: null,
        target_type: "enemy_single",
        stat_requirements: { spATK: 18 },
        effects: {
            damage_type: "cosmic",
            d_output: 0.55,
            perk_type: "spatk_up",
            p_output: 0.08,
            special: null
        }
    },
    {
        id: 12,
        name: "Arrow",
        desc: "Manifest an arrow to hit a single enemy. Lowers enemy evasion and slightly raises player dexterity.",
        image: "manifest_12.png",
        color: "indigo",
        rarity: "uncommon",
        cp_cost: 2,
        use_phase: "battle",
        reload_type: "rank_based",
        uses_per_battle: null,
        target_type: "enemy_single",
        stat_requirements: { dex: 18 },
        effects: {
            damage_type: "pierce",
            d_output: 0.55,
            perk_type: "dex_up",
            p_output: 0.08,
            special: null
        }
    },
    {
        id: 13,
        name: "Close",
        desc: "Manifest two walls to smash a single enemy. Raises player special defense and can stun enemy.",
        image: "manifest_13.png",
        color: "violet",
        rarity: "uncommon",
        cp_cost: 2,
        use_phase: "battle",
        reload_type: "rank_based",
        uses_per_battle: null,
        target_type: "enemy_single",
        stat_requirements: { spDEF: 18 },
        effects: {
            damage_type: "impact",
            d_output: 0.55,
            perk_type: "spdef_up",
            p_output: 0.08,
            special: "stun_chance"
        }
    },

    // WAVE 3 — rare
    {
        id: 14,
        name: "Boulder",
        desc: "Manifest boulders to damage multiple enemies. Greatly lowers enemy defense.",
        image: "manifest_14.png",
        color: "red",
        rarity: "rare",
        cp_cost: 3,
        use_phase: "battle",
        reload_type: "rank_based",
        uses_per_battle: null,
        target_type: "enemy_all",
        stat_requirements: { def: 26 },
        effects: {
            damage_type: "earth",
            d_output: 0.70,
            perk_type: "def_down",
            p_output: 0.12,
            special: null
        }
    },
    {
        id: 15,
        name: "Tidal Force",
        desc: "Manifest a massive wave to hit multiple enemies. Greatly regenerates player stats and can stun enemies.",
        image: "manifest_15.png",
        color: "orange",
        rarity: "rare",
        cp_cost: 3,
        use_phase: "battle",
        reload_type: "rank_based",
        uses_per_battle: null,
        target_type: "enemy_all",
        stat_requirements: { res: 26 },
        effects: {
            damage_type: "water",
            d_output: 0.70,
            perk_type: "regen",
            p_output: 0.12,
            special: "stun_chance"
        }
    },
    {
        id: 16,
        name: "Blast",
        desc: "Manifest a fire blast to hit multiple enemies. Lowers enemy attack and raises player attack.",
        image: "manifest_16.png",
        color: "yellow",
        rarity: "rare",
        cp_cost: 3,
        use_phase: "battle",
        reload_type: "rank_based",
        uses_per_battle: null,
        target_type: "enemy_all",
        stat_requirements: { atk: 26 },
        effects: {
            damage_type: "fire",
            d_output: 0.70,
            perk_type: "atk_down",
            p_output: 0.12,
            special: "atk_up"
        }
    },
    {
        id: 17,
        name: "Tornado",
        desc: "Manifest a tornado to hit multiple enemies. Raises player evasion and can stun.",
        image: "manifest_17.png",
        color: "green",
        rarity: "rare",
        cp_cost: 3,
        use_phase: "battle",
        reload_type: "rank_based",
        uses_per_battle: null,
        target_type: "enemy_all",
        stat_requirements: { eva: 26 },
        effects: {
            damage_type: "wind",
            d_output: 0.70,
            perk_type: "eva_up",
            p_output: 0.12,
            special: "stun_chance"
        }
    },
    {
        id: 18,
        name: "Shout",
        desc: "Manifest cosmic energy to hit multiple enemies. Lowers enemy special attack and greatly raises player special attack.",
        image: "manifest_18.png",
        color: "blue",
        rarity: "rare",
        cp_cost: 3,
        use_phase: "battle",
        reload_type: "rank_based",
        uses_per_battle: null,
        target_type: "enemy_all",
        stat_requirements: { spATK: 26 },
        effects: {
            damage_type: "cosmic",
            d_output: 0.70,
            perk_type: "spatk_up",
            p_output: 0.12,
            special: null
        }
    },
    {
        id: 19,
        name: "Snipe",
        desc: "Manifest a projectile to hit a single enemy. Greatly lowers enemy evasion and raises player dexterity and evasion.",
        image: "manifest_19.png",
        color: "indigo",
        rarity: "rare",
        cp_cost: 3,
        use_phase: "battle",
        reload_type: "rank_based",
        uses_per_battle: null,
        target_type: "enemy_single",
        stat_requirements: { dex: 26 },
        effects: {
            damage_type: "pierce",
            d_output: 0.70,
            perk_type: "dex_eva_up",
            p_output: 0.12,
            special: null
        }
    },
    {
        id: 20,
        name: "Break",
        desc: "Manifest a cube to compress a single enemy. Greatly raises player special defense and can 1-shot enemy.",
        image: "manifest_20.png",
        color: "violet",
        rarity: "rare",
        cp_cost: 3,
        use_phase: "battle",
        reload_type: "rank_based",
        uses_per_battle: null,
        target_type: "enemy_single",
        stat_requirements: { spDEF: 26 },
        effects: {
            damage_type: "impact",
            d_output: 0.70,
            perk_type: "spdef_up",
            p_output: 0.12,
            special: "oneshot_chance_low"
        }
    }
];



let skills = [
    // WAVE 1 — common
    {
        id: 0,
        name: "Guard",
        desc: "Defend against physical hit.",
        image: "skill_0.png",
        color: "red",
        rarity: "common",
        cp_cost: 1,
        use_phase: "battle",
        reload_type: "rank_based",
        uses_per_battle: null,
        target_type: "self",
        stat_requirements: { def: 10 },
        effects: { damage_type: "none", d_output: 0, perk_type: "defense_up", p_output: 0.08 }
    },
    {
        id: 1,
        name: "Restore",
        desc: "Restore a player stat.",
        image: "skill_1.png",
        color: "orange",
        rarity: "common",
        cp_cost: 1,
        use_phase: "battle",
        reload_type: "rank_based",
        uses_per_battle: null,
        target_type: "ally_single",
        stat_requirements: { res: 10 },
        effects: { damage_type: "none", d_output: 0, perk_type: "restore_stat", p_output: 0.20 }
    },
    {
        id: 2,
        name: "Focus",
        desc: "Focus to raise the damage of your next attack.",
        image: "skill_2.png",
        color: "yellow",
        rarity: "common",
        cp_cost: 1,
        use_phase: "battle",
        reload_type: "rank_based",
        uses_per_battle: null,
        target_type: "self",
        stat_requirements: { atk: 10 },
        effects: { damage_type: "none", d_output: 0, perk_type: "next_attack_up", p_output: 0.25 }
    },
    {
        id: 3,
        name: "Dodge",
        desc: "Dodge an oncoming attack.",
        image: "skill_3.png",
        color: "green",
        rarity: "common",
        cp_cost: 1,
        use_phase: "battle",
        reload_type: "rank_based",
        uses_per_battle: null,
        target_type: "self",
        stat_requirements: { eva: 10 },
        effects: { damage_type: "none", d_output: 0, perk_type: "evasion_up", p_output: 0.30 }
    },
    {
        id: 4,
        name: "Meditate",
        desc: "Recharge special attack.",
        image: "skill_4.png",
        color: "blue",
        rarity: "common",
        cp_cost: 1,
        use_phase: "battle",
        reload_type: "rank_based",
        uses_per_battle: null,
        target_type: "self",
        stat_requirements: { spATK: 10 },
        effects: { damage_type: "none", d_output: 0, perk_type: "spatk_recharge", p_output: 0.20 }
    },
    {
        id: 5,
        name: "Reload",
        desc: "Reload and reuse the last card used.",
        image: "skill_5.png",
        color: "indigo",
        rarity: "common",
        cp_cost: 1,
        use_phase: "battle",
        reload_type: "rank_based",
        uses_per_battle: null,
        target_type: "self",
        stat_requirements: { dex: 10 },
        effects: { damage_type: "none", d_output: 0, perk_type: "reuse_last_card", p_output: 1 }
    },
    {
        id: 6,
        name: "Stop",
        desc: "No manifest cards can be played for 1 turn by player and enemy.",
        image: "skill_6.png",
        color: "violet",
        rarity: "common",
        cp_cost: 1,
        use_phase: "battle",
        reload_type: "rank_based",
        uses_per_battle: null,
        target_type: "field",
        stat_requirements: { spDEF: 10 },
        effects: { damage_type: "none", d_output: 0, perk_type: "lock_manifest", p_output: 1 }
    },

    // WAVE 2 — uncommon
    {
        id: 7,
        name: "Counter",
        desc: "Counter attack when defending.",
        image: "skill_7.png",
        color: "red",
        rarity: "uncommon",
        cp_cost: 2,
        use_phase: "battle",
        reload_type: "rank_based",
        uses_per_battle: null,
        target_type: "self",
        stat_requirements: { def: 16 },
        effects: { damage_type: "counter", d_output: 0.60, perk_type: "counter_ready", p_output: 1 }
    },
    {
        id: 8,
        name: "Ripple",
        desc: "Remove status implements from a card.",
        image: "skill_8.png",
        color: "orange",
        rarity: "uncommon",
        cp_cost: 2,
        use_phase: "battle",
        reload_type: "rank_based",
        uses_per_battle: null,
        target_type: "ally_single",
        stat_requirements: { res: 16 },
        effects: { damage_type: "none", d_output: 0, perk_type: "cleanse", p_output: 1 }
    },
    {
        id: 9,
        name: "Charge",
        desc: "Charge the enemy and attack with everything you have. Lose next turn and attack stat is halved.",
        image: "skill_9.png",
        color: "yellow",
        rarity: "uncommon",
        cp_cost: 2,
        use_phase: "battle",
        reload_type: "rank_based",
        uses_per_battle: null,
        target_type: "enemy_single",
        stat_requirements: { atk: 16 },
        effects: { damage_type: "attack", d_output: 1.50, perk_type: "attack_halved_next_turn", p_output: 0.50 }
    },
    {
        id: 10,
        name: "Yoink",
        desc: "Take something from the enemy’s belongings if they have any.",
        image: "skill_10.png",
        color: "green",
        rarity: "uncommon",
        cp_cost: 2,
        use_phase: "battle",
        reload_type: "rank_based",
        uses_per_battle: null,
        target_type: "enemy_single",
        stat_requirements: { eva: 16 },
        effects: { damage_type: "none", d_output: 0, perk_type: "steal_item", p_output: 1 }
    },
    {
        id: 11,
        name: "Absorb",
        desc: "Absorb some of an oncoming manifest to recharge a stat.",
        image: "skill_11.png",
        color: "blue",
        rarity: "uncommon",
        cp_cost: 2,
        use_phase: "battle",
        reload_type: "rank_based",
        uses_per_battle: null,
        target_type: "self",
        stat_requirements: { spATK: 16 },
        effects: { damage_type: "none", d_output: 0, perk_type: "absorb_manifest", p_output: 0.15 }
    },
    {
        id: 12,
        name: "Aim",
        desc: "Raise dexterity for your next dextrous strike.",
        image: "skill_12.png",
        color: "indigo",
        rarity: "uncommon",
        cp_cost: 2,
        use_phase: "battle",
        reload_type: "rank_based",
        uses_per_battle: null,
        target_type: "self",
        stat_requirements: { dex: 16 },
        effects: { damage_type: "none", d_output: 0, perk_type: "dex_up_next", p_output: 0.25 }
    },
    {
        id: 13,
        name: "Rebuild",
        desc: "Build a cosmic wall to block oncoming Manifest.",
        image: "skill_13.png",
        color: "violet",
        rarity: "uncommon",
        cp_cost: 2,
        use_phase: "battle",
        reload_type: "rank_based",
        uses_per_battle: null,
        target_type: "self",
        stat_requirements: { spDEF: 16 },
        effects: { damage_type: "none", d_output: 0, perk_type: "manifest_block", p_output: 0.20 }
    },

    // WAVE 3 — rare
    {
        id: 14,
        name: "Tank Hits",
        desc: "Take zero physical damage.",
        image: "skill_14.png",
        color: "red",
        rarity: "rare",
        cp_cost: 3,
        use_phase: "battle",
        reload_type: "rank_based",
        uses_per_battle: null,
        target_type: "self",
        stat_requirements: { def: 22 },
        effects: { damage_type: "none", d_output: 0, perk_type: "zero_physical_damage", p_output: 1 }
    },
    {
        id: 15,
        name: "Recall",
        desc: "Recall and reuse the last card used.",
        image: "skill_15.png",
        color: "orange",
        rarity: "rare",
        cp_cost: 3,
        use_phase: "battle",
        reload_type: "rank_based",
        uses_per_battle: null,
        target_type: "self",
        stat_requirements: { res: 22 },
        effects: { damage_type: "none", d_output: 0, perk_type: "reuse_last_card", p_output: 1 }
    },
    {
        id: 16,
        name: "Blow for Blow",
        desc: "When taking damage, return damage. If hit multiple times, returned damage multiplies.",
        image: "skill_16.png",
        color: "yellow",
        rarity: "rare",
        cp_cost: 3,
        use_phase: "battle",
        reload_type: "rank_based",
        uses_per_battle: null,
        target_type: "self",
        stat_requirements: { atk: 22 },
        effects: { damage_type: "counter", d_output: 0.75, perk_type: "multi_counter", p_output: 1 }
    },
    {
        id: 17,
        name: "Vanish",
        desc: "Vanish for this turn and return at the start of the next player turn.",
        image: "skill_17.png",
        color: "green",
        rarity: "rare",
        cp_cost: 3,
        use_phase: "battle",
        reload_type: "rank_based",
        uses_per_battle: null,
        target_type: "self",
        stat_requirements: { eva: 22 },
        effects: { damage_type: "none", d_output: 0, perk_type: "invulnerable", p_output: 1 }
    },
    {
        id: 18,
        name: "Rebuke",
        desc: "Send manifest damage taken back to the manifestor.",
        image: "skill_18.png",
        color: "blue",
        rarity: "rare",
        cp_cost: 3,
        use_phase: "battle",
        reload_type: "rank_based",
        uses_per_battle: null,
        target_type: "enemy_single",
        stat_requirements: { spATK: 22 },
        effects: { damage_type: "reflect", d_output: 0.80, perk_type: "reflect_manifest", p_output: 1 }
    },
    {
        id: 19,
        name: "Scan",
        desc: "Scan for enemy data and weak points. Raises dextrous strike.",
        image: "skill_19.png",
        color: "indigo",
        rarity: "rare",
        cp_cost: 3,
        use_phase: "battle",
        reload_type: "rank_based",
        uses_per_battle: null,
        target_type: "enemy_single",
        stat_requirements: { dex: 22 },
        effects: { damage_type: "none", d_output: 0, perk_type: "dex_up", p_output: 0.20 }
    },
    {
        id: 20,
        name: "Multiply",
        desc: "Multiply player to 3 for next turn. Each card activates twice.",
        image: "skill_20.png",
        color: "violet",
        rarity: "rare",
        cp_cost: 3,
        use_phase: "battle",
        reload_type: "rank_based",
        uses_per_battle: null,
        target_type: "self",
        stat_requirements: { spDEF: 22 },
        effects: { damage_type: "none", d_output: 0, perk_type: "double_card_effects", p_output: 2 }
    }
];


let traps = [
    {id: 0, name: 'Piercer', desc: 'When a chest is opened, player is pierced.', stat_nerf: 'def', nerf_amount: 0.15},
    {id: 1, name: 'Slop', desc: 'When a chest is opened, player drenched in slime.', dmg_type: 'res', nerf_amount: 0.15},
    {id: 2, name: 'Extinguisher', desc: 'When a chest is opened, player is blasted with smoke.', dmg_type: 'def', nerf_amount: 0.15},
    {id: 3, name: 'Vortex', desc: 'When a chest is opened, player is spun in vortex.', dmg_type: 'eva', dmg_amount: 0.15},
    {id: 4, name: 'Muffle', desc: 'When a chest is opened, player is silenced', dmg_type: 'spATK', dmg_amount: 0.15},
    {id: 5, name: 'Blinder', desc: 'When a chest is opened, player is blinded.', dmg_type: 'dex', dmg_amount: 0.15},
    {id: 6, name: 'Lowered', desc: 'When a chest is opened, player perception comes into question.', dmg_type: 'def', dmg_amount: 0.15},
    {id: 7, name: 'Heart Breaker I', desc: 'When a chest is opened, player losses 1 heart.', dmg_type: 'heart', dmg_amount: 1},
    {id: 8, name: 'Heart Breaker II', desc: 'When a chest is opened, player losses 2 hearts.', dmg_type: 'heart', dmg_amount: 2},
    {id: 9, name: 'Heart Breaker III', desc: 'When a chest is opened, player losses 3 hearts.', dmg_type: 'heart', dmg_amount: 3},
    {id: 10, name: 'Mimic Chest I', desc: 'When a chest is opened, enemy encounter with Low Mimic starts.', dmg_type: 'battler', dmg_amount: 0},
    {id: 11, name: 'Mimic Chest II', desc: 'When a chest is opened, enemy encounter with Mid Mimic starts.', dmg_type: 'battler', dmg_amount: 0},
    {id: 12, name: 'Mimic Chest III', desc: 'When a chest is opened, enemy encounter with High Mimic starts.', dmg_type: 'battler', dmg_amount: 0},
    {id: 13, name: 'King Mimic Chest', desc: 'When a chest is opened, enemy encounter with King Mimic starts.', dmg_type: 'battler', dmg_amount: 0},
    {id: 14, name: 'Queen Mimic Chest', desc: 'When a chest is opened, enemy encounter with Queen Mimic starts.', dmg_type: 'battler', dmg_amount: 0},
    {id: 15, name: 'God Mimic Chest', desc: 'When a chest is opened, enemy encounter with God Mimic starts.', dmg_type: 'battler', dmg_amount: 0},
    {id: 16, name: 'Teleport', desc: 'When a chest is opened, player is teleported.', dmg_type: 'teleport', dmg_amount: 0},
    {id: 17, name: 'Death', desc: 'When a chest is opened, player is insta-killed.', dmg_type: 'death', dmg_amount: 0},
    {id: 18, name: 'Thief', desc: 'When a chest is opened, Player losses some gold.', dmg_type: 'gold', dmg_amount: 100},
    {id: 19, name: 'Halved', desc: 'When a chest is opened, all stats are halved', dmg_type: 'stats', dmg_amount: 0.5},
    {id: 20, name: 'Immobilized', desc: 'When a chest is opened, player is immobilized for 42 seconds.', dmg_type: 'stop', dmg_amount: 42},
];


let materials = [
    // RED
    {id: 0, name: "Iron Shard", color: "red",
        upgrade_from: "F", upgrade_to: "E", rarity: "common",
        desc: "Use to upgrade red cards from Rank F to Rank E.",
        image: "material_0.png"},

    {id: 1, name: "Jasper Pebble", color: "red",
        upgrade_from: "E", upgrade_to: "D", rarity: "uncommon",
        desc: "Use to upgrade red cards from Rank E to Rank D.",
        image: "material_1.png"},

    {id: 2, name: "Obsidian Stone", color: "red",
        upgrade_from: "D", upgrade_to: "C", rarity: "rare",
        desc: "Use to upgrade red cards from Rank D to Rank C.",
        image: "material_2.png"},

    {id: 3, name: "Iron Brick", color: "red",
        upgrade_from: "C", upgrade_to: "B", rarity: "ultra rare",
        desc: "Use to upgrade red cards from Rank C to Rank B.",
        image: "material_3.png"},

    {id: 4, name: "Red Jasper", color: "red",
        upgrade_from: "B", upgrade_to: "A", rarity: "legendary",
        desc: "Use to upgrade red cards from Rank B to Rank A.",
        image: "material_4.png"},

    {id: 5, name: "Black Obsidian", color: "red",
        upgrade_from: "A", upgrade_to: "S", rarity: "cosmic",
        desc: "Use to upgrade red cards from Rank A to Rank S.",
        image: "material_5.png"},

    {id: 6, name: "Red Root", color: "red",
        upgrade_from: "S", upgrade_to: "SS", rarity: "paradismic",
        desc: "Use to upgrade red cards from Rank S to Rank SS.",
        image: "material_6.png"},

    // ORANGE
    {id: 7, name: "Titanium Shard", color: "orange",
        upgrade_from: "F", upgrade_to: "E", rarity: "common",
        desc: "Use to upgrade orange cards from Rank F to Rank E.",
        image: "material_7.png"},

    {id: 8, name: "Pyrite Pebble", color: "orange",
        upgrade_from: "E", upgrade_to: "D", rarity: "uncommon",
        desc: "Use to upgrade orange cards from Rank E to Rank D.",
        image: "material_8.png"},

    {id: 9, name: "Small Kongk", color: "orange",
        upgrade_from: "D", upgrade_to: "C", rarity: "rare",
        desc: "Use to upgrade orange cards from Rank D to Rank C.",
        image: "material_9.png"},

    {id: 10, name: "Titanium Brick", color: "orange",
        upgrade_from: "C", upgrade_to: "B", rarity: "ultra rare",
        desc: "Use to upgrade orange cards from Rank C to Rank B.",
        image: "material_10.png"},

    {id: 11, name: "Pyrite Stone", color: "orange",
        upgrade_from: "B", upgrade_to: "A", rarity: "legendary",
        desc: "Use to upgrade orange cards from Rank B to Rank A.",
        image: "material_11.png"},

    {id: 12, name: "Large Kongk", color: "orange",
        upgrade_from: "A", upgrade_to: "S", rarity: "cosmic",
        desc: "Use to upgrade orange cards from Rank A to Rank S.",
        image: "material_12.png"},

    {id: 13, name: "Sacral Orb", color: "orange",
        upgrade_from: "S", upgrade_to: "SS", rarity: "paradismic",
        desc: "Use to upgrade orange cards from Rank S to Rank SS.",
        image: "material_13.png"},

    // YELLOW
    {id: 14, name: "Steel Shard", color: "yellow",
        upgrade_from: "F", upgrade_to: "E", rarity: "common",
        desc: "Use to upgrade yellow cards from Rank F to Rank E.",
        image: "material_14.png"},

    {id: 15, name: "Cat Eye", color: "yellow",
        upgrade_from: "E", upgrade_to: "D", rarity: "uncommon",
        desc: "Use to upgrade yellow cards from Rank E to Rank D.",
        image: "material_15.png"},

    {id: 16, name: "Fire Flare", color: "yellow",
        upgrade_from: "D", upgrade_to: "C", rarity: "rare",
        desc: "Use to upgrade yellow cards from Rank D to Rank C.",
        image: "material_16.png"},

    {id: 17, name: "Steel Brick", color: "yellow",
        upgrade_from: "C", upgrade_to: "B", rarity: "ultra rare",
        desc: "Use to upgrade yellow cards from Rank C to Rank B.",
        image: "material_17.png"},

    {id: 18, name: "Tiger Eye", color: "yellow",
        upgrade_from: "B", upgrade_to: "A", rarity: "legendary",
        desc: "Use to upgrade yellow cards from Rank B to Rank A.",
        image: "material_18.png"},

    {id: 19, name: "Solar Flare", color: "yellow",
        upgrade_from: "A", upgrade_to: "S", rarity: "cosmic",
        desc: "Use to upgrade yellow cards from Rank A to Rank S.",
        image: "material_19.png"},

    {id: 20, name: "Solar Totem", color: "yellow",
        upgrade_from: "S", upgrade_to: "SS", rarity: "paradismic",
        desc: "Use to upgrade yellow cards from Rank S to Rank SS.",
        image: "material_20.png"},

    // GREEN
    {id: 21, name: "Aluminum Shard", color: "green",
        upgrade_from: "F", upgrade_to: "E", rarity: "common",
        desc: "Use to upgrade green cards from Rank F to Rank E.",
        image: "material_21.png"},

    {id: 22, name: "Rose Pebble", color: "green",
        upgrade_from: "E", upgrade_to: "D", rarity: "uncommon",
        desc: "Use to upgrade green cards from Rank E to Rank D.",
        image: "material_22.png"},

    {id: 23, name: "Emerald Particle", color: "green",
        upgrade_from: "D", upgrade_to: "C", rarity: "rare",
        desc: "Use to upgrade green cards from Rank D to Rank C.",
        image: "material_23.png"},

    {id: 24, name: "Aluminum Brick", color: "green",
        upgrade_from: "C", upgrade_to: "B", rarity: "ultra rare",
        desc: "Use to upgrade green cards from Rank C to Rank B.",
        image: "material_24.png"},

    {id: 25, name: "Rose Quartz", color: "green",
        upgrade_from: "B", upgrade_to: "A", rarity: "legendary",
        desc: "Use to upgrade green cards from Rank B to Rank A.",
        image: "material_25.png"},

    {id: 26, name: "Emerald Wave", color: "green",
        upgrade_from: "A", upgrade_to: "S", rarity: "cosmic",
        desc: "Use to upgrade green cards from Rank A to Rank S.",
        image: "material_26.png"},

    {id: 27, name: "Heart Star", color: "green",
        upgrade_from: "S", upgrade_to: "SS", rarity: "paradismic",
        desc: "Use to upgrade green cards from Rank S to Rank SS.",
        image: "material_27.png"},

    // BLUE
    {id: 28, name: "Copper Shard", color: "blue",
        upgrade_from: "F", upgrade_to: "E", rarity: "common",
        desc: "Use to upgrade blue cards from Rank F to Rank E.",
        image: "material_28.png"},

    {id: 29, name: "Blue Wire", color: "blue",
        upgrade_from: "E", upgrade_to: "D", rarity: "uncommon",
        desc: "Use to upgrade blue cards from Rank E to Rank D.",
        image: "material_29.png"},

    {id: 30, name: "Small Fuse", color: "blue",
        upgrade_from: "D", upgrade_to: "C", rarity: "rare",
        desc: "Use to upgrade blue cards from Rank D to Rank C.",
        image: "material_30.png"},

    {id: 31, name: "Copper Brick", color: "blue",
        upgrade_from: "C", upgrade_to: "B", rarity: "ultra rare",
        desc: "Use to upgrade blue cards from Rank C to Rank B.",
        image: "material_31.png"},

    {id: 32, name: "Blue Chord", color: "blue",
        upgrade_from: "B", upgrade_to: "A", rarity: "legendary",
        desc: "Use to upgrade blue cards from Rank B to Rank A.",
        image: "material_32.png"},

    {id: 33, name: "Large Fuse", color: "blue",
        upgrade_from: "A", upgrade_to: "S", rarity: "cosmic",
        desc: "Use to upgrade blue cards from Rank A to Rank S.",
        image: "material_33.png"},

    {id: 34, name: "Swan Song", color: "blue",
        upgrade_from: "S", upgrade_to: "SS", rarity: "paradismic",
        desc: "Use to upgrade blue cards from Rank S to Rank SS.",
        image: "material_34.png"},

    // INDIGO
    {id: 35, name: "Cheap Parts", color: "indigo",
        upgrade_from: "F", upgrade_to: "E", rarity: "common",
        desc: "Use to upgrade indigo cards from Rank F to Rank E.",
        image: "material_35.png"},

    {id: 36, name: "Lapis Pebble", color: "indigo",
        upgrade_from: "E", upgrade_to: "D", rarity: "uncommon",
        desc: "Use to upgrade indigo cards from Rank E to Rank D.",
        image: "material_36.png"},

    {id: 37, name: "Trade Rumor", color: "indigo",
        upgrade_from: "D", upgrade_to: "C", rarity: "rare",
        desc: "Use to upgrade indigo cards from Rank D to Rank C.",
        image: "material_37.png"},

    {id: 38, name: "Expensive Parts", color: "indigo",
        upgrade_from: "C", upgrade_to: "B", rarity: "ultra rare",
        desc: "Use to upgrade indigo cards from Rank C to Rank B.",
        image: "material_38.png"},

    {id: 39, name: "Lapis Lazuli", color: "indigo",
        upgrade_from: "B", upgrade_to: "A", rarity: "legendary",
        desc: "Use to upgrade indigo cards from Rank B to Rank A.",
        image: "material_39.png"},

    {id: 40, name: "Trade Secret", color: "indigo",
        upgrade_from: "A", upgrade_to: "S", rarity: "cosmic",
        desc: "Use to upgrade indigo cards from Rank A to Rank S.",
        image: "material_40.png"},

    {id: 41, name: "Third Tenman", color: "indigo",
        upgrade_from: "S", upgrade_to: "SS", rarity: "paradismic",
        desc: "Use to upgrade indigo cards from Rank S to Rank SS.",
        image: "material_41.png"},

    // VIOLET
    {id: 42, name: "Lithium Walnut", color: "violet",
        upgrade_from: "F", upgrade_to: "E", rarity: "common",
        desc: "Use to upgrade violet cards from Rank F to Rank E.",
        image: "material_42.png"},

    {id: 43, name: "Amethyst Pebble", color: "violet",
        upgrade_from: "E", upgrade_to: "D", rarity: "uncommon",
        desc: "Use to upgrade violet cards from Rank E to Rank D.",
        image: "material_43.png"},

    {id: 44, name: "Crystalite", color: "violet",
        upgrade_from: "D", upgrade_to: "C", rarity: "rare",
        desc: "Use to upgrade violet cards from Rank D to Rank C.",
        image: "material_44.png"},

    {id: 45, name: "Lithium Eggplant", color: "violet",
        upgrade_from: "C", upgrade_to: "B", rarity: "ultra rare",
        desc: "Use to upgrade violet cards from Rank C to Rank B.",
        image: "material_45.png"},

    {id: 46, name: "Amethyst", color: "violet",
        upgrade_from: "B", upgrade_to: "A", rarity: "legendary",
        desc: "Use to upgrade violet cards from Rank B to Rank A.",
        image: "material_46.png"},

    {id: 47, name: "Megacrystal", color: "violet",
        upgrade_from: "A", upgrade_to: "S", rarity: "cosmic",
        desc: "Use to upgrade violet cards from Rank A to Rank S.",
        image: "material_47.png"},

    {id: 48, name: "Kundalini Crown", color: "violet",
        upgrade_from: "S", upgrade_to: "SS", rarity: "paradismic",
        desc: "Use to upgrade violet cards from Rank S to Rank SS.",
        image: "material_48.png"}
];


let keys = [
    {id: 0,  name: "Rusty Key",      opens: "Rusty Door"},
    {id: 1,  name: "Bronze Key",     opens: "Bronze Door"},
    {id: 2,  name: "Silver Key",     opens: "Silver Door"},
    {id: 3,  name: "Gold Key",       opens: "Gold Door"},
    {id: 4,  name: "Crystal Key",    opens: "Crystal Door"},
    {id: 5,  name: "Black Key",      opens: "Black Iron Door"},
    {id: 6,  name: "Red Key",        opens: "Red Seal Door"},
    {id: 7,  name: "Blue Key",       opens: "Blue Seal Door"},
    {id: 8,  name: "Green Key",      opens: "Green Seal Door"},
    {id: 9,  name: "Yellow Key",     opens: "Yellow Seal Door"},
    {id: 10, name: "Copper Key",     opens: "Copper Door"},
    {id: 11, name: "Iron Key",       opens: "Iron Door"},
    {id: 12, name: "Steel Key",      opens: "Steel Door"},
    {id: 13, name: "Simple Key",     opens: "Simple Lock Door"},
    {id: 14, name: "Heavy Key",      opens: "Heavy Reinforced Door"},
    {id: 15, name: "Master Key",     opens: "Master Door"},
    {id: 16, name: "Gate Key",       opens: "Main Gate"},
    {id: 17, name: "Room Key",       opens: "Locked Room"},
    {id: 18, name: "Storage Key",    opens: "Storage Room"},
    {id: 19, name: "Vault Key",      opens: "Vault Door"},
    {id: 20, name: "Final Key",      opens: "Final Chamber"},
];

let enemies = [
    //wave one low
    {id: 0, name: "Rocklym", stat_id: 0, desc: 'A rock slime hybrid.'},//def
    {id: 1, name: "Poplit", stat_id: 1, desc: 'A fish man.'},//res
    {id: 2, name: "Knife Head", stat_id: 2, desc: 'A warrior that traded his head for a knife.'},//atk
    {id: 3, name: "Whine Wisper", stat_id: 3, desc: 'It whines and is hard to catch.'},//eva
    {id: 4, name: "Blue Cannon", stat_id: 4, desc: 'A cannon that shoot magic.'},//spATK
    {id: 5, name: "Bone Archer", stat_id: 5, desc: 'A skeleton arch that fires bones.'},//dex
    {id: 6, name: "Robo Generator", stat_id: 6, desc: 'A robo that generates force fields.'},//SPdef
    //wave two mid
    {id: 7, name: "Stone Waller", stat_id: 7, desc: 'A stone wall man.'},//def+
    {id: 8, name: "Spritzel Fly", stat_id: 8, desc: 'A dragonfly fish.'},//res+
    {id: 9, name: "Bash Rino", stat_id: 9, desc: 'A robot rhino that charges.'},//atk+
    {id: 10, name: "Razor Lelph", stat_id: 10, desc: 'A wind that likes to collect sharp objects.'},//eva+
    {id: 11, name: "Shadow Mage", stat_id: 11, desc: 'A mage of the dark arts.'},//spATK+
    {id: 12, name: "Dart Ninja", stat_id: 12, desc: 'A Ninja that loves to throw things.'},//dex+
    {id: 13, name: "Palm Presser", stat_id: 13, desc: 'A mulidimesional being with high intelligence.'},//SPdef+
    //wave three high
    {id: 14, name: "Metal Kettle", stat_id: 14, desc: 'A Kettle that is easily offended.'},//def++
    {id: 16, name: "Murmaider", stat_id: 16, desc: 'A murmaid that drags people down in spirit with pesimistic remarks.'},//res++
    {id: 15, name: "Manipied", stat_id: 15, desc: 'A many with many arms.'},//atk++
    {id: 18, name: "Green Pixie", stat_id: 18, desc: 'The fastest of all pixies.'},//eva++
    {id: 19, name: "Evil Book", stat_id: 19, desc: 'A book of evil spells. The first one ever written.'},//SPatk++
    {id: 17, name: "Bonesinary", stat_id: 17, desc: 'A skeleton soldier that has deadly aim.'},//dex++
    {id: 20, name: "King Brain", stat_id: 20, desc: 'The master of all parasites.'},//SPdef++
    //mimics
    {id: 21, name: "Mimic Chest I", stat_id: 21, desc: 'A low level mimic that likes to sleep while looking like a chest.'},//trap
    {id: 22, name: "Mimic Chest II", stat_id: 22, desc: 'A mid level mimic that likes to sleep while looking like a chest.'},//trap+
    {id: 23, name: "Mimic Chest III", stat_id: 23, desc: 'A high level mimic that likes to sleep while looking like a chest.'},//trap++
    {id: 24, name: "King Mimic Chest", stat_id: 24, desc: 'A Royal level mimic that likes to sleep while looking like a chest.'},//trap+++
    {id: 25, name: "Queen Mimic Chest", stat_id: 25, desc: 'A Royal level mimic that likes to sleep while looking like a chest.'},//trap+++
    {id: 26, name: "God Mimic Chest", stat_id: 26, desc: 'A God level mimic that likes to sleep while looking like a chest.'},//trap++++
];

let enemy_stats = [
    // WAVE 1 (simple: 1 weakness, 1 resist) — hearts: 2–3
    {stat_id: 0, def: 18, res: 6, atk: 4, eva: 2, spATK: 0, dex: 1, spDEF: 5,
        weak_type: 'orange', resist_type: ['red'], hearts: 3, spd: 0, gold: 8, exp: 15},

    {stat_id: 1, def: 4, res: 18, atk: 3, eva: 5, spATK: 2, dex: 1, spDEF: 4,
        weak_type: 'yellow', resist_type: ['orange'], hearts: 2, spd: 1, gold: 9, exp: 16},

    {stat_id: 2, def: 2, res: 1, atk: 18, eva: 4, spATK: 0, dex: 3, spDEF: 1,
        weak_type: 'green', resist_type: ['yellow'], hearts: 3, spd: 2, gold: 10, exp: 17},

    {stat_id: 3, def: 3, res: 4, atk: 1, eva: 18, spATK: 4, dex: 3, spDEF: 2,
        weak_type: 'blue', resist_type: ['green'], hearts: 2, spd: 15, gold: 8, exp: 15},

    {stat_id: 4, def: 1, res: 4, atk: 3, eva: 2, spATK: 18, dex: 2, spDEF: 4,
        weak_type: 'indigo', resist_type: ['blue'], hearts: 3, spd: 1, gold: 11, exp: 18},

    {stat_id: 5, def: 4, res: 2, atk: 2, eva: 6, spATK: 0, dex: 18, spDEF: 3,
        weak_type: 'violet', resist_type: ['indigo'], hearts: 2, spd: 2, gold: 10, exp: 17},

    {stat_id: 6, def: 6, res: 4, atk: 2, eva: 1, spATK: 3, dex: 2, spDEF: 18,
        weak_type: 'red', resist_type: ['violet'], hearts: 3, spd: 0, gold: 12, exp: 20},

    // WAVE 2 (1 weakness, 2 resistances) — hearts: 3–5
    {stat_id: 7, def: 32, res: 12, atk: 6, eva: 4, spATK: 2, dex: 4, spDEF: 10,
        weak_type: 'orange', resist_type: ['red','violet'], hearts: 4, spd: 0, gold: 18, exp: 32},

    {stat_id: 8, def: 10, res: 30, atk: 8, eva: 10, spATK: 6, dex: 6, spDEF: 12,
        weak_type: 'yellow', resist_type: ['orange','red'], hearts: 4, spd: 0, gold: 20, exp: 34},

    {stat_id: 9, def: 6, res: 4, atk: 32, eva: 10, spATK: 4, dex: 10, spDEF: 6,
        weak_type: 'green', resist_type: ['yellow','orange'], hearts: 5, spd: 4, gold: 22, exp: 36},

    {stat_id: 10, def: 8, res: 10, atk: 4, eva: 32, spATK: 12, dex: 10, spDEF: 8,
        weak_type: 'blue', resist_type: ['green','yellow'], hearts: 4, spd: 24, gold: 19, exp: 33},

    {stat_id: 11, def: 4, res: 12, atk: 6, eva: 6, spATK: 32, dex: 8, spDEF: 10,
        weak_type: 'indigo', resist_type: ['blue','green'], hearts: 5, spd: 2, gold: 23, exp: 38},

    {stat_id: 12, def: 10, res: 8, atk: 4, eva: 12, spATK: 4, dex: 32, spDEF: 8,
        weak_type: 'violet', resist_type: ['indigo','blue'], hearts: 4, spd: 2, gold: 21, exp: 35},

    {stat_id: 13, def: 12, res: 10, atk: 6, eva: 4, spATK: 8, dex: 10, spDEF: 32,
        weak_type: 'red', resist_type: ['violet','indigo'], hearts: 5, spd: 0, gold: 24, exp: 40},

    // WAVE 3 (1 weakness, 2 resistances) — hearts: 5–7
    {stat_id: 14, def: 48, res: 18, atk: 12, eva: 10, spATK: 6, dex: 10, spDEF: 18,
        weak_type: 'orange', resist_type: ['red','violet'], hearts: 6, spd: 0, gold: 32, exp: 55},

    {stat_id: 15, def: 14, res: 46, atk: 12, eva: 16, spATK: 14, dex: 10, spDEF: 18,
        weak_type: 'yellow', resist_type: ['orange','red'], hearts: 6, spd: 2, gold: 34, exp: 58},

    {stat_id: 16, def: 12, res: 10, atk: 48, eva: 16, spATK: 8, dex: 14, spDEF: 10,
        weak_type: 'green', resist_type: ['yellow','orange'], hearts: 7, spd: 4, gold: 36, exp: 60},

    {stat_id: 17, def: 10, res: 14, atk: 8, eva: 48, spATK: 18, dex: 16, spDEF: 12,
        weak_type: 'blue', resist_type: ['green','yellow'], hearts: 6, spd: 38, gold: 33, exp: 56},

    {stat_id: 18, def: 8, res: 16, atk: 10, eva: 12, spATK: 48, dex: 14, spDEF: 18,
        weak_type: 'indigo', resist_type: ['blue','green'], hearts: 7, spd: 4, gold: 37, exp: 62},

    {stat_id: 19, def: 14, res: 12, atk: 10, eva: 18, spATK: 8, dex: 48, spDEF: 16,
        weak_type: 'violet', resist_type: ['indigo','blue'], hearts: 6, spd: 4, gold: 35, exp: 59},

    {stat_id: 20, def: 18, res: 14, atk: 10, eva: 12, spATK: 14, dex: 16, spDEF: 48,
        weak_type: 'red', resist_type: ['violet','indigo'], hearts: 7, spd: 0, gold: 38, exp: 65},

    // MIMICS
    // Mimic I — wave 1 rules
    {stat_id: 21, def: 12, res: 6, atk: 6, eva: 2, spATK: 2, dex: 3, spDEF: 8,
        weak_type: 'orange', resist_type: ['red'], hearts: 3, spd: 0, gold: 20, exp: 25},

    // Mimic II — wave 2 rules
    {stat_id: 22, def: 28, res: 12, atk: 10, eva: 8, spATK: 6, dex: 10, spDEF: 14,
        weak_type: 'yellow', resist_type: ['orange','red'], hearts: 5, spd: 0, gold: 35, exp: 45},

    // Mimic III — wave 3 rules
    {stat_id: 23, def: 44, res: 18, atk: 14, eva: 12, spATK: 10, dex: 16, spDEF: 20,
        weak_type: 'green', resist_type: ['yellow','orange'], hearts: 7, spd: 0, gold: 50, exp: 70},

    // King Mimic — wave 4 (1 weakness, 3 resistances)
    {stat_id: 24, def: 70, res: 30, atk: 24, eva: 20, spATK: 18, dex: 22, spDEF: 30,
        weak_type: 'blue', resist_type: ['green','yellow','orange'], hearts: 8, spd: 0, gold: 65, exp: 90},

    // Queen Mimic — wave 4 (1 weakness, 3 resistances)
    {stat_id: 25, def: 60, res: 28, atk: 22, eva: 24, spATK: 26, dex: 20, spDEF: 32,
        weak_type: 'indigo', resist_type: ['blue','green','yellow'], hearts: 8, spd: 0, gold: 70, exp: 95},

    // GOD MIMIC — wave 5 (NO weakness, 4–5 resistances)
    {stat_id: 26, def: 99, res: 90, atk: 88, eva: 70, spATK: 92, dex: 85, spDEF: 99,
        weak_type: null, resist_type: ['red','orange','yellow','green','blue'],
        hearts: 9, spd: 0, gold: 150, exp: 200},
];

//ownership tables for every card category
let users_weapons = [
    {
        id: 0,
        user_id: 0,
        avatar_id: 0,
        weapon_id: 6,
        level: 1,
        rank: "F",
        quantity: 1,
        locked: false,
        favorite: false
    },{
        id: 1,
        user_id: 0,
        avatar_id: 0,
        weapon_id: 6,
        level: 1,
        rank: "F",
        quantity: 1,
        locked: false,
        favorite: false
    },
    {
        id: 2,
        user_id: 0,
        avatar_id: 0,
        weapon_id: 6,
        level: 1,
        rank: "F",
        quantity: 1,
        locked: false,
        favorite: false
    }
];
let users_equipments = [
    {
        id: 0,
        user_id: 0,
        equipment_id: 0,
        quantity: 1,
        locked: false,
        favorite: false
    }
];
let users_items = [
    {
        id: 0,
        user_id: 0,
        item_id: 0,
        quantity: 3,
        locked: false,
        favorite: false
    }
];
let users_manifest = [
    {
        id: 0,
        user_id: 0,
        avatar_id: 0,
        manifest_id: 0,
        level: 1,
        rank: "F",
        quantity: 1,
        locked: false,
        favorite: false
    }
];
let users_skills = [
    {
        id: 0,
        user_id: 0,
        avatar_id: 0,
        skill_id: 0,
        level: 1,
        rank: "F",
        quantity: 1,
        locked: false,
        favorite: false
    },
    {
        id: 1,
        user_id: 0,
        avatar_id: 0,
        skill_id: 0,
        level: 1,
        rank: "F",
        quantity: 1,
        locked: false,
        favorite: false
    },
];

//deck/loadout tables 
let squad_loadouts = [
    {
        id: 0,
        user_id: 0,
        avatar_id: 0,

        weapons: [],
        battle_items: [],
        manifest: [],
        skills: []
    }
];

let squad_equipment_loadouts = [
    {
        id: 0,
        user_id: 0,
        avatar_id: 0,

        slots: [null, null, null]
    }
];