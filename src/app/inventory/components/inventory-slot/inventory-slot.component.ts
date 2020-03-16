import { Item, Consumable, Equipment } from "@core/models";
import { Component, OnInit } from "@angular/core";

@Component({
    selector: "app-inventory-slot",
    templateUrl: "./inventory-slot.component.html",
    styleUrls: ["./inventory-slot.component.css"]
})
export class InventorySlotComponent implements OnInit {
    items: Item[] = [];
    constructor() {}

    ngOnInit(): void {
        this.items.push(new Equipment("armor", "common", "armor", true));
        this.items.push(new Equipment("dagger", "common", "dagger", false));
        this.items.push(new Consumable("healthPotion", 20, "potionRed"));
        this.items.push(new Consumable("manaPotion", 20, "potionBlue"));

        this.items.push(new Equipment("armor", "common", "armor", true));
        this.items.push(new Equipment("dagger", "common", "dagger", false));
        this.items.push(new Consumable("healthPotion", 20, "potionRed"));
        this.items.push(new Consumable("manaPotion", 20, "potionBlue"));

        this.items.push(new Equipment("armor", "common", "armor", true));
        this.items.push(new Equipment("dagger", "common", "dagger", false));
        this.items.push(new Consumable("healthPotion", 20, "potionRed"));
        this.items.push(new Consumable("manaPotion", 20, "potionBlue"));
    }
    trackBy(index: number, item: Item): Item {
        return item;
    }
}
