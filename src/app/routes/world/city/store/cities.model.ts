import {
    ITemplateBaseItem,
    ItemSellableType,
} from "@core/models/game-data/game-data.model";
import { Map } from "immutable";
import { Subject } from "rxjs";

export interface City {
    id: string;
    name: string;
    description: string;
    shops: Map<string, Shop>;
    levelRequirement: number;
}
export interface Shop {
    type: string; // Use as key in city.shops
    name: string;
    items: Map<string, ITemplateBaseItem>;
    display: boolean;
    crafts?: any[];
    upgrades?: any[];
    acceptType: ItemSellableType;
    intervalStock?: number; //time for a restock in second
    lastTick?: number; //time of the last displayed counter. Used like : let restock = performance.now() - lastTick >= 0 ? decrement : renewStock,
}
