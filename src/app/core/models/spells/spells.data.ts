import { Spells, OvertimeSpells, HealSpells } from "./spells.model";

export const PeasantSpells: Array<Spells | OvertimeSpells | HealSpells> = [
    {
        id: "powerAttack", //Single attack dealing 150% of you attack power
        name: "spells.peasant.powerAttack",
        castingTime: 0,
        icon: "powerAttack",
        cooldown: 2,
        isActive: true,
        isInCooldown: false,
        levelRequired: 1,
        power: 150,
        type: "damage",
    },
    {
        id: "peasantHearth", //Give % endurance
        name: "spells.peasant.peasantHearth",
        icon: "peasantHearth",
        castingTime: 0,
        cooldown: 0,
        isActive: false,
        isInCooldown: false,
        levelRequired: 1,
        power: 10,
        type: "buff",
    },
    {
        id: "peasantLabor", //give more reward when you work : multiply by 2 the working reward
        icon: "peasantLabor",
        name: "spells.peasant.peasantLabor",
        castingTime: 0,
        cooldown: 0,
        isActive: false,
        isInCooldown: false,
        levelRequired: 2,
        power: 2,
        type: "buff",
    },
    {
        id: "torch", //Single attack dealing 150% of you attack power
        name: "spells.peasant.peasantTorch",
        castingTime: 1,
        icon: "peasantTorch",
        cooldown: 4,
        isActive: true,
        isInCooldown: false,
        levelRequired: 2,
        duration: 12,
        power: 5,
        type: "debuff",
    },
];
