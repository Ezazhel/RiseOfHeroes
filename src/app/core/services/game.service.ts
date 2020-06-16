import { StatType, Stat } from "./../models/game-data/game-data.model";
import { AppState } from "@core/models";
import { MessageService } from "./message.service";
import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { EntitySubtype, Hero } from "@core/models/entity";
import * as _ from "lodash";
import {
    intelligenceStat,
    agilityStat,
    strenghtStat,
    enduranceStat,
} from "@core/models/game-data/game-data.data";
import { PeasantSpells } from "@core/models/spells/spells.data";
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
            stats: [
                { ...strenghtStat, value: 0 },
                { ...enduranceStat, value: 0 },
                { ...intelligenceStat, value: 0 },
                { ...agilityStat, value: 0 },
            ],
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
                    spells: PeasantSpells,
                    equippedSpell: [],
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
}
