import {
    ITemplateBaseItem,
    ItemSellableType,
    Currency,
    ITemplateArmor,
    ITemplateWeapon,
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
    maxLevel: number;
    levelRequirement: number;
}
export interface Shop {
    type: ShopType; // Use as key in city.shops
    name: string;
    maxItemQuality?: number;
    maxItem?: number;
    items: ITemplateBaseItem[];
    display: boolean;
    crafts?: Craft[];
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
    targetId?: string;
    maxLevel?: number;
    currentLevel?: number;
    name?: string;
    effectId: number;
    description: string;
}

export const baseHuntingAction: BuildingAction = {
    type: "hunt",
    effectId: 0, //Function to hunt, redirect to route with the monster as parameters.
    description: "city.city_building.huntingPost.action.description",
};

export interface Craft {
    name: string;
    weaponArmor: CraftSet[];
}
export interface CraftSet {
    equipment: ITemplateWeapon | ITemplateArmor;
    materials: Currency[];
}
