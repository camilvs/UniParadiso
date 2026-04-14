const TILE = 120;

// ---------- shared level storage helpers ----------
function ensureLevelShape(level){
    if(!level) return null;

    level.faces ??= {
        face_back: [],
        face_left: [],
        face_right: [],
        face_top: [],
        face_bottom: [],
    };

    level.objects = Array.isArray(level.objects) ? level.objects : [];
    level.npcs = Array.isArray(level.npcs) ? level.npcs : [];
    level.treasure_boxes = Array.isArray(level.treasure_boxes) ? level.treasure_boxes : [];
    level.enemy_encounters = Array.isArray(level.enemy_encounters) ? level.enemy_encounters : [];
    level.landmarks = Array.isArray(level.landmarks) ? level.landmarks : [];

    return level;
}

function loadSavedLevels(){
    const saved = localStorage.getItem("levels");

    if(!saved){
        return [];
    }

    try{
        const parsed = JSON.parse(saved);

        if(!Array.isArray(parsed)){
            return [];
        }

        return parsed.map(level => ensureLevelShape(level));
    }catch(err){
        console.error("Failed to parse saved levels:", err);
        return [];
    }
}

function getTestLevel(levels){
    const testLevelId = localStorage.getItem("test_level_id");

    if(!testLevelId){
        return null;
    }

    const found = levels.find(level => String(level.id) === String(testLevelId));
    return found ? ensureLevelShape(found) : null;
}

function buildLevel(level){
    if(!level) return;

    if(level.size === "room" || level.size === "small"){
        buildSmallRoomLevel(level);   // 5x5
    } 
    else if(level.size === "mid"){
        buildMidLevel(level);         // 10x5
    } 
    else if(level.size === "large"){
        buildLargeLevel(level);       // 20x5
    }
}

function createFaces(){
    cube.innerHTML = "";

    const face_back = document.createElement('div');
    const face_left = document.createElement('div');
    const face_right = document.createElement('div');
    const face_bottom = document.createElement('div');
    const face_top = document.createElement('div');

    face_back.id = 'face_back';
    face_left.id = 'face_left';
    face_right.id = 'face_right';
    face_bottom.id = 'face_bottom';
    face_top.id = 'face_top';

    cube.appendChild(face_back);
    cube.appendChild(face_left);
    cube.appendChild(face_right);
    cube.appendChild(face_bottom);
    cube.appendChild(face_top);

    cube_sides_array = [face_back, face_left, face_right, face_bottom, face_top];

    return { face_back, face_left, face_right, face_bottom, face_top };
}

function makeGrid(face, cols, rows, tileSize){
    Object.assign(face.style, {
        display: 'grid',
        gridTemplateColumns: `repeat(${cols}, ${tileSize}px)`,
        gridTemplateRows: `repeat(${rows}, ${tileSize}px)`
    });
}

function addTiles(face, cols, rows, tileSize){
    face.innerHTML = "";

    for(let i = 0; i < cols * rows; i++){
        const tile = document.createElement('div');
        tile.classList.add('tile');
        tile.dataset.index = i;

        Object.assign(tile.style, {
            width: tileSize + "px",
            height: tileSize + "px",
            boxSizing: "border-box",
            border: '1px solid rgba(255,255,255,0)'
        });

        face.appendChild(tile);
    }
}

function buildSmallRoomLevel(level){
    const cols = 5;
    const rows = 5;
    const sideCols = 5;
    const tileSize = 120;

    const ROOM_WIDTH = tileSize * cols;
    const ROOM_HEIGHT = tileSize * rows;
    const SIDE_WIDTH = tileSize * sideCols;

    const { face_back, face_left, face_right, face_bottom, face_top } = createFaces();

    Object.assign(cube.style, {
        width: ROOM_WIDTH + 'px',
        height: ROOM_HEIGHT + 'px',
        position: 'relative',
        transformStyle: 'preserve-3d',
        margin: '0 auto',
        transform: 'translateZ(0px)',
        top: '-500px'
    });

    const faceBase = {
        position: 'absolute',
        opacity: 1,
        backgroundSize: tileSize + 'px'
    };

    Object.assign(face_back.style, faceBase, {
        width: ROOM_WIDTH + 'px',
        height: '480px',
        transform: `rotateY(180deg) translateZ(300px)`,
        top: '510px'
    });

    Object.assign(face_left.style, faceBase, {
        width: SIDE_WIDTH + 'px',
        height: '480px',
        left: '0px',
        transform: `rotateY(-90deg) translateZ(300px)`,
        top: '510px'
    });

    Object.assign(face_right.style, faceBase, {
        width: SIDE_WIDTH + 'px',
        height: '480px',
        left: '0px',
        transform: `rotateY(90deg) translateZ(300px)`,
        top: '510px'
    });

    Object.assign(face_bottom.style, faceBase, {
        width: ROOM_WIDTH + 'px',
        height: ROOM_HEIGHT + 'px',
        top: '300px',
        transform: `rotateX(-90deg) translateZ(390px)`
    });

    Object.assign(face_top.style, faceBase, {
        width: ROOM_WIDTH + 'px',
        height: ROOM_HEIGHT + 'px',
        top: '300px',
        transform: `rotateX(-90deg) translateZ(0px)`
    });

    addTiles(face_back, cols, rows, tileSize);
    addTiles(face_left, sideCols, rows, tileSize);
    addTiles(face_right, sideCols, rows, tileSize);
    addTiles(face_bottom, cols, rows, tileSize);
    addTiles(face_top, cols, rows, tileSize);

    makeGrid(face_back, cols, rows, tileSize);
    makeGrid(face_left, sideCols, rows, tileSize);
    makeGrid(face_right, sideCols, rows, tileSize);
    makeGrid(face_bottom, cols, rows, tileSize);
    makeGrid(face_top, cols, rows, tileSize);
}

function buildMidLevel(level){
    const cols = 10;
    const rows = 5;
    const sideCols = 5;
    const tileSize = 120;

    const ROOM_WIDTH = tileSize * cols;
    const ROOM_HEIGHT = tileSize * rows;
    const SIDE_WIDTH = tileSize * sideCols;

    const { face_back, face_left, face_right, face_bottom, face_top } = createFaces();

    Object.assign(cube.style, {
        width: ROOM_WIDTH + 'px',
        height: ROOM_HEIGHT + 'px',
        position: 'relative',
        transformStyle: 'preserve-3d',
        margin: '0 auto',
        transform: 'translateZ(0px)',
        top: '-500px'
    });

    const faceBase = {
        position: 'absolute',
        opacity: 1,
        backgroundSize: tileSize + 'px'
    };

    Object.assign(face_back.style, faceBase, {
        width: ROOM_WIDTH + 'px',
        height: '480px',
        transform: `rotateY(180deg) translateZ(300px)`,
        top: '510px'
    });

    Object.assign(face_left.style, faceBase, {
        width: SIDE_WIDTH + 'px',
        height: '480px',
        left: '0px',
        transform: `rotateY(-90deg) translateZ(300px)`,
        top: '510px'
    });

    Object.assign(face_right.style, faceBase, {
        width: SIDE_WIDTH + 'px',
        height: '480px',
        left: (ROOM_WIDTH - SIDE_WIDTH) + 'px',
        transform: `rotateY(90deg) translateZ(300px)`,
        top: '510px'
    });

    Object.assign(face_bottom.style, faceBase, {
        width: ROOM_WIDTH + 'px',
        height: ROOM_HEIGHT + 'px',
        top: '300px',
        transform: `rotateX(-90deg) translateZ(390px)`,
    });

    Object.assign(face_top.style, faceBase, {
        width: ROOM_WIDTH + 'px',
        height: ROOM_HEIGHT + 'px',
        top: '300px',
        transform: `rotateX(-90deg) translateZ(0px)`,
    });

    addTiles(face_back, cols, rows, tileSize);
    addTiles(face_left, sideCols, rows, tileSize);
    addTiles(face_right, sideCols, rows, tileSize);
    addTiles(face_bottom, cols, rows, tileSize);
    addTiles(face_top, cols, rows, tileSize);

    makeGrid(face_back, cols, rows, tileSize);
    makeGrid(face_left, sideCols, rows, tileSize);
    makeGrid(face_right, sideCols, rows, tileSize);
    makeGrid(face_bottom, cols, rows, tileSize);
    makeGrid(face_top, cols, rows, tileSize);
}

function buildLargeLevel(level){
    const cols = 20;
    const rows = 5;
    const sideCols = 5;
    const tileSize = 120;

    const ROOM_WIDTH = tileSize * cols;
    const ROOM_HEIGHT = tileSize * rows;
    const SIDE_WIDTH = tileSize * sideCols;

    const { face_back, face_left, face_right, face_bottom, face_top } = createFaces();

    Object.assign(cube.style, {
        width: ROOM_WIDTH + 'px',
        height: ROOM_HEIGHT + 'px',
        position: 'relative',
        transformStyle: 'preserve-3d',
        margin: '0 auto',
        transform: 'translateZ(0px)',
        top: '-500px'
    });

    const faceBase = {
        position: 'absolute',
        opacity: 1,
        backgroundSize: tileSize + 'px'
    };

    Object.assign(face_back.style, faceBase, {
        width: ROOM_WIDTH + 'px',
        height: '480px',
        transform: `rotateY(180deg) translateZ(300px)`,
        top: '510px'
    });

    Object.assign(face_left.style, faceBase, {
        width: SIDE_WIDTH + 'px',
        height: '480px',
        left: '0px',
        transform: `rotateY(-90deg) translateZ(300px)`,
        top: '510px'
    });

    Object.assign(face_right.style, faceBase, {
        width: SIDE_WIDTH + 'px',
        height: '480px',
        left: (ROOM_WIDTH - SIDE_WIDTH) + 'px',
        transform: `rotateY(90deg) translateZ(300px)`,
        top: '510px'
    });

    Object.assign(face_bottom.style, faceBase, {
        width: ROOM_WIDTH + 'px',
        height: ROOM_HEIGHT + 'px',
        top: '300px',
        transform: `rotateX(-90deg) translateZ(390px)`,
    });

    Object.assign(face_top.style, faceBase, {
        width: ROOM_WIDTH + 'px',
        height: ROOM_HEIGHT + 'px',
        top: '300px',
        transform: `rotateX(-90deg) translateZ(0px)`,
    });

    addTiles(face_back, cols, rows, tileSize);
    addTiles(face_left, sideCols, rows, tileSize);
    addTiles(face_right, sideCols, rows, tileSize);
    addTiles(face_bottom, cols, rows, tileSize);
    addTiles(face_top, cols, rows, tileSize);

    makeGrid(face_back, cols, rows, tileSize);
    makeGrid(face_left, sideCols, rows, tileSize);
    makeGrid(face_right, sideCols, rows, tileSize);
    makeGrid(face_bottom, cols, rows, tileSize);
    makeGrid(face_top, cols, rows, tileSize);
}

function paintFaceTiles(faceElement, faceData){
    if(!faceElement || !Array.isArray(faceData)) return;

    const tiles = faceElement.querySelectorAll('.tile');

    tiles.forEach((tile, index) => {
        const tileId = faceData[index];

        if(tileId !== undefined && tileId !== null && tileId !== ""){
            tile.style.backgroundImage = `url(./images/tile${tileId}.png)`;
            tile.style.backgroundSize = "120px 120px";
            tile.style.backgroundRepeat = "no-repeat";
            tile.style.backgroundPosition = "center";
        }else{
            tile.style.backgroundImage = "";
        }
    });
}
function getLevelMovementBounds(level){
    if(!level){
        return { minX: 0, maxX: 0, roomWidth: 0 };
    }

    const tileSize = 120;
    const playerWidth = 120;

    let cols = 5;

    if(level.size === "mid"){
        cols = 10;
    }else if(level.size === "large"){
        cols = 20;
    }

    const roomWidth = cols * tileSize;

    // left wall starts at x = 0
    const minX = 0;

    // right wall is room width minus player width
    const maxX = roomWidth - playerWidth;

    return {
        minX,
        maxX,
        roomWidth
    };
}

function loadRoomVisuals(level){
    if(!level || !level.faces) return;

    const face_back = document.getElementById('face_back');
    const face_left = document.getElementById('face_left');
    const face_right = document.getElementById('face_right');
    const face_bottom = document.getElementById('face_bottom');
    const face_top = document.getElementById('face_top');

    paintFaceTiles(face_back, level.faces.face_back || []);
    paintFaceTiles(face_left, level.faces.face_left || []);
    paintFaceTiles(face_right, level.faces.face_right || []);
    paintFaceTiles(face_bottom, level.faces.face_bottom || []);
    paintFaceTiles(face_top, level.faces.face_top || []);
}

function renderLevelObjects(level){
    if(!level || !Array.isArray(level.objects) || !cube) return;

    level.objects.forEach((obj, index) => {
        if(!obj) return;

        const objectEl = document.createElement("div");
        objectEl.className = "object";
        objectEl.dataset.index = index;
        objectEl.dataset.p_id = obj.p_id ?? "";

        const spriteId = Number(obj.sprite_id ?? 0);
        const x = Number(obj.left ?? 0);
        const y = Number(obj.top ?? 0);
        const z = Number(obj.z ?? 0);
        const rx = Number(obj.rx ?? 0);
        const ry = Number(obj.ry ?? 0);
        const rz = Number(obj.rz ?? 0);
        const scale = Number(obj.scale ?? 1);

        Object.assign(objectEl.style, {
            width: "120px",
            height: "120px",
            position: "absolute",
            left: x + "px",
            top: y + "px",
            backgroundImage: `url(./images/object${spriteId}.png)`,
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
            transformStyle: "preserve-3d",
            transform: `
                translateZ(${z}px)
                rotateX(${rx}deg)
                rotateY(${ry}deg)
                rotateZ(${rz}deg)
                scale(${scale})
            `,
            pointerEvents: "none"
        });

        cube.appendChild(objectEl);
    });
}

function renderLevelNPCs(level){
    if(!level || !Array.isArray(level.npcs) || !cube) return;

    level.npcs.forEach((npc, index) => {
        if(!npc) return;

        const npcEl = document.createElement("div");
        npcEl.className = "npc";
        npcEl.dataset.index = index;
        npcEl.dataset.id = npc.sprite_id ?? 0;
        npcEl.dataset.n_id = npc.n_id ?? "";

        const spriteId = Number(npc.sprite_id ?? 0);
        const x = Number(npc.left ?? 0);
        const y = Number(npc.top ?? 0);
        const z = Number(npc.z ?? 0);
        const rx = Number(npc.rx ?? 0);
        const ry = Number(npc.ry ?? 0);
        const rz = Number(npc.rz ?? 0);
        const scale = Number(npc.scale ?? 1);

        Object.assign(npcEl.style, {
            width: "120px",
            height: "120px",
            position: "absolute",
            left: x + "px",
            top: y + "px",
            backgroundImage: `url(./images/npc_${spriteId}.png)`,
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
            transformStyle: "preserve-3d",
            transform: `
                translateZ(${z}px)
                rotateX(${rx}deg)
                rotateY(${ry}deg)
                rotateZ(${rz}deg)
                scale(${scale})
            `,
            pointerEvents: "auto",
            cursor: 'pointer'
        });

        npcEl.onclick = () => {
            console.log("NPC dialogue:", npc.dialogue ?? "");
        };

        cube.appendChild(npcEl);

        
    });
}

function renderLevelTreasure(level){
    if(!level || !Array.isArray(level.treasure_boxes) || !cube) return;

    level.treasure_boxes.forEach((chest, index) => {
        if(!chest) return;

        const chestEl = document.createElement("div");
        chestEl.className = "treasure_box";
        chestEl.dataset.index = index;
        chestEl.dataset.t_id = chest.t_id ?? "";
        chestEl.dataset.id = chest.sprite_id ?? 0;

        const spriteId = Number(chest.sprite_id ?? 0);
        const x = Number(chest.left ?? 0);
        const y = Number(chest.top ?? 0);

        Object.assign(chestEl.style, {
            position: "absolute",
            left: x + "px",
            top: y + "px",
            width: "120px",
            height: "120px",
            backgroundImage: `url(./images/chest_${spriteId}.png)`,
            backgroundPosition: "center",
            backgroundSize: "contain",
            backgroundRepeat: "no-repeat",
            cursor: "pointer",
            pointerEvents: "auto"
        });

        chestEl.onclick = () => {
            console.log("Treasure chest:", chest);
        };

        cube.appendChild(chestEl);
    });
}

function getLevelEncounters(level){
    if(!level) return [];
    ensureLevelShape(level);
    return Array.isArray(level.enemy_encounters) ? level.enemy_encounters : [];
}

function logLevelEncounters(level){
    const encounters = getLevelEncounters(level);

    console.log("Current level encounter data:", encounters);

    encounters.forEach((encounter, index) => {
        console.log(`Encounter ${index + 1}`, {
            encounter_id: encounter.encounter_id,
            front_position: encounter.front_position,
            mid_1: encounter.mid_1,
            mid_2: encounter.mid_2,
            back_1: encounter.back_1,
            back_2: encounter.back_2,
            back_3: encounter.back_3,
            rate: encounter.rate
        });
    });
}

function renderLevelLandmarks(level){
    if(!level || !Array.isArray(level.landmarks) || !cube) return;

    level.landmarks.forEach((landmark, index) => {
        if(!landmark) return;

        const landmarkEl = document.createElement("div");
        landmarkEl.className = "landmark";
        landmarkEl.dataset.index = index;
        landmarkEl.dataset.id = landmark.sprite_id ?? 0;
        landmarkEl.dataset.landmark_id = landmark.landmark_id ?? "";

        const spriteId = Number(landmark.sprite_id ?? 0);
        const x = Number(landmark.left ?? 0);
        const y = Number(landmark.top ?? 0);

        Object.assign(landmarkEl.style, {
            position: "absolute",
            left: x + "px",
            top: y + "px",
            width: "120px",
            height: "240px",
            backgroundImage: `url(./images/landmark_${spriteId}.png)`,
            backgroundPosition: "center",
            backgroundSize: "contain",
            backgroundRepeat: "no-repeat",
            cursor: "pointer",
            pointerEvents: "auto"
        });

        landmarkEl.onclick = () => {
            console.log("Landmark:", landmark);
        };

        cube.appendChild(landmarkEl);
    });
}

function renderPlayer(level){
    if(!cube) return;

    // remove any existing player first
    const existing = cube.querySelector(".player");
    if(existing) existing.remove();

    const player_obj = document.createElement("div");
    player_obj.className = "player";
    window.player_object = player_obj;

    Object.assign(player_obj.style, {
        width: "120px",
        height: "120px",
        backgroundImage: "url(./images/spr_character_idle_00.gif)",
        backgroundSize: "contain",
        backgroundPosition: "bottom",
        backgroundRepeat: "no-repeat",
        border: "1px solid transparent",   // debug border, remove later
        position: "absolute",
        top: "868px",
        left: "100px",
        pointerEvents: "none",     // player shouldn't block clicks
        zIndex: "10",
        transform: 'translateZ(24px)'                // stay above floor tiles
    });

    cube.appendChild(player_obj);

    // store reference for future movement logic
    window.player_object = player_obj;

    console.log("Player rendered.");
}

function renderCurrentUserStats(){

    const leadMember = current_squad.find(member => member.slot === 0);
    if(!leadMember) return;

    const userAvatar = users_avatars.find(link =>
        link.user_id === leadMember.user_id &&
        link.avatar_id === leadMember.avatar_id
    );

    if(!userAvatar || !userAvatar.base_stats) return;

    const stats = userAvatar.base_stats;

    document.getElementById("user_stats_hearts").textContent = `: ${stats.hearts}`;
    document.getElementById("user_stats_def").textContent = `: ${stats.def}`;
    document.getElementById("user_stats_res").textContent = `: ${stats.res}`;
    document.getElementById("user_stats_atk").textContent = `: ${stats.atk}`;
    document.getElementById("user_stats_eva").textContent = `: ${stats.eva}`;
    document.getElementById("user_stats_spATK").textContent = `: ${stats.spATK}`;
    document.getElementById("user_stats_dex").textContent = `: ${stats.dex}`;
    document.getElementById("user_stats_SPdef").textContent = `: ${stats.spDEF}`;
    document.getElementById("user_stats_cp").textContent = `: ${stats.cp}`;

    console.log("Current squad stats rendered:", stats);
}