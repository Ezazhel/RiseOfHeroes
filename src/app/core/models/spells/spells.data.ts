import { Spells, OvertimeSpells, HealSpells } from "./spells.model";
import { EntitySubtype } from "../entity/entity";

type setType = "name" | "description";

export function setSpell(subtype: EntitySubtype, id: string, setType: setType) {
    return `spells.${subtype}.${id}.${setType}`;
}
export const PeasantSpells: Array<Spells | OvertimeSpells | HealSpells> = [
    {
        id: "powerAttack", //Single attack dealing 150% of you attack power
        name: setSpell("peasant", "powerAttack", "name"),
        description: setSpell("peasant", "powerAttack", "description"),
        castingTime: 0,
        icon: "powerAttack",
        cooldown: 2.5,
        isActive: true,
        isInCooldown: false,
        levelRequired: 1,
        power: 1.5, //multiply damage by 1.5;
        type: "damage",
    },
    {
        id: "peasantHearth", //Give % endurance
        name: setSpell("peasant", "peasantHearth", "name"),
        description: setSpell("peasant", "peasantHearth", "description"),
        icon: "peasantHearth",
        castingTime: 0,
        cooldown: 0,
        isActive: false,
        isInCooldown: false,
        levelRequired: 2,
        power: 0.1,
        type: "buff",
        buffStat: "endurance",
    },
    {
        id: "peasantLabor", //give more reward when you work : multiply by 2 the working reward
        icon: "peasantLabor",
        name: setSpell("peasant", "peasantLabor", "name"),
        description: setSpell("peasant", "peasantLabor", "description"),
        castingTime: 0,
        cooldown: 0,
        isActive: false,
        isInCooldown: false,
        levelRequired: 5,
        power: 2,
        type: "buff",
        buffStat: "reward",
    },
    {
        id: "peasantTorch", //Dot inflicting 5 * level + 5% attack power each second during 12 second.
        name: setSpell("peasant", "peasantTorch", "name"),
        description: setSpell("peasant", "peasantTorch", "description"),
        castingTime: 1,
        icon: "peasantTorch",
        cooldown: 4,
        isActive: true,
        isInCooldown: false,
        levelRequired: 3,
        duration: 12,
        power: 0.15,
        type: "debuff",
    },
    {
        id: "peasantProficiency",
        name: setSpell("peasant", "peasantProficiency", "name"),
        description: setSpell("peasant", "peasantProficiency", "description"),
        castingTime: 0,
        icon: "peasantProficiency",
        cooldown: 0,
        isActive: false,
        isInCooldown: false,
        levelRequired: 5,
        type: "buff",
        power: 5, //5%
        buffStat: "critc",
    },
];
