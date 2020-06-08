import {
    ITemplateBaseItem,
    ItemSellableType,
} from "@core/models/game-data/game-data.model";
import { UpgradeType } from "@core/models/upgrades";

export interface City {
    id: string;
    name: string;
    description: string;
    shops: Shop[];
    levelRequirement: number;
}
export interface Shop {
    type: string; // Use as key in city.shops
    name: string;
    maxItemQuality?: number;
    items: ITemplateBaseItem[];
    display: boolean;
    crafts?: any[];
    upgrades?: ShopUpgrade[];
    acceptType: ItemSellableType;
    intervalStock?: number; //time for a restock in second
    lastTick?: number; //time of the last displayed counter. Used like : let restock = performance.now() - lastTick >= 0 ? decrement : renewStock,
}

export interface ShopUpgrade {
    name: string;
    level: number;
    levelMax: number;
    basePrice: number;
    upgradeType: UpgradeType;
    description: string;
}
