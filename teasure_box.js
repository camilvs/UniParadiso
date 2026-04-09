function openChest(t_id){

    if(!current_level) return;

    const chest = current_level.treasure_boxes
        .find(t => t.t_id === t_id);

    if(!chest) return;

    // already opened
    if(chest.opened){

        showMessage("The chest is empty.");
        return;

    }

    // give reward
    giveChestReward(chest);

    // mark opened
    chest.opened = true;

    // change sprite
    updateChestVisual(t_id);

    saveLevel();
}
//reward
function giveChestReward(chest){

    if(!chest.content_type) return;

    let reward = {
        type: chest.content_type,
        id: chest.content_id
    };

    let inventory =
        JSON.parse(localStorage.getItem("inventory_items")) || [];

    inventory.push(reward);

    localStorage.setItem(
        "inventory_items",
        JSON.stringify(inventory)
    );

    showMessage("You obtained a reward!");
}
//update chest
function updateChestVisual(t_id){

    const chestEl =
        document.querySelector(
            `.treasure_box[data-t_id="${t_id}"]`
        );

    if(!chestEl) return;

    chestEl.style.backgroundImage =
        `url(./images/chest_open.png)`;

}
//click handler
cube.addEventListener("click",(e)=>{

    const chestEl =
        e.target.closest(".treasure_box");

    if(!chestEl) return;

    const t_id =
        Number(chestEl.dataset.t_id);

    openChest(t_id);

});
//restore chest on load
function restoreChestStates(){

    if(!current_level) return;

    current_level.treasure_boxes
        .forEach(chest=>{

            if(chest.opened){

                const el =
                    document.querySelector(
                        `.treasure_box[data-t_id="${chest.t_id}"]`
                    );

                if(el){

                    el.style.backgroundImage =
                        `url(./images/chest_open.png)`;

                }

            }

        });

}
