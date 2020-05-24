import { Map } from "immutable";
import { Stat } from "./game-data.model";
import { ITemplateWeapon, ITemplateArmor } from "./game-data.model";
//#region Stats
export const strenghtStat: Stat = {
    type: "strength",
    name: "game.stats.strength",
    value: 3,
};
export const enduranceStat: Stat = {
    type: "endurance",
    name: "game.stats.endurance",
    value: 5,
};
export const intelligenceStat: Stat = {
    type: "intellect",
    name: "game.stats.intellect",
    value: 0,
};
export const agilityStat: Stat = {
    type: "agility",
    name: "game.stats.agility",
    value: 0,
};
//#endregion Stats

//#region Weapon
export const baseWeapon: ITemplateWeapon = {
    id: "", //will be set randomly
    name: "", //will be set randomly
    level: 0, //will be the level of the hero or maxLevel for city
    attack: 5, //will change accordigng to level of weapon and bonuses of hero
    type: "weapon",
    value: 20, //will change according to level of weapon and bonuses of hero
    icon: "", //will be set randomly
    subType: "dagger",
    weaponHandling: "1h",
    quality: "common", //will be set randomly
};
export const baseDagger: ITemplateWeapon = {
    ...baseWeapon,
    attack: 5, //will change accordigng to level of weapon and bonuses of hero
    value: 20, //will change according to level of weapon and bonuses of hero
    subType: "dagger",
    weaponHandling: "1h",
};

export const baseSpear: ITemplateWeapon = {
    ...baseWeapon,
    attack: 9, //will change accordigng to level of weapon and bonuses of hero
    value: 35, //will change according to level of weapon and bonuses of hero
    subType: "spear",
    weaponHandling: "2h",
};
export const baseHammer: ITemplateWeapon = {
    ...baseWeapon,
    attack: 12, //will change accordigng to level of weapon and bonuses of hero
    value: 45, //will change according to level of weapon and bonuses of hero
    subType: "hammer",
    weaponHandling: "2h",
};

export const baseSword: ITemplateWeapon = {
    ...baseWeapon,
    attack: 7, //will change accordigng to level of weapon and bonuses of hero
    value: 25, //will change according to level of weapon and bonuses of hero
    subType: "sword",
    weaponHandling: "1h",
};
export const baseTwoHandedSword: ITemplateWeapon = {
    ...baseWeapon,
    attack: 11, //will change accordigng to level of weapon and bonuses of hero
    value: 45, //will change according to level of weapon and bonuses of hero
    subType: "sword",
    weaponHandling: "2h",
};
//#endregion Weapon
//#region Armor
export const baseArmor: ITemplateArmor = {
    id: "",
    name: "",
    value: 0,
    level: 0,
    icon: "",
    type: "armor",
    subType: "boots",
    armor: 5,
    quality: "common",
};

export const baseChest: ITemplateArmor = {
    ...baseArmor,
    value: 15,
    subType: "chest",
    armor: 15,
};

export const baseHelm: ITemplateArmor = {
    ...baseArmor,
    value: 5,
    subType: "helmet",
    armor: 5,
};

export const baseBoots: ITemplateArmor = {
    ...baseArmor,
    value: 5,
    subType: "boots",
    armor: 5,
};

export const basePants: ITemplateArmor = {
    ...baseArmor,
    value: 10,
    subType: "pants",
    armor: 10,
};

export const baseGloves: ITemplateArmor = {
    ...baseArmor,
    value: 5,
    subType: "gloves",
    armor: 5,
};
//#endregion Armor

// export const cities: Map<string, City> = Map<string, City>([
//     [
//         "zulah",
//         {
//             id: "zulah",
//             name: "Zul'ah",
//             levelRequirement: 1,
//         },
//     ],
//     [
//         "heapoo",
//         {
//             id: "heapoo",
//             name: "Heapoo",
//             levelRequirement: 5,
//         },
//     ],
//     [
//         "krakotoa",
//         {
//             id: "krakotoa",
//             name: "Krakotoa",
//             levelRequirement: 10,
//         },
//     ],
//     [
//         "baalrug",
//         {
//             id: "baalrug",
//             name: "baalrug",
//             levelRequirement: 15,
//         },
//     ],
//     [
//         "cresolia",
//         {
//             id: "cresolia",
//             name: "Crésolia",
//             levelRequirement: 26,
//         },
//     ],
//     [
//         "onigashi",
//         {
//             id: "onigashi",
//             name: "Onigashi",
//             levelRequirement: 35,
//         },
//     ],
// ]);
