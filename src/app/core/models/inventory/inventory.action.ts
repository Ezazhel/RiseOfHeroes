import { Item, ItemFilter } from "./../item";
import { Action } from "@ngrx/store";

export const INVENTORY_ADD_ITEM = "[inventory] add";
export const INVENTORY_REMOVE_ITEM = "[inventory] remove";
export const INVENTORY_FILTER_ITEMS = "[inventory] filter";

export class InventoryAddItemAction implements Action {
    readonly type: string = INVENTORY_ADD_ITEM;
    payload: Item;
    constructor(public item: Item) {
        this.payload = item;
    }
}

export class InventoryRemoveItemAction implements Action {
    readonly type: string = INVENTORY_REMOVE_ITEM;
    payload: number;
    constructor(public itemIndex: number) {
        this.payload = itemIndex;
    }
}
export class InventoryFilterItemsAction implements Action {
    readonly type: string = INVENTORY_FILTER_ITEMS;
    constructor(public payload: ItemFilter) {}
}
export type InventoryActions =
    | InventoryAddItemAction
    | InventoryRemoveItemAction
    | InventoryFilterItemsAction;
