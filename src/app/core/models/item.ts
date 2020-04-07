export type ItemType = "equipment" | "consumable" | "empty";
export type ItemFilter = "equipment" | "consumable" | "all";
export interface Item {
    name: string;
    style: string;
    itemType: ItemType;
    quantity?: number;
    use();
    getInformation();
}
export class Equipment implements Item {
    constructor(
        name: string,
        rarity: string,
        style: string,
        isUpgrade: boolean
    ) {
        this.name = name;
        this.rarity = rarity;
        this.isUpgrade = isUpgrade;
        this.isDowngrade = !this.isUpgrade;
        this.style = `sprite-${style} ${
            this.isUpgrade ? "upgrade" : "downgrade"
        }`;
        this.itemType = "equipment";
    }
    name: string;
    rarity: string;
    style: string;
    isUpgrade: boolean;
    isDowngrade: boolean;
    itemType: ItemType;
    use() {
        throw new Error("Method not implemented.");
    }
    getInformation() {
        throw new Error("Method not implemented.");
    }
}
export class Consumable implements Item {
    constructor(name: string, quantity: number, style: string) {
        this.name = name;
        this.quantity = quantity;
        this.style = `sprite-${style}`;
        this.itemType = "consumable";
    }
    name: string;
    quantity: number;
    style: string;
    itemType: ItemType;

    use() {
        throw new Error("Method not implemented.");
    }
    getInformation() {
        throw new Error("Method not implemented.");
    }
}
export class EmptyItem implements Item {
    constructor() {
        this.itemType = "empty";
    }
    name: string;
    style: string;
    itemType: ItemType;

    use() {
        throw new Error("Method not implemented.");
    }
    getInformation() {
        throw new Error("Method not implemented.");
    }
}
