import { Item, Consumable, Equipment } from "@core/models";
export const items: Consumable[] = [
    {
        id: "HealthPotion",
        name: "Health Potion",
        itemType: "consumable",
        use: null,
        getInformation: null,
        quantity: 1,
        icon: "potionRed",
    },
    {
        id: "ManaPotion",
        name: "Mana Potion",
        itemType: "consumable",
        use: null,
        getInformation: null,
        quantity: 1,
        icon: "potionRed",
    },
];
export const armor: Equipment[] = [
    {
        id: "Armor",
        name: "Armor",
        itemType: "equipment",
        use: null,
        getInformation: null,
        icon: "armor",
        rarity: null,
        isDowngrade: null,
        isUpgrade: null,
    },
];
