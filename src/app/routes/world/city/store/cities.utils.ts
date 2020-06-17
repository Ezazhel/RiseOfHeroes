import { Fighter } from "@core/models/entity";
import { toNumber } from "@ngneat/transloco";

//Hunting utils
export function getFighterWithLevel(fighter: Fighter, level: number): Fighter {
    return {
        ...fighter,
        attack: fighter.attack * level,
        defense: fighter.defense * level,
        maxHp: toNumber((fighter.maxHp * (1 + 0.3 * level)).toFixed(2)),
        hp: toNumber((fighter.maxHp * (1 + 0.3 * level)).toFixed(2)),
        level,
    };
}
