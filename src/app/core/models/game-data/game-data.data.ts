import { Fighter } from "./../entity";
import { Stat, LootbagItem } from "./game-data.model";
import { ITemplateWeapon, ITemplateArmor } from "./game-data.model";

export type CurrencyType = "gold" | "dummy-wood" | "dummy-screw" | "dummy-row";

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
    dps: 5,
    speed: 1 * 1000,
    quality: "common", //will be set randomly
};
export const baseDagger: ITemplateWeapon = {
    ...baseWeapon,
    attack: 5, //will change accordigng to level of weapon and bonuses of hero
    value: 50, //will change according to level of weapon and bonuses of hero
    subType: "dagger",
    speed: 1.6 * 1000,
    weaponHandling: "1h",
    stats: [
        {
            ...strenghtStat,
            value: 2,
        },
        {
            ...enduranceStat,
            value: 3,
        },
    ],
};

export const baseAxe: ITemplateWeapon = {
    ...baseWeapon,
    attack: 9, //will change accordigng to level of weapon and bonuses of hero
    value: 65, //will change according to level of weapon and bonuses of hero
    subType: "axe",
    speed: 3.2 * 1000,
    weaponHandling: "2h",
    stats: [
        {
            ...strenghtStat,
            value: 4,
        },
        {
            ...enduranceStat,
            value: 5,
        },
    ],
};
export const baseHammer: ITemplateWeapon = {
    ...baseWeapon,
    attack: 12, //will change accordigng to level of weapon and bonuses of hero
    value: 80, //will change according to level of weapon and bonuses of hero
    subType: "hammer",
    speed: 3.4 * 1000,
    weaponHandling: "2h",
    stats: [
        {
            ...strenghtStat,
            value: 4,
        },
        {
            ...enduranceStat,
            value: 5,
        },
    ],
};

export const baseSword: ITemplateWeapon = {
    ...baseWeapon,
    attack: 7, //will change accordigng to level of weapon and bonuses of hero
    value: 55, //will change according to level of weapon and bonuses of hero
    subType: "sword",
    speed: 2.6 * 1000,
    weaponHandling: "1h",
    stats: [
        {
            ...strenghtStat,
            value: 3,
        },
        {
            ...enduranceStat,
            value: 4,
        },
    ],
};
export const baseTwoHandedSword: ITemplateWeapon = {
    ...baseWeapon,
    attack: 11, //will change accordigng to level of weapon and bonuses of hero
    value: 75, //will change according to level of weapon and bonuses of hero
    subType: "sword",
    speed: 3.6 * 1000,
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
    value: 35,
    subType: "chest",
    armor: 15,
    stats: [
        {
            ...strenghtStat,
            value: 2,
        },
        {
            ...enduranceStat,
            value: 4,
        },
    ],
};

export const baseHelmet: ITemplateArmor = {
    ...baseArmor,
    value: 15,
    subType: "helmet",
    armor: 5,
    stats: [
        {
            ...strenghtStat,
            value: 1,
        },
        {
            ...enduranceStat,
            value: 2,
        },
    ],
};

export const baseBoots: ITemplateArmor = {
    ...baseArmor,
    value: 15,
    subType: "boots",
    armor: 5,
    stats: [
        {
            ...strenghtStat,
            value: 1,
        },
        {
            ...enduranceStat,
            value: 2,
        },
    ],
};

export const basePants: ITemplateArmor = {
    ...baseArmor,
    value: 25,
    subType: "pants",
    armor: 10,
    stats: [
        {
            ...strenghtStat,
            value: 2,
        },
        {
            ...enduranceStat,
            value: 3,
        },
    ],
};

export const baseGloves: ITemplateArmor = {
    ...baseArmor,
    value: 15,
    subType: "gloves",
    armor: 5,
    stats: [
        {
            ...strenghtStat,
            value: 1,
        },
        {
            ...enduranceStat,
            value: 2,
        },
    ],
};
//#endregion Armor
import { Craft } from "@routes/world/city/store/cities.model";
import { setGear, setMaterial } from "../craft/craft.utils";
//#region Monster
export const fighters: Fighter[] = [
    {
        eid: "0",
        name: "Dummy Moore",
        icon: "dummy_01",
        attack: 15,
        attackSpeed: 1 * 1000,
        hp: 350,
        level: 1,
        maxHp: 350,
        defense: 0,
        lootbag: [
            { item: "none", weigth: 60 },
            { item: "weapon", itemQuality: "common", weigth: 30 },
            { item: "armor", itemQuality: "common", weigth: 30 },
            { item: "weapon", itemQuality: "rare", weigth: 15 },
            { item: "armor", itemQuality: "rare", weigth: 15 },
            {
                item: "currency",
                currency: { name: "dummy-row", quantity: 1 },
                weigth: 5,
            },
            {
                item: "currency",
                currency: { name: "dummy-screw", quantity: 1 },
                weigth: 5,
            },
            {
                item: "currency",
                currency: { name: "dummy-wood", quantity: 1 },
                weigth: 10,
            },
        ],
    },
    {
        eid: "1",
        name: "Sheepy",
        icon: "sheep_01",
        attack: 35,
        attackSpeed: 1.4 * 1000,
        hp: 750,
        level: 1,
        maxHp: 750,
        defense: 25,
    },
    {
        eid: "2",
        name: "Piggy",
        icon: "pig_01",
        attack: 65,
        attackSpeed: 1.5 * 1000,
        hp: 1000,
        level: 1,
        maxHp: 1000,
        defense: 75,
    },
];

export const dummyCraft: Craft = {
    name: "Dummy",
    weaponArmor: [
        {
            equipment: setGear(
                "dummy",
                "Dummy Torso",
                baseChest
            ) as ITemplateArmor,
            materials: setMaterial(
                ["dummy-row", "dummy-screw", "dummy-wood"],
                [2, 4, 6]
            ),
        },
        {
            equipment: setGear(
                "dummy",
                "Dummy Head",
                baseHelmet
            ) as ITemplateArmor,
            materials: setMaterial(
                ["dummy-row", "dummy-screw", "dummy-wood"],
                [3, 2, 2]
            ),
        },
        {
            equipment: setGear(
                "dummy",
                "Dummy Panties",
                basePants
            ) as ITemplateArmor,
            materials: setMaterial(
                ["dummy-row", "dummy-screw", "dummy-wood"],
                [3, 3, 4]
            ),
        },
        {
            equipment: setGear(
                "dummy",
                "Dummy Hands",
                baseGloves
            ) as ITemplateArmor,
            materials: setMaterial(
                ["dummy-row", "dummy-screw", "dummy-wood"],
                [3, 2, 2]
            ),
        },
        {
            equipment: setGear(
                "dummy",
                "Dummy Boots",
                baseBoots
            ) as ITemplateArmor,
            materials: setMaterial(
                ["dummy-row", "dummy-screw", "dummy-wood"],
                [3, 2, 2]
            ),
        },
    ],
};
//#endregion Monster

//#region City
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
//#endregion City
