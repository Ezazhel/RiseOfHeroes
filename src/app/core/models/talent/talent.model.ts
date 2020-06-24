import { Description } from "../game-data/game-data.model";

export interface Talent {
    id: string;
    name: string;
    description: string;
    levelRequired: number;
    icon?: string;
    selected: boolean;
}

export type EffectTalent = (talent: Talent, statToUpdate: number) => number;
export type DescriptionTalent = (talent: Talent) => Description;
export interface TalentAdvance {
    effect: EffectTalent;
    description: DescriptionTalent;
}
