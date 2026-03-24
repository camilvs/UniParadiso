let bod = document.getElementById("bod");
const data_base = document.getElementById('data_base');
let weapons_holder = document.getElementById('weapons_holder');
bod.innerHTML = "hello world";

weapons.forEach(weapon=>{
    let weapon_card = document.createElement('div');
    weapons_holder.appendChild(weapon_card);
    Object.assign(weapon_card.style,{
        width: '240px', height: '340px', border: '1px solid black', borderRadius: '12px',
        margin: '24px', display: 'flex', flexDirection: 'column',
    });
    let weapon_name = document.createElement('div');
    weapon_card.appendChild(weapon_name);
    Object.assign(weapon_name.style,{
        width: '182px', height: '24px', borderBottom: '1px solid black', margin: '4px',
    });
    weapon_name.innerHTML = weapon.name;

    let weapon_image_background = document.createElement('div');
    weapon_card.appendChild(weapon_image_background );
    Object.assign(weapon_image_background .style,{
        width: '240px', height: '180px', backgroundImage: 'linear-gradient(black, grey)',
    });

    let weapon_image = document.createElement('div');
    weapon_image_background.appendChild(weapon_image);
    Object.assign(weapon_image.style,{
        width: '240px', height: '180px', backgroundImage: `url(./images/weapon_${weapon.id}.png)`,
        backgroundSize: 'contain', backgroundPosition: 'center', backgroundRepeat: 'no-repeat', border: '1px solid white'
    });

    let weapon_stat_holder = document.createElement('div');
    weapon_card.appendChild(weapon_stat_holder);
    Object.assign(weapon_stat_holder.style,{width: '240px', height: '28px', backgroundColor: '#222', display: 'flex', flexDirection: 'row', justifyContent: ' space-evenly'});
    
    stat_type.forEach(type=>{
        let type_stat_holder = document.createElement('div');
        weapon_stat_holder.appendChild(type_stat_holder);
        Object.assign(type_stat_holder.style,{
            display: 'flex', flexDirection: 'row',
        });
        let stat_color = document.createElement('div');
        type_stat_holder.appendChild(stat_color);
        Object.assign(stat_color.style,{ width: '12px', height: '12px', borderRadius: '16px', backgroundColor: type.color, marginTop: '6px'});

        let stat_number = document.createElement('div');
        stat_number.id = type.name;
        type_stat_holder.appendChild(stat_number);
        Object.assign(stat_number.style,{color: 'ghostwhite', marginTop: '3px', fontSize: '17px'});

        let stat = weapon_stats.find(s => s.stat_id === weapon.stat_id);
        if(stat){
            stat_number.innerHTML = stat[type.name] ?? 0;
        } else {
            stat_number.innerHTML = 0;
        }
    });
    

    let weapon_desc = document.createElement('div');
    weapon_card.appendChild(weapon_desc);
    weapon_desc.innerHTML = 'Desc: '+weapon.desc;

});


//items
let items =[
    {id: 0, name: "Health Potion", stat_id: 0},
    {id: 1, name: "Small Potion", stat_id: 1},
    {id: 2, name: "Stamina Potion", stat_id: 2},    
    {id: 3, name: "Medium Potion", stat_id: 3},  
    {id: 4, name: "Large Potion", stat_id: 4},  
    {id: 5, name: "Antidote", stat_id: 5},  
    {id: 6, name: "Bandage", stat_id: 6},  
    {id: 7, name: "Smoke Bomb", stat_id: 7},  
    {id: 8, name: "Fire Bomb", stat_id: 8},  
    {id: 9, name: "Ice Bomb", stat_id: 9},  
    {id: 10, name: "Torch", stat_id: 10},  
    {id: 11, name: "Rope", stat_id: 11},  
    {id: 12, name: "Energy potion", stat_id: 12},  
    {id: 13, name: "Health Kit", stat_id: 13},  
    {id: 14, name: "Small Crystal", stat_id: 14},  
    {id: 15, name: "Medium Crystal", stat_id: 15},  
    {id: 16, name: "Large Crystal", stat_id: 16},  
    {id: 17, name: "Coin", stat_id: 17},  
    {id: 18, name: "Gold", stat_id: 18},  
    {id: 19, name: "Stick", stat_id: 19},  
    {id: 20, name: "Rock", stat_id: 20},  
]


//equipment
let equipment = [
    {id: 0, name: "Leather Armor", stat_id: 0},
    {id: 1, name: "Iron Armor", stat_id: 1},
    {id: 2, name: "Steel Armor", stat_id: 2},
    {id: 3, name: "Plate Armor", stat_id: 3},
    {id: 4, name: "Cloth Robe", stat_id: 4},
    {id: 5, name: "Leather Gloves", stat_id: 5},
    {id: 6, name: "Iron Gauntlets", stat_id: 6},
    {id: 7, name: "Steel Gauntlets", stat_id: 7},
    {id: 8, name: "Plate Gauntlets", stat_id: 8},
    {id: 9, name: "Leather Boots", stat_id: 9},
    {id: 10, name: "Iron Boots", stat_id: 10},
    {id: 11, name: "Steel Boots", stat_id: 11},
    {id: 12, name: "Plate Boots", stat_id: 12},
    {id: 13, name: "Wood Shield", stat_id: 13},
    {id: 14, name: "Iron Shield", stat_id: 14},
    {id: 15, name: "Steel Shield", stat_id: 15},
    {id: 16, name: "Plate Shield", stat_id: 16},
    {id: 17, name: "Leather Cap", stat_id: 17},
    {id: 18, name: "Iron Ring", stat_id: 18},
    {id: 19, name: "Steel Ring", stat_id: 19},
    {id: 20, name: "Gold Ring", stat_id: 20},
];

//skills
let skills = [
    {id: 0, name: "", stat_id: 0},
    {id: 1, name: "", stat_id: 1},
    {id: 2, name: "", stat_id: 2},
    {id: 3, name: "", stat_id: 3},
    {id: 4, name: "", stat_id: 4},
    {id: 5, name: "", stat_id: 5},
    {id: 6, name: "", stat_id: 6},
    {id: 7, name: "", stat_id: 7},
    {id: 8, name: "", stat_id: 8},
    {id: 9, name: "", stat_id: 9},
    {id: 10, name: "", stat_id: 10},
    {id: 11, name: "", stat_id: 11},
    {id: 12, name: "", stat_id: 12},
    {id: 13, name: "", stat_id: 13},
    {id: 14, name: "", stat_id: 14},
    {id: 15, name: "", stat_id: 15},
    {id: 16, name: "", stat_id: 16},
    {id: 17, name: "", stat_id: 17},
    {id: 18, name: "", stat_id: 18},
    {id: 19, name: "", stat_id: 19},
    {id: 20, name: "", stat_id: 20},
];

//manifest
let manifest = [
    {id: 0, name: "", stat_id: 0},
    {id: 1, name: "", stat_id: 1},
    {id: 2, name: "", stat_id: 2},
    {id: 3, name: "", stat_id: 3},
    {id: 4, name: "", stat_id: 4},
    {id: 5, name: "", stat_id: 5},
    {id: 6, name: "", stat_id: 6},
    {id: 7, name: "", stat_id: 7},
    {id: 8, name: "", stat_id: 8},
    {id: 9, name: "", stat_id: 9},
    {id: 10, name: "", stat_id: 10},
    {id: 11, name: "", stat_id: 11},
    {id: 12, name: "", stat_id: 12},
    {id: 13, name: "", stat_id: 13},
    {id: 14, name: "", stat_id: 14},
    {id: 15, name: "", stat_id: 15},
    {id: 16, name: "", stat_id: 16},
    {id: 17, name: "", stat_id: 17},
    {id: 18, name: "", stat_id: 18},
    {id: 19, name: "", stat_id: 19},
    {id: 20, name: "", stat_id: 20},
];

//keys
let keys = [
    {id: 0, name: "Rusty Key", stat_id: 0},
    {id: 1, name: "Bronze Key", stat_id: 1},
    {id: 2, name: "Silver Key", stat_id: 2},
    {id: 3, name: "Gold Key", stat_id: 3},
    {id: 4, name: "Crystal Key", stat_id: 4},
    {id: 5, name: "Black Key", stat_id: 5},
    {id: 6, name: "Red Key", stat_id: 6},
    {id: 7, name: "Blue Key", stat_id: 7},
    {id: 8, name: "Green Key", stat_id: 8},
    {id: 9, name: "Yellow Key", stat_id: 9},
    {id: 10, name: "Copper Key", stat_id: 10},
    {id: 11, name: "Iron Key", stat_id: 11},
    {id: 12, name: "Steel Key", stat_id: 12},
    {id: 13, name: "Simple Key", stat_id: 13},
    {id: 14, name: "Heavy Key", stat_id: 14},
    {id: 15, name: "Master Key", stat_id: 15},
    {id: 16, name: "Gate Key", stat_id: 16},
    {id: 17, name: "Room Key", stat_id: 17},
    {id: 18, name: "Storage Key", stat_id: 18},
    {id: 19, name: "Vault Key", stat_id: 19},
    {id: 20, name: "Final Key", stat_id: 20},
];