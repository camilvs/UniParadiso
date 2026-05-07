const worldMapPreview = document.getElementById("world_map_preview");
const world = document.getElementById("world");
const levelTestHolder = document.getElementById("level_test_holder");
const WORLD_CELL_SIZE = 24;

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
let worldPlayerSpeed = 2.5;
let worldPlayerFacing = "right";

const TOP_CAM_CENTER_X = 429;
const TOP_CAM_CENTER_Y = 300;
const TOP_CAM_Z = 620;
const TOP_CAM_RX = 0;
const TOP_CAM_FOLLOW_SPEED = 0.12;

let cameraMode = "editor";

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

// Debounced save — prevents writing to localStorage 60x/second during movement
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

        console.log("Spawn adjusted to safe position");
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
            grid_spot.style.outline = "2px solid yellow";
            if (isPainting && !collisionMode && selectedTile !== null) {
                paintTile(grid_spot);
            }
        });

        grid_spot.addEventListener("mouseout", () => {
            grid_spot.style.outline = "none";
        });

        // FIX: Always compute index first, then branch — prevents undefined being
        // stored in collisions array when collision mode is active
        grid_spot.addEventListener("mousedown", () => {
            const index = Number(grid_spot.dataset.worldIndex);

            if (collisionMode) {
                toggleCollision(index, grid_spot);
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
            console.log("Blocked collision at index:", index);
            return false;
        }
    }

    return true;
}


// ─── Tile palette ──────────────────────────────────────────────────────────

const tileHolder = document.getElementById("tile_holder");

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
    levelTestHolder.style.transform = `
        translateX(${mapX.value}px)
        translateY(${mapY.value}px)
        translateZ(${mapZ.value}px)
        rotateX(${rotX.value}deg)
        rotateY(${rotY.value}deg)
        rotateZ(${rotZ.value}deg)
    `;
}

[mapX, mapY, mapZ, rotX, rotY, rotZ].forEach(slider => {
    slider.addEventListener("input", () => {
        cameraMode = "editor";
        editorCameraBtn.style.backgroundColor = "purple";
        gameCameraBtn.style.backgroundColor = "black";

        updateMapTransform();
        saveWorldMapData();
    });
});

resetBtn.addEventListener("click", () => {
    mapX.value = 0;
    mapY.value = 0;
    mapZ.value = 0;
    rotX.value = 15;
    rotY.value = 0;
    rotZ.value = 0;

    updateMapTransform();
    saveWorldMapData();
});

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
    slider.addEventListener("input", () => {
        const rec = getCurrentObjectRecord();
        if (!rec) return;

        rec.x = Number(objectX.value);
        rec.y = Number(objectY.value);
        rec.z = Number(objectZ.value);
        rec.rx = Number(objectRX.value);
        rec.ry = Number(objectRY.value);
        rec.rz = Number(objectRZ.value);
        rec.scale = Number(objectScale.value);

        applyObjectTransform();
        saveWorldMapData();
    });
});

worldMapPreview.addEventListener("click", e => {
    const objEl = e.target.closest(".world_object");
    if (!objEl) return;

    e.stopPropagation();
    loadObjectIntoEditor(objEl);
});

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
    player: {
        x: 300,
        y: 300,
        z: 16,
        facing: "right"
    }
};

function saveWorldMapData() {
    worldMapData.map_transform = {
        x: Number(mapX.value || 0),
        y: Number(mapY.value || 0),
        z: Number(mapZ.value || 0),
        rx: Number(rotX.value || 0),
        ry: Number(rotY.value || 0),
        rz: Number(rotZ.value || 0)
    };

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

    mapX.value = t.x ?? 0;
    mapY.value = t.y ?? 0;
    mapZ.value = t.z ?? 0;
    rotX.value = t.rx ?? 45;
    rotY.value = t.ry ?? 0;
    rotZ.value = t.rz ?? 0;

    updateMapTransform();

    const allSpots = [...world.querySelectorAll(".world_spot")];

    (worldMapData.tiles || []).forEach(tile => {
        const spot = allSpots[tile.index];
        if (!spot) return;

        spot.style.backgroundImage = `url(./images/tile${tile.tile_id}.png)`;
        spot.style.backgroundSize = "24px 24px";
    });

    

    // FIX: Purge any undefined/corrupted collision entries from previous saves
    worldMapData.collisions = worldMapData.collisions.filter(i => typeof i === "number");

    worldMapData.collisions.forEach(index => {
        const spot = world.querySelector(`.world_spot[data-world-index="${index}"]`);
        if (!spot) return;

        spot.dataset.collision = "true";
        addCollisionMark(spot);
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
}


// ─── Collision mode toggle ─────────────────────────────────────────────────

colBtn.onclick = function () {
    collisionMode = !collisionMode;

    colBtn.style.backgroundColor = collisionMode ? "red" : "";
    colBtn.style.color = collisionMode ? "white" : "red";
};

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

function renderWorldPlayer() {
    if (worldPlayerEl) {
        worldPlayerEl.remove();
    }

    worldPlayerEl = document.createElement("div");
    worldPlayerEl.id = "world_player";

    Object.assign(worldPlayerEl.style, {
        width: "32px",
        height: "32px",
        position: "absolute",
        left: "0px",
        top: "0px",
        backgroundImage: "url(./images/spr_character_idle_0.gif)",
        backgroundSize: "contain",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "bottom",
        pointerEvents: "none",
        transformStyle: "preserve-3d",
        zIndex: "50"
    });

    levelTestHolder.appendChild(worldPlayerEl);
    syncWorldPlayerFree();
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
        moving = true;
    }

    if (worldInput.down && !worldInput.up) {
        nextY += worldPlayerSpeed;
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

    if (moving) {
        debouncedSave();
    }

    if (cameraMode === "game") {
        followWorldPlayerCameraSmooth();
    }
}

function worldGameLoop() {
    updateWorldPlayerFree();
    requestAnimationFrame(worldGameLoop);
}

function getWorldLeaderAvatarSprite() {
    if (typeof current_squad === "undefined") return "./images/spr_character_idle_0.gif";

    const leader = current_squad.find(member => member.slot === 0);
    if (!leader) return "./images/spr_character_idle_0.gif";

    return `./images/spr_character_idle_${leader.avatar_id}.gif`;
}


// ─── Camera ────────────────────────────────────────────────────────────────

editorCameraBtn.onclick = function () {
    cameraMode = "editor";

    editorCameraBtn.style.backgroundColor = "purple";
    gameCameraBtn.style.backgroundColor = "black";
};

gameCameraBtn.onclick = function () {
    cameraMode = "game";

    gameCameraBtn.style.backgroundColor = "purple";
    editorCameraBtn.style.backgroundColor = "black";

    followWorldPlayerCamera();
};

function followWorldPlayerCameraSmooth() {
    const targetX = TOP_CAM_CENTER_X - worldPlayerX;
    const targetY = TOP_CAM_CENTER_Y - worldPlayerY;

    const currentX = Number(mapX.value || 0);
    const currentY = Number(mapY.value || 0);

    mapX.value = currentX + (targetX - currentX) * TOP_CAM_FOLLOW_SPEED;
    mapY.value = currentY + (targetY - currentY) * TOP_CAM_FOLLOW_SPEED;
    mapZ.value = TOP_CAM_Z;

    rotX.value = TOP_CAM_RX;
    rotY.value = 0;
    rotZ.value = 0;

    updateMapTransform();
}

function followWorldPlayerCamera() {
    mapX.value = TOP_CAM_CENTER_X - worldPlayerX;
    mapY.value = TOP_CAM_CENTER_Y - worldPlayerY;
    mapZ.value = TOP_CAM_Z;

    rotX.value = TOP_CAM_RX;
    rotY.value = 0;
    rotZ.value = 0;

    updateMapTransform();
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

// FIX: Bounds guard added here (correct location), and hitbox corners checked
// against the collision array using numeric indices only
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
            console.log("Blocked collision at index:", index);
            return false;
        }
    }

    return true;
}


// ─── Init ──────────────────────────────────────────────────────────────────

bindHoldButton(controllerUp, "up");
bindHoldButton(controllerDown, "down");
bindHoldButton(controllerLeft, "left");
bindHoldButton(controllerRight, "right");

initializeObjectSliderRanges();
generateTilePalette();
generateObjectPalette();
loadWorldMapData();
ensureSafeSpawn();

// FIX: Declared here (after all functions are defined) so getWorldIndexFromXY
// exists when this line runs. Properly scoped with let.
let worldPlayerIndex = getWorldIndexFromXY(worldPlayerX, worldPlayerY);

renderWorldPlayer();
followWorldPlayerCamera();
worldGameLoop();