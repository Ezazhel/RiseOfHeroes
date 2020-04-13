import { Companion, Hero } from "./../entity";
import * as GameStateAction from "./game-state.action";
import * as Immutable from "immutable";
import { Currency, ITemplateBaseItem } from "../game-data/game-data.model";

const initialState: GameState = {
    companions: null,
    inventory: Immutable.OrderedMap<string, ITemplateBaseItem>(),
    currencies: Immutable.Map<string, Currency>(),
    location: "house",
    combatZone: "",
    maxSlots: 16,
    hero: null,
};

export interface GameState {
    readonly hero: Hero; //id Player
    readonly companions: Immutable.Map<string, Companion>; //NPC or Pet that follow you
    readonly inventory: Immutable.OrderedMap<string, ITemplateBaseItem>; // list of id item player have;
    readonly maxSlots: number;
    readonly currencies: Immutable.Map<string, Currency>; //Currency don't take place in inventory
    readonly location: string; //City where the player is
    readonly combatZone: string; //Combat zone do determine monster
}

export function gameRecuder(
    state: GameState = initialState,
    action: GameStateAction.GameActionType
) {
    switch (action.type) {
        case GameStateAction.GAME_NEW:
            return action.payload;
        case GameStateAction.GAME_NEW_FAIL:
        case GameStateAction.GAME_NEW_SUCCESS:
        case GameStateAction.GAME_LOAD:
        case GameStateAction.GAME_LOAD_SUCCESS:
        case GameStateAction.GAME_LOAD_FAIL:
        case GameStateAction.GAME_SAVE:
        case GameStateAction.GAME_SAVE_FAIL:
        case GameStateAction.GAME_SAVE_SUCCESS:
            return state;
        case GameStateAction.GAME_ADD_CURRENCY:
            if (state.currencies.has(action.payload.name)) {
                return {
                    ...state,
                    currencies: state.currencies.updateIn(
                        [action.payload.name, "quantity"],
                        (qty) => qty + action.payload.quantity
                    ),
                };
            } else {
                return {
                    ...state,
                    currencies: state.currencies.set(
                        action.payload.name,
                        action.payload
                    ),
                };
            }
        case GameStateAction.GAME_INVENTORY_ADD:
            return {
                ...state,
                inventory: state.inventory.set(
                    action.payload.id,
                    action.payload
                ),
            };
        case GameStateAction.GAME_INVENTORY_REMOVE:
            return {
                ...state,
                inventory: state.inventory.delete(action.payload),
            };
        case GameStateAction.GAME_UPDATE_HERO:
            return {
                ...state,
                hero: action.payload,
            };
        default:
            return state;
    }
}