import {
    ITemplateBaseItem,
    ItemSellableType,
} from "@core/models/game-data/game-data.model";
import { Map } from "immutable";

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
    intervalStock?: number; //time for a restock
    restockTimer?: number; //time left till restock
}
