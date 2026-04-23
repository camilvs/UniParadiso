// battle_test.js
let battle_state = {
    players: [],
    enemies: [],
    turn_order: [],
    current_turn_index: 0,
    round_number: 1
};

let action_queue = [
    null,
    null,
    null,
    null,
    null,
    null,
    null
];

let active_actor_slot = 0;
let battle_in_progress = false;
let battle_log = [];

let current_planning_actor_key = null;
let planning_player_index = 0;

let battle_phase = "planning"; // "planning" | "resolution"

const battle_visual_positions = {
    visual_e_front_position: { x: 120, y: 320, z: 224, rx: -45, ry: 0, rz: 0, scale: 1, w: 180, h: 180 },
    visual_e_mid_1:         { x: 90,  y: 140, z: 30,  rx: -12, ry: 0, rz: 0, scale: 1, w: 96,  h: 96  },
    visual_e_mid_2:         { x: 234, y: 140, z: 30,  rx: -12, ry: 0, rz: 0, scale: 1, w: 96,  h: 96  },
    visual_e_back_1:        { x: 18,  y: 58,  z: -10, rx: -12, ry: 0, rz: 0, scale: 1, w: 110, h: 110 },
    visual_e_back_2:        { x: 18,  y: 50, z: -10, rx: -12, ry: 0, rz: 0, scale: 1, w: 180, h: 180 },
    visual_e_back_3:        { x: 292, y: 58,  z: -10, rx: -12, ry: 0, rz: 0, scale: 1, w: 110, h: 110 },

    visual_p_front_position:{ x: 162, y: 420, z: 0,   rx: -45, ry: 0, rz: 0, scale: 1, w: 96,  h: 96  },
    visual_p_mid_1:         { x: 90,  y: 580, z: 30,  rx: -12, ry: 0, rz: 0, scale: 1, w: 96,  h: 96  },
    visual_p_mid_2:         { x: 234, y: 580, z: 30,  rx: -12, ry: 0, rz: 0, scale: 1, w: 96,  h: 96  },
    visual_p_back_1:        { x: 18,  y: 654, z: -10, rx: -12, ry: 0, rz: 0, scale: 1, w: 110, h: 110 },
    visual_p_back_2:        { x: 155, y: 666, z: -25, rx: -12, ry: 0, rz: 0, scale: 1, w: 110, h: 110 },
    visual_p_back_3:        { x: 292, y: 654, z: -10, rx: -12, ry: 0, rz: 0, scale: 1, w: 110, h: 110 }
};

const handler_selector_map = {
    get_e_front_position: "visual_e_front_position",
    get_e_mid_1: "visual_e_mid_1",
    get_e_mid_2: "visual_e_mid_2",
    get_e_back_1: "visual_e_back_1",
    get_e_back_2: "visual_e_back_2",
    get_e_back_3: "visual_e_back_3",

    get_p_front_position: "visual_p_front_position",
    get_p_mid_1: "visual_p_mid_1",
    get_p_mid_2: "visual_p_mid_2",
    get_p_back_1: "visual_p_back_1",
    get_p_back_2: "visual_p_back_2",
    get_p_back_3: "visual_p_back_3"
};

const battle_rig = document.getElementById("battle_rig");
const battle_order = document.getElementById("battle_order");
const equipped_card_inventory = document.getElementById("equipped_card_inventory");
const card_preview = document.getElementById("card_preview");

const start_commands = document.getElementById("start_commands");
const move_commands = document.getElementById("move_commands");
const card_commands = document.getElementById("card_commands");

const command_move = document.getElementById("command_move");
const move_canceled = document.getElementById("move_canceled");
const command_cards = document.getElementById("command_cards");
const to_commands = document.getElementById("to_commands");
let active_card_filter = "All";

const command_all_cards = document.getElementById("command_all_cards");
const command_weapons = document.getElementById("command_weapons");
const command_items = document.getElementById("command_items");
const command_manifest = document.getElementById("command_manifest");
const command_skills = document.getElementById("command_skills");

const battle_board = document.getElementById("battle_board");
const battle_camera_left = document.getElementById("battle_camera_left");
const battle_camera_right = document.getElementById("battle_camera_right");

const battle_visual_layer = document.getElementById("battle_visual_layer");

const handler_menu = document.getElementById("handler_menu");
const element_handler = document.getElementById("element_handler");
let handler_header = document.getElementById("handler_header");
const handler_closer = document.getElementById("handler_closer");
const element_name = document.getElementById("element_name");

const element_x = document.getElementById("element_x");
const element_y = document.getElementById("element_y");
const element_z = document.getElementById("element_z");
const element_rx = document.getElementById("element_rx");
const element_ry = document.getElementById("element_ry");
const element_rz = document.getElementById("element_rz");
const element_scale = document.getElementById("element_scale");

const exit_test_battle = document.getElementById("exit_test_battle");

const battle_queue_window = document.getElementById("battle_queue_window");
const target_battle_stats = document.getElementById("target_battle_stats");
const battle_target_def = document.getElementById("battle_target_def");
const battle_target_res = document.getElementById("battle_target_res");
const battle_target_atk = document.getElementById("battle_target_atk");
const battle_target_eva = document.getElementById("battle_target_eva");
const battle_target_spATK = document.getElementById("battle_target_spATK");
const battle_target_dex = document.getElementById("battle_target_dex");
const battle_target_spDEF = document.getElementById("battle_target_spDEF");
const enemy_side_battle = document.getElementById("enemy_side_battle");
const battle_choice_back_1 = document.getElementById("battle_choice_back_1"); 
const battle_choice_back_2 = document.getElementById("battle_choice_back_2");
const battle_choice_back_3 = document.getElementById("battle_choice_back_3");
const battle_choice_mid_1 = document.getElementById("battle_choice_mid_1");
const battle_choice_mid_2 = document.getElementById("battle_choice_mid_2");
const battle_choice_front_position = document.getElementById("battle_choice_front_position");     
const battle_player_side = document.getElementById("battle_player_side");
const battle_squad_back_1 = document.getElementById("battle_squad_back_1");
const battle_squad_back_2 = document.getElementById("battle_squad_back_2");
const battle_squad_back_3 = document.getElementById("battle_squad_back_3");
const battle_squad_mid_1 = document.getElementById("battle_squad_mid_1");
const battle_squad_mid_2 = document.getElementById("battle_squad_mid_2");
const battle_squad_front_position = document.getElementById("battle_squad_front_position");
const card_battle_queue = document.getElementById("card_battle_queue");
const battle_queue_0 = document.getElementById("battle_queue_0");
const battle_queue_1 = document.getElementById("battle_queue_1");
const battle_queue_2 = document.getElementById("battle_queue_2");
const battle_queue_3 = document.getElementById("battle_queue_3");
const battle_queue_4 = document.getElementById("battle_queue_4");
const battle_queue_5 = document.getElementById("battle_queue_5");
const battle_queue_6 = document.getElementById("battle_queue_6");
const battle_target_hearts = document.getElementById("battle_target_hearts");
const to_cards = document.getElementById("to_cards");

let to_battle = document.getElementById("to_battle");

const command_done = document.getElementById("command_done");

let battle_log_window = document.getElementById("battle_log_window");
let battle_log_header = document.getElementById("battle_log_header");
let battle_log_close = document.getElementById("battle_log_close");
const battle_log_el = document.getElementById("battle_log");

let phase_turn_order = [];
let current_turn_index = 0;

let active_visual_id = null;

let battle_camera_y = 0;
let is_battle_camera_turning = false;

let battle_resolution_wait = false;

function setBattleInteractionEnabled(enabled){
    const pointerValue = enabled ? "auto" : "none";
    const opacityValue = enabled ? "1" : "0.6";

    if(start_commands){
        start_commands.style.pointerEvents = pointerValue;
        start_commands.style.opacity = opacityValue;
    }

    if(move_commands){
        move_commands.style.pointerEvents = pointerValue;
        move_commands.style.opacity = opacityValue;
    }

    if(card_commands){
        card_commands.style.pointerEvents = pointerValue;
        card_commands.style.opacity = opacityValue;
    }

    if(battle_queue_window){
        battle_queue_window.style.pointerEvents = pointerValue;
        battle_queue_window.style.opacity = opacityValue;
    }

    if(enemy_side_battle){
        enemy_side_battle.style.pointerEvents = pointerValue;
    }

    if(battle_player_side){
        battle_player_side.style.pointerEvents = pointerValue;
    }
}

function waitBeforeNextResolutionActor(delay = 3000){
    battle_resolution_wait = true;
    setBattleInteractionEnabled(false);

    setTimeout(() => {
        battle_resolution_wait = false;
        setBattleInteractionEnabled(true);
        advanceResolutionTurn();
    }, delay);
}

function initializeCardFilters(){

    if(command_all_cards){
        command_all_cards.onclick = function(){
            active_card_filter = "All";
            renderEquippedDeck();
        };
    }

    if(command_weapons){
        command_weapons.onclick = function(){
            active_card_filter = "Weapon";
            renderEquippedDeck();
        };
    }

    if(command_items){
        command_items.onclick = function(){
            active_card_filter = "Item";
            renderEquippedDeck();
        };
    }

    if(command_manifest){
        command_manifest.onclick = function(){
            active_card_filter = "Manifest";
            renderEquippedDeck();
        };
    }

    if(command_skills){
        command_skills.onclick = function(){
            active_card_filter = "Skill";
            renderEquippedDeck();
        };
    }
}

function renderFilterButtonStates(){
    const buttons = [
        { el: command_all_cards, type: "All" },
        { el: command_weapons, type: "Weapon" },
        { el: command_items, type: "Item" },
        { el: command_manifest, type: "Manifest" },
        { el: command_skills, type: "Skill" }
    ];

    buttons.forEach(button => {
        if(!button.el) return;

        const isActive = active_card_filter === button.type;

        button.el.style.backgroundColor = isActive ? "gold" : "black";
        button.el.style.color = isActive ? "black" : "ghostwhite";
        button.el.style.border = isActive ? "1px inset #222" : "1px white outset";
    });
}

function initializeCommandMenus(){

    if(command_move){
        command_move.onclick = function(){
            start_commands.style.display = "none";
            move_commands.style.display = "flex";
        };
    }

    if(move_canceled){
        move_canceled.onclick = function(){
            move_commands.style.display = "none";
            start_commands.style.display = "flex";
        };
    }

    if(command_cards){
        command_cards.onclick = function(){
            start_commands.style.display = "none";
            card_commands.style.display = "flex";
        };
    }

    if(to_commands){
        to_commands.onclick = function(){
            card_commands.style.display = "none";
            start_commands.style.display = "flex";
        };
    }

    if(command_done){
    command_done.onclick = function(){
        advanceToNextPlanningActor();
    };
}
}

function getBattleSpeedFromStats(stats){
    if(!stats) return 0;

    return Math.max(
        0,
        Number(stats.eva || 0) +
        Math.floor(Number(stats.dex || 0) / 2) -
        Number(stats.def || 0)
    );
}

const player_battle_position_map = {
    0: "front_position",
    1: "mid_1",
    2: "mid_2"
};

function buildPlayerBattleActors(){
    if(!Array.isArray(current_squad)) return [];

    return current_squad
        .filter(member =>
            member &&
            member.user_id !== null &&
            member.avatar_id !== null
        )
        .map(member => {
            const avatar = findAvatarById(member.avatar_id);
            const stats = getEffectiveStatsForMember(member);
            const battlePosition = player_battle_position_map[member.slot] || "back_1";

            return {
                actor_key: `player-${member.slot}`,
                side: "player",
                squad_slot: Number(member.slot),
                battle_position: battlePosition,
                user_id: Number(member.user_id),
                avatar_id: Number(member.avatar_id),
                name: avatar?.name || `Player ${member.slot}`,
                hearts: Number(stats.hearts || 0),
                max_hearts: Number(stats.hearts || 0),
                stats: {
                    def: Number(stats.def || 0),
                    res: Number(stats.res || 0),
                    atk: Number(stats.atk || 0),
                    eva: Number(stats.eva || 0),
                    spATK: Number(stats.spATK || 0),
                    dex: Number(stats.dex || 0),
                    spDEF: Number(stats.spDEF || 0),
                    cp: Number(stats.cp || 0)
                },
                speed: getBattleSpeedFromStats(stats),
                alive: Number(stats.hearts || 0) > 0,
                guarding: false,
                queued_actions: []
            };
        });
}

function buildEnemyBattleActors(){
    const testEncounter = loadBattleTestEncounter();
    if(!testEncounter || !testEncounter.encounter_data) return [];

    const encounter = testEncounter.encounter_data;

    const encounterSlots = [
        { position: "front_position", enemyId: encounter.front_position },
        { position: "mid_1", enemyId: encounter.mid_1 },
        { position: "mid_2", enemyId: encounter.mid_2 },
        { position: "back_1", enemyId: encounter.back_1 },
        { position: "back_2", enemyId: encounter.back_2 },
        { position: "back_3", enemyId: encounter.back_3 }
    ];

    return encounterSlots
        .filter(slot => slot.enemyId !== null && slot.enemyId !== undefined)
        .map(slot => {
            const enemyBundle = getEnemyStatBlock(slot.enemyId);
            if(!enemyBundle) return null;

            const enemy = enemyBundle.enemy;
            const stats = enemyBundle.stats;

            return {
                actor_key: `enemy-${slot.position}`,
                side: "enemy",
                enemy_id: Number(enemy.id),
                battle_position: slot.position,
                name: enemy.name || slot.position,
                hearts: Number(stats.hearts || 0),
                max_hearts: Number(stats.hearts || 0),
                stats: {
                    def: Number(stats.def || 0),
                    res: Number(stats.res || 0),
                    atk: Number(stats.atk || 0),
                    eva: Number(stats.eva || 0),
                    spATK: Number(stats.spATK || 0),
                    dex: Number(stats.dex || 0),
                    spDEF: Number(stats.spDEF || 0),
                    cp: 0
                },
                speed: getBattleSpeedFromStats(stats),
                alive: Number(stats.hearts || 0) > 0,
                guarding: false,
                queued_actions: []
            };
        })
        .filter(Boolean);
}

function buildBattleTurnOrder(players, enemies){
    const allActors = [...players, ...enemies];

    return allActors
        .filter(actor => actor.alive)
        .sort((a, b) => {
            // 1. higher speed first
            if(b.speed !== a.speed){
                return b.speed - a.speed;
            }

            // 2. higher dex first
            if((b.stats.dex || 0) !== (a.stats.dex || 0)){
                return (b.stats.dex || 0) - (a.stats.dex || 0);
            }

            // 3. players before enemies on ties
            if(a.side !== b.side){
                return a.side === "player" ? -1 : 1;
            }

            // 4. stable position fallback
            const aPos = String(a.battle_position || "");
            const bPos = String(b.battle_position || "");
            return aPos.localeCompare(bPos);
        });
}

    function getCurrentResolutionActor(){
        if(!battle_state || !Array.isArray(battle_state.turn_order)) return null;
        return battle_state.turn_order[battle_state.current_turn_index] || null;
    }

    function getQueuedCardForActor(slot){
        return action_queue.find(card =>
            card && Number(card.actor_slot) === Number(slot)
        ) || null;
    }

function initializeBattleState(){
    const players = buildPlayerBattleActors();
    const enemies = buildEnemyBattleActors();
    const turnOrder = buildBattleTurnOrder(players, enemies);

    battle_state = {
        players,
        enemies,
        turn_order: turnOrder,
        current_turn_index: 0,
        round_number: 1
    };

    console.log("Battle state initialized:", battle_state);
}

function logBattleTurnOrder(){
    if(!battle_state || !Array.isArray(battle_state.turn_order)) return;

    console.log("=== TURN ORDER ===");
    battle_state.turn_order.forEach((actor, index) => {
        console.log(
            `${index + 1}. ${actor.name} [${actor.side}] ` +
            `speed=${actor.speed} dex=${actor.stats.dex} ` +
            `pos=${actor.battle_position}`
        );
    });
}

function renderBattleOrder() {
    const phaseOrder = battle_state?.turn_order || [];

    battle_order.innerHTML = "";

    phaseOrder.forEach((battler, index) => {

        const slot = document.createElement("div");

        Object.assign(slot.style, {
            width: "32px",
            height: "32px",
            border: "yellow 3px inset",
            borderRadius: "7px",
            backgroundColor: "#222",
            marginRight: "5px",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",

            // Dim actors who already acted
            opacity: index < battle_state.current_turn_index ? "0.45" : "1"
        });

        if (battler) {

            slot.title = `${battler.name} | SPD ${battler.speed}`;

            // portrait
            if (battler.side === "player") {

                const avatar = findAvatarById(battler.avatar_id);

                if (avatar?.image_portrait) {
                    slot.style.backgroundImage =
                        `url(./images/${avatar.image_portrait})`;
                }

                slot.style.boxShadow = "0 0 6px cyan";

            } else {

                slot.style.backgroundImage =
                    `url(./images/enemy_${battler.enemy_id}.png)`;

                slot.style.boxShadow = "0 0 6px crimson";
            }

            // highlight current actor
            if (index === battle_state.current_turn_index) {
                slot.style.outline = "2px solid white";
            }
        }

        battle_order.appendChild(slot);
    });
}

function getCurrentPlanningActor(){
    if(!battle_state || !Array.isArray(battle_state.turn_order)) return null;

    return battle_state.turn_order.find(actor =>
        actor.actor_key === current_planning_actor_key
    ) || null;
}

function resolveNextCardForCurrentActorOrAdvance(){
    const actor = getCurrentResolutionActor();

    if(!actor){
        advanceResolutionTurn();
        return;
    }

    if(actor.side !== "player"){
        advanceResolutionTurn();
        return;
    }

    const nextCard = getQueuedCardForActor(actor.squad_slot);

    // Same actor still has queued cards, keep their turn going
    if(nextCard){
        resolvePlayerTurn(actor);
        return;
    }

    // No more queued cards for this actor, now decide whether to pause before next player
    const nextActor = battle_state?.turn_order?.[battle_state.current_turn_index + 1] || null;

    if(
        nextActor &&
        nextActor.side === "player" &&
        nextActor.alive
    ){
        waitBeforeNextResolutionActor(800);
    }else{
        advanceResolutionTurn();
    }
}
function startPlayerPlanningPhase(){
    if(!battle_state || !Array.isArray(battle_state.turn_order)) return;

    const livingPlayersInOrder = battle_state.turn_order.filter(actor =>
        actor.side === "player" && actor.alive
    );

    if(livingPlayersInOrder.length === 0){
        console.log("No living players available for planning.");
        return;
    }

    if(planning_player_index >= livingPlayersInOrder.length){
        planning_player_index = 0;
    }

    const actor = livingPlayersInOrder[planning_player_index];
    current_planning_actor_key = actor.actor_key;
    active_actor_slot = actor.squad_slot;

    renderCurrentActorCommandPortrait();
    renderEquippedDeck();

    start_commands.style.display = "flex";
    move_commands.style.display = "none";
    card_commands.style.display = "none";

    console.log("Planning actor:", actor.name, actor.actor_key);
}

function advanceToNextPlanningActor(){
    if(!battle_state || !Array.isArray(battle_state.turn_order)) return;

    const livingPlayersInOrder = battle_state.turn_order.filter(actor =>
        actor.side === "player" && actor.alive
    );

    if(livingPlayersInOrder.length === 0){
        return;
    }

    planning_player_index++;

    if(planning_player_index >= livingPlayersInOrder.length){
        planning_player_index = 0;
        console.log("All player planning complete.");

        startBattleResolutionPhase();
        return;
    }

    const actor = livingPlayersInOrder[planning_player_index];
    current_planning_actor_key = actor.actor_key;
    active_actor_slot = actor.squad_slot;

    renderCurrentActorCommandPortrait();
    renderEquippedDeck();

    start_commands.style.display = "flex";
    move_commands.style.display = "none";
    card_commands.style.display = "none";

    console.log("Next planning actor:", actor.name, actor.actor_key);
}

function startBattleResolutionPhase(){
    battle_phase = "resolution";
    battle_state.current_turn_index = 0;

    start_commands.style.display = "none";
    move_commands.style.display = "none";
    card_commands.style.display = "none";

    console.log("=== BATTLE RESOLUTION START ===");
    resolveCurrentTurnActor();
}

function resolveCurrentTurnActor(){
    const actor = getCurrentResolutionActor();

    if(!actor){
        endBattleResolutionPhase();
        return;
    }

    if(!actor.alive){
        advanceResolutionTurn();
        return;
    }

    console.log(
        `Resolving actor: ${actor.name} [${actor.side}] speed=${actor.speed}`
    );

    if(actor.side === "enemy"){
        resolveEnemyTurn(actor);
        return;
    }

    if(actor.side === "player"){
        resolvePlayerTurn(actor);
        return;
    }

    advanceResolutionTurn();
}

function resolveEnemyTurn(actor){
    const targetPlayer = getBattlePlayerBySlot(0);
    const targetName = getAllyNameBySlot(0);

    let result = {
        defReducedBy: 0,
        heartsReducedBy: 0,
        brokeDefense: false
    };

    if(targetPlayer){
        const enemyAtk = Number(actor.stats?.atk || 0);
        result = applyAttackToTarget(targetPlayer, enemyAtk);

        if(result.brokeDefense){
            flashBreakVisual(targetPlayer);
        }else if(result.heartsReducedBy > 0){
            flashHeartLossVisual(targetPlayer, result.heartsReducedBy);
        }else if(result.defReducedBy > 0){
            flashDefenseLossVisual(targetPlayer, result.defReducedBy);
        }

        refreshBattleTargetPanelForActor(targetPlayer);
    }

    let logText = `${actor.name} attacks ${targetName}`;

    if(result.defReducedBy > 0){
        logText += ` (-${result.defReducedBy} DEF)`;
    }

    if(result.brokeDefense){
        logText += ` [DEF BROKEN]`;
    }

    if(result.heartsReducedBy > 0){
        logText += ` (-${result.heartsReducedBy} HEART)`;
    }

    pushBattleLog(logText);

    setTimeout(() => {
        advanceResolutionTurn();
    }, getEnemyActionDelay(result));
}

function getEnemyActionDelay(result){
    if(result?.heartsReducedBy > 0) return 700;
    if(result?.defReducedBy > 0) return 580;
    if(result?.brokeDefense) return 550;
    return 450;
}

function resolvePlayerTurn(actor){
    if(battle_resolution_wait){
        return;
    }
    const card = getQueuedCardForActor(actor.squad_slot);

    if(!card){
        console.log(`${actor.name} has no queued action.`);
        advanceResolutionTurn();
        return;
    }

    active_actor_slot = actor.squad_slot;
    renderCurrentActorCommandPortrait();
    renderEquippedDeck();

    console.log(`${actor.name} is ready to resolve ${card.name}`);

    battle_queue_window.style.display = "flex";
    renderBattleQueueWindowSlots();

    routeTargetingForCard(card);
}

function getDeckForActor(slot){
    const member = getSquadMemberBySlot(slot);
    if(!member) return [];

    if(!Array.isArray(member.equipped_deck)){
        member.equipped_deck = [];
    }

    return member.equipped_deck;
}

function renderEquippedDeck(){

    const deck = getDeckForActor(active_actor_slot);

    equipped_card_inventory.innerHTML = "";

    let visibleDeck = deck;

    if(active_card_filter !== "All"){
        visibleDeck = deck.filter(card => card.type === active_card_filter);
    }

    visibleDeck.forEach((card, index) => {

        const cardEl = document.createElement("div");
        cardEl.className = "card_item";
        cardEl.dataset.index = index;

        const alreadyQueued = action_queue.some(queuedCard =>
            queuedCard &&
            queuedCard.queue_key === card.queue_key
        );

        Object.assign(cardEl.style, {
            border: alreadyQueued ? "1px solid #666" : "1px solid grey",
            margin: "4px",
            padding: "6px",
            backgroundColor: alreadyQueued ? "#222" : "#111",
            color: alreadyQueued ? "#777" : "ghostwhite",
            cursor: alreadyQueued ? "not-allowed" : "pointer",
            opacity: alreadyQueued ? "0.6" : "1"
        });

        cardEl.textContent = `${card.name} | Cost: ${card.cost}`;

        cardEl.onmouseenter = () => {
            previewCard(card);
        };

        cardEl.onclick = () => {
            if(alreadyQueued) return;
            addCardToQueue(card);
        };

        equipped_card_inventory.appendChild(cardEl);
    });
    renderFilterButtonStates();
}

function previewCard(card){
    card_preview.innerHTML = "";

    const title = document.createElement("div");
    title.textContent = card.name;
    title.style.fontWeight = "bold";

    const type = document.createElement("div");
    type.textContent = `Type: ${card.type}`;

    const cost = document.createElement("div");
    cost.textContent = `Cost: ${card.cost}`;

    const atk = document.createElement("div");
    atk.textContent = `ATK: ${card.atk ?? 0}`;

    const desc = document.createElement("div");
    desc.textContent = card.desc;

    card_preview.appendChild(title);
    card_preview.appendChild(type);
    card_preview.appendChild(cost);
    card_preview.appendChild(atk);
    card_preview.appendChild(desc);
}

function addCardToQueue(card){
    const member = getSquadMemberBySlot(active_actor_slot);
    if(!member) return;

    const actorLimit = getQueueSlotLimitForMember(active_actor_slot);
    const actorQueuedCount = countQueuedActionsForActor(active_actor_slot);

    if(actorQueuedCount >= actorLimit){
        console.log(`Actor slot ${active_actor_slot} queue is full.`);
        return;
    }

    const alreadyQueued = action_queue.some(queuedAction =>
        queuedAction &&
        queuedAction.actor_slot === active_actor_slot &&
        queuedAction.queue_key === `${active_actor_slot}-${card.queue_key}`
    );

    if(alreadyQueued){
        console.log("That card is already queued for this actor.");
        return;
    }

    const openIndex = action_queue.findIndex(slot => slot === null);

    if(openIndex === -1){
        console.log("Shared queue full.");
        return;
    }
    action_queue[openIndex] = {
        ...card,
        actor_slot: member.slot,
        actor_user_id: member.user_id,
        actor_avatar_id: member.avatar_id,
        queue_key: `${member.slot}-${card.queue_key}`
    };
    renderQueue();
    renderEquippedDeck();
}

function compactQueue(){

    // Move cards down to fill empty spaces
    for(let i = 0; i < action_queue.length - 1; i++){

        if(action_queue[i] === null){

            for(let j = i + 1; j < action_queue.length; j++){

                if(action_queue[j] !== null){

                    action_queue[i] = action_queue[j];
                    action_queue[j] = null;

                    break;
                }
            }
        }
    }
}

function initializeQueueRemoval(){
    for(let i = 0; i < action_queue.length; i++){

        const slot = document.getElementById(`queue_slot_${i}`);
        if(!slot) continue;

slot.onclick = () => {
    const queuedCard = action_queue[i];
    if(!queuedCard) return;

    if(Number(queuedCard.actor_slot) !== Number(active_actor_slot)){
        console.log("You can only remove cards for the current actor.");
        return;
    }

    action_queue[i] = null;
    compactQueue();
    renderQueue();
    renderEquippedDeck();
};
    }
}

function renderQueue(){
    for(let i = 0; i < action_queue.length; i++){
        const slot = document.getElementById(`queue_slot_${i}`);
        if(!slot) continue;

        const card = action_queue[i];

        if(card){
            if(card.icon){
                slot.style.backgroundImage = `url(${card.icon})`;
            }else{
                slot.style.backgroundImage = "";
            }

            slot.style.backgroundSize = "cover";
            slot.style.backgroundRepeat = "no-repeat";
            slot.style.backgroundPosition = "center";
            slot.title = `${card.name} | Actor Slot ${card.actor_slot}`;
        }else{
            slot.style.backgroundImage = "";
            slot.title = "Empty";
        }
    }
}

function cycleActiveActor(){
    const occupiedSlots = Array.isArray(current_squad)
        ? current_squad
            .filter(member => member && member.user_id !== null && member.avatar_id !== null)
            .map(member => Number(member.slot))
            .sort((a, b) => a - b)
        : [];

    if(occupiedSlots.length === 0) return;

    const currentIndex = occupiedSlots.indexOf(Number(active_actor_slot));
    const nextIndex = currentIndex === -1 || currentIndex === occupiedSlots.length - 1
        ? 0
        : currentIndex + 1;

    active_actor_slot = occupiedSlots[nextIndex];
    renderEquippedDeck();
}

function initializeBattleContext(){
    if(!Array.isArray(current_squad) || !current_squad[0]) return;

    const leader = current_squad[0];

    window.current_user = Array.isArray(users)
        ? users.find(user => user.id === leader.user_id) || null
        : null;

    const avatarDef = Array.isArray(avatars)
        ? avatars.find(avatar => avatar.id === leader.avatar_id) || null
        : null;

    window.current_avatar = avatarDef;

    window.current_user_avatar_link = Array.isArray(users_avatars)
        ? users_avatars.find(link =>
            link.user_id === leader.user_id &&
            link.avatar_id === leader.avatar_id
        ) || null
        : null;

}

function getSquadMemberBySlot(slot){
    return Array.isArray(current_squad)
        ? current_squad.find(member => Number(member.slot) === Number(slot)) || null
        : null;
}

function getAvatarLinkForMember(member){
    if(!member || !Array.isArray(users_avatars)) return null;

    return users_avatars.find(link =>
        Number(link.user_id) === Number(member.user_id) &&
        Number(link.avatar_id) === Number(member.avatar_id)
    ) || null;
}

function getQueueSlotLimitForMember(slot){
    const member = getSquadMemberBySlot(slot);
    const avatarLink = getAvatarLinkForMember(member);
    return Number(avatarLink?.base_stats?.slots ?? 3);
}

function countQueuedActionsForActor(slot){
    return action_queue.filter(action =>
        action && Number(action.actor_slot) === Number(slot)
    ).length;
}

function buildSquadEquippedDecks(){
    if(!Array.isArray(current_squad)) return;

    current_squad.forEach(member => {
        const loadout = Array.isArray(squad_loadouts)
            ? squad_loadouts.find(loadout =>
                Number(loadout.user_id) === Number(member.user_id) &&
                Number(loadout.avatar_id) === Number(member.avatar_id)
            ) || null
            : null;

        if(!loadout){
            member.equipped_deck = [];
            return;
        }

        const builtDeck = [];

        const weaponsLoadout = Array.isArray(loadout.weapons) ? loadout.weapons : [];
        const itemsLoadout = Array.isArray(loadout.battle_items) ? loadout.battle_items : [];
        const manifestLoadout = Array.isArray(loadout.manifest) ? loadout.manifest : [];
        const skillsLoadout = Array.isArray(loadout.skills) ? loadout.skills : [];

        weaponsLoadout.forEach((ownedWeaponId) => {
            const ownedWeapon = findOwnedWeaponById(ownedWeaponId);
            const weaponDef = findWeaponDefByOwnedWeapon(ownedWeapon);
            if(!ownedWeapon || !weaponDef) return;

            builtDeck.push({
                id: ownedWeapon.id,
                owned_id: ownedWeapon.id,
                def_id: weaponDef.id,
                queue_key: `Weapon-${ownedWeapon.id}`,
                name: weaponDef.name,
                type: "Weapon",
                cost: weaponDef.cp_cost || 0,
                atk: weaponDef.effects?.atk ?? 0,
                desc: weaponDef.desc || "Weapon card.",
                icon: weaponDef.image ? `./images/${weaponDef.image}` : "",
                target_type: weaponDef.target_type || "enemy_single"
            });
        });

        itemsLoadout.forEach((ownedItemId) => {
            const ownedItem = findOwnedItemById(ownedItemId);
            const itemDef = findItemDefByOwnedItem(ownedItem);
            if(!ownedItem || !itemDef) return;

            builtDeck.push({
                id: ownedItem.id,
                owned_id: ownedItem.id,
                def_id: itemDef.id,
                queue_key: `Item-${ownedItem.id}`,
                name: itemDef.name,
                type: "Item",
                cost: itemDef.cp_cost || 0,
                atk: itemDef.effects?.atk ?? itemDef.atk ?? 0,
                desc: itemDef.desc || "Battle item.",
                icon: itemDef.image ? `./images/${itemDef.image}` : "",
                target_type: itemDef.target_type || "ally_single"
            });
        });

        manifestLoadout.forEach((ownedManifestId) => {
            const ownedManifest = findOwnedManifestById(ownedManifestId);
            const manifestDef = findManifestDefByOwnedManifest(ownedManifest);
            if(!ownedManifest || !manifestDef) return;

            builtDeck.push({
                id: ownedManifest.id,
                owned_id: ownedManifest.id,
                def_id: manifestDef.id,
                queue_key: `Manifest-${ownedManifest.id}`,
                name: manifestDef.name,
                type: "Manifest",
                cost: manifestDef.cp_cost || 0,
                atk: manifestDef.effects?.atk ?? 0,
                desc: manifestDef.desc || "Manifest card.",
                icon: manifestDef.image ? `./images/${manifestDef.image}` : "",
                target_type: manifestDef.target_type || "enemy_single"
            });
        });

        skillsLoadout.forEach((ownedSkillId) => {
            const ownedSkill = findOwnedSkillById(ownedSkillId);
            const skillDef = findSkillDefByOwnedSkill(ownedSkill);
            if(!ownedSkill || !skillDef) return;

            builtDeck.push({
                id: ownedSkill.id,
                owned_id: ownedSkill.id,
                def_id: skillDef.id,
                queue_key: `Skill-${ownedSkill.id}`,
                name: skillDef.name,
                type: "Skill",
                cost: skillDef.cp_cost || 0,
                atk: skillDef.effects?.atk ?? skillDef.atk ?? 0,
                desc: skillDef.desc || "Skill card.",
                icon: skillDef.image ? `./images/${skillDef.image}` : "",
                target_type: skillDef.target_type || "self"
            });
        });

        member.equipped_deck = builtDeck;
    });
}

function pushBattleLog(message){
    battle_log.push(message);

    // keep only the most recent 6 lines
    if(battle_log.length > 6){
        battle_log = battle_log.slice(-6);
    }

    if(battle_log_el){
        battle_log_el.innerHTML = battle_log
            .map(line => `<div>${line}</div>`)
            .join("");
    }

    console.log("[BATTLE LOG]", message);
}

function getEnemyNameByPosition(position){
    const testEncounter = loadBattleTestEncounter();
    if(!testEncounter || !testEncounter.encounter_data) return position || "Enemy";

    const encounter = testEncounter.encounter_data;
    const enemyId = encounter[position];

    if(enemyId === null || enemyId === undefined){
        return position || "Enemy";
    }

    const enemy = getEnemyById(enemyId);
    return enemy?.name || position || "Enemy";
}

function getAllyNameBySlot(slot){
    const member = getSquadMemberBySlot(slot);
    if(!member) return `Ally ${slot}`;

    const avatar = findAvatarById(member.avatar_id);
    return avatar?.name || `Ally ${slot}`;
}

function initializeBattleDeckSystem(){
    renderEquippedDeck();
    renderQueue();
    initializeQueueRemoval();
    initializeCommandMenus();
    initializeCardFilters();
    initializeBattleCameraControls();

    initializeBattleState();
    renderBattleOrder();
    console.log("Battle deck system ready.");
}

if(equipped_card_inventory && card_preview){
    equipped_card_inventory.onmouseleave = () => {
        card_preview.innerHTML = "Card Preview";
    };
}

function initializeCurrentUserBattle(){
    if(!Array.isArray(current_squad) || !current_squad[0]) return;

    const leader = current_squad[0];

    const userNameDisplay = document.getElementById("user_name_display");
    const userPortrait = document.getElementById("user_character_portrait");
    const userHearts = document.getElementById("user_hearts");

    const userRecord = Array.isArray(users)
        ? users.find(user => Number(user.id) === Number(leader.user_id))
        : null;

    const avatarRecord = Array.isArray(avatars)
        ? avatars.find(avatar => Number(avatar.id) === Number(leader.avatar_id))
        : null;

    const avatarLink = Array.isArray(users_avatars)
        ? users_avatars.find(link =>
            Number(link.user_id) === Number(leader.user_id) &&
            Number(link.avatar_id) === Number(leader.avatar_id)
        )
        : null;

    if(userNameDisplay){
        userNameDisplay.textContent = userRecord
            ? userRecord.username
            : `User ${leader.user_id ?? ""}`;
    }

    if(userPortrait){
        userPortrait.textContent = avatarRecord
            ? avatarRecord.name
            : "Portrait";
    }

    if(userHearts){
        userHearts.textContent = avatarLink?.base_stats
            ? `Hearts: ${avatarLink.base_stats.hearts}`
            : "Hearts: --";
    }
}

function loadBattleTestEncounter(){
    const saved = localStorage.getItem("battle_test_encounter");

    if(!saved){
        console.warn("No battle test encounter found.");
        return null;
    }

    try{
        return JSON.parse(saved);
    }catch(error){
        console.error("Failed to parse battle_test_encounter:", error);
        return null;
    }
}
function renderEncounterBoard(){
    const testEncounter = loadBattleTestEncounter();
    if(!testEncounter || !testEncounter.encounter_data) return;

    const encounter = testEncounter.encounter_data;

    const slotMap = [
        { enemyId: encounter.front_position, elId: "e_front_position" },
        { enemyId: encounter.mid_1, elId: "e_mid_1" },
        { enemyId: encounter.mid_2, elId: "e_mid_2" },
        { enemyId: encounter.back_1, elId: "e_back_1" },
        { enemyId: encounter.back_2, elId: "e_back_2" },
        { enemyId: encounter.back_3, elId: "e_back_3" }
    ];

    slotMap.forEach(({ enemyId, elId }) => {
        const el = document.getElementById(elId);
        if(!el) return;

        el.innerHTML = "";
        el.style.backgroundImage = "";
        el.style.backgroundSize = "contain";
        el.style.backgroundRepeat = "no-repeat";
        el.style.backgroundPosition = "center";

        const enemy = getEnemyById(enemyId);

        if(!enemy){
            el.title = "Empty";
            return;
        }

        el.style.backgroundImage = `url(./images/enemy_${enemyId}.png)`;
        el.title = enemy.name || `Enemy ${enemyId}`;

        el.style.backgroundImage = `url(./images/enemy_${enemyId}.png)`;
        el.title = enemy.name || `Enemy ${enemyId}`;
    });

    const levelNameEl = document.getElementById("level_test_level_name");
    if(levelNameEl){
        levelNameEl.textContent = `${testEncounter.level_name} - Encounter ${testEncounter.encounter_index + 1}`;
    }
}

function applyVisualTransform(el, config){
    if(!el || !config) return;

    el.style.position = "absolute";
    el.style.left = "0px";
    el.style.top = "0px";
    el.style.width = `${config.w}px`;
    el.style.height = `${config.h}px`;
    el.style.transform =
        `translateX(${config.x}px)
         translateY(${config.y}px)
         translateZ(${config.z}px)
         rotateX(${config.rx}deg)
         rotateY(${config.ry}deg)
         rotateZ(${config.rz}deg)
         scale(${config.scale})`;
    el.style.transformOrigin = "bottom center";
}

function applyAllBattleVisualTransforms(){
    Object.keys(battle_visual_positions).forEach(visualId => {
        const el = document.getElementById(visualId);
        if(!el) return;

        applyVisualTransform(el, battle_visual_positions[visualId]);
    });
}

function initializeHandlerSliderRanges(){
    if(element_x){
        element_x.min = -400;
        element_x.max = 800;
        element_x.step = 1;
    }

    if(element_y){
        element_y.min = -400;
        element_y.max = 1000;
        element_y.step = 1;
    }

    if(element_z){
        element_z.min = -400;
        element_z.max = 1000;
        element_z.step = 1;
    }

    if(element_rx){
        element_rx.min = -180;
        element_rx.max = 180;
        element_rx.step = 1;
    }

    if(element_ry){
        element_ry.min = -180;
        element_ry.max = 180;
        element_ry.step = 1;
    }

    if(element_rz){
        element_rz.min = -180;
        element_rz.max = 180;
        element_rz.step = 1;
    }

    if(element_scale){
        element_scale.min = 0.1;
        element_scale.max = 4;
        element_scale.step = 0.01;
    }
}

function loadActiveVisualIntoHandler(){
    if(!active_visual_id || !battle_visual_positions[active_visual_id]) return;

    const config = battle_visual_positions[active_visual_id];

    if(element_name) element_name.textContent = active_visual_id;

    if(element_x) element_x.value = config.x;
    if(element_y) element_y.value = config.y;
    if(element_z) element_z.value = config.z;
    if(element_rx) element_rx.value = config.rx;
    if(element_ry) element_ry.value = config.ry;
    if(element_rz) element_rz.value = config.rz;
    if(element_scale) element_scale.value = config.scale;
}

function selectBattleVisual(visualId){
    if(!battle_visual_positions[visualId]) return;

    active_visual_id = visualId;

    if(element_handler){
        element_handler.style.display = "flex";
    }

    loadActiveVisualIntoHandler();
    highlightActiveBattleVisual();
    highlightHandlerSelectorButtons();
}

function highlightActiveBattleVisual(){
    Object.keys(battle_visual_positions).forEach(visualId => {
        const el = document.getElementById(visualId);
        if(!el) return;

        if(visualId === active_visual_id){
            el.style.outline = "2px solid yellow";
        }else{
            el.style.outline = "";
        }
    });
}

function updateActiveBattleVisualFromHandler(){
    if(!active_visual_id) return;

    const config = battle_visual_positions[active_visual_id];
    if(!config) return;

    config.x = Number(element_x?.value ?? config.x);
    config.y = Number(element_y?.value ?? config.y);
    config.z = Number(element_z?.value ?? config.z);
    config.rx = Number(element_rx?.value ?? config.rx);
    config.ry = Number(element_ry?.value ?? config.ry);
    config.rz = Number(element_rz?.value ?? config.rz);
    config.scale = Number(element_scale?.value ?? config.scale);

    const el = document.getElementById(active_visual_id);
    applyVisualTransform(el, config);
    saveBattleVisualPositions();
}

function initializeBattleVisualHandler(){
    initializeHandlerSliderRanges();

    if(battle_visual_layer){
        battle_visual_layer.style.pointerEvents = "auto";
    }

    if(handler_menu){
        handler_menu.onclick = function(){
            if(!element_handler) return;

            element_handler.style.display =
                element_handler.style.display === "flex" ? "none" : "flex";
        };
    }

    if(handler_closer){
        handler_closer.onclick = function(){
            if(element_handler){
                element_handler.style.display = "none";
            }
        };
    }

    const sliderInputs = [
        element_x,
        element_y,
        element_z,
        element_rx,
        element_ry,
        element_rz,
        element_scale
    ];

    sliderInputs.forEach(input => {
        if(!input) return;
        input.addEventListener("input", updateActiveBattleVisualFromHandler);
    });

    Object.keys(battle_visual_positions).forEach(visualId => {
        const el = document.getElementById(visualId);
        if(!el) return;

        el.style.pointerEvents = "auto";
        el.style.cursor = "pointer";

        el.onclick = function(event){
            event.stopPropagation();
            selectBattleVisual(visualId);
        };
    });
    initializeHandlerAssetSelector();
}

function highlightHandlerSelectorButtons(){
    Object.keys(handler_selector_map).forEach(buttonId => {
        const btn = document.getElementById(buttonId);
        if(!btn) return;

        const visualId = handler_selector_map[buttonId];
        const isActive = visualId === active_visual_id;

        btn.style.outline = isActive ? "2px solid yellow" : "";
        btn.style.backgroundColor = isActive ? "gold" : "black";
    });
}

function initializeHandlerAssetSelector(){
    Object.keys(handler_selector_map).forEach(buttonId => {
        const btn = document.getElementById(buttonId);
        if(!btn) return;

        const visualId = handler_selector_map[buttonId];

        btn.onclick = function(){
            selectBattleVisual(visualId);
        };
    });

    highlightHandlerSelectorButtons();
}

function renderBattleQueueWindowSlots(){

    const slots = [
        battle_queue_0,
        battle_queue_1,
        battle_queue_2,
        battle_queue_3,
        battle_queue_4,
        battle_queue_5,
        battle_queue_6
    ];

    for(let i = 0; i < action_queue.length; i++){

        const slot = slots[i];
        if(!slot) continue;

        const card = action_queue[i];

        if(card){

            if(card.icon){
                slot.style.backgroundImage = `url(${card.icon})`;
            }else{
                slot.style.backgroundImage = "";
            }

            slot.style.backgroundSize = "cover";
            slot.style.backgroundRepeat = "no-repeat";
            slot.style.backgroundPosition = "center";
            slot.title = card.name;

        }else{

            slot.style.backgroundImage = "";
            slot.title = "Empty";

        }
    }
}

function getFirstQueuedCard(){

    for(let i = 0; i < action_queue.length; i++){

        if(action_queue[i]){
            return action_queue[i];
        }

    }

    return null;
}

function showEnemySide(){

    enemy_side_battle.style.display = "flex";
    battle_player_side.style.display = "none";

}

function showPlayerSide(){

    battle_player_side.style.display = "flex";
    enemy_side_battle.style.display = "none";

}

function initializeBattleTargeting(){
    if(!to_battle) return;

    to_battle.onclick = function(){
        const actor = getCurrentResolutionActor();

        if(!actor || actor.side !== "player"){
            console.log("No active player actor for targeting.");
            return;
        }

        const card = getQueuedCardForActor(actor.squad_slot);

        if(!card){
            console.log("This actor has no queued card.");
            return;
        }

        card_commands.style.display = "none";
        battle_queue_window.style.display = "flex";

        renderBattleQueueWindowSlots();
        routeTargetingForCard(card);
    };
}

function renderEnemyTargetChoices(){

    const testEncounter = loadBattleTestEncounter();
    if(!testEncounter) return;

    const encounter = testEncounter.encounter_data;

    const map = [
        { key: "back_1", el: battle_choice_back_1 },
        { key: "back_2", el: battle_choice_back_2 },
        { key: "back_3", el: battle_choice_back_3 },
        { key: "mid_1", el: battle_choice_mid_1 },
        { key: "mid_2", el: battle_choice_mid_2 },
        { key: "front_position", el: battle_choice_front_position }
    ];

    map.forEach(slot => {

        const enemyId = encounter[slot.key];

        slot.el.onclick = null;
        slot.el.onmouseenter = null;
        slot.el.onmouseleave = null;

        const enemyLookup = getEnemyById(enemyId);

        if(!enemyLookup){
            slot.el.style.backgroundImage = "";
            slot.el.style.opacity = "0.35";
            slot.el.style.cursor = "not-allowed";
            slot.el.title = "Empty";
            return;
        }

        const battleEnemy = getBattleEnemyByPosition(slot.key);
        const enemyBundle = getEnemyStatBlock(enemyId);
        if(!enemyBundle){
            slot.el.style.backgroundImage = "";
            slot.el.style.opacity = "0.35";
            slot.el.style.cursor = "not-allowed";
            slot.el.title = "Missing Enemy Data";
            return;
        }

        const enemy = enemyBundle.enemy;
        const stats = battleEnemy?.stats || enemyBundle.stats;

        slot.el.style.backgroundImage = `url(./images/enemy_${enemyId}.png)`;
        slot.el.style.backgroundSize = "contain";
        slot.el.style.backgroundRepeat = "no-repeat";
        slot.el.style.backgroundPosition = "center";
        slot.el.style.opacity = "1";
        slot.el.style.cursor = "pointer";
        slot.el.title = enemy.name || `Enemy ${enemyId}`;

        slot.el.onmouseenter = function(){
            const hearts = battleEnemy?.hearts ?? enemyBundle.stats?.hearts ?? 0;

            showTargetStatsFromStats(
                stats,
                hearts
            );
        };

        // slot.el.onmouseleave = function(){
        //     hideTargetStats();
        // };

        slot.el.onclick = function(){
            useQueuedCardOnTarget({
                type: "enemy",
                id: enemyId,
                position: slot.key
            });
        };
    });
}

function getEnemyById(enemyId){
    if(enemyId === null || enemyId === undefined) return null;

    return enemies.find(
        e => Number(e.id) === Number(enemyId)
    ) || null;
}

function renderSquadTargetChoices(){

    const map = [
        { el: battle_squad_front_position, slot: 0 },
        { el: battle_squad_mid_1, slot: 1 },
        { el: battle_squad_mid_2, slot: 2 },
        { el: battle_squad_back_1, slot: 3 },
        { el: battle_squad_back_2, slot: 4 },
        { el: battle_squad_back_3, slot: 5 }
    ];

    map.forEach(entry => {

        const member = current_squad.find(m => m.slot === entry.slot);

        entry.el.onclick = null;
        entry.el.onmouseenter = null;
        entry.el.onmouseleave = null;

        if(!member){
            entry.el.style.backgroundImage = "";
            entry.el.style.opacity = "0.35";
            entry.el.style.cursor = "not-allowed";
            entry.el.title = "Empty";
            return;
        }

        const avatar = avatars.find(a => a.id === member.avatar_id);
        const avatarLink = users_avatars.find(link =>
            Number(link.user_id) === Number(member.user_id) &&
            Number(link.avatar_id) === Number(member.avatar_id)
        );

        entry.el.style.backgroundImage =
            avatar?.image_battle_idle ? `url(./images/${avatar.image_battle_idle})` : "";
        entry.el.style.backgroundSize = "contain";
        entry.el.style.backgroundRepeat = "no-repeat";
        entry.el.style.backgroundPosition = "center";
        entry.el.style.opacity = "1";
        entry.el.style.cursor = "pointer";
        entry.el.title = avatar?.name || `Squad Slot ${entry.slot}`;

        entry.el.onmouseenter = function(){
            const battlePlayer = getBattlePlayerBySlot(entry.slot);
            const stats = battlePlayer?.stats || avatarLink?.base_stats || null;
            const hearts = battlePlayer?.hearts ?? stats?.hearts ?? 0;

            showTargetStatsFromStats(stats, hearts);
        };

        entry.el.onmouseleave = function(){
            
            hideTargetStats();
        };

        entry.el.onclick = function(){
            useQueuedCardOnTarget({
                type: "ally",
                id: member.user_id,
                position: entry.slot
            });
        };
    });
}

function useQueuedCardOnTarget(target){
    if(battle_resolution_wait){
        return;
    }
    const actor = getCurrentResolutionActor();
    if(!actor || actor.side !== "player") return;

    const card = getQueuedCardForActor(actor.squad_slot);
    if(!card) return;

    let targetName = "Target";
    let result = {
        defReducedBy: 0,
        heartsReducedBy: 0,
        brokeDefense: false
    };

    if(target.type === "enemy"){
        const targetEnemy = getBattleEnemyByPosition(target.position);
        targetName = getEnemyNameByPosition(target.position);
        if(targetEnemy){
            result = applyAttackToTarget(targetEnemy, card.atk);

            if(result.brokeDefense){
                flashBreakVisual(targetEnemy);
            }else if(result.heartsReducedBy > 0){
                flashHeartLossVisual(targetEnemy, result.heartsReducedBy);
            }else if(result.defReducedBy > 0){
                flashDefenseLossVisual(targetEnemy, result.defReducedBy);
            }

            refreshBattleTargetPanelForActor(targetEnemy);
        }
    }
    else if(target.type === "ally"){
        const targetAlly = getBattlePlayerBySlot(target.position);
        targetName = getAllyNameBySlot(target.position);
        if(targetAlly){
            result = applyAttackToTarget(targetAlly, card.atk);

            if(result.brokeDefense){
                flashBreakVisual(targetAlly);
            }else if(result.heartsReducedBy > 0){
                flashHeartLossVisual(targetAlly, result.heartsReducedBy);
            }else if(result.defReducedBy > 0){
                flashDefenseLossVisual(targetAlly, result.defReducedBy);
            }

            refreshBattleTargetPanelForActor(targetAlly);
        }
    }

    console.log("Card Used:", card.name, "Target:", target);

    let logText = `${actor.name} uses ${card.name} on ${targetName}`;

    if(result.defReducedBy > 0){
        logText += ` (-${result.defReducedBy} DEF)`;
    }

    if(result.brokeDefense){
        logText += ` [DEF BROKEN]`;
    }

    if(result.heartsReducedBy > 0){
        logText += ` (-${result.heartsReducedBy} HEART)`;
    }

    pushBattleLog(logText);

    const index = action_queue.findIndex(c =>
        c && Number(c.actor_slot) === Number(actor.squad_slot)
    );

    if(index !== -1){
        action_queue[index] = null;
    }

    compactQueue();

    renderQueue();
    renderEquippedDeck();
    renderBattleQueueWindowSlots();

    battle_queue_window.style.display = "none";
    enemy_side_battle.style.display = "none";
    battle_player_side.style.display = "none";

    resolveNextCardForCurrentActorOrAdvance();
}

function getPopUpStartPosition(actor){
    const positionDefaults = {
        player: {
            front_position: { top: "60px", left: "-10px" },
            mid_1:          { top: "60px", left: "-10px" },
            mid_2:          { top: "60px", left: "-10px" },
            back_1:         { top: "60px", left: "-10px" },
            back_2:         { top: "60px", left: "-10px" },
            back_3:         { top: "60px", left: "-10px" }
        },
        enemy: {
            front_position: { top: "120px", left: "32px" },
            mid_1:          { top: "60px", left: "-10px" },
            mid_2:          { top: "60px", left: "-10px" },
            back_1:         { top: "60px", left: "-10px" },
            back_2:         { top: "60px", left: "30px" },
            back_3:         { top: "60px", left: "-10px" }
        }
    };

    const side = actor.side === "enemy" ? "enemy" : "player";
    const pos = actor.battle_position || "front_position";

    return positionDefaults[side]?.[pos] || { top: "60px", left: "-10px" };
}

const battleCameraPositions = {
    "-60": { x: 395, y: 140 },
    "-30": { x: 340, y: -56 },
    "0":   { x: 240, y: 56 },
    "30":  { x: 60,  y: 105 },
    "60":  { x: -27, y: 360 }
};

const BATTLE_CAMERA_MIN = -60;
const BATTLE_CAMERA_MAX = 60;
const BATTLE_CAMERA_STEP = 30;

function lerp(start, end, t){
    return start + (end - start) * t;
}

function getBattleCameraPosition(angle){

    const points = [-60, -30, 0, 30, 60];

    if(angle <= -60) return battleCameraPositions[-60];
    if(angle >= 60) return battleCameraPositions[60];

    for(let i = 0; i < points.length - 1; i++){
        const a = points[i];
        const b = points[i + 1];

        if(angle >= a && angle <= b){
            const startPos = battleCameraPositions[a];
            const endPos = battleCameraPositions[b];

            const t = (angle - a) / (b - a);

            return {
                x: lerp(startPos.x, endPos.x, t),
                y: lerp(startPos.y, endPos.y, t)
            };
        }
    }

    return battleCameraPositions[0];
}

function clampBattleCameraY(value){
    return Math.max(BATTLE_CAMERA_MIN, Math.min(BATTLE_CAMERA_MAX, value));
}
function renderBattleCamera(){
    if(!battle_rig) return;

    const pos = getBattleCameraPosition(battle_camera_y);

    battle_rig.style.transform =
        `rotateY(${battle_camera_y}deg)
         rotateX(80deg)
         translateZ(120px)
         rotateZ(0deg)
         translateX(${pos.x}px)
         translateY(${pos.y}px)`;

    updateBattleCameraButtons();
}

function setBattleVisual(elId, imagePath){
    const el = document.getElementById(elId);
    if(!el) return;

    if(!imagePath){
        el.style.display = "none";
        el.style.backgroundImage = "";
        el.title = "";
        return;
    }

    el.style.display = "block";
    el.style.backgroundImage = `url(${imagePath})`;
    el.style.backgroundSize = "contain";
    el.style.backgroundRepeat = "no-repeat";
    el.style.backgroundPosition = "center bottom";
    el.title = elId;

    if(battle_visual_positions[elId]){
        applyVisualTransform(el, battle_visual_positions[elId]);
    }
}

function renderEncounterVisuals(){
    const testEncounter = loadBattleTestEncounter();
    if(!testEncounter || !testEncounter.encounter_data) return;

    const encounter = testEncounter.encounter_data;

    const visualMap = [
        { enemyId: encounter.front_position, elId: "visual_e_front_position" },
        { enemyId: encounter.mid_1, elId: "visual_e_mid_1" },
        { enemyId: encounter.mid_2, elId: "visual_e_mid_2" },
        { enemyId: encounter.back_1, elId: "visual_e_back_1" },
        { enemyId: encounter.back_2, elId: "visual_e_back_2" },
        { enemyId: encounter.back_3, elId: "visual_e_back_3" }
    ];

    visualMap.forEach(({ enemyId, elId }) => {
    const enemy = getEnemyById(enemyId);

    if(!enemy){
        setBattleVisual(elId, "");
        return;
    }   

            setBattleVisual(elId, `./images/enemy_${enemyId}.png`);
        });
}

function getVisualIdForActor(actor){
    if(!actor) return null;

    if(actor.side === "player"){
        const playerVisualMap = {
            front_position: "visual_p_front_position",
            mid_1: "visual_p_mid_1",
            mid_2: "visual_p_mid_2",
            back_1: "visual_p_back_1",
            back_2: "visual_p_back_2",
            back_3: "visual_p_back_3"
        };

        return playerVisualMap[actor.battle_position] || null;
    }

    if(actor.side === "enemy"){
        const enemyVisualMap = {
            front_position: "visual_e_front_position",
            mid_1: "visual_e_mid_1",
            mid_2: "visual_e_mid_2",
            back_1: "visual_e_back_1",
            back_2: "visual_e_back_2",
            back_3: "visual_e_back_3"
        };

        return enemyVisualMap[actor.battle_position] || null;
    }

    return null;
}

function getPopUpElementForActor(actor){
    const visualId = getVisualIdForActor(actor);
    if(!visualId) return null;

    const visualEl = document.getElementById(visualId);
    if(!visualEl) return null;

    return visualEl.querySelector(".pop_up");
}

function flashBreakVisual(actor){
    const popUpEl = preparePopUp(actor, "BREAK", {
        color: "white",
        fontSize: "24px"
    });
    if(!popUpEl) return;

    popUpEl.getAnimations().forEach(anim => anim.cancel());

    const positionDefaults = {
        player: {
            front_position: { top: "60px", left: "-10px" },
            mid_1:          { top: "60px", left: "-10px" },
            mid_2:          { top: "60px", left: "-10px" },
            back_1:         { top: "60px", left: "-10px" },
            back_2:         { top: "60px", left: "-10px" },
            back_3:         { top: "60px", left: "-10px" }
        },
        enemy: {
            front_position: { top: "120px", left: "32px" },
            mid_1:          { top: "60px", left: "-10px" },
            mid_2:          { top: "60px", left: "-10px" },
            back_1:         { top: "60px", left: "-10px" },
            back_2:         { top: "60px", left: "30px" },
            back_3:         { top: "60px", left: "-10px" }
        }
    };

    const side = actor.side === "enemy" ? "enemy" : "player";
    const pos = actor.battle_position || "front_position";
    const defaults =
        positionDefaults[side]?.[pos] ||
        { top: "60px", left: "-10px" };

    const startTop = defaults.top;
    const startLeft = defaults.left;

    const topNum = parseInt(startTop, 10) || 60;
    const leftNum = parseInt(startLeft, 10) || 0;

    popUpEl.innerHTML = "BREAK";
    popUpEl.style.display = "flex";
    popUpEl.style.opacity = "1";
    popUpEl.style.top = startTop;
    popUpEl.style.left = startLeft;
    popUpEl.style.color = "white";
    popUpEl.style.fontSize = "24px";
    popUpEl.style.fontWeight = "bolder";

    const riseAnim = popUpEl.animate(
        [
            { top: `${topNum}px`, opacity: 1 },
            { top: `${topNum - 56}px`, opacity: 1 }
        ],
        {
            duration: 550,
            iterations: 1,
            easing: "linear",
            fill: "forwards"
        }
    );

    const shakeAnim = popUpEl.animate(
        [
            { left: `${leftNum - 16}px` },
            { left: `${leftNum + 16}px` },
            { left: `${leftNum}px` },
            { left: `${leftNum + 20}px` },
            { left: `${leftNum - 6}px` }
        ],
        {
            duration: 190,
            iterations: Infinity,
            easing: "linear"
        }
    );

    riseAnim.onfinish = () => {
        shakeAnim.cancel();
        popUpEl.style.display = "none";
        popUpEl.style.opacity = "1";
        popUpEl.style.top = startTop;
        popUpEl.style.left = startLeft;
        popUpEl.innerHTML = "";
    };
}

function preparePopUp(actor, text, options = {}){
    const popUpEl = getPopUpElementForActor(actor);
    if(!popUpEl) return null;

    popUpEl.getAnimations().forEach(anim => anim.cancel());

    popUpEl.innerHTML = text;
    popUpEl.style.display = "flex";
    popUpEl.style.opacity = "1";
    popUpEl.style.color = options.color || "white";
    popUpEl.style.fontSize = options.fontSize || "24px";
    popUpEl.style.fontWeight = options.fontWeight || "bolder";

    return popUpEl;
}

function flashHeartLossVisual(actor, amount = 1){
    const popUpEl = preparePopUp(actor, amount > 1 ? `&#128148; -${amount}` : "&#128148;", {
        color: "white",
        fontSize: "26px"
    });
    if(!popUpEl) return;

    popUpEl.style.top = "60px";
    popUpEl.style.left = "-10px";

    const riseAnim = popUpEl.animate(
        [
            { top: "60px", opacity: 1, transform: "scale(1)" },
            { top: "18px", opacity: 1, transform: "scale(1.15)" },
            { top: "-8px", opacity: 0, transform: "scale(0.95)" }
        ],
        {
            duration: 700,
            iterations: 1,
            easing: "ease-out",
            fill: "forwards"
        }
    );

    riseAnim.onfinish = () => {
        popUpEl.style.display = "none";
        popUpEl.innerHTML = "";
        popUpEl.style.opacity = "1";
        popUpEl.style.transform = "scale(1)";
        popUpEl.style.top = "60px";
        popUpEl.style.left = "-10px";
    };
}

function flashDefenseLossVisual(actor, amount){
    const popUpEl = preparePopUp(actor, `-${amount} DEF`, {
        color: "red",
        fontSize: "20px"
    });
    if(!popUpEl) return;

    popUpEl.style.top = "60px";
    popUpEl.style.left = "-10px";

    const anim = popUpEl.animate(
        [
            { top: "60px", opacity: 1 },
            { top: "28px", opacity: 1 },
            { top: "8px", opacity: 0 }
        ],
        {
            duration: 580,
            iterations: 1,
            easing: "ease-out",
            fill: "forwards"
        }
    );

    anim.onfinish = () => {
        popUpEl.style.display = "none";
        popUpEl.innerHTML = "";
        popUpEl.style.opacity = "1";
        popUpEl.style.top = "60px";
        popUpEl.style.left = "-10px";
    };
}

function updateBattleCameraButtons(){
    if(battle_camera_left){
        battle_camera_left.style.pointerEvents =
            (is_battle_camera_turning || battle_camera_y <= BATTLE_CAMERA_MIN)
                ? "none"
                : "auto";

        battle_camera_left.style.opacity =
            (battle_camera_y <= BATTLE_CAMERA_MIN) ? "0.45" : "1";
    }

    if(battle_camera_right){
        battle_camera_right.style.pointerEvents =
            (is_battle_camera_turning || battle_camera_y >= BATTLE_CAMERA_MAX)
                ? "none"
                : "auto";

        battle_camera_right.style.opacity =
            (battle_camera_y >= BATTLE_CAMERA_MAX) ? "0.45" : "1";
    }
}

function animateBattleCameraTo(targetY){
    if(!battle_board || is_battle_camera_turning) return;

    const clampedTarget = clampBattleCameraY(targetY);

    if(clampedTarget === battle_camera_y){
        updateBattleCameraButtons();
        return;
    }

    is_battle_camera_turning = true;
    updateBattleCameraButtons();

    const startY = battle_camera_y;
    const endY = clampedTarget;
    const duration = 300;
    const startTime = performance.now();

    function step(now){
        const elapsed = now - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);

        battle_camera_y = startY + (endY - startY) * eased;
        renderBattleCamera();

        if(progress < 1){
            requestAnimationFrame(step);
        }else{
            battle_camera_y = endY;
            is_battle_camera_turning = false;
            renderBattleCamera();
        }
    }

    requestAnimationFrame(step);
}

function initializeBattleCameraControls(){
    if(battle_camera_left){
        battle_camera_left.onclick = function(){
            animateBattleCameraTo(battle_camera_y - BATTLE_CAMERA_STEP);
        };
    }

    if(battle_camera_right){
        battle_camera_right.onclick = function(){
            animateBattleCameraTo(battle_camera_y + BATTLE_CAMERA_STEP);
        };
    }

    renderBattleCamera();
}

function renderPlayerBattleVisuals(){
    if(!Array.isArray(current_squad)) return;

    const squadVisualMap = [
        { slot: 0, elId: "visual_p_front_position" },
        { slot: 1, elId: "visual_p_mid_1" },
        { slot: 2, elId: "visual_p_mid_2" },
        { slot: 3, elId: "visual_p_back_1" },
        { slot: 4, elId: "visual_p_back_2" },
        { slot: 5, elId: "visual_p_back_3" }
    ];

    squadVisualMap.forEach(({ slot, elId }) => {
        const member = current_squad.find(m => Number(m.slot) === Number(slot));

        if(!member || member.user_id === null || member.avatar_id === null){
            setBattleVisual(elId, "");
            return;
        }

        const avatarRecord = Array.isArray(avatars)
            ? avatars.find(avatar => Number(avatar.id) === Number(member.avatar_id))
            : null;

        if(!avatarRecord){
            setBattleVisual(elId, "");
            return;
        }

        setBattleVisual(elId, `./images/${avatarRecord.image_battle_idle}`);
    });
}

function saveBattleVisualPositions(){
    localStorage.setItem(
        "battle_visual_positions",
        JSON.stringify(battle_visual_positions)
    );
}

function loadBattleVisualPositions(){
    const saved = localStorage.getItem("battle_visual_positions");
    if(!saved) return;

    try{
        const parsed = JSON.parse(saved);

        Object.keys(parsed).forEach(key => {
            if(!battle_visual_positions[key]) return;

            battle_visual_positions[key] = {
                ...battle_visual_positions[key],
                ...parsed[key]
            };
        });
    }catch(error){
        console.error("Failed to load battle visual positions:", error);
    }
}

function renderCurrentActorCommandPortrait(){
    const portraitTab = document.getElementById("squad_portrait_command_tab");
    const actorNameEl = document.getElementById("current_actor_name");
    if(!portraitTab) return;

    const actor = getCurrentPlanningActor();

    portraitTab.style.backgroundImage = "";
    portraitTab.style.backgroundColor = "#222";
    portraitTab.style.backgroundSize = "cover";
    portraitTab.style.backgroundRepeat = "no-repeat";
    portraitTab.style.backgroundPosition = "center";
    portraitTab.title = "";

    if(actorNameEl){
        actorNameEl.textContent = actor ? actor.name : "";
    }

    if(!actor) return;

    if(actor.side !== "player"){
        portraitTab.title = actor.name || "Enemy Turn";
        return;
    }

    const avatar = findAvatarById(actor.avatar_id);
    if(!avatar) return;

    portraitTab.style.backgroundImage = `url(./images/${avatar.image_portrait})`;
    portraitTab.title = actor.name || avatar.name || "Player Turn";
}

function initializeBattleExit(){
    if(!exit_test_battle) return;

    exit_test_battle.onclick = function(){
        // keep the current test level id so editor knows what to reopen
        const battleTestEncounter = loadBattleTestEncounter();

        if(battleTestEncounter && battleTestEncounter.level_id !== undefined){
            localStorage.setItem("test_level_id", String(battleTestEncounter.level_id));
        }

        localStorage.setItem("activeScreen", "level_create_screen");
        window.location.href = "./admin_level_create.html";
    };
}

function getEnemyStatBlock(enemyId){
    if(enemyId === null || enemyId === undefined) return null;

    const enemy = enemies.find(e => Number(e.id) === Number(enemyId));
    if(!enemy) return null;

    const stats = enemy_stats.find(s => Number(s.stat_id) === Number(enemy.stat_id));
    if(!stats) return null;

    return {
        enemy,
        stats
    };
}

function routeTargetingForCard(card){
    if(!card) return;

    const target = card.target_type;

    enemy_side_battle.style.display = "none";
    battle_player_side.style.display = "none";
    // target_battle_stats.style.display = "none";

    if(target === "enemy_single"){
        showEnemySide();
        renderEnemyTargetChoices();
    }
    else if(target === "ally_single"){
        showPlayerSide();
        renderSquadTargetChoices();
    }
    else if(target === "enemy_all"){
        showEnemySide();
        renderEnemyTargetChoices();
    }
    else if(target === "ally_all"){
        console.log("Auto target: all allies", card.name);
        useQueuedCardOnAutoTarget({
            type: "ally_all"
        });
    }
    else if(target === "self"){
        console.log("Auto target: self", card.name);
        useQueuedCardOnAutoTarget({
            type: "self"
        });
    }
}

function useQueuedCardOnAutoTarget(target){
    if(battle_resolution_wait){
        return;
    }
    const actor = getCurrentResolutionActor();
    if(!actor || actor.side !== "player") return;

    const card = getQueuedCardForActor(actor.squad_slot);
    if(!card) return;

    let targetText = "target";

    if(target.type === "self"){
        targetText = actor.name;
    }
    else if(target.type === "ally_all"){
        targetText = "all allies";
    }
    else if(target.type === "enemy_all"){
        targetText = "all enemies";
    }

    console.log("Card Used:", card.name, "Target:", target);
    pushBattleLog(`${actor.name} uses ${card.name} on ${targetText}`);

    const index = action_queue.findIndex(c =>
        c && Number(c.actor_slot) === Number(actor.squad_slot)
    );

    if(index !== -1){
        action_queue[index] = null;
    }

    compactQueue();

    renderQueue();
    renderEquippedDeck();
    renderBattleQueueWindowSlots();

    battle_queue_window.style.display = "none";
    enemy_side_battle.style.display = "none";
    battle_player_side.style.display = "none";

    resolveNextCardForCurrentActorOrAdvance();

}

function advanceResolutionTurn(){
    battle_state.current_turn_index++;

    renderBattleOrder();

    if(battle_state.current_turn_index >= battle_state.turn_order.length){
        endBattleResolutionPhase();
        return;
    }

    resolveCurrentTurnActor();
}

function endBattleResolutionPhase(){
    console.log(`=== ROUND ${battle_state.round_number} COMPLETE ===`);

    battle_state.round_number++;
    battle_state.current_turn_index = 0;
    battle_phase = "planning";

    current_planning_actor_key = null;
    planning_player_index = 0;

    startPlayerPlanningPhase();
}

function getBattleEnemyByPosition(position){
    if(!battle_state || !Array.isArray(battle_state.enemies)) return null;

    return battle_state.enemies.find(enemy =>
        enemy && enemy.battle_position === position
    ) || null;
}

function getBattlePlayerBySlot(slot){
    if(!battle_state || !Array.isArray(battle_state.players)) return null;

    return battle_state.players.find(player =>
        player && Number(player.squad_slot) === Number(slot)
    ) || null;
}

function applyAttackToTarget(targetActor, attackPower){
    if(!targetActor || !targetActor.stats){
        return {
            defReducedBy: 0,
            heartsReducedBy: 0,
            brokeDefense: false
        };
    }

    const power = Math.max(0, Number(attackPower || 0));
    const currentDef = Math.max(0, Number(targetActor.stats.def || 0));
    const currentHearts = Math.max(0, Number(targetActor.hearts || 0));

    let defReducedBy = 0;
    let heartsReducedBy = 0;
    let brokeDefense = false;

    if(currentDef === 0){
        heartsReducedBy = currentHearts > 0 && power > 0 ? 1 : 0;
        targetActor.hearts = Math.max(0, currentHearts - heartsReducedBy);
        targetActor.alive = targetActor.hearts > 0;

        if(!targetActor.alive && targetActor.side === "player"){
            clearQueuedCardsForActor(targetActor.squad_slot);
            pushBattleLog(`${targetActor.name} is down! Queued cards cleared.`);
        }

        return {
            defReducedBy,
            heartsReducedBy,
            brokeDefense
        };
    }

    // Otherwise this hit only damages defense
    defReducedBy = Math.min(currentDef, power);
    targetActor.stats.def = Math.max(0, currentDef - power);

    if(currentDef > 0 && targetActor.stats.def === 0){
        brokeDefense = true;
    }

    targetActor.alive = targetActor.hearts > 0;

    return {
        defReducedBy,
        heartsReducedBy,
        brokeDefense
    };
}

function refreshBattleTargetPanelForActor(actor){
    if(!actor || !actor.stats) return;

    showTargetStatsFromStats(actor.stats, actor.hearts);
}

function showTargetStatsFromStats(stats, hearts){
    if(!stats) return;

    target_battle_stats.style.display = "flex";

    battle_target_def.textContent = stats.def ?? "--";
    battle_target_res.textContent = stats.res ?? "--";
    battle_target_atk.textContent = stats.atk ?? "--";
    battle_target_eva.textContent = stats.eva ?? "--";
    battle_target_spATK.textContent = stats.spATK ?? "--";
    battle_target_dex.textContent = stats.dex ?? "--";
    battle_target_spDEF.textContent = stats.spDEF ?? "--";

    const heartCount = Math.max(0, Number(hearts ?? stats.hearts) || 0);
    battle_target_hearts.innerHTML = "&#10084;".repeat(heartCount);
}

function clearQueuedCardsForActor(slot){
    let clearedCount = 0;

    for(let i = 0; i < action_queue.length; i++){
        const queuedCard = action_queue[i];

        if(
            queuedCard &&
            Number(queuedCard.actor_slot) === Number(slot)
        ){
            action_queue[i] = null;
            clearedCount++;
        }
    }

    if(clearedCount > 0){
        compactQueue();
        renderQueue();
        renderEquippedDeck();
        renderBattleQueueWindowSlots();
        renderBattleOrder();
    }

    return clearedCount;
}

function hideTargetStats(){
    target_battle_stats.style.display = "none";
}

    // global drag state (only one window can be dragged at a time)
    let activeDrag = null; // { win, offsetX, offsetY }

    function dragWindow(handleEl, winEl) {
    handleEl.addEventListener('mousedown', (e) => {
        e.preventDefault();

        // set the active drag target
        activeDrag = {
        win: winEl,
        offsetX: e.clientX - winEl.offsetLeft,
        offsetY: e.clientY - winEl.offsetTop
        };

        // optional: bring to front when grabbed
        bringToFront(winEl);

        document.body.style.userSelect = 'none';
    });
    }

    // one global move handler
    document.addEventListener('mousemove', (e) => {
    if (!activeDrag) return;

    const { win, offsetX, offsetY } = activeDrag;
    win.style.left = (e.clientX - offsetX) + 'px';
    win.style.top  = (e.clientY - offsetY) + 'px';
    });

    // one global mouseup handler
    document.addEventListener('mouseup', () => {
    activeDrag = null;
    document.body.style.userSelect = 'auto';
    });

    // z-index helper (optional but makes windows feel “right”)
    let topZ = 1000;
    function bringToFront(winEl) {
    winEl.style.zIndex = (++topZ).toString();
    }

dragWindow(handler_header, element_handler);
dragWindow(battle_log_header, battle_log_window);

battle_log_close.onclick = ()=>{
    battle_log_window.style.display = 'none';
}

window.addEventListener("load", function(){
    loadBattleVisualPositions();
    loadSquadLoadouts();

    initializeCurrentUserBattle();
    initializeBattleContext();

    buildSquadEquippedDecks();
    initializeBattleState();
    renderBattleOrder();
    logBattleTurnOrder();

    renderEncounterBoard();
    renderEncounterVisuals();
    renderPlayerBattleVisuals();

    initializeBattleDeckSystem();
    applyAllBattleVisualTransforms();
    initializeBattleVisualHandler();
    initializeBattleExit();
    initializeBattleTargeting();

    planning_player_index = 0;

    battle_log = [];
    if(battle_log_el){
        battle_log_el.innerHTML = "";
    }

    startPlayerPlanningPhase();

    console.log(
    "Built battle decks:",
    current_squad.map(member => ({
        slot: member.slot,
        avatar_id: member.avatar_id,
        deck_count: Array.isArray(member.equipped_deck) ? member.equipped_deck.length : 0,
        cards: Array.isArray(member.equipped_deck)
            ? member.equipped_deck.map(card => card.name)
            : []
    }))
);
});
