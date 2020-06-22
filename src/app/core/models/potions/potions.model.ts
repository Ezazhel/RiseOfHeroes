import { ITemplateBaseItem, Description } from "../game-data/game-data.model";
import { Hero } from "../entity";

export type PotionType = "healing";
export type EffectPotion = (potion: Potion, hero: Hero) => void;
export type DescriptionPotion = (potion: Potion) => Description;
export interface Potion extends ITemplateBaseItem {
    potionType: PotionType;
    power: number;
    cooldown: number;
}

export interface PotionAdvance {
    effect: EffectPotion;
    description: DescriptionPotion;
}
