import { Rune, RuneType, RuneAdvance } from "./runes.model";
import { LootbagItem } from "../game-data/game-data.model";

export const swiftnessRune: Rune = {
    type: "swiftness",
    currentLvl: 1,
    maxEffectiveLvl: 5,
    baseDrop: 15,
};

export const powerRune: Rune = {
    type: "power",
    currentLvl: 1,
    maxEffectiveLvl: 6,
    baseDrop: 20,
};

export const precisionRune: Rune = {
    type: "precision",
    currentLvl: 1,
    maxEffectiveLvl: 5,
    baseDrop: 10,
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
                return statToUpdate * (1 - 0.05 * rune.currentLvl);
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
                return 5 * rune.currentLvl;
            },
            description: (rune) => ({
                param: 5 * rune.currentLvl,
                jsonField: `${rune.type}.description`,
            }),
        },
    ],
]);

export const rareRunes: LootbagItem[] = [
    { item: "none", weigth: 60 },
    { item: "Rune", rune: swiftnessRune, weigth: swiftnessRune.baseDrop },
    { item: "Rune", rune: powerRune, weigth: powerRune.baseDrop },
    { item: "Rune", rune: precisionRune, weigth: precisionRune.baseDrop },
];
export const epicRunes: LootbagItem[] = [
    { item: "none", weigth: 30 },
    { item: "Rune", rune: swiftnessRune, weigth: swiftnessRune.baseDrop * 2 },
    { item: "Rune", rune: powerRune, weigth: powerRune.baseDrop * 2 },
    { item: "Rune", rune: precisionRune, weigth: precisionRune.baseDrop * 2 },
];
