import { ActionReducerMap } from "@ngrx/store";
import { Entity } from "./base-entity";
import * as fromInventory from "./inventory/inventory.reducer";
import * as fromCombat from "./combat/combat.reducer";
import * as fromHero from "./hero/hero.reducer";

export interface AppState {
    inventory: fromInventory.InventoryRecords;
    hero: Entity;
    combat: fromCombat.CombatRecord;
}

export const reducers: ActionReducerMap<AppState> = {
    inventory: fromInventory.inventoryReducer,
    hero: fromHero.heroReducer,
    combat: fromCombat.combatReducer,
};

export * from "./hero";
export * from "./monster";
export * from "./message";
export * from "./item";
