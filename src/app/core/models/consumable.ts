import { Item } from "./item";
export class Consumable implements Item {
    constructor(name: string, quantity: number, style: string) {
        this.name = name;
        this.quantity = quantity;
        this.style = `sprite-${style}`;
    }
    name: string;
    quantity: number;
    style: string;
    use() {
        throw new Error("Method not implemented.");
    }
    getInformation() {
        throw new Error("Method not implemented.");
    }
}
