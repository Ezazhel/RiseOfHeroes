import * as InventoryAction from "@core/models/inventory/inventory.action";
import { Store } from "@ngrx/store";

import { Component, OnInit, Output, EventEmitter } from "@angular/core";
import { ItemType, AppState } from "@core/models";

@Component({
    selector: "app-inventory-filter",
    templateUrl: "./inventory-filter.component.html",
    styleUrls: ["./inventory-filter.component.css"],
})
export class InventoryFilterComponent implements OnInit {
    constructor(private store: Store<AppState>) {}

    ngOnInit(): void {}
    filterBy(type: string) {
        switch (type) {
            case "armor":
                this.store.dispatch(
                    new InventoryAction.InventoryFilterItemsAction("equipment")
                );
                break;
            case "consumable":
                this.store.dispatch(
                    new InventoryAction.InventoryFilterItemsAction("consumable")
                );
                break;
            default:
                this.store.dispatch(
                    new InventoryAction.InventoryFilterItemsAction("all")
                );
                break;
        }
    }
}
