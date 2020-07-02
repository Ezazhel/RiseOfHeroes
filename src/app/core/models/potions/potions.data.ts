import { Potion, PotionType, PotionAdvance } from "./potions.model";
import { Hero } from "../entity/entity";
import { NotifierService } from "@core/services/notifier.service";
import { Store } from "@ngrx/store";
import { AppState } from "..";
import { GameStateUpdateHeroAction } from "../game-state/game-state.action";

export const healingPotion: Potion = {
    id: "healingPot",
    potionType: "healing",
    name: "potions.healing.name",
    value: 450,
    level: 0,
    icon: "t_23",
    type: "item",
    quality: "epic",
    subType: "potion",
    power: 10,
    cooldown: 60,
    isInCooldown: false,
};

export const potionAdvance: Map<PotionType, PotionAdvance> = new Map<
    PotionType,
    PotionAdvance
>([
    [
        "healing",
        {
            effect: (
                potion: Potion,
                hero: Hero,
                store: Store<AppState>,
                notification: NotifierService
            ) => {
                let newHp = hero.hp + (hero.maxHp * potion.power) / 100;
                newHp = newHp > hero.maxHp ? hero.maxHp : newHp;
                store.dispatch(
                    new GameStateUpdateHeroAction({
                        ...hero,
                        hp: newHp,
                    })
                );
                notification.notify(
                    "text",
                    "heal",
                    `${(hero.maxHp * potion.power) / 100}`
                );
            },
            description: (potion) => {
                return {
                    param: potion.power,
                    jsonField: `potions.${potion.potionType}.description`,
                };
            },
        },
    ],
]);
