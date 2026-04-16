// game_play.js

let current_user = null;
let current_avatar = null;
let current_user_avatar_link = null;

// ---------- lookup helpers ----------
function findUserById(user_id){
    return users.find(user => user.id === user_id) || null;
}

function findAvatarById(avatar_id){
    return avatars.find(avatar => avatar.id === avatar_id) || null;
}

function findUserAvatarLink(user_id, avatar_id){
    return users_avatars.find(link =>
        link.user_id === user_id &&
        link.avatar_id === avatar_id
    ) || null;
}

function findSquadMember(slot){
    return current_squad.find(member => member.slot === slot) || null;
}

// ---------- initialize current player from squad slot 0 ----------
function initializeCurrentUser(){
    const leadMember = findSquadMember(0);

    if(!leadMember || leadMember.user_id === null || leadMember.avatar_id === null){
        console.warn("No valid lead squad member found.");
        return;
    }

    current_user = findUserById(leadMember.user_id);
    current_avatar = findAvatarById(leadMember.avatar_id);
    current_user_avatar_link = findUserAvatarLink(
        leadMember.user_id,
        leadMember.avatar_id
    );

    if(!current_user){
        console.warn("Lead user not found.");
        return;
    }

    if(!current_avatar){
        console.warn("Lead avatar not found.");
        return;
    }

    if(!current_user_avatar_link){
        console.warn("Lead user-avatar link not found.");
        return;
    }

}

function getEmptyStatBlock(){
    return {
        hearts: 0,
        def: 0,
        res: 0,
        atk: 0,
        eva: 0,
        spATK: 0,
        dex: 0,
        spDEF: 0,
        cp: 0
    };
}

function cloneStats(stats){
    return {
        hearts: stats.hearts ?? 0,
        def: stats.def ?? 0,
        res: stats.res ?? 0,
        atk: stats.atk ?? 0,
        eva: stats.eva ?? 0,
        spATK: stats.spATK ?? 0,
        dex: stats.dex ?? 0,
        spDEF: stats.spDEF ?? 0,
        cp: stats.cp ?? 0
    };
}

function applyEquipmentEffectsToStats(stats, effects){
    if(!effects) return stats;

    stats.def += effects.def ?? 0;
    stats.res += effects.res ?? 0;
    stats.atk += effects.atk ?? 0;
    stats.eva += effects.eva ?? 0;
    stats.spATK += effects.spATK ?? 0;
    stats.dex += effects.dex ?? 0;
    stats.spDEF += effects.spDEF ?? 0;
    stats.cp += effects.cp ?? 0;

    return stats;
}

function getEffectiveStats(){
    if(!current_user_avatar_link || !current_user_avatar_link.base_stats){
        return getEmptyStatBlock();
    }

    const stats = cloneStats(current_user_avatar_link.base_stats);
    const equipmentLoadout = findActiveEquipmentLoadout();

    if(!equipmentLoadout || !Array.isArray(equipmentLoadout.slots)){
        return stats;
    }

    equipmentLoadout.slots.forEach((ownedEquipmentId) => {
        if(ownedEquipmentId === null) return;

        const ownedEquipment = findOwnedEquipmentById(ownedEquipmentId);
        const equipmentDef = findEquipmentDefByOwnedEquipment(ownedEquipment);

        if(!ownedEquipment || !equipmentDef) return;

        applyEquipmentEffectsToStats(stats, equipmentDef.effects);
    });

    // optional safety floor so stats do not go negative
    stats.def = Math.max(0, stats.def);
    stats.res = Math.max(0, stats.res);
    stats.atk = Math.max(0, stats.atk);
    stats.eva = Math.max(0, stats.eva);
    stats.spATK = Math.max(0, stats.spATK);
    stats.dex = Math.max(0, stats.dex);
    stats.spDEF = Math.max(0, stats.spDEF);
    stats.cp = Math.max(0, stats.cp);

    return stats;
}

// ---------- HUD ----------
function renderUserHUD(){
    if(!current_user || !current_avatar || !current_user_avatar_link) return;

    const user_name_display = document.getElementById("user_name_display");
    const user_character_portrait = document.getElementById("user_character_portrait");
    const user_hearts = document.getElementById("user_hearts");

    if(user_name_display){
        user_name_display.textContent = current_user.username;
    }

    if(user_character_portrait){
        user_character_portrait.title = current_avatar.name;
        user_character_portrait.style.backgroundImage =
            `url(./images/${current_avatar.image_portrait})`;
        user_character_portrait.style.backgroundSize = "96px";
        user_character_portrait.style.backgroundPosition = "12px -60px";
        user_character_portrait.style.backgroundRepeat = "no-repeat";
    }

    if(user_hearts){
        user_hearts.innerHTML =
            "&#10084;".repeat(current_user_avatar_link.base_stats.hearts);
    }
}

// ---------- user stats window ----------
function renderUserStats(){
    const stats = getEffectiveStats();
    if(!stats) return;

    const heartsEl = document.getElementById("user_stats_hearts");
    const defEl = document.getElementById("user_stats_def");
    const resEl = document.getElementById("user_stats_res");
    const atkEl = document.getElementById("user_stats_atk");
    const evaEl = document.getElementById("user_stats_eva");
    const spAtkEl = document.getElementById("user_stats_spATK");
    const dexEl = document.getElementById("user_stats_dex");
    const spDefEl = document.getElementById("user_stats_SPdef");
    const cpEl = document.getElementById("user_stats_cp");

    if(heartsEl) heartsEl.textContent = `: ${stats.hearts}`;
    if(defEl) defEl.textContent = `: ${stats.def}`;
    if(resEl) resEl.textContent = `: ${stats.res}`;
    if(atkEl) atkEl.textContent = `: ${stats.atk}`;
    if(evaEl) evaEl.textContent = `: ${stats.eva}`;
    if(spAtkEl) spAtkEl.textContent = `: ${stats.spATK}`;
    if(dexEl) dexEl.textContent = `: ${stats.dex}`;
    if(spDefEl) spDefEl.textContent = `: ${stats.spDEF}`;
    if(cpEl) cpEl.textContent = `: ${stats.cp}`;
    console.log("Effective user stats rendered:", stats);
}
// ---------- pause squad ----------
function renderPauseSquad(){
    if(!Array.isArray(current_squad)) return;

    current_squad.forEach((slotData, index) => {
        const memberNumber = index + 1;

        const memberCard = document.getElementById(`member_${memberNumber}`);
        const userNameEl = document.getElementById(`member_${memberNumber}_user_name`);
        const rankEl = document.getElementById(`member_${memberNumber}_rank`);
        const portraitEl = document.getElementById(`member_${memberNumber}_avatar_portrait`);
        const avatarNameEl = document.getElementById(`member_${memberNumber}_avatar`);
        const heartsEl = document.getElementById(`member_${memberNumber}_hearts`);
        const avatarLevelEl = document.getElementById(`member_${memberNumber}_avatar_level`);

        if(!memberCard) return;

        if(slotData.user_id === null || slotData.avatar_id === null){
            memberCard.style.display = "none";
            return;
        }

        const user = findUserById(slotData.user_id);
        const avatar = findAvatarById(slotData.avatar_id);
        const userAvatarLink = findUserAvatarLink(slotData.user_id, slotData.avatar_id);

        if(!user || !avatar || !userAvatarLink){
            memberCard.style.display = "none";
            return;
        }

        memberCard.style.display = "flex";

        if(userNameEl){
            userNameEl.textContent = user.username ?? "";
        }

        if(rankEl){
            rankEl.textContent = `Rank: ${user.rank ?? "-"}`;
        }

        if(avatarNameEl){
            avatarNameEl.textContent = avatar.name ?? "No Avatar";
        }

        if(heartsEl){
            const heartCount = userAvatarLink.base_stats?.hearts ?? 0;
            heartsEl.innerHTML = "&#10084; ".repeat(heartCount);
        }

        if(avatarLevelEl){
            avatarLevelEl.innerHTML = "&#9733;".repeat(userAvatarLink.avatar_level ?? 0);
        }

        if(portraitEl){
            portraitEl.style.backgroundImage =
                `url(./images/${avatar.image_portrait})`;
            portraitEl.style.backgroundSize = "cover";
            portraitEl.style.backgroundRepeat = "no-repeat";
            portraitEl.style.backgroundPosition = "center";
        }
    });
}

function findOwnedWeaponById(owned_weapon_id){
    return users_weapons.find(w => w.id === owned_weapon_id) || null;
}

function findWeaponDefByOwnedWeapon(ownedWeapon){
    if(!ownedWeapon) return null;
    return weapons.find(w => w.id === ownedWeapon.weapon_id) || null;
}

function findOwnedManifestById(owned_manifest_id){
    return users_manifest.find(m => m.id === owned_manifest_id) || null;
}

function findManifestDefByOwnedManifest(ownedManifest){
    if(!ownedManifest) return null;
    return manifest.find(m => m.id === ownedManifest.manifest_id) || null;
}
function findOwnedSkillById(owned_skill_id){
    return users_skills.find(s => s.id === owned_skill_id) || null;
}

function findSkillDefByOwnedSkill(ownedSkill){
    if(!ownedSkill) return null;
    return skills.find(s => s.id === ownedSkill.skill_id) || null;
}

function findOwnedItemById(owned_item_id){
    return users_items.find(i => i.id === owned_item_id) || null;
}

function findItemDefByOwnedItem(ownedItem){
    if(!ownedItem) return null;
    return items.find(i => i.id === ownedItem.item_id) || null;
}

function findActiveSquadLoadout(){
    if(!current_user || !current_avatar) return null;

    return squad_loadouts.find(loadout =>
        loadout.user_id === current_user.id &&
        loadout.avatar_id === current_avatar.id
    ) || null;
}

function getDeckUsedCP(loadout){
    if(!loadout) return 0;

    let total = 0;

    loadout.weapons.forEach((ownedWeaponId) => {
        const ownedWeapon = findOwnedWeaponById(ownedWeaponId);
        const weaponDef = findWeaponDefByOwnedWeapon(ownedWeapon);
        if(weaponDef) total += weaponDef.cp_cost || 0;
    });

    loadout.manifest.forEach((ownedManifestId) => {
        const ownedManifest = findOwnedManifestById(ownedManifestId);
        const manifestDef = findManifestDefByOwnedManifest(ownedManifest);
        if(manifestDef) total += manifestDef.cp_cost || 0;
    });

    loadout.skills.forEach((ownedSkillId) => {
        const ownedSkill = findOwnedSkillById(ownedSkillId);
        const skillDef = findSkillDefByOwnedSkill(ownedSkill);
        if(skillDef) total += skillDef.cp_cost || 0;
    });

    loadout.battle_items.forEach((ownedItemId) => {
        const ownedItem = findOwnedItemById(ownedItemId);
        const itemDef = findItemDefByOwnedItem(ownedItem);
        if(itemDef && itemDef.use_phase === "battle"){
            total += itemDef.cp_cost || 0;
        }
    });

    return total;
}


function setCardVisual(el, imagePath, fallbackColor){
    if(!el) return;

    const img = new Image();

    img.onload = function(){
        el.style.backgroundImage = `url(${imagePath})`;
        el.style.backgroundColor = "";
        el.style.backgroundSize = "cover";
        el.style.backgroundPosition = "center";
        el.style.backgroundRepeat = "no-repeat";
    };

    img.onerror = function(){
        el.style.backgroundImage = "";
        el.style.backgroundColor = fallbackColor || "gray";
    };

    img.src = imagePath;
}

function renderDeckPauseDisplay(){
    renderEquippedDeck();
    renderUsersCardInventory();
}

function renderEquippedDeck(){
    const cpUsedEl = document.getElementById("cp_used");
    const cpMaxEl = document.getElementById("cp_max");
    const equippedDeckEl = document.getElementById("equipped_deck");

    if(!current_user || !current_avatar || !current_user_avatar_link) return;
    if(!cpUsedEl || !cpMaxEl || !equippedDeckEl) return;

    const loadout = findActiveSquadLoadout();
    if(!loadout) return;

    equippedDeckEl.innerHTML = "";

    const cpMax = getEffectiveStats().cp || 0;
    const cpUsed = getDeckUsedCP(loadout);

    cpUsedEl.textContent = cpUsed;
    cpMaxEl.textContent = cpMax;

    function makeEquippedCard(cardDef, ownedCard, type, removeFn){
        const card = document.createElement("div");
        Object.assign(card.style, {
            width: "92px",
            height: "120px",
            margin: "4px",
            border: "2px solid gold",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            cursor: "pointer"
        });

        card.title = `Unequip ${cardDef.name}`;
        setCardVisual(card, `./images/${cardDef.image}`, cardDef.color);

        const label = document.createElement("div");
        label.textContent = cardDef.name;
        Object.assign(label.style, {
            backgroundColor: "rgba(0,0,0,0.65)",
            color: "ghostwhite",
            fontSize: "11px",
            padding: "2px",
            textAlign: "center"
        });

        const footer = document.createElement("div");
        footer.innerHTML = `CP ${cardDef.cp_cost || 0} | ${ownedCard.rank ?? ""}`;
        Object.assign(footer.style, {
            backgroundColor: "rgba(0,0,0,0.65)",
            color: "gold",
            fontSize: "11px",
            padding: "2px",
            textAlign: "center"
        });

        card.appendChild(label);
        card.appendChild(footer);

        card.onclick = removeFn;
        equippedDeckEl.appendChild(card);
    }

    // weapons
    loadout.weapons.forEach((ownedWeaponId) => {
        const ownedWeapon = findOwnedWeaponById(ownedWeaponId);
        const weaponDef = findWeaponDefByOwnedWeapon(ownedWeapon);
        if(!ownedWeapon || !weaponDef) return;

        makeEquippedCard(weaponDef, ownedWeapon, "weapon", function(){
            loadout.weapons = loadout.weapons.filter(id => id !== ownedWeapon.id);
            saveSquadLoadouts();
            renderDeckPauseDisplay();
        });
    });

    // manifest
    loadout.manifest.forEach((ownedManifestId) => {
        const ownedManifest = findOwnedManifestById(ownedManifestId);
        const manifestDef = findManifestDefByOwnedManifest(ownedManifest);
        if(!ownedManifest || !manifestDef) return;

        makeEquippedCard(manifestDef, ownedManifest, "manifest", function(){
            loadout.manifest = loadout.manifest.filter(id => id !== ownedManifest.id);
            saveSquadLoadouts();
            renderDeckPauseDisplay();
        });
    });

    // skills
    loadout.skills.forEach((ownedSkillId) => {
        const ownedSkill = findOwnedSkillById(ownedSkillId);
        const skillDef = findSkillDefByOwnedSkill(ownedSkill);
        if(!ownedSkill || !skillDef) return;

        makeEquippedCard(skillDef, ownedSkill, "skill", function(){
            loadout.skills = loadout.skills.filter(id => id !== ownedSkill.id);
            saveSquadLoadouts();
            renderDeckPauseDisplay();
        });
    });

    // battle items only
    loadout.battle_items.forEach((ownedItemId) => {
        const ownedItem = findOwnedItemById(ownedItemId);
        const itemDef = findItemDefByOwnedItem(ownedItem);
        if(!ownedItem || !itemDef) return;

        makeEquippedCard(itemDef, ownedItem, "item", function(){
            loadout.battle_items = loadout.battle_items.filter(id => id !== ownedItem.id);
            saveSquadLoadouts();
            renderDeckPauseDisplay();
        });
    });
}

function renderUsersCardInventory(){
    const usersCardInventoryEl = document.getElementById("users_card_inventory");

    if(!current_user || !current_avatar || !current_user_avatar_link) return;
    if(!usersCardInventoryEl) return;

    const loadout = findActiveSquadLoadout();
    if(!loadout) return;

    usersCardInventoryEl.innerHTML = "";

    const cpMax = current_user_avatar_link.base_stats.cp || 0;

    function makeInventoryCard(cardDef, ownedCard, type, isEquipped, equipFn){
        const card = document.createElement("div");
        Object.assign(card.style, {
            width: "92px",
            height: "120px",
            margin: "4px",
            border: isEquipped ? "2px solid gold" : "1px solid black",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            cursor: isEquipped ? "default" : "pointer",
            opacity: isEquipped ? "0.7" : "1"
        });

        card.title = isEquipped ? `${cardDef.name} equipped` : `Equip ${cardDef.name}`;
        setCardVisual(card, `./images/${cardDef.image}`, cardDef.color);

        const label = document.createElement("div");
        label.textContent = cardDef.name;
        Object.assign(label.style, {
            backgroundColor: "rgba(0,0,0,0.65)",
            color: "ghostwhite",
            fontSize: "11px",
            padding: "2px",
            textAlign: "center"
        });

        const footer = document.createElement("div");
        footer.innerHTML = `CP ${cardDef.cp_cost || 0} | ${ownedCard.rank ?? ""}`;
        Object.assign(footer.style, {
            backgroundColor: "rgba(0,0,0,0.65)",
            color: "gold",
            fontSize: "11px",
            padding: "2px",
            textAlign: "center"
        });

        card.appendChild(label);
        card.appendChild(footer);

        if(!isEquipped){
            card.onclick = equipFn;
        }

        usersCardInventoryEl.appendChild(card);
    }

    function canAfford(cardDef){
        const loadout = findActiveSquadLoadout();
        const newCpUsed = getDeckUsedCP(loadout) + (cardDef.cp_cost || 0);
        return newCpUsed <= cpMax;
    }

    // ---------- weapons ----------
    const ownedWeapons = users_weapons.filter(card =>
        card.user_id === current_user.id &&
        card.avatar_id === current_avatar.id
    );

    ownedWeapons.forEach((ownedWeapon) => {
        const weaponDef = findWeaponDefByOwnedWeapon(ownedWeapon);
        if(!weaponDef) return;

        const isEquipped = loadout.weapons.includes(ownedWeapon.id);

        makeInventoryCard(weaponDef, ownedWeapon, "weapon", isEquipped, function(){
            if(!canAfford(weaponDef)){
                alert("Not enough CP!");
                return;
            }

            loadout.weapons.push(ownedWeapon.id);
            saveSquadLoadouts();
            renderDeckPauseDisplay();
        });
    });

    // ---------- manifest ----------
    const ownedManifestCards = users_manifest.filter(card =>
        card.user_id === current_user.id &&
        card.avatar_id === current_avatar.id
    );

    ownedManifestCards.forEach((ownedManifest) => {
        const manifestDef = findManifestDefByOwnedManifest(ownedManifest);
        if(!manifestDef) return;

        const isEquipped = loadout.manifest.includes(ownedManifest.id);

        makeInventoryCard(manifestDef, ownedManifest, "manifest", isEquipped, function(){
            if(!canAfford(manifestDef)){
                alert("Not enough CP!");
                return;
            }

            loadout.manifest.push(ownedManifest.id);
            saveSquadLoadouts();
            renderDeckPauseDisplay();
        });
    });

    // ---------- skills ----------
    const ownedSkills = users_skills.filter(card =>
        card.user_id === current_user.id &&
        card.avatar_id === current_avatar.id
    );

    ownedSkills.forEach((ownedSkill) => {
        const skillDef = findSkillDefByOwnedSkill(ownedSkill);
        if(!skillDef) return;

        const isEquipped = loadout.skills.includes(ownedSkill.id);

        makeInventoryCard(skillDef, ownedSkill, "skill", isEquipped, function(){
            if(!canAfford(skillDef)){
                alert("Not enough CP!");
                return;
            }

            loadout.skills.push(ownedSkill.id);
            saveSquadLoadouts();
            renderDeckPauseDisplay();
        });
    });

    // ---------- battle items only ----------
    const ownedItems = users_items.filter(card =>
        card.user_id === current_user.id
    );

    ownedItems.forEach((ownedItem) => {
        const itemDef = findItemDefByOwnedItem(ownedItem);
        if(!itemDef) return;
        if(itemDef.use_phase !== "battle") return;

        const isEquipped = loadout.battle_items.includes(ownedItem.id);

        makeInventoryCard(itemDef, ownedItem, "item", isEquipped, function(){
            if(!canAfford(itemDef)){
                alert("Not enough CP!");
                return;
            }

            loadout.battle_items.push(ownedItem.id);
            saveSquadLoadouts();
            renderDeckPauseDisplay();
        });
    });
}

function saveSquadLoadouts(){
    localStorage.setItem("squad_loadouts", JSON.stringify(squad_loadouts));
}

function loadSquadLoadouts(){
    const saved = localStorage.getItem("squad_loadouts");

    if(!saved) return;

    try{
        const parsed = JSON.parse(saved);

        if(Array.isArray(parsed)){
            squad_loadouts = parsed;
        }
    }catch(error){
        console.error("Failed to load squad_loadouts:", error);
    }
}

function findOwnedEquipmentById(owned_equipment_id){
    return users_equipments.find(e => e.id === owned_equipment_id) || null;
}

function findEquipmentDefByOwnedEquipment(ownedEquipment){
    if(!ownedEquipment) return null;
    return equipments.find(e => e.id === ownedEquipment.equipment_id) || null;
}

function findActiveEquipmentLoadout(){
    if(!current_user || !current_avatar) return null;

    return squad_equipment_loadouts.find(loadout =>
        loadout.user_id === current_user.id &&
        loadout.avatar_id === current_avatar.id
    ) || null;
}

let selected_equipment_id = null;

function renderEquipmentPauseDisplay(){
    renderUserEquipmentInventory();
    renderEquippedEquipmentSlots();
}

function renderUserEquipmentInventory(){
    const userEquipmentInventoryEl = document.getElementById("user_equipment_inventory");
    if(!userEquipmentInventoryEl || !current_user) return;

    const equipmentLoadout = findActiveEquipmentLoadout();
    if(!equipmentLoadout) return;

    userEquipmentInventoryEl.innerHTML = "";

    const ownedEquipmentCards = users_equipments.filter(card =>
        card.user_id === current_user.id
    );

    ownedEquipmentCards.forEach((ownedEquipment) => {
        const equipmentDef = findEquipmentDefByOwnedEquipment(ownedEquipment);
        if(!equipmentDef) return;

        const isEquipped = equipmentLoadout.slots.includes(ownedEquipment.id);
        const isSelected = selected_equipment_id === ownedEquipment.id;

        const card = document.createElement("div");
        Object.assign(card.style, {
            width: "92px",
            height: "120px",
            margin: "4px auto",
            border: isSelected ? "3px solid cyan" : isEquipped ? "2px solid gold" : "1px solid black",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            cursor: isEquipped ? "default" : "pointer",
            opacity: isEquipped ? "0.7" : "1"
        });

        card.title = isEquipped
            ? `${equipmentDef.name} equipped`
            : `Select ${equipmentDef.name}`;

        setCardVisual(card, `./images/${equipmentDef.image}`, equipmentDef.color);

        const label = document.createElement("div");
        label.textContent = equipmentDef.name;
        Object.assign(label.style, {
            backgroundColor: "rgba(0,0,0,0.65)",
            color: "ghostwhite",
            fontSize: "11px",
            padding: "2px",
            textAlign: "center"
        });

        card.appendChild(label);

        if(!isEquipped){
            card.onclick = function(){
                selected_equipment_id = ownedEquipment.id;
                renderEquipmentPauseDisplay();
            };
        }

        userEquipmentInventoryEl.appendChild(card);
    });
}

function renderEquippedEquipmentSlots(){
    const equipmentLoadout = findActiveEquipmentLoadout();
    if(!equipmentLoadout) return;

    const slotEls = [
        document.getElementById("equip_slot_1"),
        document.getElementById("equip_slot_2"),
        document.getElementById("equip_slot_3")
    ];

    slotEls.forEach((slotEl, index) => {
        if(!slotEl) return;

        const ownedEquipmentId = equipmentLoadout.slots[index];
        slotEl.innerHTML = "";
        slotEl.style.backgroundImage = "";
        slotEl.style.backgroundColor = "#222";
        slotEl.style.backgroundSize = "cover";
        slotEl.style.backgroundPosition = "center";
        slotEl.style.backgroundRepeat = "no-repeat";
        slotEl.style.cursor = "pointer";

        if(ownedEquipmentId === null){
            slotEl.style.color = "ghostwhite";
            slotEl.innerHTML = `Slot ${index + 1}<br>empty`;

            slotEl.onclick = function(){
                if(selected_equipment_id !== null){
                    equipEquipmentToSlot(index);
                }
            };

            return;
        }

        const ownedEquipment = findOwnedEquipmentById(ownedEquipmentId);
        const equipmentDef = findEquipmentDefByOwnedEquipment(ownedEquipment);

        if(!ownedEquipment || !equipmentDef){
            slotEl.innerHTML = `Slot ${index + 1}<br>empty`;
            equipmentLoadout.slots[index] = null;
            return;
        }

        setCardVisual(slotEl, `./images/${equipmentDef.image}`, equipmentDef.color);

        const label = document.createElement("div");
        label.textContent = equipmentDef.name;
        Object.assign(label.style, {
            backgroundColor: "rgba(0,0,0,0.65)",
            color: "ghostwhite",
            fontSize: "11px",
            padding: "2px",
            textAlign: "center",
            width: "100%",
            marginTop: "auto"
        });

        slotEl.appendChild(label);

        slotEl.onclick = function(){
            unequipEquipmentFromSlot(index);
        };
    });
}

function equipEquipmentToSlot(slotIndex){
    const equipmentLoadout = findActiveEquipmentLoadout();
    if(!equipmentLoadout) return;
    if(selected_equipment_id === null) return;

    // prevent equipping same card twice
    if(equipmentLoadout.slots.includes(selected_equipment_id)){
        selected_equipment_id = null;
        renderEquipmentPauseDisplay();
        return;
    }

    equipmentLoadout.slots[slotIndex] = selected_equipment_id;
    selected_equipment_id = null;

    saveEquipmentLoadouts();
    renderEquipmentPauseDisplay();
    renderUserStats();
    renderDeckPauseDisplay();
}

function unequipEquipmentFromSlot(slotIndex){
    const equipmentLoadout = findActiveEquipmentLoadout();
    if(!equipmentLoadout) return;

    equipmentLoadout.slots[slotIndex] = null;
    saveEquipmentLoadouts();
    renderEquipmentPauseDisplay();
    renderUserStats();
    renderDeckPauseDisplay();
}

function saveEquipmentLoadouts(){
    localStorage.setItem("squad_equipment_loadouts", JSON.stringify(squad_equipment_loadouts));
}

function loadEquipmentLoadouts(){
    const saved = localStorage.getItem("squad_equipment_loadouts");
    if(!saved) return;

    try{
        const parsed = JSON.parse(saved);
        if(Array.isArray(parsed)){
            squad_equipment_loadouts = parsed;
        }
    }catch(error){
        console.error("Failed to load squad_equipment_loadouts:", error);
    }
}

// ---------- player state ----------
const player_state = {
    x: 100,
    top: 868,
    z: 24,
    facing: "right",
    speed: 2,
    moving: false
};

const camera_state = {
    x: 0,
    rotX: 0,
    rotY: 0,
    followSpeed: 0.12
};

const VIEW_WIDTH = 620;

const input_state = {
    right: false,
    left: false
};

function levelUsesCamera(level){
    if(!level) return false;
    return level.size === "mid" || level.size === "large";
}

const controller_right = document.getElementById("controller_right");
const controller_left = document.getElementById("controller_left");

function getPlayerEl(){
    return cube ? cube.querySelector(".player") : null;
}

function syncPlayerToState(){
    const playerEl = getPlayerEl();
    if(!playerEl) return;

    const avatarId = current_avatar ? current_avatar.id : 0;
    const idleImage = current_avatar?.image_idle || `spr_character_idle_${avatarId}.gif`;
    const walkImage = current_avatar?.image_walk || `spr_character_${avatarId}_walk.gif`;

    playerEl.style.left = player_state.x + "px";
    playerEl.style.top = player_state.top + "px";
    playerEl.style.transform = `
        translateZ(${player_state.z}px)
        scaleX(${player_state.facing === "left" ? -1 : 1})
    `;

    if(player_state.moving){
        playerEl.style.backgroundImage = `url(./images/${walkImage})`;
    }else{
        playerEl.style.backgroundImage = `url(./images/${idleImage})`;
    }
}

function updatePlayer(){
    if(!current_level){
        player_state.moving = false;
        syncPlayerToState();
        return;
    }

    const bounds = getLevelMovementBounds(current_level);

    if(input_state.right && !input_state.left){
        player_state.x += player_state.speed;
        player_state.facing = "right";
        player_state.moving = true;
    }
    else if(input_state.left && !input_state.right){
        player_state.x -= player_state.speed;
        player_state.facing = "left";
        player_state.moving = true;
    }
    else{
        player_state.moving = false;
    }

    if(player_state.x < bounds.minX){
        player_state.x = bounds.minX;
    }

    if(player_state.x > bounds.maxX){
        player_state.x = bounds.maxX;
    }

    syncPlayerToState();
}

function updateCamera(){
    if(!cube || !current_level) return;

    if(!levelUsesCamera(current_level)){
        camera_state.x = 0;
        cube.style.transform = `
            translateX(0px)
            translateZ(0px)
        `;
        return;
    }

    const bounds = getLevelMovementBounds(current_level);

    let targetX = player_state.x - VIEW_WIDTH / 2;
    const maxCameraX = Math.max(0, bounds.roomWidth - VIEW_WIDTH);

    if(targetX < 0){
        targetX = 0;
    }

    if(targetX > maxCameraX){
        targetX = maxCameraX;
    }

    camera_state.x += (targetX - camera_state.x) * camera_state.followSpeed;

    cube.style.transform = `
        translateX(${-camera_state.x}px)
        translateZ(0px)
    `;
}

function gameLoop(){
    updatePlayer();
    updateCamera();
    requestAnimationFrame(gameLoop);
}

// ---------- controls ----------
if(controller_right){
    controller_right.addEventListener("mousedown", function(){
        input_state.right = true;
    });

    controller_right.addEventListener("mouseup", function(){
        input_state.right = false;
    });

    controller_right.addEventListener("mouseleave", function(){
        input_state.right = false;
    });

    controller_right.addEventListener("touchstart", function(e){
        e.preventDefault();
        input_state.right = true;
    }, { passive: false });

    controller_right.addEventListener("touchend", function(e){
        e.preventDefault();
        input_state.right = false;
    }, { passive: false });
}

if(controller_left){
    controller_left.addEventListener("mousedown", function(){
        input_state.left = true;
    });

    controller_left.addEventListener("mouseup", function(){
        input_state.left = false;
    });

    controller_left.addEventListener("mouseleave", function(){
        input_state.left = false;
    });

    controller_left.addEventListener("touchstart", function(e){
        e.preventDefault();
        input_state.left = true;
    }, { passive: false });

    controller_left.addEventListener("touchend", function(e){
        e.preventDefault();
        input_state.left = false;
    }, { passive: false });
}

