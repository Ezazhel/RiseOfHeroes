import { updateInsert, getNumberFixed } from "@core/models/utils";
import {
    getHeroDamage,
    getMultiplier,
    getHeroRune,
    lifeSteal,
} from "@core/models/entity/entity.utils";

import { Spells, OvertimeSpells, HealSpells } from "./spells.model";
import { Hero, Fighter } from "../entity/entity";
import { getHeroOffensivePower } from "../entity/entity.utils";
import { Description, BuffType, Buff } from "../game-data/game-data.model";
import { NotifierService } from "@core/services/notifier.service";
import { AppState } from "..";
import { Store } from "@ngrx/store";
import { PeasantSpells } from "./spells.data";
import { getEffect } from "../runes/runes.utils";
import { GameStateUpdateHeroAction } from "../game-state/game-state.action";

export function descriptionFor(
    spells: Spells | OvertimeSpells | HealSpells,
    hero: Hero
): Description {
    const spellDescription = descriptions.get(spells.id);

    if (spellDescription == undefined) {
        return { param: "" };
    }
    return spellDescription(spells, hero);
}

export function effectFor(
    spells: Spells | OvertimeSpells | HealSpells,
    target: Hero | Fighter,
    launcher: Hero | Fighter,
    isCrit: boolean,
    notifier?: NotifierService,
    shop?: Store<AppState>
) {
    return effects.get(spells.id)(
        spells,
        target,
        launcher,
        isCrit,
        notifier,
        shop
    );
}
type DescriptionMethod = (
    spells: Spells | OvertimeSpells | HealSpells,
    hero: Hero
) => Description;

type EffectMethod = (
    spells: Spells | OvertimeSpells | HealSpells,
    target: Hero | Fighter,
    launcher: Hero | Fighter,
    isCrit?: boolean,
    notifier?: NotifierService,
    shop?: Store<AppState>
) => void;

type PassiveMethod = (notifier?: NotifierService) => Buff;
const descriptions: Map<string, DescriptionMethod> = new Map([
    [
        "powerAttack",
        (spells: Spells, hero: Hero) => ({
            param: getNumberFixed(getHeroDamage(hero) * spells.power),
        }),
    ],
    [
        "peasantHearth",
        (spells: Spells, hero: Hero) => ({
            param: spells.power * 100,
            param2: 10,
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
    [
        "peasantProficiency",
        (spells: Spells, hero: Hero) => ({
            param: spells.power,
        }),
    ],
]);

const effects: Map<string, EffectMethod> = new Map([
    [
        "powerAttack",
        (
            spells: Spells,
            target: Fighter,
            launcher: Hero,
            isCrit: boolean,
            notifier: NotifierService,
            store: Store<AppState>
        ) => {
            let damage = getNumberFixed(
                getHeroDamage(launcher) * spells.power * (isCrit ? 2 : 1)
            );
            target.hp = target.hp - damage;
            isCrit
                ? notifier.notify(damage.toString(), "", "damageCrit")
                : notifier.notify(damage.toString(), "", "damage");
            store.dispatch(
                new GameStateUpdateHeroAction(
                    lifeSteal(launcher, damage * (isCrit ? 2 : 1), notifier)
                )
            );
        },
    ],
    [
        "peasantTorch",
        (
            spells: OvertimeSpells,
            target: Fighter,
            launcher: Hero,
            isCrit: boolean
        ) => {
            if (
                target.debuffs != undefined &&
                target.debuffs.findIndex((d) => d.id == spells.id) != -1
            ) {
                //if already exist do not apply
                return;
            }
            let timeOutDot = window.setTimeout(() => {
                clearInterval(dot);
                target.debuffs = target.debuffs.filter(
                    (s) => s.id != spells.id
                );
            }, getMultiplier("swiftness", launcher, spells.duration) * 1000);
            let dot = window.setInterval(() => {
                target.hp =
                    target.hp -
                    Math.floor(
                        5 +
                            getHeroOffensivePower(launcher as Hero) *
                                spells.power *
                                (isCrit ? 2 : 1)
                    );
            }, getMultiplier("swiftness", launcher, 1000));
            target.debuffs = updateInsert(
                target.debuffs,
                (d) => d.id === spells.id,
                (d: OvertimeSpells) => ({
                    ...d,
                    timeOut: timeOutDot,
                    interval: dot,
                    isInCooldown: true,
                }),
                {
                    ...spells,
                    timeOut: timeOutDot,
                    interval: dot,
                    isInCooldown: true,
                }
            );
        },
    ],
]);

const effectsPassives: Map<string, PassiveMethod> = new Map<
    string,
    PassiveMethod
>([
    [
        "peasantHearth",
        (notifier) => {
            let spell = PeasantSpells.find((s) => s.id === "peasantHearth");
            notifier.notify(spell.name, "", "unlock");
            return { type: "endurance", add: 10, mult: spell.power };
        },
    ],
    [
        "peasantLabor",
        (notifier) => {
            let spell = PeasantSpells.find((s) => s.id === "peasantLabor");
            notifier.notify(spell.name, "", "unlock");
            return { type: "loot", add: 0, mult: 2 };
        },
    ],
    [
        "peasantProficiency",
        (notifier) => {
            let spell = PeasantSpells.find(
                (s) => s.id === "peasantProficiency"
            );
            notifier.notify(spell.name, "", "unlock");
            return { type: "critc", add: spell.power, mult: 0 };
        },
    ],
]);

export function getPassiveBuff(passiveId: string, notifier: NotifierService) {
    return effectsPassives.get(passiveId)(notifier);
}

export function GetPassives(buff: BuffType, hero: Hero): Spells[] {
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
