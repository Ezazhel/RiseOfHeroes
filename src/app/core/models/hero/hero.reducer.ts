import { Entity } from "../base-entity";
import * as heroAction from ".//hero.action";

const initialState: Entity = {
    attack: 25,
    entityclass: "peasant",
    exp: 0,
    defense: 0,
    hp: 500,
    maxressource: 0,
    ressource: 0,
    maxhp: 500,
    speed: 1,
    level: 1,
    type: "hero",
    baseattack: 25,
    basedefense: 0,
    basemagic: 0,
    basespeed: 1,
};

export function heroReducer(
    state: Entity = initialState,
    action: heroAction.HeroActionType
) {
    switch (action.type) {
        case heroAction.ENTITY_UPDATE:
            return {
                ...state,
                level: action.payload.level,
                exp: action.payload.exp,
                hp: action.payload.hp,
                maxHp: action.payload.maxhp,
                attack: action.payload.attack,
            };
        default:
            return state;
    }
}
