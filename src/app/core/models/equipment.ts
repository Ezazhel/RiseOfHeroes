import { Item } from "./item";
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
    }
    name: string;
    rarity: string;
    style: string;
    isUpgrade: boolean;
    isDowngrade: boolean;
    use() {
        throw new Error("Method not implemented.");
    }
    getInformation() {
        throw new Error("Method not implemented.");
    }
}
