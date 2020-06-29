import { Action } from "@ngrx/store";
import { ITemplateBaseItem } from "@core/models/game-data/game-data.model";
import { Shop, Building, City } from "./cities.model";
import { Map } from "immutable";
export const CITY_SHOP_RENEW_ITEM = "[city] renew shop item";
export const CITY_SHOP_BUY = "[city] buy shop item";
export const CITY_SHOP_SELL = "[city] sell item to shop";
export const CITY_UPGRADE_SHOP = "[city] upgrade shop";
export const CITY_BUILDING_UPGRADE_FIGHTER = "[city] building upgrade fighter";
export const CITY_ADD_CITY = "[city] add City";

export class CityShopRenewItem implements Action {
    readonly type = CITY_SHOP_RENEW_ITEM;
    constructor(public payload: ShopInteraction) {}
}

export class CityShopBuy implements Action {
    readonly type = CITY_SHOP_BUY;
    constructor(public payload: ShopInteraction) {}
}
export class CityShopSellItem implements Action {
    readonly type = CITY_SHOP_SELL;
    constructor(public payload: ShopInteraction) {}
}

export class CityUpgradeShop implements Action {
    readonly type = CITY_UPGRADE_SHOP;
    constructor(public payload: ShopInteraction) {}
}

export class CityBuildingUpgradeFighter implements Action {
    readonly type = CITY_BUILDING_UPGRADE_FIGHTER;
    constructor(public payload: BuildingInteraction) {}
}

export class CityAddCity implements Action {
    readonly type = CITY_ADD_CITY;
    constructor(public payload: City) {}
}

export type CityActionType =
    | CityShopRenewItem
    | CityShopBuy
    | CityShopSellItem
    | CityUpgradeShop
    | CityBuildingUpgradeFighter
    | CityAddCity;

export interface ShopInteraction {
    city: string;
    shopType?: string;
    shops?: Map<string, Shop>;
    shop?: Shop;
    item?: ITemplateBaseItem;
    items?: ITemplateBaseItem[];
}

export interface BuildingInteraction {
    city: string;
    building: Building;
}
