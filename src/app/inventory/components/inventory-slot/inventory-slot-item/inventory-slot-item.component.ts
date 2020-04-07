import { AppState } from "@core/models";
import { Equipment, Consumable, Item } from "@core/models";
import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { Store } from "@ngrx/store";
import { InventoryRemoveItemAction } from "@core/models/inventory/inventory.action";
@Component({
    selector: "app-inventory-slot-item",
    templateUrl: "./inventory-slot-item.component.html",
    styleUrls: ["./inventory-slot-item.component.scss"],
})
export class InventorySlotItemComponent implements OnInit {
    @Input() item: Item;
    @Input() index: number;
    style: string;
    descriptionDisplay: string;
    delayedAction: number;
    actionDisplay: string;
    constructor(private store: Store<AppState>) {}

    ngOnInit(): void {
        this.style = this.item.style;
    }
    isEquipment(): boolean {
        return this.item instanceof Equipment;
    }
    onMouseEnter() {
        this.descriptionDisplay = "block";
    }
    onMouseLeave() {
        this.descriptionDisplay = "none";
        this.hideAction();
    }
    displayAction() {
        if (this.delayedAction !== undefined) clearTimeout(this.delayedAction);
        this.actionDisplay = "flex";
    }
    hideAction() {
        this.delayedAction = window.setTimeout(
            () => (this.actionDisplay = "none"),
            100
        );
    }

    throwItem() {
        this.store.dispatch(new InventoryRemoveItemAction(this.index));
    }
    equipItem() {
        //this.InventoryService.equip(this.item);
    }
}
