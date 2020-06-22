import { Potion, PotionType, PotionAdvance } from "./potions.model";
import { Hero } from "../entity";

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
};

export const potionAdvance: Map<PotionType, PotionAdvance> = new Map<
    PotionType,
    PotionAdvance
>([
    [
        "healing",
        {
            effect: (potion: Potion, hero: Hero) => {
                hero = { ...hero, hp: (hero.maxHp * potion.power) / 100 };
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
