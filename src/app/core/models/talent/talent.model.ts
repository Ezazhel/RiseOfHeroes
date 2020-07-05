import { Description, BuffType, Buff } from "../game-data/game-data.model";

export interface Talent {
    id: string;
    bonus: BuffType;
    name: string;
    description: string;
    levelRequired: number;
    icon?: string;
    selected: boolean;
}

export type EffectTalent = (talent: Talent) => Buff;
export type DescriptionTalent = (talent: Talent) => Description;
export interface TalentAdvance {
    effect: EffectTalent;
    description: DescriptionTalent;
}
