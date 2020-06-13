import { Spells, OvertimeSpells, HealSpells } from "./spells.model";
import { Hero } from "../entity";
import { getHeroOffensivePower } from "../utils";
import { any } from "underscore";

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
type DescriptionMethod = (
    spells: Spells | OvertimeSpells | HealSpells,
    hero: Hero
) => Object;
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
            param:
                (5 + getHeroOffensivePower(hero) * spells.power) *
                spells.duration,
            param2: spells.duration,
        }),
    ],
]);
