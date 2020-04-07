import { Action } from "@ngrx/store";
import { Entity } from "../base-entity";

export const ENTITY_UPDATE = "[entity] update";

export class HeroUpdate implements Action {
    type: string = ENTITY_UPDATE;
    constructor(public payload: Entity) {}
}

export type HeroActionType = HeroUpdate;
