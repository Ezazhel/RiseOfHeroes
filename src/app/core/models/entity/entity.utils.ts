import { Hero } from "./entity";
import {
    Stat,
    Buff,
    ITemplateBaseItem,
    ITemplateWeapon,
    ITemplateArmor,
    WeaponCategory,
    ItemCategories,
    ArmorCategory,
    BuffType,
} from "../game-data/game-data.model";
import { RuneType, Rune } from "../runes/runes.model";
import { getEffect } from "../runes/runes.utils";
import { getNumberFixed, update } from "../utils";
import { NotifierService } from "@core/services/notifier.service";
import { Potion } from "../potions/potions.model";
import {
    TrainingEquipment,
    TrainingType,
} from "@routes/house/store/house.model";

export function getHeroDamage(hero: Hero) {
    let damage: number;
    const weapon = hero.equipments.find(
        (e) => e.type == "weapon"
    ) as ITemplateWeapon;
    damage =
        weapon.id == "null"
            ? 3 * hero.level + getHeroOffensivePower(hero) / 8
            : weapon.dps +
              (getHeroOffensivePower(hero) / 8) * (weapon.speed / 1000);

    return getNumberFixed(damage);
}

export function getHeroDps(hero: Hero): number {
    const weapon = hero.equipments.find(
        (e) => e.type == "weapon"
    ) as ITemplateWeapon;
    let dps =
        weapon.id == "null"
            ? 3 * hero.level + getHeroOffensivePower(hero) / 8
            : weapon.dps + getHeroOffensivePower(hero) / 8;
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
    hero.equipments.forEach((el) => {
        addRune(el?.runes);
    });
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
    let cc = AddBuffToStat(0, "critc", hero);
    cc = getMultiplier("precision", hero, cc);
    return Math.random() * 100 <= cc; // return if crit;
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

//#region Equip
export function Equip(hero: Hero, item: ITemplateBaseItem) {
    switch (item.type) {
        case "weapon":
            hero = EquipWeapon(hero, item as ITemplateWeapon, [
                ...hero.baseStats,
            ]);
            break;
        case "armor":
            hero = EquipArmor(hero, item as ITemplateArmor, [
                ...hero.baseStats,
            ]);
            break;
        case "item":
            hero = { ...hero, potion: item as Potion };
            break;
    }
    let stats = [...hero.baseStats].map((s) => {
        return {
            ...s,
            value: AddBuffToStat(s.value, s.type, hero),
        };
    });
    let maxHp = getHeroMaxHp(stats.find((s) => s.type == "endurance").value);
    return {
        ...hero,
        stats,
        maxHp,
        hp: maxHp,
    };
}

function EquipWeapon(
    hero: Hero,
    weapon: ITemplateWeapon,
    baseStats: Stat[] = hero.baseStats
): Hero {
    hero = {
        ...hero,
        equipments: update(
            hero.equipments,
            (e) => e.type == weapon.type,
            (e) => weapon
        ),
    };
    weapon.stats.forEach((stat) => {
        baseStats = update<Stat>(
            baseStats,
            (s: Stat) => s.type == stat.type,
            (s: Stat) => {
                return { ...s, value: s.value + stat.value };
            }
        );
    });
    return { ...hero, baseStats };
}
function EquipArmor(
    hero: Hero,
    armor: ITemplateArmor,
    baseStats: Stat[] = hero.baseStats
) {
    hero = {
        ...hero,
        equipments: update(
            hero.equipments,
            (e) => e.type === "armor" && e.subType === armor.subType,
            (e) => armor
        ),
    };

    armor.stats.forEach((stat) => {
        baseStats = update<Stat>(
            baseStats,
            (s: Stat) => s.type == stat.type,
            (s: Stat) => {
                return { ...s, value: s.value + stat.value };
            }
        );
    });
    return { ...hero, armor: hero.armor + armor.armor, baseStats };
}
//#endregion Equip

//#region UnEquip
export function UnEquip(hero: Hero, item: ITemplateBaseItem) {
    switch (item.type) {
        case "weapon":
            hero = UnEquipWeapon(hero, item as ITemplateWeapon);
            break;
        case "armor":
            const armor = findEquipment(
                hero,
                "armor",
                (item as ITemplateArmor).subType
            );
            hero = UnEquipArmor(hero, armor);
            break;
        case "item":
            hero = { ...hero, potion: null };
            break;
    }
    let stats = [...hero.baseStats].map((s) => {
        return {
            ...s,
            value: AddBuffToStat(s.value, s.type, hero),
        };
    });
    let maxHp = getHeroMaxHp(stats.find((s) => s.type == "endurance").value);
    return {
        ...hero,
        baseStats: hero.baseStats,
        stats,
        maxHp,
        hp: maxHp,
    };
}
function UnEquipWeapon(
    hero: Hero,
    weapon: ITemplateWeapon,
    baseStats: Stat[] = hero.baseStats
): Hero {
    //check if we have a weapon else return;
    if (weapon.id === "null") return hero;

    weapon.stats.forEach((stat: Stat) => {
        baseStats = update(
            baseStats,
            (s) => s.type == stat.type,
            (s: Stat) => ({
                ...s,
                value: s.value - stat.value,
            })
        );
    });
    hero = {
        ...hero,
        baseStats,
        equipments: update(
            hero.equipments,
            (e) => e.type === "weapon",
            (e) => ({ type: "weapon", icon: "w", id: "null" })
        ),
    };
    return hero;
}
function UnEquipArmor(
    hero: Hero,
    armor: ITemplateArmor,
    baseStats: Stat[] = hero.baseStats
) {
    //check if we have the armor subtype else return;
    if (armor.id === "null") return hero;
    armor.stats.forEach((stat) => {
        baseStats = update(
            baseStats,
            (s) => s.type == stat.type,
            (s: Stat) => ({
                ...s,
                value: s.value - stat.value,
            })
        );
    });
    hero = {
        ...hero,
        baseStats,
        armor: hero.armor - armor.armor,
        equipments: update(
            hero.equipments,
            (e) => e.type === "armor" && e.subType === armor.subType,
            (e) => ({
                type: "armor",
                subType: armor.subType,
                icon: armor.subType.slice(0, 1),
                id: "null",
            })
        ),
    };
    return hero;
}
//#endregion UnEquip

//#region FindEquipment
export function findEquipment(hero: Hero, type: "item"): ITemplateBaseItem;
export function findEquipment(
    hero: Hero,
    type: "armor",
    subType?: ArmorCategory
): ITemplateArmor;
export function findEquipment(
    hero: Hero,
    type: "weapon",
    subType?: WeaponCategory
): ITemplateWeapon;

export function findEquipment(
    hero: Hero,
    type: ItemCategories,
    subType?: WeaponCategory | ArmorCategory | any
) {
    if (type === "item") return hero.potion;
    return subType === undefined
        ? hero.equipments.find((e) => e.type == type)
        : hero.equipments.find((e) => e.type == type && e.subType == subType);
}
//#endregion FindEquipment

export function AddBuffToStat(stat: number, buff: BuffType, hero: Hero) {
    const b = hero.buffs.find((b) => b.type === buff);
    //add Rune bonus
    const r = [...getHeroRune(hero)].find((r) => r.type == buff);
    stat = b != undefined ? (stat + b.add) * (1 + b.mult) : stat; //buff first
    if (r != undefined) stat = getEffect(r, stat); //rune second

    return stat;
}

export function heroAfterTraining(
    hero: Hero,
    trainEquipment: TrainingEquipment,
    stat: TrainingType
) {
    let baseStats = update(
        hero.baseStats,
        (s) => s.type === stat,
        (s) => ({ ...s, value: s.value + trainEquipment.reward })
    );
    let stats = update(
        baseStats,
        (s) => s.type === stat,
        (s) => ({
            ...s,
            value: AddBuffToStat(s.value, s.type, hero),
        })
    );
    let maxHp = getHeroMaxHp(stats.find((s) => s.type == "endurance").value);
    return {
        ...hero,
        baseStats,
        stats,
        maxHp,
        hp: maxHp,
    };
}
