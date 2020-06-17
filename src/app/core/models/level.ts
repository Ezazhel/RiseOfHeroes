import { BaseEntity, Hero, Fighter } from "./entity";
import { getHeroMaxHp } from "./utils";
import { AddPassivesToStat } from "./spells/spells.utils";
import { toNumber } from "@ngneat/transloco";

export function getXPForLevel(level: number) {
    return 45 + level * 5 * (45 + 2 * level);
}

export function rewardXp(level: number, difLvl: number) {
    let xp =
        difLvl < 5 && difLvl > -5 ? (level * 3 + 45) * (1 - difLvl / 5) : 0;
    return toNumber(xp.toFixed(2));
}

export function levelUp(hero: Hero, fighter: Fighter): Hero {
    //give exp
    //if exp : this.hero.exp + rewardXp > getXpForLevel(level) : LevelUp
    //exp : getXpForLevel(level) - this.hero.exp + rewardXp : exp after level up.
    //if hero.level - fighter.level >= 5 : 0exp. else 100% or x% exp.
    //if hero.level - fighter.level >= -5 : 0exp else bonus exp
    let xpForLevel = getXPForLevel(hero.level);
    let difLvl = hero.level - fighter.level;

    //h:5,f:3,xp=(5*3)+45:60, %reduc:(1 - 5-3/5 ): 1-2/5:0.6: 60*0.6 = 36
    //h:3,f:5,xp=(3*3)+45:54, %reduc:(1 - 3-5/5 ): 1- (-2/5):1.4: 54*1.4 = 75.6
    let xpReward = rewardXp(hero.level, difLvl);
    let exp: number;
    let level: number = hero.level;
    if (hero.exp + xpReward > xpForLevel) {
        exp = hero.exp + xpReward - xpForLevel;
        level += 1;
    } else {
        exp = hero.exp + xpReward;
    }
    let baseStats = [...hero.baseStats];
    let stats = [...hero.stats];
    let maxHp = hero.maxHp;
    if (hero.level != level) {
        baseStats = [...hero.baseStats].map((s) => {
            if (s.type === "endurance") {
                return { ...s, value: s.value + 2 };
            } else {
                return { ...s, value: s.value + 1 };
            }
        });
        stats = [...baseStats].map((s) => ({
            ...s,
            value: AddPassivesToStat(s.value, s.type, hero),
        }));
        maxHp = getHeroMaxHp(stats.find((s) => s.type == "endurance").value);
    }

    return {
        ...hero,
        exp,
        level,
        baseStats, //BaseStat may be the same stat if no levelup
        stats,
        maxHp,
        hp: maxHp,
    }; //stats with passive are calculated during the dispatch action
}

export function getStrengthForLevel(level: number, model: BaseEntity) {
    return Math.floor(
        model.baseStats.find((s) => s.type == "strength").value *
            Math.pow(level, 0.65)
    );
}

export function getAgilityForLevel(level: number, model: BaseEntity) {
    return Math.floor(
        model.baseStats.find((s) => s.type === "agility").value *
            Math.pow(level, 0.95)
    );
}

export function getVitalityForLevel(level: number, model: BaseEntity) {
    return Math.floor(
        model.baseStats.find((s) => s.type === "endurance").value *
            Math.pow(level, 0.95)
    );
}

export function getIntelligenceForLevel(level: number, model: BaseEntity) {
    return Math.floor(
        model.baseStats.find((s) => s.type === "intellect").value *
            Math.pow(level, 0.95)
    );
}
