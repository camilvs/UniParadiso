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

window.addEventListener("load", function(){
    loadSquadLoadouts();
    initializeCurrentUser();
    buildLeaderEquippedDeck();
    initializeBattleDeckSystem();
});  