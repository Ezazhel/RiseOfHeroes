import {
    ITemplateWeapon,
    ITemplateArmor,
    ItemQuality,
    WeaponCategory,
    ArmorCategory,
    ItemCategories,
    LootbagItem,
    Reward,
} from "../game-data/game-data.model";
import * as baseItem from "../game-data/game-data.data";
import { toNumber } from "@ngneat/transloco";
import * as craft from "../craft/craft.utils";
import { entityId } from "../utils";
import { pickFromLootbag } from "./loot.utils";
import { rareRunes, epicRunes } from "../runes/runes.data";
import { Rune } from "../runes/runes.model";

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

function generateIconArray(icon: string, number: number) {
    let array: Array<string> = new Array<string>();
    for (let i = 1; i <= number; i++) {
        array.push(`${icon}${i}`);
    }
    return array;
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

function randomize(array: Array<any>): number {
    return Math.floor(Math.random() * array.length);
}

export function pickRandomIcon(array: Array<string>): string {
    return array[randomize(array)];
}

function pickRandomReward(): ItemCategories {
    return PossibleReward[randomize(PossibleReward)];
}

export function generateReward(
    level: number,
    maxQuality: number,
    setQuality?: ItemQuality
) {
    switch (pickRandomReward()) {
        case "weapon":
            return generateRandomWeapon(level, maxQuality, setQuality);
        case "armor":
            return generateRandomArmor(level, maxQuality, setQuality);
    }
}

export function generateRandomWeapon(
    level: number,
    maxQuality: number,
    setQuality?: ItemQuality
) {
    let type = WeaponTypeArray[randomize(WeaponTypeArray)];
    const quality = [...QualityArray].splice(0, maxQuality);
    switch (type) {
        case "dagger":
            return generateWeapon(
                baseItem.baseDagger,
                "dagger",
                level,
                Icons.get("dagger"),
                quality,
                setQuality
            );
        case "hammer":
            return generateWeapon(
                baseItem.baseHammer,
                "hammer",
                level,
                Icons.get("hammer"),
                quality,
                setQuality
            );
        case "sword":
            return generateWeapon(
                baseItem.baseSword,
                "sword",
                level,
                Icons.get("sword"),
                quality,
                setQuality
            );
        case "axe":
            return generateWeapon(
                baseItem.baseAxe,
                "axe",
                level,
                Icons.get("axe"),
                quality,
                setQuality
            );
    }
}

export function generateRandomArmor(
    level: number,
    maxQuality: number,
    setQuality?: ItemQuality
) {
    let type = ArmorTypeArray[randomize(ArmorTypeArray)];
    const quality = [...QualityArray].splice(0, maxQuality);
    switch (type) {
        case "boots":
            return generateArmor(
                baseItem.baseBoots,
                "boots",
                level,
                Icons.get("boots"),
                quality,
                setQuality
            );

        case "chest":
            return generateArmor(
                baseItem.baseChest,
                "chest",
                level,
                Icons.get("chest"),
                quality,
                setQuality
            );

        case "gloves":
            return generateArmor(
                baseItem.baseGloves,
                "gloves",
                level,
                Icons.get("gloves"),
                quality,
                setQuality
            );
        case "helmet":
            return generateArmor(
                baseItem.baseHelmet,
                "helmet",
                level,
                Icons.get("helmet"),
                quality,
                setQuality
            );

        case "pants":
            return generateArmor(
                baseItem.basePants,
                "pants",
                level,
                Icons.get("pants"),
                quality,
                setQuality
            );
    }
}

function generateArmor(
    baseArmor: ITemplateArmor,
    id: string,
    level: number,
    icons: Array<string>,
    maxQuality: Array<ItemQuality>,
    setQuality?: ItemQuality
): ITemplateArmor {
    let quality =
        setQuality != undefined
            ? setQuality
            : QualityArray[randomize(maxQuality)];
    return {
        ...baseArmor,
        id: entityId(id),
        level: level,
        icon: pickRandomIcon(icons),
        quality: quality,
        runes: pickRandomRuneFromArray(quality),
        armor: craft.modifyStat(quality, baseArmor.armor, level),
        value: craft.modifyPrice(quality, baseArmor.value * level),
        stats: [...baseArmor.stats].map((s) => ({
            ...s,
            value: craft.modifyStat(quality, s.value, level),
        })),
    };
}
function generateWeapon(
    baseWeapon: ITemplateWeapon,
    id: string,
    level: number,
    icons: Array<string>,
    maxQuality: Array<ItemQuality>,
    setQuality?: ItemQuality
) {
    let quality =
        setQuality != undefined
            ? setQuality
            : QualityArray[randomize(maxQuality)];

    return {
        ...baseWeapon,
        id: entityId(id),
        level: level,
        icon: pickRandomIcon(icons),
        quality: quality,
        attack: baseWeapon.attack * level,
        value: craft.modifyPrice(quality, baseWeapon.value * level),
        dps: toNumber(
            ((baseWeapon.attack * level) / (baseWeapon.speed / 1000)).toFixed(2)
        ),
        stats: [...baseWeapon.stats].map((s) => ({
            ...s,
            value: craft.modifyStat(quality, s.value, level),
        })),
    };
}

export const pickRandomRuneFromArray = (quality: ItemQuality): Rune[] => {
    let arr: LootbagItem[] = [];
    let countItem = 0;
    switch (quality) {
        case "rare":
            arr = rareRunes;
            countItem = 1;
            break;
        case "epic":
            arr = epicRunes;
            countItem = 2;
            break;
    }
    if (arr != []) {
        let runes: Rune[] = [];
        for (let i = 0; i < countItem; i++) {
            let rwd = pickFromLootbag(arr);
            if (rwd.item !== "none") {
                runes.push(rwd.rune);
            }
        }
        return runes;
    }
    return [];
};

export function getFromLootbag(level: number, bag: LootbagItem[]): Reward {
    let rwd = pickFromLootbag(bag);
    switch (rwd.item) {
        case "armor":
            const armor = generateRandomArmor(level, 0, rwd.itemQuality);
            return {
                reward: { ...armor, value: armor.value * 0.5 },
                rewardType: "armor",
            };
        case "weapon":
            const weapon = generateRandomWeapon(level, 0, rwd.itemQuality);
            return {
                reward: { ...weapon, value: weapon.value * 0.5 }, //% will change with rune or passive or unlockable
                rewardType: "weapon",
            };
        case "currency":
            return { reward: rwd.currency, rewardType: "currency" };
    }
}
