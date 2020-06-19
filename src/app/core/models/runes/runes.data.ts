import { Rune, RuneType, RuneAdvance } from "./runes.model";
import { getLimitLevel } from "./runes.utils";

export const swiftnessRune: Rune = {
    type: "swiftness",
    currentLvl: 0,
    maxEffectiveLvl: 5,
};

export const powerRune: Rune = {
    type: "power",
    currentLvl: 0,
    maxEffectiveLvl: 6,
};

export const precisionRune: Rune = {
    type: "precision",
    currentLvl: 0,
    maxEffectiveLvl: 5,
};

export const runeAdvance: Map<RuneType, RuneAdvance> = new Map<
    RuneType,
    RuneAdvance
>([
    [
        "power",
        {
            effect: (rune: Rune, statToUpdate) => {
                return statToUpdate * (1 + 0.1 * rune.currentLvl);
            },
            description: (rune) => {
                return {
                    param: 10 * rune.currentLvl,
                    jsonField: `${rune.type}.description`,
                };
            },
        },
    ],
    [
        "swiftness",
        {
            effect: (rune: Rune = swiftnessRune, statToUpdate) => {
                return statToUpdate + 5 * rune.currentLvl;
            },
            description: (rune) => ({
                param: 5 * rune.currentLvl,
                jsonField: `${rune.type}.description`,
            }),
        },
    ],
    [
        "precision",
        {
            effect: (rune: Rune = precisionRune, statToUpdate) => {
                return statToUpdate + 5 * rune.currentLvl;
            },
            description: (rune) => ({
                param: 5 * rune.currentLvl,
                jsonField: `${rune.type}.description`,
            }),
        },
    ],
]);
