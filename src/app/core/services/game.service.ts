import {
    ITemplateBaseItem,
    StatType,
    Stat,
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
import { GameStateService } from "./game-state.service";
import {
    intelligenceStat,
    agilityStat,
    strenghtStat,
    enduranceStat,
} from "@core/models/game-data/game-data.data";
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
            baseAttack: 0,
            baseSpeed: 0,
            baseMagic: 0,
            baseDefense: 0,
            armor: 0,
            stats: Immutable.Map<StatType, Stat>([
                ["strength", { ...strenghtStat, value: 0 }],
                ["endurance", { ...enduranceStat, value: 0 }],
                ["intellect", { ...intelligenceStat, value: 0 }],
                ["agility", { ...agilityStat, value: 0 }],
            ]),
        };
        let character: Partial<Hero> = null;
        switch (entityClass) {
            case "peasant":
                character = _.assign({}, HERO_DEFAULTS, {
                    baseattack: 25,
                    maxRessource: 0,
                    basespeed: 1,
                    basedefense: 10,
                    hp: 500,
                    maxHp: 500,
                });
                break;
            default:
                throw new Error("Unknow character class:" + entityClass);
        }
        character = _.extend(character, {
            defense: character.baseDefense,
            speed: character.baseSpeed,
            attack: character.baseAttack,
            magic: character.baseMagic,
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
