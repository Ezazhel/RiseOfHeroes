import { Fighter } from "./../entity";
import { Stat } from "./game-data.model";
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
    name: "weapons.dagger",
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
    name: "weapons.axe",
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
    name: "weapons.hammer",
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
    name: "weapons.sword",
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
    name: "armor.chest",
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
    name: "armor.helmet",
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
    name: "armor.boots",
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
    name: "armor.pants",
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
    name: "armor.gloves",
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
import { swiftnessRune, powerRune, precisionRune } from "../runes/runes.data";

//#region Monster
export const fighters: Fighter[] = [
    {
        eid: "0",
        name: "Dummy Moore",
        icon: "dummy_01",
        attack: 10,
        attackSpeed: 1.1 * 1000,
        hp: 300,
        level: 1,
        maxHp: 300,
        defense: 0,
        lootbag: [
            { item: "none", weigth: 50 },
            { item: "weapon", itemQuality: "common", weigth: 30 },
            { item: "armor", itemQuality: "common", weigth: 30 },
            {
                item: "currency",
                currency: { name: "dummy-row", quantity: 1 },
                weigth: 10,
            },
            {
                item: "currency",
                currency: { name: "dummy-screw", quantity: 1 },
                weigth: 10,
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
        attack: 25,
        attackSpeed: 1.4 * 1000,
        hp: 750,
        level: 1,
        maxHp: 750,
        defense: 25,
        lootbag: [
            { item: "none", weigth: 30 },
            { item: "weapon", itemQuality: "rare", weigth: 20 },
            { item: "armor", itemQuality: "rare", weigth: 20 },
            {
                item: "currency",
                currency: { name: "dummy-row", quantity: 1 },
                weigth: 10,
            },
            {
                item: "currency",
                currency: { name: "dummy-screw", quantity: 1 },
                weigth: 10,
            },
            {
                item: "currency",
                currency: { name: "dummy-wood", quantity: 1 },
                weigth: 10,
            },
        ],
    },
    {
        eid: "2",
        name: "Piggy",
        icon: "pig_01",
        attack: 55,
        attackSpeed: 1.5 * 1000,
        hp: 800,
        level: 1,
        maxHp: 800,
        defense: 75,
        lootbag: [
            { item: "none", weigth: 10 },
            { item: "weapon", itemQuality: "rare", weigth: 20 },
            { item: "weapon", itemQuality: "epic", weigth: 5 },
            { item: "armor", itemQuality: "rare", weigth: 20 },
            { item: "armor", itemQuality: "epic", weigth: 5 },
            {
                item: "currency",
                currency: { name: "dummy-row", quantity: 1 },
                weigth: 10,
            },
            {
                item: "currency",
                currency: { name: "dummy-screw", quantity: 1 },
                weigth: 10,
            },
            {
                item: "currency",
                currency: { name: "dummy-wood", quantity: 1 },
                weigth: 10,
            },
        ],
    },
];

export const dummyCraft: Craft = {
    name: "Dummy",
    weaponArmor: [
        {
            equipment: setGear("dummy", {
                ...baseChest,
                runes: [
                    { ...swiftnessRune, currentLvl: 1 },
                    { ...powerRune, currentLvl: 1 },
                ],
            }) as ITemplateArmor,
            materials: setMaterial(
                ["dummy-row", "dummy-screw", "dummy-wood"],
                [2, 4, 6]
            ),
        },
        {
            equipment: setGear("dummy", {
                ...baseHelmet,
                runes: [{ ...swiftnessRune, currentLvl: 2 }],
            }) as ITemplateArmor,
            materials: setMaterial(
                ["dummy-row", "dummy-screw", "dummy-wood"],
                [3, 2, 2]
            ),
        },
        {
            equipment: setGear("dummy", {
                ...basePants,
                runes: [
                    { ...precisionRune, currentLvl: 1 },
                    { ...swiftnessRune, currentLvl: 1 },
                ],
            }) as ITemplateArmor,
            materials: setMaterial(
                ["dummy-row", "dummy-screw", "dummy-wood"],
                [3, 3, 4]
            ),
        },
        {
            equipment: setGear("dummy", {
                ...baseGloves,
                runes: [{ ...precisionRune, currentLvl: 2 }],
            }) as ITemplateArmor,
            materials: setMaterial(
                ["dummy-row", "dummy-screw", "dummy-wood"],
                [3, 2, 2]
            ),
        },
        {
            equipment: setGear("dummy", {
                ...baseBoots,
                runes: [{ ...swiftnessRune, currentLvl: 2 }],
            }) as ITemplateArmor,
            materials: setMaterial(
                ["dummy-row", "dummy-screw", "dummy-wood"],
                [3, 2, 2]
            ),
        },
    ],
};
export const sheepyCraft: Craft = {
    name: "Sheepy",
    weaponArmor: [
        {
            equipment: setGear("sheepy", {
                ...baseChest,
                stats: [...baseChest.stats].map(
                    (s) => (s = { ...s, value: s.value + 2 })
                ),
                runes: [{ ...precisionRune, currentLvl: 2 }],
            }) as ITemplateArmor,
            materials: setMaterial(
                ["dummy-row", "dummy-screw", "dummy-wood"],
                [2, 4, 6]
            ),
        },
        {
            equipment: setGear("sheepy", {
                ...baseHelmet,
                stats: [...baseHelmet.stats].map(
                    (s) => (s = { ...s, value: s.value + 2 })
                ),
                runes: [{ ...swiftnessRune, currentLvl: 2 }],
            }) as ITemplateArmor,
            materials: setMaterial(
                ["dummy-row", "dummy-screw", "dummy-wood"],
                [3, 2, 2]
            ),
        },
        {
            equipment: setGear("sheepy", {
                ...basePants,
                stats: [...basePants.stats].map(
                    (s) => (s = { ...s, value: s.value + 2 })
                ),
                runes: [
                    { ...powerRune, currentLvl: 1 },
                    { ...swiftnessRune, currentLvl: 1 },
                ],
            }) as ITemplateArmor,
            materials: setMaterial(
                ["dummy-row", "dummy-screw", "dummy-wood"],
                [3, 3, 4]
            ),
        },
        {
            equipment: setGear("sheepy", {
                ...baseGloves,
                stats: [...baseGloves.stats].map(
                    (s) => (s = { ...s, value: s.value + 2 })
                ),
                runes: [{ ...precisionRune, currentLvl: 2 }],
            }) as ITemplateArmor,
            materials: setMaterial(
                ["dummy-row", "dummy-screw", "dummy-wood"],
                [3, 2, 2]
            ),
        },
        {
            equipment: setGear("sheepy", {
                ...baseBoots,
                stats: [...baseBoots.stats].map(
                    (s) => (s = { ...s, value: s.value + 2 })
                ),
                runes: [{ ...powerRune, currentLvl: 2 }],
            }) as ITemplateArmor,
            materials: setMaterial(
                ["dummy-row", "dummy-screw", "dummy-wood"],
                [3, 2, 2]
            ),
        },
        {
            equipment: setGear("sheepy", {
                ...baseAxe,
                stats: [...baseAxe.stats].map(
                    (s) => (s = { ...s, value: s.value + 2 })
                ),
                runes: [
                    { ...powerRune, currentLvl: 1 },
                    { ...precisionRune, currentLvl: 2 },
                ],
            }) as ITemplateWeapon,
            materials: setMaterial(
                ["dummy-row", "dummy-screw", "dummy-wood"],
                [3, 2, 2]
            ),
        },
        {
            equipment: setGear("sheepy", {
                ...baseDagger,
                stats: [...baseDagger.stats].map(
                    (s) => (s = { ...s, value: s.value + 4 })
                ),
                attack: baseDagger.attack * 2,
            }) as ITemplateWeapon,
            materials: setMaterial(
                ["dummy-row", "dummy-screw", "dummy-wood"],
                [3, 2, 2]
            ),
        },
    ],
};
export const piggyCraft: Craft = {
    name: "Piggy",
    weaponArmor: [
        {
            equipment: setGear("piggy", {
                ...baseChest,
                stats: [...baseChest.stats].map(
                    (s) => (s = { ...s, value: s.value + 5 })
                ),
                runes: [{ ...powerRune, currentLvl: 2 }],
            }) as ITemplateArmor,
            materials: setMaterial(
                ["dummy-row", "dummy-screw", "dummy-wood"],
                [2, 4, 6]
            ),
        },
        {
            equipment: setGear("piggy", {
                ...baseHelmet,
                stats: [...baseHelmet.stats].map(
                    (s) => (s = { ...s, value: s.value + 5 })
                ),
                runes: [{ ...precisionRune, currentLvl: 2 }],
            }) as ITemplateArmor,
            materials: setMaterial(
                ["dummy-row", "dummy-screw", "dummy-wood"],
                [3, 2, 2]
            ),
        },
        {
            equipment: setGear("piggy", {
                ...basePants,
                stats: [...basePants.stats].map(
                    (s) => (s = { ...s, value: s.value + 5 })
                ),
                runes: [
                    { ...precisionRune, currentLvl: 1 },
                    { ...powerRune, currentLvl: 1 },
                ],
            }) as ITemplateArmor,
            materials: setMaterial(
                ["dummy-row", "dummy-screw", "dummy-wood"],
                [3, 3, 4]
            ),
        },
        {
            equipment: setGear("piggy", {
                ...baseGloves,
                stats: [...baseGloves.stats].map(
                    (s) => (s = { ...s, value: s.value + 5 })
                ),
                runes: [{ ...powerRune, currentLvl: 2 }],
            }) as ITemplateArmor,
            materials: setMaterial(
                ["dummy-row", "dummy-screw", "dummy-wood"],
                [3, 2, 2]
            ),
        },
        {
            equipment: setGear("piggy", {
                ...baseBoots,
                stats: [...baseBoots.stats].map(
                    (s) => (s = { ...s, value: s.value + 5 })
                ),
                runes: [{ ...precisionRune, currentLvl: 2 }],
            }) as ITemplateArmor,
            materials: setMaterial(
                ["dummy-row", "dummy-screw", "dummy-wood"],
                [3, 2, 2]
            ),
        },
        {
            equipment: setGear("piggy", {
                ...baseHammer,
                stats: [...baseHammer.stats].map(
                    (s) => (s = { ...s, value: s.value + 5 })
                ),
                runes: [
                    { ...powerRune, currentLvl: 2 },
                    { ...precisionRune, currentLvl: 2 },
                ],
            }) as ITemplateWeapon,
            materials: setMaterial(
                ["dummy-row", "dummy-screw", "dummy-wood"],
                [3, 2, 2]
            ),
        },
        {
            equipment: setGear("piggy", {
                ...baseSword,
                stats: [...baseSword.stats].map(
                    (s) => (s = { ...s, value: s.value + 8 })
                ),
                attack: baseSword.attack * 2.5,
                runes: [{ ...powerRune, currentLvl: 1 }],
            }) as ITemplateWeapon,
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
