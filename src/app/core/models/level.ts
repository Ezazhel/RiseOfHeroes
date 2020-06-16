import { BaseEntity } from "./entity";

export function getXPForLevel(level: number) {
    return level * 2;
}

export function getStrengthForLevel(level: number, model: BaseEntity) {
    return Math.floor(
        model.baseStats.find((s) => s.type == "strength").value *
            Math.pow(level, 0.65)
    );
}

export function getAgilityForLevel(level: number, model: BaseEntity) {
    return Math.floor(
        model.baseStats.find((s) => s.type === "agility").value *
            Math.pow(level, 0.95)
    );
}

export function getVitalityForLevel(level: number, model: BaseEntity) {
    return Math.floor(
        model.baseStats.find((s) => s.type === "endurance").value *
            Math.pow(level, 0.95)
    );
}

export function getIntelligenceForLevel(level: number, model: BaseEntity) {
    return Math.floor(
        model.baseStats.find((s) => s.type === "intellect").value *
            Math.pow(level, 0.95)
    );
}
