import {
    ITemplateBaseEquipment,
    Currency,
    ItemQuality,
    ITemplateWeapon,
    ITemplateArmor,
} from "../game-data/game-data.model";
import { CurrencyType } from "../game-data/game-data.data";

export const setGear = (
    set: string,
    baseItem: ITemplateWeapon | ITemplateArmor
) => ({
    ...baseItem,
    icon: set,
    name: `set.${set}.${baseItem.subType}`,
    quality: "legendary",
});

export const setMaterial = (
    materials: CurrencyType[],
    quantities: number[]
) => {
    let m: Currency[] = [];
    materials.forEach((el, index) => {
        m[index] = {
            name: el,
            quantity: quantities[index],
        };
    });
    return m;
};

export const modifyPrice = (quality: ItemQuality, price: number) => {
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
};

export const modifyStat = (
    quality: ItemQuality,
    statValue: number,
    level: number
) => {
    statValue = commonFormula(statValue, level);
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
            statValue = legendaryFormula(statValue);
            break;
    }
    return Math.floor(statValue);
};
//#region Stat
export const commonFormula = (stat: number, level: number) =>
    (stat + level) * (1 + level / 50);
export const uncommonFormula = (stat: number) => stat * 1.1 + 1;
export const rareFormula = (stat: number) => (uncommonFormula(stat) + 2) * 1.15;
export const epicFormula = (stat: number) => (rareFormula(stat) + 2) * 1.2;
export const legendaryFormula = (stat: number) => (epicFormula(stat) + 3) * 1.1;
//#endregion Stat
//#region  Price
export const uPrice = (price) => price * 3;
export const rPrice = (price) => uPrice(price) * 3;
export const ePrice = (price) => rPrice(price) * 2.5;
//#endregion Price
