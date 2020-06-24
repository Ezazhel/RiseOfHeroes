import { EntitySubtype } from "./../entity";
import { Talent, TalentAdvance } from "./talent.model";

type setType = "name" | "description";
export function setTalent(
    subtype: EntitySubtype,
    id: string,
    level: number
): Talent {
    return {
        id: id,
        name: `talents.${subtype}.${id}.name`,
        description: `talents.${subtype}.${id}.description`,
        levelRequired: level,
        selected: false,
    };
}
export const peasantTalent: Talent[] = [
    {
        ...setTalent("peasant", "stronger", 10),
    },
    {
        ...setTalent("peasant", "tougher", 10),
    },
    {
        ...setTalent("peasant", "vampiric", 10),
    },
    {
        ...setTalent("peasant", "richer", 20),
    },
    {
        ...setTalent("peasant", "luckier", 20),
    },
    {
        ...setTalent("peasant", "manager", 20),
    },
    {
        ...setTalent("peasant", "worker", 30),
    },
    {
        ...setTalent("peasant", "fighter", 30),
    },
    {
        ...setTalent("peasant", "crafter", 30),
    },
    {
        ...setTalent("peasant", "looter", 40),
    },
    {
        ...setTalent("peasant", "fighterTwo", 40),
    },
    {
        ...setTalent("peasant", "jack", 40),
    },
];

export const peasantTalentAdvance: Map<string, TalentAdvance> = new Map([
    [
        "stronger",
        {
            effect: (talent: Talent, stat: number) => {
                return stat * 1.2;
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
            effect: (talent: Talent, stat: number) => {
                return stat * 1.2;
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
            effect: (talent: Talent, stat: number) => {
                return stat * 1.2; //mandatory, need to add dispatch, check if talent is active etc etc.
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
            effect: (talent: Talent, stat: number) => {
                return stat * 1.2; //mandatory, need to add dispatch, check if talent is active etc etc.
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
            effect: (talent: Talent, stat: number) => {
                return stat * 1.2; //mandatory, need to add dispatch, check if talent is active etc etc.
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
            effect: (talent: Talent, stat: number) => {
                return stat * 1.2; //mandatory, need to add dispatch, check if talent is active etc etc.
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
            effect: (talent: Talent, stat: number) => {
                return stat * 1.2; //mandatory, need to add dispatch, check if talent is active etc etc.
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
            effect: (talent: Talent, stat: number) => {
                return stat * 1.2; //mandatory, need to add dispatch, check if talent is active etc etc.
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
            effect: (talent: Talent, stat: number) => {
                return stat * 1.2; //mandatory, need to add dispatch, check if talent is active etc etc.
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
            effect: (talent: Talent, stat: number) => {
                return stat * 1.2; //mandatory, need to add dispatch, check if talent is active etc etc.
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
            effect: (talent: Talent, stat: number) => {
                return stat * 1.2; //mandatory, need to add dispatch, check if talent is active etc etc.
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
            effect: (talent: Talent, stat: number) => {
                return stat * 1.15;
            },
            description: (talent: Talent) => {
                return {
                    param: "15",
                };
            },
        },
    ],
]);
