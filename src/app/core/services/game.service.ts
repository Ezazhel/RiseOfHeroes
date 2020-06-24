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
import { getHeroMaxHp } from "@core/models/utils";
import { AddPassivesToStat } from "@core/models/spells/spells.utils";
import { peasantTalent } from "@core/models/talent/talent.data";
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
            armor: 0,
            baseStats: [
                { ...strenghtStat, value: 5 },
                { ...enduranceStat, value: 15 },
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
                    spells: PeasantSpells,
                    equippedSpell: [],
                    talents: peasantTalent,
                });
                break;
            default:
                throw new Error("Unknow character class:" + entityClass);
        }
        character = _.extend(character, {
            stats: character.baseStats.map((s) => ({
                ...s,
                value: AddPassivesToStat(s.value, s.type, character as Hero),
            })),
            maxHp: getHeroMaxHp(
                AddPassivesToStat(
                    character.baseStats.find((s) => s.type == "endurance")
                        .value,
                    "endurance",
                    character as Hero
                )
            ),
            hp: getHeroMaxHp(
                AddPassivesToStat(
                    character.baseStats.find((s) => s.type == "endurance")
                        .value,
                    "endurance",
                    character as Hero
                )
            ),
        });
        return character as Hero;
    }
}
