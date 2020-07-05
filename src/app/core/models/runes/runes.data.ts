import { Rune, RuneType, RuneAdvance } from "./runes.model";
import { LootbagItem } from "../game-data/game-data.model";
import { getNumberFixed } from "../utils";

function createRune(type: RuneType, maxLvl: number, baseDrop: number): Rune {
    return { type, maxEffectiveLvl: maxLvl, currentLvl: 1, baseDrop };
}
export const swiftnessRune = createRune("swiftness", 5, 15);

export const powerRune = createRune("power", 6, 20);

export const precisionRune = createRune("precision", 5, 10);

export const ferocityRune: Rune = createRune("ferocity", 3, 5);

export const enduranceRune: Rune = createRune("endurance", 5, 15);

export const lifestealRune: Rune = createRune("lifesteal", 3, 10);

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
    [
        "ferocity",
        {
            effect: (rune: Rune = ferocityRune, damageCrit) => {
                return damageCrit + getNumberFixed(rune.currentLvl / 3);
            },
            description: (rune) => ({
                param: getNumberFixed(rune.currentLvl / 3) * 100,
                jsonField: `${rune.type}.description`,
            }),
        },
    ],
    [
        "endurance",
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
        "lifesteal",
        {
            effect: (rune: Rune, lifesteal) => {
                return lifesteal + 5 * rune.currentLvl;
            },
            description: (rune) => {
                return {
                    param: 5 * rune.currentLvl,
                    jsonField: `${rune.type}.description`,
                };
            },
        },
    ],
]);

function setRuneLoot(rune: Rune, weigthbonus: number = 1): LootbagItem {
    return { item: "Rune", rune, weigth: rune.baseDrop * weigthbonus };
}
export const rareRunes: LootbagItem[] = [
    { item: "none", weigth: 30 },
    setRuneLoot(swiftnessRune),
    setRuneLoot(powerRune),
    setRuneLoot(precisionRune),
    setRuneLoot(enduranceRune),
];
export const epicRunes: LootbagItem[] = [
    { item: "none", weigth: 15 },
    setRuneLoot(ferocityRune),
    setRuneLoot(powerRune),
    setRuneLoot(lifestealRune),
    setRuneLoot(precisionRune, 2),
    setRuneLoot(enduranceRune, 2),
];
