let worldMapActive = true;
const worldMapPreview = document.getElementById("world_map_preview");
const world = document.getElementById("world");
const levelTestHolder = document.getElementById("level_test_holder");
const WORLD_CELL_SIZE = 24;
const tileHolder = document.getElementById("tile_holder");
const TILES = 108;
let selectedTile = null;
let isPainting = false;

let grid_count = 49;
let inner_count = 25;
 
const total_objects = 29;

const OUTER_COLS = 7;
const INNER_COLS = 5;
const WORLD_COLS = OUTER_COLS * INNER_COLS; // 35
const WORLD_ROWS = OUTER_COLS * INNER_COLS; // 35

const worldInput = {
    up: false,
    down: false,
    left: false,
    right: false
};

const PLAYER_HITBOX = {
    offsetX: 10,
    offsetY: 18,
    width: 12,
    height: 10
};

let worldPlayerX = 300;
let worldPlayerY = 300;
let worldPlayerZ = 16;
let worldPlayerSpeed = 0.8;
let worldPlayerFacing = "right";

const TOP_CAM_CENTER_X = 429;
const TOP_CAM_CENTER_Y = 300;
const TOP_CAM_Z = 620;
const TOP_CAM_RX = 0;
const TOP_CAM_FOLLOW_SPEED = 0.12;

let cameraMode = "game";

const objectPreview = document.getElementById("object_preview");
const objectX = document.getElementById("object_x");
const objectY = document.getElementById("object_y");
const objectZ = document.getElementById("object_z");
const objectRX = document.getElementById("object_rotate_x");
const objectRY = document.getElementById("object_rotate_y");
const objectRZ = document.getElementById("object_rotate_z");
const objectScale = document.getElementById("object_scale");
const objectHolder = document.getElementById("object_holder");
const deleteObject = document.getElementById("delete_object");

const colBtn = document.getElementById("col");

const controllerUp = document.getElementById("controller_up");
const controllerDown = document.getElementById("controller_down");
const controllerLeft = document.getElementById("controller_left");
const controllerRight = document.getElementById("controller_right");

const editorCameraBtn = document.getElementById("editor_camera");
const gameCameraBtn = document.getElementById("game_camera");

let worldPlayerMoving = false;
let worldPlayerVisualX = 0;
let worldPlayerVisualY = 0;
let worldPlayerTargetX = 0;
let worldPlayerTargetY = 0;
let worldMoveSpeed = 3;

let collisionMode = false;

let selectedObject = null;
let currentObject = null;
let worldObjects = [];
let objectPidCounter = 1;

const teleportBtn = document.getElementById("teleport");
const teleportOptions = document.getElementById("teleport_options");
const teleportForm = document.getElementById("teleport_form");
const teleportDestinationSelect = document.getElementById("teleport_destination_select");
const currentDestination = document.getElementById("current_destination");
const deleteTeleport = document.getElementById("delete_teleport");

const exitToDestinationWindow = document.getElementById("exit_to_destination_window");
const destinationName = document.getElementById("destination_name");
const destinationWindowExit = document.getElementById("destination_window_exit");
const enterDestinationYes = document.getElementById("enter_destination_yes");
const enterDestinationNo = document.getElementById("enter_destination_no");
let teleportTransitioning = false;
const isWorldEditorMode = !!document.getElementById("map_mover");

let worldFollowTrail = [];

const WORLD_FOLLOW_GAP = 12;
const WORLD_TRAIL_MAX = 300;

const WORLD_FOLLOW_SMOOTH = 0.18;
const WORLD_FOLLOW_SNAP_DISTANCE = 18;

let activeTeleportPrompt = null;
let teleportPromptOpen = false;

let teleportMode = false;
let currentTeleport = null;

let foundTeleport = null;
let worldTeleportCooldown = 0;
const teleportLandmarkSelect = document.getElementById("teleport_landmark_select");

let saveTimeout = null;
function debouncedSave() {
    clearTimeout(saveTimeout);
    saveTimeout = setTimeout(saveWorldMapData, 500);
}

function toggleCollision(index, spot){

    if(!worldMapData.collisions){
        worldMapData.collisions = [];
    }

    const exists = worldMapData.collisions.includes(index);

    if(exists){
        worldMapData.collisions =
            worldMapData.collisions.filter(i => i !== index);

        spot.dataset.collision = "false";
        removeCollisionMark(spot);

    }else{

        if(!worldMapData.collisions.includes(index)){
            worldMapData.collisions.push(index);
        }

        spot.dataset.collision = "true";
        addCollisionMark(spot);
    }

    saveWorldMapData();
}

function ensureSafeSpawn(){

    if(!canPlayerMoveTo(worldPlayerX, worldPlayerY)){

        worldPlayerX = 300;
        worldPlayerY = 300;

        // console.log("Spawn adjusted to safe position");
    }
}


// ─── Build the tile grid ───────────────────────────────────────────────────

for (let i = 0; i < grid_count; i++) {

    let grid_slot = document.createElement("div");
    Object.assign(grid_slot.style, {
        width: "120px",
        height: "120px",
        display: "grid",
        gridTemplateColumns: "repeat(5, 1fr)",
        gridTemplateRows: "repeat(5, 1fr)",
        padding: "0",
        margin: "0",
        boxSizing: "border-box"
    });
    world.appendChild(grid_slot);

    for (let j = 0; j < inner_count; j++) {

        let grid_spot = document.createElement("div");
        grid_spot.classList.add("world_spot");
        Object.assign(grid_spot.style, {
            width: "100%",
            height: "100%",
            boxSizing: "border-box",
            margin: "0",
            padding: "0",
            transition: "outline 0.1s ease",
            backgroundSize: "contain",
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
        });
        const outerCol = i % OUTER_COLS;
        const outerRow = Math.floor(i / OUTER_COLS);

        const innerCol = j % INNER_COLS;
        const innerRow = Math.floor(j / INNER_COLS);

        const worldCol = outerCol * INNER_COLS + innerCol;
        const worldRow = outerRow * INNER_COLS + innerRow;

        const worldIndex = worldRow * WORLD_COLS + worldCol;

        grid_spot.dataset.worldIndex = worldIndex;

        // FIX: Guard against painting while in collision mode
        grid_spot.addEventListener("mouseover", () => {
            if (!isWorldEditorMode) return;

            grid_spot.style.outline = "2px solid yellow";

            if (isPainting && !collisionMode && !teleportMode && selectedTile !== null) {
                paintTile(grid_spot);
            }
        });

        grid_spot.addEventListener("mouseout", () => {
            if (!isWorldEditorMode) return;
            grid_spot.style.outline = "none";
        });

        grid_spot.addEventListener("mousedown", () => {
            if (!isWorldEditorMode) return;
            const index = Number(grid_spot.dataset.worldIndex);

            if (collisionMode) {
                toggleCollision(index, grid_spot);
                return;
            }

            if (teleportMode) {
                selectOrCreateTeleport(index, grid_spot);
                return;
            }

            isPainting = true;

            if (selectedTile !== null) {
                paintTile(grid_spot);
            }
        });

        grid_slot.appendChild(grid_spot);
    }
}

document.addEventListener("mouseup", () => {
    isPainting = false;
});

function canPlayerMoveTo(x, y) {
    const left = x + PLAYER_HITBOX.offsetX;
    const right = left + PLAYER_HITBOX.width;
    const top = y + PLAYER_HITBOX.offsetY;
    const bottom = top + PLAYER_HITBOX.height;

    if (left < 0 || top < 0) return false;
    if (right > WORLD_COLS * WORLD_CELL_SIZE) return false;
    if (bottom > WORLD_ROWS * WORLD_CELL_SIZE) return false;

    const points = [
        { x: left, y: top },
        { x: right, y: top },
        { x: left, y: bottom },
        { x: right, y: bottom }
    ];

    for (const point of points) {
        const index = getWorldIndexFromXY(point.x, point.y);
        if (index === -1) return false;

        if (worldMapData.collisions && worldMapData.collisions.includes(index)) {
            // console.log("Blocked collision at index:", index);
            return false;
        }
    }

    return true;
}


// ─── Tile palette ──────────────────────────────────────────────────────────

function generateTilePalette() {
    for (let i = 1; i <= TILES; i++) {
        let tile = document.createElement("div");
        Object.assign(tile.style, {
            width: "32px",
            height: "32px",
            margin: "2px",
            display: "inline-block",
            border: "1px solid black",
            backgroundImage: `url(./images/tile${i}.png)`,
            backgroundSize: "contain"
        });

        tile.dataset.tileId = i;

        tile.addEventListener("click", () => {
            selectedTile = i;
            highlightSelectedTile(tile);
        });

        tileHolder.appendChild(tile);
    }
}

function highlightSelectedTile(tile) {
    [...tileHolder.children].forEach(t => t.style.outline = "none");
    tile.style.outline = "2px solid red";
}

function paintTile(spot) {
    spot.style.backgroundImage = `url(./images/tile${selectedTile}.png)`;
    spot.style.backgroundSize = "24px 24px";

    const allSpots = [...world.querySelectorAll(".world_spot")];
    const index = allSpots.indexOf(spot);

    const existing = worldMapData.tiles.find(tile => tile.index === index);

    if (existing) {
        existing.tile_id = Number(selectedTile);
    } else {
        worldMapData.tiles.push({
            index,
            tile_id: Number(selectedTile)
        });
    }

    saveWorldMapData();
}


// ─── Map transform sliders ─────────────────────────────────────────────────

const mapX = document.getElementById("map_x");
const mapY = document.getElementById("map_y");
const mapZ = document.getElementById("map_z");
const rotX = document.getElementById("map_rotate_x");
const rotY = document.getElementById("map_rotate_y");
const rotZ = document.getElementById("map_rotate_z");

const resetBtn = document.getElementById("reset_map");

function initializeObjectSliderRanges() {
    objectX.min = -400;
    objectX.max = 1000;
    objectX.step = 1;

    objectY.min = -400;
    objectY.max = 1000;
    objectY.step = 1;

    objectZ.min = -400;
    objectZ.max = 1000;
    objectZ.step = 1;

    objectRX.min = -180;
    objectRX.max = 180;
    objectRX.step = 1;

    objectRY.min = -180;
    objectRY.max = 180;
    objectRY.step = 1;

    objectRZ.min = -180;
    objectRZ.max = 180;
    objectRZ.step = 1;

    objectScale.min = 0.1;
    objectScale.max = 4;
    objectScale.step = 0.01;
}

function updateMapTransform() {
    if (!levelTestHolder) return;

    const x = mapX ? Number(mapX.value || 0) : 0;
    const y = mapY ? Number(mapY.value || 0) : 0;
    const z = mapZ ? Number(mapZ.value || 0) : 0;
    const rx = rotX ? Number(rotX.value || 0) : 0;
    const ry = rotY ? Number(rotY.value || 0) : 0;
    const rz = rotZ ? Number(rotZ.value || 0) : 0;

    levelTestHolder.style.transform = `
        translateX(${x}px)
        translateY(${y}px)
        translateZ(${z}px)
        rotateX(${rx}deg)
        rotateY(${ry}deg)
        rotateZ(${rz}deg)
    `;
}

[mapX, mapY, mapZ, rotX, rotY, rotZ].forEach(slider => {
    if (!slider) return;

    slider.addEventListener("input", () => {
        cameraMode = "editor";

        if (editorCameraBtn) {
            editorCameraBtn.style.backgroundColor = "purple";
        }

        if (gameCameraBtn) {
            gameCameraBtn.style.backgroundColor = "black";
        }

        if (isWorldEditorMode) {
            updateMapTransform();
        }
        saveWorldMapData();
    });
});

if (resetBtn) {
    resetBtn.addEventListener("click", () => {
        if (mapX) mapX.value = 0;
        if (mapY) mapY.value = 0;
        if (mapZ) mapZ.value = 0;
        if (rotX) rotX.value = 15;
        if (rotY) rotY.value = 0;
        if (rotZ) rotZ.value = 0;

        updateMapTransform();
        saveWorldMapData();
    });
}

updateMapTransform();


// ─── Object palette ────────────────────────────────────────────────────────

function generateObjectPalette() {
    for (let i = 1; i <= total_objects; i++) {
        const obj = document.createElement("div");

        Object.assign(obj.style, {
            width: "32px",
            height: "32px",
            margin: "2px",
            display: "inline-block",
            border: "1px solid black",
            cursor: "pointer",
            backgroundImage: `url(./images/object${i}.png)`,
            backgroundSize: "contain",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center"
        });

        obj.dataset.objectId = i;

        obj.onclick = function () {
            selectedObject = i;

            [...objectHolder.children].forEach(o => o.style.outline = "none");
            obj.style.outline = "2px solid lime";

            objectPreview.style.backgroundImage = `url(./images/object${i}.png)`;
            objectPreview.style.backgroundSize = "contain";
            objectPreview.style.backgroundRepeat = "no-repeat";
            objectPreview.style.backgroundPosition = "center";

            placeWorldObject(i);
        };

        objectHolder.appendChild(obj);
    }
}

function placeWorldObject(objectId) {
    const objEl = document.createElement("div");
    const pid = objectPidCounter++;
    objEl.classList.add("world_object");
    objEl.dataset.pid = pid;
    objEl.dataset.objectId = objectId;

    Object.assign(objEl.style, {
        width: "120px",
        height: "120px",
        position: "absolute",
        left: "0px",
        top: "0px",
        backgroundImage: `url(./images/object${objectId}.png)`,
        backgroundSize: "contain",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        pointerEvents: "auto",
        cursor: "pointer",
        transformStyle: "preserve-3d"
    });

    worldMapPreview.style.position = "relative";
    worldMapPreview.style.transformStyle = "preserve-3d";

    levelTestHolder.appendChild(objEl);

    const record = {
        pid,
        sprite_id: Number(objectId),
        x: 230,
        y: 230,
        z: 10,
        rx: 0,
        ry: 0,
        rz: 0,
        scale: 1
    };

    worldObjects.push(record);
    saveWorldMapData();

    loadObjectIntoEditor(objEl);
}

function getCurrentObjectRecord() {
    if (!currentObject) return null;

    return worldObjects.find(obj =>
        Number(obj.pid) === Number(currentObject.dataset.pid)
    ) || null;
}

function loadObjectIntoEditor(objEl) {
    currentObject = objEl;

    const rec = getCurrentObjectRecord();
    if (!rec) return;

    objectPreview.style.backgroundImage = `url(./images/object${rec.sprite_id}.png)`;
    objectPreview.style.backgroundSize = "contain";
    objectPreview.style.backgroundRepeat = "no-repeat";
    objectPreview.style.backgroundPosition = "center";

    objectX.value = rec.x;
    objectY.value = rec.y;
    objectZ.value = rec.z;
    objectRX.value = rec.rx;
    objectRY.value = rec.ry;
    objectRZ.value = rec.rz;
    objectScale.value = rec.scale;

    applyObjectTransform();
}

function applyObjectTransform() {
    if (!currentObject) return;

    const rec = getCurrentObjectRecord();
    if (!rec) return;

    currentObject.style.transform = `
        translateX(${rec.x}px)
        translateY(${rec.y}px)
        translateZ(${rec.z}px)
        rotateX(${rec.rx}deg)
        rotateY(${rec.ry}deg)
        rotateZ(${rec.rz}deg)
        scale(${rec.scale})
    `;
}

[objectX, objectY, objectZ, objectRX, objectRY, objectRZ, objectScale].forEach(slider => {
    if (!slider) return;

    slider.addEventListener("input", () => {
        const rec = getCurrentObjectRecord();
        if (!rec) return;

        rec.x = objectX ? Number(objectX.value) : rec.x;
        rec.y = objectY ? Number(objectY.value) : rec.y;
        rec.z = objectZ ? Number(objectZ.value) : rec.z;
        rec.rx = objectRX ? Number(objectRX.value) : rec.rx;
        rec.ry = objectRY ? Number(objectRY.value) : rec.ry;
        rec.rz = objectRZ ? Number(objectRZ.value) : rec.rz;
        rec.scale = objectScale ? Number(objectScale.value) : rec.scale;

        applyObjectTransform();
        saveWorldMapData();
    });
});

if (isWorldEditorMode && worldMapPreview) {
    worldMapPreview.addEventListener("click", e => {
        const objEl = e.target.closest(".world_object");
        if (!objEl) return;

        e.stopPropagation();
        loadObjectIntoEditor(objEl);
    });
}

if (deleteObject) {
    deleteObject.onclick = function () {
        if (!currentObject) return;

        const pid = Number(currentObject.dataset.pid);

        worldObjects = worldObjects.filter(obj =>
            Number(obj.pid) !== pid
        );

        currentObject.remove();
        currentObject = null;

        objectPreview.style.backgroundImage = "";

        objectX.value = 0;
        objectY.value = 0;
        objectZ.value = 10;
        objectRX.value = 0;
        objectRY.value = 0;
        objectRZ.value = 0;
        objectScale.value = 1;
        saveWorldMapData();
    };
}

function checkTeleportCollision() {
    if(worldTeleportCooldown > Date.now()){
        if(teleportPromptOpen){
            closeDestinationWindow();
        }
        return;
    }
    if (teleportTransitioning) return;
    if (!worldMapData.teleports || worldMapData.teleports.length === 0) {
        if (teleportPromptOpen) {
            closeDestinationWindow();
        }
        return;
    }

    const left = worldPlayerX + PLAYER_HITBOX.offsetX;
    const right = left + PLAYER_HITBOX.width;
    const top = worldPlayerY + PLAYER_HITBOX.offsetY;
    const bottom = top + PLAYER_HITBOX.height;

    const points = [
        { x: left, y: top },
        { x: right, y: top },
        { x: left, y: bottom },
        { x: right, y: bottom }
    ];

    let foundTeleport = null;

    for (const point of points) {
        const index = getWorldIndexFromXY(point.x, point.y);

        const teleport = worldMapData.teleports.find(tp =>
            Number(tp.index) === Number(index)
        );

        if (teleport) {
            foundTeleport = teleport;
            break;
        }
    }

    // ── If standing on a teleport
    if (foundTeleport) {
        if (!teleportPromptOpen) {
            openDestinationWindow(foundTeleport);
        }
    }
    // ── If stepped off the teleport
    else {
        if (teleportPromptOpen) {
            closeDestinationWindow();
        }
    }
}

function getSavedLevelsSafe(){
    try{
        const saved = JSON.parse(localStorage.getItem("levels") || "[]");
        return Array.isArray(saved) ? saved : [];
    }catch(err){
        console.warn("Could not read saved levels:", err);
        return [];
    }
}

function getLevelNameById(levelId) {
    const savedLevels = getSavedLevelsSafe();

    const level = savedLevels.find(l =>
        String(l.id) === String(levelId)
    );

    return level ? level.name : "Unknown Destination";
}

function openDestinationWindow(teleport) {
    if (!teleport || teleport.destination_level_id === null) {
        // console.log("Teleport has no destination yet.");
        return;
    }

    activeTeleportPrompt = teleport;
    teleportPromptOpen = true;

    const roomName = getLevelNameById(teleport.destination_level_id);

    destinationName.textContent = ` ${roomName}?`;
    exitToDestinationWindow.style.display = "flex";
}

function closeDestinationWindow() {
    exitToDestinationWindow.style.display = "none";
    destinationName.textContent = "";
    activeTeleportPrompt = null;
    teleportPromptOpen = false;
}

if (destinationWindowExit) destinationWindowExit.onclick = closeDestinationWindow;
if (enterDestinationNo) enterDestinationNo.onclick = closeDestinationWindow;

if (enterDestinationYes) {
    enterDestinationYes.addEventListener("click", function(){
        if(typeof activeRoomLandmark !== "undefined" && activeRoomLandmark){
            return;
        }

        if(!activeTeleportPrompt) return;

        const levelId = activeTeleportPrompt.destination_level_id;
        beginTeleportToLevel(levelId);
    });
}

function beginTeleportToLevel(levelId){
    const targetLandmarkId =
        activeTeleportPrompt?.destination_landmark_id ?? null;

    localStorage.setItem(
        "room_entry_landmark_id",
        targetLandmarkId === null ? "" : String(targetLandmarkId)
    );

    teleportTransitioning = true;
    worldMapActive = false;

    closeDestinationWindow();

    const fadeLayer = document.getElementById("fade_layer");

    if(!fadeLayer){
        console.warn("No fade_layer found. Loading room without fade.");
        document.getElementById("world_map_screen").style.display = "none";
        document.getElementById("room_screen").style.display = "flex";
        loadRoomByLevelId(levelId);
        return;
    }

    fadeLayer.animate(
        [{ opacity: 0 }, { opacity: 1 }],
        { duration: 600, fill: "forwards" }
    ).onfinish = function(){
        closeDestinationWindow();

        document.getElementById("world_map_screen").style.display = "none";
        document.getElementById("room_screen").style.display = "flex";

        loadRoomByLevelId(levelId);

        fadeLayer.animate(
            [{ opacity: 1 }, { opacity: 0 }],
            { duration: 600, fill: "forwards" }
        );
    };
}
if(teleportBtn){
    teleportBtn.onclick = function () {
        teleportMode = !teleportMode;

        collisionMode = false;
        if (colBtn) {
            colBtn.style.backgroundColor = "";
            colBtn.style.color = "red";
        }

        teleportBtn.style.backgroundColor = teleportMode ? "blue" : "";
        teleportBtn.style.color = teleportMode ? "white" : "blue";

        populateTeleportDropdown();
    };
}

function selectOrCreateTeleport(index, spot) {
    if (!worldMapData.teleports) {
        worldMapData.teleports = [];
    }

    let teleport = worldMapData.teleports.find(tp =>
        Number(tp.index) === Number(index)
    );

    if (!teleport) {
        teleport = {
            index: Number(index),
            destination_level_id: null,
            destination_landmark_id: null
        };

        worldMapData.teleports.push(teleport);
        addTeleportMark(spot);
        saveWorldMapData();
    }

    currentTeleport = teleport;
    spot.dataset.teleport = "true";

    loadTeleportIntoEditor();
}

function loadTeleportIntoEditor() {
    if (!currentTeleport) return;

    populateTeleportDropdown();

    if(teleportDestinationSelect){
        teleportDestinationSelect.value =
            currentTeleport.destination_level_id ?? "";
    }

    populateTeleportLandmarkDropdown(currentTeleport.destination_level_id);

    if(teleportLandmarkSelect){
        teleportLandmarkSelect.value =
            currentTeleport.destination_landmark_id ?? "";
    }

    currentDestination.innerHTML = `
        Current Teleport<br>
        Tile Index: ${currentTeleport.index}<br>
        Destination Level: ${currentTeleport.destination_level_id ?? "None"}<br>
        Destination Landmark: ${currentTeleport.destination_landmark_id ?? "None"}
    `;
}

if(teleportLandmarkSelect){
    teleportLandmarkSelect.addEventListener("change", () => {
        if(!currentTeleport) return;

        currentTeleport.destination_landmark_id =
            teleportLandmarkSelect.value === ""
                ? null
                : Number(teleportLandmarkSelect.value);

        saveWorldMapData();
        loadTeleportIntoEditor();
    });
}

function populateTeleportLandmarkDropdown(levelId){
    if(!teleportLandmarkSelect) return;

    teleportLandmarkSelect.innerHTML = `
        <option value="">Choose Landmark</option>
    `;

    if(!levelId) return;

    const savedLevels = getSavedLevelsSafe();

    const level = savedLevels.find(l =>
        String(l.id) === String(levelId)
    );

    if(!level || !Array.isArray(level.landmarks)) return;

    level.landmarks.forEach(landmark => {
        const option = document.createElement("option");
        option.value = String(landmark.landmark_id);
        option.textContent = `Landmark ${landmark.landmark_id} - ${landmark.exit_type || "no exit"}`;
        teleportLandmarkSelect.appendChild(option);
    });
}

if(teleportDestinationSelect){
    teleportDestinationSelect.addEventListener("change", () => {
        if (!currentTeleport) return;

        currentTeleport.destination_level_id =
            teleportDestinationSelect.value === ""
                ? null
                : Number(teleportDestinationSelect.value);

        currentTeleport.destination_landmark_id = null;

        populateTeleportLandmarkDropdown(currentTeleport.destination_level_id);
        loadTeleportIntoEditor();
        saveWorldMapData();
    });
}

if (deleteTeleport){
    deleteTeleport.onclick = function () {
        if (!currentTeleport) return;

        const index = Number(currentTeleport.index);

        worldMapData.teleports = worldMapData.teleports.filter(tp =>
            Number(tp.index) !== index
        );

        const spot = world.querySelector(`.world_spot[data-world-index="${index}"]`);
        if (spot) {
            spot.dataset.teleport = "false";
            removeTeleportMark(spot);
        }

        currentTeleport = null;
        teleportDestinationSelect.value = "";
        currentDestination.innerHTML = "";

        saveWorldMapData();
    };
}

function addTeleportMark(spot) {
    let mark = spot.querySelector(".teleport_mark");

    if (!mark) {
        mark = document.createElement("div");
        mark.classList.add("teleport_mark");
        mark.textContent = "T";

        Object.assign(mark.style, {
            width: "100%",
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "blue",
            fontWeight: "bold",
            fontSize: "18px",
            pointerEvents: "none"
        });

        spot.appendChild(mark);
    }
}

function removeTeleportMark(spot) {
    const mark = spot.querySelector(".teleport_mark");
    if (mark) mark.remove();
}


// ─── Save / Load ───────────────────────────────────────────────────────────

const WORLD_MAP_KEY = "world_map_data";

let worldMapData = {
    map_transform: {
        x: 0,
        y: 0,
        z: 0,
        rx: 45,
        ry: 0,
        rz: 0
    },
    tiles: [],
    objects: [],
    collisions: [],
    teleports: [],
    player: {
        x: 300,
        y: 300,
        z: 16,
        facing: "right"
    }
};

function saveWorldMapData() {
    worldMapData.map_transform = worldMapData.map_transform || {};

    if (isWorldEditorMode) {
        worldMapData.map_transform = {
            x: mapX ? Number(mapX.value || 0) : 0,
            y: mapY ? Number(mapY.value || 0) : 0,
            z: mapZ ? Number(mapZ.value || 0) : 0,
            rx: rotX ? Number(rotX.value || 0) : 0,
            ry: rotY ? Number(rotY.value || 0) : 0,
            rz: rotZ ? Number(rotZ.value || 0) : 0
        };
    }

    worldMapData.objects = worldObjects;

    worldMapData.player = {
        x: worldPlayerX,
        y: worldPlayerY,
        z: worldPlayerZ,
        facing: worldPlayerFacing
    };

    localStorage.setItem(
        WORLD_MAP_KEY,
        JSON.stringify(worldMapData)
    );
}

function loadWorldMapData() {
    const saved = localStorage.getItem(WORLD_MAP_KEY);
    if (!saved) return;

    worldMapData = JSON.parse(saved);

    const t = worldMapData.map_transform || {};

    if (mapX) mapX.value = t.x ?? 0;
    if (mapY) mapY.value = t.y ?? 0;
    if (mapZ) mapZ.value = t.z ?? 0;
    if (rotX) rotX.value = t.rx ?? 45;
    if (rotY) rotY.value = t.ry ?? 0;
    if (rotZ) rotZ.value = t.rz ?? 0;

    if (isWorldEditorMode) {
        updateMapTransform();
    }

    const allSpots = [...world.querySelectorAll(".world_spot")];

    (worldMapData.tiles || []).forEach(tile => {
        const spot = allSpots[tile.index];
        if (!spot) return;

        spot.style.backgroundImage = `url(./images/tile${tile.tile_id}.png)`;
        spot.style.backgroundSize = "24px 24px";
    });

    
    worldMapData.collisions = worldMapData.collisions.filter(i => typeof i === "number");

    worldMapData.collisions.forEach(index => {
        const spot = world.querySelector(`.world_spot[data-world-index="${index}"]`);
        if (!spot) return;

        spot.dataset.collision = "true";
        addCollisionMark(spot);
    });

    if (!worldMapData.teleports) {
        worldMapData.teleports = [];
    }

    worldMapData.teleports = worldMapData.teleports.filter(tp =>
        tp && typeof tp.index === "number"
    );

    worldMapData.teleports.forEach(tp => {
        const spot = world.querySelector(`.world_spot[data-world-index="${tp.index}"]`);
        if (!spot) return;

        spot.dataset.teleport = "true";
        addTeleportMark(spot);
    });

    worldObjects = worldMapData.objects || [];

    document.querySelectorAll(".world_object").forEach(obj => obj.remove());

    worldObjects.forEach(rec => {
        const objEl = document.createElement("div");

        objEl.classList.add("world_object");
        objEl.dataset.pid = rec.pid;
        objEl.dataset.objectId = rec.sprite_id;

        Object.assign(objEl.style, {
            width: "120px",
            height: "120px",
            position: "absolute",
            left: "0px",
            top: "0px",
            backgroundImage: `url(./images/object${rec.sprite_id}.png)`,
            backgroundSize: "contain",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
            pointerEvents: "auto",
            cursor: "pointer",
            transformStyle: "preserve-3d"
        });

        levelTestHolder.appendChild(objEl);

        objEl.style.transform = `
            translateX(${rec.x}px)
            translateY(${rec.y}px)
            translateZ(${rec.z}px)
            rotateX(${rec.rx}deg)
            rotateY(${rec.ry}deg)
            rotateZ(${rec.rz}deg)
            scale(${rec.scale})
        `;
    });

    objectPidCounter =
        worldObjects.length > 0
            ? Math.max(...worldObjects.map(obj => Number(obj.pid))) + 1
            : 1;

    if (worldMapData.player) {
        worldPlayerX = Number(worldMapData.player.x ?? 300);
        worldPlayerY = Number(worldMapData.player.y ?? 300);
        worldPlayerZ = Number(worldMapData.player.z ?? 16);
        worldPlayerFacing = worldMapData.player.facing ?? "right";
    }
    if (!isWorldEditorMode) {

        cameraMode = "game";

        worldMapData.map_transform = {
            x: TOP_CAM_CENTER_X - worldPlayerX,
            y: TOP_CAM_CENTER_Y - worldPlayerY,
            z: TOP_CAM_Z,
            rx: TOP_CAM_RX,
            ry: 0,
            rz: 0
        };

        updateMapTransformFromData();
    }

}


// ─── Collision mode toggle ─────────────────────────────────────────────────
if (colBtn){
    colBtn.onclick = function () {
        collisionMode = !collisionMode;

        colBtn.style.backgroundColor = collisionMode ? "red" : "";
        colBtn.style.color = collisionMode ? "white" : "red";
    };
}

function toggleCollision(index, spot) {
    

    const exists = worldMapData.collisions.includes(index);

    if (exists) {
        worldMapData.collisions = worldMapData.collisions.filter(i => i !== index);
        spot.dataset.collision = "false";
        removeCollisionMark(spot);
    } else {
        worldMapData.collisions.push(index);
        spot.dataset.collision = "true";
        addCollisionMark(spot);
    }

    saveWorldMapData();
}

function addCollisionMark(spot) {
    let mark = spot.querySelector(".collision_mark");

    if (!mark) {
        mark = document.createElement("div");
        mark.classList.add("collision_mark");
        mark.textContent = "X";

        Object.assign(mark.style, {
            width: "100%",
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "red",
            fontWeight: "bold",
            fontSize: "18px",
            pointerEvents: "none"
        });

        spot.appendChild(mark);
    }
}

function removeCollisionMark(spot) {
    const mark = spot.querySelector(".collision_mark");
    if (mark) mark.remove();
}


// ─── Player ────────────────────────────────────────────────────────────────

let worldPlayerEl = null;
let worldSquadEls = [];

function renderWorldPlayer() {
    // clear old leader
    if (worldPlayerEl) {
        worldPlayerEl.remove();
    }

    // clear old squad members
    worldSquadEls.forEach(el => el.remove());
    worldSquadEls = [];

    const squadMembers = getWorldSquadMembers();

    squadMembers.forEach(member => {
        const avatar = getAvatarByIdForWorld(member.avatar_id);
        if (!avatar) return;

        const isLeader = Number(member.slot) === 0;

        const el = document.createElement("div");

        el.className = isLeader
            ? "world_player"
            : "world_squad_member";

        el.dataset.slot = member.slot;
        el.dataset.avatarId = member.avatar_id;

        if (isLeader) {
            el.id = "world_player";
        }

        const idleImage =
            avatar.image_idle ||
            `spr_character_idle_${avatar.id}.gif`;

        Object.assign(el.style, {
            width: "32px",
            height: "32px",
            position: "absolute",
            left: "0px",
            top: "0px",
            backgroundImage: `url(./images/${idleImage})`,
            backgroundSize: "contain",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "bottom",
            pointerEvents: "none",
            transformStyle: "preserve-3d",
            zIndex: isLeader ? "50" : "45"
        });

        levelTestHolder.appendChild(el);

        if (isLeader) {
            worldPlayerEl = el;
            const action_ballon = document.createElement("div");
            el.appendChild(action_ballon);

            Object.assign(action_ballon.style, {
                width: "12px",
                height: "12px",
                borderRadius: "32px",
                backgroundColor: "ghostwhite",
                position: "relative",
                top: "-12px",
                left: "9px",
                display: "none",
                flexDirection: "column",
                justifyContent: "center",
                textAlign: "center",
                fontSize: "12px"
            });

            action_ballon.innerHTML = "!";
        } else {

            el.dataset.visualX = worldPlayerX;
            el.dataset.visualY = worldPlayerY;
            el.dataset.visualZ = worldPlayerZ;

            worldSquadEls.push(el);
        }
    });

    syncWorldPlayerFree();
    syncWorldSquadMembersFollow(false);
    checkTeleportCollision();
}

function syncWorldSquadMembersStatic() {
    if (!worldSquadEls.length) return;

    const offsets = {
        1: { x: -24, y: 2, z: 0 },
        2: { x: -48, y: 2, z: 0 }
    };

    worldSquadEls.forEach(el => {
        const slot = Number(el.dataset.slot);
        const offset = offsets[slot] || { x: -24 * slot, y: 20 * slot, z: 8 };

        el.style.transform = `
            translateX(${worldPlayerX + offset.x}px)
            translateY(${worldPlayerY + offset.y}px)
            translateZ(${worldPlayerZ - offset.z}px)
            rotateX(-45deg)
            scaleX(${worldPlayerFacing === "left" ? -1 : 1})
        `;
    });
}


function syncWorldPlayerFree() {
    if (!worldPlayerEl) return;

    worldPlayerEl.style.transform = `
        translateX(${worldPlayerX}px)
        translateY(${worldPlayerY}px)
        translateZ(${worldPlayerZ}px)
        rotateX(-45deg)
        scaleX(${worldPlayerFacing === "left" ? -1 : 1})
    `;
}

function getWorldSpotPosition(index) {
    const allSpots = [...world.querySelectorAll(".world_spot")];
    const spot = allSpots[index];

    if (!spot) return null;

    return {
        x: spot.offsetLeft - 4,
        y: spot.offsetTop - 3
    };
}

// FIX: Per-axis collision checks so player slides along walls diagonally
// instead of getting hard-stopped. Bounds guard lives in canPlayerMoveTo.
function updateWorldPlayerFree() {
    if (!worldPlayerEl) return;

    let moving = false;
    let nextX = worldPlayerX;
    let nextY = worldPlayerY;

    if (worldInput.left && !worldInput.right) {
        nextX -= worldPlayerSpeed;
        worldPlayerFacing = "left";
        moving = true;
    }

    if (worldInput.right && !worldInput.left) {
        nextX += worldPlayerSpeed;
        worldPlayerFacing = "right";
        moving = true;
    }

    if (worldInput.up && !worldInput.down) {
        nextY -= worldPlayerSpeed;
        worldPlayerFacing = "up";
        moving = true;
    }

    if (worldInput.down && !worldInput.up) {
        nextY += worldPlayerSpeed;
        worldPlayerFacing = "down";
        moving = true;
    }

    // Test each axis independently — allows wall-sliding on diagonal movement
    const canX = canPlayerMoveTo(nextX, worldPlayerY);
    const canY = canPlayerMoveTo(worldPlayerX, nextY);

    let actuallyMoved = false;

    if (canX && nextX !== worldPlayerX) {
        worldPlayerX = nextX;
        actuallyMoved = true;
    }

    if (canY && nextY !== worldPlayerY) {
        worldPlayerY = nextY;
        actuallyMoved = true;
    }

    worldPlayerEl.style.backgroundImage = actuallyMoved
        ? "url(./images/spr_character_0_walk.gif)"
        : "url(./images/spr_character_idle_0.gif)";

    syncWorldPlayerFree();
    recordWorldLeaderTrail(actuallyMoved);
    syncWorldSquadMembersFollow(actuallyMoved);
    checkTeleportCollision();

    if (moving) {
        debouncedSave();
    }

    if (cameraMode === "game") {
        followWorldPlayerCameraSmooth();
    }
}

function getWorldAvatarImage(avatar, moving, facing) {
    if (!avatar) return "spr_character_idle_0.gif";

    if (!moving) {
        return avatar.image_idle || `spr_character_idle_${avatar.id}.gif`;
    }

    if (facing === "up") {
        return avatar.image_world_up || avatar.image_walk || avatar.image_idle;
    }

    if (facing === "down") {
        return avatar.image_world_down || avatar.image_walk || avatar.image_idle;
    }

    if (facing === "left") {
        return avatar.image_world_left || avatar.image_walk || avatar.image_idle;
    }

    if (facing === "right") {
        return avatar.image_world_right || avatar.image_walk || avatar.image_idle;
    }

    return avatar.image_walk || avatar.image_idle || `spr_character_idle_${avatar.id}.gif`;
}

function recordWorldLeaderTrail(moving) {
    if (!moving) return;

    const last = worldFollowTrail[0];

    if (
        last &&
        Math.abs(last.x - worldPlayerX) < 2 &&
        Math.abs(last.y - worldPlayerY) < 2
    ) {
        return;
    }

    worldFollowTrail.unshift({
        x: worldPlayerX,
        y: worldPlayerY,
        z: worldPlayerZ,
        facing: worldPlayerFacing
    });

    if (worldFollowTrail.length > WORLD_TRAIL_MAX) {
        worldFollowTrail.length = WORLD_TRAIL_MAX;
    }
}

function syncWorldSquadMembersFollow(moving) {
    if (!worldSquadEls.length) return;

    worldSquadEls.forEach(el => {
        const slot = Number(el.dataset.slot);
        const avatar = getAvatarByIdForWorld(el.dataset.avatarId);

        const trailIndex = slot * WORLD_FOLLOW_GAP;
        const point = worldFollowTrail[trailIndex];

        const target = point || {
            x: worldPlayerX - (24 * slot),
            y: worldPlayerY + (2 * slot),
            z: worldPlayerZ,
            facing: worldPlayerFacing
        };

        let visualX = Number(el.dataset.visualX ?? target.x);
        let visualY = Number(el.dataset.visualY ?? target.y);
        let visualZ = Number(el.dataset.visualZ ?? target.z);

        const dx = target.x - visualX;
        const dy = target.y - visualY;
        const distance = Math.hypot(dx, dy);

        if (distance > WORLD_FOLLOW_SNAP_DISTANCE) {
            visualX = target.x;
            visualY = target.y;
            visualZ = target.z;
        } else {
            visualX += dx * WORLD_FOLLOW_SMOOTH;
            visualY += dy * WORLD_FOLLOW_SMOOTH;
            visualZ += (target.z - visualZ) * WORLD_FOLLOW_SMOOTH;
        }

        el.dataset.visualX = visualX;
        el.dataset.visualY = visualY;
        el.dataset.visualZ = visualZ;

        el.style.transform = `
            translateX(${visualX}px)
            translateY(${visualY}px)
            translateZ(${visualZ}px)
            rotateX(-45deg)
            scaleX(${target.facing === "left" ? -1 : 1})
        `;

        el.style.backgroundImage =
            `url(./images/${getWorldAvatarImage(avatar, moving, target.facing)})`;
    });
}

function worldGameLoop() {
    if (worldMapActive) {
        updateWorldPlayerFree();
    }

    requestAnimationFrame(worldGameLoop);
}

function getWorldLeaderAvatarSprite() {
    if (typeof current_squad === "undefined") return "./images/spr_character_idle_0.gif";

    const leader = current_squad.find(member => member.slot === 0);
    if (!leader) return "./images/spr_character_idle_0.gif";

    return `./images/spr_character_idle_${leader.avatar_id}.gif`;
}

function getAvatarByIdForWorld(avatarId) {
    if (typeof avatars === "undefined") return null;

    return avatars.find(avatar =>
        Number(avatar.id) === Number(avatarId)
    ) || null;
}

function getWorldSquadMembers() {
    if (typeof current_squad === "undefined") return [];

    return [...current_squad]
        .filter(member =>
            member &&
            member.user_id !== null &&
            member.avatar_id !== null
        )
        .sort((a, b) => Number(a.slot) - Number(b.slot));
}

function resetWorldSquadVisualPositions(){
    worldFollowTrail = [];

    for(let i = 0; i < WORLD_TRAIL_MAX; i++){
        worldFollowTrail.push({
            x: worldPlayerX,
            y: worldPlayerY,
            z: worldPlayerZ,
            facing: worldPlayerFacing
        });
    }

    worldSquadEls.forEach(el => {
        el.dataset.visualX = worldPlayerX;
        el.dataset.visualY = worldPlayerY;
        el.dataset.visualZ = worldPlayerZ;
    });

    syncWorldPlayerFree();
    syncWorldSquadMembersFollow(false);
}

// ─── Camera ────────────────────────────────────────────────────────────────

if (editorCameraBtn) {
        editorCameraBtn.onclick = function () {
        cameraMode = "editor";

        editorCameraBtn.style.backgroundColor = "purple";
        gameCameraBtn.style.backgroundColor = "black";
    };
}

if (gameCameraBtn) {
        gameCameraBtn.onclick = function () {
        cameraMode = "game";

        gameCameraBtn.style.backgroundColor = "purple";
        editorCameraBtn.style.backgroundColor = "black";

        followWorldPlayerCamera();
    };
}

function followWorldPlayerCameraSmooth() {
    if (!levelTestHolder) return;

    const targetX = TOP_CAM_CENTER_X - worldPlayerX;
    const targetY = TOP_CAM_CENTER_Y - worldPlayerY;

    const t = worldMapData.map_transform || {
        x: 0,
        y: 0,
        z: TOP_CAM_Z,
        rx: TOP_CAM_RX,
        ry: 0,
        rz: 0
    };

    t.x = Number(t.x || 0) + (targetX - Number(t.x || 0)) * TOP_CAM_FOLLOW_SPEED;
    t.y = Number(t.y || 0) + (targetY - Number(t.y || 0)) * TOP_CAM_FOLLOW_SPEED;
    t.z = TOP_CAM_Z;
    t.rx = TOP_CAM_RX;
    t.ry = 0;
    t.rz = 0;

    worldMapData.map_transform = t;

    updateMapTransformFromData();
}

function followWorldPlayerCamera() {
    if (!levelTestHolder) return;

    worldMapData.map_transform = {
        x: TOP_CAM_CENTER_X - worldPlayerX,
        y: TOP_CAM_CENTER_Y - worldPlayerY,
        z: TOP_CAM_Z,
        rx: TOP_CAM_RX,
        ry: 0,
        rz: 0
    };

    updateMapTransformFromData();
}

function updateMapTransformFromData() {
    if (!levelTestHolder) return;

    const t = worldMapData.map_transform || {};

    levelTestHolder.style.transform = `
        translateX(${Number(t.x || 0)}px)
        translateY(${Number(t.y || 0)}px)
        translateZ(${Number(t.z || 0)}px)
        rotateX(${Number(t.rx || 0)}deg)
        rotateY(${Number(t.ry || 0)}deg)
        rotateZ(${Number(t.rz || 0)}deg)
    `;
}


// ─── Controller buttons ────────────────────────────────────────────────────

function bindHoldButton(button, key) {
    if (!button) return;

    button.addEventListener("mousedown", () => {
        worldInput[key] = true;
    });

    button.addEventListener("mouseup", () => {
        worldInput[key] = false;
    });

    button.addEventListener("mouseleave", () => {
        worldInput[key] = false;
    });

    button.addEventListener("touchstart", e => {
        e.preventDefault();
        worldInput[key] = true;
    }, { passive: false });

    button.addEventListener("touchend", e => {
        e.preventDefault();
        worldInput[key] = false;
    }, { passive: false });
}


// ─── Collision math ────────────────────────────────────────────────────────

function getWorldIndexFromXY(x, y) {
    const col = Math.floor(x / WORLD_CELL_SIZE);
    const row = Math.floor(y / WORLD_CELL_SIZE);

    if (col < 0 || col >= WORLD_COLS) return -1;
    if (row < 0 || row >= WORLD_ROWS) return -1;

    return row * WORLD_COLS + col;
}

function canPlayerMoveTo(x, y) {
    const left = x + PLAYER_HITBOX.offsetX;
    const right = left + PLAYER_HITBOX.width;
    const top = y + PLAYER_HITBOX.offsetY;
    const bottom = top + PLAYER_HITBOX.height;

    if (left < 0 || top < 0) return false;
    if (right > WORLD_COLS * WORLD_CELL_SIZE) return false;
    if (bottom > WORLD_ROWS * WORLD_CELL_SIZE) return false;

    const points = [
        { x: left, y: top },
        { x: right, y: top },
        { x: left, y: bottom },
        { x: right, y: bottom }
    ];

    for (const point of points) {
        const index = getWorldIndexFromXY(point.x, point.y);
        if (index === -1) return false;

        if (worldMapData.collisions && worldMapData.collisions.includes(index)) {
            // console.log("Blocked collision at index:", index);
            return false;
        }
    }

    return true;
}

function populateTeleportDropdown() {
    if (!teleportDestinationSelect) return;

    teleportDestinationSelect.innerHTML = `
        <option value="">choose location</option>
    `;

    const savedLevels = getSavedLevelsSafe();

    savedLevels.forEach(level => {
        if (!level) return;

        const option = document.createElement("option");
        option.value = String(level.id);
        option.textContent = `${level.id}: ${level.name || "Unnamed Level"}`;

        teleportDestinationSelect.appendChild(option);
    });
}
// ─── Init ──────────────────────────────────────────────────────────────────

bindHoldButton(controllerUp, "up");
bindHoldButton(controllerDown, "down");
bindHoldButton(controllerLeft, "left");
bindHoldButton(controllerRight, "right");

if (
    objectX &&
    objectY &&
    objectZ &&
    objectRX &&
    objectRY &&
    objectRZ &&
    objectScale
) {
    initializeObjectSliderRanges();
}

if (tileHolder) {
    generateTilePalette();
}

if (objectHolder && objectPreview) {
    generateObjectPalette();
}

loadWorldMapData();
ensureSafeSpawn();

renderWorldPlayer();

worldFollowTrail = [];
for (let i = 0; i < WORLD_TRAIL_MAX; i++) {
    worldFollowTrail.push({
        x: worldPlayerX,
        y: worldPlayerY,
        z: worldPlayerZ,
        facing: worldPlayerFacing
    });
}

if (!isWorldEditorMode) {
    cameraMode = "game";
    followWorldPlayerCamera();
} else {
    cameraMode = "editor";
    updateMapTransform();
}

worldGameLoop();

JSON.parse(localStorage.getItem("levels")).map(l => ({
    id: l.id,
    name: l.name,
    landmarkCount: Array.isArray(l.landmarks) ? l.landmarks.length : "NO LANDMARK ARRAY",
    landmarks: l.landmarks
}));