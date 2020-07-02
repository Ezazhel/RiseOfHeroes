import { MessageService } from "./message.service";
import { Injectable } from "@angular/core";
import { EntitySubtype, Hero } from "@core/models/entity/entity";
import * as _ from "lodash";
import {
    intelligenceStat,
    agilityStat,
    strenghtStat,
    enduranceStat,
} from "@core/models/game-data/game-data.data";
import { PeasantSpells } from "@core/models/spells/spells.data";
import { getHeroMaxHp, AddBuffToStat } from "@core/models/entity/entity.utils";
import { peasantTalent } from "@core/models/talent/talent.data";
@Injectable({
    providedIn: "root",
})
export class GameService {
    constructor(public messageService: MessageService) {}
    initialize() {}

    static create(entityClass: EntitySubtype) {
        const HERO_DEFAULTS: Partial<Hero> = {
            eid: "hero",
            type: "hero",
            subType: entityClass,
            level: 1,
            exp: 0,
            armor: 0,
            equipments: [
                { type: "weapon", id: "null", icon: "w" },
                { type: "armor", subType: "helmet", id: "null", icon: "h" },
                { type: "armor", subType: "chest", id: "null", icon: "c" },
                { type: "armor", subType: "gloves", id: "null", icon: "g" },
                { type: "armor", subType: "pants", id: "null", icon: "p" },
                { type: "armor", subType: "boots", id: "null", icon: "b" },
            ],
            baseStats: [
                { ...strenghtStat, value: 5 },
                { ...enduranceStat, value: 25 },
                { ...intelligenceStat, value: 0 },
                { ...agilityStat, value: 0 },
            ],
            buffs: [],
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
                value: AddBuffToStat(s.value, s.type, character as Hero),
            })),
            maxHp: getHeroMaxHp(
                AddBuffToStat(
                    character.baseStats.find((s) => s.type == "endurance")
                        .value,
                    "endurance",
                    character as Hero
                )
            ),
            hp: getHeroMaxHp(
                AddBuffToStat(
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
