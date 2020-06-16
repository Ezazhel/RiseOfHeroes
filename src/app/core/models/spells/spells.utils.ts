import {
    Spells,
    OvertimeSpells,
    HealSpells,
    PassiveBuff,
} from "./spells.model";
import { Hero, EntitySubtype, Fighter } from "../entity";
import { getHeroOffensivePower } from "../utils";
import { toNumber } from "@ngneat/transloco";

type setType = "name" | "description";

export interface DescriptionParamSpell {
    param?: any;
    param2?: any;
}

export function descriptionFor(
    spells: Spells | OvertimeSpells | HealSpells,
    hero: Hero
): DescriptionParamSpell {
    const spellDescription = descriptions.get(spells.id);

    if (spellDescription == undefined) {
        return { param: "" };
    }
    return spellDescription(spells, hero);
}

export function effectFor(
    spells: Spells | OvertimeSpells | HealSpells,
    target: Hero | Fighter,
    launcher: Hero | Fighter
) {
    return effects.get(spells.id)(spells, target, launcher);
}
type DescriptionMethod = (
    spells: Spells | OvertimeSpells | HealSpells,
    hero: Hero
) => DescriptionParamSpell;
type EffectMethod = (
    spells: Spells | OvertimeSpells | HealSpells,
    target: Hero | Fighter,
    launcher: Hero | Fighter
) => void;
const descriptions: Map<string, DescriptionMethod> = new Map([
    [
        "powerAttack",
        (spells: Spells, hero: Hero) => ({
            param: getHeroOffensivePower(hero) * spells.power,
        }),
    ],
    [
        "peasantHearth",
        (spells: Spells, hero: Hero) => ({
            param: spells.power * 100,
        }),
    ],
    [
        "peasantLabor",
        (spells: Spells, hero: Hero) => ({
            param: spells.power,
        }),
    ],
    [
        "peasantTorch",
        (spells: OvertimeSpells, hero: Hero) => ({
            param: Math.floor(
                (5 + getHeroOffensivePower(hero) * spells.power) *
                    spells.duration
            ), //multiply by base duration. That way haste won't reduce damage
            param2: spells.duration,
        }),
    ],
]);
const effects: Map<string, EffectMethod> = new Map([
    [
        "powerAttack",
        (spells: Spells, target: Fighter, launcher: Hero) => {
            target.hp =
                target.hp -
                getHeroOffensivePower(launcher as Hero) * spells.power;
        },
    ],
    [
        "peasantHearth",
        (spells: Spells, target: Hero | Fighter, launcher: Hero) => {
            launcher = {
                ...launcher,
                hp:
                    launcher.hp * (1 + spells.power) > launcher.maxHp
                        ? launcher.maxHp
                        : launcher.hp * (1 + spells.power),
            };
        },
    ],
    [
        "peasantLabor",
        (
            spells: Spells | OvertimeSpells | HealSpells,
            target: Hero | Fighter,
            launcher: Hero | Fighter
        ) => ({
            param: spells.power, // Passive with no effect now
        }),
    ],
    [
        "peasantTorch",
        (spells: OvertimeSpells, target: Fighter, launcher: Hero) => {
            let dot = setInterval(() => {
                target.hp =
                    target.hp -
                    Math.floor(
                        5 +
                            getHeroOffensivePower(launcher as Hero) *
                                spells.power
                    );
            }, 1000);
            setTimeout(() => clearInterval(dot), spells.duration * 1000);
        },
    ],
]);
export function setSpell(subtype: EntitySubtype, id: string, setType: setType) {
    return `spells.${subtype}.${id}.${setType}`;
}

export function GetPassives(buff: PassiveBuff, hero: Hero): Spells[] {
    return hero.spells.filter((s: Spells) => {
        if (
            s.levelRequired <= hero.level &&
            !s.isActive &&
            s?.buffStat == buff
        ) {
            return s;
        }
    });
}

export function AddPassivesToStat(stat: number, buff: PassiveBuff, hero: Hero) {
    let multiplier: number = 0;
    GetPassives(buff, hero).forEach((p) => {
        multiplier += p.power;
    });
    let rtn =
        multiplier != 0 ? toNumber((stat * (1 + multiplier)).toFixed(2)) : stat;
    return rtn;
}
