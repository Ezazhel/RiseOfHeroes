import {
    ITemplateArmor,
    entityId,
    ITemplateItem,
    ITemplateBaseItem,
} from "./../models/game-data/game-data.model";
import { GameState } from "./../models/game-state/game-state.reducer";
import { AppState } from "@core/models";
import { MessageService } from "./message.service";
import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { EntitySubtype, Hero } from "@core/models/entity";
import * as _ from "lodash";
import * as Immutable from "immutable";
import { GameStateNewAction } from "@core/models/game-state/game-state.action";
import { Currency } from "@core/models/game-data/game-data.model";
import * as gameStateAction from "@core/models/game-state/game-state.action";
import { GameStateService } from "./game-state.service";
@Injectable({
    providedIn: "root",
})
export class GameService {
    constructor(
        public messageService: MessageService,
        private store: Store<AppState>
    ) {}
    initialize() {}

    static create(entityClass: EntitySubtype) {
        const HERO_DEFAULTS: Partial<Hero> = {
            eid: "hero",
            type: "hero",
            subType: entityClass,
            level: 1,
            exp: 0,
            baseattack: 0,
            basespeed: 0,
            basemagic: 0,
            basedefense: 0,
        };
        let character: Partial<Hero> = null;
        switch (entityClass) {
            case "peasant":
                character = _.assign({}, HERO_DEFAULTS, {
                    baseattack: 25,
                    maxressource: 0,
                    basespeed: 1,
                    basedefense: 10,
                    hp: 500,
                    maxhp: 500,
                });
                break;
            default:
                throw new Error("Unknow character class:" + entityClass);
        }
        character = _.extend(character, {
            defense: character.basedefense,
            speed: character.basespeed,
            attack: character.baseattack,
            magic: character.basemagic,
        });
        return character as Hero;
    }

    initGame(
        load: boolean = !!localStorage.getItem(GameStateService.STATE_KEY)
    ): Promise<boolean> {
        return new Promise<boolean>((resolve, reject) => {
            if (load) {
                resolve(false);
                return;
            }
            const character = GameService.create("peasant");
            const initialState: GameState = {
                companions: null,
                inventory: Immutable.OrderedMap<string, ITemplateBaseItem>(),
                currencies: Immutable.Map<string, Currency>([
                    ["gold", { name: "gold", quantity: 50 }],
                ]),
                location: "house",
                combatZone: "",
                maxSlots: 16,
                hero: character,
            };
            this.store.dispatch(new GameStateNewAction(initialState));
            this.initialize();
            resolve(true);
        });
    }
}
