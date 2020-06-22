import { Hero, FighterColor } from "./entity";
import { Predicate } from "@angular/core";
import { toNumber } from "@ngneat/transloco";
import { Stat } from "./game-data/game-data.model";
import { Rune, RuneType } from "./runes/runes.model";
import { getEffect } from "./runes/runes.utils";

/**
 * Generate probably unique IDs. See: http://stackoverflow.com/questions/26501688/a-typescript-guid-class
 * @returns {string}
 */
export function newGuid() {
    /* tslint:disable */
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
        const r = (Math.random() * 16) | 0,
            v = c == "x" ? r : (r & 0x3) | 0x8;
        return v.toString(16);
    });
}
/** Generate a UUID for a given input template ID that is unique across all instances of the same template base */
export function entityId(id: string): string {
    return `${id}-${newGuid()}`;
}

export function update<T>(
    arr: T[],
    findIndexFunc: Predicate<T>,
    updateFunc: (t: T) => T
): T[] {
    arr = [...arr];
    let index = arr.findIndex(findIndexFunc);
    return index != -1 && (arr[index] = updateFunc(arr[index])) ? arr : arr;
}

export function updateInsert<T>(
    arr: T[],
    findIndexFunc: Predicate<T>,
    updateFunc: (t?: T) => T,
    insertValue: T
): T[] {
    if (arr === undefined) arr = [];
    let index = arr.findIndex(findIndexFunc);
    arr = [...arr];
    return index != -1 && (arr[index] = updateFunc(arr[index]))
        ? arr
        : [...arr].concat(insertValue);
}

export function getHeroDamage(hero: Hero) {
    let damage: number;
    damage =
        hero.weapon == null
            ? 3 * hero.level + getHeroOffensivePower(hero) / 8
            : hero.weapon.dps +
              (getHeroOffensivePower(hero) / 8) * (hero.weapon.speed / 1000);

    return toNumber(damage.toFixed(2));
}

export function getHeroDps(hero: Hero): number {
    let dps =
        hero.weapon == null
            ? 3 * hero.level + getHeroOffensivePower(hero) / 8
            : hero.weapon.dps + getHeroOffensivePower(hero) / 8;
    return toNumber(dps.toFixed(2));
}

export function getHeroOffensivePower(hero: Hero): number {
    return toNumber(
        getMultiplier(
            "power",
            hero,
            hero.level * 3 +
                hero.stats.find((s: Stat) => s.type == "strength").value * 2
        ).toFixed(2)
    );
}

export function getHeroMaxHp(endurance: number) {
    return toNumber((endurance * 10).toFixed(2));
}

export function getHeroRune(hero: Hero) {
    let runes: Map<RuneType, Rune> = new Map();
    let addRune = (rune: Rune[]) => {
        if (rune === undefined) return;
        rune.forEach((rune) => {
            const r = runes.get(rune.type);
            const currentLvl =
                r !== undefined
                    ? r.currentLvl + rune.currentLvl
                    : rune.currentLvl;
            runes.set(rune.type, { ...rune, currentLvl });
        });
    };
    addRune(hero.weapon?.runes);
    addRune(hero.helmet?.runes);
    addRune(hero.chest?.runes);
    addRune(hero.gloves?.runes);
    addRune(hero.boots?.runes);
    addRune(hero.pants?.runes);
    return runes.values();
}

export function getMultiplier(runeType: RuneType, hero: Hero, stat: number) {
    let r = [...getHeroRune(hero)].find((r) => r.type === runeType);
    return r !== undefined ? getEffect(r, stat) : stat;
}

export function fighterColor(diflvl: number): FighterColor {
    if (diflvl > 5) return "useless";
    if (diflvl >= 2) return "easy";
    if (diflvl <= -1 && diflvl >= -2) return "hard";
    if (diflvl <= -3 && diflvl >= -4) return "harder";
    if (diflvl <= -5) return "impossible";

    return "normal";
}

export function isCrit(hero: Hero) {
    return Math.random() * 100 <= getMultiplier("precision", hero, 0); // return if crit;
}
