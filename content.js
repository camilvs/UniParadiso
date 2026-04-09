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

