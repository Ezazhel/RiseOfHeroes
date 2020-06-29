import { City, baseHuntingAction } from "./cities.model";
import { createUpgrade } from "@core/models/upgrades";
import {
    dummyCraft,
    sheepyCraft,
    piggyCraft,
} from "@core/models/game-data/game-data.data";
import { healingPotion } from "@core/models/potions/potions.data";
//#region City
export const cities: Map<string, City> = new Map<string, City>([
    [
        "zulah",
        {
            id: "zulah",
            name: "city.zulah.name",
            description: "city.zulah.description",
            levelRequirement: 0,
            maxLevel: 5,
            shops: [
                {
                    type: "blacksmith",
                    name: "city.city_shop.blacksmith",
                    maxItemQuality: 1,
                    maxItem: 5,
                    items: [],
                    crafts: [dummyCraft, sheepyCraft, piggyCraft],
                    upgrades: [
                        {
                            ...createUpgrade("faster", 5, 500, "faster"),
                        },
                        {
                            ...createUpgrade("better", 2, 2000, "better"),
                        },
                        {
                            ...createUpgrade("more", 5, 250, "more"),
                        },
                    ],
                    display: false,
                    acceptType: "equipment",
                    intervalStock: 15,
                    lastTick: Date.now(),
                },
                {
                    type: "alchemist",
                    name: "city.city_shop.alchemist",
                    items: [healingPotion],
                    upgrades: [],
                    display: false,
                    acceptType: "consumable",
                },
            ],
            building: [
                {
                    type: "huntingPost",
                    name: "city.city_building.huntingPost.name",
                    actions: [
                        {
                            ...baseHuntingAction,
                            targetId: 0, //Combatant
                            currentLevel: 1,
                            maxLevel: 5,
                        },
                        {
                            ...baseHuntingAction,
                            targetId: 1, //Combatant
                            currentLevel: 1,
                            maxLevel: 5,
                        },
                        {
                            ...baseHuntingAction,
                            targetId: 2, //Combatant
                            currentLevel: 1,
                            maxLevel: 5,
                        },
                    ],
                },
            ],
        },
    ],
    [
        "heapoo",
        {
            id: "heapoo",
            name: "city.heapoo.name",
            description: "city.heapoo.description",
            levelRequirement: 5,
            maxLevel: 10,
            shops: [
                {
                    type: "blacksmith",
                    name: "city.city_shop.blacksmith",
                    maxItemQuality: 1,
                    maxItem: 5,
                    items: [],
                    crafts: [dummyCraft, sheepyCraft, piggyCraft],
                    upgrades: [
                        {
                            ...createUpgrade("faster", 5, 500, "faster"),
                        },
                        {
                            ...createUpgrade("better", 2, 2000, "better"),
                        },
                        {
                            ...createUpgrade("more", 5, 250, "more"),
                        },
                    ],
                    display: false,
                    acceptType: "equipment",
                    intervalStock: 15,
                    lastTick: Date.now(),
                },
            ],
            building: [
                {
                    type: "huntingPost",
                    name: "city.city_building.huntingPost.name",
                    actions: [
                        {
                            ...baseHuntingAction,
                            targetId: 0, //Combatant
                            currentLevel: 1,
                            maxLevel: 5,
                        },
                        {
                            ...baseHuntingAction,
                            targetId: 1, //Combatant
                            currentLevel: 1,
                            maxLevel: 5,
                        },
                        {
                            ...baseHuntingAction,
                            targetId: 2, //Combatant
                            currentLevel: 1,
                            maxLevel: 5,
                        },
                    ],
                },
            ],
        },
    ],
    // [
    //     "krakotoa",
    //     {
    //         id: "krakotoa",
    //         name: "Krakotoa",
    //         levelRequirement: 10,
    //     },
    // ],
    // [
    //     "baalrug",
    //     {
    //         id: "baalrug",
    //         name: "baalrug",
    //         levelRequirement: 15,
    //     },
    // ],
    // [
    //     "cresolia",
    //     {
    //         id: "cresolia",
    //         name: "Crésolia",
    //         levelRequirement: 26,
    //     },
    // ],
    // [
    //     "onigashi",
    //     {
    //         id: "onigashi",
    //         name: "Onigashi",
    //         levelRequirement: 35,
    //     },
    // ],
]);
//#endregion City
