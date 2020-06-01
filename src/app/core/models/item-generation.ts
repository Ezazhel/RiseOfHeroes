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

export const ChestIcon: Array<string> = generateIconArray("c", 23);
export const HelmetIcon: Array<string> = generateIconArray("h", 25);
export const GlovesIcon: Array<string> = generateIconArray("g", 21);
export const PantIcon: Array<string> = generateIconArray("p", 21);
export const BootsIcon: Array<string> = generateIconArray("b", 17);

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

function generateReward(level: number, maxQuality: number) {
    switch (pickRandomReward()) {
        case "item":
            break;
        case "weapon":
            switch (WeaponTypeArray[randomize(WeaponTypeArray)]) {
                case "dagger":
                    return generateWeapon(
                        baseItem.baseDagger,
                        "dagger",
                        level,
                        []
                    );
                case "hammer":
                    return generateWeapon(
                        baseItem.baseHammer,
                        "hammer",
                        level,
                        []
                    );
                case "spear":
                    return generateWeapon(
                        baseItem.baseSpear,
                        "spear",
                        level,
                        []
                    );
                case "sword":
                    return generateWeapon(
                        baseItem.baseSword,
                        "sword",
                        level,
                        []
                    );
            }
        case "armor":
            return generateRandomArmor(level, maxQuality);
    }
}
export function generateRandomArmor(level: number, maxQuality: number) {
    let type = ArmorTypeArray[randomize(ArmorTypeArray)];
    const quality = [...QualityArray].splice(0, maxQuality);
    console.log(quality);
    switch (type) {
        case "boots":
            return generateArmor(
                baseItem.baseBoots,
                "boots",
                level,
                BootsIcon,
                quality
            );

        case "chest":
            return generateArmor(
                baseItem.baseChest,
                "chest",
                level,
                ChestIcon,
                quality
            );

        case "gloves":
            return generateArmor(
                baseItem.baseGloves,
                "gloves",
                level,
                GlovesIcon,
                quality
            );
        case "helmet":
            return generateArmor(
                baseItem.baseHelmet,
                "helmet",
                level,
                HelmetIcon,
                quality
            );

        case "pants":
            return generateArmor(
                baseItem.basePants,
                "pants",
                level,
                PantIcon,
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
) {
    return {
        ...baseArmor,
        id: entityId(id),
        level: level,
        icon: pickRandomIcon(icons),
        quality: QualityArray[randomize(maxQuality)],
        name: `${id.charAt(0).toUpperCase()}${id.slice(1)}`,
        stats: [
            {
                ...baseItem.strenghtStat,
                value: baseItem.strenghtStat.value * level,
            },
            {
                ...baseItem.enduranceStat,
                value: baseItem.enduranceStat.value * level,
            },
        ],
    };
}
export function generateWeapon(
    baseWeapon: ITemplateWeapon,
    id: string,
    level: number,
    icons: Array<string>
) {
    return {
        ...baseWeapon,
        id: entityId(id),
        level: level,
        icon: pickRandomIcon(icons),
        name: `${id.charAt(0).toUpperCase()}${id.slice(1)}`,
        stats: [
            {
                ...baseItem.strenghtStat,
                value: baseItem.strenghtStat.value * level,
            },
            {
                ...baseItem.enduranceStat,
                value: baseItem.enduranceStat.value * level,
            },
        ],
    };
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
    "spear",
    "sword",
];

export const ArmorTypeArray: Array<ArmorCategory> = [
    "helmet",
    "chest",
    "gloves",
    "pants",
    "boots",
];

export const PossibleReward: Array<ItemCategories> = [
    "armor",
    "weapon",
    "item",
];
