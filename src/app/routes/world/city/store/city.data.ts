import { City, baseHuntingAction } from "./cities.model";
import { createUpgrade } from "@core/models/upgrades";
import {
    dummyCraft,
    sheepyCraft,
    piggyCraft,
} from "@core/models/game-data/game-data.data";
import { healingPotion } from "@core/models/potions/potions.data";
import { TrainingEquipment } from "@routes/house/store/house.model";

export const trainerTrainings: Map<string, TrainingEquipment[]> = new Map<
    string,
    TrainingEquipment[]
>([
    [
        "heapoo",
        [
            {
                id: "strength2",
                type: "strength",
                cardHeader: "house.training.strength.cardHeader",
                name: "house.training.strength.level2.name ",
                description: "house.training.strength.level2.description",
                bonus: 5,
                baseBonus: 5,
                speed: 8 * 1000,
                reward: 1,
                done: 0,
                isActive: false,
            },
            {
                id: "endurance2",
                type: "endurance",
                cardHeader: "house.training.endurance.cardHeader",
                name: "house.training.endurance.level2.name",
                description: "house.training.endurance.level2.description",
                bonus: 5,
                baseBonus: 5,
                speed: 8 * 1000,
                reward: 1,
                done: 0,
                isActive: false,
            },
        ],
    ],
]);

//#region City
export const cities: Map<string, City> = new Map<string, City>([
    [
        "zulah",
        {
            id: "zulah",
            name: "city.zulah.name",
            description: "city.zulah.description",
            levelRequirement: 1,
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
                            targetId: "dummy", //Combatant
                            currentLevel: 1,
                            maxLevel: 5,
                        },
                        {
                            ...baseHuntingAction,
                            targetId: "sheepy", //Combatant
                            currentLevel: 1,
                            maxLevel: 5,
                        },
                        {
                            ...baseHuntingAction,
                            targetId: "piggy", //Combatant
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
                            targetId: "froggy", //Combatant
                            currentLevel: 5,
                            maxLevel: 10,
                        },
                        {
                            ...baseHuntingAction,
                            targetId: "gobelino", //Combatant
                            currentLevel: 5,
                            maxLevel: 10,
                        },
                        {
                            ...baseHuntingAction,
                            targetId: "goboss", //Combatant
                            currentLevel: 5,
                            maxLevel: 10,
                        },
                    ],
                },
                {
                    type: "trainer",
                    name: "city.city_building.trainer.name",
                    trainings: [
                        { id: "strength2", done: 0, isActive: false },
                        { id: "endurance2", done: 0, isActive: false },
                    ],
                },
                {
                    type: "merchant",
                    name: "city.city_building.merchant.name",
                    actions: [],
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
