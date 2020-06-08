import { Stat } from "./../game-data/game-data.model";
import { Companion, Hero } from "./../entity";
import * as GameStateAction from "./game-state.action";
import * as Immutable from "immutable";
import {
    Currency,
    ITemplateBaseItem,
    ITemplateArmor,
    ITemplateWeapon,
} from "../game-data/game-data.model";
import { GameService } from "@core/services";
import { update, updateInsert } from "../utils";

const initialState: GameState = {
    companions: null,
    inventory: [],
    currencies: [{ name: "gold", quantity: 50 }],
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
            return { ...state, hero: EquipHero(state.hero, action.payload) };
        default:
            return state;
    }
}

function EquipHero(hero: Hero, item: ITemplateBaseItem): Hero {
    let stats = [...hero.stats];
    if (item.type == "weapon") {
        let weapon = item as ITemplateWeapon;
        hero = { ...hero, weapon: weapon };
        weapon.stats.forEach((stat) => {
            stats = update<Stat>(
                stats,
                (s: Stat) => s.type == stat.type,
                (s: Stat) => {
                    return { ...s, value: s.value + stat.value };
                }
            );
        });
    } else if (item.type == "armor") {
        let armor = item as ITemplateArmor;
        switch (armor.subType) {
            case "chest":
                hero = { ...hero, chest: armor };
                break;
            case "boots":
                hero = { ...hero, boots: armor };
                break;
            case "gloves":
                hero = { ...hero, gloves: armor };
                break;
            case "helmet":
                hero = { ...hero, helmet: armor };
                break;
            case "pants":
                hero = { ...hero, pants: armor };
                break;
        }
        armor.stats.forEach((stat) => {
            stats = update<Stat>(
                stats,
                (s: Stat) => s.type == stat.type,
                (s: Stat) => {
                    return { ...s, value: s.value + stat.value };
                }
            );
        });
        hero = { ...hero, armor: hero.armor + armor.armor };
    }
    return { ...hero, stats: stats };
}
