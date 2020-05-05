import { Action } from "@ngrx/store";
import { ITemplateBaseItem } from "@core/models/game-data/game-data.model";
import { Shop } from "./cities.model";
import { Map } from "immutable";
export const CITY_SHOP_RENEW_ITEM = "[city] renew shop item";
export const CITY_SHOP_BUY = "[city] buy shop item";
export const CITY_SHOP_SELL = "[city] sell item to shop";

export class CityShopRenewItem implements Action {
    readonly type: string = CITY_SHOP_RENEW_ITEM;
    constructor(public payload: ShopInteraction) {}
}

export class CityShopBuy implements Action {
    readonly type: string = CITY_SHOP_BUY;
    constructor(public payload: ShopInteraction) {}
}
export class CityShopSellItem implements Action {
    readonly type: string = CITY_SHOP_SELL;
    constructor(public payload: ShopInteraction) {}
}

export type CityActionType = CityShopRenewItem | CityShopBuy | CityShopSellItem;

export interface ShopInteraction {
    city: string;
    shopType?: string;
    shops?: Map<string, Shop>;
    item?: ITemplateBaseItem;
    items?: Map<string, ITemplateBaseItem>;
}
