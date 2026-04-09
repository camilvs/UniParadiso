let users = [
    {
        id: 0,
        username: "Tahdah001",
        avatar_name: "Tahdah",
        avatar_id: 0,

        // base stats
        base_stats: {
            hearts: 9,
            def: 99,
            res: 99,
            atk: 99,
            eva: 99,
            spATK: 99,
            dex: 99,
            spDEF: 99,
            cp: 99
        },

        // cards owned
        cards: {
            weapons: [],
            equipments: [],
            items: [],
            manifest: [],
            skills: []
        },

        // currently equipped for battle
        equipped_deck: {
            weapons: [],
            equipments: [],
            items: [],
            manifest: [],
            skills: []
        },

        // live battle values
        battle_state: {
            current_hearts: 9,
            max_hearts: 9,
            def: 99,
            res: 99,
            atk: 99,
            eva: 99,
            spATK: 99,
            dex: 99,
            spDEF: 99,
            cp: 99,
            barrier: 0,
            alive: true,
            status_effects: [],
            last_card_used: null
        }
    }
];
    
let weapons = [
    {id: 0, name: "Shock Batton", stat_id: 0, desc: 'Can possibly stun enemies.'},
    {id: 1, name: "Iron Pipe", stat_id: 1, desc: 'Not the most practical weapon.'},
    {id: 2, name: "Combat Sword", stat_id: 2, desc: 'A standard issued blade.'},
    {id: 3, name: "Chain Saw", stat_id: 3, desc: 'A tool for buzzing off branches.'},
    {id: 4, name: "Iron Chain", stat_id: 4, desc: 'Whip and grab with this.'},
    {id: 5, name: "Sniper Rifle", stat_id: 5, desc: 'With practice you can be super precise.'},
    {id: 6, name: "Wooden Club", stat_id: 6, desc: 'Though it is wooden, it really hurts.'},
    {id: 7, name: "Shotgun", stat_id: 7, desc: 'Can hit more than one target.'},
    {id: 8, name: "Blessed Staff", stat_id: 8, desc: 'Use for pure reasons.'},
    {id: 9, name: "Cursed Staff", stat_id: 9, desc: 'Use for destruction'},
    {id: 10, name: "Sling Shot", stat_id: 10, desc: 'Can stun enemies.'},
    {id: 11, name: "Iron Mace", stat_id: 11, desc: 'Crushes bones easily.'},
    {id: 12, name: "Iron Spear", stat_id: 12, desc: 'Swing or throw this one.'},
    {id: 13, name: "Gauntlet", stat_id: 13, desc: 'A puncher to ounch with.'},
    {id: 14, name: "Iron Claws", stat_id: 14, desc: 'Slice foes or make a salad.'},
    {id: 15, name: "Poison Dagger", stat_id: 15, desc: 'Simple cut will poison enemies.'},
    {id: 16, name: "Iron Axe", stat_id: 16, desc: 'Swing this around or throw it if you are feeling lucky.'},
    {id: 17, name: "Ye Old Blapper", stat_id: 17, desc: 'Only one shot in the chamber, it does great damage if it hits.'},
    {id: 18, name: "Leather Whip", stat_id: 18, desc: 'Crack that whip.'},
    {id: 19, name: "Spiked Mace", stat_id: 19, desc: 'Swing this around but watch yourself.'},
    {id: 20, name: "Mage Staff", stat_id: 20, desc: 'Perfect magic walking stick.'},
    {id: 21, name: "Buster Sword", stat_id: 21, desc: 'A huge sword that takes strength to carry around.'},
    {id: 22, name: "Bow", stat_id: 22, desc: 'An accurate choice.'},
    {id: 23, name: "Iron Dagger", stat_id: 23, desc: 'Babies first weapon.'},
];

let equipments = [
    //first wave
    {id: 0, name: 'Clown Shoes', stat_id: 0, desc: 'DEF+'},
    {id: 1, name: 'Fairy Wings', stat_id: 1, desc: 'RES+'},
    {id: 2, name: 'Black Hoodie', stat_id: 2, desc: 'ATK+'},
    {id: 3, name: 'Green Ring', stat_id: 3, desc: 'EVA+'},
    {id: 4, name: 'Tap Shoes', stat_id: 4, desc: 'spATK+'},
    {id: 5, name: 'Gas Mask', stat_id: 5, desc: 'DEX+'},
    {id: 6, name: 'Blessed Thorns', stat_id: 6, desc: 'spDEF+'},
    //second wave
    {id: 7, name: 'Clown Hat', stat_id: 7, desc: 'DEF++'},
    {id: 8, name: 'Glittering Gown', stat_id: 8, desc: 'RES++'},
    {id: 9, name: 'Yellow Sneakers', stat_id: 9, desc: 'ATK++'},
    {id: 10, name: 'Whispful Shaw', stat_id: 10, desc: 'EVA++'},
    {id: 11, name: 'Purple Blazer', stat_id: 11, desc: 'spATK++'},
    {id: 12, name: 'Tactical Boots', stat_id: 12, desc: 'DEX++'},
    {id: 13, name: 'Queens Robe', stat_id: 13, desc: 'spDEF++'},
    //third wave
    {id: 14, name: 'War Paint', stat_id: 14, desc: 'DEF+++'},
    {id: 15, name: 'Magic Slippers', stat_id: 15, desc: 'RES+++'},
    {id: 16, name: 'Black Jeans', stat_id: 16, desc: 'ATK+++'},
    {id: 17, name: 'Braided Band', stat_id: 17, desc: 'EVA+++'},
    {id: 18, name: 'Black Tie', stat_id: 18, desc: 'spATK+++'},
    {id: 19, name: 'Tactical Vest', stat_id: 19, desc: 'DEX+++'},
    {id: 20, name: 'Royal Ring', stat_id: 20, desc: 'spDEF+++'},
];

let weapon_stats = [
    {stat_id: 0,  def: 3,  res: 5,  atk: 3,  eva: 4,  spATK: 12, dex: 0,  spDEF: 0},   // Shock Baton
    {stat_id: 1,  def: 4,  res: 2,  atk: 5,  eva: 1,  spATK: 0,  dex: 1,  spDEF: 0},   // Iron Pipe
    {stat_id: 2,  def: 3,  res: 3,  atk: 8,  eva: 3,  spATK: 0,  dex: 4,  spDEF: 1},   // Combat Sword
    {stat_id: 3,  def: 2,  res: 1,  atk: 14, eva: 0,  spATK: 0,  dex: -1, spDEF: 0},   // Chain Saw
    {stat_id: 4,  def: 1,  res: 2,  atk: 4,  eva: 5,  spATK: 0,  dex: 6,  spDEF: 0},   // Iron Chain
    {stat_id: 5,  def: 1,  res: 3,  atk: 10, eva: 2,  spATK: 0,  dex: 10, spDEF: 0},   // Sniper Rifle
    {stat_id: 6,  def: 3,  res: 1,  atk: 6,  eva: 0,  spATK: 0,  dex: 0,  spDEF: 0},   // Wooden Club
    {stat_id: 7,  def: 2,  res: 2,  atk: 12, eva: -1, spATK: 0,  dex: 1,  spDEF: 0},   // Shotgun
    {stat_id: 8,  def: 2,  res: 8,  atk: 2,  eva: 2,  spATK: 10, dex: 0,  spDEF: 16},   // Blessed Staff
    {stat_id: 9,  def: 1,  res: 3,  atk: 3,  eva: 1,  spATK: 16, dex: 0,  spDEF: 2},   // Cursed Staff
    {stat_id: 10, def: 1,  res: 1,  atk: 2,  eva: 6,  spATK: 0,  dex: 8,  spDEF: 0},   // Sling Shot
    {stat_id: 11, def: 5,  res: 2,  atk: 9,  eva: -1, spATK: 0,  dex: 0,  spDEF: 1},   // Iron Mace
    {stat_id: 12, def: 3,  res: 2,  atk: 7,  eva: 3,  spATK: 0,  dex: 5,  spDEF: 0},   // Iron Spear
    {stat_id: 13, def: 4,  res: 3,  atk: 6,  eva: 4,  spATK: 0,  dex: 6,  spDEF: 0},   // Gauntlet
    {stat_id: 14, def: 2,  res: 2,  atk: 8,  eva: 5,  spATK: 0,  dex: 7,  spDEF: 0},   // Iron Claws
    {stat_id: 15, def: 1,  res: 2,  atk: 5,  eva: 4,  spATK: 6,  dex: 5,  spDEF: 0},   // Poison Dagger
    {stat_id: 16, def: 4,  res: 2,  atk: 11, eva: 1,  spATK: 0,  dex: 2,  spDEF: 0},   // Iron Axe
    {stat_id: 17, def: 1,  res: 1,  atk: 5, eva: -2, spATK: 0,  dex: 13,  spDEF: 0},   // Ye Old Blapper
    {stat_id: 18, def: 1,  res: 2,  atk: 3,  eva: 6,  spATK: 0,  dex: 7,  spDEF: 0},   // Leather Whip
    {stat_id: 19, def: 5,  res: 2,  atk: 12, eva: -2, spATK: 0,  dex: 0,  spDEF: 1},   // Spiked Mace
    {stat_id: 20, def: 2,  res: 7,  atk: 3,  eva: 2,  spATK: 11, dex: 0,  spDEF: 11},   // Mage Staff
    {stat_id: 21, def: 6,  res: 3,  atk: 14, eva: -3, spATK: 0,  dex: 1,  spDEF: 1},   // Buster Sword
    {stat_id: 22, def: 1,  res: 2,  atk: 7,  eva: 4,  spATK: 0,  dex: 19,  spDEF: 0},   // Bow
    {stat_id: 23, def: 1,  res: 1,  atk: 4,  eva: 5,  spATK: 0,  dex: 6,  spDEF: 0},   // Iron Dagger
];

let equip_stats = [
    // FIRST WAVE (+)
    {stat_id: 0,  def: 18,  res: 8,   atk: 4,   eva: -4,  spATK: 0,   dex: 6,   spDEF: 8},   // Clown Shoes
    {stat_id: 1,  def: 8,   res: 18,  atk: 4,   eva: 8,   spATK: 8,   dex: 4,   spDEF: 8},   // Fairy Wings
    {stat_id: 2,  def: -4,  res: 0,   atk: 18,  eva: 5,   spATK: 0,   dex: 6,   spDEF: 0},   // Black Hoodie
    {stat_id: 3,  def: 4,   res: 8,   atk: -2,  eva: 18,  spATK: 8,   dex: 6,   spDEF: 6},   // Green Ring
    {stat_id: 4,  def: -4,  res: 8,   atk: 4,   eva: -2,  spATK: 18,  dex: 4,   spDEF: 9},   // Tap Shoes
    {stat_id: 5,  def: 7,   res: 4,   atk: 0,   eva: 8,   spATK: 0,   dex: 18,  spDEF: 4},   // Gas Mask
    {stat_id: 6,  def: 8,   res: 8,   atk: 4,   eva: 0,   spATK: 7,   dex: 8,   spDEF: 18},  // Blessed Thorns

    // SECOND WAVE (++)
    {stat_id: 7,  def: 30,  res: 12,  atk: 6,   eva: -6,  spATK: 0,   dex: 10,  spDEF: 12},  // Clown Hat
    {stat_id: 8,  def: 12,  res: 30,  atk: 6,   eva: 12,  spATK: 12,  dex: 8,   spDEF: 12},  // Glittering Gown
    {stat_id: 9,  def: -6,  res: 0,   atk: 30,  eva: 8,   spATK: 0,   dex: 12,  spDEF: 0},   // Yellow Sneakers
    {stat_id: 10, def: 6,   res: 12,  atk: -4,  eva: 30,  spATK: 12,  dex: 10,  spDEF: 10},  // Whispful Shawl
    {stat_id: 11, def: -6,  res: 12,  atk: 6,   eva: -4,  spATK: 30,  dex: 8,   spDEF: 14},  // Purple Blazer
    {stat_id: 12, def: 10,  res: 8,   atk: 0,   eva: 12,  spATK: 0,   dex: 30,  spDEF: 8},   // Tactical Boots
    {stat_id: 13, def: 12,  res: 12,  atk: 6,   eva: 0,   spATK: 10,  dex: 12,  spDEF: 30},  // Queen’s Robe

    // THIRD WAVE (+++)
    {stat_id: 14, def: 45,  res: 18,  atk: 10,  eva: -8,  spATK: 0,   dex: 16,  spDEF: 18},  // War Paint
    {stat_id: 15, def: 18,  res: 45,  atk: 10,  eva: 18,  spATK: 18,  dex: 12,  spDEF: 18},  // Magic Slippers
    {stat_id: 16, def: -8,  res: 0,   atk: 45,  eva: 12,  spATK: 0,   dex: 16,  spDEF: 0},   // Black Jeans
    {stat_id: 17, def: 10,  res: 18,  atk: -6,  eva: 45,  spATK: 18,  dex: 16,  spDEF: 14},  // Braided Band
    {stat_id: 18, def: -8,  res: 18,  atk: 10,  eva: -6,  spATK: 45,  dex: 12,  spDEF: 20},  // Black Tie
    {stat_id: 19, def: 16,  res: 12,  atk: 0,   eva: 18,  spATK: 0,   dex: 45,  spDEF: 12},  // Tactical Vest
    {stat_id: 20, def: 18,  res: 18,  atk: 10,  eva: 0,   spATK: 16,  dex: 18,  spDEF: 45},  // Royal Ring
];


let items = [
    {id: 0, name: 'Potion', stat_id: 0, desc: 'Regain 1 Heart.'},
    {id: 1, name: 'Ether', stat_id: 1, desc: 'Reduce card charge by 1.'},
    {id: 2, name: 'Antidote', stat_id: 2, desc: 'Remove status implement on card.'},
    {id: 3, name: 'Barrier', stat_id: 3, desc: 'Builds a barrier that takes 2 hit.'},
    {id: 4, name: 'Healyx', stat_id: 4, desc: 'Regenerate stats at low rate.\n go beyond max stats.'},
    {id: 5, name: 'Revive', stat_id: 5, desc: 'Revive self or team-mate with 1 Heart.'},
    {id: 6, name: 'Sleeping Bag', stat_id: 6, desc: 'Can use out of battle. Regain all hearts. Card breaks on use. \n Can use set position as checkpoint'},
    {id: 7, name: 'Mid Potion', stat_id: 7, desc: 'Regain 2 Hearts.'},
    {id: 8, name: 'Mid Ether', stat_id: 8, desc: 'Reduce card charge by 2.'},
    {id: 9, name: 'Mid Antidote', stat_id: 9, desc: 'Remove status implement on 2 cards.'},
    {id: 10, name: 'Mid Barrier', stat_id: 10, desc: 'Builds a barrier that takes 2 hits.'},
    {id: 11, name: 'Mid Healyx', stat_id: 11, desc: 'Regenerate stats at medium rate.\n go beyond max stats.'},
    {id: 12, name: 'Mid Revive', stat_id: 12, desc: 'Revive self or team-mate with 2 Hearts.'},
    {id: 13, name: 'Tent', stat_id: 13, desc: 'Can use out of battle. Regain all hearts. Card breaks after 2 uses.\n Can use set position as checkpoint and can cook food to boost stats.'},
    {id: 14, name: 'High Potion', stat_id: 14, desc: 'Regain 3 Hearts.'},
    {id: 15, name: 'High Ether', stat_id: 15, desc: 'Reduce card charge by 3.'},
    {id: 16, name: 'High Antidote', stat_id: 16, desc: 'Remove status implement on 3 cards.'},
    {id: 17, name: 'High Barrier', stat_id: 17, desc: 'Builds a barrier that takes 3 hits.'},
    {id: 18, name: 'High Healyx', stat_id: 18, desc: 'Regenerate stats at rapid rate.\n Can go beyond max stats.'},
    {id: 19, name: 'High Revive', stat_id: 19, desc: 'Revive self or team-mate with 3 Hearts.'},
    {id: 20, name: 'Cottage', stat_id: 20, desc: 'Can use out of battle. Regain all hearts. Card breaks after 3 uses.\n Can use set position as checkpoint and can cook food to boost stats. \nCan Shop for items.'},
    {id: 21, name: 'Moon Potion', stat_id: 21, desc: 'Once per battle, squad regain All Hearts.'},
    {id: 22, name: 'Void Ether', stat_id: 22, desc: 'Once per battle, reduce all card charge to 0.'},
    {id: 23, name: 'Star Antidote', stat_id: 23, desc: 'Once per battle, remove all status implements on cards.'},
    {id: 24, name: 'Moon Barrier', stat_id: 24, desc: 'Once per battle, build a barrier that stands for 3 turns.'},
    {id: 25, name: 'Void Healyx', stat_id: 25, desc: 'Once per battle, stats are maxed out for 3 turns.'},
    {id: 26, name: 'Star Revive', stat_id: 26, desc: 'Revive squad with 4 hearts and max stats.'},
    {id: 27, name: 'Hotel Door', stat_id: 27, desc: 'Can use out of battle. Regain max 4 hearts. Card breaks after 4 uses. \n Can use set position as checkpoint, can purchase food to boost stats.\n Can shop. Can Teleport.'},
];

let item_stats = [
    {stat_id: 0, type: 'heart',    amount: +1},   // Potion
    {stat_id: 1, type: 'charge',   amount: -1},   // Ether
    {stat_id: 2, type: 'fix',      amount: +1},   // Antidote
    {stat_id: 3, type: 'build',    amount: +1},   // Barrier
    {stat_id: 4, type: 'regen',    amount: +0.2}, // Healyx
    {stat_id: 5, type: 'revive',   amount: +1},   // Revive
    {stat_id: 6, type: 'recovery', amount: +1},   // Sleeping Bag
    // Mid-tier items
    {stat_id: 7,  type: 'heart',    amount: +2},   // Mid Potion
    {stat_id: 8,  type: 'charge',   amount: -2},   // Mid Ether
    {stat_id: 9,  type: 'fix',      amount: +2},   // Mid Antidote
    {stat_id: 10, type: 'build',    amount: +2},   // Mid Barrier
    {stat_id: 11, type: 'regen',    amount: +0.5}, // Mid Healyx
    {stat_id: 12, type: 'revive',   amount: +2},   // Mid Revive
    {stat_id: 13, type: 'recovery', amount: +2},   // Tent

    // High-tier items
    {stat_id: 14, type: 'heart',    amount: +3},   // High Potion
    {stat_id: 15, type: 'charge',   amount: -3},   // High Ether
    {stat_id: 16, type: 'fix',      amount: +3},   // High Antidote
    {stat_id: 17, type: 'build',    amount: +3},   // High Barrier
    {stat_id: 18, type: 'regen',    amount: +1.0}, // High Healyx
    {stat_id: 19, type: 'revive',   amount: +3},   // High Revive
    {stat_id: 20, type: 'recovery', amount: +3},   // Cottage
    // Moon / Void / Star items (battle-wide effects)
    {stat_id: 21, type: 'heart',    amount: 'full'},   // Moon Potion (full heal)
    {stat_id: 22, type: 'charge',   amount: 'reset'},  // Void Ether (set to 0)
    {stat_id: 23, type: 'fix',      amount: 'all'},    // Star Antidote (all statuses)
    {stat_id: 24, type: 'build',    amount: '3turn'},  // Moon Barrier (3 turns)
    {stat_id: 25, type: 'regen',    amount: 'max'},    // Void Healyx (max stats)
    {stat_id: 26, type: 'revive',   amount: +4},       // Star Revive (4 hearts + max stats)
    {stat_id: 27, type: 'recovery', amount: +4},       // Hotel Door
];

manifest = [
    
    {id: 0, name: 'Rock', stat_id: 0, desc: 'Manifest rocks to damage multiple enemies.\nSlightly lowers enemies defense.'},
    {id: 1, name: 'Splash', stat_id: 1, desc: 'Manifest water to hit multiple enemies.\nSlightly regens players stats.'},
    {id: 2, name: 'Spark', stat_id: 2, desc: 'Manifest fire sparks to hit a single enemy.\nSlightly lowers enemies attack.'},
    {id: 3, name: 'Blow', stat_id: 3, desc: 'Manifest wind to hit a single enemy.\nSlightly raises players evasion.'},
    {id: 4, name: 'Whisper', stat_id: 4, desc: 'Manifest cosmic energy to hit multiple enemies.\nSlightly lowers enemies special attack.\nRaises players attack.'},
    {id: 5, name: 'Dart', stat_id: 5, desc: 'Manifest a dart to hit a single enemy.\nSlightly lowers enemy evasion.'},
    {id: 6, name: 'Wall', stat_id: 6, desc: 'Manifest a wall to hit multiple enemies.\nRaises special defense.'},
    
    {id: 7, name: 'Stone', stat_id: 7, desc: 'Manifest stones to damage multiple enemies.\nLowers enemies defense.'},
    {id: 8, name: 'Wave', stat_id: 8, desc: 'Manifest a wave to hit multiple enemies.\nRegens players stats.\nCan stun enemies.'},
    {id: 9, name: 'Whisp', stat_id: 9, desc: 'Manifest a fire whisp to hit a single enemy.\nLowers enemies attack.\nSlightly raises players attack.'},
    {id: 10, name: 'Gust', stat_id: 10, desc: 'Manifest a gust of wind to hit multiple enemies.\nRaises players evasion.'},
    {id: 11, name: 'Voice', stat_id: 11, desc: 'Manifest cosmic energy to hit a single enemy.\nLowers enemy special attack.\nRaises players special attack.'},
    {id: 12, name: 'Arrow', stat_id: 12, desc: 'Manifest an arrow to hit a single enemy.\nLowers enemy evasion.\nSlightly raises players dexterity.'},
    {id: 13, name: 'Close', stat_id: 13, desc: 'Manifest two walls to smash a single enemy.\nRaises special defense.\nCan stun enemy.'},

    {id: 14, name: 'Boulder', stat_id: 14, desc: 'Manifest boulders to damage multiple enemies.\nGreatly lowers enemies defense.'},
    {id: 15, name: 'Tidal Force', stat_id: 15, desc: 'Manifest a massive wave to hit multiple enemies.\nGreatly regens players stats.\nCan stun enemies.'},
    {id: 16, name: 'Blast', stat_id: 16, desc: 'Manifest a fire blast to hit multiple enemies.\nLowers enemies attack.\nRaises players attack.'},
    {id: 17, name: 'Tornado', stat_id: 17, desc: 'Manifest a tornado to hit multiple enemies.\nRaises players evasion.\nCan stun.'},
    {id: 18, name: 'Shout', stat_id: 18, desc: 'Manifest cosmic energy to hit multiple enemies.\nLowers enemy special attack.\nGreatly raises players special attack.'},
    {id: 19, name: 'Snipe', stat_id: 19, desc: 'Manifest a projectile to hit a single enemy.\nGreatly lowers enemy evasion.\nRaises players dexterity and evasion.'},
    {id: 20, name: 'Break', stat_id: 20, desc: 'Manifest a cube to compress a single enemy.\nGreatly raises special defense.\nCan 1‑shot enemy.'},
];


let manifest_stats = [
    // EARTH 
    {stat_id: 0,  damage_type: 'earth', d_output: 0.40, perk_type: 'def_down', p_output: 0.05, special: null},
    {stat_id: 7,  damage_type: 'earth', d_output: 0.55, perk_type: 'def_down', p_output: 0.08, special: null},
    {stat_id: 14, damage_type: 'earth', d_output: 0.70, perk_type: 'def_down', p_output: 0.12, special: null},

    // WATER 
    {stat_id: 1,  damage_type: 'water', d_output: 0.40, perk_type: 'regen', p_output: 0.05, special: null},
    {stat_id: 8,  damage_type: 'water', d_output: 0.55, perk_type: 'regen', p_output: 0.08, special: 'stun_chance'},
    {stat_id: 15, damage_type: 'water', d_output: 0.70, perk_type: 'regen', p_output: 0.12, special: 'stun_chance'},

    // FIRE 
    {stat_id: 2,  damage_type: 'fire', d_output: 0.40, perk_type: 'atk_down', p_output: 0.05, special: null},
    {stat_id: 9,  damage_type: 'fire', d_output: 0.55, perk_type: 'atk_down', p_output: 0.08, special: 'atk_up_small'},
    {stat_id: 16, damage_type: 'fire', d_output: 0.70, perk_type: 'atk_down', p_output: 0.12, special: 'atk_up'},

    // WIND 
    {stat_id: 3,  damage_type: 'wind', d_output: 0.40, perk_type: 'eva_up', p_output: 0.05, special: null},
    {stat_id: 10, damage_type: 'wind', d_output: 0.55, perk_type: 'eva_up', p_output: 0.08, special: null},
    {stat_id: 17, damage_type: 'wind', d_output: 0.70, perk_type: 'eva_up', p_output: 0.12, special: 'stun_chance'},

    // COSMIC 
    {stat_id: 4,  damage_type: 'cosmic', d_output: 0.40, perk_type: 'spatk_mix', p_output: 0.05, special: null},
    {stat_id: 11, damage_type: 'cosmic', d_output: 0.55, perk_type: 'spatk_up', p_output: 0.08, special: null},
    {stat_id: 18, damage_type: 'cosmic', d_output: 0.70, perk_type: 'spatk_up', p_output: 0.12, special: null},

    // PIERCE
    {stat_id: 5,  damage_type: 'pierce', d_output: 0.40, perk_type: 'eva_down', p_output: 0.05, special: null},
    {stat_id: 12, damage_type: 'pierce', d_output: 0.55, perk_type: 'dex_up', p_output: 0.08, special: null},
    {stat_id: 19, damage_type: 'pierce', d_output: 0.70, perk_type: 'dex_eva_up', p_output: 0.12, special: null},

    // IMPACT
    {stat_id: 6,  damage_type: 'impact', d_output: 0.40, perk_type: 'spdef_up', p_output: 0.05, special: null},
    {stat_id: 13, damage_type: 'impact', d_output: 0.55, perk_type: 'spdef_up', p_output: 0.08, special: 'stun_chance'},
    {stat_id: 20, damage_type: 'impact', d_output: 0.70, perk_type: 'spdef_up', p_output: 0.12, special: 'oneshot_chance_low'},

];


let skills = [
    {id: 0, name: 'Guard', stat_id: 0, desc: 'Defend against physical hit.'},
    {id: 1, name: 'Restore', stat_id: 1, desc: 'Restore a player stat.'},
    {id: 2, name:'Focus', stat_id: 2, desc: 'Focus to raise the damage of your next attack.'},
    {id: 3, name:'Dodge', stat_id: 3, desc: 'Dodge an oncoming attack.'},
    {id: 4, name: 'Meditate', stat_id: 4, desc: 'Recharge special attack.'},
    {id: 5, name: 'Reload', stat_id: 5, desc: 'Reload and reuse the last card used.'},
    {id: 6, name: 'Stop', stat_id: 6, desc: 'No manifest cards can be played for 1 turn player and enemy.'},
    {id: 7, name: 'Counter', stat_id: 7, desc:'Counter attack when defending.'},
    {id: 8, name: 'Ripple', stat_id: 8, desc: 'remove status implements from a card.'},
    {id: 9, name: 'Charge', stat_id: 9, desc: 'Charge the enemy and attack with everything you have. Will be lose next turn, attack stat is halved.'},
    {id: 10, name: 'Yoink', stat_id: 10, desc: 'Take something from the enemies belongings if they have any.'},
    {id: 11, name: 'Absorb', stat_id: 11, desc: 'Absorb some of an oncoming manifest to recharge a stat.'},
    {id: 12, name: 'Aim', stat_id: 12, desc: 'Raise dexterity for your next dextrous strike.'},
    {id: 13, name: 'Rebuild', stat_id: 13, desc: 'Build a cosmic wall to block oncoming Manifest.'},
    {id: 14, name: 'Tank Hits', stat_id: 14, desc: 'Take zero physical damage.'},
    {id: 15, name: 'Recall', stat_id: 15, desc: 'Recall and resuse last card used.'},
    {id: 16, name: 'Blow for Blow', stat_id: 16, desc: 'When taking damage return damage. If hit multiple times returning damage multiples.'},
    {id: 17, name: 'Vanish', stat_id: 17, desc: 'Vanish for this turn and return at the start of the next players turn.'},
    {id: 18, name: 'Rebuke', stat_id: 18, desc: 'Send manifest damage taken back to the manifestor.'},
    {id: 19, name: 'Scan', stat_id: 19, desc: 'Scan for enemy data and weak points. Raises Dexterous strike.'},
    {id: 20, name: 'Multiply', stat_id: 20, desc: 'Multiply player to 3 for next turn. Each card activates twice.'}
];

let skill_stats = [
    // 0 — Guard
    {stat_id: 0, damage_type: 'none', d_output: 0, perk_type: 'defense_up', p_output: 0.08},

    // 1 — Restore
    {stat_id: 1, damage_type: 'none', d_output: 0, perk_type: 'restore_stat', p_output: 0.20},

    // 2 — Focus
    {stat_id: 2, damage_type: 'none', d_output: 0, perk_type: 'next_attack_up', p_output: 0.25},

    // 3 — Dodge
    {stat_id: 3, damage_type: 'none', d_output: 0, perk_type: 'evasion_up', p_output: 0.30},

    // 4 — Meditate
    {stat_id: 4, damage_type: 'none', d_output: 0, perk_type: 'spatk_recharge', p_output: 0.20},

    // 5 — Reload
    {stat_id: 5, damage_type: 'none', d_output: 0, perk_type: 'reuse_last_card', p_output: 1},

    // 6 — Stop
    {stat_id: 6, damage_type: 'none', d_output: 0, perk_type: 'lock_manifest', p_output: 1},

    // 7 — Counter
    {stat_id: 7, damage_type: 'counter', d_output: 0.60, perk_type: 'counter_ready', p_output: 1},

    // 8 — Ripple
    {stat_id: 8, damage_type: 'none', d_output: 0, perk_type: 'cleanse', p_output: 1},

    // 9 — Charge
    {stat_id: 9, damage_type: 'attack', d_output: 1.50, perk_type: 'attack_halved_next_turn', p_output: 0.50},

    // 10 — Yoink
    {stat_id: 10, damage_type: 'none', d_output: 0, perk_type: 'steal_item', p_output: 1},

    // 11 — Absorb
    {stat_id: 11, damage_type: 'none', d_output: 0, perk_type: 'absorb_manifest', p_output: 0.15},

    // 12 — Aim
    {stat_id: 12, damage_type: 'none', d_output: 0, perk_type: 'dex_up_next', p_output: 0.25},

    // 13 — Rebuild
    {stat_id: 13, damage_type: 'none', d_output: 0, perk_type: 'manifest_block', p_output: 0.20},

    // 14 — Tank Hits
    {stat_id: 14, damage_type: 'none', d_output: 0, perk_type: 'zero_physical_damage', p_output: 1},

    // 15 — Recall
    {stat_id: 15, damage_type: 'none', d_output: 0, perk_type: 'reuse_last_card', p_output: 1},

    // 16 — Blow for Blow
    {stat_id: 16, damage_type: 'counter', d_output: 0.75, perk_type: 'multi_counter', p_output: 1},

    // 17 — Vanish
    {stat_id: 17, damage_type: 'none', d_output: 0, perk_type: 'invulnerable', p_output: 1},

    // 18 — Rebuke
    {stat_id: 18, damage_type: 'reflect', d_output: 0.80, perk_type: 'reflect_manifest', p_output: 1},

    // 19 — Scan
    {stat_id: 19, damage_type: 'none', d_output: 0, perk_type: 'dex_up', p_output: 0.20},

    // 20 — Multiply
    {stat_id: 20, damage_type: 'none', d_output: 0, perk_type: 'double_card_effects', p_output: 2}
];

let traps = [
    {id: 0, name: 'Piercer', desc: 'When a chest is opened, player is pierced.', stat_nerf: 'def', nerf_amount: 0.15},
    {id: 1, name: 'Slop', desc: 'When a chest is opened, player drenched in slime.', dmg_type: 'res', nerf_amount: 0.15},
    {id: 2, name: 'Extinguisher', desc: 'When a chest is opened, player is blasted with smoke.', dmg_type: 'def', nerf_amount: 0.15},
    {id: 3, name: 'Vortex', desc: 'When a chest is opened, player is spun in vortex.', dmg_type: 'eva', dmg_amount: 0.15},
    {id: 4, name: 'Muffle', desc: 'When a chest is opened, player is silenced', dmg_type: 'SPatk', dmg_amount: 0.15},
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


materials = [
    // red cards
    {id: 0, name: 'Iron Shard', upgrade_type: 'red', amount: 1, rarity: 'Common', desc: 'Use to upgrade red cards from Rank F to Rank E.'},
    {id: 1, name: 'Jasper Pebble', upgrade_type: 'red', amount: 2, rarity: 'Uncommon', desc: 'Use to upgrade red cards from Rank E to Rank D.'},
    {id: 2, name: 'Obsidian Stone', upgrade_type: 'red', amount: 3, rarity: 'Rare', desc: 'Use to upgrade red cards from Rank D to Rank C.'},
    {id: 3, name: 'Iron Brick', upgrade_type: 'red', amount: 4, rarity: 'Ultra Rare', desc: 'Use to upgrade red cards from Rank C to Rank B.'},
    {id: 4, name: 'Red Jasper', upgrade_type: 'red', amount: 5, rarity: 'Legendary', desc: 'Use to upgrade red cards from Rank B to Rank A.'},
    {id: 5, name: 'Black Obsidian', upgrade_type: 'red', amount: 6, rarity: 'Cosmic', desc: 'Use to upgrade red cards from Rank A to Rank S.'},
    {id: 6, name: 'Red Root', upgrade_type: 'red', amount: 7, rarity: 'Paradismic', desc: 'Use to upgrade red cards from Rank S to Rank SS.'},

    // orange cards
    {id: 7, name: 'Titanium Shard', upgrade_type: 'orange', amount: 1, rarity: 'Common', desc: 'Use to upgrade orange cards from Rank F to Rank E.'},
    {id: 8, name: 'Pyrite Pebble', upgrade_type: 'orange', amount: 2, rarity: 'Uncommon', desc: 'Use to upgrade orange cards from Rank E to Rank D.'},
    {id: 9, name: 'Small Kongk', upgrade_type: 'orange', amount: 3, rarity: 'Rare', desc: 'Use to upgrade orange cards from Rank D to Rank C.'},
    {id: 10, name: 'Titanium Brick', upgrade_type: 'orange', amount: 4, rarity: 'Ultra Rare', desc: 'Use to upgrade orange cards from Rank C to Rank B.'},
    {id: 11, name: 'Pyrite Stone', upgrade_type: 'orange', amount: 5, rarity: 'Legendary', desc: 'Use to upgrade orange cards from Rank B to Rank A.'},
    {id: 12, name: 'Large Kongk', upgrade_type: 'orange', amount: 6, rarity: 'Cosmic', desc: 'Use to upgrade orange cards from Rank A to Rank S.'},
    {id: 13, name: 'Sacral Orb', upgrade_type: 'orange', amount: 7, rarity: 'Paradismic', desc: 'Use to upgrade orange cards from Rank S to Rank SS.'},

    // yellow cards
    {id: 14, name: 'Steel Shard', upgrade_type: 'yellow', amount: 1, rarity: 'Common', desc: 'Use to upgrade yellow cards from Rank F to Rank E.'},
    {id: 15, name: 'Cat Eye', upgrade_type: 'yellow', amount: 2, rarity: 'Uncommon', desc: 'Use to upgrade yellow cards from Rank E to Rank D.'},
    {id: 16, name: 'Fire Flare', upgrade_type: 'yellow', amount: 3, rarity: 'Rare', desc: 'Use to upgrade yellow cards from Rank D to Rank C.'},
    {id: 17, name: 'Steel Brick', upgrade_type: 'yellow', amount: 4, rarity: 'Ultra Rare', desc: 'Use to upgrade yellow cards from Rank C to Rank B.'},
    {id: 18, name: 'Tiger Eye', upgrade_type: 'yellow', amount: 5, rarity: 'Legendary', desc: 'Use to upgrade yellow cards from Rank B to Rank A.'},
    {id: 19, name: 'Solar Flare', upgrade_type: 'yellow', amount: 6, rarity: 'Cosmic', desc: 'Use to upgrade yellow cards from Rank A to Rank S.'},
    {id: 20, name: 'Solar Totem', upgrade_type: 'yellow', amount: 7, rarity: 'Paradismic', desc: 'Use to upgrade yellow cards from Rank S to Rank SS.'},

    // green cards
    {id: 21, name: 'Aluminum Shard', upgrade_type: 'green', amount: 1, rarity: 'Common', desc: 'Use to upgrade green cards from Rank F to Rank E.'},
    {id: 22, name: 'Rose Pebble', upgrade_type: 'green', amount: 2, rarity: 'Uncommon', desc: 'Use to upgrade green cards from Rank E to Rank D.'},
    {id: 23, name: 'Emerald Particle', upgrade_type: 'green', amount: 3, rarity: 'Rare', desc: 'Use to upgrade green cards from Rank D to Rank C.'},
    {id: 24, name: 'Aluminum Brick', upgrade_type: 'green', amount: 4, rarity: 'Ultra Rare', desc: 'Use to upgrade green cards from Rank C to Rank B.'},
    {id: 25, name: 'Rose Quartz', upgrade_type: 'green', amount: 5, rarity: 'Legendary', desc: 'Use to upgrade green cards from Rank B to Rank A.'},
    {id: 26, name: 'Emerald Wave', upgrade_type: 'green', amount: 6, rarity: 'Cosmic', desc: 'Use to upgrade green cards from Rank A to Rank S.'},
    {id: 27, name: 'Heart Star', upgrade_type: 'green', amount: 7, rarity: 'Paradismic', desc: 'Use to upgrade green cards from Rank S to Rank SS.'},

    // blue cards
    {id: 28, name: 'Copper Shard', upgrade_type: 'blue', amount: 1, rarity: 'Common', desc: 'Use to upgrade blue cards from Rank F to Rank E.'},
    {id: 29, name: 'Blue Wire', upgrade_type: 'blue', amount: 2, rarity: 'Uncommon', desc: 'Use to upgrade blue cards from Rank E to Rank D.'},
    {id: 30, name: 'Small Fuse', upgrade_type: 'blue', amount: 3, rarity: 'Rare', desc: 'Use to upgrade blue cards from Rank D to Rank C.'},
    {id: 31, name: 'Copper Brick', upgrade_type: 'blue', amount: 4, rarity: 'Ultra Rare', desc: 'Use to upgrade blue cards from Rank C to Rank B.'},
    {id: 32, name: 'Blue Chord', upgrade_type: 'blue', amount: 5, rarity: 'Legendary', desc: 'Use to upgrade blue cards from Rank B to Rank A.'},
    {id: 33, name: 'Large Fuse', upgrade_type: 'blue', amount: 6, rarity: 'Cosmic', desc: 'Use to upgrade blue cards from Rank A to Rank S.'},
    {id: 34, name: 'Swan Song', upgrade_type: 'blue', amount: 7, rarity: 'Paradismic', desc: 'Use to upgrade blue cards from Rank S to Rank SS.'},

    // indigo cards
    {id: 35, name: 'Cheap Parts', upgrade_type: 'indigo', amount: 1, rarity: 'Common', desc: 'Use to upgrade indigo cards from Rank F to Rank E.'},
    {id: 36, name: 'Lapis Pebble', upgrade_type: 'indigo', amount: 2, rarity: 'Uncommon', desc: 'Use to upgrade indigo cards from Rank E to Rank D.'},
    {id: 37, name: 'Trade Rumor', upgrade_type: 'indigo', amount: 3, rarity: 'Rare', desc: 'Use to upgrade indigo cards from Rank D to Rank C.'},
    {id: 38, name: 'Expensive Parts', upgrade_type: 'indigo', amount: 4, rarity: 'Ultra Rare', desc: 'Use to upgrade indigo cards from Rank C to Rank B.'},
    {id: 39, name: 'Lapis Lazuli', upgrade_type: 'indigo', amount: 5, rarity: 'Legendary', desc: 'Use to upgrade indigo cards from Rank B to Rank A.'},
    {id: 40, name: 'Trade Secret', upgrade_type: 'indigo', amount: 6, rarity: 'Cosmic', desc: 'Use to upgrade indigo cards from Rank A to Rank S.'},
    {id: 41, name: 'Third Tenman', upgrade_type: 'indigo', amount: 7, rarity: 'Paradismic', desc: 'Use to upgrade indigo cards from Rank S to Rank SS.'},

    // violet cards
    {id: 42, name: 'Lithium Walnut', upgrade_type: 'violet', amount: 1, rarity: 'Common', desc: 'Use to upgrade violet cards from Rank F to Rank E.'},
    {id: 43, name: 'Amethyst Pebble', upgrade_type: 'violet', amount: 2, rarity: 'Uncommon', desc: 'Use to upgrade violet cards from Rank E to Rank D.'},
    {id: 44, name: 'Crystalite', upgrade_type: 'violet', amount: 3, rarity: 'Rare', desc: 'Use to upgrade violet cards from Rank D to Rank C.'},
    {id: 45, name: 'Lithium Eggplant', upgrade_type: 'violet', amount: 4, rarity: 'Ultra Rare', desc: 'Use to upgrade violet cards from Rank C to Rank B.'},
    {id: 46, name: 'Amethyst', upgrade_type: 'violet', amount: 5, rarity: 'Legendary', desc: 'Use to upgrade violet cards from Rank B to Rank A.'},
    {id: 47, name: 'Megacrystal', upgrade_type: 'violet', amount: 6, rarity: 'Cosmic', desc: 'Use to upgrade violet cards from Rank A to Rank S.'},
    {id: 48, name: 'Kundalini Crown', upgrade_type: 'violet', amount: 7, rarity: 'Paradismic', desc: 'Use to upgrade violet cards from Rank S to Rank SS.'},
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

enemies = [
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

enemy_stats = [
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

users[0].cards.weapons.push(0, 2, 23);      // Shock Baton, Combat Sword, Iron Dagger
users[0].cards.equipments.push(0, 3);        // Clown Shoes, Green Ring
users[0].cards.items.push(0, 1, 3);          // Potion, Ether, Barrier
users[0].cards.manifest.push(0, 1, 2);       // Rock, Splash, Spark
users[0].cards.skills.push(0, 1, 3);         // Guard, Restore, Dodge