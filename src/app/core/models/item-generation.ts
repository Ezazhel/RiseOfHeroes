import {
    ITemplateWeapon,
    ITemplateArmor,
    ItemQuality,
    WeaponCategory,
    ArmorCategory,
    ItemCategories,
    entityId,
} from "./game-data/game-data.model";
import * as baseItem from "./game-data/game-data.data";
import { toInteger } from "lodash";
import { toNumber } from "@ngneat/transloco";

export const Icons: Map<WeaponCategory | ArmorCategory, string[]> = new Map([
    ["axe", generateIconArray("a", 24)],
    ["hammer", generateIconArray("h", 14)],
    ["sword", generateIconArray("s", 19)],
    ["dagger", generateIconArray("d", 18)],
    ["helmet", generateIconArray("h", 25)],
    ["chest", generateIconArray("c", 23)],
    ["gloves", generateIconArray("g", 21)],
    ["pants", generateIconArray("p", 21)],
    ["boots", generateIconArray("b", 17)],
]);

const uncommonFormula = (stat: number) => stat * 1.3;
const rareFormula = (stat: number) => (uncommonFormula(stat) + 5) * 1.2;
const epicFormula = (stat: number) => (rareFormula(stat) + 10) * 1.2;

function generateIconArray(icon: string, number: number) {
    let array: Array<string> = new Array<string>();
    for (let i = 1; i <= number; i++) {
        array.push(`${icon}${i}`);
    }
    return array;
}
function randomize(array: Array<any>): number {
    return Math.floor(Math.random() * array.length);
}

export function pickRandomIcon(array: Array<string>): string {
    return array[randomize(array)];
}

function pickRandomReward(): ItemCategories {
    return PossibleReward[randomize(PossibleReward)];
}

export function generateReward(level: number, maxQuality: number) {
    switch (pickRandomReward()) {
        case "weapon":
            return generateRandomWeapon(level, maxQuality);
        case "armor":
            return generateRandomArmor(level, maxQuality);
    }
}

export function generateRandomWeapon(level: number, maxQuality: number) {
    let type = WeaponTypeArray[randomize(WeaponTypeArray)];
    const quality = [...QualityArray].splice(0, maxQuality);
    switch (type) {
        case "dagger":
            return generateWeapon(
                baseItem.baseDagger,
                "dagger",
                level,
                Icons.get("dagger"),
                quality
            );
        case "hammer":
            return generateWeapon(
                baseItem.baseHammer,
                "hammer",
                level,
                Icons.get("hammer"),
                quality
            );
        case "sword":
            return generateWeapon(
                baseItem.baseSword,
                "sword",
                level,
                Icons.get("sword"),
                quality
            );
        case "axe":
            return generateWeapon(
                baseItem.baseAxe,
                "axe",
                level,
                Icons.get("axe"),
                quality
            );
    }
}

export function generateRandomArmor(level: number, maxQuality: number) {
    let type = ArmorTypeArray[randomize(ArmorTypeArray)];
    const quality = [...QualityArray].splice(0, maxQuality);
    switch (type) {
        case "boots":
            return generateArmor(
                baseItem.baseBoots,
                "boots",
                level,
                Icons.get("boots"),
                quality
            );

        case "chest":
            return generateArmor(
                baseItem.baseChest,
                "chest",
                level,
                Icons.get("chest"),
                quality
            );

        case "gloves":
            return generateArmor(
                baseItem.baseGloves,
                "gloves",
                level,
                Icons.get("gloves"),
                quality
            );
        case "helmet":
            return generateArmor(
                baseItem.baseHelmet,
                "helmet",
                level,
                Icons.get("helmet"),
                quality
            );

        case "pants":
            return generateArmor(
                baseItem.basePants,
                "pants",
                level,
                Icons.get("pants"),
                quality
            );
    }
}

function generateArmor(
    baseArmor: ITemplateArmor,
    id: string,
    level: number,
    icons: Array<string>,
    maxQuality: Array<ItemQuality>
): ITemplateArmor {
    let quality = QualityArray[randomize(maxQuality)];
    return {
        ...baseArmor,
        id: entityId(id),
        level: level,
        icon: pickRandomIcon(icons),
        quality: quality,
        name: `${id.charAt(0).toUpperCase()}${id.slice(1)}`,
        armor: modifyStat(quality, baseArmor.armor * level),
        value: modifyPrice(quality, baseArmor.value * level),
        stats: [
            {
                ...baseItem.strenghtStat,
                value: modifyStat(quality, baseItem.strenghtStat.value * level),
            },
            {
                ...baseItem.enduranceStat,
                value: modifyStat(
                    quality,
                    baseItem.enduranceStat.value * level
                ),
            },
        ],
    };
}
export function generateWeapon(
    baseWeapon: ITemplateWeapon,
    id: string,
    level: number,
    icons: Array<string>,
    maxQuality: Array<ItemQuality>
) {
    let quality = QualityArray[randomize(maxQuality)];

    return {
        ...baseWeapon,
        id: entityId(id),
        level: level,
        icon: pickRandomIcon(icons),
        name: `${id.charAt(0).toUpperCase()}${id.slice(1)}`,
        value: modifyPrice(quality, baseWeapon.value * level),
        dps: toNumber(
            (baseWeapon.attack / (baseWeapon.speed / 1000)).toFixed(2)
        ),
        stats: [
            {
                ...baseItem.strenghtStat,
                value: modifyStat(quality, baseItem.strenghtStat.value * level),
            },
            {
                ...baseItem.enduranceStat,
                value: modifyStat(
                    quality,
                    baseItem.enduranceStat.value * level
                ),
            },
        ],
    };
}

function modifyPrice(quality: ItemQuality, price: number) {
    const uPrice = (price) => price * 3;
    const rPrice = (price) => uPrice(price) * 3;
    const ePrice = (price) => rPrice(price) * 2.5;
    switch (quality) {
        case "uncommon":
            price = uPrice(price);
            break;
        case "rare":
            price = rPrice(price);
            break;
        case "epic":
            price = ePrice(price);
            break;
    }
    return Math.floor(price);
}

function modifyStat(quality: ItemQuality, statValue: number) {
    switch (quality) {
        case "uncommon":
            statValue = uncommonFormula(statValue);
            break;
        case "rare":
            statValue = rareFormula(statValue);
            break;
        case "epic":
            statValue = epicFormula(statValue);
            break;
        case "legendary":
            break; //Actualy Legendary stat will be set manually.
    }
    return Math.floor(statValue);
}

export const QualityArray: Array<ItemQuality> = [
    "common",
    "uncommon",
    "rare",
    "epic",
    "legendary",
];
export const WeaponTypeArray: Array<WeaponCategory> = [
    "dagger",
    "hammer",
    "axe",
    "sword",
];

export const ArmorTypeArray: Array<ArmorCategory> = [
    "helmet",
    "chest",
    "gloves",
    "pants",
    "boots",
];

export const PossibleReward: Array<ItemCategories> = ["armor", "weapon"];
