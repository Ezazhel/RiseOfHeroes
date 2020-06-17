import { ITemplateId } from "../game-data/game-data.model";

export type SpellsType = "damage" | "heal" | "buff" | "debuff";
export type PassiveBuff =
    | "armor"
    | "strength"
    | "endurance"
    | "intellect"
    | "agility"
    | "reward";
export interface Spells extends ITemplateId {
    icon?: string;
    castingTime: number;
    type: SpellsType;
    name: string;
    description: string;
    cooldown: number; //seconds until spells available
    isInCooldown: boolean; //for css
    power: number; //can be a percent or a flat bonus.
    levelRequired: number;
    isActive: boolean; //if not active > Passive (seems legit)
    buffStat?: PassiveBuff;
}

export interface OvertimeSpells extends Spells {
    type: "debuff" | "buff";
    duration: number; //duraction of debuff
    curable: boolean; //can be cured ?
    timeOut: number; /// id setTimeout;
    interval: number; // id setInterval;
}

export interface HealSpells extends Spells {
    type: "heal"; //Heal HP or Ressource.
    duration?: number;
    curable: boolean; //if an ennemy heal himself we might "cure" it from it
    stacks: number; //some heal might have stack
}
