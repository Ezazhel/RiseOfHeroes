import { Companion, Hero } from "../entity/entity";
import * as GameStateAction from "./game-state.action";
import * as Immutable from "immutable";
import { Currency, ITemplateBaseItem } from "../game-data/game-data.model";
import { GameService } from "@core/services";
import { update, updateInsert } from "../utils";
import { Equip, UnEquip } from "../entity/entity.utils";

import { Spells } from "../spells/spells.model";

const initialState: GameState = {
    companions: null,
    inventory: [],
    currencies: [{ name: "gold", quantity: 1000 }],
    location: "house",
    combatZone: "",
    maxSlots: 16,
    hero: GameService.create("peasant"),
};

export interface GameState {
    readonly hero: Hero; //Player
    readonly companions: Immutable.Map<string, Companion>; //NPC or Pet that follow you
    readonly inventory: Array<ITemplateBaseItem>; // list of id item player have;
    readonly maxSlots: number;
    readonly currencies: Array<Currency>; //Currency don't take place in inventory
    readonly location: string; //City where the player is
    readonly combatZone: string; //Combat zone do determine monster
}

export function gameRecuder(
    state: GameState = initialState,
    action: GameStateAction.GameActionType
) {
    switch (action.type) {
        case GameStateAction.GAME_ADD_CURRENCY:
            return {
                ...state,
                currencies: updateInsert<Currency>(
                    state.currencies,
                    (c: Currency) => c.name == action.payload.name,
                    (c: Currency) => ({
                        ...c,
                        quantity: c.quantity + action.payload.quantity,
                    }),
                    action.payload
                ),
            };
        case GameStateAction.GAME_INVENTORY_ADD:
            return {
                ...state,
                inventory: state.inventory.concat(action.payload),
            };
        case GameStateAction.GAME_INVENTORY_REMOVE:
            return {
                ...state,
                inventory: [...state.inventory].filter(
                    (i) => i.id != action.payload
                ),
            };
        case GameStateAction.GAME_UPDATE_HERO:
            return {
                ...state,
                hero: action.payload,
            };
        case GameStateAction.GAME_EQUIP_ITEM_HERO:
            console.log(state.inventory);
            console.log(action.payload.id);
            return {
                ...state,
                hero: Equip(state.hero, action.payload),
                inventory: [...state.inventory].filter(
                    (i) => i.id != action.payload.id
                ),
            };

        case GameStateAction.GAME_UNEQUIP_ITEM_HERO:
            //OnUnequip add item to inventory
            return action.payload.id === "null"
                ? state
                : {
                      ...state,
                      hero: UnEquip(state.hero, action.payload),
                      inventory:
                          action.payload.id === "null"
                              ? state.inventory
                              : state.inventory.concat(action.payload),
                  };
        case GameStateAction.COMBAT_HERO_SPELL:
            return {
                ...state,
                hero: {
                    ...state.hero,
                    equippedSpell: update(
                        state.hero.equippedSpell,
                        (s: Spells) => s.id === action.payload.id,
                        (s: Spells) => ({
                            ...s,
                            isInCooldown: action.payload.isInCooldown,
                        })
                    ),
                },
            };
        case GameStateAction.COMBAT_HERO_POTION:
            return {
                ...state,
                hero: {
                    ...state.hero,
                    potion: {
                        ...state.hero.potion,
                        isInCooldown: action.payload.isInCooldown,
                    },
                },
            };
        default:
            return state;
    }
}
