import { Entity } from "@core/models/base-entity";
import * as combatAction from "./combat.action";
import { Combatant } from "./combat.model";

const initialState: CombatRecord = {
    hero: null,
    monster: {
        attack: 15,
        defense: 0,
        hp: 125,
        maxhp: 125,
        exp: 25,
        gold: 0,
        maxressource: 0,
        ressource: 0,
        level: 1,
        speed: 1,
    },
    zone: "",
    items: [],
    gold: 0,
    exp: 0,
};
export interface CombatRecord {
    hero: Entity;
    monster: Combatant;
    zone: "";
    items: [];
    gold: 0;
    exp: 0;
}

export function combatReducer(
    state: CombatRecord = initialState,
    action: combatAction.CombatActionType
) {
    switch (action.type) {
        case combatAction.COMBAT_ENCOUNTER:
            return state;
        case combatAction.COMBAT_VICTORY:
            break;
        case combatAction.COMBAT_ENCOUNTER_READY:
            break;
        default:
            return state;
    }
}
