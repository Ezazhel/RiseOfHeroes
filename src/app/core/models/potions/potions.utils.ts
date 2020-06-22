import { potionAdvance } from "./potions.data";
import { Potion } from "./potions.model";
import { Hero } from "../entity";

export const getDescription = (potion: Potion) =>
    potionAdvance.get(potion.potionType).description({ ...potion });

export const getEffect = (potion: Potion, hero: Hero) =>
    potionAdvance.get(potion.potionType).effect(potion, hero);
