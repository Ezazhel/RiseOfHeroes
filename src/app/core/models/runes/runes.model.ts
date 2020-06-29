import { Description } from "../game-data/game-data.model";

export type RuneType =
    | "swiftness"
    | "precision"
    | "power"
    | "none"
    | "lifesteal"
    | "endurance"
    | "ferocity";
export type EffectRune = (rune: Rune, statToUpdate: number) => number;
export type DescriptionRune = (rune: Rune) => Description;
export interface Rune {
    type: RuneType;
    maxEffectiveLvl: number; //inherent to runes Max Effect Power.
    currentLvl: number; //calculate with gear
    baseDrop: number;
}

export interface RuneAdvance {
    effect: EffectRune;
    description: DescriptionRune;
}
