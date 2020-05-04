import { Map } from "immutable";
import {
    ITemplateItem,
    ITemplateWeapon,
    ITemplateArmor,
} from "./game-data.model";
export const items: ITemplateItem[] = [
    {
        id: "HealthPotion",
        name: "Health Potion",
        type: "item",
        value: 0,
        level: 0,
        icon: "potionRed",
        style: "",
    },
    {
        id: "ManaPotion",
        name: "Mana Potion",
        type: "item",
        level: 0,
        value: 0,
        icon: "potionRed",
        style: "",
    },
];
export const armor: ITemplateArmor[] = [
    {
        id: "Armor",
        name: "Armor",
        type: "armor",
        icon: "armor",
        value: 100,
        level: 0,
        subType: "chest",
        defense: 10,
        style: "",
    },
];

// export const cities: Map<string, City> = Map<string, City>([
//     [
//         "zulah",
//         {
//             id: "zulah",
//             name: "Zul'ah",
//             levelRequirement: 1,
//         },
//     ],
//     [
//         "heapoo",
//         {
//             id: "heapoo",
//             name: "Heapoo",
//             levelRequirement: 5,
//         },
//     ],
//     [
//         "krakotoa",
//         {
//             id: "krakotoa",
//             name: "Krakotoa",
//             levelRequirement: 10,
//         },
//     ],
//     [
//         "baalrug",
//         {
//             id: "baalrug",
//             name: "baalrug",
//             levelRequirement: 15,
//         },
//     ],
//     [
//         "cresolia",
//         {
//             id: "cresolia",
//             name: "Crésolia",
//             levelRequirement: 26,
//         },
//     ],
//     [
//         "onigashi",
//         {
//             id: "onigashi",
//             name: "Onigashi",
//             levelRequirement: 35,
//         },
//     ],
// ]);
