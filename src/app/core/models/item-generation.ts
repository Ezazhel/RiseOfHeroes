import {
    ITemplateWeapon,
    ITemplateArmor,
    ItemQuality,
    WeaponCategory,
    ArmorCategory,
    ItemCategories,
    entityId,
    LootbagItem,
} from "./game-data/game-data.model";
import * as baseItem from "./game-data/game-data.data";
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

const commonFormula = (stat: number) => stat * 1.3;
const uncommonFormula = (stat: number) => stat * 1.3 + 1;
const rareFormula = (stat: number) => (uncommonFormula(stat) + 4) * 1.2;
const epicFormula = (stat: number) => (rareFormula(stat) + 8) * 1.2;

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
        name: `${id.charAt(0).toUpperCase()}${id.slice(1)}`,
        armor: modifyStat(quality, baseArmor.armor * level),
        value: modifyPrice(quality, baseArmor.value * level),
        stats: [...baseArmor.stats].map((s) => ({
            ...s,
            value: modifyStat(quality, commonFormula(s.value) * level),
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
        name: `${id.charAt(0).toUpperCase()}${id.slice(1)}`,
        attack: baseWeapon.attack * level,
        value: modifyPrice(quality, baseWeapon.value * level),
        dps: toNumber(
            ((baseWeapon.attack * level) / (baseWeapon.speed / 1000)).toFixed(2)
        ),
        stats: [...baseWeapon.stats].map((s) => ({
            ...s,
            value: modifyStat(quality, commonFormula(s.value) * level),
        })),
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
export function getFromLootbag(level: number, bag: LootbagItem[]) {
    let totalWeigth: number = 1;
    bag = [...bag].map((el) => {
        el = { ...el, rangeFrom: totalWeigth };
        totalWeigth = totalWeigth + el.weigth;
        return { ...el, rangeTo: totalWeigth - 1 };
    });
    let rndNumber = Math.floor(Math.random() * totalWeigth);
    let rwd = bag.find(
        (l) => rndNumber >= l.rangeFrom && rndNumber <= l.rangeTo
    );
    switch (rwd.item) {
        case "armor":
            return generateRandomArmor(level, 0, rwd.itemQuality);
            break;
        case "weapon":
            return generateRandomWeapon(level, 0, rwd.itemQuality);
            break;
    }
}
