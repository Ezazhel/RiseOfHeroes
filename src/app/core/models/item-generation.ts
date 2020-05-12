import {
    ITemplateWeapon,
    ITemplateArmor,
    ItemQuality,
    WeaponCategory,
    ArmorCategory,
} from "./game-data/game-data.model";
import { Random } from "random-js";
const random = new Random();
export const ChestIcon: Array<string> = generateIconArray("c", 23);
export const HelmIcon: Array<string> = generateIconArray("h", 25);
export const GlovesIcon: Array<string> = generateIconArray("g", 21);
export const PantIcon: Array<string> = generateIconArray("p", 21);
export const BootsIcon: Array<string> = generateIconArray("b", 17);

export const QualityArray: Array<ItemQuality> = [
    "commun",
    "uncommon",
    "rare",
    "epic",
    "legendary",
];
export const WeaponTypeArray: Array<WeaponCategory> = [
    "dagger",
    "hammer",
    "spear",
    "sword",
];

export const ArmorTypeArray: Array<ArmorCategory> = [
    "helm",
    "chest",
    "gloves",
    "pants",
    "boots",
];
function generateIconArray(icon: string, number: number) {
    let array: Array<string> = new Array<string>();
    for (let i = 1; i <= number; i++) {
        array.push(`${icon}${i}`);
    }
    return array;
}

export function pickRandomIcon(array: Array<string>): string {
    return array[random.integer(1, array.length - 1)];
}

export const baseWeapon: ITemplateWeapon = {
    id: "", //will be set randomly
    name: "", //will be set randomly
    level: 0, //will be the level of the hero or maxLevel for city
    attack: 5, //will change accordigng to level of weapon and bonuses of hero
    type: "weapon",
    value: 20, //will change according to level of weapon and bonuses of hero
    icon: "", //will be set randomly
    weaponCategory: "dagger",
    weaponHandling: "1h",
    style: "", //will be set randomly
};
export const baseDagger: ITemplateWeapon = {
    ...baseWeapon,
    attack: 5, //will change accordigng to level of weapon and bonuses of hero
    value: 20, //will change according to level of weapon and bonuses of hero
    weaponCategory: "dagger",
    weaponHandling: "1h",
};

export const baseSpear: ITemplateWeapon = {
    ...baseWeapon,
    attack: 9, //will change accordigng to level of weapon and bonuses of hero
    value: 35, //will change according to level of weapon and bonuses of hero
    weaponCategory: "spear",
    weaponHandling: "2h",
};
export const baseHammer: ITemplateWeapon = {
    ...baseWeapon,
    attack: 12, //will change accordigng to level of weapon and bonuses of hero
    value: 45, //will change according to level of weapon and bonuses of hero
    weaponCategory: "hammer",
    weaponHandling: "2h",
};

export const baseSword: ITemplateWeapon = {
    ...baseWeapon,
    attack: 7, //will change accordigng to level of weapon and bonuses of hero
    value: 25, //will change according to level of weapon and bonuses of hero
    weaponCategory: "sword",
    weaponHandling: "1h",
};
export const baseTwoHandedSword: ITemplateWeapon = {
    ...baseWeapon,
    attack: 11, //will change accordigng to level of weapon and bonuses of hero
    value: 45, //will change according to level of weapon and bonuses of hero
    weaponCategory: "sword",
    weaponHandling: "2h",
};

export const baseArmor: ITemplateArmor = {
    id: "",
    name: "",
    value: 0,
    level: 0,
    icon: "",
    type: "armor",
    subType: "boots",
    armor: 5,
    style: "",
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
    subType: "helm",
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
