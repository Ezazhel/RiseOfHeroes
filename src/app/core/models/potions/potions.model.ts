import { AppState } from "./../index";
import { Store } from "@ngrx/store";
import { ITemplateBaseItem, Description } from "../game-data/game-data.model";
import { Hero } from "../entity";
import { NotifierService } from "@core/services/notifier.service";

export type PotionType = "healing";
export type EffectPotion = (
    potion: Potion,
    hero: Hero,
    store: Store<AppState>,
    notifier: NotifierService
) => void;
export type DescriptionPotion = (potion: Potion) => Description;
export interface Potion extends ITemplateBaseItem {
    potionType: PotionType;
    power: number;
    cooldown: number;
    isInCooldown: boolean;
}

export interface PotionAdvance {
    effect: EffectPotion;
    description: DescriptionPotion;
}
