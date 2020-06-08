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
