let bod = document.getElementById("bod");
let weapons_holder = document.getElementById('weapons_holder');
bod.innerHTML = "hello world";

let weapons = [
    {id: 0, name: "Shock Batton", stat_id: 0},
    {id: 1, name: "Iron Pipe", stat_id: 1},
    {id: 2, name: "Combat Sword", stat_id: 2},
    {id: 3, name: "Chain Saw", stat_id: 3},
    {id: 4, name: "Iron Chain", stat_id: 4},
    {id: 5, name: "Sniper Rifle", stat_id: 5},
    {id: 6, name: "Wooden Club", stat_id: 6},
    {id: 7, name: "Shotgun", stat_id: 7},
    {id: 8, name: "Blessed Staff", stat_id: 8},
    {id: 9, name: "Cursed Staff", stat_id: 9},
    {id: 10, name: "Sling Shot", stat_id: 10},
    {id: 11, name: "Iron Mace", stat_id: 11},
    {id: 12, name: "Iron Spear", stat_id: 12},
    {id: 13, name: "Gauntlet", stat_id: 13},
    {id: 14, name: "Iron Claws", stat_id: 14},
    {id: 15, name: "Poison Dagger", stat_id: 15},
    {id: 16, name: "Iron Axe", stat_id: 16},
    {id: 17, name: "Ye Old Blapper", stat_id: 17},
    {id: 18, name: "Leather Whip", stat_id: 18},
    {id: 19, name: "Spiked Mace", stat_id: 19},
    {id: 20, name: "Mage Staff", stat_id: 20},
    {id: 21, name: "Buster Sword", stat_id: 21},
    {id: 22, name: "Bow", stat_id: 22},
    {id: 23, name: "Iron Dagger", stat_id: 23},
];

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
        width: '340px', height: '340px', backgroundImage: `url(./images/weapon_${weapon.id}.png)`,
        backgroundSize: 'contain', backgroundPosition: '-100px -45px', backgroundRepeat: 'no-repeat', border: '1px solid white'
    });

});
