import { Shop } from "@routes/world/city/store/cities.model";

export function restockTimeUpgrade(shop: Shop, level: number, index: number) {
    let newUpgrades = [...shop.upgrades];
    newUpgrades.splice(index, 1, {
        ...shop.upgrades[index],
        level: shop.upgrades[index].level + 1,
    });
    return {
        ...shop,
        intervalStock: shop.intervalStock * (1 - 10 / 100), //10%, could use 0.9
        upgrades: newUpgrades,
    };
}
export function improveQualityUpgrade(
    shop: Shop,
    level: number,
    index: number
) {
    let newUpgrades = [...shop.upgrades];
    newUpgrades.splice(index, 1, {
        ...shop.upgrades[index],
        level: shop.upgrades[index].level + 1,
    });
    return {
        ...shop,
        maxItemQuality: shop.maxItemQuality + 1,
        upgrades: newUpgrades,
    };
}
