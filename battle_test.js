// battle_test.js

let action_queue = [
    null,
    null,
    null,
    null,
    null,
    null,
    null
];

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

let to_battle = document.getElementById("to_battle");

let active_visual_id = null;

let battle_camera_y = 0;
let is_battle_camera_turning = false;

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
}

function getLeaderDeck(){
    if(!Array.isArray(current_squad)) return [];

    const leader = current_squad.find(member => member.slot === 0);
    if(!leader) return [];

    if(!Array.isArray(leader.equipped_deck)){
        leader.equipped_deck = [];
    }

    return leader.equipped_deck;
}

function renderEquippedDeck(){
    console.log("current_squad:", current_squad);

    const deck = getLeaderDeck();

    console.log("leader deck:", deck);

    equipped_card_inventory.innerHTML = "";

    let visibleDeck = deck;

    if(active_card_filter !== "All"){
        visibleDeck = deck.filter(card => card.type === active_card_filter);
    }

    visibleDeck.forEach((card, index) => {
        console.log("rendering card:", card);

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

    const power = document.createElement("div");
    power.textContent = `Power: ${card.power}`;

    const desc = document.createElement("div");
    desc.textContent = card.desc;

    card_preview.appendChild(title);
    card_preview.appendChild(type);
    card_preview.appendChild(cost);
    card_preview.appendChild(power);
    card_preview.appendChild(desc);
}

function addCardToQueue(card){

   const alreadyQueued = action_queue.some(queuedCard =>
        queuedCard &&
        queuedCard.queue_key === card.queue_key
    );
    

    if(alreadyQueued){
        console.log("That card is already in the queue.");
        return;
    }

    const openIndex = action_queue.findIndex(slot => slot === null);

    if(openIndex === -1){
        console.log("Queue full.");
        return;
    }

    action_queue[openIndex] = card;
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

            action_queue[i] = null;

            compactQueue();        // <-- NEW

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
            slot.title = card.name;
        }else{
            slot.style.backgroundImage = "";
            slot.title = "Empty";
        }
    }
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

    console.log("battle context:", {
        current_user,
        current_avatar,
        current_user_avatar_link
    });
}

function buildLeaderEquippedDeck(){
    if(!Array.isArray(current_squad) || !current_squad[0]) return [];

    const leader = current_squad[0];

    const leaderLoadout = Array.isArray(squad_loadouts)
        ? squad_loadouts.find(loadout =>
            Number(loadout.user_id) === Number(leader.user_id) &&
            Number(loadout.avatar_id) === Number(leader.avatar_id)
        ) || null
        : null;

    console.log("leader:", leader);
    console.log("users:", users);
    console.log("avatars:", avatars);
    console.log("squad_loadouts:", squad_loadouts);
    console.log("leaderLoadout:", leaderLoadout);

    if(!leaderLoadout){
        leader.equipped_deck = [];
        console.log("No matching leader loadout found.");
        return [];
    }

    const weaponsLoadout = Array.isArray(leaderLoadout.weapons) ? leaderLoadout.weapons : [];
    const itemsLoadout = Array.isArray(leaderLoadout.battle_items) ? leaderLoadout.battle_items : [];
    const manifestLoadout = Array.isArray(leaderLoadout.manifest) ? leaderLoadout.manifest : [];
    const skillsLoadout = Array.isArray(leaderLoadout.skills) ? leaderLoadout.skills : [];

    const builtDeck = [];

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
            power: weaponDef.power ?? weaponDef.atk ?? 0,
            desc: weaponDef.desc || "Weapon card.",
            icon: weaponDef.image ? `./images/${weaponDef.image}` : ""
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
            power: itemDef.power ?? 0,
            desc: itemDef.desc || "Battle item.",
            icon: itemDef.image ? `./images/${itemDef.image}` : ""
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
            power: manifestDef.power ?? manifestDef.atk ?? 0,
            desc: manifestDef.desc || "Manifest card.",
            icon: manifestDef.image ? `./images/${manifestDef.image}` : ""
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
            power: skillDef.power ?? skillDef.atk ?? 0,
            desc: skillDef.desc || "Skill card.",
            icon: skillDef.image ? `./images/${skillDef.image}` : ""
        });
    });

    leader.equipped_deck = builtDeck;

    console.log("builtDeck:", builtDeck);

    return builtDeck;
}

function initializeBattleDeckSystem(){
    renderEquippedDeck();
    renderQueue();
    initializeQueueRemoval();
    initializeCommandMenus();
    initializeCardFilters();
    initializeBattleCameraControls();

    console.log("Battle deck system ready.");
}

if(equipped_card_inventory && card_preview){
    equipped_card_inventory.onmouseleave = () => {
        card_preview.innerHTML = "Card Preview";
    };
}

function initializeCurrentUser(){
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

        if(enemyId === null || enemyId === undefined || !enemies[enemyId]){
            el.title = "Empty";
            return;
        }

        const enemy = enemies[enemyId];

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
        if(enemyId === null || enemyId === undefined || !enemies[enemyId]){
            setBattleVisual(elId, "");
            return;
        }

        setBattleVisual(elId, `./images/enemy_${enemyId}.png`);
    });
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
    const leader = Array.isArray(current_squad) ? current_squad[0] : null;
    if(!leader) return;

    const avatarRecord = Array.isArray(avatars)
        ? avatars.find(avatar => Number(avatar.id) === Number(leader.avatar_id))
        : null;

    if(!avatarRecord){
        setBattleVisual("visual_p_front_position", "");
        return;
    }

    setBattleVisual("visual_p_front_position", `./images/${avatarRecord.image_idle}`);
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

window.addEventListener("load", function(){
    loadBattleVisualPositions();
    loadSquadLoadouts();

    initializeCurrentUser();
    buildLeaderEquippedDeck();
    initializeBattleDeckSystem();

    renderEncounterBoard();
    renderEncounterVisuals();
    renderPlayerBattleVisuals();

    applyAllBattleVisualTransforms();
    initializeBattleVisualHandler();
    initializeBattleExit();
});