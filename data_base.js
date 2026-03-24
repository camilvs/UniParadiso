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
    {id: 22, name: "Bow", stat_id: 22, stat_id: 22, desc: 'An accurate choice.'},
    {id: 23, name: "Iron Dagger", stat_id: 23, desc: 'Babies first weapon.'},
];

let equipments = [
    {id: 0, name: 'Clown Shoes', stat_id: 24, desc: 'Change twin to Clown form.\n DEF++'},
    {id: 1, name: 'Fairy Wings', stat_id: 25, desc: 'Change twin to Fairy form.\n RES++'},
    {id: 2, name: 'Black Hoodie', stat_id: 26, desc: 'Change twin to Worker form.\n ATK++'},
    {id: 3, name: 'Green Ring', stat_id: 27, desc: 'Change twin to Whisper form.\n EVA++'},
    {id: 4, name: 'Tap Shoes', stat_id: 28, desc: 'Change twin to Vox form.\n spATK++'},
    {id: 5, name: 'Gas Mask', stat_id: 29, desc: 'Change twin to Marks form.\n DEX++'},
    {id: 6, name: 'Blessed Thorns', stat_id: 30, desc: 'Change twin to Crowned form.\n spDEF++'},
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
    {stat_id: 24, def: 18,  res: 8,  atk: 4,  eva: -4,  spATK: 0,  dex: 6,  spDEF: 8},//clown shoes
    {stat_id: 25, def: 8,  res: 18,  atk: 4,  eva: 8,  spATK: 8,  dex: 4,  spDEF: 8},//Fairy Wings 
    {stat_id: 26, def: -4,  res: 0,  atk: 18,  eva: 5,  spATK: 0,  dex: 6,  spDEF: 0},//Black Hoodie 
    {stat_id: 27, def: 4,  res: 8,  atk: -2,  eva: 18,  spATK: 8,  dex: 6,  spDEF: 6},//Green Ring  
    {stat_id: 28, def: -4,  res: 8,  atk: 4,  eva: -2,  spATK: 18,  dex: 4,  spDEF: 9},//Tap Shoes 
    {stat_id: 29, def: 7,  res: 4,  atk: 0,  eva: 8,  spATK: 0,  dex: 18,  spDEF: 4},//Gas Mask 
    {stat_id: 30, def: 8,  res: 8,  atk: 4,  eva: 0,  spATK: 7,  dex: 8,  spDEF: 18},//Blessed Thorns
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

manest = [
    {id: 0, name: 'Rock', stat_id: 0, desc: 'Manifest rocks to damage mulitple enemies.\n Slightly lowers enemies defense.'},
    {id: 1, name: 'Splash', stat_id: 1, desc: 'Manifest water to hit mulitple enemies.\n Slightly regens players stats.'},
    {id: 2, name: 'Spark', stat_id: 2, desc: 'Manifest fire sparks to hit single enemy. Slightly lowers enemies attack.'},
    {id: 3, name: 'Blow', stat_id: 3, desc: 'Manifest wind to hit single enemy. Slightly raises players evasion.'},
    {id: 4, name: 'Whisper', stat_id: 4, desc: 'Manifest cosmic energy to hit mulitple enemies. Slightly lowers enemies special attack.\nRaises players attack.'},
    {id: 5, name: 'Dart', stat_id: 5, desc: 'Manifest a dart to hit single enemy. Slightly lowers enemy evasion.'},
    {id: 6, name: 'Wall', stat_id: 6, desc: 'Manifest a wall to hit mulitple enemies. Raises special defense.'},
    {id: 7, name: 'Stone', stat_id: 7, desc: 'Manifest stones to damage mulitple enemies.\nLowers enemies defense.'},
    {id: 8, name: 'Wave', stat_id: 8, desc: 'Manifest wave to hit mulitple enemies.\nRegens players stats. Can Stun enemies.'},
    {id: 9, name: 'Whips', stat_id: 9, desc: 'Manifest fire whips to hit single enemy. Lowers enemies attack. Slightly raises players attack.'},
    
];