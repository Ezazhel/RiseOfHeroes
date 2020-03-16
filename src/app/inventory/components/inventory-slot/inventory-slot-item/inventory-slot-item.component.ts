import { Equipment, Consumable, Item } from "@core/models";
import { Component, OnInit, Input } from "@angular/core";

@Component({
    selector: "app-inventory-slot-item",
    templateUrl: "./inventory-slot-item.component.html",
    styleUrls: ["./inventory-slot-item.component.css"]
})
export class InventorySlotItemComponent implements OnInit {
    @Input() item: Item;
    equipment: Equipment;
    consumable: Consumable;
    style: string;
    constructor() {}

    ngOnInit(): void {
        console.log(this.item);
        if (this.isEquipment()) {
            this.equipment = this.item as Equipment;
        } else {
            this.consumable = this.item as Consumable;
        }
        this.style = this.item.style;
    }
    isEquipment(): boolean {
        return this.item instanceof Equipment;
    }
}
