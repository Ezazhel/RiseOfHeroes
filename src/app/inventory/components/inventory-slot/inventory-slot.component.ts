import { goldSelector } from "./../../../core/models/selector";
import { ItemFilter, Currency } from "@core/models/game-data/game-data.model";
import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { Observable } from "rxjs";
import { Store, select } from "@ngrx/store";
import { AppState } from "@core/models";
import { ITemplateBaseItem } from "@core/models/game-data/game-data.model";
import { inventoryFiltered, currencySelector } from "@core/models/selector";
import { GameStateInventoryRemoveItemAction } from "@core/models/game-state/game-state.action";
@Component({
    selector: "app-inventory-slot",
    templateUrl: "./inventory-slot.component.html",
    styleUrls: ["./inventory-slot.component.scss"],
})
export class InventorySlotComponent implements OnInit {
    @Input() selling: boolean = false;
    @Output() sell = new EventEmitter<ITemplateBaseItem>();
    @Output() itemNull = new EventEmitter<boolean>();
    public filter: ItemFilter = "all";
    public item: ITemplateBaseItem;
    public items$: Observable<ITemplateBaseItem[]> = this.store.pipe(
        select(inventoryFiltered(this.filter))
    );

    public _currencies$: Observable<Array<Currency>> = this.store.pipe(
        select(currencySelector)
    );
    public _gold$: Observable<Currency> = this.store.select(goldSelector);

    public setItem(item: ITemplateBaseItem) {
        this.item = item;
        this.itemNull.emit(item == null);
    }

    filterBy(type: string) {
        this.filter = type as ItemFilter;
        this.items$ = this.store.pipe(select(inventoryFiltered(this.filter)));
    }

    sellOrThrowItem(item: ITemplateBaseItem) {
        if (!this.selling) {
            this.store.dispatch(
                new GameStateInventoryRemoveItemAction(item.id)
            );
        } else {
            this.sell.emit(item);
        }
    }

    trackBy(index: number, item: ITemplateBaseItem): string {
        return item.id;
    }
    constructor(private store: Store<AppState>) {}

    ngOnInit(): void {}
}
