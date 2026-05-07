// game_play.js

let current_user = null;
let current_avatar = null;
let current_user_avatar_link = null;

let current_member_deck_slot = 0;

let current_member_equip_slot = 0;

const saveMenu = document.getElementById("save_menu");

const saveWindow = document.getElementById("save_window");
const saveWindowClose = document.getElementById("save_window_close");

const saveGameBtn = document.getElementById("save_game_btn");
const downloadSaveBtn = document.getElementById("download_save_btn");
const uploadSaveBtn = document.getElementById("upload_save_btn");

const returnTitleBtn = document.getElementById("return_title_btn");

const uploadSaveInput =
    document.getElementById("upload_save_input");

// ---------- lookup helpers ----------
function findUserById(user_id){
    return users.find(user => Number(user.id) === Number(user_id)) || null;
}

function findAvatarById(avatar_id){
    return avatars.find(avatar => Number(avatar.id) === Number(avatar_id)) || null;
}

function findUserAvatarLink(user_id, avatar_id){
    return users_avatars.find(link =>
        Number(link.user_id) === Number(user_id) &&
        Number(link.avatar_id) === Number(avatar_id)
    ) || null;
}

function findSquadMember(slot){
    return current_squad.find(member => Number(member.slot) === Number(slot)) || null;
}


// ---------- initialize current player from squad slot 0 ----------
function initializeCurrentUser(){
     loadActiveSaveUserIntoDatabase();
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
    // console.log("Effective user stats rendered:", stats);
}
// ---------- pause squad ----------
function renderPauseSquad(){
    if(!Array.isArray(current_squad)) return;

    const orderedSquad = [...current_squad].sort((a, b) => Number(a.slot) - Number(b.slot));

    orderedSquad.forEach((slotData, index) => {
        const memberNumber = index + 1;

        const memberCard = document.getElementById(`member_${memberNumber}`);
        const userNameEl = document.getElementById(`member_${memberNumber}_user_name`);
        const rankEl = document.getElementById(`member_${memberNumber}_rank`);
        const portraitEl = document.getElementById(`member_${memberNumber}_avatar_portrait`);
        const avatarNameEl = document.getElementById(`member_${memberNumber}_avatar`);
        const heartsEl = document.getElementById(`member_${memberNumber}_hearts`);
        const avatarLevelEl = document.getElementById(`member_${memberNumber}_avatar_level`);

        const memberDeckEl = document.getElementById(`member_${memberNumber}_deck_display`);
        const memberEquipEl = document.getElementById(`member_${memberNumber}_equip_display`);

        const memberDefEl = document.getElementById(`member_${memberNumber}_def`);
        const memberResEl = document.getElementById(`member_${memberNumber}_res`);
        const memberAtkEl = document.getElementById(`member_${memberNumber}_atk`);
        const memberEvaEl = document.getElementById(`member_${memberNumber}_eva`);
        const memberSpATKEl = document.getElementById(`member_${memberNumber}_spATK`);
        const memberDexEl = document.getElementById(`member_${memberNumber}_dex`);
        const memberSpDEFEl = document.getElementById(`member_${memberNumber}_spDEF`);

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

        const stats = getEffectiveStatsForMember(slotData);

        memberCard.style.display = "flex";

        if(userNameEl) userNameEl.textContent = avatar.name ?? "No Avatar";
        if(rankEl) rankEl.textContent = `Rank: ${user.rank ?? "-"}`;

        if(avatarNameEl){
            avatarNameEl.textContent = `Type: ${avatar.type ?? "No Type"}`;
            avatarNameEl.style.color = String(avatar.type || "white").toLowerCase();
        }

        if(heartsEl) heartsEl.innerHTML = "&#10084;".repeat(stats.hearts ?? 0);
        if(avatarLevelEl) avatarLevelEl.innerHTML = "&#9733;".repeat(userAvatarLink.avatar_level ?? 0);

        if(portraitEl){
            portraitEl.style.backgroundImage = `url(./images/${avatar.image_portrait})`;
            portraitEl.style.backgroundSize = "cover";
            portraitEl.style.backgroundRepeat = "no-repeat";
            portraitEl.style.backgroundPosition = "center";
        }

        if(memberDeckEl){
            memberDeckEl.style.display = "flex";
            memberDeckEl.style.backgroundImage = `url(./images/${avatar.image_portrait})`;
            memberDeckEl.style.backgroundSize = "cover";
            memberDeckEl.style.backgroundRepeat = "no-repeat";
            memberDeckEl.style.backgroundPosition = "center";
            memberDeckEl.title = avatar.name;
        }

        if(memberEquipEl){
            memberEquipEl.style.display = "flex";
            memberEquipEl.style.backgroundImage = `url(./images/${avatar.image_portrait})`;
            memberEquipEl.style.backgroundSize = "cover";
            memberEquipEl.style.backgroundRepeat = "no-repeat";
            memberEquipEl.style.backgroundPosition = "center";
            memberEquipEl.title = avatar.name;
        }

        // stat bars
        setPauseStatBar(memberDefEl, stats.def, 420);
        setPauseStatBar(memberResEl, stats.res, 420);
        setPauseStatBar(memberAtkEl, stats.atk, 420);
        setPauseStatBar(memberEvaEl, stats.eva, 420);
        setPauseStatBar(memberSpATKEl, stats.spATK, 420);
        setPauseStatBar(memberDexEl, stats.dex, 420);
        setPauseStatBar(memberSpDEFEl, stats.spDEF, 420);
    });
}

function getEffectiveStatsForMember(member){
    if(!member) return getEmptyStatBlock();

    const avatarLink = findUserAvatarLink(member.user_id, member.avatar_id);
    if(!avatarLink || !avatarLink.base_stats){
        return getEmptyStatBlock();
    }

    const stats = cloneStats(avatarLink.base_stats);

    const equipmentLoadout = squad_equipment_loadouts.find(loadout =>
        Number(loadout.user_id) === Number(member.user_id) &&
        Number(loadout.avatar_id) === Number(member.avatar_id)
    );

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

function setPauseStatBar(el, value, maxStat = 45){
    if(!el) return;

    const safeValue = Math.max(0, Number(value ?? 0));
    const percent = Math.min(100, (safeValue / maxStat) * 100);

    el.style.width = `${percent}%`;
    el.title = `${safeValue}`;
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

function getCurrentDeckMember(){
    return current_squad.find(
        member => Number(member.slot) === Number(current_member_deck_slot)
    ) || null;
}

function getCurrentDeckAvatar(){
    const member = getCurrentDeckMember();
    if(!member) return null;

    return findAvatarById(member.avatar_id);
}

function doesCardMatchAvatarType(cardDef, avatar){
    if(!cardDef || !avatar) return false;

    const cardType = String(cardDef.color || "").trim().toLowerCase();
    const avatarType = String(avatar.type || "").trim().toLowerCase();

    return cardType === avatarType;
}

function getOrCreateDeckLoadoutForMember(member){
    if(!member) return null;

    let loadout = squad_loadouts.find(existing =>
        Number(existing.user_id) === Number(member.user_id) &&
        Number(existing.avatar_id) === Number(member.avatar_id)
    );

    if(loadout) return loadout;

    loadout = {
        id: squad_loadouts.length,
        user_id: member.user_id,
        avatar_id: member.avatar_id,
        weapons: [],
        battle_items: [],
        manifest: [],
        skills: []
    };

    squad_loadouts.push(loadout);
    saveSquadLoadouts();

    return loadout;
}

function getCurrentDeckLoadout(){
    const member = getCurrentDeckMember();
    return getOrCreateDeckLoadoutForMember(member);
}

function getCurrentEquipMember(){
    return current_squad.find(
        member => Number(member.slot) === Number(current_member_equip_slot)
    ) || null;
}

function getCurrentEquipAvatar(){
    const member = getCurrentEquipMember();
    if(!member) return null;

    return findAvatarById(member.avatar_id);
}

function getOrCreateEquipmentLoadoutForMember(member){
    if(!member) return null;

    let loadout = squad_equipment_loadouts.find(existing =>
        Number(existing.user_id) === Number(member.user_id) &&
        Number(existing.avatar_id) === Number(member.avatar_id)
    );

    if(loadout) return loadout;

    loadout = {
        id: squad_equipment_loadouts.length,
        user_id: member.user_id,
        avatar_id: member.avatar_id,
        slots: [null, null, null]
    };

    squad_equipment_loadouts.push(loadout);
    saveEquipmentLoadouts();

    return loadout;
}

function doesColorMatchAvatarType(def, avatar){
    if(!def || !avatar) return false;

    const defColor = String(def.color || "").trim().toLowerCase();
    const avatarType = String(avatar.type || "").trim().toLowerCase();

    return defColor === avatarType;
}

function highlightActiveEquipMemberTab(){
    const tabs = [
        { el: document.getElementById("member_1_equip_display"), slot: 0 },
        { el: document.getElementById("member_2_equip_display"), slot: 1 },
        { el: document.getElementById("member_3_equip_display"), slot: 2 }
    ];

    tabs.forEach((tab) => {
        if(!tab.el) return;

        const isActive = Number(current_member_equip_slot) === Number(tab.slot);

        tab.el.style.border = isActive
            ? "3px solid gold"
            : "2px outset ghostwhite";

        tab.el.style.outline = isActive
            ? "2px solid yellow"
            : "none";

        tab.el.style.opacity = isActive ? "1" : "0.8";
        tab.el.style.boxShadow = isActive
            ? "0 0 8px gold"
            : "none";
    });
}

function initializeEquipMemberTabs(){
    const member_1_equip_display = document.getElementById("member_1_equip_display");
    const member_2_equip_display = document.getElementById("member_2_equip_display");
    const member_3_equip_display = document.getElementById("member_3_equip_display");

    if(member_1_equip_display){
        member_1_equip_display.onclick = function(){
            current_member_equip_slot = 0;
            renderEquipmentPauseDisplay();
        };
    }

    if(member_2_equip_display){
        member_2_equip_display.onclick = function(){
            current_member_equip_slot = 1;
            renderEquipmentPauseDisplay();
        };
    }

    if(member_3_equip_display){
        member_3_equip_display.onclick = function(){
            current_member_equip_slot = 2;
            renderEquipmentPauseDisplay();
        };
    }
}

function getCurrentEquipmentLoadout(){
    const member = getCurrentEquipMember();
    return getOrCreateEquipmentLoadoutForMember(member);
}

function renderEquippedDeckForCurrentMember(){
    const equippedDeckEl = document.getElementById("equipped_deck");
    const cpUsedEl = document.getElementById("cp_used");
    const cpMaxEl = document.getElementById("cp_max");

    if(!equippedDeckEl) return;

    equippedDeckEl.innerHTML = "";

    const member = getCurrentDeckMember();
    const loadout = getCurrentDeckLoadout();

    if(!member || !loadout){
        equippedDeckEl.innerHTML = "<div style='color:white; margin:8px;'>No deck found.</div>";
        if(cpUsedEl) cpUsedEl.textContent = "0";
        if(cpMaxEl) cpMaxEl.textContent = "0";
        return;
    }

    const cpMax = getMemberCPMax(member);
    const cpUsed = getDeckUsedCP(loadout);

    const allCards = [
        ...(loadout.weapons || []).map(id => ({ type: "Weapon", owned_id: id })),
        ...(loadout.battle_items || []).map(id => ({ type: "Item", owned_id: id })),
        ...(loadout.manifest || []).map(id => ({ type: "Manifest", owned_id: id })),
        ...(loadout.skills || []).map(id => ({ type: "Skill", owned_id: id }))
    ];

    function removeCardFromCurrentMemberDeck(cardType, ownedId){
        if(cardType === "Weapon"){
            loadout.weapons = (loadout.weapons || []).filter(id => id !== ownedId);
        }

        if(cardType === "Item"){
            loadout.battle_items = (loadout.battle_items || []).filter(id => id !== ownedId);
        }

        if(cardType === "Manifest"){
            loadout.manifest = (loadout.manifest || []).filter(id => id !== ownedId);
        }

        if(cardType === "Skill"){
            loadout.skills = (loadout.skills || []).filter(id => id !== ownedId);
        }

        saveSquadLoadouts();
        renderDeckPauseDisplay();
    }

    allCards.forEach(cardRef => {
        let owned = null;
        let def = null;

        if(cardRef.type === "Weapon"){
            owned = findOwnedWeaponById(cardRef.owned_id);
            def = findWeaponDefByOwnedWeapon(owned);
        }

        if(cardRef.type === "Item"){
            owned = findOwnedItemById(cardRef.owned_id);
            def = findItemDefByOwnedItem(owned);
        }

        if(cardRef.type === "Manifest"){
            owned = findOwnedManifestById(cardRef.owned_id);
            def = findManifestDefByOwnedManifest(owned);
        }

        if(cardRef.type === "Skill"){
            owned = findOwnedSkillById(cardRef.owned_id);
            def = findSkillDefByOwnedSkill(owned);
        }

        if(!owned || !def) return;

        const cardEl = document.createElement("div");
        cardEl.className = "equipped_card_item";

        Object.assign(cardEl.style, {
            width: "92px",
            height: "120px",
            margin: "4px",
            border: "2px solid gold",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            cursor: "pointer"
        });

        cardEl.title = `Unequip ${def.name}`;
        setCardVisual(cardEl, `./images/${def.image}`, def.color);

        const label = document.createElement("div");
        label.textContent = def.name;
        Object.assign(label.style, {
            backgroundColor: "rgba(0,0,0,0.65)",
            color: "ghostwhite",
            fontSize: "11px",
            padding: "2px",
            textAlign: "center"
        });

        const footer = document.createElement("div");
        footer.innerHTML = `CP ${def.cp_cost || 0} | ${owned.rank ?? ""}`;
        Object.assign(footer.style, {
            backgroundColor: "rgba(0,0,0,0.65)",
            color: "gold",
            fontSize: "11px",
            padding: "2px",
            textAlign: "center"
        });

        cardEl.appendChild(label);
        cardEl.appendChild(footer);

        cardEl.onclick = function(){
            removeCardFromCurrentMemberDeck(cardRef.type, cardRef.owned_id);
        };

        equippedDeckEl.appendChild(cardEl);
    });

    if(cpUsedEl) cpUsedEl.textContent = cpUsed;
    if(cpMaxEl) cpMaxEl.textContent = cpMax;
}

function highlightActiveDeckMemberTab(){
    const tabs = [
        { el: document.getElementById("member_1_deck_display"), slot: 0 },
        { el: document.getElementById("member_2_deck_display"), slot: 1 },
        { el: document.getElementById("member_3_deck_display"), slot: 2 }
    ];

    tabs.forEach((tab) => {
        if(!tab.el) return;

        const isActive = Number(current_member_deck_slot) === Number(tab.slot);

        tab.el.style.border = isActive
            ? "3px solid gold"
            : "2px outset ghostwhite";

        tab.el.style.outline = isActive
            ? "2px solid yellow"
            : "none";

        tab.el.style.opacity = isActive ? "1" : "0.8";
        tab.el.style.boxShadow = isActive
            ? "0 0 8px gold"
            : "none";
    });
}

function initializeDeckMemberTabs(){
    const member_1_deck_display = document.getElementById("member_1_deck_display");
    const member_2_deck_display = document.getElementById("member_2_deck_display");
    const member_3_deck_display = document.getElementById("member_3_deck_display");

    if(member_1_deck_display){
        member_1_deck_display.onclick = function(){
            current_member_deck_slot = 0;
            renderDeckPauseDisplay();
        };
    }

    if(member_2_deck_display){
        member_2_deck_display.onclick = function(){
            current_member_deck_slot = 1;
            renderDeckPauseDisplay();
        };
    }

    if(member_3_deck_display){
        member_3_deck_display.onclick = function(){
            current_member_deck_slot = 2;
            renderDeckPauseDisplay();
        };
    }
}



function addCardToCurrentMemberDeck(cardType, ownedId){
    const member = getCurrentDeckMember();
    const loadout = getCurrentDeckLoadout();
    if(!member || !loadout) return;

    if(cardType === "Weapon"){
        loadout.weapons = loadout.weapons || [];
        if(loadout.weapons.includes(ownedId)) return;
        loadout.weapons.push(ownedId);
    }

    if(cardType === "Item"){
        loadout.battle_items = loadout.battle_items || [];
        if(loadout.battle_items.includes(ownedId)) return;
        loadout.battle_items.push(ownedId);
    }

    if(cardType === "Manifest"){
        loadout.manifest = loadout.manifest || [];
        if(loadout.manifest.includes(ownedId)) return;
        loadout.manifest.push(ownedId);
    }

    if(cardType === "Skill"){
        loadout.skills = loadout.skills || [];
        if(loadout.skills.includes(ownedId)) return;
        loadout.skills.push(ownedId);
    }

    saveSquadLoadouts();
    renderEquippedDeckForCurrentMember();
}

function getMemberCPMax(member){
    if(!member) return 0;

    if(member.user_id === null || member.avatar_id === null){
        return 0;
    }

    const avatarLink = findUserAvatarLink(
        member.user_id,
        member.avatar_id
    );

    if(!avatarLink || !avatarLink.base_stats){
        return 0;
    }

    const cpMax = Number(avatarLink.base_stats.cp ?? 0);

    return Math.max(0, cpMax);
}

function getDeckUsedCP(loadout){
    if(!loadout) return 0;

    let total = 0;

    (loadout.weapons || []).forEach((ownedWeaponId) => {
        const ownedWeapon = findOwnedWeaponById(ownedWeaponId);
        const weaponDef = findWeaponDefByOwnedWeapon(ownedWeapon);
        if(weaponDef){
            total += Number(weaponDef.cp_cost || 0);
        }
    });

    (loadout.manifest || []).forEach((ownedManifestId) => {
        const ownedManifest = findOwnedManifestById(ownedManifestId);
        const manifestDef = findManifestDefByOwnedManifest(ownedManifest);
        if(manifestDef){
            total += Number(manifestDef.cp_cost || 0);
        }
    });

    (loadout.skills || []).forEach((ownedSkillId) => {
        const ownedSkill = findOwnedSkillById(ownedSkillId);
        const skillDef = findSkillDefByOwnedSkill(ownedSkill);
        if(skillDef){
            total += Number(skillDef.cp_cost || 0);
        }
    });

    (loadout.battle_items || []).forEach((ownedItemId) => {
        const ownedItem = findOwnedItemById(ownedItemId);
        const itemDef = findItemDefByOwnedItem(ownedItem);
        if(itemDef && itemDef.use_phase === "battle"){
            total += Number(itemDef.cp_cost || 0);
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
    initializeDeckMemberTabs();
    highlightActiveDeckMemberTab();
    renderEquippedDeckForCurrentMember();
    renderUsersCardInventory();
}

function renderUsersCardInventory(){
    const usersCardInventoryEl = document.getElementById("users_card_inventory");
    if(!usersCardInventoryEl) return;

    const member = getCurrentDeckMember();
    const avatar = getCurrentDeckAvatar();
    const loadout = getCurrentDeckLoadout();

    if(!member || !avatar || !loadout){
        usersCardInventoryEl.innerHTML = "";
        return;
    }

    usersCardInventoryEl.innerHTML = "";

    const cpMax = getMemberCPMax(member);

    function makeInventoryCard(cardDef, ownedCard, isEquipped, onEquip){
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

        card.title = isEquipped
            ? `${cardDef.name} equipped`
            : `Equip ${cardDef.name}`;

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
            card.onclick = onEquip;
        }

        usersCardInventoryEl.appendChild(card);
    }

    function canAfford(cardDef){
        const newCpUsed = getDeckUsedCP(loadout) + Number(cardDef.cp_cost || 0);
        return newCpUsed <= cpMax;
    }

    function tryEquipCard(cardType, ownedId, cardDef){
        if(!canAfford(cardDef)){
            alert("Not enough CP!");
            return;
        }

        addCardToCurrentMemberDeck(cardType, ownedId);
        renderDeckPauseDisplay();
    }

    function renderCardGroup({
        ownedCards,
        getDef,
        equippedIds,
        cardType,
        requireTypeMatch = true
    }){
        ownedCards.forEach((ownedCard) => {
            const cardDef = getDef(ownedCard);
            if(!cardDef) return;

            if(requireTypeMatch && !doesCardMatchAvatarType(cardDef, avatar)){
                return;
            }

            const isEquipped = equippedIds.includes(ownedCard.id);

            makeInventoryCard(
                cardDef,
                ownedCard,
                isEquipped,
                function(){
                    tryEquipCard(cardType, ownedCard.id, cardDef);
                }
            );
        });
    }

    const ownedWeapons = users_weapons.filter(card =>
        Number(card.user_id) === Number(member.user_id) &&
        Number(card.avatar_id) === Number(member.avatar_id)
    );

    renderCardGroup({
        ownedCards: ownedWeapons,
        getDef: findWeaponDefByOwnedWeapon,
        equippedIds: loadout.weapons || [],
        cardType: "Weapon",
        requireTypeMatch: true
    });

    const ownedManifestCards = users_manifest.filter(card =>
        Number(card.user_id) === Number(member.user_id) &&
        Number(card.avatar_id) === Number(member.avatar_id)
    );

    renderCardGroup({
        ownedCards: ownedManifestCards,
        getDef: findManifestDefByOwnedManifest,
        equippedIds: loadout.manifest || [],
        cardType: "Manifest",
        requireTypeMatch: true
    });

    const ownedSkills = users_skills.filter(card =>
        Number(card.user_id) === Number(member.user_id) &&
        Number(card.avatar_id) === Number(member.avatar_id)
    );

    renderCardGroup({
        ownedCards: ownedSkills,
        getDef: findSkillDefByOwnedSkill,
        equippedIds: loadout.skills || [],
        cardType: "Skill",
        requireTypeMatch: true
    });

    const ownedItems = users_items.filter(card =>
        Number(card.user_id) === Number(member.user_id)
    );

    renderCardGroup({
        ownedCards: ownedItems.filter((ownedItem) => {
            const itemDef = findItemDefByOwnedItem(ownedItem);
            return itemDef && itemDef.use_phase === "battle";
        }),
        getDef: findItemDefByOwnedItem,
        equippedIds: loadout.battle_items || [],
        cardType: "Item",
        requireTypeMatch: false
    });
}

function isCardEquippableByAvatar(cardDef, avatar, cardType){
    if(cardType === "Item") return true;
    return doesCardMatchAvatarType(cardDef, avatar);
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
    initializeEquipMemberTabs();
    highlightActiveEquipMemberTab();
    renderUserEquipmentInventory();
    renderEquippedEquipmentSlots();
}

function renderUserEquipmentInventory(){
    const userEquipmentInventoryEl = document.getElementById("user_equipment_inventory");
    if(!userEquipmentInventoryEl) return;

    const member = getCurrentEquipMember();
    const avatar = getCurrentEquipAvatar();
    const equipmentLoadout = getCurrentEquipmentLoadout();

    if(!member || !avatar || !equipmentLoadout){
        userEquipmentInventoryEl.innerHTML = "";
        return;
    }

    userEquipmentInventoryEl.innerHTML = "";

    const ownedEquipmentCards = users_equipments.filter(card =>
        Number(card.user_id) === Number(member.user_id)
    );

    ownedEquipmentCards.forEach((ownedEquipment) => {
        const equipmentDef = findEquipmentDefByOwnedEquipment(ownedEquipment);
        if(!equipmentDef) return;

        if(!doesColorMatchAvatarType(equipmentDef, avatar)){
            return;
        }

        const isEquipped = (equipmentLoadout.slots || []).includes(ownedEquipment.id);
        const isSelected = selected_equipment_id === ownedEquipment.id;

        const card = document.createElement("div");
        Object.assign(card.style, {
            width: "92px",
            height: "120px",
            margin: "4px auto",
            border: isSelected
                ? "3px solid cyan"
                : isEquipped
                ? "2px solid gold"
                : "1px solid black",
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
    const equipmentLoadout = getCurrentEquipmentLoadout();
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
            saveEquipmentLoadouts();
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
    const equipmentLoadout = getCurrentEquipmentLoadout();
    if(!equipmentLoadout) return;
    if(selected_equipment_id === null) return;

    if((equipmentLoadout.slots || []).includes(selected_equipment_id)){
        selected_equipment_id = null;
        renderEquipmentPauseDisplay();
        return;
    }

    equipmentLoadout.slots[slotIndex] = selected_equipment_id;
    selected_equipment_id = null;

    saveEquipmentLoadouts();
    renderEquipmentPauseDisplay();
    renderPauseSquad();
    renderUserStats();
}

function unequipEquipmentFromSlot(slotIndex){
    const equipmentLoadout = getCurrentEquipmentLoadout();
    if(!equipmentLoadout) return;

    equipmentLoadout.slots[slotIndex] = null;
    saveEquipmentLoadouts();
    renderEquipmentPauseDisplay();
    renderPauseSquad();
    renderUserStats();
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
    z: 48,
    facing: "right",
    speed: 2,
    moving: false
};

const member_2_state = {
    x: 100,
    top: 850,
    z: 32,
    facing: "right",
    speed: 2,
    moving: false
}

const member_3_state = {
    x: 100,
    top: 850,
    z: 16,
    facing: "right",
    speed: 2,
    moving: false
}

const SQUAD_FOLLOW_DISTANCE = 80;

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

function getSquadMemberEl(slot){
    return cube ? cube.querySelector(`.squad-member[data-slot="${slot}"]`) : null;
}

function createSquadMemberEl(slot){
    if(!cube) return null;

    let el = getSquadMemberEl(slot);
    if(el) return el;

    const playerEl = getPlayerEl();
    const parentLayer = playerEl?.parentElement || cube;

    el = document.createElement("div");
    el.className = "squad-member";
    el.dataset.slot = slot;

    Object.assign(el.style, {
        position: "absolute",
        width: "120px",
        height: "120px",
        backgroundSize: "contain",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center bottom",
        pointerEvents: "none"
    });

    parentLayer.appendChild(el);
    return el;
}

function renderSquadMembers(){
    if(!cube || !Array.isArray(current_squad)) return;

    const slotConfigs = {
        1: member_2_state,
        2: member_3_state
    };

    [1, 2].forEach(slot => {
        const member = findSquadMember(slot);
        const existingEl = getSquadMemberEl(slot);

        if(!member || member.user_id === null || member.avatar_id === null){
            if(existingEl) existingEl.remove();
            return;
        }

        const avatar = findAvatarById(member.avatar_id);
        if(!avatar){
            if(existingEl) existingEl.remove();
            return;
        }

        const el = createSquadMemberEl(slot);
        const state = slotConfigs[slot];

        el.style.left = `${state.x}px`;
        el.style.top = `${state.top}px`;
        el.style.transform = `
            translateZ(${state.z}px)
            scaleX(${state.facing === "left" ? -1 : 1})
        `;
        el.style.backgroundImage = `url(./images/${avatar.image_idle})`;
        el.title = avatar.name || `Squad Member ${slot}`;
    });
}

function updateSquadMemberStates(){
    if(!current_level) return;

    const bounds = getLevelMovementBounds(current_level);

    updateFollowerState(member_2_state, player_state, 60, bounds);
    updateFollowerState(member_3_state, member_2_state, 60, bounds);
}

function updateFollowerState(followerState, leaderState, followGap, bounds){
    const distance = leaderState.x - followerState.x;

    followerState.facing = leaderState.facing;
    followerState.top = leaderState.top + 2;

    // only move if too far away
    if(Math.abs(distance) > SQUAD_FOLLOW_DISTANCE){

        if(distance > 0){
            followerState.x += followerState.speed;
            followerState.facing = "right";
        }else if(distance < 0){
            followerState.x -= followerState.speed;
            followerState.facing = "left";
        }

        followerState.moving = true;
    }else{
        followerState.moving = false;
    }

    // optional soft spacing so they do not crowd too much
    const targetX = leaderState.x - followGap;
    if(followerState.facing === "left"){
        // when facing left, you may want them to trail on the opposite side
        // leave this out for now if you want simpler behavior
    }

    if(followerState.x < bounds.minX){
        followerState.x = bounds.minX;
        followerState.moving = false;
    }

    if(followerState.x > bounds.maxX){
        followerState.x = bounds.maxX;
        followerState.moving = false;
    }
}

function syncSquadMembersToState(){
    [1, 2].forEach(slot => {
        const member = findSquadMember(slot);
        const el = getSquadMemberEl(slot);
        if(!member || !el) return;

        const avatar = findAvatarById(member.avatar_id);
        if(!avatar) return;

        const state = slot === 1 ? member_2_state : member_3_state;

        const idleImage = avatar.image_idle;
        const walkImage = avatar.image_walk;

        el.style.left = `${state.x}px`;
        el.style.top = `${state.top}px`;
        el.style.transform = `
            translateZ(${state.z}px)
            scaleX(${state.facing === "left" ? -1 : 1})
        `;

        el.style.backgroundImage = state.moving
            ? `url(./images/${walkImage})`
            : `url(./images/${idleImage})`;
    });
}

const LANDMARK_X_TRIGGER_RANGE = 18;

function checkRoomLandmarkCollision(){
    if(roomLandmarkTransitioning) return;
    if(!current_level || !Array.isArray(current_level.landmarks)) return;

    let foundLandmark = null;

    current_level.landmarks.forEach(landmark => {
        const playerX = Number(player_state.x);
        const landmarkX = Number(landmark.left);

        if(Math.abs(playerX - landmarkX) <= LANDMARK_X_TRIGGER_RANGE){
            foundLandmark = landmark;
        }
    });

    if(foundLandmark){
        if(!roomLandmarkPromptOpen){
            openRoomLandmarkWindow(foundLandmark);
        }
    }else{
        if(roomLandmarkPromptOpen){
            closeRoomLandmarkWindow();
        }
    }
}

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

let introCutsceneActive = false;
let introDialogueStep = 0;

function setPlayerLayingImage(){
    const playerEl = getPlayerEl();
    if(!playerEl || !current_avatar) return;

    playerEl.style.backgroundImage =
        `url(./images/${current_avatar.image_laying})`;
}

function setPlayerIdleImage(){
    const playerEl = getPlayerEl();
    if(!playerEl || !current_avatar) return;

    playerEl.style.backgroundImage =
        `url(./images/${current_avatar.image_idle})`;
}

function showIntroDialogue(text){
    const box = document.getElementById("intro_dialogue_box");
    const portrait = document.getElementById("intro_dialogue_portrait");
    const dialogueText = document.getElementById("intro_dialogue_text");

    if(!box || !portrait || !dialogueText || !current_avatar) return;

    portrait.style.backgroundImage =
        `url(./images/${current_avatar.image_portrait})`;

    dialogueText.textContent = text;

    box.style.display = "flex";
}

function hideIntroDialogue(){
    const box = document.getElementById("intro_dialogue_box");
    if(box) box.style.display = "none";
}

function startOpeningCutscene(){
    if(localStorage.getItem("new_game_intro_pending") !== "true") return;
    if(localStorage.getItem("opening_cutscene_done") === "true") return;

    introCutsceneActive = true;
    introDialogueStep = 1;

    input_state.left = false;
    input_state.right = false;

    setPlayerLayingImage();

    const fadeLayer = document.getElementById("fade_layer");

    if(fadeLayer){
        fadeLayer.style.display = "block";
        fadeLayer.style.opacity = 1;

        fadeLayer.animate(
            [{ opacity: 1 }, { opacity: 0 }],
            { duration: 2400, fill: "forwards" }
        ).onfinish = function(){
            showIntroDialogue("Where am I?");
        };
    }else{
        showIntroDialogue("Where am I?");
    }
}

const introDialogueClose =
    document.getElementById("intro_dialogue_close");

if(introDialogueClose){
    introDialogueClose.onclick = function(){

        if(!introCutsceneActive) return;

        if(introDialogueStep === 1){
            introDialogueStep = 2;

            setPlayerIdleImage();

            showIntroDialogue(
                "Why am I dressed like a clown?"
            );

            return;
        }

        if(introDialogueStep === 2){
            introDialogueStep = 3;

            showNameEntryWindow();

            return;
        }
    };
}

const nameEntrySubmit =
    document.getElementById("name_entry_submit");

if(nameEntrySubmit){
    nameEntrySubmit.onclick = function(){

        const nameWindow =
            document.getElementById("name_entry_window");

        const nameInput =
            document.getElementById("name_entry_input");

        const username =
            nameInput.value.trim();

        if(username === ""){
            alert("Please enter a username.");
            return;
        }

        saveUsernameToCurrentSlot(username);

        if(current_user){
            current_user.username = username;
        }

        renderUserHUD();

        if(nameWindow){
            nameWindow.style.display = "none";
        }

        hideIntroDialogue();

        introCutsceneActive = false;

        localStorage.setItem(
            "opening_cutscene_done",
            "true"
        );

        localStorage.setItem(
            "new_game_intro_pending",
            "false"
        );
    };
}

function showNameEntryWindow(){
    const nameWindow = document.getElementById("name_entry_window");
    const nameInput = document.getElementById("name_entry_input");

    if(!nameWindow || !nameInput) return;

    nameInput.value = "";

    nameWindow.style.display = "flex";

    showIntroDialogue(
        "A window asking for my user name? What is this, some type of game?"
    );

    setTimeout(() => {
        nameInput.focus();
    }, 100);
}

function saveUsernameToCurrentSlot(username){
    const activeSlot = Number(
        localStorage.getItem("uni_paradiso_active_save_slot") || 1
    );

    const key = `uni_paradiso_save_slot_${activeSlot}`;
    const raw = localStorage.getItem(key);

    if(!raw) return;

    const save = JSON.parse(raw);

    save.user = save.user || {};
    save.user.id = 0;
    save.user.username = username;
    save.user.rank = save.user.rank || "E";
    save.user.rank_exp = save.user.rank_exp || 0;
    save.user.currency = save.user.currency || { gil: 0 };
    save.user.profile = save.user.profile || {
        title: "",
        created_at: Date.now()
    };

    save.updated_at = Date.now();

    localStorage.setItem(key, JSON.stringify(save));

    users[0].username = username;
}

function updatePlayer(){

    if(introCutsceneActive){
        player_state.moving = false;
        syncPlayerToState();

        if(introDialogueStep === 1){
            setPlayerLayingImage();
        }

        return;
    }

    if(roomLandmarkTransitioning){
        syncPlayerToState();
        return;
    }
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

    cube.style.transformStyle = "preserve-3d";

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

    if(targetX < 0) targetX = 0;
    if(targetX > maxCameraX) targetX = maxCameraX;

    camera_state.x += (targetX - camera_state.x) * camera_state.followSpeed;

    cube.style.transform = `
        translateX(${-camera_state.x}px)
        translateZ(0px)
    `;
}

function gameLoop(){
    if(!roomGameLoopStarted) return;
    if(npcDialogueOpen && isAnyMovementInput()){
        closeNPCDialogue();
    }
    updatePlayer();
    checkRoomLandmarkCollision();
    updateSquadMemberStates();
    syncSquadMembersToState();
    if(current_level && player_state.moving){
        saveRoomPlayerLocation();
    }
    updateCamera();
    checkRoomRandomEncounter();

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


function isAnyMovementInput(){
    return (
        input_state.left ||
        input_state.right ||
        input_state.up ||
        input_state.down
    );
}

saveMenu.onclick = function(){

    saveWindow.style.display = "flex";

};

saveWindowClose.onclick = function(){

    saveWindow.style.display = "none";

};

saveGameBtn.onclick = function(){

    const saveData = {

        game_scene:
            localStorage.getItem("game_scene"),

        saved_room_location:
            JSON.parse(
                localStorage.getItem("saved_room_location") || "{}"
            ),

        world_map_data:
            JSON.parse(
                localStorage.getItem("world_map_data") || "{}"
            ),

        timestamp: Date.now()
    };

    localStorage.setItem(
        "player_save",
        JSON.stringify(saveData)
    );

    alert("Game Saved");
};

downloadSaveBtn.onclick = function(){

    const save =
        localStorage.getItem("player_save");

    if(!save){

        alert("No save data found.");
        return;
    }

    const blob = new Blob(
        [save],
        { type: "application/json" }
    );

    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");

    a.href = url;
    a.download = "uni_paradiso_save.json";

    a.click();

    URL.revokeObjectURL(url);
};

uploadSaveBtn.onclick = function(){

    uploadSaveInput.click();

};

uploadSaveInput.addEventListener(
    "change",
    function(){

        const file = uploadSaveInput.files[0];

        if(!file) return;

        const reader = new FileReader();

        reader.onload = function(e){

            try{

                const save =
                    JSON.parse(e.target.result);

                localStorage.setItem(
                    "player_save",
                    JSON.stringify(save)
                );

                if(save.game_scene){

                    localStorage.setItem(
                        "game_scene",
                        save.game_scene
                    );
                }

                if(save.saved_room_location){

                    localStorage.setItem(
                        "saved_room_location",
                        JSON.stringify(
                            save.saved_room_location
                        )
                    );
                }

                if(save.world_map_data){

                    localStorage.setItem(
                        "world_map_data",
                        JSON.stringify(
                            save.world_map_data
                        )
                    );
                }

                alert("Save Uploaded");

                location.reload();

            }catch(err){

                console.error(err);
                alert("Invalid Save File");

            }
        };

        reader.readAsText(file);
    }
);

returnTitleBtn.onclick = function(){

    window.location.href = "./index.html";

};


function loadActiveSaveUserIntoDatabase(){
    const activeSlot = Number(
        localStorage.getItem("uni_paradiso_active_save_slot") || 1
    );

    const saveKey = `uni_paradiso_save_slot_${activeSlot}`;
    const rawSave = localStorage.getItem(saveKey);

    if(!rawSave) return;

    const save = JSON.parse(rawSave);

    if(!save.user) return;

    const userIndex = users.findIndex(user =>
        Number(user.id) === Number(save.user.id)
    );

    if(userIndex >= 0){
        users[userIndex] = {
            ...users[userIndex],
            ...save.user
        };
    }else{
        users.push(save.user);
    }
}