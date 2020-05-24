import { BaseEntity } from "./entity";

export function getXPForLevel(level: number) {
    return level * 2;
}

export function getHPForLevel(level: number, model: BaseEntity) {
    return (
        Math.floor(model.defense * Math.pow(level, 1.1)) + model.baseDefense * 2
    );
}

export function getStrengthForLevel(level: number, model: BaseEntity) {
    return Math.floor(model.baseAttack * Math.pow(level, 0.65));
}

export function getAgilityForLevel(level: number, model: BaseEntity) {
    return Math.floor(model.baseSpeed * Math.pow(level, 0.95));
}

export function getVitalityForLevel(level: number, model: BaseEntity) {
    return Math.floor(model.baseDefense * Math.pow(level, 0.95));
}

export function getIntelligenceForLevel(level: number, model: BaseEntity) {
    return Math.floor(model.baseMagic * Math.pow(level, 0.95));
}
