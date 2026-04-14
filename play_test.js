//play_test.js
let levels = [];
let current_level = null;

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

let cube = null;
let cube_sides_array = [];

// =====================================
// LEVEL LOAD
// =====================================

function loadTestLevel(){
    levels = loadSavedLevels();
    current_level = getTestLevel(levels);

    if(!current_level){
        console.warn("No test level found.");
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
    syncPlayerToState();

    renderPauseSquad();

    console.log("Movement bounds:", getLevelMovementBounds(current_level));
    console.log("Loaded test level:", current_level);
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

    level_test_preview.appendChild(cube);
}

// =====================================
// STARTUP
// =====================================

window.onload = function(){
    console.log("play_test window loaded");

    initializeCurrentUser();

    // restore saved state
    loadSquadLoadouts();
    loadEquipmentLoadouts();

    // render player UI
    renderUserHUD();
    renderUserStats();

    // load level and environment
    loadTestLevel();

    // prepare pause menu content
    renderDeckPauseDisplay();
    renderEquipmentPauseDisplay();

    // start game loop
    gameLoop();
};
// =====================================
// EXIT
// =====================================

if(level_test_exit){
    level_test_exit.onclick = function(){
        console.log("Exiting test mode...");

        if(typeof saveLevel === "function"){
            saveLevel();
        }

        if(typeof saveCurrentLevel === "function"){
            saveCurrentLevel();
        }

        window.location.href = "./admin_level_create.html";
    };
}

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