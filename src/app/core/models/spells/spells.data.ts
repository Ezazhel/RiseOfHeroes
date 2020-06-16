import { Spells, OvertimeSpells, HealSpells } from "./spells.model";
import { setSpell } from "./spells.utils";

export const PeasantSpells: Array<Spells | OvertimeSpells | HealSpells> = [
    {
        id: "powerAttack", //Single attack dealing 150% of you attack power
        name: setSpell("peasant", "powerAttack", "name"),
        description: setSpell("peasant", "powerAttack", "description"),
        castingTime: 0,
        icon: "powerAttack",
        cooldown: 2,
        isActive: true,
        isInCooldown: false,
        levelRequired: 1,
        power: 1.5, //multiply attack power by 1.5;
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
        levelRequired: 1,
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
        levelRequired: 2,
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
        levelRequired: 2,
        duration: 12,
        power: 0.15,
        type: "debuff",
    },
];
