import { Entity } from "./base-entity";

export function getXPForLevel(level: number) {
    return level * 2;
}

export function getHPForLevel(level: number, model: Entity) {
    return (
        Math.floor(model.defense * Math.pow(level, 1.1)) + model.basedefense * 2
    );
}

export function getStrengthForLevel(level: number, model: Entity) {
    return Math.floor(model.baseattack * Math.pow(level, 0.65));
}

export function getAgilityForLevel(level: number, model: Entity) {
    return Math.floor(model.basespeed * Math.pow(level, 0.95));
}

export function getVitalityForLevel(level: number, model: Entity) {
    return Math.floor(model.basedefense * Math.pow(level, 0.95));
}

export function getIntelligenceForLevel(level: number, model: Entity) {
    return Math.floor(model.basemagic * Math.pow(level, 0.95));
}
