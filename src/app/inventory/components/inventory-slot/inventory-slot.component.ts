import { ItemFilter, Currency } from "@core/models/game-data/game-data.model";
import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { Observable } from "rxjs";
import { Store, select } from "@ngrx/store";
import { AppState } from "@core/models";
import { ITemplateBaseItem } from "@core/models/game-data/game-data.model";
import {
    inventoryFiltered,
    currenciesSelector,
    equippedSelector,
    currencySelector,
} from "@core/models/selector";
import { GameStateInventoryRemoveItemAction } from "@core/models/game-state/game-state.action";
import { take } from "rxjs/operators";
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
        select(currenciesSelector)
    );
    public _gold$: Observable<Currency> = this.store.select(
        currencySelector("gold")
    );

    public setItem(item: ITemplateBaseItem) {
        this.item = item;
        this.itemNull.emit(item == null);
    }

    public equipped(item: ITemplateBaseItem) {
        let equipped: ITemplateBaseItem;
        this.store
            .select(equippedSelector(item?.type == "weapon", item?.subType))
            .pipe(take(1))
            .subscribe((i) => (equipped = i));
        return equipped;
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
