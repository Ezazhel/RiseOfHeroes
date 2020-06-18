import {
    ITemplateBaseEquipmennt,
    Currency,
    ItemQuality,
} from "../game-data/game-data.model";
import { CurrencyType } from "../game-data/game-data.data";
import {
    commonFormula,
    uncommonFormula,
    rareFormula,
    epicFormula,
    uPrice,
    rPrice,
    ePrice,
    legendaryFormula,
} from "../utils";
export const setGear = (
    set: string,
    name: string,
    baseItem: ITemplateBaseEquipmennt
): ITemplateBaseEquipmennt => ({
    ...baseItem,
    icon: set,
    name: name,
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
