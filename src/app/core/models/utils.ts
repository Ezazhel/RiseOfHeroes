import { Hero, FighterColor } from "./entity/entity";
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

export function fighterColor(diflvl: number): FighterColor {
    if (diflvl > 5) return "useless";
    if (diflvl >= 2) return "easy";
    if (diflvl <= -1 && diflvl >= -2) return "hard";
    if (diflvl <= -3 && diflvl >= -4) return "harder";
    if (diflvl <= -5) return "impossible";

    return "normal";
}

export function getNumberFixed(number: number, fixed: number = 2): number {
    return toNumber(number.toFixed(fixed));
}
