import { ItemFilter } from "./../item";
import * as inventoryAction from "./inventory.action";
import { Item } from "..";

const initialState = {
    items: [],
    filtered: "all" as ItemFilter,
    maxSlots: 16,
};

export interface InventoryRecords {
    items: Item[];
    filtered: ItemFilter;
    maxSlots: number;
}

export function inventoryReducer(
    state: InventoryRecords = initialState,
    action: inventoryAction.InventoryActions
) {
    switch (action.type) {
        case inventoryAction.INVENTORY_ADD_ITEM:
            return {
                ...state,
                items: [...state.items, action.payload as Item],
            };
        case inventoryAction.INVENTORY_REMOVE_ITEM:
            return {
                ...state,
                items: state.items.filter((item, i) => i !== action.payload),
            };
        case inventoryAction.INVENTORY_FILTER_ITEMS:
            return {
                ...state,
                filtered: action.payload as ItemFilter,
            };
        default:
            return state;
    }
}
