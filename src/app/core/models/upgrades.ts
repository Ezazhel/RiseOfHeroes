import { Shop, ShopUpgrade } from "@routes/world/city/store/cities.model";
export type UpgradeType = "faster" | "better";

export function descriptionFor(upgrade: ShopUpgrade, shop: Shop) {
    switch (upgrade.upgradeType) {
        case "faster":
            return { intervalStock: shop.intervalStock };
        case "better":
            return { quality: shop.maxItemQuality };
    }
}

export function upgrade(upgrade: ShopUpgrade, shop: Shop, index: number) {
    let newUpgrades = [...shop.upgrades];
    newUpgrades.splice(index, 1, {
        ...shop.upgrades[index],
        level: shop.upgrades[index].level + 1,
    });
    switch (upgrade.upgradeType) {
        case "faster":
            return {
                ...shop,
                intervalStock: shop.intervalStock * (1 - 10 / 100), //10%, could use 0.9
                upgrades: newUpgrades,
            };
        case "better":
            return {
                ...shop,
                maxItemQuality: shop.maxItemQuality + 1,
                upgrades: newUpgrades,
            };
    }
}

export function price(upgrade: ShopUpgrade) {
    switch (upgrade.upgradeType) {
        case "faster":
            return upgrade.basePrice * (1 + (upgrade.level * 10) / 100);
        case "better":
            return upgrade.basePrice * (1 + (upgrade.level * 300) / 100);
    }
}
