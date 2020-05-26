import { GameState } from "./game-state.reducer";
import { Action } from "@ngrx/store";
import { AppState } from "..";
import { Currency, ITemplateBaseItem } from "../game-data/game-data.model";
import { Hero } from "../entity";

export const GAME_NEW = "[game state] new";
export const GAME_NEW_SUCCESS = "[game state] new success";
export const GAME_NEW_FAIL = "[game state] new fail";

export const GAME_LOAD = "[game state] load";
export const GAME_LOAD_SUCCESS = "[game state] load success";
export const GAME_LOAD_FAIL = "[game state] load fail";

export const GAME_SAVE = "[game state] save";
export const GAME_SAVE_SUCCESS = "[game state] save success";
export const GAME_SAVE_FAIL = "[game state] save fail";

export const GAME_INVENTORY_ADD = "[game state] add item";
export const GAME_INVENTORY_REMOVE = "[game state] remove item";

export const GAME_ADD_CURRENCY = "[game state] add currency";

export const GAME_UPDATE_HERO = "[game state] update hero";
export const GAME_EQUIP_ITEM_HERO = "[game state] equip item hero";

//New game
export class GameStateNewAction implements Action {
    readonly type = GAME_NEW;
    constructor(public payload: GameState) {}
}
export class GameStateNewSuccessAction implements Action {
    readonly type = GAME_NEW_SUCCESS;
    constructor(public payload: GameState) {}
}
export class GameStateNewFailAction implements Action {
    readonly type = GAME_NEW_FAIL;
    constructor(public payload: any) {}
}

//Load game
export class GameStateLoadAction implements Action {
    readonly type = GAME_LOAD;
}
export class GameStateLoadSuccessAction implements Action {
    readonly type = GAME_LOAD_SUCCESS;
    constructor(public payload: AppState) {}
}
export class GameStateLoadFailAction implements Action {
    readonly type = GAME_LOAD_FAIL;
    constructor(public payload: any) {}
}

//Save Action
export class GameStateSaveAction implements Action {
    readonly type = GAME_SAVE;
}
export class GameStateSaveSuccessAction implements Action {
    readonly type = GAME_SAVE_SUCCESS;
    constructor(public payload: string = null) {}
}
export class GameStateSaveFailAction implements Action {
    readonly type = GAME_SAVE_FAIL;
    constructor(public payload: any) {}
}
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

export type GameActionType =
    | GameStateNewSuccessAction
    | GameStateNewAction
    | GameStateNewFailAction
    | GameStateLoadAction
    | GameStateLoadFailAction
    | GameStateLoadSuccessAction
    | GameStateSaveAction
    | GameStateSaveFailAction
    | GameStateSaveSuccessAction
    | GameStateInventoryAddItemAction
    | GameStateInventoryRemoveItemAction
    | GameStateCurrenciesAddCurrencyAction
    | GameStateUpdateHeroAction
    | GameStateEquipItemHeroAction;
