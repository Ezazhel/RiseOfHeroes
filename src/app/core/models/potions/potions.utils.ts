import { potionAdvance } from "./potions.data";
import { Potion } from "./potions.model";
import { Hero } from "../entity";
import { AppState } from "..";
import { Store } from "@ngrx/store";
import { NotifierService } from "@core/services/notifier.service";

export const getDescription = (potion: Potion) =>
    potionAdvance.get(potion.potionType).description({ ...potion });

export const getEffect = (
    potion: Potion,
    hero: Hero,
    store: Store<AppState>,
    notifier: NotifierService
) => potionAdvance.get(potion.potionType).effect(potion, hero, store, notifier);
