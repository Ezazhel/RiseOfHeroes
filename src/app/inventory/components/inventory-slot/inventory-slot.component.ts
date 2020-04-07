import { filter, map } from "rxjs/operators";
import { InventoryRecords } from "@core/models/inventory/inventory.reducer";
import { Item, Consumable, Equipment, ItemType } from "@core/models";
import { Component, OnInit, OnDestroy, Input } from "@angular/core";
import { Observable } from "rxjs";
import { Store, select } from "@ngrx/store";
import { AppState } from "@core/models";

@Component({
    selector: "app-inventory-slot",
    templateUrl: "./inventory-slot.component.html",
    styleUrls: ["./inventory-slot.component.css"],
})
export class InventorySlotComponent implements OnInit {
    public items$: Observable<Item[]> = this.store.pipe(
        select("inventory"),
        map((inventoryRecord: InventoryRecords) => {
            if (inventoryRecord.filtered !== "all") {
                return inventoryRecord.items.filter((item, i) => {
                    return item.itemType === inventoryRecord.filtered;
                });
            } else {
                return inventoryRecord.items;
            }
        })
    );

    @Input() filterBy: ItemType;

    constructor(private store: Store<AppState>) {}

    ngOnInit(): void {}

    trackBy(index: number, item: Item): Item {
        return item;
    }
}
