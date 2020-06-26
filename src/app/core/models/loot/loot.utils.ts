import { LootbagItem } from "../game-data/game-data.model";

//#region Loot
export const pickFromLootbag = (bag: LootbagItem[]) => {
    let totalWeigth: number = 0;
    bag = [...bag].map((el) => {
        el = { ...el, rangeFrom: totalWeigth };
        totalWeigth = totalWeigth + el.weigth;
        return { ...el, rangeTo: totalWeigth };
    });
    let rndNumber = Math.floor(Math.random() * totalWeigth);
    let rwd = bag.find(
        (l) => rndNumber >= l.rangeFrom && rndNumber <= l.rangeTo
    );
    return rwd;
};
//#endregion Loot
