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
