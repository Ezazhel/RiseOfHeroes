import { GameState } from "./game-state.reducer";
import { Action } from "@ngrx/store";
import { AppState } from "..";
import { Currency, ITemplateBaseItem } from "../game-data/game-data.model";
import { Hero } from "../entity";
import { Spells } from "../spells/spells.model";

export const GAME_INVENTORY_ADD = "[game state] add item";
export const GAME_INVENTORY_REMOVE = "[game state] remove item";

export const GAME_ADD_CURRENCY = "[game state] add currency";

export const GAME_UPDATE_HERO = "[game state] update hero";
export const GAME_EQUIP_ITEM_HERO = "[game state] equip item hero";

export const COMBAT_HERO_SPELL = "[combat] hero launch spell";

//inventory
export class GameStateInventoryAddItemAction implements Action {
    readonly type = GAME_INVENTORY_ADD;
    constructor(public payload: ITemplateBaseItem) {}
}
export class GameStateInventoryRemoveItemAction implements Action {
    readonly type = GAME_INVENTORY_REMOVE;
    constructor(public payload: string) {}
}
//currencies
export class GameStateCurrenciesAddCurrencyAction implements Action {
    readonly type = GAME_ADD_CURRENCY;
    constructor(public payload: Currency) {}
}
// Hero
export class GameStateUpdateHeroAction implements Action {
    readonly type = GAME_UPDATE_HERO;
    constructor(public payload: Hero) {}
}

export class GameStateEquipItemHeroAction implements Action {
    readonly type = GAME_EQUIP_ITEM_HERO;
    constructor(public payload: ITemplateBaseItem) {}
}

export class CombatStateHeroSpell implements Action {
    readonly type = COMBAT_HERO_SPELL;
    constructor(public payload: Spells) {}
}
export type GameActionType =
    | GameStateInventoryAddItemAction
    | GameStateInventoryRemoveItemAction
    | GameStateCurrenciesAddCurrencyAction
    | GameStateUpdateHeroAction
    | GameStateEquipItemHeroAction
    | CombatStateHeroSpell;
