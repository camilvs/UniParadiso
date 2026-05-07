//play_test.js
let levels = [];
let current_level = null;


let npcDialogueOpen = false;
const level_test_level_name = document.getElementById("level_test_level_name");
const level_test_preview = document.getElementById("level_test_preview");

const user_name_display = document.getElementById("user_name_display");
const user_stats_window = document.getElementById("user_stats_window");
const user_stats_header = document.getElementById("user_stats_header");
const user_stats_window_close = document.getElementById("user_stats_window_close");

const pause_menu = document.getElementById("pause_menu");
const pause_menu_window = document.getElementById("pause_menu_window");
const pause_menu_header = document.getElementById("pause_menu_header");
const pause_menu_closer = document.getElementById("pause_menu_closer");

const pause_nav_deck = document.getElementById("pause_nav_deck");
const pause_nav_equipment = document.getElementById("pause_nav_equipment");
const pause_nav_squad = document.getElementById("pause_nav_squad");

const squad_pause_display = document.getElementById("squad_pause_display");
const deck_pause_display = document.getElementById("deck_pause_display");
const equipment_pause_display = document.getElementById("equipment_pause_display");


const level_test_exit = document.getElementById("level_test_exit");

const roomDestinationWindow = document.getElementById("exit_to_destination_window");
const roomDestinationName = document.getElementById("destination_name");
const roomDestinationYes = document.getElementById("enter_destination_yes");
// console.log("roomDestinationYes found?", roomDestinationYes);
const roomDestinationNo = document.getElementById("enter_destination_no");

let roomEncounterSteps = 0;
let roomEncounterCooldownSteps = 7;
let roomEncounterCheckLock = false;

const ROOM_ENCOUNTER_RATES = {
    common: 45,
    uncommon: 25,
    rare: 15,
    ultra_rare: 8,
    legendary: 4,
    cosmic: 2,
    paradismic: 1
};

let lastEncounterCheckX = null;
let lastEncounterCheckZ = null;
const ROOM_STEP_DISTANCE = 48;

let roomLandmarkTransitioning = false;

let activeRoomLandmark = null;
let roomLandmarkPromptOpen = false;

let cube = null;
let cube_sides_array = [];

// =====================================
// LEVEL LOAD
// =====================================
function resetRoomSquadStates(){
    if(typeof player_state === "undefined") return;

    // Member 2 (slot 1)
    if(typeof member_2_state !== "undefined"){
        member_2_state.x = player_state.x - 40;
        member_2_state.top = player_state.top + 4;
        member_2_state.z = player_state.z - 8;
        member_2_state.facing = player_state.facing;
        member_2_state.moving = false;
    }

    // Member 3 (slot 2)
    if(typeof member_3_state !== "undefined"){
        member_3_state.x = player_state.x - 80;
        member_3_state.top = player_state.top + 8;
        member_3_state.z = player_state.z - 16;
        member_3_state.facing = player_state.facing;
        member_3_state.moving = false;
    }
}

function loadTestLevel(){
    levels = loadSavedLevels();
    current_level = getTestLevel(levels);

    if(!current_level){
        // console.warn("No test level found.");
        level_test_level_name.textContent = "No test level loaded";
        return;
    }

    level_test_level_name.textContent = current_level.name || "Unnamed Level";

    renderTestLevelBackground();
    prepareTestCube();
    buildLevel(current_level);
    loadRoomVisuals(current_level);
    renderLevelObjects(current_level);
    renderLevelNPCs(current_level);
    renderLevelTreasure(current_level);
    logLevelEncounters(current_level);
    renderLevelLandmarks(current_level);

    renderPlayer(current_level);

    const restoredFromBattle = restorePlayerAfterBattleIfNeeded();

    if(!restoredFromBattle){
        placePlayerAtEntryLandmarkOrDefault();
    }

    syncPlayerToState();
    saveRoomPlayerLocation();
    resetRoomSquadStates();
    renderSquadMembers();
    syncSquadMembersToState();
    resetRoomEncounterSteps();
    roomEncounterCheckLock = false;

    renderPauseSquad();

    // console.log("Movement bounds:", getLevelMovementBounds(current_level));
    // console.log("Loaded test level:", current_level);
    // console.log("cube transform after build:", cube.style.transform);
}

function placePlayerAtEntryLandmarkOrDefault(){
    const entryId = localStorage.getItem("room_entry_landmark_id");

    if(!entryId){
        resetRoomPlayerSpawn();
        return;
    }

    const landmark = current_level.landmarks.find(l =>
        String(l.landmark_id) === String(entryId)
    );

    if(!landmark){
        // console.warn("Entry landmark not found:", entryId);
        resetRoomPlayerSpawn();
        return;
    }

    player_state.x = Number(landmark.left) + 64;
    player_state.z = 16;
    player_state.facing = "right";
    player_state.moving = false;

    localStorage.setItem("room_entry_landmark_id", "");
}

function renderTestLevelBackground(){
    if(!current_level) return;

    if(current_level.background !== null && current_level.background !== undefined){
        level_test_preview.style.backgroundImage =
            `url(./images/background${current_level.background}.png)`;

        level_test_preview.style.backgroundSize = "cover";
        level_test_preview.style.backgroundPosition = "center";
        level_test_preview.style.backgroundRepeat = "repeat-x";
    }
}

function prepareTestCube(){
    level_test_preview.innerHTML = "";

    cube = document.createElement("div");
    cube.id = "cube";

    Object.assign(cube.style, {
        position: "relative",
        transformStyle: "preserve-3d"
    });

    level_test_preview.appendChild(cube);
}

// =====================================
// STARTUP
// =====================================

let roomGameLoopStarted = false;


function startRoomMode(){
    // console.log("room mode started");

    initializeCurrentUser();

    loadSquadLoadouts();
    loadEquipmentLoadouts();

    renderUserHUD();
    renderUserStats();

    loadTestLevel();

    renderDeckPauseDisplay();
    renderEquipmentPauseDisplay();
    renderSquadMembers();

    if (document.getElementById("deck_pause_display")) {
        renderDeckPauseDisplay();
    }

    if (document.getElementById("equipment_pause_display")) {
        renderEquipmentPauseDisplay();
    }

    if (document.getElementById("member_1")) {
        renderPauseSquad();
    }

    if (!roomGameLoopStarted) {
        roomGameLoopStarted = true;
        gameLoop();
    }
}
// =====================================
// EXIT
// =====================================

level_test_exit.style.display = "none";

// =====================================
// DRAG WINDOWS
// =====================================

let activeDrag = null;

function dragWindow(handleEl, winEl){
    if(!handleEl || !winEl) return;

    handleEl.addEventListener("mousedown", (e) => {
        e.preventDefault();

        activeDrag = {
            win: winEl,
            offsetX: e.clientX - winEl.offsetLeft,
            offsetY: e.clientY - winEl.offsetTop
        };

        bringToFront(winEl);
        document.body.style.userSelect = "none";
    });
}

document.addEventListener("mousemove", (e) => {
    if(!activeDrag) return;

    const { win, offsetX, offsetY } = activeDrag;
    win.style.left = (e.clientX - offsetX) + "px";
    win.style.top = (e.clientY - offsetY) + "px";
});

document.addEventListener("mouseup", () => {
    activeDrag = null;
    document.body.style.userSelect = "auto";
});

let topZ = 1000;
function bringToFront(winEl){
    winEl.style.zIndex = (++topZ).toString();
}

dragWindow(user_stats_header, user_stats_window);
dragWindow(pause_menu_header, pause_menu_window);

// =====================================HUD
// WINDOW OPEN/CLOSE
// =====================================

if(user_name_display && user_stats_window){
    user_name_display.onclick = () => {
        renderUserStats();
        user_stats_window.style.display = "flex";
        bringToFront(user_stats_window);
    };
}

if(user_stats_window_close && user_stats_window){
    user_stats_window_close.onclick = () => {
        user_stats_window.style.display = "none";
    };
}

if(pause_menu && pause_menu_window){
    pause_menu.onclick = () => {
        loadSquadLoadouts();
        loadEquipmentLoadouts();

        pause_menu_window.style.display = "flex";
        bringToFront(pause_menu_window);

        showPausePanel("squad");
    };
}

if(pause_menu_closer && pause_menu_window){
    pause_menu_closer.onclick = () => {
        pause_menu_window.style.display = "none";
    };
}

function showPausePanel(panelName){
    if(squad_pause_display) squad_pause_display.style.display = "none";
    if(deck_pause_display) deck_pause_display.style.display = "none";
    if(equipment_pause_display) equipment_pause_display.style.display = "none";

    if(panelName === "squad" && squad_pause_display){
        renderPauseSquad();
        squad_pause_display.style.display = "flex";
    }

    if(panelName === "deck" && deck_pause_display){
        renderDeckPauseDisplay();
        deck_pause_display.style.display = "flex";
    }

    if(panelName === "equipment" && equipment_pause_display){
        renderEquipmentPauseDisplay();
        equipment_pause_display.style.display = "flex";
    }
}

if(pause_nav_squad){
    pause_nav_squad.onclick = () => {
        showPausePanel("squad");
    };
}

if(pause_nav_deck){
    pause_nav_deck.onclick = () => {
        showPausePanel("deck");
    };
}

if(pause_nav_equipment){
    pause_nav_equipment.onclick = () => {
        showPausePanel("equipment");
    };
}

if(roomDestinationNo){
    roomDestinationNo.onclick = function(){
        if(roomLandmarkPromptOpen){
            closeRoomLandmarkWindow();
        }
    };
}

function closeRoomLandmarkWindow(){
    if(roomDestinationWindow) roomDestinationWindow.style.display = "none";
    if(roomDestinationName) roomDestinationName.textContent = "";

    activeRoomLandmark = null;
    roomLandmarkPromptOpen = false;
}


function loadRoomByLevelId(levelId){
    if(!levelId){
        // console.warn("No level id provided.");
        return;
    }

    // console.log("Loading room:", levelId);

    localStorage.setItem(
        "test_level_id",
        String(levelId)
    );

    startRoomMode();
}

function openRoomLandmarkWindow(landmark){
    activeRoomLandmark = landmark;
    roomLandmarkPromptOpen = true;

    if(roomDestinationName){
        if(landmark.destination_type === "to_world_map"){
            roomDestinationName.textContent = " World Map?";
        }else{
            roomDestinationName.textContent = ` Level ${landmark.destination_to}?`;
        }
    }

    if(roomDestinationWindow && roomDestinationWindow.parentElement !== document.body){
        document.body.appendChild(roomDestinationWindow);
    }

    if(roomDestinationWindow){
        Object.assign(roomDestinationWindow.style, {
            display: "flex",
            position: "fixed",
            left: "50%",
            top: "35%",
            transform: "translate(-50%, -50%)",
            zIndex: "99999"
        });
    }
}

if(roomDestinationNo){
    roomDestinationNo.style.display = "none";
}

const roomDestinationExit = document.getElementById("destination_window_exit");

if(roomDestinationExit){
    roomDestinationExit.style.display = "none";
}

if(roomDestinationYes){
    roomDestinationYes.addEventListener("click", function(){
        // console.log("ROOM YES CLICKED");

        if(!activeRoomLandmark){
            // console.warn("Room yes clicked, but no activeRoomLandmark.");
            return;
        }

        const landmark = { ...activeRoomLandmark };
        // console.log("Room landmark confirmed:", landmark);

        beginRoomLandmarkTravel(landmark);
    });
}

function beginRoomLandmarkTravel(landmark){
    if(!landmark){
        console.warn("No landmark passed to beginRoomLandmarkTravel.");
        return;
    }

    // console.log("begin landmark travel:", landmark);

    roomLandmarkTransitioning = true;
    roomLandmarkPromptOpen = false;

    if(roomDestinationWindow) roomDestinationWindow.style.display = "none";
    if(roomDestinationName) roomDestinationName.textContent = "";

    startRoomExitWalk(landmark.exit_type || "down", function(){

        // console.log("Exit walk complete");

        if(landmark.destination_type === "to_world_map"){
            // console.log("Returning to world map");
            returnToWorldMapFromRoom(landmark);
            return;
        }

        if(landmark.destination_type === "to_level"){
        // console.log("Traveling to level:", landmark.destination_to);
        // console.log("Entry landmark:", landmark.destination_landmark_id);

        localStorage.setItem(
            "room_entry_landmark_id",
            landmark.destination_landmark_id || ""
        );

        fadeToRoomLevel(landmark.destination_to);

        return;
    }
    });
}

function fadeToRoomLevel(levelId){
    const fadeLayer = document.getElementById("fade_layer");

    if(!fadeLayer){
        // console.warn("No fade_layer found. Loading room without fade.");
        loadRoomByLevelId(levelId);
        roomLandmarkTransitioning = false;
        return;
    }

    fadeLayer.style.pointerEvents = "auto";

    fadeLayer.animate(
        [{ opacity: 0 }, { opacity: 1 }],
        { duration: 600, fill: "forwards" }
    ).onfinish = function(){

        loadRoomByLevelId(levelId);

        fadeLayer.animate(
            [{ opacity: 1 }, { opacity: 0 }],
            { duration: 600, fill: "forwards" }
        ).onfinish = function(){
            fadeLayer.style.pointerEvents = "none";
            roomLandmarkTransitioning = false;
        };
    };
}

function startRoomExitWalk(direction, onDone){
    const playerEl = getPlayerEl();
    if(!playerEl) return;

    const distance = 920;
    const duration = 1820;

    const start = {
        x: player_state.x,
        top: player_state.top,
        z: player_state.z,
        facing: player_state.facing
    };

    const end = {
        x: start.x,
        top: start.top,
        z: start.z,
        facing: start.facing
    };

    if(direction === "left"){
        end.x -= distance;
        end.facing = "left";
    }

    if(direction === "right"){
        end.x += distance;
        end.facing = "right";
    }

    if(direction === "up"){
        end.z -= distance;
        end.facing = "right";
    }

    if(direction === "down"){
        end.z += distance;
        end.facing = "right";
    }

    player_state.facing = end.facing;
    player_state.moving = true;
    syncPlayerToState();

    const leaderAnim = animateRoomActor(playerEl, start, end, duration, 0);

    animateRoomSquadExit(direction, distance, duration);

    leaderAnim.onfinish = function(){
        player_state.x = end.x;
        player_state.top = end.top;
        player_state.z = end.z;
        player_state.facing = end.facing;
        player_state.moving = false;

        syncPlayerToState();

        setTimeout(() => {
            if(typeof onDone === "function"){
                onDone();
            }
        }, 260);
    };
}

function animateRoomActor(el, start, end, duration, delay){

    const isHorizontalMove = start.x !== end.x;

    const startFlip = isHorizontalMove
        ? (end.x < start.x ? -1 : 1)
        : 1;

    const endFlip = startFlip;

    return el.animate(
        [
            {
                left: `${start.x}px`,
                top: `${start.top}px`,
                transform: `
                    translateZ(${start.z}px)
                    scaleX(${startFlip})
                `
            },
            {
                left: `${end.x}px`,
                top: `${end.top}px`,
                transform: `
                    translateZ(${end.z}px)
                    scaleX(${endFlip})
                `
            }
        ],
        {
            duration,
            delay,
            easing: "linear",
            iterations: 1,
            fill: "forwards"
        }
    );
}

function getRoomExitEndState(start, direction, distance){
    const end = {
        x: start.x,
        top: start.top,
        z: start.z,
        facing: start.facing
    };

    if(direction === "left"){
        end.x -= distance;
        end.facing = "left";
    }

    if(direction === "right"){
        end.x += distance;
        end.facing = "right";
    }

    if(direction === "up"){
        end.z -= distance;
        end.facing = "right";
    }

    if(direction === "down"){
        end.z += distance;
        end.facing = "right";
    }

    return end;
}

function animateRoomSquadExit(direction, distance, duration){
    const members = [
        { slot: 1, state: member_2_state, delay: 140 },
        { slot: 2, state: member_3_state, delay: 280 }
    ];

    members.forEach(memberInfo => {
        const el = getSquadMemberEl(memberInfo.slot);
        if(!el) return;

        const start = {
            x: memberInfo.state.x,
            top: memberInfo.state.top,
            z: memberInfo.state.z,
            facing: memberInfo.state.facing
        };

        // Leader's X target (important!)
        const leaderTargetX = player_state.x;

        // Phase 1 → match X
        const phase1End = {
            x: leaderTargetX,
            top: start.top,
            z: start.z,
            facing: start.facing
        };

        // Phase 2 → then move Z
        const phase2End = getRoomExitEndState(phase1End, direction, distance);

        memberInfo.state.moving = true;

        // ---- Phase 1 (X alignment)
        animateRoomActor(
            el,
            start,
            phase1End,
            duration * 0.4,
            memberInfo.delay
        ).onfinish = function(){

            memberInfo.state.x = phase1End.x;
            memberInfo.state.top = phase1End.top;
            memberInfo.state.z = phase1End.z;

            // ---- Phase 2 (Z movement)
            animateRoomActor(
                el,
                phase1End,
                phase2End,
                duration * 0.6,
                0
            ).onfinish = function(){

                memberInfo.state.x = phase2End.x;
                memberInfo.state.top = phase2End.top;
                memberInfo.state.z = phase2End.z;
                memberInfo.state.facing = phase2End.facing;
                memberInfo.state.moving = false;

                syncSquadMembersToState();
            };
        };
    });
}

function returnToWorldMapFromRoom(landmark){
    const fadeLayer = document.getElementById("fade_layer");

    fadeLayer.animate(
        [{ opacity: 0 }, { opacity: 1 }],
        { duration: 600, fill: "forwards" }
    ).onfinish = function(){

        roomGameLoopStarted = false;
        current_level = null;

        resetRoomPlayerSpawn();

        if(typeof worldPlayerZ !== "undefined"){
            worldPlayerZ = 16;
        }

        if(typeof worldMapData !== "undefined"){
            worldMapData.player = worldMapData.player || {};
            worldMapData.player.z = 16;
        }

        if(levelTestHolder){
            levelTestHolder.style.transformStyle = "preserve-3d";
        }

        document.getElementById("room_screen").style.display = "none";
        document.getElementById("world_map_screen").style.display = "flex";

        worldMapActive = true;
        teleportTransitioning = false;
        roomLandmarkTransitioning = false;

        activeRoomLandmark = null;
        roomLandmarkPromptOpen = false;

        if(roomDestinationWindow) roomDestinationWindow.style.display = "none";
        if(roomDestinationName) roomDestinationName.textContent = "";

        if(typeof worldTeleportCooldown !== "undefined"){
            worldTeleportCooldown = Date.now() + 800;
        }

        activeTeleportPrompt = null;
        teleportPromptOpen = false;

        worldInput.left = false;
        worldInput.right = false;
        worldInput.up = false;
        worldInput.down = false;

        cameraMode = "game";
        followWorldPlayerCamera();

        if(typeof resetWorldSquadVisualPositions === "function"){
            resetWorldSquadVisualPositions();
        }else{
            syncWorldPlayerFree();
            syncWorldSquadMembersFollow(false);
        }

        fadeLayer.animate(
            [{ opacity: 1 }, { opacity: 0 }],
            { duration: 600, fill: "forwards" }
        );
    };
    localStorage.setItem("game_scene", "world");
}

function resetRoomPlayerSpawn(){
    player_state.x = 100;
    player_state.top = 868;
    player_state.z = 48;
    player_state.facing = "right";
    player_state.moving = false;
}

let npcDialogueTyping = false;

function ensureNPCDialogueWindow(){
    let win = document.getElementById("runtime_npc_dialogue_window");

    if(win) return win;

    win = document.createElement("div");
    win.id = "runtime_npc_dialogue_window";

    win.innerHTML = `
        <div id="runtime_npc_portrait"></div>
        <div id="runtime_npc_text"></div>
        <div id="runtime_npc_close">X</div>
    `;

    Object.assign(win.style, {
        position: "fixed",
        left: "50%",
        bottom: "40px",
        transform: "translateX(-50%)",
        width: "520px",
        height: "150px",
        backgroundColor: "ghostwhite",
        border: "2px solid black",
        display: "none",
        flexDirection: "row",
        zIndex: "99999",
        padding: "8px"
    });

    document.body.appendChild(win);

    const portrait = document.getElementById("runtime_npc_portrait");
    Object.assign(portrait.style, {
        width: "120px",
        height: "120px",
        border: "1px solid black",
        backgroundColor: "aliceblue",
        marginRight: "8px",
        backgroundRepeat: "no-repeat"
    });

    const text = document.getElementById("runtime_npc_text");
    Object.assign(text.style, {
        width: "350px",
        height: "112px",
        backgroundColor: "#222",
        color: "ghostwhite",
        padding: "8px",
        overflowY: "auto"
    });

    const close = document.getElementById("runtime_npc_close");
    Object.assign(close.style, {
        width: "24px",
        height: "24px",
        cursor: "pointer",
        textAlign: "center",
        backgroundColor: "#222",
        color: "white"
    });

    close.onclick = () => {
        win.style.display = "none";
    };

    return win;
}

function openNPCDialogue(npc){
    const win = ensureNPCDialogueWindow();
    const portrait = document.getElementById("runtime_npc_portrait");
    const textBox = document.getElementById("runtime_npc_text");

    npcDialogueOpen = true;

    win.style.display = "flex";

    portrait.style.backgroundImage = `url(./images/npc_${npc.sprite_id}.png)`;
    portrait.style.backgroundSize = "200%";
    portrait.style.backgroundPosition =
        `${Number(npc.portrait_left) || 0}px ${Number(npc.portrait_top) || 0}px`;
    portrait.style.transform = `scaleX(${Number(npc.portrait_scaleX) || 1})`;
    portrait.style.transformOrigin = "center";

    textBox.innerHTML = "";

    const dialogue = npc.dialogue || "...";
    typeNPCText(dialogue, textBox, 0);
}

function closeNPCDialogue(){
    const win = document.getElementById("runtime_npc_dialogue_window");
    if(win){
        win.style.display = "none";
    }

    npcDialogueOpen = false;
}

function typeNPCText(text, box, index){
    npcDialogueTyping = true;

    if(index >= text.length){
        npcDialogueTyping = false;
        return;
    }

    box.innerHTML += text[index];

    setTimeout(() => {
        typeNPCText(text, box, index + 1);
    }, 24);
}

function getCurrentUserId(){
    return current_user?.id ?? 0;
}

function nextOwnedId(arr){
    if(!Array.isArray(arr) || arr.length === 0) return 0;
    return Math.max(...arr.map(x => Number(x.id) || 0)) + 1;
}

function addChestContentToInventory(type, defId){
    const userId = getCurrentUserId();

    if(type === "weapon"){
        users_weapons.push({
            id: nextOwnedId(users_weapons),
            user_id: userId,
            avatar_id: null,
            weapon_id: Number(defId),
            level: 1,
            rank: "F",
            quantity: 1,
            locked: false,
            favorite: false
        });
    }

    if(type === "equipment"){
        users_equipments.push({
            id: nextOwnedId(users_equipments),
            user_id: userId,
            equipment_id: Number(defId),
            quantity: 1,
            locked: false,
            favorite: false
        });
    }

    if(type === "item"){
        const existing = users_items.find(i =>
            Number(i.user_id) === Number(userId) &&
            Number(i.item_id) === Number(defId)
        );

        if(existing){
            existing.quantity += 1;
        }else{
            users_items.push({
                id: nextOwnedId(users_items),
                user_id: userId,
                item_id: Number(defId),
                quantity: 1,
                locked: false,
                favorite: false
            });
        }
    }

    if(type === "manifest"){
        users_manifest.push({
            id: nextOwnedId(users_manifest),
            user_id: userId,
            avatar_id: null,
            manifest_id: Number(defId),
            level: 1,
            rank: "F",
            quantity: 1,
            locked: false,
            favorite: false
        });
    }

    if(type === "skill"){
        users_skills.push({
            id: nextOwnedId(users_skills),
            user_id: userId,
            avatar_id: null,
            skill_id: Number(defId),
            level: 1,
            rank: "F",
            quantity: 1,
            locked: false,
            favorite: false
        });
    }

    saveInventory();
}

function saveInventory(){
    localStorage.setItem("users_weapons", JSON.stringify(users_weapons));
    localStorage.setItem("users_equipments", JSON.stringify(users_equipments));
    localStorage.setItem("users_items", JSON.stringify(users_items));
    localStorage.setItem("users_manifest", JSON.stringify(users_manifest));
    localStorage.setItem("users_skills", JSON.stringify(users_skills));
}

function isRoomInteractionBusy(){
    return (
        roomLandmarkPromptOpen ||
        roomLandmarkTransitioning ||
        activeRoomLandmark ||
        npcDialogueOpen ||
        document.getElementById("pause_menu_window")?.style.display === "flex" ||
        document.getElementById("runtime_npc_dialogue_window")?.style.display === "flex" ||
        document.getElementById("treasure_popup")?.style.display === "flex"
    );
}

function getRoomEncounters(){
    if(!current_level || !Array.isArray(current_level.enemy_encounters)){
        return [];
    }

    return current_level.enemy_encounters.filter(encounter =>
        encounter &&
        (
            encounter.front_position !== null ||
            encounter.mid_1 !== null ||
            encounter.mid_2 !== null ||
            encounter.back_1 !== null ||
            encounter.back_2 !== null ||
            encounter.back_3 !== null
        )
    );
}

function chooseRandomEncounter(encounters){
    const weighted = encounters.map(encounter => ({
        encounter,
        weight: ROOM_ENCOUNTER_RATES[encounter.rate || "common"] || 0
    })).filter(entry => entry.weight > 0);

    const total = weighted.reduce((sum, entry) => sum + entry.weight, 0);
    if(total <= 0) return null;

    let roll = Math.random() * total;

    for(const entry of weighted){
        roll -= entry.weight;
        if(roll <= 0){
            return entry.encounter;
        }
    }

    return weighted[weighted.length - 1]?.encounter || null;
}

function resetRoomEncounterSteps(){
    roomEncounterSteps = 0;
    lastEncounterCheckX = player_state.x;
    lastEncounterCheckZ = player_state.z;
}

function checkRoomRandomEncounter(){
    if(!current_level || !player_state) return;
    if(!player_state.moving) return;
    if(isRoomInteractionBusy()) return;
    if(roomEncounterCheckLock) return;

    const encounters = getRoomEncounters();
    if(encounters.length === 0) return;

    if(lastEncounterCheckX === null || lastEncounterCheckZ === null){
        resetRoomEncounterSteps();
        return;
    }

    const dx = player_state.x - lastEncounterCheckX;
    const dz = player_state.z - lastEncounterCheckZ;
    const distanceMoved = Math.sqrt(dx * dx + dz * dz);

    if(distanceMoved < ROOM_STEP_DISTANCE) return;

    lastEncounterCheckX = player_state.x;
    lastEncounterCheckZ = player_state.z;
    roomEncounterSteps++;

    // console.log("Encounter steps:", roomEncounterSteps);

    if(roomEncounterSteps < roomEncounterCooldownSteps){
        return;
    }

    const chance = 0.18; // 18% after 7 steps
    if(Math.random() > chance){
        return;
    }

    const encounter = chooseRandomEncounter(encounters);
    if(!encounter) return;

    triggerRoomEncounter(encounter);
}

function triggerRoomEncounter(encounter){
    roomEncounterCheckLock = true;
    roomEncounterSteps = 0;

    saveRoomPlayerLocation();

    const roomLocation = JSON.parse(
        localStorage.getItem("saved_room_location") || "{}"
    );

    localStorage.setItem("game_scene", "room");
    localStorage.setItem("battle_return_room", JSON.stringify(roomLocation));

    player_state.moving = false;
    input_state.left = false;
    input_state.right = false;
    input_state.up = false;
    input_state.down = false;

    localStorage.setItem(
        "battle_test_encounter",
        JSON.stringify({
            level_id: current_level.id,
            level_name: current_level.name || "Room",
            encounter_data: encounter
        })
    );

    fadeToBattle();
}

function fadeToBattle(){
    const fade = getRoomWhiteFadeLayer();
    fade.style.pointerEvents = "auto";

    fade.animate(
        [{ opacity: 0 }, { opacity: 1 }],
        { duration: 450, fill: "forwards" }
    ).onfinish = function(){
        window.location.href = "./battle_test.html";
    };
}

function getRoomWhiteFadeLayer(){
    let fade = document.getElementById("room_battle_white_fade");

    if(fade) return fade;

    fade = document.createElement("div");
    fade.id = "room_battle_white_fade";

    Object.assign(fade.style, {
        position: "fixed",
        inset: "0",
        backgroundColor: "white",
        opacity: "0",
        pointerEvents: "none",
        zIndex: "999999"
    });

    document.body.appendChild(fade);
    return fade;
}

function restorePlayerAfterBattleIfNeeded(){
    const raw = localStorage.getItem("battle_return_room");
    if(!raw) return false;

    let data = null;

    try{
        data = JSON.parse(raw);
    }catch(err){
        localStorage.removeItem("battle_return_room");
        return false;
    }

    if(!data || String(data.level_id) !== String(current_level.id)){
        return false;
    }

    player_state.x = Number(data.player_x ?? player_state.x);
    player_state.top = Number(data.player_top ?? player_state.top);
    player_state.z = Number(data.player_z ?? player_state.z);
    player_state.facing = data.player_facing || "right";
    player_state.moving = false;

    localStorage.removeItem("battle_return_room");

    return true;
}

function saveRoomPlayerLocation(){
    if(!current_level || !player_state) return;

    localStorage.setItem("game_scene", "room");

    localStorage.setItem("saved_room_location", JSON.stringify({
        level_id: current_level.id,
        player_x: player_state.x,
        player_top: player_state.top,
        player_z: player_state.z,
        player_facing: player_state.facing
    }));
}


