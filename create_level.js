  const data_base = document.getElementById('data_base');
    const TILE = 120;
    //level array
    levels = [
        {id: 1, name: "test", size: "room", desc: "This is a test",
            background: 3,
            faces: {
                face_back: [],
                face_left: [],
                face_right: [],
                face_top: [],
                face_bottom: [],
            },
            objects: [],
            npcs: [],
            treasure_boxes: [],
            enemy_encounters: [],
            landmarks: [],
        }
    ];
    var level_pending_delete = null;
    //screens
    var error_screen = document.getElementById('error_screen');
    var start_window = document.getElementById("start_window");
    var level_stats = document.getElementById("level_stats");
    var level_create_screen = document.getElementById("level_create_screen");
    var load_level_screen = document.getElementById("load_level_screen");
    //error box
    var error_text = document.getElementById('error_text');
    var close_error = document.getElementById('close_error');
    //start window options
    var create_new_level = document.getElementById('create_new_level');
    var load_level = document.getElementById("load_level");
    var exit_level = document.getElementById("exit_level");
    //load level
    var load_level_holder = document.getElementById('load_level_holder');
    var exit_load_screen = document.getElementById('exit_load_screen');
    //level stats options
    var level_create_form = document.querySelector("#level_create_form");
    var level_name_input = document.getElementById("level_name_input");
    var level_size_input = document.getElementById("level_size_input");
    var level_desciption_input = document.getElementById("level_desciption_input");
    var create_level_input = document.getElementById("create_level_input");
    var exit_level_stats = document.getElementById("exit_level_stats");
    //level create 
    var level_nav_name = document.getElementById("level_nav_name");
    var current_level = null;
    var level_create_menu = document.getElementById('level_create_menu');
    //level create options menu
    var level_create_options = document.getElementById('level_create_options');
    //save created level
    var create_save = document.getElementById("create_save");
    //test created level
    var create_test = document.getElementById('create_test');
    //exit level creation
    var create_exit = document.getElementById('create_exit');
    //clear created level
    var create_clear = document.getElementById('create_clear');
    //delete created level
    var create_delete = document.getElementById('create_delete');
    var delete_confirm_holder = document.getElementById('delete_confirm_holder');
    var delete_level_stats = document.getElementById('delete_level_stats');
    var delete_confirm_no = document.getElementById('delete_confirm_no');
    var delete_confirm_yes = document.getElementById('delete_confirm_yes');
    //level preview
    var create_level_preview = document.getElementById('create_level_preview');
    var cube = document.createElement('div');
    create_level_preview.appendChild(cube);
    cube_sides_array = [];
    //level camera
    var create_level_camera = document.getElementById('create_level_camera');
    var camera_header = document.getElementById('camera_header');
    var camera_options = document.getElementById('camera_options');
    var close_camera = document.getElementById("close_camera");
    //creator nav
    var tile_asset = document.getElementById('tile_asset');
    var background_asset = document.getElementById('background_asset');
    let object_asset = document.getElementById('object_asset');
    //asset preview
    var asset_preview = document.getElementById('asset_preview');
    //asset editor
    let asset_editor = document.getElementById('asset_editor');
    let asset_name = document.getElementById('asset_name');
    asset_name.title = 'drag to move';
    let close_asset_editor = document.getElementById('close_asset_editor');
    let asset_display = document.getElementById('asset_display');
    let asset_x = document.getElementById('asset_x');
    let asset_x_output = document.getElementById('asset_x_output');
    let asset_y_output = document.getElementById('asset_y_output');
    let asset_z_output = document.getElementById('asset_z_output');
    let asset_ry = document.getElementById('asset_ry');
    let asset_ry_output = document.getElementById('asset_ry_output');
    let asset_rx = document.getElementById('asset_rx');
    let asset_rx_output = document.getElementById('asset_rx_output');
    let asset_rz = document.getElementById('asset_rz');
    let asset_rz_output = document.getElementById('asset_rz_output');
    let asset_scale = document.getElementById('asset_scale');
    let asset_scale_output = document.getElementById('asset_scale_output');
    let delete_object = document.getElementById('delete_object');
    //object delete
    let confirm_object_delete = document.getElementById('confirm_object_delete');
    let delete_object_stats = document.getElementById('delete_object_stats');
    let delete_object_no = document.getElementById('delete_object_no');
    let delete_object_yes = document.getElementById('delete_object_yes');
    //npc assets
    let NPC_asset = document.getElementById('NPC_asset');
    let npc_asset_window = document.getElementById('npc_asset_window');
    let npc_header = document.getElementById('npc_header');
    let npc_name = document.getElementById('npc_name');
    let close_npc_window = document.getElementById('close_npc_window');
    let npc_preview = document.getElementById('npc_preview');
    let npc_dialogue_preview = document.getElementById('npc_dialogue_preview');
    let npc_dialogue = document.getElementById('npc_dialogue');
    let test_npc = document.getElementById('test_npc');
    //npc portrait editor
    let move_portrait_left = document.getElementById('move_portrait_left');
    let move_portrait_up = document.getElementById('move_portrait_up');
    let move_portrait_down = document.getElementById('move_portrait_down');
    let move_portrait_right = document.getElementById('move_portrait_right');
    let move_portrait_flip = document.getElementById('move_portrait_flip');
    //npc editor
    let npc_x = document.getElementById('npc_x');
    let npc_x_output = document.getElementById('npc_x_output');
    let npc_y = document.getElementById('npc_y');
    let npc_y_output = document.getElementById('npc_y_output');
    let npc_z = document.getElementById('npc_z');
    let npc_z_output = document.getElementById('npc_z_output');
    let npc_ry = document.getElementById('npc_ry');
    let npc_ry_output = document.getElementById('npc_ry_output');
    let npc_rx = document.getElementById('npc_rx');
    let npc_rx_output = document.getElementById('npc_rx_output');
    let npc_rz = document.getElementById('npc_rz');
    let npc_rz_output = document.getElementById('npc_rz_output');
    let npc_scale = document.getElementById('npc_scale');
    let npc_scale_output = document.getElementById('npc_scale_output');
    //npc test
    let npc_dialogue_test_window = document.getElementById('npc_dialogue_test_window');
    let text_blinker = document.getElementById('text_blinker');
    let npc_dialogue_header = document.getElementById('npc_dialogue_header');
    let close_dialogue_test_window = document.getElementById('close_dialogue_test_window');
    let test_npc_portrait = document.getElementById('test_npc_portrait');
    let test_npc_dialogue_box = document.getElementById('test_npc_dialogue_box');
    //delete npc
    let delete_npc = document.getElementById('delete_npc');
    let confirm_npc_delete = document.getElementById('confirm_npc_delete');
    let delete_npc_no = document.getElementById('delete_npc_no');
    let delete_npc_yes = document.getElementById('delete_npc_yes');
    const npc_amount = 2;
    //chest editor
    let treasure_asset = document.getElementById('treasure_asset');
    let chest_asset_window = document.getElementById('chest_asset_window');
    let close_chest_editor = document.getElementById('close_chest_editor');
    let chest_asset_header = document.getElementById('chest_asset_header');
    let chest_image_preview = document.getElementById('chest_image_preview');
    let set_treasure_box = document.getElementById('set_treasure_box');
    let chest_x = document.getElementById('chest_x');
    let chest_y = document.getElementById('chest_y');
    let chest_style = document.getElementById('chest_style');
    let item_name_preview = document.getElementById('item_name_preview');
    let item_image_preview = document.getElementById('item_image_preview');
    let delete_current_treasure = document.getElementById('delete_current_treasure');
    //chest content stat display
    let content_def_stat = document.getElementById('content_def_stat');
    let content_res_stat = document.getElementById('content_res_stat');
    let content_atk_stat = document.getElementById('content_atk_stat');
    let content_eva_stat = document.getElementById('content_eva_stat');
    let content_SPatk_stat = document.getElementById('content_SPatk_stat');
    let content_dex_stat = document.getElementById('content_dex_stat');
    let content_SPdef_stat = document.getElementById('content_SPdef_stat');
    let content_desc = document.getElementById('content_desc');
    //chest content stat array
    let content_stats_array = [content_def_stat, content_res_stat, content_atk_stat, content_eva_stat, content_SPatk_stat, content_dex_stat, content_SPdef_stat];
    //chess content nav
    let nav_items = document.getElementById('nav_items');
    let nav_equipments = document.getElementById('nav_equipments');
    let nav_weapons = document.getElementById('nav_weapons');
    let nav_skills = document.getElementById('nav_skills');
    let nav_manifests = document.getElementById('nav_manifests');
    let nav_keys = document.getElementById('nav_keys');
    let nav_materials = document.getElementById('nav_materials');
    let nav_traps = document.getElementById('nav_traps');
    //chest content screen
    let content_asset_holder = document.getElementById('content_asset_holder');
    //encounter content screen
    let encounter_asset_window = document.getElementById('encounter_asset_window');
    let encounter_header_holder = document.getElementById('encounter_header_holder');
    let encounter_header = document.getElementById('encounter_header');
    let encounter_window_close = document.getElementById('encounter_window_close');
    let encounter_window_preview_holder = document.getElementById('encounter_window_preview_holder');
    let encounter_preview = document.getElementById('encounter_preview');
    let ground_setup = document.getElementById('ground_setup');
    let ground = document.getElementById('ground');
    //battle positions
    //front line
    let front_line = document.getElementById('front_line');
    let front_position = document.getElementById('front_position');
    //front mid
    let front_mid = document.getElementById('mid_center');
    let mid_1 = document.getElementById('mid_1');
    let mid_2 = document.getElementById('mid_2');
    //back mid
    let back_row = document.getElementById('back_row');
    let back_1 = document.getElementById('back_1');
    let back_2 = document.getElementById('back_2');
    let back_3 = document.getElementById('back_3');
    //enemy position array
    let enemy_position_arr = [front_position, mid_1, mid_2, back_1, back_2, back_3];
    //encounter stats
    let e_stats_hearts = document.getElementById('e_stats_hearts');
    let e_stats_def = document.getElementById('e_stats_def');
    let e_stats_res = document.getElementById('e_stats_res');
    let e_stats_atk = document.getElementById('e_stats_atk');
    let e_stats_eva = document.getElementById('e_stats_eva');
    let e_stats_spATK = document.getElementById('e_stats_spATK');
    let e_stats_dex = document.getElementById('e_stats_dex');
    let e_stats_sDEF = document.getElementById('e_stats_spDEF');
    let e_stats_weak = document.getElementById('e_stats_weak');
    let e_stats_resists= document.getElementById('e_stats_resists');
    let e_stats_gold = document.getElementById('e_stats_gold');
    let e_stats_exp = document.getElementById('e_stats_exp');
    //preview enemy log
    let enemy_log = document.getElementById('enemy_log');
    //delete enemy
    let delete_enemy = document.getElementById('delete_enemy');
    //set encounter
    let set_encounter = document.getElementById('set_encounter');
    //see all room encounters
    let see_room_encounters = document.getElementById('see_room_encounters');
    //encounter preview camera
    let encounter_preview_rotate_l = document.getElementById('encounter_preview_rotate_l');
    let encounter_preview_rotate_r = document.getElementById('encounter_preview_rotate_r');
    //enemy visual layer
    let top_position_enemy = document.getElementById('top_position_enemy');
    let mid_1_enemy = document.getElementById('mid_1_enemy');
    let mid_2_enemy = document.getElementById('mid_2_enemy');
    let back_1_enemy = document.getElementById('back_1_enemy');
    let back_2_enemy = document.getElementById('back_2_enemy');
    let back_3_enemy = document.getElementById('back_3_enemy');
    //encounter set rate
    let encounters_set_rate = document.getElementById('encounters_set_rate');
    let encounter_set_header = document.getElementById('encounter_set_header');
    encounter_set_header.title = 'drag to move';
    let encounter_set_close = document.getElementById('encounter_set_close');
    let encounter_holder = document.getElementById('encounter_holder');
    //landmarks
    let set_landmark_window = document.getElementById('set_landmark_window');
    let landmark_header = document.getElementById('landmark_header');
    let close_landmark_window = document.getElementById('close_landmark_window');
    let landmark_image_preview = document.getElementById('landmark_image_preview');
    let landmark_x = document.getElementById('landmark_x');
    let landmark_y = document.getElementById('landmark_y');
    let set_landmark = document.getElementById('set_landmark');
    let delete_landmark = document.getElementById('delete_landmark');
    let landmark_asset_preview = document.getElementById('landmark_asset_preview');
    //screen array
    var screens = [start_window, level_stats, level_create_screen,load_level_screen];
    create_new_level.onclick = function(){
        showScreen(level_stats);
    }
    exit_level_stats.onclick = function(){
        showScreen(start_window);
    }
    load_level.onclick = function(){
        showScreen(load_level_screen);
        renderSavedLevels();
    }
    exit_load_screen.onclick = function(){
        showScreen(start_window);
    }
    //pointer on hover array
    var options_arr = [create_new_level,load_level,exit_level,create_level_input,exit_level_stats, close_error, create_save, create_test, create_exit, create_clear, create_delete, delete_confirm_no, delete_confirm_yes,delete_object,delete_object_no, delete_object_yes,
        move_portrait_left, move_portrait_up, move_portrait_down, move_portrait_right, move_portrait_flip,delete_current_treasure, delete_enemy,see_room_encounters,
    ];
    //hover funtion
    options_arr.forEach(option =>{
        onHover(option,"yellow","white");
    });
    //close error screen
    close_error.onclick = function(){
        error_screen.style.display = 'none';
    }
    //create new level
    level_create_form.addEventListener("submit", function(e){
        e.preventDefault();

        error_text.innerHTML = "";

        if(level_name_input.value.trim() === ""){
            error_screen.style.display = "flex";
            error_text.innerHTML += "Please Name your creation...<br>";
            return;
        }

        if(level_size_input.value === ""){
            error_screen.style.display = "flex";
            error_text.innerHTML += "Please choose a Size...<br>";
            return;
        }

        const newLevel = {
            id: levels.length + 1,
            name: level_name_input.value,
            size: level_size_input.value,
            desc: level_desciption_input.value,
            background: null,
            faces: {
                face_back: [],
                face_left: [],
                face_right: [],
                face_top: [],
                face_bottom: [],
            },
            objects: [],
            npcs: [],
            treasure_boxes: [],
            enemy_encounters: [],
            landmarks: [],
        };

        levels.push(newLevel);
        saveLevel();

        current_level = newLevel;
        ensureLevelShape(current_level);
        saveCurrentLevel();
        renderLevelName(current_level);

        buildLevel(current_level);
        applyLevelSliderRanges(current_level);
        showScreen(level_create_screen);
    });

    //open level create menu
    // open menu
    clickAway(level_create_menu,level_create_options);
    //functions
    //hover on an element and change the color, off of hover the color changes back
    function onHover(element,color1,color2){
        element.addEventListener("mouseover", ()=>{
            element.style.color = color1;
        });
        element.addEventListener("mouseout", ()=>{
            element.style.color = color2;
        });
    }
    //switches the current screen to the next one and saves so even on refresh the screen is the current
    function showScreen(screenElement){
        screens.forEach(screen =>{
            screen.style.display = "none";
    });
        screenElement.style.display = "flex";
        // save active screen
        localStorage.setItem("activeScreen", screenElement.id);
    }
    function getLevelSliderRanges(level){
    let cols = 5;

    if(level?.size === "mid") cols = 10;
    else if(level?.size === "large") cols = 20;

    const roomWidth = cols * 120;

    return {
        xMin: -60,
        xMax: roomWidth - 70,
        yMin: 528,
        yMax: 920
    };
}

function applyLevelSliderRanges(level){
    const { xMin, xMax, yMin, yMax } = getLevelSliderRanges(level);

    [asset_x, npc_x, chest_x, landmark_x].forEach(slider => {
        if(!slider) return;
        slider.min = xMin;
        slider.max = xMax;
        slider.value = Math.min(xMax, Math.max(xMin, Number(slider.value || xMin)));
    });

    [asset_y, npc_y, chest_y, landmark_y].forEach(slider => {
        if(!slider) return;
        slider.min = yMin;
        slider.max = yMax;
        slider.value = Math.min(yMax, Math.max(yMin, Number(slider.value || yMin)));
    });
}
    //render saved levels to load
    function renderSavedLevels(){
        load_level_holder.innerHTML = "";
            levels.forEach(level=>{
            var levels_box = document.createElement('div');
            Object.assign(levels_box.style,{
                width:'255px', height: 'auto',borderBottom: '1px solid black', display: 'flex', flexDirection: 'column', marginBottom: '4px'
            });
            levels_box.innerHTML = level.name+"| size: "+level.size+"|<br>Description: "+level.desc;
            load_level_holder.appendChild(levels_box);
            //buttons
            var load_button_holder = document.createElement('div');
            levels_box.appendChild(load_button_holder);
            Object.assign(load_button_holder.style,{display: "flex", flexDirection: 'row', justifyContent: 'space-evenly'});
            //load button
            var load_level_button = document.createElement('div');
            load_button_holder.appendChild(load_level_button);
            Object.assign(load_level_button.style,{width: '64px', height: '32px', color: 'ghostwhite', backgroundColor: '#222', textAlign: 'center', cursor: 'pointer'});
            load_level_button.innerHTML = "Load";
            onHover(load_level_button,'yellow','white');
            //delete button
            var delete_level_button = document.createElement('div');
            load_button_holder.appendChild(delete_level_button);
            Object.assign(delete_level_button.style,{width: '64px', height: '32px', color: 'ghostwhite', backgroundColor: '#222', textAlign: 'center', cursor: 'pointer'});
            delete_level_button.innerHTML = "Delete";
            onHover(delete_level_button,'yellow','white');
            //delete levels
            delete_level_button.onclick = function(){
                level_pending_delete = level.id;
                delete_level_stats.innerHTML = "Name: "+level.name;
                delete_confirm_holder.style.display = 'flex';
            }
            //loading levels stuff
            load_level_button.onclick = function(){
                current_level = level;
                buildLevel(current_level);
                loadRoomVisuals(current_level);
                saveCurrentLevel();
                renderLevelName(current_level);
                applyLevelSliderRanges(current_level);
                showScreen(level_create_screen);
            }
        });
    }
    //delete level logic foreal this time tho
        delete_confirm_yes.onclick = function(){
            if(level_pending_delete !== null){
                deleteSavedLevel(level_pending_delete);
            }
            delete_confirm_holder.style.display = 'none';
        }
        delete_confirm_no.onclick = function(){
            level_pending_delete = null;
            delete_confirm_holder.style.display = 'none';
        }
    //render current level stats
    function renderLevelName(level){
        if(!level) return;
        level_nav_name.textContent = level.name+" Size:"+level.size;
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
                border: '1px solid rgba(255,255,255,0.15)'
            });

            face.appendChild(tile);
        }

        face.addEventListener('mouseover', function(e){
            if(e.target.classList.contains('tile')){
                e.target.style.backgroundColor = "rgba(255,255,0,0.4)";
            }
        });

        face.addEventListener('mouseout', function(e){
            if(e.target.classList.contains('tile')){
                e.target.style.backgroundColor = '';
            }
        });
    }

    function setupExit(){
        create_exit.onclick = function(){
            showScreen(start_window);
            current_level = null;
            clearRoomVisuals(cube_sides_array);
        };
    }
    //build small room
    function buildSmallRoomLevel(level){
        const cols = 5;
        const rows = 5;
        const sideCols = 5;
        const tileSize = 120;

        const ROOM_WIDTH = tileSize * cols;       // 600
        const ROOM_HEIGHT = tileSize * rows;      // 600
        const SIDE_WIDTH = tileSize * sideCols;   // 600

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

        setupExit();
    }
    //build mid room
    function buildMidLevel(level){
        const cols = 10;
        const rows = 5;
        const sideCols = 5;
        const tileSize = 120;

        const ROOM_WIDTH = tileSize * cols;       // 1200
        const ROOM_HEIGHT = tileSize * rows;      // 600
        const SIDE_WIDTH = tileSize * sideCols;   // 600

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
            backgroundColor: '#222'
        });

        Object.assign(face_top.style, faceBase, {
            width: ROOM_WIDTH + 'px',
            height: ROOM_HEIGHT + 'px',
            top: '300px',
            transform: `rotateX(-90deg) translateZ(0px)`,
            backgroundColor: '#222'
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

        setupExit();
    }
    //build large room
    function buildLargeLevel(level){
        const cols = 20;
        const rows = 5;
        const sideCols = 5;
        const tileSize = 120;

        const ROOM_WIDTH = tileSize * cols;       // 2400
        const ROOM_HEIGHT = tileSize * rows;      // 600
        const SIDE_WIDTH = tileSize * sideCols;   // 600

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
            backgroundColor: '#222'
        });

        Object.assign(face_top.style, faceBase, {
            width: ROOM_WIDTH + 'px',
            height: ROOM_HEIGHT + 'px',
            top: '300px',
            transform: `rotateX(-90deg) translateZ(0px)`,
            backgroundColor: '#222'
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

        setupExit();
    }
    //over_here
    //click away function 
    function clickAway(element1,element2){
        element1.addEventListener("click", function(e){
            e.stopPropagation();
            element2.style.display = 'flex';
        });
        element1.addEventListener("click", function(e){
            e.stopPropagation();
        });
        document.addEventListener("click",function(e){ 
            const clickedInsideMenu = element2.contains(e.target);
            const clickedMenuButton = element1.contains(e.target);

            if(!clickedInsideMenu && ! clickedMenuButton){
                element2.style.display = 'none';
            }
        });
    }
    //tile asset on click
    const total_tiles = 96;
    let selected_tile = null;

    tile_asset.onclick = () =>{
        asset_preview.style.display = 'flex';
        cube_sides_array.forEach(face=>{ face.style.opacity = 1;});
        generateTiles();

    }
    //change grid background to selected tile background
    let isPainting = false;

    cube.addEventListener('mousedown', function(e){
        if(
            e.target.classList.contains('tile') &&
            selected_tile !== null
        ){
            e.target.style.backgroundImage = `url(./images/tile${selected_tile}.png)`;
            e.target.style.backgroundSize = `${TILE}px ${TILE}px`;

            //save changes
            const face = e.target.parentElement.id;
            const index = e.target.dataset.index;

            if(current_level){
                
                current_level.faces[face][index] = selected_tile;
                saveLevel();
            }
        }

        isPainting = true;
    });

    cube.addEventListener('mouseup', () => {
        isPainting = false;
    });

    cube.addEventListener('mouseleave', () => {
        isPainting = false;
    });

    cube.addEventListener('mouseover', function(e){
        if(
            isPainting &&
            e.target.classList.contains('tile') &&
            selected_tile !== null
        ){
            e.target.style.backgroundImage = `url(./images/tile${selected_tile}.png)`;
            e.target.style.backgroundSize = `${TILE}px ${TILE}px`;
            if(current_level){
                const face = e.target.parentElement.id;
                const index = e.target.dataset.index;
                current_level.faces[face][index] = selected_tile;
                saveLevel();
            }
        }
    });
    //background nav on click
    const total_backgrounds = 13;
    let selected_background = null;
    const total_objects = 29;
    let selected_object = null;
    asset_preview.addEventListener('click',(e)=>{
        //backgrounds
        if(e.target.classList.contains('background_preview')){
            //take highhlight off other backgrounds
            document.querySelectorAll('.background_preview').forEach(b=>{
                b.style.outline = 'none';
            });
            //highlight slected one
            e.target.style.outline = '2px solid yellow';

            selected_background = e.target.dataset.id;
            create_level_preview.style.backgroundImage = `url(./images/background${selected_background}.png)`;
            //save background change
            if(current_level){
                current_level.background = selected_background;
                saveLevel();
            }
            console.log("selected background:"+selected_background);
        }
        //tiles
            if(e.target.classList.contains('tile_preview')){
                //take highlight off other tiles for visual feedback
                document.querySelectorAll('.tile_preview').forEach(t=>{
                    t.style.outline = 'none';
                });
                //highlight selected tile
                e.target.style.outline = '2px solid yellow';

                selected_tile = e.target.dataset.id;
                console.log("selected tile:"+selected_tile);
            }
        //objects
            if(e.target.classList.contains('object_preview')){
                document.querySelectorAll('.object_preview').forEach(o=>{
                    o.style.outline = 'none';
                });
                //highlight selected object
                e.target.style.outline = '2px solid yellow';
                selected_object = e.target.dataset.id;
                console.log("seleted object "+selected_object);
                setAssetWindow(selected_object);
            }
        //npcs
        if(e.target.classList.contains('npc_preview')){
            document.querySelectorAll('.npc_preview').forEach(n=>{
                n.style.outline = 'none';
            });
            //highlight selected npc
            e.target.style.outline = '2px solid yellow';
            selected_npc = e.target.dataset.id;
            console.log("selected npc: "+selected_npc);
            setNPCWindow(selected_npc);
        }
    });
    //asset editor function
    let current_object = null;
    const transform_state = {
        x: 0,//rotateX
        y: 0,//rotateY
        z: 0,//translateZ
        rz: 0,//rotateZ
        s: 1//scale
    };
    function setAssetWindow(object){
            asset_editor.style.display = "flex";

            asset_display.style.backgroundImage = `url(./images/object${object}.png)`;
            asset_display.style.backgroundSize = 'contain';
            asset_display.style.backgroundRepeat = 'no-repeat';
            asset_display.style.backgroundPosition = 'center';
            const new_object = document.createElement('div');
            new_object.classList.add("object");
            new_object.dataset.id = object;

            Object.assign(new_object.style,{
                width: '120px',
                height: '120px',
                backgroundImage: `url(./images/object${object}.png)`,
                backgroundSize: 'cover',
                position: 'absolute',
                top: '750px',
                left: '230px'
            });

            cube.appendChild(new_object);
            current_object = new_object;

            //save to level
            if(current_level){
                const p_id = nextObjectPid(current_level);
                new_object.dataset.p_id = p_id;

                current_level.objects.push({
                    p_id,
                    sprite_id: Number(object),
                    left: 230,
                    top: 750,
                    z: 0,
                    rx: 0,
                    ry: 0,
                    rz: 0,
                    scale: 1
                });
                saveLevel();
                saveCurrentLevel();
            }

            // Reset transform state
            transform_state.x = 0;
            transform_state.y = 0;
            transform_state.z = 0;
            transform_state.rz = 0;
            transform_state.s = 1;

            applyTransforms();

            asset_x.value = 230;
            asset_y.value = 750;
            asset_z.value = 0;
            asset_rx.value = 0;
            asset_ry.value = 0;
            asset_rz.value = 0;
            asset_scale.value = 1;
    }
    //close asset editor 
    close_asset_editor.onclick = function(){
        asset_editor.style.display = 'none';
    }
    
    asset_x.addEventListener('input', function(){
        current_object.style.left = `${this.value}px`;

        const rec = getCurrentObjectRecord();
        if(rec){
            rec.left = Number(this.value);
            saveLevel();
        }
    });
    asset_y.addEventListener('input', function(){
        current_object.style.top = `${this.value}px`;

        const rec = getCurrentObjectRecord();
        if(rec){
            rec.top = Number(this.value);
            saveLevel();
        }
    });

    //click on objects to set them as current
cube.addEventListener('click', (e) => {
  const objEl = e.target.closest('.object');
  if(!objEl || !cube.contains(objEl)) return;

  current_object = objEl;
  asset_editor.style.display = "flex";

  // preview image
  asset_display.style.backgroundImage =
    `url(./images/object${current_object.dataset.id}.png)`;
  asset_display.style.backgroundSize = 'contain';
  asset_display.style.backgroundRepeat = 'no-repeat';
  asset_display.style.backgroundPosition = 'center';

  // position sliders
  asset_x.value = parseInt(current_object.style.left) || 0;
  asset_y.value = parseInt(current_object.style.top) || 0;

  // parse transform safely (handles multiline + spaces)
  const t = current_object.style.transform || "";

  const zMatch  = t.match(/translateZ\(([-0-9.]+)px\)/);
  const xMatch  = t.match(/rotateX\(([-0-9.]+)deg\)/);
  const yMatch  = t.match(/rotateY\(([-0-9.]+)deg\)/);
  const rzMatch = t.match(/rotateZ\(([-0-9.]+)deg\)/);
  const sMatch  = t.match(/scale\(([-0-9.]+)\)/);

  transform_state.z  = zMatch  ? Number(zMatch[1]) : 0;
  transform_state.x  = xMatch  ? Number(xMatch[1]) : 0;
  transform_state.y  = yMatch  ? Number(yMatch[1]) : 0;
  transform_state.rz = rzMatch ? Number(rzMatch[1]) : 0;
  transform_state.s  = sMatch  ? Number(sMatch[1]) : 1;

  asset_z.value     = transform_state.z;
  asset_rx.value    = transform_state.x;
  asset_ry.value    = transform_state.y;
  asset_rz.value    = transform_state.rz;
  asset_scale.value = transform_state.s;
});
    
    //backgorund asset onclick
    background_asset.onclick = function(){
        asset_preview.style.display = 'flex';
        cube_sides_array.forEach(face=>{ face.style.opacity = 0.2;});        
        generateBackgrounds();
    }
    //object asset on click
    object_asset.onclick = function(){
        asset_preview.style.display = 'flex';
        generateObjects();
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

    // usage
    dragWindow(asset_name, asset_editor);
    dragWindow(npc_name, npc_asset_window);
    dragWindow(npc_dialogue_header, npc_dialogue_test_window);
    dragWindow(chest_asset_header, chest_asset_window);
    dragWindow(encounter_header, encounter_asset_window);
    dragWindow(encounter_set_header, encounters_set_rate);
    dragWindow(landmark_header, set_landmark_window);
    //apply transforms to objects
    function applyTransforms() {
        if (!current_object) return;

        current_object.style.transform =
            `translateZ(${transform_state.z}px)
            rotateX(${transform_state.x}deg)
            rotateY(${transform_state.y}deg)
            rotateZ(${transform_state.rz}deg)
            scale(${transform_state.s})`;

            const rec = getCurrentObjectRecord();
            if(rec){
                rec.z = transform_state.z;
                rec.rx = transform_state.x;
                rec.ry = transform_state.y;
                rec.rz = transform_state.rz;
                rec.scale = transform_state.s;
                saveLevel();
            }
    }

    //update event listener
    asset_z.addEventListener('input', function(){
        transform_state.z = Number(this.value);
        applyTransforms();
    });

    asset_ry.addEventListener('input',function(){
        transform_state.y = Number(this.value);
        applyTransforms();
    });

    asset_rx.addEventListener('input',function(){
        transform_state.x = Number(this.value);
        applyTransforms();
    });

    asset_rz.addEventListener('input',function(){
        transform_state.rz = Number(this.value);
        applyTransforms();
    });

    asset_scale.addEventListener('input',function(){
        transform_state.s = Number(this.value);
        applyTransforms();
    });
    //when moving sliders update save
    function getCurrentObjectRecord(){
        if(!current_level || !current_object) return null;
        const p_id = Number(current_object.dataset.p_id);
        return current_level.objects.find(o => o.p_id === p_id) || null;
    }
    function nextObjectPid(level){
        const max = (level.objects || []).reduce((m,o)=>Math.max(m, Number(o.p_id) || 0), 0);
        return max +1;
    }
    //delete object stuff 
    delete_object.onclick = function(){
        delete_confirm_holder.style.display = 'flex';
        confirm_object_delete.style.display = 'flex';
    }
    delete_object_no.onclick = function(){
        confirm_object_delete.style.display = 'none';
        delete_confirm_holder.style.display = 'none';
    }
    delete_object_yes.onclick = function(){
        if(!current_level || !current_object){
            // nothing selected
            confirm_object_delete.style.display = 'none';
            delete_confirm_holder.style.display = 'none';
            return;
        }

        const p_id = Number(current_object.dataset.p_id);
        if(!Number.isFinite(p_id)){
            console.warn("Selected object has no p_id; cannot delete safely.");
            confirm_object_delete.style.display = 'none';
            delete_confirm_holder.style.display = 'none';
            return;
        }

        // 1) remove from save data
        current_level.objects = (current_level.objects || []).filter(o => o.p_id !== p_id);

        // 2) remove DOM element
        current_object.remove();

        // 3) clear selection
        current_object = null;

        // 4) persist
        saveLevel();

        // 5) close UI
        confirm_object_delete.style.display = 'none';
        delete_confirm_holder.style.display = 'none';
        asset_editor.style.display = 'none';
    };
    NPC_asset.onclick = function(){
        asset_preview.style.display = 'flex';
        generateNPCs();
    }
    //load npc's for viewing
    function generateNPCs(){
        asset_preview.innerHTML = "";
        for(let i = 0; i < npc_amount; i++){
            const npc = document.createElement('div');
            npc.classList.add('npc_preview');
            //npc id
            npc.dataset.id = i;
            npc.style.backgroundImage = `url(./images/npc_${i}.png)`,
            Object.assign(npc.style,{
                width: '64px',
                height: '64px',
                backgroundSize: 'cover',
                margin: '4px',
                cursor: 'pointer',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center'
            });
            asset_preview.appendChild(npc);
        }
    }
    //npc editor function
    let current_npc = null;
    const transform_npc_state = {
        x: 0,//rotateX
        y: 0,//rotateY
        z: 0,//translateZ
        rz: 0,//rotateZ
        s: 1//scale
    };
    const npc_portrait_position = {
        left: 0,
        top: 0,
        scaleX: 1,
    }
    const PORTRAIT_STEP = 3;//moves per arrow press
    function setNPCWindow(npc){
        npc_asset_window.style.display = "flex";
        npc_preview.style.backgroundImage = `url(./images/npc_${npc}.png)`,
        npc_preview.style.backgroundPosition = 'center';
        npc_preview.style.backgroundSize = 'contain';
        npc_preview.style.backgroundRepeat = 'no-repeat';
        const new_npc = document.createElement('div');
        new_npc.classList.add("npc");
        new_npc.dataset.id = npc;
        setNPCPortrait(npc);
        Object.assign(new_npc.style,{
            width: '120px',
            height: '120px',
            backgroundImage: `url(./images/npc_${npc}.png)`,
            backgroundSize: 'cover',
            position: 'absolute',
            top: '750px',
            left: '230px'
        });

        cube.appendChild(new_npc);
        current_npc = new_npc;

        //save npc to level
        if(current_level){
            const n_id = nextNPCNid(current_level);
            new_npc.dataset.n_id = n_id;

            //reset portrait nudge when creation a fresh npc
            npc_portrait_position.left = 0;
            npc_portrait_position.top = 0;
            npc_portrait_position.scaleX = 1;

            //reset dialogue box
            npc_dialogue.value = "";


            current_level.npcs.push({
                n_id,
                sprite_id: Number(npc),
                left: 230,
                top: 750,
                z: 0,
                rx: 0,
                ry: 0,
                rz: 0,
                scale: 1,
                portrait_left: 0,
                portrait_top: 0,
                portrait_scaleX : 1,
                dialogue: ""
            });
            
            setNPCPortrait(npc);
            saveLevel();
            saveCurrentLevel();
        }
        //reset transform  npc state
        transform_npc_state.x = 0;
        transform_npc_state.y = 0;
        transform_npc_state.z = 0;
        transform_npc_state.rz = 0;
        transform_npc_state.s = 1;

        applyNPCTransforms();
        
        npc_x.value = 230;
        npc_y.value = 750;
        npc_z.value = 0;
        npc_rx.value = 0;
        npc_ry.value = 0;
        npc_rz.value = 0;
        npc_scale.value = 1;
    }
        //apply portrait background
    function applyPortraitPreview(){
        npc_dialogue_preview.style.backgroundPosition = `${npc_portrait_position.left}px ${npc_portrait_position.top}px`;

        npc_dialogue_preview.style.transform = `scaleX(${npc_portrait_position.scaleX})`;

        npc_dialogue_preview.style.transformOrigin = "center";
    }

    function setNPCPortrait(sprite_id){
        npc_dialogue_preview.style.backgroundImage = `url(./images/npc_${sprite_id}.png)`;
        npc_dialogue_preview.style.backgroundSize = '200%';
        npc_dialogue_preview.style.backgroundPosition = 'center';
        applyPortraitPreview();
    }
    //portrait arrow buttons onclick
    move_portrait_left.onclick = () => {npc_portrait_position.left += PORTRAIT_STEP; onPortraitChanged();};
    move_portrait_right.onclick = () => {npc_portrait_position.left -= PORTRAIT_STEP; onPortraitChanged();};
    move_portrait_up.onclick = () => {npc_portrait_position.top -= PORTRAIT_STEP; onPortraitChanged();};
    move_portrait_down.onclick = () => {npc_portrait_position.top += PORTRAIT_STEP; onPortraitChanged();};
    move_portrait_flip.onclick = () => {
        npc_portrait_position.scaleX = (npc_portrait_position.scaleX === 1) ? - 1 : 1;
        onPortraitChanged();    
    }

    function onPortraitChanged(){
        applyPortraitPreview();

        const rec = getCurrentNPCRecord();
        if(rec){
            rec.portrait_left = npc_portrait_position.left;
            rec.portrait_top = npc_portrait_position.top;
            rec.portrait_scaleX = npc_portrait_position.scaleX;
            saveLevel();
        }
    }
    //close npc editor
    close_npc_window.onclick = function(){
        npc_asset_window.style.display = 'none';
    }
    //npc editor eventlistener
    npc_x.addEventListener('input',function(){
        if(!current_npc) return;
        current_npc.style.left = `${this.value}px`;

        const rec_npc = getCurrentNPCRecord();
        if(rec_npc){
            rec_npc.left = Number(this.value);
            saveLevel();
        }
    });
    npc_y.addEventListener('input',function(){
        if(!current_npc) return;
        current_npc.style.top = `${this.value}px`;

        const rec_npc = getCurrentNPCRecord();
        if(rec_npc){
            rec_npc.top = Number(this.value);
            saveLevel();
        }
    });
    //click on npcs and set them as current npc
cube.addEventListener('click', (e) => {
  const npcEl = e.target.closest('.npc');
  if(!npcEl || !cube.contains(npcEl)) return;

  current_npc = npcEl;
  npc_asset_window.style.display = 'flex';

  // main npc preview (your existing code)
  npc_preview.style.backgroundImage = `url(./images/npc_${current_npc.dataset.id}.png)`;
  npc_preview.style.backgroundPosition = 'center';
  npc_preview.style.backgroundSize = 'contain';
  npc_preview.style.backgroundRepeat = 'no-repeat';

  // --- NEW: load saved portrait offsets for this NPC ---
  const rec = getCurrentNPCRecord();
  if(rec){
    npc_portrait_position.left = Number(rec.portrait_left) || 0;
    npc_portrait_position.top  = Number(rec.portrait_top)  || 0;
    npc_portrait_position.scaleX = Number(rec.portrait_scaleX) || 1;
  } else {
    // safety default (in case record not found)
    npc_portrait_position.left = 0;
    npc_portrait_position.top = 0;
    npc_portrait_position.scaleX = 1;
  }

  //load npc dialogue
  if(rec){
    npc_dialogue.value = rec.dialogue || "";
  }else {
    npc_dialogue.value = "";
  }

  // refresh the dialogue portrait preview using the loaded offsets
  setNPCPortrait(current_npc.dataset.id);
  // -----------------------------------------------------

  npc_x.value = parseInt(current_npc.style.left) || 0;
  npc_y.value = parseInt(current_npc.style.top) || 0;

  const npc_t = current_npc.style.transform || "";

  const npc_zMatch  = npc_t.match(/translateZ\(([-0-9.]+)px\)/);
  const npc_xMatch  = npc_t.match(/rotateX\(([-0-9.]+)deg\)/);
  const npc_yMatch  = npc_t.match(/rotateY\(([-0-9.]+)deg\)/);
  const npc_rzMatch = npc_t.match(/rotateZ\(([-0-9.]+)deg\)/);
  const npc_sMatch  = npc_t.match(/scale\(([-0-9.]+)\)/);

  transform_npc_state.z  = npc_zMatch  ? Number(npc_zMatch[1])  : 0;
  transform_npc_state.x  = npc_xMatch  ? Number(npc_xMatch[1])  : 0;
  transform_npc_state.y  = npc_yMatch  ? Number(npc_yMatch[1])  : 0;
  transform_npc_state.rz = npc_rzMatch ? Number(npc_rzMatch[1]) : 0;
  transform_npc_state.s  = npc_sMatch  ? Number(npc_sMatch[1])  : 1;

  npc_z.value     = transform_npc_state.z;
  npc_rx.value    = transform_npc_state.x;
  npc_ry.value    = transform_npc_state.y;
  npc_rz.value    = transform_npc_state.rz;
  npc_scale.value = transform_npc_state.s;
});
    //appy transforms to npcs
    function applyNPCTransforms(){
        if(!current_npc) return;

        current_npc.style.transform =
            `translateZ(${transform_npc_state.z}px)
            rotateX(${transform_npc_state.x}deg)
            rotateY(${transform_npc_state.y}deg)
            rotateZ(${transform_npc_state.rz}deg)
            scale(${transform_npc_state.s})`; 

        const npc_rec = getCurrentNPCRecord();
        if(npc_rec){
                npc_rec.z = transform_npc_state.z;
                npc_rec.rx = transform_npc_state.x;
                npc_rec.ry = transform_npc_state.y;
                npc_rec.rz = transform_npc_state.rz;
                npc_rec.scale = transform_npc_state.s;
                saveLevel();
        }
    }
    //update event listener
    npc_z.addEventListener('input',function(){
        transform_npc_state.z = Number(this.value);
        applyNPCTransforms();
    });
    npc_ry.addEventListener('input', function(){
        transform_npc_state.y = Number(this.value);
        applyNPCTransforms();
    });
    npc_rx.addEventListener('input', function(){
        transform_npc_state.x = Number(this.value);
        applyNPCTransforms();
    });
    npc_rz.addEventListener('input', function(){
        transform_npc_state.rz = Number(this.value);
        applyNPCTransforms();
    });
    npc_scale.addEventListener('input', function(){
        transform_npc_state.s = Number(this.value);
        applyNPCTransforms();
    });
    npc_dialogue.addEventListener('input',function(){
        const rec = getCurrentNPCRecord();
        if (!rec) return;
        rec.dialogue = this.value;
        saveLevel();
    });
    test_npc.onclick = () =>{
        const rec = getCurrentNPCRecord();
        if(!rec) return;
        testNPCDialogue(rec);
        npc_dialogue_test_window.style.display = 'flex';
    }
    text_blinker.onclick = () =>{
        if(text_active === false){
            test_npc_dialogue_box.innerHTML = "";
            const rec = getCurrentNPCRecord();
            if(!rec) return;
            testNPCDialogue(rec);
        }

    };
    //when moving sliders update save
    function getCurrentNPCRecord(){
        if(!current_level || !current_npc) return null;
        const n_id = Number(current_npc.dataset.n_id);
        return current_level.npcs.find(n => n.n_id === n_id) || null;
    }
    function nextNPCNid(level){
        const npc_max = (level.npcs || []).reduce((m,n)=>Math.max(m, Number(n.n_id) || 0), 0);
        return npc_max +1;
    }
    //delete npc stuff
    delete_npc.onclick = function(){
        delete_confirm_holder.style.display = 'flex';
        confirm_npc_delete.style.display = 'flex';
    }
    delete_npc_no.onclick = function(){
        confirm_npc_delete.style.display = 'none';
        delete_confirm_holder.style.display = 'none';
    }
    delete_npc_yes.onclick = function(){
        if(!current_level || !current_npc){
            //nothing selected
            confirm_npc_delete.style.display = 'none';
            delete_confirm_holder.style.display = 'none';
            return;
        }

        const n_id = Number(current_npc.dataset.n_id);
        if(!Number.isFinite(n_id)){
            console.warn("Selected NPC has no n_id; cannot delete safely.");
            confirm_npc_delete.style.display = 'none';
            delete_confirm_holder.style.display = 'none';
            return;
        }
        //1) remove from save data
        current_level.npcs = (current_level.npcs || []).filter(n => n.n_id !== n_id);
        //2) remove DOM element
        current_npc.remove();

        //3)clear selection
        current_npc = null;

        //4) persist
        saveLevel();

        //5)close UI
        confirm_npc_delete.style.display = 'none';
        delete_confirm_holder.style.display = 'none';
        npc_asset_window.style.display = 'none';
    }
    close_dialogue_test_window.onclick = () =>{
        npc_dialogue_test_window.style.display = 'none';
    };
    //test npc
    function testNPCDialogue(rec){
        //get dialogue
        if(rec.dialogue != ""){
            test_npc_dialogue_box.innerHTML = "";
            textAnimation(0, rec.dialogue,test_npc_dialogue_box);
        }
        //get backgroundImage
        test_npc_portrait.style.backgroundImage = `url(./images/npc_${rec.sprite_id}.png)`;
        //match to portrait
        test_npc_portrait.style.backgroundSize = "200%";
        test_npc_portrait.style.backgroundRepeat = 'no-repeat';

        const left = Number(rec.portrait_left) || 0;
        const top  = Number(rec.portrait_top) || 0;
        test_npc_portrait.style.backgroundPosition = `${left}px ${top}px`;

        // match editor flip behavior
        const sx = Number(rec.portrait_scaleX) || 1;
        test_npc_portrait.style.transform = `scaleX(${sx})`;
        test_npc_portrait.style.transformOrigin = "center";
    }
    let text_active = false;
 function textAnimation(n,text,print_on){
      if(n < text.length){
        text_active = true;
        const blinky = text_blinker.animate(
        [
          {backgroundColor:"#222"},
          {backgroundColor:"yellow"}
        ],
        {
          iterations: 1,
          duration: 24,
          fill: "forwards",
          easing: "linear"
        }
      );
          blinky.onfinish = () => {
          print_on.innerHTML += text[n];
          
          textAnimation(n+1,text,print_on);
        }
      }else { 
        text_active = false;
        return;
      }
    };
    //save data
    function saveLevel(){
        localStorage.setItem("levels",JSON.stringify(levels));
    }
    //save current level being built
    function saveCurrentLevel(){
        localStorage.setItem("current_level_id",String(current_level?.id ?? ""));
    }
    //clear room
    function clearRoomVisuals(cube_array){
        cube_array.forEach(face =>{
            const tiles = face.querySelectorAll('.tile');
            tiles.forEach(tile =>{
                tile.style.backgroundImage = "";
            });
        });
        create_level_preview.style.backgroundImage = "";
    }
    //load saved data
    //load screen
    function loadScreen(){
        const saved_id = localStorage.getItem("activeScreen");
        if(saved_id){
            const save_element = document.getElementById(saved_id);
            showScreen(save_element);
        }else{
            showScreen(start_window);
        }
    }
    //load level
    function loadSavedLevels(){
    const saved = localStorage.getItem("levels");
        if(saved){
            levels = JSON.parse(saved);

            // ensure every level has faces structure
            levels.forEach(level => {
                if(!level.faces){
                    level.faces = {
                        face_back: [],
                        face_left: [],
                        face_right: [],
                        face_top: [],
                        face_bottom: []
                    };
                }
                if(!level.objects){
                level.objects = []; 
                }
                if(!level.npcs){
                    level.npcs = [];
                }
                if(!level.treasure_boxes){
                    level.treasure_boxes = [];
                }
                if(!level.enemy_encounters){
                    level.enemy_encounters = [];
                } 
                level.objects = Array.isArray(level.objects) ? level.objects : [];
                level.npcs    = Array.isArray(level.npcs)    ? level.npcs    : [];
                level.treasure_boxes = Array.isArray(level.treasure_boxes) ? level.treasure_boxes : [];
                level.enemy_encounters = Array.isArray(level.enemy_encounters) ? level.enemy_encounters : [];
                level.landmarks = Array.isArray(level.landmarks) ? level.landmarks : [];
                selected_background = level.background;
            });
            saveLevel();
        }
    }
    //clean loading
    function ensureLevelShape(level){
        if(!level) return null;
        level.faces ??= { face_back:[], face_left:[], face_right:[], face_top:[], face_bottom:[] };
        level.objects = Array.isArray(level.objects) ? level.objects : [];
        level.npcs = Array.isArray(level.npcs) ? level.npcs : [];
        level.treasure_boxes = Array.isArray(level.treasure_boxes) ? level.treasure_boxes : [];
        level.enemy_encounters = Array.isArray(level.enemy_encounters) ? level.enemy_encounters : [];
        level.landmarks = Array.isArray(level.landmarks) ? level.landmarks : [];
        return level;
    }
    //delete level
    function deleteSavedLevel(id){
        levels = levels.filter(level => level.id !== id);

        //if current level is deleted say bye bye forever
        if(current_level && current_level.id === id){
            current_level = null;
            localStorage.removeItem("current_level_id");
            level_nav_name.textContent = "";
        }
        //update local storage
        saveLevel();
        //reresh UI
        renderSavedLevels();
    }
    //load current level
    function loadCurrentLevel(){
    const id = Number(localStorage.getItem("current_level_id"));
    if(!id) return;

    current_level = ensureLevelShape(levels.find(l => l.id === id) || null);
    if(!current_level) return;

    buildLevel(current_level);
    loadRoomVisuals(current_level);
    applyLevelSliderRanges(current_level);
    }
    //load tiles on startup
    function generateTiles(){
        asset_preview.innerHTML = "";
        for(let i = 0; i < total_tiles; i++){
            const tile = document.createElement('div');
            tile.classList.add('tile_preview');
            //tile id
            tile.dataset.id = i;
            tile.style.backgroundImage = `url(./images/tile${i}.png)`;
            Object.assign(tile.style, {
                width: '64px',
                height: '64px',
                backgroundSize: 'cover',
                margin: '4px',
                cursor: 'pointer'
            });
            asset_preview.appendChild(tile);
        }
    }
    //load backgrounds
    function generateBackgrounds(){
        asset_preview.innerHTML = "";
        for(let i = 0; i < total_backgrounds; i++){
            const background = document.createElement('div');
            background.classList.add('background_preview');
            //background id
            background.dataset.id = i;
            background.style.backgroundImage = `url(./images/background${i}.png)`;
            Object.assign(background.style,{
                width: '64px',
                height: '64px',
                backgroundSize: 'cover',
                margin: '4px',
                cursor: 'pointer'
            });
            asset_preview.appendChild(background);
        }
    }
    //load objects for viewing
    function generateObjects(){
        asset_preview.innerHTML = "";
        for(let i = 0; i < total_objects; i++){
            const object = document.createElement('div');
            object.classList.add('object_preview');
            //object id 
            object.dataset.id = i;
            object.style.backgroundImage = `url(./images/object${i}.png)`;
            Object.assign(object.style,{
                width: '64px', 
                height: '64px',
                backgroundSize: 'cover',
                margin: '4px',
                cursor: 'pointer'
            });
            asset_preview.appendChild(object);
        }
    }
// =====================================
// TREASURE BOXES
// =====================================

// current selected treasure box in the editor
let current_treasure = null;

// selected content to place inside a chest before placing it
let selected_chest_content = null; 
// example shape: { type: 'weapon', id: 3 }

// optional: open treasure editor from a menu button
if(typeof treasure_asset !== "undefined" && treasure_asset){
    treasure_asset.onclick = ()=>{
        current_treasure = null;
        selected_chest_content = null;

        chest_asset_window.style.display = 'flex';
        chest_style.value = 0;
        chest_image_preview.style.backgroundImage = `url(./images/chest_0.png)`;

        chest_x.value = 230;
        chest_y.value = 750;

        clearChestContentPreview();
        content_asset_holder.innerHTML = "";
    };
}

// generate chest style options
let chest_styles = 8;
let chest_desc_arr = ['Red', 'Wooden', 'Gold', 'Green', 'Blue', 'Silver', 'Wood Box', 'Red Box'];

chest_style.innerHTML = "";
for(let i = 0; i < chest_styles; i++){
    let chest_option = document.createElement('option');
    chest_style.appendChild(chest_option);

    chest_option.textContent = chest_desc_arr[i];
    chest_option.value = i;
}

Object.assign(chest_image_preview.style,{
    backgroundPosition: 'center',
    backgroundSize: 'contain',
    backgroundRepeat: 'no-repeat'
});

// initial preview
chest_image_preview.style.backgroundImage = `url(./images/chest_${chest_style.value || 0}.png)`;

// when chest style changes:
// - update preview
// - if a chest is selected, update that chest too
chest_style.onchange = ()=>{
    chest_image_preview.style.backgroundImage = `url(./images/chest_${chest_style.value}.png)`;
    chestImage();
};

// ---------- CONTENT NAV: WEAPONS ----------
nav_weapons.onclick = ()=>{
    content_asset_holder.innerHTML = "";

    weapons.forEach(weapon=>{
        let weapon_card = document.createElement('div');
        content_asset_holder.appendChild(weapon_card);

        Object.assign(weapon_card.style,{
            width: '32px',
            height: '32px',
            border: '3px outset ghostwhite',
            margin: '8px',
            borderRadius: '4px',
            backgroundImage: `url(./images/weapon_${weapon.id}.png)`,
            backgroundSize: 'contain',
            backgroundPosition: 'center',
            backgroundRepeat:'no-repeat',
            backgroundColor: 'black',
            cursor: 'pointer'
        });

        weapon_card.title = weapon.name;

        weapon_card.onclick = ()=>{
            // remember what content the user picked
            selected_chest_content = {
                type: 'weapon',
                id: weapon.id
            };

            // update content preview
            getContentsDetails("weapon",weapon.id);

            // if editing an existing chest, save the content into that chest record immediately
            const rec = getCurrentTreasureBoxRecord();
            if(rec){
                rec.content_type = 'weapon';
                rec.content_id = weapon.id;
                saveLevel();
            }
        };
    });
};

// ------- Content nav: equipment ------
nav_equipments.onclick = ()=>{
    content_asset_holder.innerHTML = "";

    equipments.forEach(equipment=>{
        let equip_card = document.createElement('div');
        content_asset_holder.appendChild(equip_card);

        Object.assign(equip_card.style,{
            width: '32px',
            height: '32px',
            border: '3px outset ghostwhite',
            margin: '8px',
            borderRadius: '4px',
            // backgroundImage: `url(./images/equip_${equipment.id}.png)`,
            backgroundSize: 'contain',
            backgroundPosition: 'center',
            backgroundRepeat:'no-repeat',
            backgroundColor: 'aliceblue',
            cursor: 'pointer'
        });
        equip_card.title = equipment.name;

        equip_card.onclick = ()=>{
            //content choosen 
            selected_chest_content = {
                type: 'equipment',
                id: equipment.id
            };

            //update content preview
            getContentsDetails("equipment",equipment.id);
            //if editing existing chest
            const rec = getCurrentTreasureBoxRecord();
            if(rec){
                rec.content_type = 'equipment';
                rec.content_id = equipment.id;
                saveLevel();
            }
        };
        
    });
};
//------------Content nav: Manifest -----------
    nav_manifests.onclick = ()=>{
        content_asset_holder.innerHTML = "";

            // console.log(mani.name);

        manifest.forEach(mani=>{
            let mani_card = document.createElement('div');
            content_asset_holder.appendChild(mani_card);

            Object.assign(mani_card.style,{
                width: '32px',
                height: '32px',
                border: '3px outset ghostwhite',
                margin: '8px',
                borderRadius: '4px',
                // backgroundImage: `url(./images/equip_${equipment.id}.png)`,
                backgroundSize: 'contain',
                backgroundPosition: 'center',
                backgroundRepeat:'no-repeat',
                backgroundColor: 'aliceblue',
                cursor: 'pointer'
            });
            mani_card.title = mani.name;

            mani_card.onclick = ()=>{
                //content choosen 
                selected_chest_content = {
                    type: 'manifest',
                    id: mani.id
                };

                //update content preview
                getContentsDetails("manifest",mani.id);
                //if editing existing chest
                const rec = getCurrentTreasureBoxRecord();
                if(rec){
                    rec.content_type = 'manifest';
                    rec.content_id = mani.id;
                    saveLevel();
                }
        };
        
    });
    
    };

    //------------Content nav: Skill -----------
    nav_skills.onclick = ()=>{
        content_asset_holder.innerHTML = "";

        skills.forEach(skill=>{
            let skill_card = document.createElement('div');
            content_asset_holder.appendChild(skill_card);

            Object.assign(skill_card.style,{
                width: '32px',
                height: '32px',
                border: '3px outset ghostwhite',
                margin: '8px',
                borderRadius: '4px',
                // backgroundImage: `url(./images/equip_${equipment.id}.png)`,
                backgroundSize: 'contain',
                backgroundPosition: 'center',
                backgroundRepeat:'no-repeat',
                backgroundColor: 'aliceblue',
                cursor: 'pointer'
            });
            skill_card.title = skill.name;

            skill_card.onclick = ()=>{
                //content choosen 
                selected_chest_content = {
                    type: 'skill',
                    id: skill.id
                };

                //update content preview
                getContentsDetails("skill",skill.id);
                //if editing existing chest
                const rec = getCurrentTreasureBoxRecord();
                if(rec){
                    rec.content_type = 'skill';
                    rec.content_id = skill.id;
                    saveLevel();
                }
        };
        
    });
    };

        //------------Content nav: Items -----------
    nav_items.onclick = ()=>{
        content_asset_holder.innerHTML = "";
            items.forEach(item=>{
                let item_card = document.createElement('div');
                content_asset_holder.appendChild(item_card);

                Object.assign(item_card.style,{
                    width: '32px',
                    height: '32px',
                    border: '3px outset ghostwhite',
                    margin: '8px',
                    borderRadius: '4px',
                    // backgroundImage: `url(./images/equip_${equipment.id}.png)`,
                    backgroundSize: 'contain',
                    backgroundPosition: 'center',
                    backgroundRepeat:'no-repeat',
                    backgroundColor: 'aliceblue',
                    cursor: 'pointer'
                });
                item_card.title = item.name;

                item_card.onclick = ()=>{
                    //content choosen 
                    selected_chest_content = {
                        type: 'item',
                        id: item.id
                    };

                    //update content preview
                    getContentsDetails("item",item.id);
                    //if editing existing chest
                    const rec = getCurrentTreasureBoxRecord();
                    if(rec){
                        rec.content_type = 'item';
                        rec.content_id = item.id;
                        saveLevel();
                    }
            };
        
        });
    };
        //------------Content nav: Keys -----------
    nav_keys.onclick = ()=>{
        content_asset_holder.innerHTML = "";

        keys.forEach(key=>{
            let key_card = document.createElement('div');
            content_asset_holder.appendChild(key_card);

            Object.assign(key_card.style,{
                width: '32px',
                height: '32px',
                border: '3px outset gold',
                margin: '8px',
                borderRadius: '4px',
                // backgroundImage: `url(./images/equip_${equipment.id}.png)`,
                backgroundSize: 'contain',
                backgroundPosition: 'center',
                backgroundRepeat:'no-repeat',
                backgroundColor: 'aliceblue',
                cursor: 'pointer'
            });
            key_card.title = key.name;

            key_card.onclick = ()=>{
                //content choosen 
                selected_chest_content = {
                    type: 'key',
                    id: key.id
                };

                //update content preview
                getContentsDetails("key",key.id);
                //if editing existing chest
                const rec = getCurrentTreasureBoxRecord();
                if(rec){
                    rec.content_type = 'key';
                    rec.content_id = key.id;
                    saveLevel();
                }
        };
    });
    };
        //------------Content nav: Materials -----------
    nav_materials.onclick = ()=>{
        content_asset_holder.innerHTML = "";

        materials.forEach(material=>{
            let material_card = document.createElement('div');
            content_asset_holder.appendChild(material_card);

            Object.assign(material_card.style,{
                width: '32px',
                height: '32px',
                border: `3px outset ${material.upgrade_type}`,
                margin: '8px',
                borderRadius: '4px',
                // backgroundImage: `url(./images/equip_${equipment.id}.png)`,
                backgroundSize: 'contain',
                backgroundPosition: 'center',
                backgroundRepeat:'no-repeat',
                backgroundColor: 'aliceblue',
                cursor: 'pointer'
            });
            material_card.title = material.name+" "+material.rarity;

            material_card.onclick = ()=>{
                //content choosen 
                selected_chest_content = {
                    type: 'material',
                    id: material.id
                };

                //update content preview
                getContentsDetails("material",material.id);
                //if editing existing chest
                const rec = getCurrentTreasureBoxRecord();
                if(rec){
                    rec.content_type = 'material';
                    rec.content_id = material.id;
                    saveLevel();
                }
        };
        
    });
    };
    nav_traps.onclick = ()=>{

        content_asset_holder.innerHTML = "";        
        traps.forEach(trap=>{
                let trap_card = document.createElement('div');
                content_asset_holder.appendChild(trap_card);

                Object.assign(trap_card.style,{
                    width: '32px',
                    height: '32px',
                    border: '3px outset ghostwhite',
                    margin: '8px',
                    borderRadius: '4px',
                    // backgroundImage: `url(./images/equip_${equipment.id}.png)`,
                    backgroundSize: 'contain',
                    backgroundPosition: 'center',
                    backgroundRepeat:'no-repeat',
                    backgroundColor: 'aliceblue',
                    cursor: 'pointer'
                });
                trap_card.title = trap.name;

                trap_card.onclick = ()=>{
                    //content choosen 
                    selected_chest_content = {
                        type: 'trap',
                        id: trap.id
                    };

                    //update content preview
                    getContentsDetails("trap",trap.id);
                    //if editing existing chest
                    const rec = getCurrentTreasureBoxRecord();
                    if(rec){
                        rec.content_type = 'trap';
                        rec.content_id = trap.id;
                        saveLevel();
                    }
            };
        
        });
    };

// ---------- CONTENT DETAILS ----------
function clearChestContentStats(){
    for(let i = 0; i < content_stats_array.length; i++){
        content_stats_array[i].innerHTML = "";
    }
}

function clearChestContentPreview(){
    item_name_preview.innerHTML = "";
    content_desc.innerHTML = "";
    item_image_preview.style.backgroundImage = "";
    clearChestContentStats();
}

function getContentSource(type){
    const sources = {
        weapon: weapons,
        equipment: equipments,
        item: items,
        skill: skills,
        manifest: manifest,
        key: keys,
        material: materials,
        trap: traps
    };
    return sources[type] || null;
}

function getStatForContent(type, content){
    if(!content) return null;

    if(type === 'weapon'){
        return weapon_stats.find(s => s.stat_id === content.stat_id) || null;
    }

    if(type === 'equipment'){
        return equip_stats.find(s => s.stat_id === content.stat_id) || null;
    }

    return null;
}

function getContentsDetails(type, id){
    clearChestContentPreview();

    const source = getContentSource(type);
    if(!source) return;

    const content = source.find(c => Number(c.id) === Number(id));
    if(!content) return;

    item_name_preview.innerHTML = content.name || "";
    content_desc.innerHTML = content.desc || "";

    let imagePath = "";

    if(type === 'weapon') imagePath = `./images/weapon_${id}.png`;
    else if(type === 'equipment') imagePath = `./images/equip_${id}.png`;
    else if(type === 'item') imagePath = `./images/item_${id}.png`;
    else if(type === 'skill') imagePath = `./images/skill_${id}.png`;
    else if(type === 'manifest') imagePath = `./images/manifest_${id}.png`;
    else if(type === 'key') imagePath = `./images/key_${id}.png`;
    else if(type === 'material') imagePath = `./images/material_${id}.png`;
    else if(type === 'trap') imagePath = `./images/trap_${id}.png`;

    Object.assign(item_image_preview.style,{
        backgroundImage: `url(${imagePath})`,
        backgroundPosition: 'center',
        backgroundSize: 'contain',
        backgroundRepeat: 'no-repeat'
    });

    const stat = getStatForContent(type, content);
    if(stat){
        content_def_stat.innerHTML = stat.def ?? "";
        content_res_stat.innerHTML = stat.res ?? "";
        content_atk_stat.innerHTML = stat.atk ?? "";
        content_eva_stat.innerHTML = stat.eva ?? "";
        content_SPatk_stat.innerHTML = stat.spATK ?? "";
        content_dex_stat.innerHTML = stat.dex ?? "";
        content_SPdef_stat.innerHTML = stat.spDEF ?? "";
    }
}

// ---------- HELPERS ----------
function nextTreasureBoxPid(level){
    const max = (level.treasure_boxes || []).reduce((m,t)=>{
        return Math.max(m, Number(t.t_id) || 0);
    }, 0);
    return max + 1;
}

function getCurrentTreasureBoxRecord(){
    if(!current_level || !current_treasure) return null;
    const t_id = Number(current_treasure.dataset.t_id);
    return (current_level.treasure_boxes || []).find(t => t.t_id === t_id) || null;
}

// ---------- PLACE TREASURE BOX ----------
set_treasure_box.onclick = ()=>{
    if(!current_level) return;

    const new_t_box = document.createElement('div');
    new_t_box.classList.add("treasure_box");
    new_t_box.dataset.id = chest_style.value;

    Object.assign(new_t_box.style,{
        position: 'absolute',
        top: '750px',
        left: '230px',
        width: '120px',
        height: '120px',
        backgroundPosition: 'center',
        backgroundSize: 'contain',
        backgroundRepeat: 'no-repeat',
        backgroundImage: `url(./images/chest_${chest_style.value}.png)`,
        cursor: 'pointer'
    });

    cube.appendChild(new_t_box);
    current_treasure = new_t_box;

    const t_id = nextTreasureBoxPid(current_level);
    new_t_box.dataset.t_id = t_id;

    current_level.treasure_boxes.push({
        t_id,
        sprite_id: Number(chest_style.value),
        left: 230,
        top: 750,
        opened: false,
        content_type: selected_chest_content
         ? selected_chest_content.type 
         : null,
        content_id: selected_chest_content 
        ? selected_chest_content.id 
        : null
    });

    saveLevel();
    saveCurrentLevel();

    chest_x.value = 230;
    chest_y.value = 750;

    chest_asset_window.style.display = 'flex';
};

// ---------- CLOSE CHEST EDITOR ----------
close_chest_editor.onclick = ()=>{
    chest_asset_window.style.display = 'none';
};

// ---------- CHANGE CHEST IMAGE ----------
function chestImage(){
    if(!current_treasure) return;

    current_treasure.style.backgroundImage = `url(./images/chest_${chest_style.value}.png)`;
    current_treasure.dataset.id = chest_style.value;

    const rec = getCurrentTreasureBoxRecord();
    if(rec){
        rec.sprite_id = Number(chest_style.value);
        saveLevel();
    }
}

// ---------- MOVE CURRENT TREASURE ----------
chest_x.addEventListener('input', function(){
    if(!current_treasure) return;

    current_treasure.style.left = `${this.value}px`;

    const rec = getCurrentTreasureBoxRecord();
    if(rec){
        rec.left = Number(this.value);
        saveLevel();
    }
});

chest_y.addEventListener('input', function(){
    if(!current_treasure) return;

    current_treasure.style.top = `${this.value}px`;

    const rec = getCurrentTreasureBoxRecord();
    if(rec){
        rec.top = Number(this.value);
        saveLevel();
    }
});

// ---------- CLICK A TREASURE BOX TO EDIT IT ----------
cube.addEventListener('click', (e) => {
    const tbEl = e.target.closest('.treasure_box');
    if(!tbEl || !cube.contains(tbEl)) return;

    current_treasure = tbEl;
    chest_asset_window.style.display = 'flex';

    const rec = getCurrentTreasureBoxRecord();

    // chest style preview
    chest_image_preview.style.backgroundImage = `url(./images/chest_${current_treasure.dataset.id}.png)`;
    chest_image_preview.style.backgroundSize = 'contain';
    chest_image_preview.style.backgroundPosition = 'center';
    chest_image_preview.style.backgroundRepeat = 'no-repeat';

    // position controls
    chest_x.value = parseInt(current_treasure.style.left) || 0;
    chest_y.value = parseInt(current_treasure.style.top) || 0;
    chest_style.value = current_treasure.dataset.id || 0;

    // content preview
if(rec && rec.content_type && rec.content_id !== null){
    selected_chest_content = {
        type: rec.content_type,
        id: rec.content_id
    };
    getContentsDetails(rec.content_type, rec.content_id);
} else {
    selected_chest_content = null;
    clearChestContentPreview();
}
});

// ---------- DELETE CURRENT TREASURE ----------
delete_current_treasure.onclick = ()=>{
    if(!current_level || !current_treasure) return;

    const rec = getCurrentTreasureBoxRecord();
    if(!rec) return;

    current_level.treasure_boxes = (current_level.treasure_boxes || []).filter(t => t.t_id !== rec.t_id);

    current_treasure.remove();
    current_treasure = null;

    chest_asset_window.style.display = 'none';
    clearChestContentPreview();
    saveLevel();
};
//open chest function
function openChest(t_id){
    if(!current_level) return;

    const chest = current_level.treasure_boxes.find(t => t.t_id === t_id);

    if(chest_opened){
        //chest_empty logic
        showMessage("Empty Treasure Chest...");
        return;
    }
    //get box content
    givesChestReward(chest);

    //mark opened
    chest.opened = true;

    //change treasure_sprite
    updateVisual(t_id);

    saveLevel();
}

function updateChestVisual(t_id){

    const chestEl =
        document.querySelector(
            `.treasure_box[data-t_id="${t_id}"]`
        );

    if(!chestEl) return;

    chestEl.style.backgroundImage =
        `url(./images/chest_open_${t_id}.png)`;

}

function getContentByType(type,id){

    const sources = {

        weapon: weapons,
        equipment: equipments,
        item: items,
        skill: skills,
        material: materials,
        key: keys,
        manifest: manifest,
        trap: traps

    };

    return sources[type]?.[id];

}
    //encounters
    enemy_asset.onclick = () =>{
        encounter_asset_window.style.display = 'flex';
    };

    encounter_window_close.onclick = () =>{
        encounter_asset_window.style.display = 'none';
        editingEncounterIndex = null;
    };

    enemy_encounters = [
        {
            encounter_id: 0,
            front_position: null,
            mid_1: null,
            mid_2: null,
            back_1: null,
            back_2: null,
            back_3: null,
            rate:  "common"
        },
    ];

    const ENCOUNTER_RATES = [
        { value: "common", label: "Common", weight: 45 },
        { value: "uncommon", label: "Uncommon", weight: 25 },
        { value: "rare", label: "Rare", weight: 15 },
        { value: "ultra_rare", label: "Ultra Rare", weight: 8 },
        { value: "legendary", label: "Legendary", weight: 4 },
        { value: "cosmic", label: "Cosmic", weight: 2 },
        { value: "paradismic", label: "Paradismic", weight: 1 }
    ];

    function getEncounterWeight(rateValue){
        const found = ENCOUNTER_RATES.find(r => r.value === rateValue);
        return found ? found.weight : 0;
    }
    
    //selected enemy for placement
    let selected_enemy_id = null;
    let placing_enemy = false;
    let deleting_enemy = false;
    let editingEncounterIndex = null;

    //board tile -> data key
    const boardSlots = [
        {tile: front_position, key: "front_position", visual: top_position_enemy },
        {tile: mid_1, key: "mid_1", visual: mid_1_enemy },
        {tile: mid_2, key: "mid_2", visual: mid_2_enemy },
        {tile: back_1, key: "back_1", visual: back_1_enemy },
        {tile: back_2, key: "back_2", visual: back_2_enemy },
        {tile: back_3, key: "back_3", visual: back_3_enemy },
    ];
    //get enemy image
    function getEnemyImage(id){
        return id == null ? "" : `url(./images/enemy_${id}.png)`;
    }
    // redraw board tiles + 3D enemy visuals from enemy_encounters
    function renderEncounterBoard(){
        const encounter = enemy_encounters[0];

        boardSlots.forEach(slot => {
            const enemyId = encounter[slot.key];

            // show tile previews in placement mode OR delete mode
            if (placing_enemy || deleting_enemy) {
                slot.tile.style.backgroundImage = getEnemyImage(enemyId);
                slot.tile.style.backgroundPosition = "center";
                slot.tile.style.backgroundSize = "contain";
                slot.tile.style.backgroundRepeat = "no-repeat";
                slot.tile.style.transform = "rotate(90deg)";
            } else {
                slot.tile.style.backgroundImage = "";
                slot.tile.style.backgroundPosition = "";
                slot.tile.style.backgroundSize = "";
                slot.tile.style.backgroundRepeat = "";
                slot.tile.style.transform = "";
            }

            // only show standing enemies in normal mode
            if (enemyId != null && !placing_enemy && !deleting_enemy) {
                slot.visual.style.display = "block";
                slot.visual.style.backgroundImage = getEnemyImage(enemyId);
                slot.visual.style.backgroundPosition = "center bottom";
                slot.visual.style.backgroundSize = "contain";
                slot.visual.style.backgroundRepeat = "no-repeat";
            } else {
                slot.visual.style.display = "none";
                slot.visual.style.backgroundImage = "";
            }
        });
    }
    // placement mode on/off
    function enterPlacementMode(enemyId){
        selected_enemy_id = enemyId;
        placing_enemy = true;

        renderEncounterBoard();

        ground.animate(
            [
                { transform: 'rotateX(75deg) rotateZ(270deg)' },
                { transform: 'rotateX(0deg) rotateZ(270deg)' }
            ],
            {
                duration: 420,
                easing: 'ease-in-out',
                fill: 'forwards'
            }
        );

        showCancelPlacementButton();
    }

    function exitPlacementMode(){
        selected_enemy_id = null;
        placing_enemy = false;
        
        ground.animate(
            [
                { transform: 'rotateX(0deg) rotateZ(270deg)' },
                { transform: 'rotateX(75deg) rotateZ(270deg)' }
            ],
            {
                duration: 420,
                easing: 'ease-in-out',
                fill: 'forwards'
            }
        );

        rebuildEnemyLog();
        renderEncounterBoard();
    }

// enemy picker UI
function rebuildEnemyLog(){
    enemy_log.innerHTML = "";

    enemies.forEach(enemy => {
        let enemy_card = document.createElement('div');

        Object.assign(enemy_card.style, {
            width: '64px',
            height: '64px',
            border: '4px outset white',
            margin: '3px',
            borderRadius: '4px',
            backgroundColor: 'black',
            cursor: 'pointer',
            backgroundImage: `url(./images/enemy_${enemy.id}.png)`,
            backgroundSize: 'contain',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat'
        });

        enemy_card.title = enemy.name;
        enemy_log.appendChild(enemy_card);

        enemy_card.addEventListener('mouseover', () => {
            let stats = enemy_stats.find(s => s.stat_id === enemy.stat_id);
            if(stats){
                e_stats_hearts.innerHTML = 'Hearts: ' + stats.hearts;
                e_stats_def.textContent = ': ' + stats.def;
                e_stats_res.textContent = ': ' + stats.res;
                e_stats_atk.textContent = ': ' + stats.atk;
                e_stats_eva.textContent = ': ' + stats.eva;
                e_stats_spATK.textContent = ': ' + stats.spATK;
                e_stats_dex.textContent = ': ' + stats.dex;
                e_stats_spDEF.textContent = ': ' + stats.spDEF;
                e_stats_weak.textContent = ': ' + stats.weak_type;
                e_stats_resists.textContent = ': ' + stats.resist_type.join(", ");
                e_stats_gold.textContent = ': ' + stats.gold;
                e_stats_exp.textContent = ': ' + stats.exp;
            }
        });

        enemy_card.addEventListener('click', () => {
            enterPlacementMode(enemy.id);
        });
    });
}

function showCancelPlacementButton(){
    enemy_log.innerHTML = "";

    let cancel_enemy_placement = document.createElement('div');
    cancel_enemy_placement.textContent = "Cancel Placement";
    enemy_log.appendChild(cancel_enemy_placement);

    Object.assign(cancel_enemy_placement.style, {
        border: '1px outset black',
        position: 'relative',
        top: '32px',
        height: '24px',
        lineHeight: '24px',
        color: 'ghostwhite',
        backgroundColor: '#222',
        cursor: 'pointer',
        textAlign: 'center',
        width: '100%'
    });

    cancel_enemy_placement.onclick = exitPlacementMode;
}

// one-time tile listeners
boardSlots.forEach(slot => {
    slot.tile.addEventListener('mouseover', () => {
        if(!placing_enemy || selected_enemy_id == null) return;

        slot.tile.style.backgroundImage = getEnemyImage(selected_enemy_id);
        slot.tile.style.backgroundPosition = "center";
        slot.tile.style.backgroundSize = "contain";
        slot.tile.style.backgroundRepeat = "no-repeat";
        slot.tile.style.transform = "rotate(90deg)";
    });

    slot.tile.addEventListener('mouseout', () => {
        if(!placing_enemy) return;
        renderEncounterBoard();
    });

    slot.tile.addEventListener('click', () => {
    // placement mode
        if (placing_enemy && selected_enemy_id != null) {
            enemy_encounters[0][slot.key] = selected_enemy_id;
            renderEncounterBoard();
            exitPlacementMode();
            return;
        }

        // delete mode
        if (deleting_enemy) {
            enemy_encounters[0][slot.key] = null;
            renderEncounterBoard();
            exitDeleteMode();
        }
    });
});

// delete currently hovered/selected logic can be added later
delete_enemy.onclick = () => {
    enterDeleteMode();
};

// initial draw
rebuildEnemyLog();
renderEncounterBoard();

    function enterDeleteMode(){
        selected_enemy_id = null;
        placing_enemy = false;
        deleting_enemy = true;

        renderEncounterBoard();

        ground.animate(
            [
                { transform: 'rotateX(75deg) rotateZ(270deg)' },
                { transform: 'rotateX(0deg) rotateZ(270deg)' }
            ],
            {
                duration: 420,
                easing: 'ease-in-out',
                fill: 'forwards'
            }
        );

        showCancelDeleteButton();
    }

    function showCancelDeleteButton(){
    enemy_log.innerHTML = "";

    let cancel_delete = document.createElement('div');
    cancel_delete.textContent = "Cancel Delete";
    enemy_log.appendChild(cancel_delete);

    Object.assign(cancel_delete.style, {
        border: '1px outset black',
        position: 'relative',
        top: '32px',
        height: '24px',
        lineHeight: '24px',
        color: 'ghostwhite',
        backgroundColor: '#522',
        cursor: 'pointer',
        textAlign: 'center',
        width: '100%'
    });

    cancel_delete.onclick = exitDeleteMode;
}

function exitDeleteMode(){
    deleting_enemy = false;

    ground.animate(
        [
            { transform: 'rotateX(0deg) rotateZ(270deg)' },
            { transform: 'rotateX(75deg) rotateZ(270deg)' }
        ],
        {
            duration: 420,
            easing: 'ease-in-out',
            fill: 'forwards'
        }
    );

    rebuildEnemyLog();
    renderEncounterBoard();
}

    // encounter preview camera
    let ground_rotate = 0;
    encounter_preview_rotate_l.onclick = ()=>{
        let ground_rotate_next = ground_rotate - 30;
        if(ground_rotate_next >= 360){
            ground_rotate_next -= 360;
        }
        const gc = ground_setup.animate(
            [
                {transform: `rotateY(${ground_rotate}deg)`},
                {transform: `rotateY(${ground_rotate_next}deg)`}
            ], 
            {
                iterations: 1,
                duration: 400, 
                easing: 'linear',
                fill: 'forwards'
            }
        );
        gc.onfinish =()=>{
            ground_rotate = ground_rotate_next;
            console.log(ground_rotate);
        }
    };

        encounter_preview_rotate_r.onclick = ()=>{
        let ground_rotate_next = ground_rotate + 30;
        if(ground_rotate_next >= 360){
            ground_rotate_next -= 360;
        }
        const gc = ground_setup.animate(
            [
                {transform: `rotateY(${ground_rotate}deg)`},
                {transform: `rotateY(${ground_rotate_next}deg)`}
            ], 
            {
                iterations: 1,
                duration: 400, 
                easing: 'linear',
                fill: 'forwards'
            }
        );
        gc.onfinish =()=>{
            ground_rotate = ground_rotate_next;
            console.log(ground_rotate);
        }
    };
    //set enocunter window
    set_encounter.onclick = () =>{
        saveEncounterToCurrentLevel();
        renderSavedEncounters();
        resetEncounterBoard();

        encounter_asset_window.style.display = 'none';
        encounters_set_rate.style.display = 'flex';

        console.log(current_level.enemy_encounters);
    };

    //close set_encounter_window 
    encounter_set_close.onclick = () =>{
            encounters_set_rate.style.display = 'none';
    };

    //see all encounters
    see_room_encounters.onclick = ()=>{
        renderSavedEncounters();

        encounter_asset_window.style.display = 'none';
        encounters_set_rate.style.display = 'flex';
    };

    //save current encounter board
    function cloneCurrentEncounter(){
        const src = enemy_encounters[0];

        return {
            encounter_id: src.encounter_id ?? Date.now(),
            front_position: src.front_position,
            mid_1: src.mid_1,
            mid_2: src.mid_2,
            back_1: src.back_1,
            back_2: src.back_2,
            back_3: src.back_3,
            rate: src.rate
        };
    }

    function saveEncounterToCurrentLevel(){
        if(!current_level) return;

        ensureLevelShape(current_level);

        const encounterData = cloneCurrentEncounter();

        if(editingEncounterIndex === null){
            current_level.enemy_encounters.push(encounterData);
        } else {
            current_level.enemy_encounters[editingEncounterIndex] = encounterData;
        }

        saveLevel();
        saveCurrentLevel();

        editingEncounterIndex = null;
    }

    //reset encounter board
    function resetEncounterBoard(){
        enemy_encounters[0] = {
            encounter_id: 0,
            front_position: null,
            mid_1: null,
            mid_2: null,
            back_1: null,
            back_2: null,
            back_3: null, 
            rate: "common"
        };

        renderEncounterBoard();
    }
    //render level encounters
function renderSavedEncounters(){
    encounter_holder.innerHTML = "";

    if(!current_level) return;
    ensureLevelShape(current_level);

    current_level.enemy_encounters.forEach((encounter, index) => {

        const card = document.createElement('div');
        card.classList.add('saved_encounter_card');

        Object.assign(card.style, {
            border: '1px solid black',
            margin: '4px',
            padding: '6px',
            backgroundColor: 'white',
        });

        const title = document.createElement('div');
        title.textContent = `Encounter ${index + 1}`;
        title.style.fontWeight = 'bold';
        title.style.marginBottom = '4px';
        card.appendChild(title);

        const slots = [
            { label: 'Front', value: encounter.front_position },
            { label: 'Mid 1', value: encounter.mid_1 },
            { label: 'Mid 2', value: encounter.mid_2 },
            { label: 'Back 1', value: encounter.back_1 },
            { label: 'Back 2', value: encounter.back_2 },
            { label: 'Back 3', value: encounter.back_3 }
        ];

        let slot_holder = document.createElement('div');

        Object.assign(slot_holder.style,{
            width: '99%',
            height:'30%',
            backgroundColor: 'aliceblue',
            display: 'flex',
            flexDirection: 'row',
            flexWrap:'wrap'
        });

        card.appendChild(slot_holder);

        slots.forEach(slot => {

            const row = document.createElement('div');

            // SAFE lookup
            let enemyName = "Empty";

            if(slot.value !== null && enemies[slot.value]){
                enemyName = enemies[slot.value].name;
            }

            row.title = `${slot.label}: ${enemyName}`;

            Object.assign(row.style,{
                width: '32px',
                height: '32px',
                backgroundColor: 'black',
                margin: '4px',
                border: 'outset crimson 4px',
                borderRadius: '4px'
            });
            // Only show image if enemy exists
            if(slot.value !== null && enemies[slot.value]){
                row.style.backgroundImage =
                    `url(./images/enemy_${slot.value}.png)`;
                row.style.backgroundSize = 'contain';
            }

            slot_holder.appendChild(row);
        });

        encounter_holder.appendChild(card);

        let encounter_rate_holder = document.createElement('select');
        slot_holder.appendChild(encounter_rate_holder);

        Object.assign(encounter_rate_holder.style,{
            width: '120px', height: '32px', margin: '8px 0px 0px 4px', paddingLeft: '8px'
        });
        //build options
        ENCOUNTER_RATES.forEach(rate_option =>{
            const option = document.createElement('option');
            option.value = rate_option.value;
            option.textContent = rate_option.label;
            encounter_rate_holder.appendChild(option);
        });
        //show saved rate
        // show saved rate
    encounter_rate_holder.value = encounter.rate || "common";

    // save when changed
    encounter_rate_holder.addEventListener('change', () => {
        encounter.rate = encounter_rate_holder.value;

        saveLevel();
        saveCurrentLevel();
    });
    const rateLabel = document.createElement('div');
    rateLabel.textContent = `Rate: ${ENCOUNTER_RATES.find(r => r.value === (encounter.rate || "common"))?.label || "Common"}`;
    rateLabel.style.margin = '6px 0';
    rateLabel.style.fontSize = '14px';
    card.appendChild(rateLabel);

    encounter_rate_holder.addEventListener('change', () => {
        encounter.rate = encounter_rate_holder.value;
        rateLabel.textContent = `Rate: ${ENCOUNTER_RATES.find(r => r.value === encounter.rate)?.label || "Common"}`;

        saveLevel();
        saveCurrentLevel();
    });

        let edit_encounter = document.createElement('div');
        card.appendChild(edit_encounter);
        Object.assign(edit_encounter.style,{ width: '96%', height: '16px', backgroundColor: '#222', color: 'ghostwhite', textAlign: 'center', cursor:'pointer'});
        onHover(edit_encounter,'yellow','ghostwhite');
        edit_encounter.textContent = 'Edit Encounter';

        edit_encounter.onclick = ()=>{
            loadEncounterForEditing(index);
        };
        let delete_encounter = document.createElement('div');
        card.appendChild(delete_encounter);
        Object.assign(delete_encounter.style,{ width: '96%', height: '16px', backgroundColor: '#222', color: 'ghostwhite', textAlign: 'center', cursor:'pointer', marginTop: '4px'});
        onHover(delete_encounter,'yellow','ghostwhite');
        delete_encounter.textContent = 'Delete Encounter';

        delete_encounter.onclick = () => {
            if(!current_level) return;
            ensureLevelShape(current_level);

            current_level.enemy_encounters.splice(index, 1);

            if(editingEncounterIndex === index){
                editingEncounterIndex = null;
                resetEncounterBoard();
            } else if(
                editingEncounterIndex !== null &&
                editingEncounterIndex > index
            ){
                editingEncounterIndex--;
            }
            saveLevel();
            saveCurrentLevel();
            renderSavedEncounters();
        };
        //test encounter 
        let test_encounter = document.createElement('div');
            card.appendChild(test_encounter);
            Object.assign(test_encounter.style,{ width: '96%', height: '16px', backgroundColor: '#222', color: 'ghostwhite', textAlign: 'center', cursor:'pointer', marginTop: '4px'});
            onHover(test_encounter,'yellow','ghostwhite');
            test_encounter.textContent = 'Test Encounter';
    });
}
    function loadEncounterForEditing(index){
        if(!current_level) return;
        ensureLevelShape(current_level);

        const saved = current_level.enemy_encounters[index];
        if(!saved) return;

        editingEncounterIndex = index;

        enemy_encounters[0] = {
            encounter_id: saved.encounter_id,
            front_position: saved.front_position,
            mid_1: saved.mid_1,
            mid_2: saved.mid_2,
            back_1: saved.back_1,
            back_2: saved.back_2,
            back_3: saved.back_3,
            rate : saved.rate || "common"
        };

        placing_enemy = false;
        deleting_enemy = false;
        selected_enemy_id = null;

        rebuildEnemyLog();
        renderEncounterBoard();

        encounters_set_rate.style.display = 'none';
        encounter_asset_window.style.display = 'flex';
    }
    //LANDMARKS
    landmark_asset.onclick = () =>{
        set_landmark_window.style.display = 'flex';
    };
    let total_landmarks = 1;
    let current_landmark = null;
    let selected_landmark_sprite = 0;

    //landmark id helper
    function nextLandmarkPid(level){
        if(!level || !Array.isArray(level.landmarks) || level.landmarks.length === 0){
            return 1;
        }
        return Math.max(...level.landmarks.map(l => Number(l.landmark_id) || 0)) + 1;
    }

    //current landmark record
    function getCurrentLandmarkRecord(){
        if(!current_level || !current_landmark) return null;

        const landmarkId = Number(current_landmark.dataset.landmark_id);
        return current_level.landmarks.find(l => l.landmark_id === landmarkId) || null;
    }

    //place landmark
set_landmark.onclick = () => {
    if(!current_level) return;

    ensureLevelShape(current_level);

    const landmark_id = nextLandmarkPid(current_level);

    const new_landmark = document.createElement('div');
    new_landmark.classList.add('landmark');
    new_landmark.dataset.id = selected_landmark_sprite;
    new_landmark.dataset.landmark_id = landmark_id;

    Object.assign(new_landmark.style, {
        position: 'absolute',
        left: '230px',
        top: '750px',
        width: '120px',
        height: '240px',
        backgroundImage: `url(./images/landmark_${selected_landmark_sprite}.png)`,
        backgroundPosition: 'center',
        backgroundSize: 'contain',
        backgroundRepeat: 'no-repeat',
        cursor: 'pointer'
    });

    cube.appendChild(new_landmark);
    current_landmark = new_landmark;

    current_level.landmarks.push({
        landmark_id: landmark_id,
        sprite_id: Number(selected_landmark_sprite),
        left: 230,
        top: 750
    });

    landmark_x.value = 230;
    landmark_y.value = 750;

    saveLevel();
    saveCurrentLevel();
    renderLandmarks();

    set_landmark_window.style.display = 'flex';
};

    //move current landmark
    landmark_x.addEventListener('input', function(){
        if(!current_landmark) return;

        current_landmark.style.left = `${this.value}px`;

        const rec = getCurrentLandmarkRecord();
        if(rec){
            rec.left = Number(this.value);
            saveLevel();
            saveCurrentLevel();
        }
    });

    landmark_y.addEventListener('input', function(){
        if(!current_landmark) return;

        current_landmark.style.top = `${this.value}px`;

        const rec = getCurrentLandmarkRecord();
        if(rec){
            rec.top = Number(this.value);
            saveLevel();
            saveCurrentLevel();
        }
    });

    //change landmark image
    function setLandmarkImage(spriteId){
        selected_landmark_sprite = Number(spriteId);

        landmark_image_preview.style.backgroundImage = `url(./images/landmark_${selected_landmark_sprite}.png)`;
        landmark_image_preview.style.backgroundSize = 'contain';
        landmark_image_preview.style.backgroundPosition = 'center';
        landmark_image_preview.style.backgroundRepeat = 'no-repeat';

        if(!current_landmark) return;

        current_landmark.dataset.id = selected_landmark_sprite;
        current_landmark.style.backgroundImage = `url(./images/landmark_${selected_landmark_sprite}.png)`;

        const rec = getCurrentLandmarkRecord();
        if(rec){
            rec.sprite_id = selected_landmark_sprite;
            saveLevel();
            saveCurrentLevel();
        }
    }

    //click to edit
    cube.addEventListener('click', (e) => {
        const landmarkEl = e.target.closest('.landmark');
        if(!landmarkEl || !cube.contains(landmarkEl)) return;

        current_landmark = landmarkEl;
        set_landmark_window.style.display = 'flex';

        landmark_image_preview.style.backgroundImage = `url(./images/landmark_${landmarkEl.dataset.id}.png)`;
        landmark_image_preview.style.backgroundSize = 'contain';
        landmark_image_preview.style.backgroundPosition = 'center';
        landmark_image_preview.style.backgroundRepeat = 'no-repeat';

        landmark_x.value = parseInt(landmarkEl.style.left) || 0;
        landmark_y.value = parseInt(landmarkEl.style.top) || 0;

        selected_landmark_sprite = Number(landmarkEl.dataset.id) || 0;
    });

    //delete landmark
    delete_landmark.onclick = () => {
        if(!current_level || !current_landmark) return;

        const rec = getCurrentLandmarkRecord();
        if(!rec) return;

        current_level.landmarks = current_level.landmarks.filter(
            l => l.landmark_id !== rec.landmark_id
        );

        current_landmark.remove();
        current_landmark = null;

        set_landmark_window.style.display = 'none';

        saveLevel();
        saveCurrentLevel();
    };

    //close editor
    close_landmark_window.onclick = () => {
        set_landmark_window.style.display = 'none';
    };

    //render saved landmarks
    function renderLandmarks(){
        cube.querySelectorAll('.landmark').forEach(el => el.remove());

        if(!current_level) return;
        ensureLevelShape(current_level);

        current_level.landmarks.forEach(landmark => {
            const el = document.createElement('div');
            el.classList.add('landmark');
            el.dataset.id = landmark.sprite_id;
            el.dataset.landmark_id = landmark.landmark_id;

            Object.assign(el.style, {
                position: 'absolute',
                left: `${landmark.left}px`,
                top: `${landmark.top}px`,
                width: '120px',
                height: '240px',
                backgroundImage: `url(./images/landmark_${landmark.sprite_id}.png)`,
                backgroundPosition: 'center',
                backgroundSize: 'contain',
                backgroundRepeat: 'no-repeat',
                cursor: 'pointer'
            });

            cube.appendChild(el);
        });
    }
    //landmark asset preview
    function buildLandmarkAssetPreview(){
        landmark_asset_preview.innerHTML = "";

        for(let i = 0; i < total_landmarks; i++){
            const card = document.createElement('div');
            landmark_asset_preview.appendChild(card);

            Object.assign(card.style, {
                width: '64px',
                height: '64px',
                margin: '4px',
                display: 'inline-block',
                border: '2px solid white',
                cursor: 'pointer',
                backgroundImage: `url(./images/landmark_${i}.png)`,
                backgroundSize: 'contain',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                backgroundColor: '#111'
            });

            card.onclick = () => {
                setLandmarkImage(i);
            };
        }
        }
        buildLandmarkAssetPreview();
setLandmarkImage(0);
    create_test.onclick = () => {
    if(!current_level){
        console.warn("No current_level selected to test.");
        return;
    }

    // make sure latest edits are saved
    saveLevel();
    saveCurrentLevel();
    // store what to load
    localStorage.setItem("test_level_id", String(current_level.id));

    // go to test page
    window.location.href = "play_test.html";
    };
    //loadRoom Visuals
    function loadRoomVisuals(level){

        if(!level.faces) return;

        cube_sides_array.forEach(face=>{
            const faceId = face.id;
            const tiles = face.querySelectorAll('.tile');

            tiles.forEach(tile=>{
                const index = tile.dataset.index;

                if(level.faces[faceId]){
                    const tileId = level.faces[faceId][index];

                    if(tileId !== undefined){
                        tile.style.backgroundImage =
                            `url(./images/tile${tileId}.png)`;
                        tile.style.backgroundSize =
                            `${TILE}px ${TILE}px`;
                    } else {
                        tile.style.backgroundImage = '';
                    }
                }
            });
        });
        if(level.background !== null && level.background !== undefined){
            create_level_preview.style.backgroundImage = `url(./images/background${level.background}.png)`;
        }else {
            create_level_preview.style.backgroundImage = 'url(./images/background0.png)';
        }
        //remove existing DOM objects
        cube.querySelectorAll('.object').forEach(o => o.remove());
        //recreate saved objects
        (level.objects || []).forEach(obj =>{
            const el = document.createElement('div');
            el.classList.add('object');
            el.dataset.id = obj.sprite_id;
            el.dataset.p_id = obj.p_id;

            Object.assign(el.style,{
                width: '120px',
                height: '120px',
                position: 'absolute',
                left: obj.left+'px',
                top: obj.top+'px',
                backgroundImage: `url(./images/object${obj.sprite_id}.png)`,
                backgroundSize: 'cover',
                backgroundPosition: 'center', 
                backgroundRepeat: 'no-repeat',
            });
            el.style.transform = `
            translateZ(${obj.z}px)
            rotateX(${obj.rx}deg)
            rotateY(${obj.ry}deg)
            rotateZ(${obj.rz}deg)
            scale(${obj.scale})`;

            cube.appendChild(el);
        });
        // remove existing DOM npcs
        cube.querySelectorAll('.npc').forEach(n => n.remove());

        // recreate saved npcs
        (level.npcs || []).forEach(npc => {
        const el = document.createElement('div');
        el.classList.add('npc');
        el.dataset.id = npc.sprite_id;
        el.dataset.n_id = npc.n_id;
        
        npc.portrait_left ??= 0;
        npc.portrait_top  ??= 0;

        Object.assign(el.style,{
            width: '120px',
            height: '120px',
            position: 'absolute',
            left: npc.left+'px',
            top: npc.top+'px',
            backgroundImage: `url(./images/npc_${npc.sprite_id}.png)`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
        });

        el.style.transform = `
            translateZ(${npc.z}px)
            rotateX(${npc.rx}deg)
            rotateY(${npc.ry}deg)
            rotateZ(${npc.rz}deg)
            scale(${npc.scale})
        `;

        cube.appendChild(el);
        });

        // remove existing DOM treasure boxes
        cube.querySelectorAll('.treasure_box').forEach(t => t.remove());

        // recreate saved treasure boxes
        (level.treasure_boxes || []).forEach(tb => {
            const el = document.createElement('div');
            el.classList.add('treasure_box');
            el.dataset.id = tb.sprite_id;
            el.dataset.t_id = tb.t_id;

            Object.assign(el.style,{
                width: '120px',
                height: '120px',
                position: 'absolute',
                left: tb.left + 'px',
                top: tb.top + 'px',
                backgroundImage: `url(./images/chest_${tb.sprite_id}.png)`,
                backgroundSize: 'contain',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                cursor: 'pointer'
            });

            cube.appendChild(el);
        });
        //render saved landmarks
        renderLandmarks();

    }

    window.onload = () =>{
        loadSavedLevels();
        loadCurrentLevel();
        loadScreen();
        if(current_level){
            ensureLevelShape(current_level);
            renderLevelName(current_level);
            
            renderSavedEncounters();
        }
        renderSavedLevels();
        generateTiles();
        
    };
