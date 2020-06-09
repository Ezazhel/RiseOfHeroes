import {
    ITemplateBaseItem,
    ItemSellableType,
} from "@core/models/game-data/game-data.model";
import { UpgradeType } from "@core/models/upgrades";
import { ActionType } from "@core/models/actions";

export type ShopType = "blacksmith" | "alchemist" | "merchant";
export type BuildingType = "huntingPost" | "mayor" | "tavern";
export interface City {
    id: string;
    name: string;
    description: string;
    shops?: Shop[];
    building?: Building[];
    levelRequirement: number;
}
export interface Shop {
    type: ShopType; // Use as key in city.shops
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

export interface Building {
    type: BuildingType;
    name: string;
    actions: BuildingAction[];
}

export interface ShopUpgrade {
    name: string;
    level: number;
    levelMax: number;
    basePrice: number;
    upgradeType: UpgradeType;
    description: string;
}

export interface BuildingAction {
    type: ActionType;
    targetId?: number;
    name: string;
    effectId: number;
    description: string;
}
