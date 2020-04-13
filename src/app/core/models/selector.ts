import { ITemplateBaseItem, ItemFilter } from "./game-data/game-data.model";
import { createSelector } from "@ngrx/store";
import { GameState } from "@core/models/game-state/game-state.reducer";
import { createFeatureSelector } from "@ngrx/store";
import * as Immutable from "immutable";
import { AppState } from ".";

export const gameStateSelector = createFeatureSelector<GameState>("gameState");

export const sliceGameStateMaxSlots = createSelector(
    gameStateSelector,
    (game) => game.maxSlots
);
export const heroSelector = createSelector(
    gameStateSelector,
    (gameState: GameState) => gameState.hero
);

export const currencySelector = createSelector(
    gameStateSelector,
    (gameState: GameState) => gameState.currencies
);

export const inventorySelector = createSelector(
    gameStateSelector,
    (gameState: GameState) => {
        return gameState.inventory;
    }
);

export const inventoryToArraySelector = createSelector(
    inventorySelector,
    (inventory: Immutable.Map<string, ITemplateBaseItem>) => {
        if (inventory.size > 0) {
            return inventory.valueSeq().toArray();
        } else {
            return null;
        }
    }
);

export const inventoryFiltered = (filter: ItemFilter) =>
    createSelector(inventoryToArraySelector, (items: ITemplateBaseItem[]) => {
        if (filter !== "all") {
            return items.filter((item, i) => {
                return item.type === filter;
            });
        } else {
            return items;
        }
    });
export const totalInventory = createSelector(
    sliceGameStateMaxSlots,
    inventoryToArraySelector,
    (maxSlots: number, items: ITemplateBaseItem[]) => {
        if (items) {
            return `${items.length}/${maxSlots}`;
        } else {
            return "";
        }
    }
);