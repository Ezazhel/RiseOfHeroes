import { Action } from "@ngrx/store";
import { Entity } from "@core/models/base-entity";
import { CombatEncounter } from "./combat.model";

export const COMBAT_ENCOUNTER_READY = "[combat] encounter ready";
export const COMBAT_ENCOUNTER = "[combat] encounter start";
export const COMBAT_VICTORY = "[combat] victory";
export const COMBAT_VICTORY_COMPLETE = "[combat] victory complete";

export class CombatEncounterAction implements Action {
    type: string = COMBAT_ENCOUNTER;
    constructor(public payload: CombatEncounter) {}
}

export class CombatEncounterReadyAction implements Action {
    type: string = COMBAT_ENCOUNTER;
    constructor(public payload: CombatEncounter) {}
}
export class CombatVictoryAction implements Action {
    type: string = COMBAT_ENCOUNTER;
    constructor(public payload: CombatEncounter) {}
}

export class CombatVictoryCompleteAction implements Action {
    type: string = COMBAT_VICTORY_COMPLETE;
    constructor(public payload: CombatEncounter) {}
}
export type CombatActionType =
    | CombatEncounterAction
    | CombatEncounterReadyAction
    | CombatVictoryAction
    | CombatVictoryCompleteAction;
