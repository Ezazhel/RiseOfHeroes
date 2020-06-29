import { Hero } from "./entity";
import { Stat, Buff } from "../game-data/game-data.model";
import { RuneType, Rune } from "../runes/runes.model";
import { getEffect } from "../runes/runes.utils";
import { getNumberFixed } from "../utils";
import { NotifierService } from "@core/services/notifier.service";

export function getHeroDamage(hero: Hero) {
    let damage: number;
    damage =
        hero.weapon == null
            ? 3 * hero.level + getHeroOffensivePower(hero) / 8
            : hero.weapon.dps +
              (getHeroOffensivePower(hero) / 8) * (hero.weapon.speed / 1000);

    return getNumberFixed(damage);
}

export function getHeroDps(hero: Hero): number {
    let dps =
        hero.weapon == null
            ? 3 * hero.level + getHeroOffensivePower(hero) / 8
            : hero.weapon.dps + getHeroOffensivePower(hero) / 8;
    return getNumberFixed(dps);
}

export function getHeroOffensivePower(hero: Hero): number {
    return getNumberFixed(
        getMultiplier(
            "power",
            hero,
            hero.level * 3 +
                hero.stats.find((s: Stat) => s.type == "strength").value * 2
        )
    );
}

export function getHeroMaxHp(endurance: number) {
    return getNumberFixed(endurance * 10);
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

export function getAddBuff(hero: Hero, stat: Stat) {
    return hero.buffs
        .filter((b) => b.type === stat.type || b.type === "stat")
        .reduce((sum, b: Buff) => sum + b.add, stat.value);
}
export function isCrit(hero: Hero) {
    //add from buff if passive give crit
    return Math.random() * 100 <= getMultiplier("precision", hero, 0); // return if crit;
}

export function lifeSteal(
    hero: Hero,
    damage: number,
    notifier: NotifierService
) {
    let r = [...getHeroRune(hero)].find((r) => r.type === "lifesteal");
    const lifesteal = r !== undefined ? getEffect(r, damage) : 0;

    //let percentLife = hero.buffs.filter((b) => b.type === "lifesteal").reduce((sum, b: Buff) => sum+b.add, 0);
    if (lifesteal === 0) return hero;
    const regen = lifesteal + hero.hp;
    const maxHp = regen > hero.maxHp ? hero.maxHp : regen;
    notifier.notify(`(trd)lifesteal : ${lifesteal}`, "", "text");
    return { ...hero, hp: getNumberFixed(maxHp) };
}
