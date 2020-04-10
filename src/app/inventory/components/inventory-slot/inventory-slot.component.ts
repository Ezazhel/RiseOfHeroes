import { ItemFilter } from "@core/models/game-data/game-data.model";
import { Component, OnInit } from "@angular/core";
import { Observable } from "rxjs";
import { Store, select } from "@ngrx/store";
import { AppState } from "@core/models";
import { ITemplateBaseItem } from "@core/models/game-data/game-data.model";
import { inventoryFiltered } from "@core/models/selector";

@Component({
    selector: "app-inventory-slot",
    templateUrl: "./inventory-slot.component.html",
    styleUrls: ["./inventory-slot.component.scss"],
})
export class InventorySlotComponent implements OnInit {
    private filter: ItemFilter = "all";

    public items$: Observable<ITemplateBaseItem[]> = this.store.pipe(
        select(inventoryFiltered(this.filter))
    );

    constructor(private store: Store<AppState>) {}

    ngOnInit(): void {}

    trackBy(index: number, item: ITemplateBaseItem): string {
        return item.id;
    }
    filterBy(type: string) {
        this.filter = type as ItemFilter;
        this.items$ = this.store.pipe(select(inventoryFiltered(this.filter)));
    }
}
