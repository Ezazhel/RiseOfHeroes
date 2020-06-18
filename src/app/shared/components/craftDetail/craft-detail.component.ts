import { currencySelector } from "./../../../core/models/selector";
import {
    ITemplateBaseItem,
    Currency,
} from "@core/models/game-data/game-data.model";
import { Component, OnInit, Input } from "@angular/core";
import { Store } from "@ngrx/store";
import { AppState } from "@core/models";
import { first } from "rxjs/operators";

@Component({
    selector: "craft-detail",
    templateUrl: "./craft-detail.component.html",
    styleUrls: ["./craft-detail.component.scss"],
})
export class CraftDetailComponent implements OnInit {
    @Input() set itemEquipped(value: ITemplateBaseItem) {
        if (value === undefined || value === null) return;
        this._itemEquipped = value;
    }
    get itemEquipped(): ITemplateBaseItem {
        return this._itemEquipped;
    }
    @Input() materials: Currency[];

    canCraft(material: Currency): string {
        let currency: Currency;
        this.store
            .select(currencySelector(material.name))
            .pipe(first())
            .subscribe((c) => (currency = c));
        if (currency === undefined) {
            return "cantCraft";
        }
        return currency.quantity >= material.quantity
            ? "canCraft"
            : "cantCraft";
    }
    _itemEquipped: ITemplateBaseItem;
    constructor(private store: Store<AppState>) {}

    ngOnInit(): void {}
}
