import {
    Currency,
    Stat,
    StatType,
} from "@core/models/game-data/game-data.model";
import {
    ITemplateWeapon,
    ITemplateArmor,
    ITemplateBaseItem,
} from "./game-data/game-data.model";
import { Spells, OvertimeSpells, HealSpells } from "./spells/spells.model";

export type EntityType = "hero" | "monster";
export type EntitySubtype = "warrior" | "mage" | "ranger" | "peasant";
export interface EntityObject {
    eid: string;
}
export interface TemplateEntity extends EntityObject {
    readonly icon?: string; // sprite icon
    readonly level: number;
    readonly ressource: number; //Mana / Rage / Energy
    readonly hp: number;
    readonly attack: number; // Damage done
    readonly defense: number; //Percent reduction of damage
    readonly magic?: number;
    readonly speed: number; //Determine attack speed
    readonly type: EntityType;
}
export interface IHiddenAttributes {
    baseStats: Stat[];
}

export interface BaseEntity extends TemplateEntity, IHiddenAttributes {
    readonly maxRessource: number;
    readonly maxHp: number;
}

export interface Hero extends BaseEntity {
    readonly exp?: number;
    readonly subType?: EntitySubtype;
    readonly weapon?: ITemplateWeapon;
    readonly helmet?: ITemplateArmor;
    readonly chest?: ITemplateArmor;
    readonly gloves?: ITemplateArmor;
    readonly pants?: ITemplateArmor;
    readonly boots?: ITemplateArmor;
    readonly accesory?: null;
    readonly armor: number;
    readonly stats: Array<Stat>;
    readonly spells: Array<Spells | OvertimeSpells | HealSpells>;
    readonly equippedSpell: Array<Spells | OvertimeSpells | HealSpells>;
}

export interface Companion extends BaseEntity {}

export interface Fighter extends EntityObject {
    name: string;
    icon?: string;
    exp: number;
    attack: number;
    attackSpeed: number;
    defense: number;
    hp: number;
    maxHp: number;
    level: number;
    items?: ITemplateBaseItem[];
    ressources?: Currency[];
}
