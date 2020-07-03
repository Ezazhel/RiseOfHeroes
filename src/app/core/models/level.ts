import { BaseEntity, Hero, Fighter } from "./entity/entity";
import { getHeroMaxHp, AddBuffToStat } from "./entity/entity.utils";
import { getPassiveBuff } from "./spells/spells.utils";
import { toNumber } from "@ngneat/transloco";
import { NotifierService } from "@core/services/notifier.service";
import { updateInsert, getNumberFixed } from "./utils";
import { Buff } from "./game-data/game-data.model";
import { Store } from "@ngrx/store";
import { AppState } from ".";
import { cities } from "@routes/world/city/store/city.data";
import { CityAddCity } from "@routes/world/city/store/cities.action";
import { ActionType } from "./actions";

export function getXPForLevel(level: number) {
    return 35 + level * 5 * (35 + 2 * level);
}
export function getXPForAction(level, action: ActionType): number {
    //Percentage of total exp earn
    let percent: number;
    switch (action) {
        case "train":
            percent = 0.005;
            break;
        case "work":
            percent = 0.001;
        case "cheat":
            percent = 1;
            break;
    }
    return getNumberFixed(getXPForLevel(level) * percent);
}
export function rewardXp(level: number, difLvl: number) {
    let xp =
        difLvl < 5 && difLvl > -5 ? (level * 3 + 45) * (1 - difLvl / 5) : 0;
    return getNumberFixed(xp);
}

export function isLevelUp(heroExp, xpReward, xpForLevel) {
    return heroExp + xpReward > xpForLevel;
}

export function levelUpFromCombat(
    hero: Hero,
    fighter: Fighter,
    notifier: NotifierService,
    store: Store<AppState>
): Hero {
    //give exp
    //if exp : this.hero.exp + rewardXp > getXpForLevel(level) : LevelUp
    //exp : getXpForLevel(level) - this.hero.exp + rewardXp : exp after level up.
    //if hero.level - fighter.level >= 5 : 0exp. else 100% or x% exp.
    //if hero.level - fighter.level >= -5 : 0exp else bonus exp
    let difLvl = hero.level - fighter.level;

    //h:5,f:3,xp=(5*3)+45:60, %reduc:(1 - 5-3/5 ): 1-2/5:0.6: 60*0.6 = 36
    //h:3,f:5,xp=(3*3)+45:54, %reduc:(1 - 3-5/5 ): 1- (-2/5):1.4: 54*1.4 = 75.6
    let xpReward = rewardXp(hero.level, difLvl);
    return levelUp(hero, xpReward, notifier, store);
}
export function levelUp(
    hero: Hero,
    xpReward: number,
    notifier: NotifierService,
    store: Store<AppState>
): Hero {
    let xpForLevel = getXPForLevel(hero.level);
    let exp: number;
    let level: number = hero.level;
    if (isLevelUp(hero.exp, xpReward, xpForLevel)) {
        exp = hero.exp + xpReward - xpForLevel;
        level += 1;
        notifier.notify("text", "levelUp", `notification.levelUp`, 5000); //levelUp
        //getUnlock for level, notify...
    } else {
        exp = hero.exp + xpReward;
    }
    exp = toNumber(exp.toFixed(2));
    let baseStats = [...hero.baseStats];
    let stats = [...hero.stats];
    let maxHp = hero.maxHp;
    let buffs: Buff[] = [...hero.buffs];
    if (hero.level != level) {
        //get unlocked, add passive to buff, should unlocked with an effect on heroUpdate check if levelUp or not
        [...hero.spells]
            .filter((s) => !s.isActive && s.levelRequired === level) // === because we do it once.
            .forEach((p) => {
                const ibuff = getPassiveBuff(p.id, notifier);
                buffs = updateInsert<Buff>(
                    buffs,
                    (b: Buff) => b.type === p.buffStat,
                    (b: Buff) => ({ ...b, add: ibuff.add, mult: ibuff.mult }),
                    ibuff
                );
            });

        baseStats = [...hero.baseStats].map((s) => {
            if (s.type === "endurance") {
                return { ...s, value: s.value + 2 };
            } else {
                return { ...s, value: s.value + 1 };
            }
        });
        stats = [...baseStats].map((s) => ({
            ...s,
            value: AddBuffToStat(s.value, s.type, {
                ...hero,
                buffs: buffs,
                level: level,
            }),
        }));
        maxHp = getHeroMaxHp(stats.find((s) => s.type == "endurance").value);

        levelUpUnlock(level, store, notifier);
    }

    return {
        ...hero,
        exp,
        level,
        baseStats, //BaseStat may be the same stat if no levelup
        stats,
        maxHp,
        buffs,
        hp: maxHp,
    };
}

export function levelUpFromAction(
    hero: Hero,
    action: ActionType,
    notifier: NotifierService,
    store: Store<AppState>
) {
    return levelUp(hero, getXPForAction(hero.level, action), notifier, store);
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

function levelUpUnlock(
    level: number,
    store: Store<AppState>,
    notifier: NotifierService
) {
    switch (level) {
        case 3:
            notifier.notify("text", "unlock", "Construction", 5000); //unlock
            break; //Unlock Construction automatically
        case 5:
            notifier.notify("text", "unlock", "New city", 5000);
            store.dispatch(new CityAddCity(cities.get("heapoo")));
            break; //Unlock new city
        case 10:
            notifier.notify("text", "unlock", "Talent", 5000);
            break;
    }
}
