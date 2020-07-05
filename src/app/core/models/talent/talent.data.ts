import { EntitySubtype } from "../entity/entity";
import { Talent, TalentAdvance } from "./talent.model";
import { BuffType, Buff } from "../game-data/game-data.model";

export function setTalent(
    subtype: EntitySubtype,
    id: string,
    level: number,
    bonus: BuffType
): Talent {
    return {
        id: id,
        name: `talents.${subtype}.${id}.name`,
        description: `talents.${subtype}.${id}.description`,
        levelRequired: level,
        selected: false,
        bonus: bonus,
    };
}
export const peasantTalent: Talent[] = [
    {
        ...setTalent("peasant", "stronger", 10, "strength"),
    },
    {
        ...setTalent("peasant", "tougher", 10, "endurance"),
    },
    {
        ...setTalent("peasant", "vampiric", 10, "lifesteal"),
    },
    {
        ...setTalent("peasant", "richer", 20, "gold"),
    },
    {
        ...setTalent("peasant", "luckier", 20, "loot"),
    },
    {
        ...setTalent("peasant", "manager", 20, "work"),
    },
    {
        ...setTalent("peasant", "worker", 30, "worker"),
    },
    {
        ...setTalent("peasant", "fighter", 30, "apenetration"),
    },
    {
        ...setTalent("peasant", "crafter", 30, "craft"),
    },
    {
        ...setTalent("peasant", "looter", 40, "lootdrop"),
    },
    {
        ...setTalent("peasant", "fighterTwo", 40, "apenetration"),
    },
    {
        ...setTalent("peasant", "jack", 40, "stat"),
    },
];

export const peasantTalentAdvance: Map<string, TalentAdvance> = new Map([
    [
        "stronger",
        {
            effect: (talent: Talent): Buff => {
                return {
                    type: talent.bonus,
                    add: 0,
                    mult: 0.2,
                };
            },
            description: (talent: Talent) => {
                return {
                    param: "20",
                };
            },
        },
    ],
    [
        "tougher",
        {
            effect: (talent: Talent) => {
                return {
                    type: talent.bonus,
                    add: 0,
                    mult: 0.2,
                };
            },
            description: (talent: Talent) => {
                return {
                    param: "20",
                };
            },
        },
    ],
    [
        "vampiric",
        {
            effect: (talent: Talent) => {
                return {
                    type: talent.bonus,
                    add: 15,
                    mult: 0,
                };
            },
            description: (talent: Talent) => {
                return {
                    param: "15",
                };
            },
        },
    ],
    [
        "richer",
        {
            effect: (talent: Talent) => {
                return {
                    type: talent.bonus,
                    add: 0,
                    mult: 0.5,
                };
            },
            description: (talent: Talent) => {
                return {
                    param: "50",
                };
            },
        },
    ],
    [
        "luckier",
        {
            effect: (talent: Talent) => {
                return {
                    type: talent.bonus,
                    add: 0,
                    mult: 0.5,
                };
            },
            description: (talent: Talent) => {
                return {
                    param: "50",
                };
            },
        },
    ],
    [
        "manager",
        {
            effect: (talent: Talent) => {
                return {
                    type: talent.bonus,
                    add: 0,
                    mult: 0.15,
                };
            },
            description: (talent: Talent) => {
                return {
                    param: "15",
                };
            },
        },
    ],
    [
        "worker",
        {
            effect: (talent: Talent) => {
                return {
                    type: talent.bonus,
                    add: 0,
                    mult: 0.15,
                };
            },
            description: (talent: Talent) => {
                return {
                    param: "15",
                };
            },
        },
    ],
    [
        "fighter",
        {
            effect: (talent: Talent) => {
                return {
                    type: talent.bonus,
                    add: 0,
                    mult: 0.1,
                };
            },
            description: (talent: Talent) => {
                return {
                    param: "10",
                };
            },
        },
    ],
    [
        "crafter",
        {
            effect: (talent: Talent) => {
                return {
                    type: talent.bonus,
                    add: 0,
                    mult: 0.25,
                };
            },
            description: (talent: Talent) => {
                return {
                    param: "25",
                };
            },
        },
    ],
    [
        "looter",
        {
            effect: (talent: Talent) => {
                return {
                    type: talent.bonus,
                    add: 0,
                    mult: 0.25,
                };
            },
            description: (talent: Talent) => {
                return {
                    param: "25",
                };
            },
        },
    ],
    [
        "fighterTwo",
        {
            effect: (talent: Talent) => {
                return {
                    type: talent.bonus,
                    add: 0,
                    mult: 0.25,
                };
            },
            description: (talent: Talent) => {
                return {
                    param: "25", //Additif with Fighter
                };
            },
        },
    ],
    [
        "jack",
        {
            effect: (talent: Talent) => {
                return {
                    type: talent.bonus,
                    add: 0,
                    mult: 0.15,
                };
            },
            description: (talent: Talent) => {
                return {
                    param: "15",
                };
            },
        },
    ],
]);
