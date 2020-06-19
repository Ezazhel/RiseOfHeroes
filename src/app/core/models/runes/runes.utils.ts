import { Rune } from "./runes.model";
import { runeAdvance } from "./runes.data";

export const getLimitLevel = (rune: Rune) =>
    rune.currentLvl > rune.maxEffectiveLvl
        ? rune.maxEffectiveLvl
        : rune.currentLvl;

export const getDescription = (rune: Rune) =>
    runeAdvance
        .get(rune.type)
        .description({ ...rune, currentLvl: getLimitLevel(rune) });

export const getEffect = (rune: Rune, statToUpdate: number) =>
    runeAdvance
        .get(rune.type)
        .effect({ ...rune, currentLvl: getLimitLevel(rune) }, statToUpdate);
