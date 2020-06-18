export type RuneType = "swiftness" | "precision" | "power";

export interface Rune {
    type: RuneType;
    maxEffectiveLvl: number; //inherent to runes Max Effect Power.
    currentLvl: number; //calculate with gear
}
