import * as _ from "lodash";
import { Stat } from "./game-data/game-data.model";
import { Predicate } from "@angular/core";
import { NEVER } from "rxjs";

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
    let index = arr.findIndex(findIndexFunc);
    arr = [...arr];
    return index != 1 && (arr[index] = updateFunc(arr[index]))
        ? arr
        : [...arr].concat(insertValue);
}
