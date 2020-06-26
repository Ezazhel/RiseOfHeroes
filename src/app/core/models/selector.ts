import {
    ITemplateBaseItem,
    ItemFilter,
    Currency,
    ItemCategories,
    WeaponCategory,
    ArmorCategory,
} from "./game-data/game-data.model";
import { createSelector } from "@ngrx/store";
import { GameState } from "@core/models/game-state/game-state.reducer";
import { createFeatureSelector } from "@ngrx/store";
import { Hero } from "./entity";
import { CurrencyType } from "./game-data/game-data.data";

export const gameStateSelector = createFeatureSelector<GameState>("gameState");

export const sliceGameStateMaxSlots = createSelector(
    gameStateSelector,
    (game) => game.maxSlots
);

export const heroSelector = createSelector(
    gameStateSelector,
    (gameState: GameState) => gameState.hero
);

export const equippedSelector = (
    isWeapon: boolean,
    armorCategory?: ArmorCategory
) =>
    createSelector(heroSelector, (h: Hero) => {
        if (isWeapon) return h?.weapon;
        else {
            switch (armorCategory) {
                case "chest":
                    return h?.chest;
                case "boots":
                    return h?.boots;
                case "gloves":
                    return h?.gloves;
                case "helmet":
                    return h?.helmet;
                case "pants":
                    return h?.pants;
            }
        }
    });
export const levelSelector = createSelector(
    gameStateSelector,
    (gameState: GameState) => gameState.hero.level
);

export const currenciesSelector = createSelector(
    gameStateSelector,
    (gameState: GameState) => gameState.currencies
);

export const currencySelector = (type: CurrencyType) =>
    createSelector(gameStateSelector, (gameState: GameState) =>
        gameState.currencies.find((c) => c.name === type)
    );

export const goldSelector = createSelector(
    currenciesSelector,
    (currencies: Currency[]) =>
        currencies.find((c: Currency) => c.name == "gold")
);

export const inventorySelector = createSelector(
    gameStateSelector,
    (gameState: GameState) => {
        return gameState.inventory;
    }
);

export const inventoryToArraySelector = createSelector(
    inventorySelector,
    (inventory: ITemplateBaseItem[]) => {
        return inventory.length > 0 ? inventory : null;
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

export const availableSlot = createSelector(
    sliceGameStateMaxSlots,
    inventoryToArraySelector,
    (maxSlots: number, items: ITemplateBaseItem[]) =>
        maxSlots - (items === null ? 0 : items.length)
);

export const spellsSelector = createSelector(heroSelector, (hero: Hero) => {
    return hero.spells;
});
